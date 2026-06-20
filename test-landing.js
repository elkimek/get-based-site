// test-landing.js — Verify the landing page (index.html) + thank-you.html.
// Run in the browser console on the served site:
//   fetch('test-landing.js').then(r=>r.text()).then(s=>Function(s)())

(async function() {
  let pass = 0, fail = 0;
  function assert(name, condition, detail) {
    if (condition) { pass++; console.log(`  ✅ ${name}`); }
    else { fail++; console.error(`  ❌ ${name}` + (detail ? ` — ${detail}` : '')); }
  }

  console.log('%c🧪 Landing Page Tests', 'font-weight:bold;font-size:14px');

  async function readText(path) {
    if (typeof window === 'undefined') {
      const fs = require('fs');
      return fs.readFileSync(path, 'utf8');
    }
    return fetch(path).then(r => r.text());
  }

  const src = await readText('index.html');
  const isLanding = src.includes('id="lenses"') && src.includes('class="nav-drawer"');
  assert('Fetched the getbased landing page', isLanding);
  if (!isLanding) {
    console.log('  ⚠️  Aborting — index.html is not the landing page (dev server may be serving the app)');
    console.log(`\n%c${pass + fail} tests: ${pass} passed, ${fail} failed`, 'color:red;font-weight:bold');
    return;
  }

  // ── 1. Head & metadata ──
  console.log('\n%c1. Head & metadata', 'font-weight:bold');
  assert('Title: Personal Health Intelligence', src.includes('<title>getbased — Open-Source Personal Health Intelligence</title>'));
  assert('Meta description mentions five lenses', /<meta name="description"[^>]*Five lenses on your biology/.test(src));
  assert('Meta description mentions Biology Scores lightly', /<meta name="description"[^>]*Biology Scores/.test(src));
  assert('og:title present', src.includes('property="og:title"'));
  assert('og:image present', src.includes('property="og:image"'));
  assert('twitter:card present', src.includes('name="twitter:card"'));
  assert('canonical link present', src.includes('rel="canonical"'));
  assert('apple-touch-icon present', src.includes('apple-touch-icon'));
  assert('llms-txt link present', src.includes('rel="llms-txt"'));
  assert('theme-color dark', /meta name="theme-color" content="#0a0c14"/.test(src));
  assert('theme-color light', /meta name="theme-color" content="#f5f7ff"/.test(src));

  // JSON-LD structured data
  const ldBlocks = [...src.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert('Has 4 JSON-LD blocks', ldBlocks.length === 4, `found ${ldBlocks.length}`);
  const ldTypes = [];
  let ldValid = true;
  ldBlocks.forEach(m => { try { ldTypes.push(JSON.parse(m[1])['@type']); } catch (e) { ldValid = false; } });
  assert('All JSON-LD blocks parse as valid JSON', ldValid);
  assert('Has SoftwareApplication schema', ldTypes.includes('SoftwareApplication'));
  assert('Has FAQPage schema', ldTypes.includes('FAQPage'));
  assert('Has HowTo schema', ldTypes.includes('HowTo'));
  assert('Has Organization schema', ldTypes.includes('Organization'));
  assert('JSON-LD license is AGPL-3.0', src.includes('agpl-3.0'));
  assert('SoftwareApplication has screenshot', src.includes('"screenshot": "https://getbased.health/og-image.png"'));

  // ── 2. Navigation ──
  console.log('\n%c2. Navigation', 'font-weight:bold');
  assert('Nav element with id', src.includes('<nav id="nav">'));
  assert('Nav split into left/right groups', src.includes('class="nav-left"') && src.includes('class="nav-right"'));
  ['Five Lenses', 'Why', 'Features', 'How it works', 'Privacy', 'Support', 'FAQ', 'Compare', 'Blog'].forEach(label => {
    assert(`Nav link: ${label}`, src.includes(`>${label}</a>`));
  });
  assert('Nav has Compare link to /compare', src.includes('href="/compare"'));
  assert('Nav has Open App CTA', src.includes('class="nav-cta"'));
  assert('Nav has theme toggle', src.includes('id="theme-toggle"'));
  assert('Nav has hamburger button', src.includes('class="nav-hamburger"'));
  assert('Mobile nav drawer exists', src.includes('id="nav-drawer"'));
  assert('Drawer carries Five Lenses link', /id="nav-drawer"[\s\S]*?Five Lenses/.test(src));

  // ── 3. Hero ──
  console.log('\n%c3. Hero', 'font-weight:bold');
  assert('Hero badge: Open source', /hero-badge[\s\S]*?Open source/.test(src));
  assert('Hero badge: Runs in your browser', src.includes('Runs in your browser'));
  assert('Hero H1: "Your biology"', /<h1[^>]*>Your biology/.test(src));
  assert('Hero H1: "deserves more"', src.includes('deserves more</span>'));
  assert('Hero subtitle: "myopic lens"', src.includes('myopic lens'));
  assert('Hero subtitle: "Pure signal, not noise"', src.includes('Pure signal, not noise'));
  assert('Hero actions: Launch App', /hero-actions[\s\S]*?Launch App/.test(src));
  assert('Hero version stamp span', src.includes('id="hero-version"'));
  assert('Interactive mockup present', src.includes('class="hero-mockup'));
  assert('Mockup has 7 curated hero nav tabs in source', (src.match(/class="mockup-lens-tab/g) || []).length === 7, `found ${(src.match(/class="mockup-lens-tab/g) || []).length}`);
  ['dashboard', 'labs', 'biology', 'genome', 'body', 'light', 'insight'].forEach(l => {
    assert(`Mockup lens tab: data-lens="${l}"`, src.includes(`data-lens="${l}"`));
  });
  assert('Mockup has #mockup-cards container', src.includes('id="mockup-cards"'));
  assert('Dashboard mockup does not duplicate widgets with three top cards', /dashboard:\s*\{[\s\S]*?cards:\s*\[\]/.test(src));
  assert('Dashboard mockup uses realistic dashboard panel', src.includes('mockup-panel-dashboard') && src.includes('Dashboard overview') && src.includes('Biological Coherence'));
  assert('Dashboard mockup fills desktop space with multiple widgets', (src.match(/class="mockup-dashboard-widget/g) || []).length >= 5, `found ${(src.match(/class="mockup-dashboard-widget/g) || []).length}`);
  assert('Mockup has #mockup-panel container', src.includes('id="mockup-panel"'));

  // ── 4. Five Lenses section ──
  console.log('\n%c4. Five Lenses section', 'font-weight:bold');
  assert('Has #lenses section', src.includes('id="lenses"'));
  assert('Section label: How it comes together', src.includes('How it comes together'));
  assert('Section heading: five ways + living picture', src.includes('Five ways in.') && src.includes('One living picture.'));
  assert('Subtitle connects lenses to Biology Scores and recommendations', src.includes('each show a different angle') && src.includes('Biology Scores reveal the pattern'));
  assert('5 lens cards in source', (src.match(/class="lens-card/g) || []).length === 5, `found ${(src.match(/class="lens-card/g) || []).length}`);
  ['Labs', 'Genome', 'Body', 'Light', 'Insight'].forEach(l => {
    assert(`Lens card: ${l}`, new RegExp(`lens-name">${l}<`).test(src));
  });
  assert('Uses one soft lens-flow instead of extra business cards', src.includes('class="lens-flow') && !src.includes('system-layer-card'));
  assert('Lens flow: Biology Scores then Recommendations', /Biology Scores reveal the pattern[\s\S]*?Recommendations become the next step/.test(src));
  assert('Genome lens mentions 50+ SNPs', /Genome[\s\S]*?50\+ SNPs/.test(src));

  // ── 5. Why section ──
  console.log('\n%c5. Why section', 'font-weight:bold');
  assert('Has #why section', src.includes('id="why"'));
  assert('Heading: "Because your doctor"', src.includes('Because your doctor'));
  assert('Has why-story', src.includes('why-story'));
  assert('4 who-card items', (src.match(/class="who-card reveal/g) || []).length === 4, `found ${(src.match(/class="who-card reveal/g) || []).length}`);
  ['The biohacker', 'The patient', 'The doctor who cares'].forEach(p => {
    assert(`Persona: ${p}`, src.includes(p));
  });

  // ── 6. How it works ──
  console.log('\n%c6. How it works', 'font-weight:bold');
  assert('Has #how section', src.includes('id="how"'));
  assert('Heading: "Three steps to clarity"', src.includes('Three steps to clarity'));
  assert('3 step blocks', (src.match(/class="step reveal/g) || []).length === 3, `found ${(src.match(/class="step reveal/g) || []).length}`);
  ['Import', 'Track', 'Understand'].forEach(s => {
    assert(`Step: ${s}`, src.includes(`<h3>${s}</h3>`));
  });

  // ── 7. Features ──
  console.log('\n%c7. Features section', 'font-weight:bold');
  assert('Has #features section', src.includes('id="features"'));
  assert('Heading: "Everything you need"', src.includes('Everything you need'));
  assert('10 feature-card elements', (src.match(/class="feature-card/g) || []).length === 10, `found ${(src.match(/class="feature-card/g) || []).length}`);
  assert('2 bento-card elements', (src.match(/class="bento-card/g) || []).length === 2, `found ${(src.match(/class="bento-card/g) || []).length}`);
  ['AI PDF Import', 'DNA &amp; mtDNA Import', 'Light &amp; Sun', 'Trend Charts',
   'Track what works', 'Cycle-Aware Labs', 'Biology Scores',
   'Your research library', 'E2E Encrypted Sync', 'Personal Agents'].forEach(f => {
    assert(`Feature card: ${f}`, src.includes(`<h3>${f}</h3>`));
  });
  assert('Bento: Consult anyone', src.includes('Consult anyone'));
  assert("Bento: What your GP won't ask", src.includes("What your GP won't ask"));
  assert('Wearables showcase present', src.includes('class="wear-showcase'));
  assert('Wearables showcase has 5 vendor tabs', (src.match(/class="wear-vendor/g) || []).length >= 5);

  // ── 8. Privacy ──
  console.log('\n%c8. Privacy section', 'font-weight:bold');
  assert('Has #privacy section', src.includes('id="privacy"'));
  assert('Heading: "Built for privacy"', src.includes('Built for privacy'));
  assert('5 priv-card elements', (src.match(/class="priv-card/g) || []).length === 5, `found ${(src.match(/class="priv-card/g) || []).length}`);
  ['Nothing stored on our end', 'Personal info is stripped from PDFs', 'Fully offline option',
   'Encrypted &amp; backed up', 'Available over Tor'].forEach(p => {
    assert(`Privacy card: ${p}`, src.includes(`<h3>${p}</h3>`));
  });

  // ── 9. AI Providers ──
  console.log('\n%c9. AI Providers section', 'font-weight:bold');
  assert('Has #providers section', src.includes('id="providers"'));
  assert('Heading: "choice of AI provider"', src.includes('choice') && src.includes('AI provider'));
  assert('5 provider-card elements', (src.match(/class="provider-card/g) || []).length === 5, `found ${(src.match(/class="provider-card/g) || []).length}`);
  ['PPQ', 'Routstr', 'OpenRouter', 'Venice AI', 'Local AI'].forEach(p => {
    assert(`Provider: ${p}`, src.includes(`<h3>${p}</h3>`));
  });

  // ── 10. Support ──
  console.log('\n%c10. Support section', 'font-weight:bold');
  assert('Has #support section', src.includes('id="support"'));
  assert('Heading: "You decide"', src.includes('You decide'));
  assert('3 support-card elements', (src.match(/class="support-card/g) || []).length === 3, `found ${(src.match(/class="support-card/g) || []).length}`);
  ['Donate', 'Contribute', 'Share'].forEach(s => {
    assert(`Support card: ${s}`, src.includes(`<h3>${s}</h3>`));
  });
  assert('Donate link has storeId', src.includes('storeId=BfxZicwEaRcJvJnkBPHdzGuCAonAhwLBb5vbWfjT2ZR1'));
  assert('Donate link redirects to /thank-you', src.includes('redirectURL=https%3A%2F%2Fgetbased.health%2Fthank-you'));

  // ── 11. FAQ ──
  console.log('\n%c11. FAQ section', 'font-weight:bold');
  assert('Has #faq section', src.includes('id="faq"'));
  assert('Heading: "Got questions?"', src.includes('Got questions?'));
  assert('5 faq-item elements', (src.match(/class="faq-item/g) || []).length === 5, `found ${(src.match(/class="faq-item/g) || []).length}`);
  assert('FAQ: hallucinate question', src.includes("Doesn't it hallucinate?"));
  assert('FAQ: app pulls together', src.includes('What pulls the app together?'));
  assert('FAQ: is this free', src.includes('Is this free?'));
  assert('FAQ: who is behind this', src.includes('Who is behind this?'));

  // ── 12. CTA & footer ──
  console.log('\n%c12. CTA & footer', 'font-weight:bold');
  assert('CTA: "Stop guessing"', src.includes('Stop guessing'));
  assert('CTA: "Start understanding"', src.includes('Start understanding'));
  assert('CTA: Launch getbased button', src.includes('Launch getbased'));
  assert('Footer has social links', src.includes('class="footer-socials"'));
  assert('Footer disclaimer (not medical advice)', /footer-disclaimer[\s\S]*?Not medical advice/.test(src));
  assert('Footer has Privacy + Terms links', src.includes('href="/privacy"') && src.includes('href="/terms"'));
  assert('Footer has Docs link', src.includes('href="https://docs.getbased.health"'));

  // ── 13. Light mode ──
  console.log('\n%c13. Light mode support', 'font-weight:bold');
  assert('Has [data-theme="light"] block', /\[data-theme="light"\]\s*\{/.test(src));
  assert('Light theme overrides --bg', /\[data-theme="light"\]\s*\{[^}]*--bg:#f5f7ff/.test(src));
  assert('prefers-color-scheme no-JS fallback', /prefers-color-scheme:\s*light[\s\S]*?:root:not\(\[data-theme\]\)/.test(src));
  assert('Early theme detection script', /document\.documentElement\.setAttribute\('data-theme',\s*'light'\)/.test(src));
  assert('Theme toggle: sun + moon icons', src.includes('theme-icon-sun') && src.includes('theme-icon-moon'));
  assert('Theme toggle JS sets localStorage', /theme-toggle[\s\S]*?localStorage\.setItem\('labcharts-theme'/.test(src));

  // ── 14. JS behaviour present ──
  console.log('\n%c14. JS behaviour', 'font-weight:bold');
  assert('JS: switchLens (mockup) function', src.includes('function switchLens'));
  assert('JS: lensData object', src.includes('const lensData'));
  assert('JS: toggleDrawer (hamburger) function', src.includes('function toggleDrawer'));
  assert('JS: Escape closes drawer', /keydown[\s\S]*?Escape[\s\S]*?toggleDrawer/.test(src));
  assert('JS: reveal IntersectionObserver', src.includes('IntersectionObserver'));
  assert('JS: GitHub stars fetch', src.includes('api.github.com/repos/elkimek/get-based'));
  assert('JS: no leftover stats count-up', !src.includes('function animateCount'));

  // ── 15. Link integrity ──
  console.log('\n%c15. Link integrity', 'font-weight:bold');
  assert('App links present (3+ CTAs)', (src.match(/app\.getbased\.health/g) || []).length >= 3);
  assert('No relative /app links', !src.includes('href="/app"'));
  assert('Links to /compare', src.includes('href="/compare"'));
  assert('Links to /blog', src.includes('href="/blog"'));

  // ── 16. Live DOM & interactivity ──
  console.log('\n%c16. Live DOM & interactivity', 'font-weight:bold');
  if (typeof document !== 'undefined' && document.getElementById('lenses')) {
    assert('5 lens cards in DOM', document.querySelectorAll('.lens-card').length === 5);
    assert('10 feature cards in DOM', document.querySelectorAll('.feature-card').length === 10);
    assert('2 bento cards in DOM', document.querySelectorAll('.bento-card').length === 2);
    assert('5 provider cards in DOM', document.querySelectorAll('.provider-card').length === 5);
    assert('5 privacy cards in DOM', document.querySelectorAll('.priv-card').length === 5);
    assert('5 FAQ items in DOM', document.querySelectorAll('.faq-item').length === 5);
    assert('7 curated mockup hero nav tabs in DOM', document.querySelectorAll('.mockup-lens-tab').length === 7);

    // Theme toggle round-trips
    const themeBefore = document.documentElement.getAttribute('data-theme');
    document.getElementById('theme-toggle').click();
    assert('Theme toggle flips data-theme', document.documentElement.getAttribute('data-theme') !== themeBefore);
    document.getElementById('theme-toggle').click();
    assert('Theme toggle restores state', document.documentElement.getAttribute('data-theme') === themeBefore);

    // FAQ accordion opens/closes
    const faq = document.querySelector('.faq-item');
    faq.querySelector('.faq-q').click();
    assert('FAQ accordion opens', faq.classList.contains('open'));
    faq.querySelector('.faq-q').click();
    assert('FAQ accordion closes', !faq.classList.contains('open'));

    // Mockup lens switching
    const genomeTab = document.querySelector('.mockup-lens-tab[data-lens="genome"]');
    genomeTab.click();
    await new Promise(r => setTimeout(r, 200));
    assert('Mockup lens switch activates tab', genomeTab.classList.contains('active'));
    assert('Mockup lens switch updates to full-width app-style panel', document.querySelectorAll('#mockup-cards .mockup-card').length === 0 && /Genome|APOE|Methylation|Actionable modifiers/.test(document.getElementById('mockup-panel').textContent));
    const biologyTab = document.querySelector('.mockup-lens-tab[data-lens="biology"]');
    biologyTab.click();
    await new Promise(r => setTimeout(r, 200));
    assert('Mockup Biology Scores tab activates', biologyTab.classList.contains('active'));
    assert('Mockup Biology Scores tab uses domain score map, not duplicate dashboard card', document.querySelectorAll('#mockup-cards .mockup-card').length === 0 && /System scores|Domain score map|Thyroid hormones|Avoid over-testing/.test(document.getElementById('mockup-panel').textContent));
    const expectedRouteTitles = {
      labs: 'Labs', genome: 'Genome', body: 'Body', light: 'Light & Sun', insight: 'Insight'
    };
    for (const [lens, title] of Object.entries(expectedRouteTitles)) {
      const tab = document.querySelector(`.mockup-lens-tab[data-lens="${lens}"]`);
      tab.click();
      await new Promise(r => setTimeout(r, 200));
      const panel = document.getElementById('mockup-panel');
      assert(`Mockup ${lens} tab has route-specific app panel`, panel.textContent.includes(title) && panel.querySelector('.mockup-route-card'));
      const leaking = [...panel.querySelectorAll('*')].filter(el => el.scrollWidth > el.clientWidth + 1);
      assert(`Mockup ${lens} tab has no horizontal text/card overflow`, leaking.length === 0, leaking.slice(0, 2).map(el => el.className).join(', '));
    }
    document.querySelector('.mockup-lens-tab[data-lens="dashboard"]').click();

    // Hamburger drawer
    const ham = document.getElementById('nav-hamburger'), drawer = document.getElementById('nav-drawer');
    ham.click();
    assert('Hamburger opens drawer', drawer.classList.contains('open'));
    ham.click();
    assert('Hamburger closes drawer', !drawer.classList.contains('open'));
  } else {
    console.log('  ⚠️  Not running on index.html — skipping live DOM checks');
  }

  // ── 17. thank-you.html ──
  console.log('\n%c17. thank-you.html', 'font-weight:bold');
  const ty = await readText('thank-you.html').catch(() => '');
  assert('thank-you.html exists', ty.length > 0);
  if (ty) {
    assert('TY: has title', ty.includes('<title>Thank You'));
    assert('TY: logo is "getbased" (one word)', ty.includes('class="nav-logo">getbased</a>'));
    assert('TY: "Thank you!" heading', ty.includes('Thank you!'));
    assert('TY: Back to site button', ty.includes('Back to site'));
    assert('TY: Open App button', ty.includes('Open App'));
    assert('TY: light theme block', /\[data-theme="light"\]\s*\{/.test(ty));
    assert('TY: theme toggle', ty.includes('id="theme-toggle"'));
    assert('TY: og:image', ty.includes('og:image'));
  }

  // ── Summary ──
  console.log(`\n%c${pass + fail} tests: ${pass} passed, ${fail} failed`, fail ? 'color:red;font-weight:bold' : 'color:green;font-weight:bold');
})();
