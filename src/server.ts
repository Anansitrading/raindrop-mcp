/**
 * HTTP server entrypoint for the optimized Raindrop MCP service.
 *
 * Exposes the MCP server over HTTP (default port 3002) with session management and CORS.
 * Uses the optimized MCP service with AI-friendly tool descriptions and robust error handling.
 *
 * Compare with the original HTTP server on port 3001 for differences in tool coverage and design.
 */

// CRITICAL: Load environment variables BEFORE any other imports
import './init-env.js';

import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { randomUUID } from "node:crypto";
import http from 'node:http';
import { parse as parseUrl } from 'node:url';
import { AuthorizationCode } from 'simple-oauth2';
import { RaindropMCPService } from './services/raindropmcp.service.js';
import { createLogger } from './utils/logger.js';

const PORT = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 3002;
const logger = createLogger('http');

/**
 * Tracks active MCP sessions for monitoring and cleanup.
 * @type {Map<string, any>}
 */
const activeSessions = new Map();
/**
 * Stores session metadata for each active session.
 * @type {Map<string, any>}
 */
const sessionMetadata = new Map();
/**
 * Checks if a request body is an MCP initialization request.
 * @param body - The request body to check.
 * @returns True if the request is an MCP initialize call.
 */
function isInitializeRequest(body: any): boolean {
    return body && body.method === 'initialize' && body.jsonrpc === '2.0';
}

// Raindrop.io OAuth endpoints
/**
 * Lightweight app placeholder for compatibility with tests that import `app`.
 * When using native http server there is no Express `app`, so we export a
 * minimal object with the same shape used by tests (serverInstance and listen).
 */
const app: { listen?: (port: number, cb?: () => void) => any } = {};
const RAINDROP_CLIENT_SECRET = process.env.RAINDROP_CLIENT_SECRET;
const RAINDROP_REDIRECT_URI = process.env.RAINDROP_REDIRECT_URI || `http://localhost:${PORT}/auth/raindrop/callback`;

const oauthClient = new AuthorizationCode({
    client: {
        id: process.env.RAINDROP_CLIENT_ID,
        secret: RAINDROP_CLIENT_SECRET,
    },
    auth: {
        tokenHost: 'https://raindrop.io',
        authorizePath: '/oauth/authorize',
        tokenPath: '/oauth/access_token',
    },
});

const transports: Record<string, StreamableHTTPServerTransport> = {};
const sseTransports: Record<string, SSEServerTransport> = {};

// Create native HTTP server
const server = http.createServer(async (req, res) => {
    try {
        const url = parseUrl(req.url || '', true);
        // CORS handling
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, MCP-Session-Id');

        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }

        // Routing
        if (url.pathname === '/auth/raindrop' && req.method === 'GET') {
            if (!process.env.RAINDROP_CLIENT_ID) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('RAINDROP_CLIENT_ID not set');
                return;
            }
            const authorizationUri = oauthClient.authorizeURL({
                redirect_uri: RAINDROP_REDIRECT_URI,
                scope: 'read write',
            });
            res.writeHead(302, { Location: authorizationUri });
            res.end();
            return;
        }

        if (url.pathname === '/auth/raindrop/callback' && req.method === 'GET') {
            const code = url.query.code as string | undefined;
            if (!code) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Missing code parameter');
                return;
            }
            try {
                const tokenParams = { code, redirect_uri: RAINDROP_REDIRECT_URI };
                const accessToken = await oauthClient.getToken(tokenParams as any);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ access_token: accessToken.token.access_token }));
            } catch (error: any) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message || 'OAuth token exchange failed' }));
            }
            return;
        }

        if (url.pathname === '/health' && req.method === 'GET') {
            const sessions = Array.from(sessionMetadata.values());
            const streamableSessions = sessions.filter(s => s.type !== 'sse');
            const sseSessions = sessions.filter(s => s.type === 'sse');
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 'healthy',
                service: 'raindrop-mcp-optimized',
                version: '2.0.0',
                port: PORT,
                activeSessions: sessions.length,
                sessionTypes: {
                    streamable: streamableSessions.length,
                    sse: sseSessions.length,
                },
                sessions,
                optimizations: {
                    toolCount: 24,
                    originalToolCount: 37,
                    reduction: '35%',
                    features: [
                        'Consolidated tools with operation parameters',
                        'AI-friendly descriptions and examples',
                        'Consistent naming conventions',
                        'Enhanced parameter documentation',
                        'Standardized resource URI patterns',
                        'Improved error handling with suggestions',
                    ],
                },
                transports: {
                    modern: 'StreamableHTTPServerTransport (/mcp endpoint)',
                    legacy: 'SSEServerTransport (/sse + /messages endpoints)',
                },
            }));
            return;
        }

        if (url.pathname === '/' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                name: 'Raindrop MCP HTTP Server',
                version: '2.0.0',
                description: 'Optimized Model Context Protocol server for Raindrop.io with enhanced AI-friendly tools',
                endpoints: {
                    '/': 'This documentation',
                    '/health': 'Health check with session info and optimization details',
                    '/mcp': 'MCP protocol endpoint (POST only) - Modern StreamableHTTP transport',
                    '/sse': 'Legacy SSE connection endpoint (GET) - Server-Sent Events transport',
                    '/messages': 'Legacy SSE message endpoint (POST) - Send messages to SSE transport',
                },
                optimizations: {
                    tools: { original: 37, optimized: 24, improvement: '35% reduction in tool count' },
                    categories: [
                        'Collections (7 tools)',
                        'Bookmarks (6 tools)',
                        'Tags (2 tools)',
                        'Highlights (4 tools)',
                        'User (2 tools)',
                        'Import/Export (3 tools)',
                    ],
                    features: [
                        'Hierarchical tool naming (category_action pattern)',
                        'Rich contextual descriptions with use cases',
                        'Comprehensive parameter documentation',
                        'Smart tool consolidation with operation parameters',
                        'Standardized resource URI patterns (raindrop://type/scope)',
                        'Enhanced error messages with actionable suggestions',
                    ],
                },
                usage: {
                    'MCP Inspector': `npx @modelcontextprotocol/inspector http://localhost:${PORT}/mcp`,
                    'Direct API': `POST http://localhost:${PORT}/mcp`,
                    'Legacy SSE': `GET http://localhost:${PORT}/sse + POST http://localhost:${PORT}/messages`,
                    'Compare with original': `Original server on port 3001, optimized on port ${PORT}`,
                },
            }));
            return;
        }

        // SSE endpoint for legacy clients (GET to establish SSE connection)
        if (url.pathname === '/sse' && req.method === 'GET') {
            try {
                const sessionId = randomUUID();
                const transport = new SSEServerTransport('/messages', res, {
                    allowedOrigins: ['*'], // Allow all origins for development
                    enableDnsRebindingProtection: false, // Disable for compatibility
                });

                transport.onclose = () => {
                    delete sseTransports[sessionId];
                    sessionMetadata.delete(sessionId);
                    logger.info(`SSE session cleaned up: ${sessionId}`);
                };

                // Store the transport
                sseTransports[sessionId] = transport;
                sessionMetadata.set(sessionId, { 
                    id: sessionId, 
                    type: 'sse',
                    created: new Date().toISOString(), 
                    uptime: 0 
                });

                // Connect to MCP server first, then start the SSE connection
                await mcpServer.connect(transport);
                
                logger.info(`SSE session established: ${sessionId}`);
            } catch (error) {
                logger.error('Error establishing SSE connection:', error);
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Failed to establish SSE connection' }));
                }
            }
            return;
        }

        // Messages endpoint for SSE transport (POST to send messages)
        if (url.pathname === '/messages' && req.method === 'POST') {
            // Collect body
            const chunks: Uint8Array[] = [];
            for await (const chunk of req) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
            const raw = Buffer.concat(chunks).toString('utf8');
            
            let body: any = undefined;
            try {
                body = raw ? JSON.parse(raw) : undefined;
            } catch (err) {
                logger.warn('Invalid JSON body on /messages');
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON body' }));
                return;
            }

            try {
                // Find the SSE transport by session ID in headers or body
                const sessionId = req.headers['mcp-session-id'] as string || body?.sessionId;
                const transport = sessionId ? sseTransports[sessionId] : null;

                if (!transport) {
                    // If no specific session, try to route to any available SSE transport
                    const availableTransports = Object.values(sseTransports);
                    if (availableTransports.length === 0) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'No active SSE session found' }));
                        return;
                    }
                    // Use the first available transport
                    const fallbackTransport = availableTransports[0];
                    if (!fallbackTransport) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'No active SSE session found' }));
                        return;
                    }
                    await fallbackTransport.handlePostMessage(req, res, body);
                } else {
                    await transport.handlePostMessage(req, res, body);
                }
                
                logger.debug(`SSE message handled for session: ${sessionId || 'auto-routed'}`);
            } catch (error) {
                logger.error('Error handling SSE message:', error);
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Failed to handle SSE message' }));
                }
            }
            return;
        }

        // MCP endpoint handling (POST only in original)
        if (url.pathname === '/mcp') {
            // Collect body
            const chunks: Uint8Array[] = [];
            for await (const chunk of req) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
            const raw = Buffer.concat(chunks).toString('utf8');
            let body: any = undefined;
            try {
                body = raw ? JSON.parse(raw) : undefined;
            } catch (err) {
                logger.warn('Invalid JSON body on /mcp');
            }

            try {
                const sessionId = req.headers['mcp-session-id'] as string | undefined;
                let transport: StreamableHTTPServerTransport;

                if (sessionId && transports[sessionId]) {
                    transport = transports[sessionId];
                    logger.debug(`Reusing optimized session: ${sessionId}`);
                } else if (!sessionId && req.method === 'POST' && isInitializeRequest(body)) {
                    logger.info('Creating new optimized Streamable HTTP session');
                    transport = new StreamableHTTPServerTransport({
                        sessionIdGenerator: () => randomUUID(),
                        onsessioninitialized: (sessionId) => {
                            transports[sessionId] = transport;
                            sessionMetadata.set(sessionId, { id: sessionId, created: new Date().toISOString(), uptime: 0 });
                            logger.info(`New optimized Streamable HTTP session initialized: ${sessionId}`);
                        },
                    });

                    transport.onclose = () => {
                        if (transport.sessionId) {
                            delete transports[transport.sessionId];
                            sessionMetadata.delete(transport.sessionId);
                            logger.info(`Optimized Streamable HTTP session cleaned up: ${transport.sessionId}`);
                        }
                    };

                    await mcpServer.connect(transport);
                } else {
                    logger.warn('Invalid optimized MCP request: missing session ID or invalid initialization');
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ jsonrpc: '2.0', error: { code: -32000, message: 'Bad Request: No valid session ID provided or missing initialization' }, id: null }));
                    return;
                }

                // delegate to transport
                await transport.handleRequest(req as any, res as any, body);
            } catch (error) {
                logger.error('Error handling optimized Streamable HTTP request:', error);
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ jsonrpc: '2.0', error: { code: -32603, message: 'Internal server error' }, id: null }));
                }
            }
            return;
        }

        // Not found
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    } catch (err) {
        logger.error('Server error:', err);
        try {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        } catch { }
    }
});

// Provide a minimal listen function for compatibility
app.listen = (port: number, cb?: () => void) => server.listen(port, cb);

// Instantiate the shared MCP service and get the server instance
const raindropMCP = new RaindropMCPService();
const mcpServer = raindropMCP.getServer();
const cleanup = raindropMCP.cleanup.bind(raindropMCP);

/**
 * MCP protocol endpoint with session management and transport handling.
 */
/**
 * Starts the MCP HTTP server and logs endpoints.
 */
const serverInstance = server.listen(PORT, () => {
    logger.info(`Optimized Raindrop MCP HTTP Server running on port ${PORT}`);
    logger.info(`MCP Inspector: npx @modelcontextprotocol/inspector http://localhost:${PORT}/mcp`);
    logger.info(`Health check: http://localhost:${PORT}/health`);
    logger.info(`Documentation: http://localhost:${PORT}/`);
    logger.info(`Modern transport: http://localhost:${PORT}/mcp (StreamableHTTP)`);
    logger.info(`Legacy transport: http://localhost:${PORT}/sse + http://localhost:${PORT}/messages (SSE)`);
    logger.info(`Optimizations: 24 tools (vs 37 original), enhanced AI-friendly interface`);
});

/**
 * Graceful shutdown handler for SIGINT.
 */
process.on('SIGINT', async () => {
    logger.info('Shutting down optimized HTTP server...');
    // Close all active sessions
    logger.info(`Closing ${Object.keys(transports).length} streamable sessions and ${Object.keys(sseTransports).length} SSE sessions`);
    
    // Clean up streamable transports
    Object.values(transports).forEach(transport => {
        try {
            transport.close();
        } catch (error) {
            logger.error('Error closing streamable transport:', error);
        }
    });
    
    // Clean up SSE transports
    Object.values(sseTransports).forEach(transport => {
        try {
            transport.close();
        } catch (error) {
            logger.error('Error closing SSE transport:', error);
        }
    });
    
    sessionMetadata.clear();
    // Close server
    serverInstance.close(() => {
        logger.info('Optimized HTTP server stopped');
        process.exit(0);
    });
});

export { activeSessions, server as app, transports, sseTransports };
