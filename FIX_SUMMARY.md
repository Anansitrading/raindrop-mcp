# MCP Server Startup Fix Summary

## Problem
The Raindrop MCP server was failing to start with the following error:
```
ReferenceError: Cannot access 'process' before initialization
```

The error occurred because:
1. When modules were imported, they tried to access `process.env.RAINDROP_ACCESS_TOKEN`
2. This happened before `dotenv.config()` was called to load environment variables
3. The bundler (esbuild/bun) was reorganizing code during the build process, moving the `config()` call after module initialization

## Root Cause
In `src/services/raindrop.service.ts` line 18:
```typescript
Authorization: `Bearer ${token || process.env.RAINDROP_ACCESS_TOKEN}`
```

This line executes when the module is first imported, but at that point `process.env` hadn't been populated by dotenv yet because the module loading order was:
1. Import all modules (including raindrop.service.ts)
2. Execute `config({ quiet: true })` 
3. Try to use the already-initialized modules

## Solution
Created a dedicated environment initialization module that loads environment variables before any other code:

### Files Changed:

1. **src/init-env.ts** (new file)
   - Imports dotenv and calls `config({ quiet: true })` immediately
   - Must be the first import in all entry points

2. **src/index.ts**
   - Changed to import `'./init-env.js'` as the very first import
   - Removed inline `config()` call

3. **src/server.ts**
   - Same pattern: import `'./init-env.js'` first
   - Removed inline `config()` call

4. **package.json**
   - Updated build script from `bun build` to `esbuild` for better portability
   - Added all necessary external dependencies to the esbuild command

## How It Works
When the bundler processes the code:
```javascript
// build/index.js (top of file)
#!/usr/bin/env node

// src/init-env.ts
import { config } from "dotenv";
config({ quiet: true });  // ← Executes FIRST

// src/index.ts
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// ... rest of imports
```

By separating the environment initialization into its own module and importing it first, we guarantee that `process.env` is populated before any subsequent module tries to access it.

## Testing
Verified the fix works:
```bash
# STDIO transport
$ node build/index.js
[2025-10-04T21:11:17.976Z] INFO  [mcp-stdio] MCP server connected via STDIO transport

# HTTP transport
$ node build/server.js
[2025-10-04T21:11:50.144Z] INFO  [http] Optimized Raindrop MCP HTTP Server running on port 3002

# MCP protocol test
$ echo '{"jsonrpc":"2.0","id":1,"method":"initialize",...}' | node build/index.js
{"result":{"protocolVersion":"2025-03-26",...},"jsonrpc":"2.0","id":1}
```

## Build Process
The new build process uses esbuild instead of bun:
```bash
npm run build
```

This bundles the TypeScript source into JavaScript while preserving the critical import order.

## Commits
- `a865107` - fix: Fix environment variable initialization order causing MCP server startup failure
- `f50d1d1` - build: Rebuild with environment initialization fix

## Future Considerations
- Consider lazy-loading the Raindrop service to avoid module-level `process.env` access
- Add validation to ensure RAINDROP_ACCESS_TOKEN is set before service initialization
- Consider moving all environment variable access to a centralized config module
