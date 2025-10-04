#!/usr/bin/env bash
# Wrapper script to launch Raindrop MCP server with proper environment variables

export RAINDROP_ACCESS_TOKEN="e6620c80-874f-4b52-991d-8860e471977e"
export LOG_LEVEL="info"

# Launch the MCP server via npx
exec npx -y @anansitrading/raindrop-mcp
