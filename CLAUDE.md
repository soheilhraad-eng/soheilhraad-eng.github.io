# CLAUDE.md

Operating rules for this repo. Setup and editing instructions live in `README.md`.

## This repo is public, and everything in it is published

Every file pushed here is readable by anyone on GitHub, and every page is on the open web at
https://soheilhraad-eng.github.io. Treat every commit as publishing.

- **This file is public too.** Describe categories to leave out; never give real examples
  of what was left out.
- **Filter source material before anything reaches a page or a commit.** When writing from
  a document Sohi shares (plans, notes, drafts, private repos), publish only what describes
  the work itself. Leave out anything personal: plans, correspondence, money, dates,
  contact details, anything marked internal, and anything written as a note to self.
- **Never commit the source documents themselves**, and never quote them wholesale.
- **When unsure whether something is sensitive, leave it out and ask.** Adding it later costs
  nothing; removing it later doesn't remove it from git history or from caches.
- **Private repos stay private.** Don't link to them, and don't copy their code or internal docs here.

## Writing about Sohi

Don't invent facts about Sohi. Wording about them that hasn't come from them is a placeholder,
and must be flagged as one when handing back.

## Three languages

English at `/`, Spanish at `/es/`, Persian at `/fa/`. Every page exists in all three, linked
by a shared `ref:`; every key in `_data/i18n.yml` and every card in `_data/projects.yml`
needs `en`, `es` and `fa`. Spanish is Spain's Spanish. Persian is right to left and uses
Vazirmatn, self-hosted in `assets/fonts/` (no Google Fonts or other third-party requests); write it without letter-spacing or italics.

## Marco, the chat

The Worker in `worker/` is the only place limits are enforced; `assets/js/chat.js` just
mirrors them. Keep the two in step (3 messages, 600 characters). Marco's replies are
inserted as text, never HTML. His system prompt may state only facts already public on
this site. The chat box must keep saying, before anyone types, that Marco is an AI, which
model, and that messages go to Cloudflare.

## Check before pushing

```
bundle exec jekyll build
```
It must finish with no warnings. `_config.yml` excludes `CLAUDE.md` from the built site.
