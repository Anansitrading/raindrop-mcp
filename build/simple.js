#!/usr/bin/env node

// src/simple-server.ts
import { config } from "dotenv";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
config({ quiet: true });
var TOKEN = process.env.RAINDROP_ACCESS_TOKEN;
var BASE_URL = "https://api.raindrop.io/rest/v1";
if (!TOKEN) {
  console.error("ERROR: RAINDROP_ACCESS_TOKEN environment variable not set");
  process.exit(1);
}
function stripBOMRecursively(obj) {
  if (typeof obj === "string") {
    return obj.replace(/\uFEFF/g, "");
  }
  if (Array.isArray(obj)) {
    return obj.map(stripBOMRecursively);
  }
  if (obj && typeof obj === "object") {
    const cleaned = {};
    for (const [key, value] of Object.entries(obj)) {
      cleaned[key] = stripBOMRecursively(value);
    }
    return cleaned;
  }
  return obj;
}
function safeStringify(obj) {
  const cleanedObj = stripBOMRecursively(obj);
  const jsonStr = JSON.stringify(cleanedObj, null, 2);
  return Buffer.from(jsonStr, "utf8").toString("utf8");
}
async function raindropFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Authorization": `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      ...options.headers
    }
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}
var server = new McpServer({
  name: "raindrop-simple",
  version: "1.0.0",
  description: "Simple Raindrop.io MCP Server"
});
server.registerTool(
  "get_bookmarks",
  {
    title: "Get Bookmarks",
    description: "Get bookmarks from a collection. Use collectionId=0 for all bookmarks, -1 for unsorted, -99 for trash",
    inputSchema: {
      collectionId: z.number().optional().describe("Collection ID (0=all, -1=unsorted, -99=trash)"),
      search: z.string().optional().describe("Search query"),
      page: z.number().optional().describe("Page number (default 0)"),
      perPage: z.number().optional().describe("Items per page (max 50, default 25)")
    }
  },
  async (args) => {
    const collectionId = args.collectionId || 0;
    const params = new URLSearchParams();
    if (args.search) params.append("search", args.search);
    if (args.page) params.append("page", args.page.toString());
    if (args.perPage) params.append("perpage", Math.min(args.perPage, 50).toString());
    const query = params.toString() ? `?${params.toString()}` : "";
    const data = await raindropFetch(`/raindrops/${collectionId}${query}`);
    return {
      content: [{
        type: "text",
        text: safeStringify({
          count: data.count || 0,
          items: data.items || []
        })
      }]
    };
  }
);
server.registerTool(
  "get_bookmark",
  {
    title: "Get Bookmark",
    description: "Get a single bookmark by ID",
    inputSchema: {
      id: z.number().describe("Bookmark ID")
    }
  },
  async (args) => {
    const data = await raindropFetch(`/raindrop/${args.id}`);
    return {
      content: [{
        type: "text",
        text: safeStringify(data.item)
      }]
    };
  }
);
server.registerTool(
  "create_bookmark",
  {
    title: "Create Bookmark",
    description: "Create a new bookmark",
    inputSchema: {
      link: z.string().describe("URL to bookmark (required)"),
      title: z.string().optional().describe("Bookmark title"),
      excerpt: z.string().optional().describe("Bookmark description/excerpt"),
      tags: z.array(z.string()).optional().describe("Tags array"),
      collectionId: z.number().optional().describe("Collection ID (default: -1 for unsorted)"),
      important: z.boolean().optional().describe("Mark as favorite")
    }
  },
  async (args) => {
    const body = {
      link: args.link,
      pleaseParse: {}
    };
    if (args.title) body.title = args.title;
    if (args.excerpt) body.excerpt = args.excerpt;
    if (args.tags) body.tags = args.tags;
    if (args.important !== void 0) body.important = args.important;
    if (args.collectionId) body.collection = { $id: args.collectionId };
    const data = await raindropFetch("/raindrop", {
      method: "POST",
      body: JSON.stringify(body)
    });
    return {
      content: [{
        type: "text",
        text: safeStringify(data.item)
      }]
    };
  }
);
server.registerTool(
  "update_bookmark",
  {
    title: "Update Bookmark",
    description: "Update an existing bookmark",
    inputSchema: {
      id: z.number().describe("Bookmark ID (required)"),
      link: z.string().optional().describe("URL"),
      title: z.string().optional().describe("Title"),
      excerpt: z.string().optional().describe("Description"),
      tags: z.array(z.string()).optional().describe("Tags"),
      important: z.boolean().optional().describe("Favorite status"),
      collectionId: z.number().optional().describe("Move to collection ID")
    }
  },
  async (args) => {
    const body = {};
    if (args.link) body.link = args.link;
    if (args.title) body.title = args.title;
    if (args.excerpt) body.excerpt = args.excerpt;
    if (args.tags) body.tags = args.tags;
    if (args.important !== void 0) body.important = args.important;
    if (args.collectionId) body.collection = { $id: args.collectionId };
    const data = await raindropFetch(`/raindrop/${args.id}`, {
      method: "PUT",
      body: JSON.stringify(body)
    });
    return {
      content: [{
        type: "text",
        text: safeStringify(data.item)
      }]
    };
  }
);
server.registerTool(
  "delete_bookmark",
  {
    title: "Delete Bookmark",
    description: "Delete a bookmark (moves to trash unless already in trash)",
    inputSchema: {
      id: z.number().describe("Bookmark ID")
    }
  },
  async (args) => {
    const data = await raindropFetch(`/raindrop/${args.id}`, {
      method: "DELETE"
    });
    return {
      content: [{
        type: "text",
        text: safeStringify({ result: data.result || true, message: "Bookmark deleted" })
      }]
    };
  }
);
server.registerTool(
  "create_collection",
  {
    title: "Create Collection",
    description: "Create a new collection (folder) in Raindrop",
    inputSchema: {
      title: z.string().describe("Collection name (required)"),
      description: z.string().optional().describe("Collection description"),
      public: z.boolean().optional().describe("Make collection public (default: false)"),
      view: z.string().optional().describe("View type: list, simple, grid, masonry (default: list)")
    }
  },
  async (args) => {
    const body = {
      title: args.title
    };
    if (args.description) body.description = args.description;
    if (args.public !== void 0) body.public = args.public;
    if (args.view) body.view = args.view;
    const data = await raindropFetch("/collection", {
      method: "POST",
      body: JSON.stringify(body)
    });
    return {
      content: [{
        type: "text",
        text: safeStringify(data.item)
      }]
    };
  }
);
server.registerTool(
  "search_bookmarks",
  {
    title: "Search Bookmarks",
    description: "Search all bookmarks with advanced query",
    inputSchema: {
      query: z.string().describe("Search query (supports operators like tag:, important:, etc)"),
      page: z.number().optional().describe("Page number"),
      perPage: z.number().optional().describe("Results per page (max 50)")
    }
  },
  async (args) => {
    const params = new URLSearchParams();
    if (args.query) params.append("search", args.query);
    if (args.page) params.append("page", args.page.toString());
    if (args.perPage) params.append("perpage", Math.min(args.perPage, 50).toString());
    const query = params.toString() ? `?${params.toString()}` : "";
    const data = await raindropFetch(`/raindrops/0${query}`);
    return {
      content: [{
        type: "text",
        text: safeStringify({
          count: data.count || 0,
          items: data.items || []
        })
      }]
    };
  }
);
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[Raindrop MCP] Server started successfully");
  process.on("SIGINT", async () => {
    console.error("[Raindrop MCP] Shutting down...");
    await server.close();
    process.exit(0);
  });
}
main().catch((error) => {
  console.error("[Raindrop MCP] Fatal error:", error);
  process.exit(1);
});
