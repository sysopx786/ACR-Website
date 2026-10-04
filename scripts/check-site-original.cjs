const fs = require("node:fs");
const path = require("node:path");
const site = path.resolve(__dirname, "../dist");
let passed = 0;
const errors = [];
function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(item => {
    const p = path.join(dir, item.name);
    return item.isDirectory() ? files(p) : [p];
  });
}
function problem(page, message) {
  errors.push(path.relative(site, page) + ": " + message);
}
const pages = files(site).filter(p => p.endsWith(".html"));
const sitemap = fs.readFileSync(path.join(site, "sitemap.xml"), "utf8");
const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
for (const url of listed) {
  const pathname = new URL(url).pathname;
  if (!pathname.startsWith("/ACR-Website/")) {
    errors.push("Sitemap prefix invalid: " + pathname);
    continue;
  }
  const relative = pathname.slice("/ACR-Website/".length);
  if (!fs.existsSync(path.join(site, relative, "index.html"))) {
    errors.push("Sitemap target missing: " + pathname);
  }
}
for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  const relative = path.relative(site, page).replaceAll(path.sep, "/");
  const isSpanish = relative.startsWith("es/");
  // Old navigation anchors must not survive the review-section rename.
  if (html.includes("#google-reviews")) {
    problem(page, "obsolete #google-reviews link; update to #reviews");
  }
  if ((html.match(/<h1\b/g) || []).length !== 1) problem(page, "expected exactly one H1");
  if (!html.includes('<html lang="' + (isSpanish ? "es" : "en") + '"')) problem(page, "language mismatch");
  if (!html.includes('rel="canonical"')) problem(page, "canonical link missing");
  if (!html.includes("</main>") || !html.includes("</html>")) problem(page, "main or document closing tag missing");
  const h1Matches = [...html.matchAll(/<img\b[^>]*>/g)];
  for (const image of h1Matches) {
    if (!/\balt=/.test(image[0])) problem(page, "image missing alt attribute");
  }
  const code = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  for (const item of code) {
    try { JSON.parse(item[1]); } catch { problem(page, "invalid JSON-LD"); }
  }
  const refs = [...html.matchAll(/(?:href|src)="(\/ACR-Website\/[^"]*)"/g)];
  for (const ref of refs) {
    const raw = ref[1];
    const hashIndex = raw.indexOf("#");
    const fragment = hashIndex >= 0 ? raw.slice(hashIndex + 1) : "";
    const pathname = raw.split(/[?#]/)[0];
    let suffix = pathname.slice("/ACR-Website/".length);
    if (!suffix || suffix.endsWith("/")) suffix += "index.html";
    else if (!path.posix.extname(suffix)) suffix += "/index.html";
    const target = path.resolve(site, suffix);
    if (!target.startsWith(site + path.sep)) { problem(page, "unsafe local URL " + raw); continue; }
    if (!fs.existsSync(target)) { problem(page, "missing local URL " + raw); continue; }
    if (fragment && target.endsWith(".html") && fragment !== "") {
      const targetContent = fs.readFileSync(target, "utf8");
      const decoded = decodeURIComponent(fragment);
      if (!targetContent.includes('id="' + decoded + '"') && !targetContent.includes("id='" + decoded + "'"))
        problem(page, "unresolved fragment " + raw);
    }
  }
  passed++;
}
for (const language of ["", "es/"]) {
  const gallery = fs.readFileSync(path.join(site, language, "results/index.html"), "utf8");
  if ((gallery.match(/class="comparison-pair ba-comparison"/g) || []).length !== 10) {
    errors.push((language || "en/") + "results: expected 10 original comparisons");
  }
  if ((gallery.match(/\/assets\/original-jobs\//g) || []).length !== 20) {
    errors.push((language || "en/") + "results: expected 20 original photo references");
  }
}
if (!fs.readFileSync(path.join(site, "script.js"), "utf8").includes('const SITE_BASE="/ACR-Website/"')) {
  errors.push("language routing must respect the GitHub Pages base path");
}
if (errors.length) {
  console.error(errors.slice(0, 60).join("\n"));
  console.error("FAIL: " + errors.length + " issues across " + passed + " HTML pages");
  process.exit(1);
}
console.log("PASS: " + passed + " HTML pages, " + listed.length + " sitemap URLs, image refs, canonical tags, headings, fragments, languages, and gallery comparisons");