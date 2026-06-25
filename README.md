# getbased website

Landing page, legal pages, public agent-discovery files, and installer entrypoint for [getbased](https://getbased.health). Deployed to `getbased.health` via Vercel.

The app lives in [elkimek/get-based](https://github.com/elkimek/get-based). The agent stack lives in [elkimek/getbased-agents](https://github.com/elkimek/getbased-agents).

## Public Agent Access surfaces

These files are intentionally public and must never contain private setup payloads, tokens, or user context:

- `install.sh` — public installer for `getbased-agent-stack`
- `install.sh.sha256` — published hash for the installer
- `llms.txt` — short agent-readable entrypoint
- `.well-known/getbased-agent.md` — fuller agent-readable setup guide

The private command copied from getbased looks like this, but with a real one-time setup payload:

```bash
curl -fsSL https://getbased.health/install.sh | bash -s -- connect <target> --setup 'gbsetup_v1_...'
```

Do not commit real `gbsetup_v1_...` values. Use `[REDACTED]` or `gbsetup_v1_...` in docs and tests.

## Local checks

```bash
bash -n install.sh
sha256sum -c install.sh.sha256
node test-landing.js
```

## Community

Join the [Discord](https://discord.gg/zJdVB9zgQB) or follow on [Nostr](https://njump.me/npub13xgjkyve82xesxxzvy52vz99z5fcuusda4cytekct2tw800kepas498nt2).

## License

AGPL-3.0-or-later. See [LICENSE](LICENSE).
