# CLAUDE.md

Operating rules for this repo. Setup and editing instructions live in `README.md`.

## This repo is public, and everything in it is published

Every file pushed here is readable by anyone on GitHub, and every page is on the open web at
https://soheilhrad.github.io. Treat every commit as publishing.

- **This file is public too.** Describe categories to leave out; never give real examples
  of what was left out.
- **Filter source material before anything reaches a page or a commit.** When writing from
  a document Sohi shares (plans, notes, drafts, private repos), publish only what describes
  the work itself. Leave out anything personal: plans, correspondence, money, dates,
  contact details, anything marked internal, and anything written as a note to self.
- **Never commit the source documents themselves**, and never quote them wholesale.
- **When unsure whether something is sensitive, leave it out and ask.** Adding it later costs
  nothing; removing it later doesn't remove it from git history or from caches.
- **To-dos and working notes go in `NOTES.md`**, which is gitignored, never in `README.md` or
  any other committed file.
- **Private repos stay private.** Don't link to them, and don't copy their code or internal docs here.

## Writing about Sohi

Don't invent facts about Sohi. Wording about them that hasn't come from them is a placeholder,
and must be flagged as one when handing back.

## Three languages

English at `/`, Spanish at `/es/`, Persian at `/fa/`. Every page exists in all three, linked
by a shared `ref:`; every key in `_data/i18n.yml` and every entry in `_data/projects.yml`
needs `en`, `es` and `fa`. Spanish is Spain's Spanish. Persian is right to left and uses
Vazirmatn, self-hosted in `assets/fonts/` (no Google Fonts or other third-party requests); write it without letter-spacing or italics.

## Type a feeling

The one input on the home page. Its text is in `_data/i18n.yml` under `feeling:` (all three
languages), its offline word list and sound engine are in `assets/js/type-a-feeling.js`, and
the markup is `_includes/type-a-feeling.html`. Words it doesn't know go to the Worker in
`worker/` only when the visitor presses the button; the page's note under the input names that
service, so keep the note and the Worker in step. The Worker takes at most 40 characters and
answers only `{emotion, lang}` from a fixed list; it never logs the text.

## Identity

The site is **dos**, in full **Design of سهی**. Titles are `{page title} — dos`. Wrap the
Persian in `<span lang="fa" dir="rtl">` inside English and Spanish text. The header holds only
the wordmark and the language switcher; Notes, About, GitHub and RSS are in the footer. No
`twitter:site` or `twitter:creator` until a real handle exists. Product names (Camino, Small
Town, The Digital Tarot Sanctuary) are never translated. No page loads anything from another
site before the visitor acts.

**The mark** is the Split wordmark: the `o` cut in two, one half in the text colour and one in
the accent. It and the signature ("Design of" with the name drawn in Nastaliq) are inline SVG
outlines in `_includes/wordmark.html` and `_includes/signature.html`, coloured by the site's own
tokens. The files (light, dark, one colour), the icon and the share image are in
`assets/img/brand/`, `assets/img/favicon.svg`, `apple-touch-icon.png` and `og.png`. Never set the
mark as live text; never mirror it, not even on Persian pages; never recolour it outside ink,
paper and ochre. The Nastaliq name appears only in the signature, at 150 px wide or more. The
artwork is drawn from outlines of Jost and Noto Nastaliq Urdu (SIL Open Font License).

## Check before pushing

```
bundle exec jekyll build
```
It must finish with no warnings. `_config.yml` excludes `CLAUDE.md` from the built site.
