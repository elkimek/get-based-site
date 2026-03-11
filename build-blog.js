#!/usr/bin/env node
// Generates static HTML files for each blog post from markdown sources.
// Usage: node build-blog.js
// Reads blog/posts.json + blog/*.md, outputs blog/<slug>/index.html

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, 'blog');
const posts = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, 'posts.json'), 'utf8'));
const templateHTML = fs.readFileSync(path.join(__dirname, 'blog-template.html'), 'utf8');

// Minimal markdown-to-HTML converter (no dependencies)
function md(src) {
  let html = '';
  const lines = src.split('\n');
  let i = 0;
  let inCode = false, codeLang = '', codeLines = [];
  let inUl = false, inOl = false;
  let inBlockquote = false, bqLines = [];

  function flushList() {
    if (inUl) { html += '</ul>\n'; inUl = false; }
    if (inOl) { html += '</ol>\n'; inOl = false; }
  }
  function flushBq() {
    if (inBlockquote) {
      html += '<blockquote>' + md(bqLines.join('\n')) + '</blockquote>\n';
      inBlockquote = false;
      bqLines = [];
    }
  }

  function inline(text) {
    return text
      // images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
      // links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      // bold+italic
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
      // bold
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // italic
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code blocks
    if (/^```/.test(line)) {
      if (!inCode) {
        flushList(); flushBq();
        inCode = true;
        codeLang = line.slice(3).trim();
        codeLines = [];
        i++; continue;
      } else {
        const escaped = codeLines.join('\n')
          .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        html += '<pre><code>' + escaped + '</code></pre>\n';
        inCode = false;
        i++; continue;
      }
    }
    if (inCode) { codeLines.push(line); i++; continue; }

    // Blank line
    if (line.trim() === '') { flushList(); flushBq(); i++; continue; }

    // Blockquote
    if (/^>\s?/.test(line)) {
      flushList();
      inBlockquote = true;
      bqLines.push(line.replace(/^>\s?/, ''));
      i++; continue;
    } else {
      flushBq();
    }

    // Headings
    const hMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (hMatch) {
      flushList();
      const level = hMatch[1].length;
      html += `<h${level}>${inline(hMatch[2])}</h${level}>\n`;
      i++; continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      flushList();
      html += '<hr>\n';
      i++; continue;
    }

    // Unordered list
    const ulMatch = line.match(/^[-*+]\s+(.+)/);
    if (ulMatch) {
      if (!inUl) { html += '<ul>\n'; inUl = true; }
      html += '<li>' + inline(ulMatch[1]) + '</li>\n';
      i++; continue;
    }

    // Ordered list
    const olMatch = line.match(/^\d+\.\s+(.+)/);
    if (olMatch) {
      if (!inOl) { html += '<ol>\n'; inOl = true; }
      html += '<li>' + inline(olMatch[1]) + '</li>\n';
      i++; continue;
    }

    // Paragraph — collect consecutive non-blank lines
    flushList();
    let pLines = [line];
    while (i + 1 < lines.length && lines[i + 1].trim() !== '' &&
           !/^(#{1,6}\s|```|[-*+]\s|\d+\.\s|>\s?|---$|\*\*\*$|___$)/.test(lines[i + 1])) {
      i++;
      pLines.push(lines[i]);
    }
    html += '<p>' + inline(pLines.join('\n')) + '</p>\n';
    i++;
  }

  flushList(); flushBq();
  if (inCode) {
    const escaped = codeLines.join('\n')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    html += '<pre><code>' + escaped + '</code></pre>\n';
  }
  return html;
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function escapeAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Build the post list HTML for the index page
function buildListHTML(posts) {
  let html = '<div class="blog-header"><h1>Blog</h1><p>Stories from building getbased</p></div>';
  html += '<div class="post-list">';
  for (const post of posts) {
    html += `<a class="post-card" href="/blog/${encodeURIComponent(post.slug)}">`
      + `<div class="post-date">${escapeAttr(formatDate(post.date))}</div>`
      + `<h2>${escapeAttr(post.title)}</h2>`
      + `<p>${escapeAttr(post.description)}</p>`
      + `</a>`;
  }
  html += '</div>';
  return html;
}

// Extract the template parts (everything before and after the dynamic content)
// We'll replace meta tags, content, and remove the client-side rendering script
function buildPage({ title, description, url, type, content, jsonLd }) {
  let html = templateHTML;

  // Replace meta tags
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*"/, `$1${escapeAttr(description)}"`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*"/, `$1${escapeAttr(title)}"`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*"/, `$1${escapeAttr(description)}"`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*"/, `$1${escapeAttr(url)}"`);
  html = html.replace(/(<meta property="og:type" content=")[^"]*"/, `$1${type}"`);
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${escapeAttr(title)}"`);
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${escapeAttr(description)}"`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*"/, `$1${escapeAttr(url)}"`);

  // Inject JSON-LD if provided
  if (jsonLd) {
    html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n</head>`);
  }

  // Replace the loading div with static content
  html = html.replace(
    '<div class="blog-loading">Loading...</div>',
    content
  );

  // Remove the marked.js CDN and client-side rendering script
  html = html.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/marked\/marked\.min\.js"><\/script>\n/, '');
  // Remove the IIFE that does client-side rendering (first script block after marked.js)
  html = html.replace(
    /\n<script>\n\(function\(\) \{\n\s*var container = document\.getElementById\('blog-content'\)[\s\S]*?}\)\(\);\n/,
    '\n<script>\n'
  );

  return html;
}

// --- Generate blog index page ---
const listContent = buildListHTML(posts);
const indexPage = buildPage({
  title: 'Blog — getbased',
  description: 'Stories and insights from building getbased — an open-source blood work dashboard.',
  url: 'https://getbased.health/blog',
  type: 'website',
  content: listContent,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'getbased Blog',
    url: 'https://getbased.health/blog',
    description: 'Stories and insights from building getbased — an open-source blood work dashboard.',
    publisher: {
      '@type': 'Organization',
      name: 'getbased',
      url: 'https://getbased.health'
    }
  }
});

// Write blog index — overwrite blog.html with static version
fs.writeFileSync(path.join(__dirname, 'blog.html'), indexPage);
console.log('  blog.html (index)');

// --- Generate individual post pages ---
for (const post of posts) {
  const mdPath = path.join(BLOG_DIR, `${post.slug}.md`);
  if (!fs.existsSync(mdPath)) {
    console.error(`  SKIP ${post.slug} — ${mdPath} not found`);
    continue;
  }

  const markdown = fs.readFileSync(mdPath, 'utf8');
  const articleHTML = md(markdown);
  const content = `<a href="/blog" class="blog-back">&larr; All posts</a>`
    + `<article class="article">${articleHTML}</article>`;

  const postUrl = `https://getbased.health/blog/${post.slug}`;
  const postPage = buildPage({
    title: `${post.title} — getbased`,
    description: post.description,
    url: postUrl,
    type: 'article',
    content,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      url: postUrl,
      datePublished: post.date,
      author: post.author ? { '@type': 'Person', name: post.author } : undefined,
      publisher: {
        '@type': 'Organization',
        name: 'getbased',
        url: 'https://getbased.health'
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl }
    }
  });

  const postDir = path.join(BLOG_DIR, post.slug);
  if (!fs.existsSync(postDir)) fs.mkdirSync(postDir, { recursive: true });
  fs.writeFileSync(path.join(postDir, 'index.html'), postPage);
  console.log(`  blog/${post.slug}/index.html`);
}

console.log('\nDone! Blog pages generated statically.');
