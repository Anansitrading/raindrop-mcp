# Warp Terminal MCP Configuration

## ✅ Simple, Working Raindrop MCP Server for Warp

**Version:** 3.0.0 (Simple server - fully functional)  
**Built File:** `build/simple.js`  
**Source:** `src/simple-server.ts`

## Quick Setup for Warp

### Option 1: Using npx (After Publishing to npm)

1. Open Warp terminal
2. Press `Cmd/Ctrl + J` or navigate to: `Warp Drive > Personal > MCP Servers`
3. Click `+ Add` button
4. Paste this JSON configuration:

```json
{
  "raindrop": {
    "command": "npx",
    "args": ["-y", "@anansitrading/raindrop-mcp"],
    "env": {
      "RAINDROP_ACCESS_TOKEN": "your_raindrop_api_token_here"
    }
  }
}
```

### Option 2: Using Local Path (For Development/Testing)

```json
{
  "raindrop-local": {
    "command": "node",
    "args": ["/home/david/Projects/raindrop-mcp/build/simple.js"],
    "env": {
      "RAINDROP_ACCESS_TOKEN": "your_raindrop_api_token_here"
    }
  }
}
```

## Getting Your Raindrop API Token

1. Visit https://app.raindrop.io/settings/integrations
2. Create a new app (or use existing)
3. Generate a test token
4. Copy the token value
5. Replace `your_raindrop_api_token_here` in the config above

## Available Tools in Warp Agent Mode

Once configured, press `Cmd/Ctrl + K` to open Warp Agent Mode and use natural language:

### 1. get_bookmarks
**Examples:**
- "Show me all my bookmarks"
- "List bookmarks from collection 12345"
- "Get my 10 most recent bookmarks"

### 2. create_bookmark
**Examples:**
- "Save https://example.com to my Raindrop with tag 'important'"
- "Bookmark this page with title 'Amazing Tool' and tags 'productivity'"

### 3. search_bookmarks
**Examples:**
- "Find all bookmarks tagged 'AI'"
- "Search my bookmarks for 'machine learning'"

### 4. update_bookmark
**Examples:**
- "Update bookmark 123 to mark it as favorite"
- "Add tag 'read-later' to bookmark 456"

### 5. delete_bookmark
**Examples:**
- "Delete bookmark 789"
- "Remove bookmark with ID 456"

### 6. get_bookmark
**Examples:**
- "Show me details for bookmark 123"
- "Get bookmark 456"

## Warp Configuration Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `command` | string | Yes | The executable (e.g., `npx`, `node`) |
| `args` | array | Yes | Command arguments |
| `env` | object | No | Environment variables (e.g., API tokens) |
| `working_directory` | string | No | Working directory for command execution |
| `start_on_launch` | boolean | No | Auto-start server when Warp opens (default: true) |

## Example: Prevent Auto-Start

```json
{
  "raindrop": {
    "command": "npx",
    "args": ["-y", "@anansitrading/raindrop-mcp"],
    "env": {
      "RAINDROP_ACCESS_TOKEN": "your_token"
    },
    "start_on_launch": false
  }
}
```

## Multiple MCP Servers

You can configure multiple MCP servers at once:

```json
{
  "mcpServers": {
    "raindrop": {
      "command": "npx",
      "args": ["-y", "@anansitrading/raindrop-mcp"],
      "env": {
        "RAINDROP_ACCESS_TOKEN": "your_token"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/files"]
    }
  }
}
```

## Accessing MCP Settings in Warp

Three ways to access:

1. **Warp Drive**: `Personal > MCP Servers`
2. **Command Palette**: Search for "Open MCP Servers"  
3. **Settings**: `Settings > AI > Manage MCP servers`

## MCP Server Logs (Linux)

```bash
# Navigate to logs directory
cd "${XDG_STATE_HOME:-$HOME/.local/state}/warp-terminal/mcp"

# Or click "View Logs" in Warp's MCP Server panel
```

## Troubleshooting

### Server Not Starting
1. Check logs in Warp's MCP Server panel (click "View Logs")
2. Verify your API token is valid
3. Ensure you're running latest Warp version
4. Test the server manually (see below)

### Token Issues
If authentication fails:
```bash
# Reset all MCP auth tokens
rm -rf ~/.mcp-auth
```

Then reconfigure the server in Warp.

### Testing Server Manually

```bash
# Test the server works outside Warp
node /home/david/Projects/raindrop-mcp/build/simple.js
# Expected output: [Raindrop MCP] Server started successfully
```

### Common Error Messages

**"Cannot access process before initialization"**
- This was fixed in v3.0.0
- Make sure you're using `build/simple.js` not `build/index.js`

**"RAINDROP_ACCESS_TOKEN not set"**
- Check your Warp MCP configuration includes the `env` section
- Verify the token value is correct

**"API Error: 401 Unauthorized"**
- Your token is invalid or expired
- Generate a new token from Raindrop.io settings

## Testing the Setup

Once configured and started in Warp:

1. Press `Cmd/Ctrl + K` to open Agent Mode
2. Type: "Show me my recent bookmarks"
3. You should see a response with your actual bookmarks!

## Publishing to npm (For Maintainers)

```bash
# Make sure simple server is built
npx esbuild src/simple-server.ts --bundle --platform=node --format=esm --outfile=build/simple.js --external:@modelcontextprotocol/* --external:dotenv --external:zod

# Test it works
node build/simple.js

# Publish to npm
npm publish --access public
```

---

## ✨ You're All Set!

Once configured, your Raindrop bookmarks will be available through Warp's AI Agent Mode.

**Quick Start Checklist:**
- ✅ Get Raindrop API token
- ✅ Add configuration to Warp MCP Servers
- ✅ Click "Start" on the server
- ✅ Press `Cmd/Ctrl + K` and start using!

**Need Help?**
- Check logs: Click "View Logs" in Warp's MCP Server panel
- Test manually: `node build/simple.js`
- Verify token: Visit https://app.raindrop.io/settings/integrations
