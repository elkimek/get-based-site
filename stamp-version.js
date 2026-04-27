#!/usr/bin/env node
// Stamps the latest app version (from GitHub tags) into index.html's
// JSON-LD softwareVersion field at build time. Runs on Vercel deploys.
// Usage: node stamp-version.js

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO = 'elkimek/get-based';
const INDEX = path.join(__dirname, 'index.html');

function fetchLatestVersion() {
  // /releases/latest respects the repo's "Latest" flag — sorts by semver are
  // unreliable on this repo (version-line reset) and /tags isn't sorted at all.
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.github.com',
      path: `/repos/${REPO}/releases/latest`,
      headers: { 'User-Agent': 'getbased-site-build', 'Accept': 'application/vnd.github+json' },
    }, (res) => {
      let body = '';
      res.on('data', (c) => body += c);
      res.on('end', () => {
        if (res.statusCode !== 200) return reject(new Error(`GH API ${res.statusCode}: ${body.slice(0, 200)}`));
        try {
          const release = JSON.parse(body);
          if (!release || !release.tag_name) return reject(new Error('No tag_name in latest release'));
          resolve(String(release.tag_name).replace(/^v/, ''));
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => req.destroy(new Error('GH API timeout')));
    req.end();
  });
}

(async () => {
  try {
    const version = await fetchLatestVersion();
    const html = fs.readFileSync(INDEX, 'utf8');
    const re = /"softwareVersion":\s*"[^"]*"/;
    if (!re.test(html)) {
      console.error('stamp-version: softwareVersion field not found in index.html — skipping');
      return;
    }
    const next = html.replace(re, `"softwareVersion": "${version}"`);
    if (next === html) {
      console.log(`stamp-version: already at ${version}`);
      return;
    }
    fs.writeFileSync(INDEX, next);
    console.log(`stamp-version: stamped softwareVersion=${version}`);
  } catch (err) {
    // Non-fatal: don't fail the deploy if GH is flaky
    console.error(`stamp-version: ${err.message} — keeping current value`);
  }
})();
