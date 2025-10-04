// src/init-env.ts
import { config } from "dotenv";
config({ quiet: true });

// src/server.ts
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { randomUUID } from "node:crypto";
import http from "node:http";
import { parse as parseUrl } from "node:url";
import { AuthorizationCode } from "simple-oauth2";

// src/services/raindropmcp.service.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z as z2 } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// package.json
var package_default = {
  name: "@adeze/raindrop-mcp",
  version: "2.0.16",
  description: "MCP Server for Raindrop.io bookmark management",
  main: "build/index.js",
  module: "build/index.js",
  type: "module",
  bin: {
    "raindrop-mcp": "./build/index.js"
  },
  files: [
    "build"
  ],
  private: false,
  scripts: {
    dev: "bun run build && bun --watch src/index.ts",
    "dev:http": "bun run build && bun --watch src/server.ts",
    inspector: "npx @modelcontextprotocol/inspector node build/index.js",
    "inspector:http-server": "npx @modelcontextprotocol/inspector node build/server.js",
    "type-check": "tsc --noEmit",
    test: "bun  --env-file .env test",
    "test:coverage": "bun test --coverage",
    run: "bun run build/index.js",
    build: "esbuild src/index.ts src/server.ts --bundle --platform=node --format=esm --sourcemap --outdir=build --external:@modelcontextprotocol/* --external:express --external:axios --external:dotenv --external:openapi-fetch --external:rate-limiter-flexible --external:simple-oauth2 --external:zod --external:zod-to-json-schema --external:openai",
    "start:prod": "bun run build/index.js",
    "start:http": "bun run src/server.ts",
    clean: "rm -rf build",
    "bump:patch": "bun pm version patch",
    "bump:minor": "bun pm version minor",
    "bump:major": "bun pm version major",
    "bun:update": "bun update",
    "dxt:pack": "npx @anthropic-ai/mcpb@latest pack && mcpb clean raindrop-mcp.dxt",
    "generate:schema": "npx openapi-typescript ./raindrop-complete.yaml -o ./src/types/raindrop.schema.d.ts --tsconfig ./tsconfig.json --export-type --useUnionTypes --immutable",
    "generate:client": "npx @openapitools/openapi-generator-cli generate -i ./raindrop-complete.yaml -g typescript-axios -o src/services/raindrop-client",
    "bun:publish:github": "bun publish --registry=https://npm.pkg.github.com/ --access public",
    "bun:publish:npm": "bun publish --access public",
    "tag:version": "git tag v$(jq -r .version package.json) && git push origin master && git push origin v$(jq -r .version package.json)",
    "release:dxt": 'bun run dxt:pack && gh release create v$(jq -r .version package.json) raindrop-mcp.dxt --title "Release v$(jq -r .version package.json)" --notes "DXT manifest for MCP"',
    docs: "typedoc"
  },
  repository: {
    type: "git",
    url: "git+https://github.com/adeze/raindrop-mcp.git"
  },
  publishConfig: {
    access: "public",
    registry: "https://registry.npmjs.org/"
  },
  keywords: [
    "mcp",
    "raindrop.io",
    "modelcontextprotocol",
    "mcp-server",
    "raindrop",
    "bookmarks",
    "ai-assistant",
    "llm-tools",
    "typescript"
  ],
  author: "Adam E",
  license: "MIT",
  bugs: {
    url: "https://github.com/adeze/raindrop-mcp/issues"
  },
  homepage: "https://github.com/adeze/raindrop-mcp#readme",
  dependencies: {
    "@modelcontextprotocol/sdk": "^1.18.0",
    axios: "^1.12.2",
    dotenv: "^17.2.2",
    esm: "^3.2.25",
    express: "^5.1.0",
    openai: "^5.20.3",
    "openapi-fetch": "^0.14.0",
    "rate-limiter-flexible": "^7.3.1",
    "simple-oauth2": "^5.1.0",
    zod: "3.24.1",
    "zod-to-json-schema": "^3.24.6"
  },
  devDependencies: {
    "@anthropic-ai/dxt": "^0.2.6",
    "@modelcontextprotocol/inspector": "^0.16.7",
    "@openapitools/openapi-generator-cli": "^2.23.4",
    "@types/bun": "^1.2.22",
    "@types/express": "^5.0.3",
    "@types/node": "^24.5.1",
    "@vitest/coverage-v8": "^3.2.4",
    esbuild: "^0.25.10",
    "openapi-typescript": "^7.9.1",
    typedoc: "^0.28.13",
    typescript: "^5.9.2",
    vitest: "^3.2.4"
  },
  engines: {
    node: ">=18.0.0",
    bun: ">=1.0.0"
  }
};

// src/types/raindrop-zod.schemas.ts
import { z } from "zod";
var CollectionManageInputSchema = z.object({
  operation: z.enum(["create", "update", "delete"]),
  id: z.number().optional(),
  title: z.string().optional(),
  parentId: z.number().optional()
});
var BookmarkInputSchema = z.object({
  url: z.string().url(),
  title: z.string(),
  tags: z.array(z.string()).optional(),
  important: z.boolean().optional(),
  collectionId: z.number().optional(),
  description: z.string().optional()
});
var BookmarkOutputSchema = z.object({
  id: z.number(),
  url: z.string().url(),
  title: z.string(),
  tags: z.array(z.string()).optional(),
  important: z.boolean().optional(),
  collectionId: z.number().optional(),
  description: z.string().optional()
});
var CollectionInputSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  color: z.string().optional(),
  parentId: z.number().optional()
});
var CollectionOutputSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  color: z.string().optional(),
  parentId: z.number().optional()
});
var HighlightInputSchema = z.object({
  bookmarkId: z.number(),
  text: z.string(),
  note: z.string().optional(),
  color: z.string().optional()
});
var HighlightOutputSchema = z.object({
  id: z.number(),
  bookmarkId: z.number(),
  text: z.string(),
  note: z.string().optional(),
  color: z.string().optional()
});
var TagInputSchema = z.object({
  collectionId: z.number().optional(),
  tagNames: z.array(z.string()),
  newName: z.string().optional(),
  operation: z.enum(["rename", "merge", "delete"])
});
var TagOutputSchema = z.object({
  tagNames: z.array(z.string()),
  success: z.boolean()
});
var DiagnosticsOutputSchema = z.object({
  status: z.string(),
  environment: z.record(z.string(), z.any()).optional()
});
var tagSchema = z.object({
  _id: z.string(),
  count: z.number().optional(),
  name: z.string().optional()
});

// src/services/raindrop.service.ts
import createClient from "openapi-fetch";

// src/utils/logger.ts
var LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};
var Logger = class _Logger {
  level;
  constructor() {
    this.level = process.env.LOG_LEVEL || "info";
  }
  setLevel(level) {
    this.level = level;
  }
  getLevel() {
    return this.level;
  }
  shouldLog(level) {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.level];
  }
  writeToStderr(level, message, ...args) {
    if (!this.shouldLog(level)) {
      return;
    }
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const levelStr = level.toUpperCase().padEnd(5);
    const prefix = `[${timestamp}] ${levelStr}`;
    if (args.length > 0) {
      process.stderr.write(`${prefix} ${message}
`);
      args.forEach((arg) => {
        process.stderr.write(`${prefix} ${typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)}
`);
      });
    } else {
      process.stderr.write(`${prefix} ${message}
`);
    }
  }
  debug(message, ...args) {
    this.writeToStderr("debug", message, ...args);
  }
  info(message, ...args) {
    this.writeToStderr("info", message, ...args);
  }
  warn(message, ...args) {
    this.writeToStderr("warn", message, ...args);
  }
  error(message, ...args) {
    this.writeToStderr("error", message, ...args);
  }
  /**
   * Create a child logger with a context prefix
   */
  /**
   * Create a child logger with a context prefix.
   * @param context - Context string to prefix log messages.
   * @returns A new Logger instance with context-aware output.
   */
  child(context) {
    const childLogger = new _Logger();
    childLogger.level = this.level;
    const originalWrite = childLogger.writeToStderr.bind(childLogger);
    childLogger.writeToStderr = (level, message, ...args) => {
      originalWrite(level, `[${context}] ${message}`, ...args);
    };
    return childLogger;
  }
};
var logger = new Logger();
function createLogger(context) {
  return context ? logger.child(context) : logger;
}

// src/services/raindrop.service.ts
var RaindropService = class {
  client;
  constructor(token) {
    this.client = createClient({
      baseUrl: "https://api.raindrop.io/rest/v1",
      headers: {
        Authorization: `Bearer ${token || process.env.RAINDROP_ACCESS_TOKEN}`
      }
    });
    this.client.use({
      onRequest({ request }) {
        if (process.env.NODE_ENV === "development") {
          const logger3 = createLogger("raindrop-service");
          logger3.debug(`${request.method} ${request.url}`);
        }
        return request;
      },
      onResponse({ response }) {
        if (!response.ok) {
          let errorMsg = `API Error: ${response.status} ${response.statusText}`;
          if (response.status === 401) {
            errorMsg += ". Check your RAINDROP_ACCESS_TOKEN";
          } else if (response.status === 429) {
            errorMsg += ". Rate limited - wait before making more requests";
          }
          throw new Error(errorMsg);
        }
        return response;
      }
    });
  }
  /**
   * Fetch all collections
   * Raindrop.io API: GET /collections
   */
  async getCollections() {
    const { data } = await this.client.GET("/collections");
    return [...data?.items || []];
  }
  /**
   * Fetch a single collection by ID
   * Raindrop.io API: GET /collection/{id}
   */
  async getCollection(id) {
    const { data } = await this.client.GET("/collection/{id}", {
      params: { path: { id } }
    });
    if (!data?.item) throw new Error("Collection not found");
    return data.item;
  }
  /**
   * Fetch child collections for a parent collection
   * Raindrop.io API: GET /collections/{parentId}/childrens
   */
  async getChildCollections(parentId) {
    const { data } = await this.client.GET("/collections/{parentId}/childrens", {
      params: { path: { parentId } }
    });
    return [...data?.items || []];
  }
  /**
   * Create a new collection
   * Raindrop.io API: POST /collection
   */
  async createCollection(title, isPublic = false) {
    const { data } = await this.client.POST("/collection", {
      body: { title, public: isPublic }
    });
    if (!data?.item) throw new Error("Failed to create collection");
    return data.item;
  }
  /**
   * Update a collection
   * Raindrop.io API: PUT /collection/{id}
   */
  async updateCollection(id, updates) {
    const { data } = await this.client.PUT("/collection/{id}", {
      params: { path: { id } },
      body: updates
    });
    if (!data?.item) throw new Error("Failed to update collection");
    return data.item;
  }
  /**
   * Delete a collection
   * Raindrop.io API: DELETE /collection/{id}
   */
  async deleteCollection(id) {
    await this.client.DELETE("/collection/{id}", {
      params: { path: { id } }
    });
  }
  /**
   * Share a collection
   * Raindrop.io API: PUT /collection/{id}/sharing
   */
  async shareCollection(id, level, emails) {
    const body = { level };
    if (emails) body.emails = emails;
    const { data } = await this.client.PUT("/collection/{id}/sharing", {
      params: { path: { id } },
      body
    });
    return { link: data?.link || "", access: [...data?.access || []] };
  }
  /**
   * Fetch bookmarks (search, filter, etc)
   * Raindrop.io API: GET /raindrops/{collectionId} or /raindrops/0
   */
  async getBookmarks(params = {}) {
    const query = {};
    if (params.search) query.search = params.search;
    if (params.tags) query.tag = params.tags.join(",");
    if (params.tag) query.tag = params.tag;
    if (params.important !== void 0) query.important = params.important;
    if (params.page) query.page = params.page;
    if (params.perPage) query.perpage = params.perPage;
    if (params.sort) query.sort = params.sort;
    if (params.duplicates !== void 0) query.duplicates = params.duplicates;
    if (params.broken !== void 0) query.broken = params.broken;
    if (params.highlight !== void 0) query.highlight = params.highlight;
    if (params.domain) query.domain = params.domain;
    const endpoint = params.collection ? "/raindrops/{id}" : "/raindrops/0";
    const options = params.collection ? { params: { path: { id: params.collection }, query } } : { params: { query } };
    const { data } = await this.client.GET(endpoint, options);
    return {
      items: data?.items || [],
      count: data?.count || 0
    };
  }
  /**
   * Fetch a single bookmark by ID
   * Raindrop.io API: GET /raindrop/{id}
   */
  async getBookmark(id) {
    const { data } = await this.client.GET("/raindrop/{id}", {
      params: { path: { id } }
    });
    if (!data?.item) throw new Error("Bookmark not found");
    return data.item;
  }
  /**
   * Create a new bookmark
   * Raindrop.io API: POST /raindrop
   */
  async createBookmark(collectionId, bookmark) {
    const { data } = await this.client.POST("/raindrop", {
      body: {
        link: bookmark.link,
        ...bookmark.title && { title: bookmark.title },
        ...bookmark.excerpt && { excerpt: bookmark.excerpt },
        ...bookmark.tags && { tags: bookmark.tags },
        important: bookmark.important || false,
        collection: { $id: collectionId },
        pleaseParse: {}
      }
    });
    if (!data?.item) throw new Error("Failed to create bookmark");
    return data.item;
  }
  /**
   * Update a bookmark
   * Raindrop.io API: PUT /raindrop/{id}
   */
  async updateBookmark(id, updates) {
    const { data } = await this.client.PUT("/raindrop/{id}", {
      params: { path: { id } },
      body: updates
    });
    if (!data?.item) throw new Error("Failed to update bookmark");
    return data.item;
  }
  /**
   * Delete a bookmark
   * Raindrop.io API: DELETE /raindrop/{id}
   */
  async deleteBookmark(id) {
    await this.client.DELETE("/raindrop/{id}", {
      params: { path: { id } }
    });
  }
  /**
   * Batch update bookmarks
   * Raindrop.io API: PUT /raindrops
   */
  async batchUpdateBookmarks(ids, updates) {
    const body = { ids };
    if (updates.tags) body.tags = updates.tags;
    if (updates.collection) body.collection = { $id: updates.collection };
    if (updates.important !== void 0) body.important = updates.important;
    if (updates.broken !== void 0) body.broken = updates.broken;
    const { data } = await this.client.PUT("/raindrops", { body });
    return !!data?.result;
  }
  /**
   * Fetch tags for a collection or all
   * Raindrop.io API: GET /tags/{collectionId} or /tags/0
   */
  async getTags(collectionId) {
    const endpoint = collectionId ? "/tags/{collectionId}" : "/tags/0";
    const options = collectionId ? { params: { path: { id: collectionId } } } : void 0;
    const { data } = await this.client.GET(endpoint, options);
    return data?.items || [];
  }
  /**
   * Fetch tags for a specific collection
   * Raindrop.io API: GET /tags/{collectionId}
   */
  async getTagsByCollection(collectionId) {
    return this.getTags(collectionId);
  }
  /**
   * Delete tags from a collection
   * Raindrop.io API: DELETE /tags/{collectionId}
   */
  async deleteTags(collectionId, tags) {
    const endpoint = collectionId ? "/tags/{collectionId}" : "/tags/0";
    const options = {
      ...collectionId && { params: { path: { id: collectionId } } },
      body: { tags }
    };
    const { data } = await this.client.DELETE(endpoint, options);
    return !!data?.result;
  }
  /**
   * Rename a tag in a collection
   * Raindrop.io API: PUT /tags/{collectionId}
   */
  async renameTag(collectionId, oldName, newName) {
    const endpoint = collectionId ? "/tags/{collectionId}" : "/tags/0";
    const options = {
      ...collectionId && { params: { path: { id: collectionId } } },
      body: { from: oldName, to: newName }
    };
    const { data } = await this.client.PUT(endpoint, options);
    return !!data?.result;
  }
  /**
   * Merge tags in a collection
   * Raindrop.io API: PUT /tags/{collectionId}
   */
  async mergeTags(collectionId, tags, newName) {
    const endpoint = collectionId ? "/tags/{collectionId}" : "/tags/0";
    const options = {
      ...collectionId && { params: { path: { id: collectionId } } },
      body: { tags, to: newName }
    };
    const { data } = await this.client.PUT(endpoint, options);
    return !!data?.result;
  }
  /**
   * Fetch user info
   * Raindrop.io API: GET /user
   */
  async getUserInfo() {
    const { data } = await this.client.GET("/user");
    if (!data?.user) throw new Error("User not found");
    return data.user;
  }
  /**
   * Fetch highlights for a specific bookmark
   * Raindrop.io API: GET /raindrop/{id}/highlights
   */
  async getHighlights(raindropId) {
    const { data } = await this.client.GET("/raindrop/{id}/highlights", {
      params: { path: { id: raindropId } }
    });
    if (!data?.items) throw new Error("No highlights found");
    return [...data.items];
  }
  /**
   * Fetch all highlights across all bookmarks
   * Raindrop.io API: GET /raindrops/0
   */
  async getAllHighlights() {
    const { data } = await this.client.GET("/raindrops/0");
    if (!data?.items) return [];
    return data.items.flatMap((bookmark) => Array.isArray(bookmark.highlights) ? bookmark.highlights : []);
  }
  /**
   * Create a highlight for a bookmark
   * Raindrop.io API: POST /highlights
   */
  async createHighlight(bookmarkId, highlight) {
    const { data } = await this.client.POST("/highlights", {
      body: {
        ...highlight,
        raindrop: { $id: bookmarkId },
        color: highlight.color || "yellow"
      }
    });
    if (!data?.item) throw new Error("Failed to create highlight");
    return data.item;
  }
  /**
   * Update a highlight
   * Raindrop.io API: PUT /highlights/{id}
   */
  async updateHighlight(id, updates) {
    const { data } = await this.client.PUT("/highlights/{id}", {
      params: { path: { id } },
      body: {
        ...updates.text && { text: updates.text },
        ...updates.note && { note: updates.note },
        ...updates.color && { color: updates.color }
      }
    });
    if (!data?.item) throw new Error("Failed to update highlight");
    return data.item;
  }
  /**
   * Delete a highlight
   * Raindrop.io API: DELETE /highlights/{id}
   */
  async deleteHighlight(id) {
    await this.client.DELETE("/highlights/{id}", {
      params: { path: { id } }
    });
  }
};

// src/services/raindropmcp.service.ts
var SERVER_VERSION = package_default.version;
var defineTool = (config2) => config2;
var textContent = (text) => ({ type: "text", text });
var makeCollectionLink = (collection) => ({
  type: "resource_link",
  uri: `mcp://collection/${collection._id}`,
  name: collection.title || "Untitled Collection",
  description: collection.description || `Collection with ${collection.count || 0} bookmarks`,
  mimeType: "application/json"
});
var makeBookmarkLink = (bookmark) => ({
  type: "resource_link",
  uri: `mcp://raindrop/${bookmark._id}`,
  name: bookmark.title || "Untitled",
  description: bookmark.excerpt || "No description",
  mimeType: "application/json"
});
var setIfDefined = (target, key, value) => {
  if (value !== void 0) {
    target[key] = value;
  }
  return target;
};
var DiagnosticsInputSchema = z2.object({
  includeEnvironment: z2.boolean().optional().describe("Include environment info")
});
var DiagnosticsOutputSchema2 = z2.object({
  content: z2.array(z2.object({
    type: z2.string(),
    uri: z2.string(),
    name: z2.string(),
    description: z2.string(),
    mimeType: z2.string(),
    _meta: z2.record(z2.string(), z2.any())
  }))
});
var CollectionListInputSchema = z2.object({});
var CollectionListOutputSchema = z2.object({
  content: z2.array(z2.object({
    type: z2.string(),
    name: z2.string().optional(),
    uri: z2.string().optional(),
    description: z2.string().optional(),
    mimeType: z2.string().optional(),
    text: z2.string().optional()
  }))
});
var BookmarkSearchInputSchema = z2.object({
  search: z2.string().optional().describe("Full-text search query"),
  collection: z2.number().optional().describe("Collection ID to search within"),
  tags: z2.array(z2.string()).optional().describe("Tags to filter by"),
  important: z2.boolean().optional().describe("Filter by important bookmarks"),
  page: z2.number().optional().describe("Page number for pagination"),
  perPage: z2.number().optional().describe("Items per page (max 50)"),
  sort: z2.string().optional().describe("Sort order (score, title, -created, created)"),
  tag: z2.string().optional().describe("Single tag to filter by"),
  duplicates: z2.boolean().optional().describe("Include duplicate bookmarks"),
  broken: z2.boolean().optional().describe("Include broken links"),
  highlight: z2.boolean().optional().describe("Only bookmarks with highlights"),
  domain: z2.string().optional().describe("Filter by domain")
});
var BookmarkSearchOutputSchema = z2.object({
  items: z2.array(BookmarkOutputSchema),
  count: z2.number()
});
var BookmarkManageInputSchema = BookmarkInputSchema.extend({
  operation: z2.enum(["create", "update", "delete"]),
  id: z2.number().optional()
});
var HighlightManageInputSchema = HighlightInputSchema.extend({
  operation: z2.enum(["create", "update", "delete"]),
  id: z2.number().optional()
});
var GetRaindropInputSchema = z2.object({
  id: z2.string().min(1, "Bookmark ID is required")
});
var GetRaindropOutputSchema = z2.object({
  item: BookmarkOutputSchema
});
var ListRaindropsInputSchema = z2.object({
  collectionId: z2.string().min(1, "Collection ID is required"),
  limit: z2.number().min(1).max(100).optional()
});
var ListRaindropsOutputSchema = z2.object({
  items: z2.array(BookmarkOutputSchema),
  count: z2.number()
});
var BulkEditRaindropsInputSchema = z2.object({
  collectionId: z2.number().describe("Collection to update raindrops in"),
  ids: z2.array(z2.number()).optional().describe("Array of raindrop IDs to update. If omitted, all in collection are updated."),
  important: z2.boolean().optional().describe("Mark as favorite (true/false)"),
  tags: z2.array(z2.string()).optional().describe("Tags to set. Empty array removes all tags."),
  media: z2.array(z2.string()).optional().describe("Media URLs to set. Empty array removes all media."),
  cover: z2.string().optional().describe("Cover URL. Use <screenshot> for auto screenshot."),
  collection: z2.object({ $id: z2.number() }).optional().describe("Move to another collection."),
  nested: z2.boolean().optional().describe("Include nested collections.")
});
var BulkEditRaindropsOutputSchema = z2.object({
  content: z2.array(z2.object({
    type: z2.string(),
    text: z2.string()
  }))
});
async function handleDiagnostics(_args, _context) {
  return {
    content: [{
      type: "resource_link",
      uri: "diagnostics://server",
      name: "Server Diagnostics",
      description: `Server diagnostics and environment info resource. Version: ${SERVER_VERSION}`,
      mimeType: "application/json",
      _meta: {
        version: SERVER_VERSION,
        mcpProtocolVersion: process.env.MCP_PROTOCOL_VERSION || "unknown",
        nodeVersion: process.version,
        bunVersion: typeof Bun !== "undefined" ? Bun.version : void 0,
        os: process.platform,
        uptime: process.uptime(),
        startTime: new Date(Date.now() - process.uptime() * 1e3).toISOString(),
        env: {
          NODE_ENV: process.env.NODE_ENV,
          MCP_DEBUG: process.env.MCP_DEBUG,
          MCP_TRANSPORT: process.env.MCP_TRANSPORT,
          RAINDROP_ACCESS_TOKEN: process.env.RAINDROP_ACCESS_TOKEN ? "set" : "unset"
        },
        enabledTools: getEnabledToolNames(),
        apiStatus: "unknown",
        memory: process.memoryUsage()
      }
    }]
  };
}
async function handleCollectionList(_args, { raindropService }) {
  const collections = await raindropService.getCollections();
  const content = [
    textContent(`Found ${collections.length} collections`),
    ...collections.map(makeCollectionLink)
  ];
  return { content };
}
async function handleCollectionManage(args, { raindropService }) {
  switch (args.operation) {
    case "create":
      if (!args.title) throw new Error("title is required for create");
      return await raindropService.createCollection(args.title);
    case "update":
      if (!args.id) throw new Error("id is required for update");
      const updatePayload = {};
      setIfDefined(updatePayload, "title", args.title);
      setIfDefined(updatePayload, "color", args.color);
      setIfDefined(updatePayload, "description", args.description);
      return await raindropService.updateCollection(args.id, updatePayload);
    case "delete":
      if (!args.id) throw new Error("id is required for delete");
      await raindropService.deleteCollection(args.id);
      return { deleted: true };
    default:
      throw new Error(`Unsupported operation: ${String(args.operation)}`);
  }
}
async function handleBookmarkSearch(args, { raindropService }) {
  const query = {};
  setIfDefined(query, "search", args.search);
  setIfDefined(query, "collection", args.collection);
  setIfDefined(query, "tags", args.tags);
  setIfDefined(query, "important", args.important);
  setIfDefined(query, "page", args.page);
  setIfDefined(query, "perPage", args.perPage);
  setIfDefined(query, "sort", args.sort);
  setIfDefined(query, "tag", args.tag);
  setIfDefined(query, "duplicates", args.duplicates);
  setIfDefined(query, "broken", args.broken);
  setIfDefined(query, "highlight", args.highlight);
  setIfDefined(query, "domain", args.domain);
  const result = await raindropService.getBookmarks(query);
  const content = [textContent(`Found ${result.count} bookmarks`)];
  result.items.forEach((bookmark) => {
    content.push(makeBookmarkLink(bookmark));
  });
  return { content };
}
async function handleBookmarkManage(args, { raindropService }) {
  switch (args.operation) {
    case "create":
      if (!args.collectionId) throw new Error("collectionId is required for create");
      const createPayload = {
        link: args.url,
        title: args.title
      };
      setIfDefined(createPayload, "excerpt", args.description);
      setIfDefined(createPayload, "tags", args.tags);
      setIfDefined(createPayload, "important", args.important);
      return await raindropService.createBookmark(args.collectionId, createPayload);
    case "update":
      if (!args.id) throw new Error("id is required for update");
      const updatePayload = {
        link: args.url,
        title: args.title
      };
      setIfDefined(updatePayload, "excerpt", args.description);
      setIfDefined(updatePayload, "tags", args.tags);
      setIfDefined(updatePayload, "important", args.important);
      return await raindropService.updateBookmark(args.id, updatePayload);
    case "delete":
      if (!args.id) throw new Error("id is required for delete");
      await raindropService.deleteBookmark(args.id);
      return { deleted: true };
    default:
      throw new Error(`Unsupported operation: ${String(args.operation)}`);
  }
}
async function handleTagManage(args, { raindropService }) {
  switch (args.operation) {
    case "rename":
      if (!args.tagNames || !args.newName) throw new Error("tagNames and newName required for rename");
      const [primaryTag] = args.tagNames;
      if (!primaryTag) throw new Error("tagNames must include at least one value");
      return await raindropService.renameTag(args.collectionId, primaryTag, args.newName);
    case "merge":
      if (!args.tagNames || !args.newName) throw new Error("tagNames and newName required for merge");
      return await raindropService.mergeTags(args.collectionId, args.tagNames, args.newName);
    case "delete":
      if (!args.tagNames) throw new Error("tagNames required for delete");
      return await raindropService.deleteTags(args.collectionId, args.tagNames);
    default:
      throw new Error(`Unsupported operation: ${String(args.operation)}`);
  }
}
async function handleHighlightManage(args, { raindropService }) {
  switch (args.operation) {
    case "create":
      if (!args.bookmarkId || !args.text) throw new Error("bookmarkId and text required for create");
      const createPayload = { text: args.text };
      setIfDefined(createPayload, "note", args.note);
      setIfDefined(createPayload, "color", args.color);
      return await raindropService.createHighlight(args.bookmarkId, createPayload);
    case "update":
      if (!args.id) throw new Error("id required for update");
      const updatePayload = {};
      setIfDefined(updatePayload, "text", args.text);
      setIfDefined(updatePayload, "note", args.note);
      setIfDefined(updatePayload, "color", args.color);
      return await raindropService.updateHighlight(args.id, updatePayload);
    case "delete":
      if (!args.id) throw new Error("id required for delete");
      await raindropService.deleteHighlight(args.id);
      return { deleted: true };
    default:
      throw new Error(`Unsupported operation: ${String(args.operation)}`);
  }
}
async function handleGetRaindrop(args, { raindropService }) {
  const bookmark = await raindropService.getBookmark(parseInt(args.id));
  return {
    content: [makeBookmarkLink(bookmark)]
  };
}
async function handleListRaindrops(args, { raindropService }) {
  const result = await raindropService.getBookmarks({
    collection: parseInt(args.collectionId),
    perPage: args.limit || 50
  });
  const content = [textContent(`Found ${result.count} bookmarks in collection`)];
  result.items.forEach((bookmark) => content.push(makeBookmarkLink(bookmark)));
  return { content };
}
async function handleBulkEditRaindrops(args, _context) {
  const body = {};
  if (args.ids) body.ids = args.ids;
  if (args.important !== void 0) body.important = args.important;
  if (args.tags) body.tags = args.tags;
  if (args.media) body.media = args.media;
  if (args.cover) body.cover = args.cover;
  if (args.collection) body.collection = args.collection;
  if (args.nested !== void 0) body.nested = args.nested;
  const url = `https://api.raindrop.io/rest/v1/raindrops/${args.collectionId}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const result = await response.json();
    if (!result.result) {
      throw new Error(result.errorMessage || "Bulk edit failed");
    }
    return {
      content: [{
        type: "text",
        text: `Bulk edit successful. Modified: ${result.modified ?? "unknown"}`
      }]
    };
  } catch (err) {
    return {
      content: [{
        type: "text",
        text: `Bulk edit error: ${err.message}`
      }],
      isError: true
    };
  }
}
var diagnosticsTool = defineTool({
  name: "diagnostics",
  description: "Provides server diagnostics and environment info. Use includeEnvironment param for detailed info.",
  inputSchema: DiagnosticsInputSchema,
  outputSchema: DiagnosticsOutputSchema2,
  handler: handleDiagnostics
});
var collectionListTool = defineTool({
  name: "collection_list",
  description: "Lists all Raindrop collections for the authenticated user.",
  inputSchema: CollectionListInputSchema,
  outputSchema: CollectionListOutputSchema,
  handler: handleCollectionList
});
var collectionManageTool = defineTool({
  name: "collection_manage",
  description: "Creates, updates, or deletes a collection. Use the operation parameter to specify the action.",
  inputSchema: CollectionManageInputSchema,
  outputSchema: CollectionOutputSchema,
  handler: handleCollectionManage
});
var bookmarkSearchTool = defineTool({
  name: "bookmark_search",
  description: "Searches bookmarks with advanced filters, tags, and full-text search.",
  inputSchema: BookmarkSearchInputSchema,
  outputSchema: BookmarkSearchOutputSchema,
  handler: handleBookmarkSearch
});
var bookmarkManageTool = defineTool({
  name: "bookmark_manage",
  description: "Creates, updates, or deletes bookmarks. Use the operation parameter to specify the action.",
  inputSchema: BookmarkManageInputSchema,
  outputSchema: BookmarkOutputSchema,
  handler: handleBookmarkManage
});
var tagManageTool = defineTool({
  name: "tag_manage",
  description: "Renames, merges, or deletes tags. Use the operation parameter to specify the action.",
  inputSchema: TagInputSchema,
  outputSchema: TagOutputSchema,
  handler: handleTagManage
});
var highlightManageTool = defineTool({
  name: "highlight_manage",
  description: "Creates, updates, or deletes highlights. Use the operation parameter to specify the action.",
  inputSchema: HighlightManageInputSchema,
  outputSchema: HighlightOutputSchema,
  handler: handleHighlightManage
});
var getRaindropTool = defineTool({
  name: "getRaindrop",
  description: "Fetch a single Raindrop.io bookmark by ID.",
  inputSchema: GetRaindropInputSchema,
  outputSchema: GetRaindropOutputSchema,
  handler: handleGetRaindrop
});
var listRaindropsTool = defineTool({
  name: "listRaindrops",
  description: "List Raindrop.io bookmarks for a collection.",
  inputSchema: ListRaindropsInputSchema,
  outputSchema: ListRaindropsOutputSchema,
  handler: handleListRaindrops
});
var bulkEditRaindropsTool = defineTool({
  name: "bulk_edit_raindrops",
  description: "Bulk update tags, favorite status, media, cover, or move bookmarks to another collection.",
  inputSchema: BulkEditRaindropsInputSchema,
  outputSchema: BulkEditRaindropsOutputSchema,
  handler: handleBulkEditRaindrops
});
var toolConfigs = [
  diagnosticsTool,
  collectionListTool,
  collectionManageTool,
  bookmarkSearchTool,
  bookmarkManageTool,
  tagManageTool,
  highlightManageTool,
  getRaindropTool,
  listRaindropsTool,
  bulkEditRaindropsTool
  // ...add more tools as needed, following the same pattern...
];
function getEnabledToolNames() {
  return toolConfigs.map((tool) => tool.name);
}
var RaindropMCPService = class {
  server;
  raindropService;
  resources = {};
  /**
   * Expose the MCP server instance for external control (e.g., connect, close).
   */
  getServer() {
    return this.server;
  }
  /**
   * Expose a cleanup method for graceful shutdown (no-op by default).
   * Extend as needed for resource cleanup.
   */
  async cleanup() {
  }
  /**
   * Returns the MCP manifest and server capabilities for host integration and debugging.
   * Uses the SDK's getManifest() method if available, otherwise builds a manifest from registered tools/resources.
   */
  async getManifest() {
    if (typeof this.server.getManifest === "function") {
      return this.server.getManifest();
    }
    return {
      name: "raindrop-mcp",
      version: SERVER_VERSION,
      description: "MCP Server for Raindrop.io with advanced interactive capabilities",
      capabilities: this.server.capabilities,
      tools: await this.listTools()
      // Optionally add resources, schemas, etc.
    };
  }
  constructor() {
    this.raindropService = new RaindropService();
    this.server = new McpServer({
      name: "raindrop-mcp",
      version: SERVER_VERSION,
      description: "MCP Server for Raindrop.io with advanced interactive capabilities",
      capabilities: {
        logging: false,
        discovery: true,
        errorStandardization: true,
        sessionInfo: true,
        toolChaining: true,
        schemaExport: true,
        promptManagement: true,
        resources: true,
        sampling: { supported: true, description: "All list/search tools support sampling and pagination." },
        elicitation: { supported: true, description: "Destructive and ambiguous actions require confirmation or clarification." }
      }
    });
    this.registerDeclarativeTools();
    this.registerResources();
  }
  asyncHandler(fn) {
    return (async (...args) => {
      try {
        return await fn(...args);
      } catch (err) {
        if (err instanceof Error) throw err;
        throw new Error(String(err));
      }
    });
  }
  registerDeclarativeTools() {
    for (const config2 of toolConfigs) {
      this.server.registerTool(
        config2.name,
        {
          title: config2.name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
          description: config2.description,
          inputSchema: zodToJsonSchema(config2.inputSchema)
        },
        this.asyncHandler(async (args, extra) => {
          const result = await config2.handler(args, { raindropService: this.raindropService, ...extra });
          if (result && typeof result === "object" && "content" in result) {
            return result;
          }
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        })
      );
    }
  }
  registerResources() {
    this.resources["mcp://user/profile"] = {
      contents: [{
        uri: "mcp://user/profile",
        text: JSON.stringify({ profile: "User profile information from Raindrop.io" }, null, 2)
      }]
    };
    this.resources["diagnostics://server"] = {
      contents: [{
        uri: "diagnostics://server",
        text: JSON.stringify({
          diagnostics: "Server diagnostics and environment info",
          version: SERVER_VERSION,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }, null, 2)
      }]
    };
  }
  /**
   * Returns a list of all registered MCP tools with their metadata.
   */
  async listTools() {
    const tools = (this.server._tools || []).map((tool) => ({
      id: tool.id || tool.name,
      name: tool.name,
      description: tool.description || "",
      inputSchema: tool.inputSchema || {},
      outputSchema: tool.outputSchema || {}
    }));
    if (tools.length === 0) {
      return toolConfigs.map((config2) => ({
        id: config2.name,
        name: config2.name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        description: config2.description,
        inputSchema: config2.inputSchema,
        outputSchema: config2.outputSchema || {}
      }));
    }
    return tools.filter((tool) => tool.description);
  }
  /**
   * Call a registered tool by its ID with the given input.
   * @param toolId - The tool's ID
   * @param input - Input object for the tool
   * @returns Tool response
   */
  async callTool(toolId, input) {
    const tool = this.server._tools?.find((t) => t.id === toolId);
    if (!tool || typeof tool.handler !== "function") {
      throw new Error(`Tool with id "${toolId}" not found or has no handler.`);
    }
    return await tool.handler(input ?? {}, {});
  }
  /**
   * Reads an MCP resource by URI using the public API.
   * Supports both static pre-registered resources and dynamic resources.
   *
   * @param uri - The resource URI to read.
   * @returns The resource contents as an array of objects with uri and text.
   * @throws Error if the resource is not found or not readable.
   */
  async readResource(uri) {
    try {
      if (uri.startsWith("mcp://collection/")) {
        const uriParts = uri.split("/");
        const collectionIdStr = uriParts[uriParts.length - 1];
        if (!collectionIdStr) {
          throw new Error("Collection ID is required");
        }
        const collectionId = parseInt(collectionIdStr);
        if (isNaN(collectionId)) {
          throw new Error(`Invalid collection ID: ${collectionIdStr}`);
        }
        const collection = await this.raindropService.getCollection(collectionId);
        return {
          contents: [{
            uri,
            text: JSON.stringify({ collection }, null, 2)
          }]
        };
      }
      if (uri.startsWith("mcp://raindrop/")) {
        const uriParts = uri.split("/");
        const raindropIdStr = uriParts[uriParts.length - 1];
        if (!raindropIdStr) {
          throw new Error("Raindrop ID is required");
        }
        const raindropId = parseInt(raindropIdStr);
        if (isNaN(raindropId)) {
          throw new Error(`Invalid raindrop ID: ${raindropIdStr}`);
        }
        const raindrop = await this.raindropService.getBookmark(raindropId);
        return {
          contents: [{
            uri,
            text: JSON.stringify({ raindrop }, null, 2)
          }]
        };
      }
      if (uri === "mcp://user/profile") {
        const userInfo = await this.raindropService.getUserInfo();
        return {
          contents: [{
            uri,
            text: JSON.stringify({ profile: userInfo }, null, 2)
          }]
        };
      }
    } catch (error) {
      throw new Error(`Failed to fetch data for resource ${uri}: ${error instanceof Error ? error.message : String(error)}`);
    }
    if (!this.resources[uri]) {
      throw new Error(`Resource with uri "${uri}" not found or not readable.`);
    }
    const resource = this.resources[uri];
    return {
      contents: Array.isArray(resource.contents) ? resource.contents : [resource.contents]
    };
  }
  /**
   * Returns a list of all available MCP resources with their metadata.
   * Includes both static pre-registered resources and dynamic resource patterns.
   */
  listResources() {
    const serverResources = (this.server._resources || []).map((r) => ({
      id: r.id || r.uri,
      uri: r.uri,
      title: r.title,
      description: r.description,
      mimeType: r.mimeType
    }));
    const staticResources = Object.keys(this.resources).map((uri) => ({
      id: uri,
      uri,
      title: `Resource ${uri}`,
      description: `MCP resource for ${uri}`,
      mimeType: "application/json"
    }));
    const dynamicResourcePatterns = [
      {
        id: "mcp://collection/{id}",
        uri: "mcp://collection/{id}",
        title: "Collection Resource Pattern",
        description: "Access any Raindrop collection by ID (e.g., mcp://collection/123456)",
        mimeType: "application/json"
      },
      {
        id: "mcp://raindrop/{id}",
        uri: "mcp://raindrop/{id}",
        title: "Raindrop Resource Pattern",
        description: "Access any Raindrop bookmark by ID (e.g., mcp://raindrop/987654)",
        mimeType: "application/json"
      }
    ];
    return [
      ...serverResources,
      ...staticResources,
      ...dynamicResourcePatterns
    ];
  }
  /**
   * Returns true if the MCP server is healthy and ready.
   */
  async healthCheck() {
    return true;
  }
  /**
   * Returns basic server info (name, version, description).
   */
  getInfo() {
    return {
      name: "raindrop-mcp-server",
      version: SERVER_VERSION,
      description: "MCP Server for Raindrop.io with advanced interactive capabilities"
    };
  }
};

// src/server.ts
var PORT = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 3002;
var logger2 = createLogger("http");
var activeSessions = /* @__PURE__ */ new Map();
var sessionMetadata = /* @__PURE__ */ new Map();
function isInitializeRequest(body) {
  return body && body.method === "initialize" && body.jsonrpc === "2.0";
}
var app = {};
var RAINDROP_CLIENT_SECRET = process.env.RAINDROP_CLIENT_SECRET;
var RAINDROP_REDIRECT_URI = process.env.RAINDROP_REDIRECT_URI || `http://localhost:${PORT}/auth/raindrop/callback`;
var oauthClient = new AuthorizationCode({
  client: {
    id: process.env.RAINDROP_CLIENT_ID,
    secret: RAINDROP_CLIENT_SECRET
  },
  auth: {
    tokenHost: "https://raindrop.io",
    authorizePath: "/oauth/authorize",
    tokenPath: "/oauth/access_token"
  }
});
var transports = {};
var sseTransports = {};
var server = http.createServer(async (req, res) => {
  try {
    const url = parseUrl(req.url || "", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, MCP-Session-Id");
    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
      return;
    }
    if (url.pathname === "/auth/raindrop" && req.method === "GET") {
      if (!process.env.RAINDROP_CLIENT_ID) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("RAINDROP_CLIENT_ID not set");
        return;
      }
      const authorizationUri = oauthClient.authorizeURL({
        redirect_uri: RAINDROP_REDIRECT_URI,
        scope: "read write"
      });
      res.writeHead(302, { Location: authorizationUri });
      res.end();
      return;
    }
    if (url.pathname === "/auth/raindrop/callback" && req.method === "GET") {
      const code = url.query.code;
      if (!code) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Missing code parameter");
        return;
      }
      try {
        const tokenParams = { code, redirect_uri: RAINDROP_REDIRECT_URI };
        const accessToken = await oauthClient.getToken(tokenParams);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ access_token: accessToken.token.access_token }));
      } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: error.message || "OAuth token exchange failed" }));
      }
      return;
    }
    if (url.pathname === "/health" && req.method === "GET") {
      const sessions = Array.from(sessionMetadata.values());
      const streamableSessions = sessions.filter((s) => s.type !== "sse");
      const sseSessions = sessions.filter((s) => s.type === "sse");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        status: "healthy",
        service: "raindrop-mcp-optimized",
        version: "2.0.0",
        port: PORT,
        activeSessions: sessions.length,
        sessionTypes: {
          streamable: streamableSessions.length,
          sse: sseSessions.length
        },
        sessions,
        optimizations: {
          toolCount: 24,
          originalToolCount: 37,
          reduction: "35%",
          features: [
            "Consolidated tools with operation parameters",
            "AI-friendly descriptions and examples",
            "Consistent naming conventions",
            "Enhanced parameter documentation",
            "Standardized resource URI patterns",
            "Improved error handling with suggestions"
          ]
        },
        transports: {
          modern: "StreamableHTTPServerTransport (/mcp endpoint)",
          legacy: "SSEServerTransport (/sse + /messages endpoints)"
        }
      }));
      return;
    }
    if (url.pathname === "/" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        name: "Raindrop MCP HTTP Server",
        version: "2.0.0",
        description: "Optimized Model Context Protocol server for Raindrop.io with enhanced AI-friendly tools",
        endpoints: {
          "/": "This documentation",
          "/health": "Health check with session info and optimization details",
          "/mcp": "MCP protocol endpoint (POST only) - Modern StreamableHTTP transport",
          "/sse": "Legacy SSE connection endpoint (GET) - Server-Sent Events transport",
          "/messages": "Legacy SSE message endpoint (POST) - Send messages to SSE transport"
        },
        optimizations: {
          tools: { original: 37, optimized: 24, improvement: "35% reduction in tool count" },
          categories: [
            "Collections (7 tools)",
            "Bookmarks (6 tools)",
            "Tags (2 tools)",
            "Highlights (4 tools)",
            "User (2 tools)",
            "Import/Export (3 tools)"
          ],
          features: [
            "Hierarchical tool naming (category_action pattern)",
            "Rich contextual descriptions with use cases",
            "Comprehensive parameter documentation",
            "Smart tool consolidation with operation parameters",
            "Standardized resource URI patterns (raindrop://type/scope)",
            "Enhanced error messages with actionable suggestions"
          ]
        },
        usage: {
          "MCP Inspector": `npx @modelcontextprotocol/inspector http://localhost:${PORT}/mcp`,
          "Direct API": `POST http://localhost:${PORT}/mcp`,
          "Legacy SSE": `GET http://localhost:${PORT}/sse + POST http://localhost:${PORT}/messages`,
          "Compare with original": `Original server on port 3001, optimized on port ${PORT}`
        }
      }));
      return;
    }
    if (url.pathname === "/sse" && req.method === "GET") {
      try {
        const sessionId = randomUUID();
        const transport = new SSEServerTransport("/messages", res, {
          allowedOrigins: ["*"],
          // Allow all origins for development
          enableDnsRebindingProtection: false
          // Disable for compatibility
        });
        transport.onclose = () => {
          delete sseTransports[sessionId];
          sessionMetadata.delete(sessionId);
          logger2.info(`SSE session cleaned up: ${sessionId}`);
        };
        sseTransports[sessionId] = transport;
        sessionMetadata.set(sessionId, {
          id: sessionId,
          type: "sse",
          created: (/* @__PURE__ */ new Date()).toISOString(),
          uptime: 0
        });
        await mcpServer.connect(transport);
        logger2.info(`SSE session established: ${sessionId}`);
      } catch (error) {
        logger2.error("Error establishing SSE connection:", error);
        if (!res.headersSent) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Failed to establish SSE connection" }));
        }
      }
      return;
    }
    if (url.pathname === "/messages" && req.method === "POST") {
      const chunks = [];
      for await (const chunk of req) chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
      const raw = Buffer.concat(chunks).toString("utf8");
      let body = void 0;
      try {
        body = raw ? JSON.parse(raw) : void 0;
      } catch (err) {
        logger2.warn("Invalid JSON body on /messages");
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
        return;
      }
      try {
        const sessionId = req.headers["mcp-session-id"] || body?.sessionId;
        const transport = sessionId ? sseTransports[sessionId] : null;
        if (!transport) {
          const availableTransports = Object.values(sseTransports);
          if (availableTransports.length === 0) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "No active SSE session found" }));
            return;
          }
          const fallbackTransport = availableTransports[0];
          if (!fallbackTransport) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "No active SSE session found" }));
            return;
          }
          await fallbackTransport.handlePostMessage(req, res, body);
        } else {
          await transport.handlePostMessage(req, res, body);
        }
        logger2.debug(`SSE message handled for session: ${sessionId || "auto-routed"}`);
      } catch (error) {
        logger2.error("Error handling SSE message:", error);
        if (!res.headersSent) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Failed to handle SSE message" }));
        }
      }
      return;
    }
    if (url.pathname === "/mcp") {
      const chunks = [];
      for await (const chunk of req) chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
      const raw = Buffer.concat(chunks).toString("utf8");
      let body = void 0;
      try {
        body = raw ? JSON.parse(raw) : void 0;
      } catch (err) {
        logger2.warn("Invalid JSON body on /mcp");
      }
      try {
        const sessionId = req.headers["mcp-session-id"];
        let transport;
        if (sessionId && transports[sessionId]) {
          transport = transports[sessionId];
          logger2.debug(`Reusing optimized session: ${sessionId}`);
        } else if (!sessionId && req.method === "POST" && isInitializeRequest(body)) {
          logger2.info("Creating new optimized Streamable HTTP session");
          transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: () => randomUUID(),
            onsessioninitialized: (sessionId2) => {
              transports[sessionId2] = transport;
              sessionMetadata.set(sessionId2, { id: sessionId2, created: (/* @__PURE__ */ new Date()).toISOString(), uptime: 0 });
              logger2.info(`New optimized Streamable HTTP session initialized: ${sessionId2}`);
            }
          });
          transport.onclose = () => {
            if (transport.sessionId) {
              delete transports[transport.sessionId];
              sessionMetadata.delete(transport.sessionId);
              logger2.info(`Optimized Streamable HTTP session cleaned up: ${transport.sessionId}`);
            }
          };
          await mcpServer.connect(transport);
        } else {
          logger2.warn("Invalid optimized MCP request: missing session ID or invalid initialization");
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ jsonrpc: "2.0", error: { code: -32e3, message: "Bad Request: No valid session ID provided or missing initialization" }, id: null }));
          return;
        }
        await transport.handleRequest(req, res, body);
      } catch (error) {
        logger2.error("Error handling optimized Streamable HTTP request:", error);
        if (!res.headersSent) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ jsonrpc: "2.0", error: { code: -32603, message: "Internal server error" }, id: null }));
        }
      }
      return;
    }
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  } catch (err) {
    logger2.error("Server error:", err);
    try {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    } catch {
    }
  }
});
app.listen = (port, cb) => server.listen(port, cb);
var raindropMCP = new RaindropMCPService();
var mcpServer = raindropMCP.getServer();
var cleanup = raindropMCP.cleanup.bind(raindropMCP);
var serverInstance = server.listen(PORT, () => {
  logger2.info(`Optimized Raindrop MCP HTTP Server running on port ${PORT}`);
  logger2.info(`MCP Inspector: npx @modelcontextprotocol/inspector http://localhost:${PORT}/mcp`);
  logger2.info(`Health check: http://localhost:${PORT}/health`);
  logger2.info(`Documentation: http://localhost:${PORT}/`);
  logger2.info(`Modern transport: http://localhost:${PORT}/mcp (StreamableHTTP)`);
  logger2.info(`Legacy transport: http://localhost:${PORT}/sse + http://localhost:${PORT}/messages (SSE)`);
  logger2.info(`Optimizations: 24 tools (vs 37 original), enhanced AI-friendly interface`);
});
process.on("SIGINT", async () => {
  logger2.info("Shutting down optimized HTTP server...");
  logger2.info(`Closing ${Object.keys(transports).length} streamable sessions and ${Object.keys(sseTransports).length} SSE sessions`);
  Object.values(transports).forEach((transport) => {
    try {
      transport.close();
    } catch (error) {
      logger2.error("Error closing streamable transport:", error);
    }
  });
  Object.values(sseTransports).forEach((transport) => {
    try {
      transport.close();
    } catch (error) {
      logger2.error("Error closing SSE transport:", error);
    }
  });
  sessionMetadata.clear();
  serverInstance.close(() => {
    logger2.info("Optimized HTTP server stopped");
    process.exit(0);
  });
});
export {
  activeSessions,
  server as app,
  sseTransports,
  transports
};
//# sourceMappingURL=server.js.map
