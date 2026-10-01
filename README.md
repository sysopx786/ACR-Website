# American Clothing Restoration Website

This repository contains the complete deployable website for American Clothing Restoration, a clothing and textile restoration company in Ephrata, Pennsylvania.

## Links

- Public GitHub Pages link: https://sysopx786.github.io/ACR-Website/
- Private ChatGPT Sites preview: https://american-clothing-restoration.valli349022.chatgpt.site
- GitHub repository: https://github.com/sysopx786/ACR-Website

## Business Information

American Clothing Restoration  
17A East Queen Street  
Ephrata, PA 17522  
717-738-2679

Phone links use:

```text
tel:7177382679
```

Map links point to Google Maps for the business address.

## Website Positioning

The site presents American Clothing Restoration as a specialist in clothing and textile restoration connected to property loss.

The main positioning:

```text
You Restore the Property. We Focus on What's Inside.
```

The primary brand line:

```text
Restoring What Matters.
```

## Pages Included

- Home: `/`
- What We Restore: `/what-we-restore/`
- Our Process: `/our-process/`
- For Professionals: `/for-professionals/`
- Results: `/results/`
- About: `/about/`
- Contact: `/contact/`
- Privacy Policy: `/privacy-policy/`
- Terms of Service: `/terms-of-service/`
- Cookie Policy: `/cookie-policy/`

Spanish pages are included under `/es/`:

- `/es/`
- `/es/what-we-restore/`
- `/es/our-process/`
- `/es/for-professionals/`
- `/es/results/`
- `/es/about/`
- `/es/contact/`
- `/es/privacy-policy/`
- `/es/terms-of-service/`
- `/es/cookie-policy/`

## Key Website Features

- Premium editorial layout
- Responsive mobile design
- Sticky mobile Call ACR button
- English and Spanish language switch
- Google Maps address links
- Google Reviews section with all supplied reviews listed
- Before and after comparison gallery
- SEO metadata
- Open Graph metadata
- Canonical URLs
- Hreflang links for English and Spanish pages
- Sitemap
- Robots.txt
- Local business schema
- Cookie popup removed; static cookie policy page retained
- No contact forms
- No invented email address
- No invented hours
- No invented company statistics

## Image Strategy

The website uses a restrained image set focused on clothing, textiles, garment care, and restoration-related examples.

Current image areas include:

- Textile restoration facility hero image
- White shirt before and after comparison
- Textile-specific What We Restore images
- Six-pair transformation gallery
- Professional garment-care About image

The transformation gallery includes representative imagery for:

- White dress shirt
- Navy suit jacket
- Bedding and linens
- Wedding gown
- Stuffed animal
- Business and restaurant uniforms

Representative imagery can be replaced with real American Clothing Restoration project photography when available.

## Deployment

The deployable website lives in:

```text
dist/
```

GitHub Pages is configured through GitHub Actions in:

```text
.github/workflows/pages.yml
```

The workflow publishes the `dist/` directory to GitHub Pages.

The GitHub Pages build is served from:

```text
/ACR-Website/
```

Internal asset and page links in `dist/` are written for that GitHub Pages base path.

The public deployment was checked after cleanup and returned:

```text
HTTP 200 OK
```

for:

```text
https://sysopx786.github.io/ACR-Website/
```

## ChatGPT Sites

The ChatGPT Sites project is configured in:

```text
.openai/hosting.json
```

Current project ID:

```text
appgprj_6abc37da3a7081919416b90b9873fed5
```

Private preview:

```text
https://american-clothing-restoration.valli349022.chatgpt.site
```

## Notes

- Keep the website focused on clothing and textile restoration.
- Do not add structural restoration services.
- Do not add forms.
- Do not add unverified service areas, insurance partners, certifications, hours, employees, awards, or statistics.
- Do not describe representative images as real customer projects.
- Keep representative image disclosures visible where before-and-after examples appear.
- Keep all addresses linked to Google Maps.
- Keep phone links pointed to `tel:7177382679`.
- Do not add a contact form, quote form, booking form, newsletter signup, popup, or chatbot.
- Do not add an email address unless the business supplies one.
- Do not add social icons unless real profiles are supplied.

## Repository Cleanup Notes

The repository should contain only deployable website files and deployment metadata.

Keep:

- `dist/`
- `.github/workflows/pages.yml`
- `.openai/hosting.json`
- `README.md`

Old uploaded screenshots, generated-image scratch files, prompt drafts, and ZIP archives were removed because they are not needed for the live website and should not be part of the public repository.
