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

## Professional SEO Updates — October 2026

- Updated English and Spanish For Professionals page titles, meta descriptions, Open Graph/Twitter metadata, H1 headings, and lead copy for insurance textile restoration, Xactimate-based estimates, and restoration contractor coordination.
- Added contextual bilingual links between the professional page and Fire & Smoke, Water & Flood, and Our Process pages, without adding repeated Chester County promotions.
- Existing canonical links, reciprocal `hreflang` links, sitemap entries for both languages, and permissive `robots.txt` were retained. Do not invent named insurer endorsements, coverage approvals, rankings, or preferred-vendor status.
- Actual Google Search Console indexing and current live deployment/Android browser QA remain independently verifiable; source updates alone cannot prove those external states.

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



### Insurance claim context and visual consistency — October 2, 2026

- English and Spanish For Professionals pages now add a five-step **illustrative insurance claim overview**, with the third step highlighting ACR's involvement, plus a five-role **Who Is Responsible for What?** section covering policyholder, adjuster, carrier, restoration contractor and ACR. This describes typical parties, not a fixed insurance or internal ACR workflow; authorizations, coverage and payments vary.
- Page order: introduction, four audience cards, five-step claims context with role definitions, existing six-step ACR workflow, service details, original photo comparisons and FAQs.
- Restored the initial professional-page green overrides to the established ACR palette of charcoal, gold, cream, taupe and off-white. Scope new layouts to professional pages; avoid green and navy accents in new work.
- Retain existing bilingual links, no professional intake form, and the fixed mobile call action. Validate latest browser QA and deployment runs separately from source inspection.

## Professional Claims Workflow — October 2026

- Browser QA now explicitly exercises **both professional pages** at 1440px desktop and Android-style 393px mobile width: top-level navigation, dropdowns, six workflow steps, eight FAQs with keyboard toggling, three slider interactions including keyboard, bilingual routing, local link HTTP checks, original image loading, overflow, JavaScript errors, WCAG axe serious/critical findings, and screenshots. The workflow triggers when either professional page changes. A report for an earlier commit is not proof that the latest professional pages passed; check `qa/latest-browser-qa.json` and the associated Actions job conclusion before stating success.


- The professional page includes eight specialist FAQs, divided into adjuster/carrier and restoration-contractor topics, as native accessible expandable answers on both English and Spanish routes. The existing 20 consumer FAQs remain on the separate FAQ pages. No referral form was added.
- The **For Professionals** page now includes separate, concise insurance-carrier/adjuster and contractor panels outlining only confirmed ACR capabilities, plus three original ACR before-and-after comparisons (chef uniforms/aprons, leather jacket, and household textiles/bedding). The image controls support mouse, touch and keyboard via native range inputs.
- Spanish `es/for-professionals/` contains matching translated content and the same three original job pairs. No professional intake form was added, per project decision. Keep the full Results galleries as the primary source rather than duplicating all 10 jobs here.


- The English and Spanish `for-professionals/` pages include a six-step **How Our Partnership Works** accordion timeline: Referral, Assessment, Inventory & Estimate, Pickup & Restoration, Coordination, and Delivery & Billing.
- The timeline uses native `<details>`/`<summary>` elements for keyboard accessibility, with responsive three-, two-, and one-column layouts in `dist/styles.css`.
- ACR has confirmed direct adjuster coordination, itemized photographic inventories, written and Xactimate estimates, off-site storage and scheduled return, essential-clothing emergency handling, direct insurance billing **when authorized**, and existing vendor agreements. Do not infer particular carriers, guaranteed payment, coverage, or approval from these facts.
- Keep the workflow bilingual and avoid adding redundant maps, phone blocks, or referral forms without separate approval.


- Added a four-audience **Who We Work With** overview (adjusters, restoration contractors, carriers, and policyholders) to both For Professionals pages; retained the detailed partnership panels, six-step workflow, professional FAQs, and original comparison sliders. Responsive audience cards use shared CSS.


- Refreshed both professional landing pages with a calm sage hero and direct phone/contact actions, four separately identified audiences with accessible decorative icons, and a clearer order: overview → six-step workflow → confirmed specialist capabilities → original before-and-after sliders → eight FAQs. Shared responsive styling supports narrow Android displays; independent live browser QA remains necessary.


### Audience-first homepage redesign — October 2, 2026

- Rebuilt **both English and Spanish homepages** around equally prominent, same-size **Homeowners & Families** and **Insurance & Restoration Professionals** cards. Homeowners go to the existing Contact page; professionals go to the dedicated bilingual For Professionals page. Neither audience requires a new form.
- Restored the shorter **Restoring What Matters** hero, with 24/7 inquiry availability and free pickup, and kept the original ACR facility background image. The two audience actions share identical sizing and styling; the palette uses charcoal, gold, cream, taupe and off-white with no newly introduced green or navy.
- Consolidated several repetitive homepage blocks into concise Fire & Smoke and Water & Flood service links; retained the What We Restore collection, a four-step overview linking to the detailed process, four original ACR before-and-after slider pairs, four verified service/capability highlights, existing Google review section, About section, six FAQ answers, and one closing Contact call to action.
- Replaced the Spanish homepage's older illustrative comparison gallery with the same four original ACR photo pairs and accessible range-controlled sliders, with translated headings and labels. The original photo gallery remains the primary source for all ten pairs on the Results pages.
- Preserved legacy navigation anchors where practical: `#services`, `#loss-types`, `#what-we-restore`, `#process`, `#google-reviews`, `#about-acr`, `#faq-guide-link` and `#business-details`. Confirm live browser behavior, deployment success and accessibility QA independently before marking the release verified.

## Project Status and Next Steps — October 2, 2026

**Completed in the repository:** bilingual English/Spanish pages and shared navigation; top-level For Professionals menu (including Android/mobile navigation); 20 consumer FAQs per language; six-step professional claims workflow; eight professional FAQs per language; insurer/contractor capability panels; 10 original ACR before-and-after comparisons on each Results page, including three reused on the professional pages; six case studies; Chester County content; professional SEO titles, metadata, and contextual links; contact/CTA cleanup; README maintenance notes.

**Pending / skipped by project decision (do not silently implement):**
- **Google Analytics 4 and conversion tracking — PENDING.** No Measurement ID or consent-integrated analytics implementation has been approved. Do not infer actual visitor/call data.
- **Professional referral form — SKIPPED.** Use existing telephone and Contact page instead.
- **Insurance and restoration-contractor outreach and partnership PDF — SKIPPED.** No applications, vendor enrollment, or outreach were authorized.
- **Search Console and Google Business Profile setup/review — SKIPPED for now.** Ownership, account access, sitemap submission, index status, and search performance have not been confirmed.
- **Additional performance optimization — SKIPPED for now.**
- **Security, privacy, and legal audit — SKIPPED for now.**
- **Final editorial/content review — SKIPPED for now.**
- **Customer review/aggregate-rating verification (earlier audit item 1) — DEFERRED pending Kendall's confirmation.**

**Current phase: Launch readiness and handover to Kendall.** Obtain business-owner approval before changing the production domain, managing ownership or publishing unverified content.

### Launch and handover checklist

1. **Domain:** Confirm with Kendall who owns and controls `americangarmentrestoration.com`, the existing DNS settings, and which domain should serve the replacement site. Do not repoint DNS or disrupt the current business site without approval and a rollback plan.
2. **Access and ownership:** Confirm Kendall's appropriate administrative access to domain registration, DNS, deployment/hosting, and any connected business accounts. Do not store passwords, tokens, or private account information in GitHub.
3. **Approval:** Have Kendall confirm contact details, 24/7 availability, free pickup, professional/insurance claims, service areas, insurance-billing qualifiers, photographs, and appropriate image/review permissions.
4. **Contact paths:** Test every telephone, address/directions, language-switch, and Contact link at the actual published domain.
5. **QA and deployment:** Run `node scripts/check-site.cjs`, browser and accessibility checks, and examine GitHub Actions *job conclusions* and GitHub Pages deployment success for the **release commit**. Include real Android testing where possible.
6. **Backup and rollback:** Retain known-good release commit, repository history, deployed image assets, DNS records, and a documented GitHub Pages redeployment/rollback path. Test recovery steps before switching the domain.
7. **Operations:** Provide simple instructions for editing bilingual content, FAQs, case studies, and original before/after image pairs; require approvals for claims and media changes. Record who maintains the site and how to report urgent problems.
8. **Handover:** Present final English/Spanish page links and release checklist to Kendall; keep deferred analytics and audit work outside the launch scope unless approved.

### Latest recorded automated QA (not a release sign-off)

- `qa/latest-browser-qa.json` records **success** for tested commit `7f054a217073b2af6d16a2e9b1d827c7c4380ad3`. The log reports **four passing professional-page configurations** (English and Spanish, desktop at 1440px and emulated Android at 393px), with eight FAQs, three sliders, six workflow steps per language, no horizontal overflow, no local HTTP failures, no page-script errors, and no axe WCAG findings.
- `qa/latest-performance.json` for the same tested commit records mobile **77** and desktop **91** performance, with accessibility, best practices, and SEO scoring **100** in both simulated runs.
- These reports are for an **earlier commit** than subsequent SEO, README, and launch documentation updates; do not say the current live release or a physical Android device passed until the new release is tested and the job/deployment conclusions are checked.

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
- Automated browser QA has a saved successful report for an earlier tested commit; recheck the current release's test/job conclusions and conduct a physical Android review before claiming full launch verification.
- Confirm services, service area, contact/pickup logistics, and structured-data claims with the business owner. Do not manufacture eligibility restrictions or guarantees.


- Linked text is visibly underlined throughout English and Spanish content with original ACR gold accents, while navigation and buttons retain their own styles. Four **For Professionals** audience cards now link directly to adjuster/carrier details, contractor details, or the relevant Contact page; their service panels have stable anchors. The homepage retains equal entry points for homeowners and professionals rather than moving all four professional cards above them.


### Professional-first homepage direction — October 2, 2026

- Business priority clarified: **insurance adjusters, insurance carriers and restoration contractors are ACR's primary customers**. The homepage now leads with insurance clothing/textile restoration for property-loss claims. This supersedes the earlier equal-audience homepage positioning, while retaining a clearly available path for homeowners and policyholders.
- Replaced equal-size audience selection cards with four role-specific links on both English and Spanish homepages: adjusters, carriers, contractors and policyholders. Professional links lead to specific confirmed capability sections on the existing For Professionals page, while policyholders can reach the Contact page without a form. The professional call to action is primary.
- Revised homepage and professional-page titles, descriptions and social metadata to accurately reference insurance-related textile restoration, Xactimate-based estimates, inventories and Ephrata, PA, without keyword stuffing, invented geographic branches or unsupported insurer endorsements. These revisions **do not establish Google indexing or ranking**; Search Console verification and real search results remain pending.
- Kept original charcoal, gold, cream, taupe and off-white design. Preserved original ACR before/after sliders, 24/7 inquiry availability, free pickup, service pages, FAQs and existing bilingual site architecture. Check current GitHub Pages and mobile/accessibility workflow results for latest release.


### Sitewide spacing and redundant-brand cleanup — October 2, 2026

- Removed redundant **American Clothing Restoration** eyebrow text from the English and Spanish **For Professionals** hero sections. The English and Spanish homepage hero sections retain a single clear heading below the persistent site logo rather than repeating the company name.
- Standardized vertical spacing sitewide through `dist/styles.css`: tightened spacing around consecutive paragraphs, eyebrows, titles, top-level sections, page introductions, professional claims content, result comparisons, card groups, and responsive layouts. Kept text sizes, colors and actual image content intact.
- On Android/mobile, replaced the oversized fixed full-width **Call ACR** strip with a small gold floating pill, reducing how much content it covers. Retained the same telephone action.
- Added a GitHub browser-QA regression pass to visit **every HTML page** (English, Spanish and legacy aliases), checking shared stylesheet use, narrow-screen overflow, excessive section padding, and duplicate brand text in hero labels. Check the current Actions result before stating this automated pass is successful.
- Corrected low-contrast muted paragraphs on cream Fire/Water service cards and the gold-highlighted ACR claims step using an existing dark brown/charcoal text color; test with axe before claiming accessibility pass.


### Full-site text-spacing correction — October 2, 2026

- The previous spacing audit was insufficient: it measured outer section padding but **did not measure the actual vertical distance between text blocks**. The Fire & Smoke page revealed that stacked two-column `section.split` layouts retained their grid gutter plus margins and two separate sets of section padding on Android.
- Fixed this at the shared CSS level for English/Spanish service pages and other text-only split layouts. Text-only section groups now have tighter vertical padding, and the mobile heading-to-paragraph gutter is **9px** rather than the old inherited large grid gap. Photo and media sections retain independent spacing to avoid cropping or crowding before-and-after proof.
- Added real browser geometry assertions across all HTML routes for heading-only text split sections: heading-to-paragraph gaps at or below **23px**, and transitions between consecutive such sections at or below **45px** at Android width. Split sections with an existing paragraph beneath their heading (as in case-study notes) are handled separately, rather than incorrectly measuring across real content. English and Spanish Fire & Smoke and Water & Flood pages receive full-height mobile screenshots in the browser QA artifacts. The tests also continue checking horizontal overflow, visible branding, and shared stylesheet coverage. These are thresholds to be **measured** on actual browser runs, not assertions of a pass before Actions reports success.
- Retain the original ACR charcoal, gold, cream, taupe and off-white appearance, all copy and original photo assets, and the compact floating mobile telephone action.


**Verified browser-QA result (October 2, 2026):** GitHub Actions run [37060619211](https://github.com/sysopx786/ACR-Website/actions/runs/37060619211) passed for source commit `7632c6d55f39a30a23d3733e2fd5cb6666422dc1`. The mobile audit visited all **49 HTML routes** and reported **0px horizontal overflow**, maximum checked top-level section padding **54px**, and maximum measured gap for qualifying adjacent text blocks **20px**. The English and Spanish Fire/Smoke and Water/Flood pages each measured **9px heading-to-paragraph** and **20px between consecutive text sections**. English and Spanish service-page screenshots were captured in the QA artifact. The automated test also verified core desktop/mobile navigation, the professional workflow, before-and-after sliders, local links and accessibility; a physical-device review remains separate.


### Dedicated Our Process page spacing fix — October 2, 2026

- Corrected the English `/our-process/`, Spanish `/es/our-process/`, and legacy `/our-process.html` templates. The former two-column split placed an oversized illustration before six steps; each mobile step then rendered **number, heading and description on three separate rows** with 24px top/bottom padding. This repeated empty area had escaped the earlier generic text-section check.
- Scoped the process layout to `.process-page-layout`. On desktop, six compact steps sit alongside the textile photograph. On mobile, the number sits **beside** the step title and description, step padding is 11px, and the illustration follows the process at a maximum of 200px tall. The professional-workflow link remains with the content.
- Versioned the shared stylesheet URL on the three process routes to reduce stale cached CSS on Android.
- Added mobile browser geometry tests and screenshots for **all three process URLs**: six items present, no large internal title/description or inter-step gaps, and photo below the process. Verify the latest successful GitHub Actions QA result before treating the change as tested.


**Our Process spacing QA — verified:** [Browser and accessibility QA run 37062168079](https://github.com/sysopx786/ACR-Website/actions/runs/37062168079) **passed**. For English, Spanish and the legacy process route at Android 393px width, all six steps measured **11px vertical padding**, **3px title-to-description gaps** and **0px extra gaps between consecutive steps**; the illustration followed the content at **170px height**. The full audit covered 49 routes with no horizontal overflow, broken tested assets, or blocking accessibility issues.

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
