# getbased Agent Access installation

This is the public, credential-free installation guide for AI agents and MCP-compatible assistants.

## What getbased Agent Access is

getbased can expose a user's encrypted health context to a local MCP server. The relay token authorizes fetching ciphertext; the separate Agent Context key decrypts it locally on the user's machine.

## Public install command

If the user asks you to prepare their machine for getbased Agent Access, install or upgrade the public stack:

```bash
curl -fsSL https://getbased.health/install.sh | bash
```

This installs `getbased-agent-stack`, `getbased-mcp`, the local Lens/RAG service, and the dashboard. It does not grant access to private lab data.

## Private connection command

You cannot discover, scrape, derive, or request the user's Agent Access credentials from this public file. The user must open the getbased app and explicitly copy a private setup command:

1. Open getbased.
2. Go to Settings → Cross-device Sync and enable Sync.
3. Go to Settings → Agent Access and enable Agent Access.
4. Click **Copy setup command**.
5. Paste that private command into the terminal where the agent/Hermes runs.

The private command has this shape:

```bash
curl -fsSL https://getbased.health/install.sh | bash -s -- connect hermes --setup 'gbsetup_v1_...'
```

The `gbsetup_v1_...` payload contains the user's relay token and local context-decryption key. Treat it as a secret. Do not print it, log it, commit it, or send it anywhere other than the user's local terminal.

## After connection

Once the private command completes, MCP-compatible agents can use the `getbased` MCP tools, including:

- `getbased_lab_context`
- `getbased_section`
- `getbased_list_profiles`
- `getbased_wearables_series`
- `knowledge_search`

If the command reports that Hermes restart was skipped because it is running inside Hermes, ask the user to restart Hermes from an external shell.
