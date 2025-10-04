# Simple Raindrop MCP Server

## ✅ WORKING VERSION - Use This!

This is a **simple, clean, working** MCP server for Raindrop.io that actually functions correctly.

## Quick Start

### 1. Set Your API Token

```bash
export RAINDROP_ACCESS_TOKEN="your_token_here"
```

Or create a `.env` file:
```
RAINDROP_ACCESS_TOKEN=your_token_here
```

### 2. Run the Server

```bash
node build/simple.js
```

## Available Tools

### 1. **get_bookmarks** - Get all bookmarks from a collection
```json
{
  "collectionId": 0,    // 0=all, -1=unsorted, -99=trash
  "search": "optional search query",
  "page": 0,
  "perPage": 25
}
```

### 2. **get_bookmark** - Get a single bookmark by ID
```json
{
  "id": 123456
}
```

### 3. **create_bookmark** - Create a new bookmark
```json
{
  "link": "https://example.com",      // REQUIRED
  "title": "Example Site",             // optional
  "excerpt": "Description",            // optional
  "tags": ["tag1", "tag2"],           // optional
  "collectionId": -1,                 // optional (default: unsorted)
  "important": false                  // optional
}
```

### 4. **update_bookmark** - Update an existing bookmark
```json
{
  "id": 123456,                       // REQUIRED
  "title": "New Title",               // optional
  "excerpt": "New description",       // optional
  "tags": ["updated", "tags"],        // optional
  "important": true,                  // optional
  "collectionId": 789                 // optional (move to collection)
}
```

### 5. **delete_bookmark** - Delete a bookmark
```json
{
  "id": 123456
}
```

### 6. **search_bookmarks** - Search all bookmarks
```json
{
  "query": "search term",
  "page": 0,
  "perPage": 25
}
```

## Test It Works

```bash
# Test the server starts
timeout 2 node build/simple.js

# Should output: [Raindrop MCP] Server started successfully
```

## Configure in Your MCP Client

Add to your MCP client config (e.g., Claude Desktop):

```json
{
  "mcpServers": {
    "raindrop": {
      "command": "node",
      "args": ["/home/david/Projects/raindrop-mcp/build/simple.js"],
      "env": {
        "RAINDROP_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
```

## Why This Version Works

1. ✅ **No complex dependencies** - Just native fetch API
2. ✅ **Proper environment loading** - dotenv.config() called at the TOP
3. ✅ **Simple, clear code** - Easy to debug and understand
4. ✅ **Direct API calls** - No abstraction layers causing issues
5. ✅ **Tested and working** - Actually functions correctly!

## Source File

The working source is at: `src/simple-server.ts`

To rebuild:
```bash
npx esbuild src/simple-server.ts --bundle --platform=node --format=esm --outfile=build/simple.js --external:@modelcontextprotocol/* --external:dotenv
```

## Getting Your API Token

1. Go to https://app.raindrop.io/settings/integrations
2. Create a new app
3. Generate a test token
4. Copy and use it as your `RAINDROP_ACCESS_TOKEN`

---

**This server is WORKING and TESTED. Use this instead of the complex version!**
