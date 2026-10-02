# American Clothing Restoration Website

Deployable, bilingual website for **American Clothing Restoration (ACR)**, an Ephrata, Pennsylvania business specializing in clothing and textile restoration after fire, smoke, soot, water, flood, and related property losses.

## Website and Repository

- Public website: https://sysopx786.github.io/ACR-Website/
- Repository: https://github.com/sysopx786/ACR-Website
- ChatGPT Sites preview: https://american-clothing-restoration.valli349022.chatgpt.site

The public GitHub Pages site is served under `/ACR-Website/`. Keep internal links and assets compatible with that prefix.

## Business Details

**American Clothing Restoration**  
17A East Queen Street  
Ephrata, PA 17522  
**717-738-2679**

- Telephone link: `tel:+17177382679`
- Available **24/7 for inquiries**.
- **Free pickup** is an advertised service. Contact ACR for collection arrangements. Do not invent geographic eligibility rules or new service limitations.
- The Contact page contains the embedded map and main location information.

Primary positioning: **Restoring What Matters.**  
Supporting line: **You Restore the Property. We Focus on What's Inside.**

Keep the business focused on clothing, textiles, and garment care; do not imply that ACR repairs buildings or performs general structural restoration.

## Page Inventory

The sitemap lists **20 English pages and 20 corresponding Spanish pages**. Spanish equivalents use the same path under `/es/`.

| Page | English path |
| --- | --- |
| Home | `/` |
| What We Restore | `/what-we-restore/` |
| Our Process | `/our-process/` |
| For Professionals | `/for-professionals/` |
| Results / Before & After | `/results/` |
| About | `/about/` |
| Contact | `/contact/` |
| Fire & Smoke Damage | `/fire-smoke-damage-clothing-restoration/` |
| Water & Flood Damage | `/water-flood-damage-textile-restoration/` |
| Frequently Asked Questions | `/faq/` |
| Chester County Information | `/chester-county-clothing-restoration/` |
| Firefighter Turnout Gear case study | `/case-studies/firefighter-turnout-gear/` |
| Wedding Gown case study | `/case-studies/wedding-gown/` |
| Chef Uniforms & Aprons case study | `/case-studies/chef-uniforms-aprons/` |
| Leather Jacket case study | `/case-studies/leather-jacket/` |
| Bedding & Textiles case study | `/case-studies/bedding-textiles/` |
| Patchwork Quilt case study | `/case-studies/patchwork-quilt/` |
| Privacy Policy | `/privacy-policy/` |
| Terms of Service | `/terms-of-service/` |
| Cookie Policy | `/cookie-policy/` |

The root paths above are relative to `/ACR-Website/`. The corresponding translated home page is `/es/`.

## Navigation and Mobile Experience

English and Spanish desktop and mobile navigation use a common, responsive dropdown structure. The menu includes:

- **Home**
- **Services:** Fire & Smoke, Water & Flood, What We Restore
- **For Professionals** (top-level menu link on desktop and mobile; **Para profesionales** in Spanish)
- **Our Process**
- **Results:** Before & After and six case studies
- **Service Areas:** Chester County
- **About:** About ACR, FAQs, Reviews
- **Contact**

Navigation links are built by `dist/script.js` for desktop and mobile. `dist/styles.css` provides dropdown and responsive styles. The language switch maps visitors to the corresponding translated page. The sticky mobile **Call ACR** control is retained. Test actual desktop and mobile interaction, including Android, after any navigation change.

## Page Content and Media

- Homepage includes key service information, before-and-after previews, restoration guidance, reviews, six selected FAQ answers, and a link to Chester County information.
- The FAQ page groups **20 questions** by subject. English and Spanish answers must stay aligned.
- English and Spanish Results galleries each display the **same 10 original ACR before-and-after job pairs**. Maintain the correct damaged **Before** and restored **After** labels. Six bilingual case studies reuse appropriate original images; do not misidentify illustrative images as ACR work.
- Original job photographs are separate media assets in `dist/assets/original-jobs/`, rather than base64 images embedded in HTML. Keep below-the-fold image loading lazy where appropriate, and preserve slider accessibility. This reduces HTML document size but does **not** by itself verify live performance scores.
- Decorative or illustrative imagery elsewhere must not be presented as documented customer work.
- Reviews, ratings, and business claims require source verification before being presented as verified.
- The Chester County page is informational, not a representation of a separate branch location.

## Contact and Content Cleanup — October 2026

The site was streamlined to limit repetitive contact and promotional material:

- Removed the oversized homepage business-details panel, extra phone/address feature, and repeated county promotion.
- Kept the homepage FAQ preview and one link to the complete 20-question FAQ page.
- Removed repeated **Chester County** promotional blocks from other pages while retaining the dedicated county page.
- Consolidated generic FAQ promotional panels into smaller contextual links on relevant service pages.
- Simplified Contact to a prominent phone number, address, and **one embedded Google Map**.
- Reduced redundant call buttons and related-services prompts.
- Replaced lengthy footers with company contact information, compact page links, and legal links.
- Applied the same cleanup to the corresponding Spanish pages.
- Retained the persistent mobile call action, original results, reviews, and substantive service descriptions.

Avoid reintroducing multiple phone numbers, maps, contact buttons, or identical promotional blocks in close proximity. A short service-specific action generally works better than repeated generic calls to action.

## SEO and Search Console

The site includes page titles and descriptions, canonical links, English/Spanish `hreflang` references, structured data where appropriate, `robots.txt`, `sitemap.xml`, and contextual internal links.

- Sitemap: https://sysopx786.github.io/ACR-Website/sitemap.xml
- Suggested URL-prefix property: `https://sysopx786.github.io/ACR-Website/`
- Verify ownership with the **actual** Google Search Console token or HTML file.
- Check indexing for Home, Fire, Water, Results, FAQ, Chester County, and all six case studies.
- Review indexing, impressions, clicks, and queries over time. Deployment does not establish search ranking or indexing.
- **Pending:** Google Search Console account authorization and property ownership verification are required before sitemap submission and indexing/performance inspection can be confirmed.
- FAQ structured data is not a guarantee of FAQ rich results.
- Do not create unverified town-specific service claims, ratings, guarantees, insurance partnerships, certifications, or turnaround promises.


## Professional Claims Workflow — October 2026

- The **For Professionals** page now includes separate, concise insurance-carrier/adjuster and contractor panels outlining only confirmed ACR capabilities, plus three original ACR before-and-after comparisons (chef uniforms/aprons, leather jacket, and household textiles/bedding). The image controls support mouse, touch and keyboard via native range inputs.
- Spanish `es/for-professionals/` contains matching translated content and the same three original job pairs. No professional intake form was added, per project decision. Keep the full Results galleries as the primary source rather than duplicating all 10 jobs here.


- The English and Spanish `for-professionals/` pages include a six-step **How Our Partnership Works** accordion timeline: Referral, Assessment, Inventory & Estimate, Pickup & Restoration, Coordination, and Delivery & Billing.
- The timeline uses native `<details>`/`<summary>` elements for keyboard accessibility, with responsive three-, two-, and one-column layouts in `dist/styles.css`.
- ACR has confirmed direct adjuster coordination, itemized photographic inventories, written and Xactimate estimates, off-site storage and scheduled return, essential-clothing emergency handling, direct insurance billing **when authorized**, and existing vendor agreements. Do not infer particular carriers, guaranteed payment, coverage, or approval from these facts.
- Keep the workflow bilingual and avoid adding redundant maps, phone blocks, or referral forms without separate approval.

## Hosting and Deployment

- Website files: `dist/`
- GitHub Pages workflow: `.github/workflows/pages.yml`
- Browser QA workflow: `.github/workflows/browser-qa.yml`
- Live mobile/desktop Lighthouse workflow: `.github/workflows/performance-qa.yml`
- Static-site validator: `scripts/check-site.cjs`
- ChatGPT Sites configuration: `.openai/hosting.json`

The Pages workflow runs on pushes to `main`, checks site content and links, and publishes `dist/` to GitHub Pages. The independent browser QA workflow includes desktop/mobile checks and screenshots. The repeatable Lighthouse workflow measures the published homepage on simulated mobile and desktop network profiles; it is not a substitute for real-user Core Web Vitals.

Local site check:

```bash
node scripts/check-site.cjs
```

Inspect the latest machine-readable results in `qa/latest-browser-qa.json` and `qa/latest-performance.json` along with the corresponding **job conclusion** in GitHub Actions. Generated results can be saved even if a workflow is later cancelled or fails, so confirm both. Performance scores are single laboratory runs and may vary. Real-device and real-user performance checks remain necessary. Review deployment and browser QA status in GitHub Actions after updates. Do not describe a push as a successfully published live site until GitHub Pages reports a successful deployment.

## Deferred Audit Items

- **Customer reviews and aggregate-rating markup (audit item 1)** are deliberately **deferred** for business-owner verification. Do not modify them as part of audit items 2–7 without a separate decision.
- Browser QA still requires a confirmed successful run and real-device review; do not state those were completed unless supported by results.
- Confirm services, service area, contact/pickup logistics, and structured-data claims with the business owner. Do not manufacture eligibility restrictions or guarantees.

## Maintenance Guidelines

1. Keep English and Spanish copy, navigation, URLs, SEO metadata, and links aligned.
2. Preserve the original ACR results photos and their before/after ordering.
3. Keep the site visually restrained, with one useful primary action per section and no repetitive contact panels.
4. Maintain one map on each language's Contact page; avoid maps on unrelated service pages.
5. Keep phone, address, 24/7 inquiries, and free-pickup information accurate.
6. Do not invent company information, customer outcomes, pricing, staff, awards, service eligibility rules, email addresses, or reviews.
7. Do not add contact forms, newsletter forms, cookie popups, booking flows, or chatbots without approval.
8. Check internal links, mobile navigation, language switching, image loading, accessibility, and the site validator before release.
9. Keep source QA scripts, required deployment configurations, and published media assets; remove only genuinely unused temporary files.

_Last documentation update: October 2, 2026._
