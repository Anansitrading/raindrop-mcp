#!/usr/bin/env node

#!/usr/bin/env node
// src/simple-server.ts
import { config } from "dotenv";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
config({ quiet: true });
var TOKEN = process.env.RAINDROP_ACCESS_TOKEN;
var BASE_URL = "https://api.raindrop.io/rest/v1";
if (!TOKEN) {
  console.error("ERROR: RAINDROP_ACCESS_TOKEN environment variable not set");
  process.exit(1);
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
      collectionId: {
        type: "number",
        description: "Collection ID (0=all, -1=unsorted, -99=trash)"
      },
      search: {
        type: "string",
        description: "Search query"
      },
      page: {
        type: "number",
        description: "Page number (default 0)"
      },
      perPage: {
        type: "number",
        description: "Items per page (max 50, default 25)"
      }
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
        text: JSON.stringify({
          count: data.count || 0,
          items: data.items || []
        }, null, 2)
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
      id: {
        type: "number",
        description: "Bookmark ID"
      }
    }
  },
  async (args) => {
    const data = await raindropFetch(`/raindrop/${args.id}`);
    return {
      content: [{
        type: "text",
        text: JSON.stringify(data.item, null, 2)
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
      link: {
        type: "string",
        description: "URL to bookmark (required)"
      },
      title: {
        type: "string",
        description: "Bookmark title"
      },
      excerpt: {
        type: "string",
        description: "Bookmark description/excerpt"
      },
      tags: {
        type: "array",
        items: { type: "string" },
        description: "Tags array"
      },
      collectionId: {
        type: "number",
        description: "Collection ID (default: -1 for unsorted)"
      },
      important: {
        type: "boolean",
        description: "Mark as favorite"
      }
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
        text: JSON.stringify(data.item, null, 2)
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
      id: {
        type: "number",
        description: "Bookmark ID (required)"
      },
      link: {
        type: "string",
        description: "URL"
      },
      title: {
        type: "string",
        description: "Title"
      },
      excerpt: {
        type: "string",
        description: "Description"
      },
      tags: {
        type: "array",
        items: { type: "string" },
        description: "Tags"
      },
      important: {
        type: "boolean",
        description: "Favorite status"
      },
      collectionId: {
        type: "number",
        description: "Move to collection ID"
      }
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
        text: JSON.stringify(data.item, null, 2)
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
      id: {
        type: "number",
        description: "Bookmark ID"
      }
    }
  },
  async (args) => {
    const data = await raindropFetch(`/raindrop/${args.id}`, {
      method: "DELETE"
    });
    return {
      content: [{
        type: "text",
        text: JSON.stringify({ result: data.result || true, message: "Bookmark deleted" }, null, 2)
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
      query: {
        type: "string",
        description: "Search query (supports operators like tag:, important:, etc)"
      },
      page: {
        type: "number",
        description: "Page number"
      },
      perPage: {
        type: "number",
        description: "Results per page (max 50)"
      }
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
        text: JSON.stringify({
          count: data.count || 0,
          items: data.items || []
        }, null, 2)
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
