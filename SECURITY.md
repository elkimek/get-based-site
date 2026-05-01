# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in the getbased.health website (this repo), please report it privately via [GitHub Security Advisories](https://github.com/elkimek/get-based-site/security/advisories/new).

Do **not** open a public issue for security vulnerabilities.

I'll acknowledge receipt within 48 hours and aim to release a fix within 7 days for critical issues.

## Scope

- Static site code (HTML, CSS, inline JavaScript)
- Blog build script (`build-blog.js`) and template (`blog-template.html`)
- Install script served at `/install.sh` (and its checksum at `/install.sh.sha256`)

## Out of Scope

- The getbased web app itself — please report to [elkimek/get-based](https://github.com/elkimek/get-based/security/advisories/new)
- Self-hosted relay infrastructure — please report to [elkimek/getbased-relay](https://github.com/elkimek/getbased-relay/security/advisories/new)
- Browser vulnerabilities

## Note on the install script

`/install.sh` is the canonical installer for the agent stack. Its SHA-256 is published at `/install.sh.sha256`. If you find a way to deliver a tampered `install.sh` to a user (e.g. via DNS hijack, MITM, supply-chain compromise of the hosting platform), report it through the private channel above — this is the only network-trust assumption a getbased user makes.
