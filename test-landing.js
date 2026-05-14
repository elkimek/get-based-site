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

  const src = await fetch('index.html').then(r => r.text());
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
  assert('og:title present', src.includes('property="og:title"'));
  assert('og:image present', src.includes('property="og:image"'));
  assert('twitter:card present', src.includes('name="twitter:card"'));
  assert('canonical link present', src.includes('rel="canonical"'));
  assert('apple-touch-icon present', src.includes('apple-touch-icon'));
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
  assert('JSON-LD license is AGPL-3.0', src.includes('agpl-3.0'));

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
  assert('Mockup has 5 lens tabs in source', (src.match(/class="mockup-lens-tab/g) || []).length === 5, `found ${(src.match(/class="mockup-lens-tab/g) || []).length}`);
  ['labs', 'genome', 'body', 'lifestyle', 'environment'].forEach(l => {
    assert(`Mockup lens tab: data-lens="${l}"`, src.includes(`data-lens="${l}"`));
  });
  assert('Mockup has #mockup-cards container', src.includes('id="mockup-cards"'));
  assert('Mockup has #mockup-panel container', src.includes('id="mockup-panel"'));

  // ── 4. Five Lenses section ──
  console.log('\n%c4. Five Lenses section', 'font-weight:bold');
  assert('Has #lenses section', src.includes('id="lenses"'));
  assert('Section heading: "five ways to see it"', src.includes('five ways to see it'));
  assert('Subtitle: "aren\'t five separate tabs"', src.includes("aren't five separate tabs"));
  assert('5 lens cards in source', (src.match(/class="lens-card/g) || []).length === 5, `found ${(src.match(/class="lens-card/g) || []).length}`);
  ['Labs', 'Genome', 'Body', 'Lifestyle', 'Environment'].forEach(l => {
    assert(`Lens card: ${l}`, new RegExp(`lens-name">${l}<`).test(src));
  });
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
   'Is it actually working?', 'Cycle-Aware Labs', 'Biological Age &amp; Derived Markers',
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
  assert('4 faq-item elements', (src.match(/class="faq-item/g) || []).length === 4, `found ${(src.match(/class="faq-item/g) || []).length}`);
  assert('FAQ: hallucinate question', src.includes("Doesn't it hallucinate?"));
  assert('FAQ: most powerful feature', src.includes("most powerful feature?"));
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
  assert('Footer has Docs link', src.includes('href="https://app.getbased.health/docs"'));

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
  if (document.getElementById('lenses')) {
    assert('5 lens cards in DOM', document.querySelectorAll('.lens-card').length === 5);
    assert('10 feature cards in DOM', document.querySelectorAll('.feature-card').length === 10);
    assert('2 bento cards in DOM', document.querySelectorAll('.bento-card').length === 2);
    assert('5 provider cards in DOM', document.querySelectorAll('.provider-card').length === 5);
    assert('5 privacy cards in DOM', document.querySelectorAll('.priv-card').length === 5);
    assert('4 FAQ items in DOM', document.querySelectorAll('.faq-item').length === 4);
    assert('5 mockup lens tabs in DOM', document.querySelectorAll('.mockup-lens-tab').length === 5);

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
    assert('Mockup lens switch updates cards', /Genome|MTHFR|APOE|SNPs/.test(document.getElementById('mockup-cards').textContent));
    document.querySelector('.mockup-lens-tab[data-lens="labs"]').click();

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
  const ty = await fetch('thank-you.html').then(r => r.ok ? r.text() : '').catch(() => '');
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
