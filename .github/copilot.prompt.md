---
mode: 'agent'
tools: ['githubRepo', 'codebase', 'concept7','fetch']
description: 'Project-wide prompt for Copilot and AI assistants'
---

# Project Prompt for GitHub Copilot and AI Assistants

This file provides detailed guidance for Copilot and other AI assistants working on this project. Please follow these conventions and use the specified tools for best results.

## Documentation and References
- `#fetch` [Raindrop.io API documentation](https://developer.raindrop.io) for all Raindrop-related endpoints, authentication, and data models.
- `#fetch` [Model Context Protocol documentation](https://modelcontextprotocol.io/) and specifically [LLMs integration guide](https://modelcontextprotocol.io/llms-full.txt) to ensure MCP compliance and best practices.
- `#githubRepo` [Model Context Protocol TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) for implementation details and usage patterns.
- For additional AI assistant context, see [CLAUDE.md](../CLAUDE.md).
- For example MCP server implementations, use the `#githubRepo` tool to access `modelcontextprotocol/servers`

## Tooling
- Do NOT use console.log for STDIO-based local servers, as it may interfere with protocol communication.
- For debugging MCP servers, `#fetch` the [MCP Debugging Instructions](https://modelcontextprotocol.io/docs/tools/debugging).
- Use the [Inspector tool](https://modelcontextprotocol.io/docs/tools/inspector) and its repository at https://github.com/modelcontextprotocol/inspector for protocol inspection and debugging.
- Use [Vitest](https://vitest.dev/) for all tests. Place tests in the appropriate src/tests/ directory.
- Use `Bun` for package management and scripts, not npm. All install, build, and run commands should use Bun syntax.
- Use tools `#concept7` for documentation access and reference whenever possible, especially for SDKs, APIs, and protocol details.

