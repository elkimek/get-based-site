// test-blog.js — Verify the blog: posts index, source markdown,
// pre-built post pages, the blog list page, and cross-site links.
// Run in the browser console on the served site:
//   fetch('test-blog.js').then(r=>r.text()).then(s=>Function(s)())

(async function() {
  let pass = 0, fail = 0;
  function assert(name, condition, detail) {
    if (condition) { pass++; console.log(`  ✅ ${name}`); }
    else { fail++; console.error(`  ❌ ${name}` + (detail ? ` — ${detail}` : '')); }
  }

  console.log('%c🧪 Blog Tests', 'font-weight:bold;font-size:14px');

  // ── 1. blog/posts.json — post index ──
  console.log('\n%c1. blog/posts.json — Post index', 'font-weight:bold');
  const postsRes = await fetch('blog/posts.json');
  assert('posts.json exists (200)', postsRes.ok);
  const posts = await postsRes.json();
  assert('posts.json is an array', Array.isArray(posts));
  assert('Has at least one post', posts.length >= 1);
  posts.forEach((p, i) => {
    assert(`Post ${i} has non-empty slug`, typeof p.slug === 'string' && p.slug.length > 0);
    assert(`Post ${i} has non-empty title`, typeof p.title === 'string' && p.title.length > 0);
    assert(`Post ${i} has ISO date`, /^\d{4}-\d{2}-\d{2}$/.test(p.date));
    assert(`Post ${i} has non-empty description`, typeof p.description === 'string' && p.description.length > 0);
  });

  // ── 2. Per-post files — source markdown + pre-built page ──
  // Posts are pre-built into blog/<slug>/index.html (build-blog.js + blog-template.html).
  console.log('\n%c2. Per-post files — source .md + pre-built index.html', 'font-weight:bold');
  for (const p of posts) {
    const mdRes = await fetch(`blog/${p.slug}.md`);
    assert(`blog/${p.slug}.md exists (200)`, mdRes.ok);
    if (mdRes.ok) {
      const md = await mdRes.text();
      assert(`${p.slug}.md starts with an h1`, md.startsWith('# '));
    }

    const pageRes = await fetch(`blog/${p.slug}/index.html`);
    assert(`blog/${p.slug}/index.html exists (200)`, pageRes.ok);
    if (pageRes.ok) {
      const page = await pageRes.text();
      assert(`${p.slug} page has a <title>`, /<title>[^<]+<\/title>/.test(page));
      assert(`${p.slug} page canonical points to its slug`, page.includes(`getbased.health/blog/${p.slug}`));
      assert(`${p.slug} page favicon is root-absolute`, page.includes('href="/icon.svg"'));
      assert(`${p.slug} page has og:image`, page.includes('og:image'));
      assert(`${p.slug} page has article content`, page.includes('class="article"'));
    }
  }

  // ── 3. blog.html — the list page ──
  console.log('\n%c3. blog.html — List page', 'font-weight:bold');
  const blogSrc = await fetch('blog.html').then(r => r.text());
  assert('blog.html exists', blogSrc.length > 0);

  // Meta + design system
  assert('Title: "Blog — getbased"', blogSrc.includes('<title>Blog — getbased</title>'));
  assert('canonical link present', blogSrc.includes('rel="canonical"'));
  assert('og:image present', blogSrc.includes('og:image'));
  assert('Has bg-grid', blogSrc.includes('class="bg-grid"'));
  assert('Has bg-glow', blogSrc.includes('class="bg-glow"'));
  assert('Has nav element', blogSrc.includes('<nav'));
  assert('Has footer', blogSrc.includes('<footer'));

  // Fonts + theme support
  assert('Inter font loaded', blogSrc.includes('family=Inter'));
  assert('Outfit font loaded', blogSrc.includes('family=Outfit'));
  assert('Light theme block', /\[data-theme="light"\]\s*\{/.test(blogSrc));
  assert('Early theme detection script', /labcharts-theme[\s\S]*?setAttribute\('data-theme'/.test(blogSrc));
  assert('Theme toggle button', blogSrc.includes('id="theme-toggle"'));
  assert('Sun icon', blogSrc.includes('theme-icon-sun'));
  assert('Moon icon', blogSrc.includes('theme-icon-moon'));

  // List structure — one card per post, each linking to /blog/<slug>
  assert('Has post-card markup', blogSrc.includes('class="post-card"'));
  posts.forEach(p => {
    assert(`Links to /blog/${p.slug}`, blogSrc.includes(`href="/blog/${p.slug}"`));
  });
  assert('Has "Back to site" link', blogSrc.includes('Back to site'));

  // It is the static list page, not the retired client-side SPA
  assert('No client-side markdown library', !blogSrc.includes('marked'));
  assert('No ?post= query routing', !blogSrc.includes('?post='));

  // ── 4. index.html — Blog nav link ──
  // On the dev server, fetch('/') returns the site's index.html.
  console.log('\n%c4. index.html — Blog nav link', 'font-weight:bold');
  const siteSrc = await fetch('/').then(r => r.text());
  const isSitePage = siteSrc.includes('nav-drawer');
  assert('Fetched the site landing page', isSitePage);
  if (isSitePage) {
    assert('Nav has Blog link', siteSrc.includes('<a href="/blog">Blog</a>'));
    assert('Nav has Compare link', siteSrc.includes('<a href="/compare">Compare</a>'));
    const navLinksMatch = siteSrc.match(/class="nav-links">([\s\S]*?)<\/div>/);
    assert('Blog link in nav-links (desktop)', !!navLinksMatch && navLinksMatch[1].includes('/blog'));
    const drawerMatch = siteSrc.match(/class="nav-drawer"[^>]*>([\s\S]*?)<\/div>/);
    assert('Blog link in nav-drawer (mobile)', !!drawerMatch && drawerMatch[1].includes('/blog'));
  }

  // ── 5. thank-you.html — Blog footer link ──
  console.log('\n%c5. thank-you.html — Blog footer link', 'font-weight:bold');
  const tySrc = await fetch('thank-you.html').then(r => r.text());
  assert('thank-you.html footer has Blog link', tySrc.includes('href="/blog"'));

  // ── Summary ──
  console.log(`\n%c${pass + fail} tests: ${pass} passed, ${fail} failed`, fail ? 'color:red;font-weight:bold' : 'color:green;font-weight:bold');
})();
