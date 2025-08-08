---
description: Refactor Raindrop MCP tools for better LLM integration and usability.
---

1. Capabilities: Resources, Sampling, Elicitation
   a. Resources

Expose all major Raindrop entities as MCP resources:
collections://all, collections://{id}, bookmarks://{id}, tags://all, highlights://all, user://info, etc.
Implement resource discovery and navigation (list, get, search, children, etc.) using standard MCP resource URIs and methods.
Ensure each resource supports GET (read), and where appropriate, CREATE, UPDATE, DELETE (write) actions.
b. Sampling

For large collections/bookmarks/tags/highlights, implement sampling endpoints:
e.g., bookmarks://collection/{id}?sample=10 returns a random or recent sample.
Add tool parameters for limit, offset, and sample to all list/search tools.
Use MCP’s sampling capability to advertise this in the server manifest.
c. Elicitation

Implement elicitation tools for:
Confirming destructive actions (delete, merge, etc.)
Requesting missing parameters (e.g., if a required field is omitted, prompt the LLM/user)
Use the MCP elicitation capability to allow the server to ask clarifying questions or confirmations. 2. Streamlining Tools for LLMs
a. Hierarchical, Predictable Naming

Use a consistent {resource}\_{action} pattern (e.g., collection_list, bookmark_create, tag_manage).
Group related actions under a single tool with an operation parameter where possible (e.g., collection_manage for create, update, delete).
b. Reduce Redundancy

Collapse similar tools:
Merge collection_create, collection_update, collection_delete into collection_manage with an operation parameter.
Do the same for bookmarks, tags, highlights.
For read-only actions, keep list, get, and search as separate, simple tools.
c. LLM-Friendly Descriptions

Ensure every tool and parameter has a clear, concise description.
Use Zod schemas for validation and documentation. 3. Example: Refactored Tool Set
Tool Name Description Operations/Params
collection_manage Create, update, or delete a collection operation: create/update/delete
collection_list List all or child collections parentId
bookmark_manage Create, update, delete, move, tag bookmarks operation, ids, data
bookmark_search Search bookmarks with filters query, tags, collection, etc.
tag_manage Rename, merge, delete tags operation, tagNames, newName
highlight_manage Create, update, delete highlights operation, id, data
user_profile Get user info
user_statistics Get user or collection stats collectionId
import_export Import/export bookmarks, check status operation, format, etc.
diagnostics Server diagnostics includeEnvironment 4. LLM/AI-Optimized Features
Resource URIs: Support direct resource access via URIs (e.g., collections://all).
Streaming: For large lists, support streaming or pagination.
Sampling: Add sample and limit parameters to all list/search tools.
Elicitation: Use MCP’s elicitation to prompt for missing/ambiguous info and confirmations.
Consistent Error Handling: Always return structured, descriptive errors. 5. Next Steps
Refactor tool initializers to group actions and reduce tool count.
Ensure all tools/resources are discoverable and documented in the manifest.
Advertise resources, sampling, and elicitation in the MCP server capabilities.
Add/expand tests to cover new tool structure and resource URIs.
Would you like a concrete code refactor example for one of these tool groups, or a manifest/capabilities update?
