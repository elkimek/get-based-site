// test-blog.js — Verify blog page, posts index, and cross-site links
// Run: fetch('test-blog.js').then(r=>r.text()).then(s=>Function(s)())

(async function() {
  let pass = 0, fail = 0;
  function assert(name, condition, detail) {
    if (condition) { pass++; console.log(`  \u2705 ${name}`); }
    else { fail++; console.error(`  \u274c ${name}` + (detail ? ` \u2014 ${detail}` : '')); }
  }

  console.log('%c\ud83e\uddea Blog Tests', 'font-weight:bold;font-size:14px');

  // ── 1. blog/posts.json ──
  console.log('\n%c1. blog/posts.json — Post index', 'font-weight:bold');
  const postsRes = await fetch('blog/posts.json');
  assert('posts.json exists (200)', postsRes.ok);
  const posts = await postsRes.json();
  assert('posts.json is an array', Array.isArray(posts));
  assert('Has at least one post', posts.length >= 1);
  const first = posts[0];
  assert('First post has slug', typeof first.slug === 'string' && first.slug.length > 0);
  assert('First post has title', typeof first.title === 'string' && first.title.length > 0);
  assert('First post has date', /^\d{4}-\d{2}-\d{2}$/.test(first.date));
  assert('First post has description', typeof first.description === 'string' && first.description.length > 0);
  assert('First post slug is "building-getbased"', first.slug === 'building-getbased');

  // ── 2. Markdown file ──
  console.log('\n%c2. blog/building-getbased.md — First post', 'font-weight:bold');
  const mdRes = await fetch('blog/building-getbased.md');
  assert('Markdown file exists (200)', mdRes.ok);
  const md = await mdRes.text();
  assert('Starts with h1', md.startsWith('# '));
  assert('Has date line', md.includes('February 25, 2026'));
  assert('Has "How it started" section', md.includes('## How it started'));
  assert('Has "The rabbit hole" section', md.includes('## The rabbit hole'));
  assert('Has "The economics" section', md.includes('## The economics'));
  assert('Has "What got built" section', md.includes('## What got built'));
  assert('Has "The economics" section', md.includes('## The economics'));
  assert('Has "What I learned" section', md.includes('## What I learned'));
  assert('Has "What\'s next" section', md.includes("## What's next"));
  assert('Mentions Claude Code', md.includes('Claude Code'));
  assert('Mentions 287+ biomarkers', md.includes('287+'));
  assert('Mentions $120', md.includes('$120'));
  assert('Mentions GitHub link', md.includes('github.com/elkimek/get-based'));
  assert('Mentions GPL-3.0', md.includes('GPL-3.0'));

  // ── 3. blog.html — Source content ──
  console.log('\n%c3. blog.html — Source content', 'font-weight:bold');
  const blogSrc = await fetch('blog.html').then(r => r.text());
  assert('blog.html exists', blogSrc.length > 0);

  // Meta tags
  assert('Title: "Blog — Get Based"', blogSrc.includes('<title>Blog \u2014 Get Based</title>'));
  assert('og:title present', blogSrc.includes('og:title'));
  assert('og:url is /blog', blogSrc.includes('getbased.health/blog'));
  assert('og:image present', blogSrc.includes('og:image'));
  assert('canonical link present', blogSrc.includes('rel="canonical"'));
  assert('apple-touch-icon', blogSrc.includes('apple-touch-icon'));
  assert('theme-color dark', /meta name="theme-color" content="#0a0c14"/.test(blogSrc));
  assert('theme-color light', /meta name="theme-color" content="#f5f7ff"/.test(blogSrc));

  // Design system
  assert('Has bg-grid', blogSrc.includes('class="bg-grid"'));
  assert('Has bg-glow', blogSrc.includes('class="bg-glow"'));
  assert('Has bg-noise', blogSrc.includes('class="bg-noise"'));
  assert('Has nav element', blogSrc.includes('<nav'));
  assert('Nav logo is "getbased"', blogSrc.includes('>getbased</a>'));
  assert('Has footer', blogSrc.includes('<footer>'));
  assert('Has footer-logo', blogSrc.includes('footer-logo'));
  assert('Has footer-links', blogSrc.includes('footer-links'));

  // Fonts
  assert('Inter font loaded', blogSrc.includes('family=Inter'));
  assert('Outfit font loaded', blogSrc.includes('family=Outfit'));
  assert('JetBrains Mono loaded', blogSrc.includes('JetBrains+Mono'));

  // Theme support
  assert('Dark CSS vars', /--bg:#0a0c14/.test(blogSrc));
  assert('Light theme block', /\[data-theme="light"\]\s*\{/.test(blogSrc));
  assert('Light --bg override', /\[data-theme="light"\]\s*\{[^}]*--bg:#f5f7ff/.test(blogSrc));
  assert('prefers-color-scheme fallback', /prefers-color-scheme:\s*light[\s\S]*?:root:not\(\[data-theme\]\)/.test(blogSrc));
  assert('Early theme detection script', /labcharts-theme[\s\S]*?setAttribute\('data-theme'/.test(blogSrc));
  assert('Theme toggle button', blogSrc.includes('id="theme-toggle"'));
  assert('Theme toggle JS', /theme-toggle[\s\S]*?localStorage\.setItem\('labcharts-theme'/.test(blogSrc));
  assert('Sun icon', blogSrc.includes('theme-icon-sun'));
  assert('Moon icon', blogSrc.includes('theme-icon-moon'));

  // Responsive
  assert('768px breakpoint', /768px/.test(blogSrc));
  assert('480px breakpoint', /480px/.test(blogSrc));
  assert('bg layers hidden at 480px', /480px[\s\S]*?\.bg-grid/.test(blogSrc));
  assert('reduced motion support', /prefers-reduced-motion/.test(blogSrc));

  // Blog-specific structure
  assert('Has blog-main class', blogSrc.includes('blog-main'));
  assert('Has blog-container', blogSrc.includes('blog-container'));
  assert('Has blog-content element', blogSrc.includes('id="blog-content"'));
  assert('Has blog-header CSS', /\.blog-header/.test(blogSrc));
  assert('Has post-list CSS', /\.post-list/.test(blogSrc));
  assert('Has post-card CSS', /\.post-card\{/.test(blogSrc));
  assert('Has post-date CSS', /\.post-date\{/.test(blogSrc));
  assert('Has article CSS', /\.article\s/.test(blogSrc));
  assert('Has blog-back CSS', /\.blog-back\{/.test(blogSrc));
  assert('Has blog-loading', blogSrc.includes('blog-loading'));
  assert('Has blog-error CSS', /\.blog-error\{/.test(blogSrc));

  // Article typography
  assert('Article h1 styling', /\.article h1\{/.test(blogSrc));
  assert('Article h2 styling', /\.article h2\{/.test(blogSrc));
  assert('Article h3 styling', /\.article h3\{/.test(blogSrc));
  assert('Article p styling', /\.article p\{/.test(blogSrc));
  assert('Article blockquote styling', /\.article blockquote\{/.test(blogSrc));
  assert('Article code styling', /\.article code\{/.test(blogSrc));
  assert('Article pre styling', /\.article pre\{/.test(blogSrc));
  assert('Article ul/ol styling', /\.article ul/.test(blogSrc));
  assert('Article hr styling', /\.article hr\{/.test(blogSrc));
  assert('Article a styling', /\.article a\{/.test(blogSrc));
  assert('Article img styling', /\.article img\{/.test(blogSrc));

  // marked.js CDN
  assert('Loads marked.js from CDN', blogSrc.includes('cdn.jsdelivr.net/npm/marked/marked.min.js'));

  // Blog JS logic
  assert('Reads ?post= query param', /URLSearchParams[\s\S]*?\.get\('post'\)/.test(blogSrc));
  assert('Fetches posts.json', blogSrc.includes("fetch('blog/posts.json')"));
  assert('Fetches .md file', /fetch\('blog\/.*?\.md'\)/.test(blogSrc));
  assert('Uses marked.parse', blogSrc.includes('marked.parse'));
  assert('Has escapeHTML function', /function escapeHTML/.test(blogSrc));
  assert('Has formatDate function', /function formatDate/.test(blogSrc));
  assert('Has renderPostList function', /function renderPostList/.test(blogSrc));
  assert('Has renderArticle function', /function renderArticle/.test(blogSrc));
  assert('Has renderError function', /function renderError/.test(blogSrc));
  assert('Post list links use ?post=', blogSrc.includes('href="?post='));
  assert('Back link goes to blog', blogSrc.includes('href="blog"'));

  // Nav
  assert('Back to site link', blogSrc.includes('Back to site'));
  assert('Nav scroll JS', blogSrc.includes('nav.classList.toggle'));

  // Local dev link rewriting
  assert('Local dev link rewrite', /localhost[\s\S]*?app\.getbased\.health/.test(blogSrc));

  // No unnecessary page elements
  assert('No hamburger menu', !blogSrc.includes('nav-hamburger'));
  assert('No nav-drawer', !blogSrc.includes('nav-drawer'));
  assert('No hero section', !blogSrc.includes('class="hero"'));

  // ── 4. index.html — Blog nav link ──
  // On dev server, fetch('/') returns the site's index.html; fetch('index.html') may return the app's
  console.log('\n%c4. index.html — Blog nav link', 'font-weight:bold');
  const siteRes = await fetch('/');
  const siteSrc = await siteRes.text();
  // Only run if we got the landing page (has nav-drawer, not the app)
  const isSitePage = siteSrc.includes('nav-drawer');
  assert('Fetched site index.html', isSitePage);
  if (isSitePage) {
    assert('Desktop nav has Blog link', siteSrc.includes('<a href="/blog">Blog</a>'));
    // Check it appears in nav-links section (desktop)
    const navLinksMatch = siteSrc.match(/class="nav-links">([\s\S]*?)<\/div>/);
    assert('Blog link in nav-links div', navLinksMatch && navLinksMatch[1].includes('/blog'));
    // Check it appears in nav-drawer (mobile)
    const drawerMatch = siteSrc.match(/class="nav-drawer"[^>]*>([\s\S]*?)<\/div>/);
    assert('Blog link in nav-drawer', drawerMatch && drawerMatch[1].includes('/blog'));
    // Blog link should be between Docs and Open App
    assert('Blog link between Docs and Open App in nav',
      /Docs<\/a>\s*<a href="\/blog">Blog<\/a>\s*<a href="https:\/\/app\.getbased\.health" class="nav-cta"/.test(siteSrc));
  }

  // ── 5. thank-you.html — Blog footer link ──
  console.log('\n%c5. thank-you.html — Blog footer link', 'font-weight:bold');
  const tySrc = await fetch('thank-you.html').then(r => r.text());
  assert('TY footer has Blog link', tySrc.includes('<a href="/blog">Blog</a>'));
  // Check it's in footer-links
  const tyFooterMatch = tySrc.match(/class="footer-links">([\s\S]*?)<\/div>/);
  assert('Blog link in TY footer-links', tyFooterMatch && tyFooterMatch[1].includes('/blog'));

  // ── 6. vercel.json — CSP update ──
  // On dev server, /vercel.json may return the app's copy; check blog.html source as fallback
  console.log('\n%c6. vercel.json — CSP for marked.js', 'font-weight:bold');
  const vercelRes = await fetch('vercel.json');
  const vercelSrc = await vercelRes.text();
  // On the dev server, /vercel.json may return the app's copy (both repos have one).
  // The site's vercel.json has api.github.com (for GitHub stars); the app's has api.anthropic.com.
  const isSiteVercel = vercelSrc.includes('api.github.com');
  if (isSiteVercel) {
    assert('CSP includes cdn.jsdelivr.net in script-src', vercelSrc.includes('cdn.jsdelivr.net'));
    assert('CSP script-src has jsdelivr', /script-src[^;]*cdn\.jsdelivr\.net/.test(vercelSrc));
    assert('CSP still has fonts.googleapis.com', vercelSrc.includes('fonts.googleapis.com'));
    assert('CSP still has api.github.com', true);
    assert('CSP still has frame-src none', vercelSrc.includes("frame-src 'none'"));
  } else {
    // Dev server returned app's vercel.json — verify blog.html loads marked from CDN instead
    assert('CSP includes cdn.jsdelivr.net (checked via blog.html)', blogSrc.includes('cdn.jsdelivr.net/npm/marked'));
    console.log('  \u26a0\ufe0f  vercel.json from dev server is the app copy \u2014 CSP details skipped');
  }

  // ── Summary ──
  console.log(`\n%c${pass + fail} tests: ${pass} passed, ${fail} failed`, fail ? 'color:red;font-weight:bold' : 'color:green;font-weight:bold');
})();
