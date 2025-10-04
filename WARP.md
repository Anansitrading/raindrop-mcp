# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Raindrop MCP** is a Model Context Protocol (MCP) server that exposes Raindrop.io bookmark management functionality to AI assistants. The server implements both STDIO and HTTP transports, dynamic resource handling, and comprehensive tool support.

**Tech Stack:** TypeScript, Bun runtime, Zod validation, MCP SDK v1.18.0, Vitest testing

**Version:** 2.0.16

## Essential Commands

### Development
```bash
# Install dependencies
bun install

# Development with watch mode (STDIO)
bun run dev

# Development with watch mode (HTTP server on port 3002)
bun run dev:http

# Type checking
bun run type-check

# Run tests (requires RAINDROP_ACCESS_TOKEN in .env)
bun test

# Run tests with coverage
bun run test:coverage
```

### Building & Running
```bash
# Build the project (outputs to build/ directory)
bun run build

# Run built STDIO server
bun run start:prod

# Run HTTP server (development)
bun run start:http

# Run as CLI executable
bun run run
```

### Debugging & Inspection
```bash
# MCP Inspector for STDIO transport
bun run inspector

# MCP Inspector for HTTP transport  
bun run inspector:http-server

# List available tools via Inspector CLI
npx -y @modelcontextprotocol/inspector --cli node build/index.js --method tools/list

# Send ping request via Inspector CLI
npx -y @modelcontextprotocol/inspector --cli node build/index.js --method ping
```

### Maintenance & Release
```bash
# Clean build directory
bun run clean

# Version bumping
bun run bump:patch    # 2.0.16 → 2.0.17
bun run bump:minor    # 2.0.16 → 2.1.0
bun run bump:major    # 2.0.16 → 3.0.0

# Create DXT package
bun run dxt:pack

# Tag version and push
bun run tag:version

# Publish to npm
bun run bun:publish:npm

# Create GitHub release with DXT manifest
bun run release:dxt
```

### Code Generation (when OpenAPI spec changes)
```bash
# Generate TypeScript types from OpenAPI spec
bun run generate:schema

# Generate API client from OpenAPI spec
bun run generate:client
```

## Architecture & Code Structure

### Entry Points
- **`src/index.ts`**: STDIO server entry point (default MCP transport)
- **`src/server.ts`**: HTTP server entry point (port 3002)
- **`src/cli.ts`**: CLI executable entry point

### Core Service Layer

#### RaindropMCPService (`src/services/raindropmcp.service.ts`)
The main MCP protocol implementation. Key responsibilities:
- **Tool Registration**: Declarative tool configuration using `ToolConfig` interfaces
- **Resource Management**: Dynamic resources (`mcp://collection/{id}`, `mcp://raindrop/{id}`) and static resources (`mcp://user/profile`, `diagnostics://server`)
- **Protocol Compliance**: Handles MCP server lifecycle, tool calls, and resource reads
- **Response Formatting**: Uses `resource_link` pattern for efficient data access

**Tool Definition Pattern:**
```typescript
const toolConfigs = [
  defineTool<InputType, OutputType>({
    name: 'tool_name',
    description: 'Tool description',
    inputSchema: ZodInputSchema,
    outputSchema: ZodOutputSchema,
    handler: async (args, context) => { /* implementation */ }
  })
];
```

**Resource Link Pattern:**
Tools return lightweight links instead of full data:
```typescript
const makeCollectionLink = (collection: any): McpContent => ({
  type: 'resource_link',
  uri: `mcp://collection/${collection._id}`,
  name: collection.title,
  description: `Collection with ${collection.count} bookmarks`,
  mimeType: 'application/json'
});
```

#### RaindropService (`src/services/raindrop.service.ts`)
The Raindrop.io API client. Features:
- **Common Response Handlers**: `handleItemResponse<T>()`, `handleItemsResponse<T>()`, `handleCollectionResponse()`, `handleResultResponse()`
- **Endpoint Builders**: `buildTagEndpoint()`, `buildRaindropEndpoint()`
- **Error Management**: `handleApiError()`, `safeApiCall()` for consistent error handling
- **Type Safety**: Generic typing throughout the service layer
- **25-30% Code Reduction**: Through extracted common functions and patterns

### Type System (`src/types/`)
- **`mcp.ts`**: MCP protocol types
- **`raindrop-zod.schemas.ts`**: Zod validation schemas for all inputs/outputs
- **`raindrop.schema.d.ts`**: Generated TypeScript types from OpenAPI spec
- **`simple-oauth2.d.ts`**: OAuth type definitions

### Testing (`tests/`)
- **`mcp.service.test.ts`**: Integration tests with real Raindrop.io API (11 test cases)
- **`raindrop.service.test.ts`**: Core service layer tests
- **Test Requirements**: Valid `RAINDROP_ACCESS_TOKEN` in `.env` file
- **Framework**: Vitest with TypeScript support

## MCP Tools & Resources

### Currently Registered Tools (9 total)

1. **diagnostics** - Server diagnostics and environment information
2. **collection_list** - List all collections (returns resource links)
3. **collection_manage** - Create, update, or delete collections (operation: create|update|delete)
4. **bookmark_search** - Search bookmarks with filtering (returns resource links)
5. **bookmark_manage** - Create, update, or delete bookmarks (operation: create|update|delete)
6. **tag_manage** - Rename, merge, or delete tags (operation: rename|merge|delete)
7. **highlight_manage** - Create, update, or delete highlights (operation: create|update|delete)
8. **getRaindrop** - Fetch single bookmark by ID (legacy)
9. **listRaindrops** - List bookmarks for collection (legacy)
10. **bulk_edit_raindrops** - Bulk update tags, favorites, media, cover, or move bookmarks

### Resource System

**Static Resources:**
- `mcp://user/profile` - User account information (real-time API data)
- `diagnostics://server` - Server diagnostics

**Dynamic Resource Patterns:**
- `mcp://collection/{id}` - Any collection by ID (e.g., `mcp://collection/123456`)
- `mcp://raindrop/{id}` - Any bookmark by ID (e.g., `mcp://raindrop/987654`)

Resources are fetched on-demand from Raindrop.io API without pre-registration.

## Development Patterns & Best Practices

### Adding New Tools
1. Define Zod schemas for input and output in `src/types/raindrop-zod.schemas.ts`
2. Create handler function following async pattern
3. Add tool configuration to `toolConfigs` array in `RaindropMCPService`
4. Use `defineTool<InputType, OutputType>()` helper for type safety
5. Return `resource_link` objects for list operations, full data for single items
6. Add tests to `tests/mcp.service.test.ts`

### Error Handling
- Use `try/catch` blocks in all async operations
- Throw descriptive errors with context (e.g., "Collection not found: 123456")
- Validate inputs with Zod schemas at the tool boundary
- Use `safeApiCall()` wrapper from RaindropService for API calls

### Code Style
- **Imports**: ESM modules with `.js` extension (required for Bun ESM)
- **Naming**: camelCase for functions/variables, PascalCase for classes/types
- **Typing**: Explicit TypeScript types, prefer interfaces for objects
- **Async**: Consistent async/await pattern, no callbacks
- **Validation**: Zod for all input/output validation
- **Logging**: Use `createLogger()` utility, avoid console.log in MCP-facing code

### Testing Strategy
- Write integration tests for new tools in `tests/mcp.service.test.ts`
- Use real API calls (not mocks) to validate actual behavior
- Test dynamic resource URIs with various IDs
- Validate tool response structure matches schemas
- Test error handling with invalid inputs

## Configuration & Environment

### Required Environment Variables
```bash
# .env file (copy from .env.example)
RAINDROP_ACCESS_TOKEN=your_token_here  # Get from https://app.raindrop.io/settings/integrations
LOG_LEVEL=info                          # Optional: debug|info|warn|error
```

### MCP Client Configuration
Add to your MCP client's configuration (e.g., `.mcp.json`):
```json
{
  "raindrop": {
    "command": "npx",
    "args": ["@adeze/raindrop-mcp@latest"],
    "env": {
      "RAINDROP_ACCESS_TOKEN": "YOUR_API_TOKEN"
    }
  }
}
```

## Key Dependencies

- **@modelcontextprotocol/sdk** (^1.18.0) - MCP protocol implementation
- **zod** (3.24.1) - Schema validation
- **axios** (^1.12.2) - HTTP client for Raindrop.io API
- **express** (^5.1.0) - HTTP server transport
- **vitest** (^3.2.4) - Testing framework

## Documentation References

### External Documentation
- [Raindrop.io API](https://developer.raindrop.io)
- [MCP Specification](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector)

### Internal Documentation
- `README.md` - Full project documentation and usage
- `CLAUDE.md` - Detailed architecture and development guidelines
- `AGENTS.md` - Multi-agent collaboration guidelines
- `LOGGING_DIAGNOSTICS.md` - Logging system documentation
- `.github/copilot-instructions.md` - Coding standards and conventions
- `.github/instructions/` - Specialized instruction files (DXT, MCP refactoring, inspector)

## Known Patterns

### Service Layer Optimization
The codebase uses extracted common functions to reduce duplication:
- Response handlers (`handleItemResponse`, `handleItemsResponse`)
- Endpoint builders (`buildTagEndpoint`, `buildRaindropEndpoint`)
- Error wrappers (`handleApiError`, `safeApiCall`)

When adding new API methods, reuse these patterns.

### Dynamic Resource System
Resources don't need pre-registration. The `readResource()` method:
1. Parses the URI to extract resource type and ID
2. Calls appropriate RaindropService method to fetch data
3. Returns formatted MCP content with metadata
4. Handles non-existent resources gracefully

### Tool Handler Context
All tool handlers receive a `ToolHandlerContext` object:
```typescript
interface ToolHandlerContext {
  raindropService: RaindropService;
  [key: string]: unknown;
}
```

Use dependency injection pattern - don't instantiate services directly in handlers.

## Version Control & Release

### Automated Release Flow
1. Make changes and commit
2. Run `bun run bump:patch` (or minor/major)
3. Run `bun run tag:version` to create git tag and trigger CI
4. GitHub Actions workflow handles npm publishing
5. Optionally run `bun run release:dxt` for DXT manifest release

### Manual Publishing
```bash
bun run build
bun run bun:publish:npm
bun run bun:publish:github
```

**Requirements for releases:**
- GitHub CLI (`gh`) installed and authenticated
- `jq` installed for JSON parsing
- Valid npm authentication
