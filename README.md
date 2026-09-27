# Personal Site — Setup & Reference

A Jekyll site, hosted free on GitHub Pages at **https://soheilhrad.github.io**.
Every push to `main` republishes it within a minute or two, so editing files on
github.com works too. Installing things locally is only for previewing before you publish.

## What's where

| File | What it is |
|---|---|
| `index.md` | Home page |
| `about.md` | About page |
| `projects.md` | Project list, which links to each project page |
| `tarot-app.md` | The Tarot project page, and a template for new ones |
| `blog.md` | Blog index, which lists `_posts/` automatically |
| `_posts/` | Blog posts |
| `_config.yml` | Site title, description, menu, time zone |
| `assets/css/style.scss` | All the styling; colours are the variables at the top |
| `es/`, `fa/` | The Spanish and Persian versions of every page |
| `_data/projects.yml` | The project cards, in all three languages |
| `_data/i18n.yml` | Menu, buttons and other interface text, in all three languages |
| `worker/` | Marco, the home page's AI chat: the Cloudflare Worker and how to deploy it |
| `assets/js/chat.js` | The chat box in the browser |
| `_layouts/`, `_includes/` | Page templates; rarely need touching |

## Languages

The site is in English (at `/`), Spanish (`/es/`) and Persian (`/fa/`, right to left).
Each page exists three times, once per language, and the three copies share a `ref:`
line at the top. That's how the language switcher knows which pages are translations
of each other. When you add or change a page, do all three, keeping the same `ref`.
If a translation is missing, the switcher sends people to that language's home page.

Blog posts can be in any language: add `lang: es` or `lang: fa` at the top of a post
(English is the default). Every post shows in every language's list, and a post in
another language is marked with its language, e.g. "in English".

## Editing without installing anything

On github.com, open a file, click the pencil icon, edit it, and click **Commit changes**.
The live site updates in a minute or two. The **Actions** tab shows the build; a red
cross there means the build failed and the old version stays up.

## Previewing locally (Windows)

You need Git, Ruby and Bundler. Jekyll itself comes from the Gemfile, so don't install
it separately.

1. **Git**: install **Git for Windows** from git-scm.com with the default options. Then,
   once, in a terminal:
   ```
   git config --global user.name "Your Name"
   git config --global user.email "you@example.com"
   ```
2. **Ruby**: from **rubyinstaller.org**, download a **Ruby+Devkit** version (not plain Ruby).
   Pick **3.3**, which is what this site was tested with. Run the installer with the
   default options.
3. On the installer's last screen, a command window asks which components to install.
   Choose **MSYS2 and MINGW development toolchain** (usually option 3), press Enter,
   and let it finish.
4. Close that window and open a **brand-new** Command Prompt or PowerShell window. It
   needs the PATH the installer just updated.
5. Get the site onto your PC. Do this once, in whichever folder you keep projects in:
   ```
   git clone https://github.com/soheilhrad/soheilhrad.github.io.git
   cd soheilhrad.github.io
   ```
6. Install:
   ```
   gem install bundler
   bundle install
   ```
   This installs the same gem versions GitHub Pages builds with (the `github-pages` gem
   in the Gemfile).
7. Check that it worked: `bundle exec jekyll -v` should print a version number.

## Previewing

From inside the site folder:
```
bundle exec jekyll serve --livereload
```
Open `http://localhost:4000`. Leave the window running; it rebuilds when you save.
If a change doesn't show up on Windows, stop it with Ctrl+C and use
`bundle exec jekyll serve --force_polling` instead.

A yellow *"GitHub Metadata: No GitHub API authentication could be found"* warning is
harmless locally.

## Publishing

```
git add .
git commit -m "describe what changed"
git push
```
If you've also edited on github.com, run `git pull` before you start, so the two
don't collide.

## Add a blog post

Copy `_posts/2026-09-27-hello-world.md`, rename it `YYYY-MM-DD-title.md`, and edit the
title and text. A post whose date is later than now doesn't appear, which is the usual
reason a new post goes missing. Set `timezone:` in `_config.yml` so "now" is your time.

## Add a project

1. Copy `tarot-app.md`, `es/tarot-app.md` and `fa/tarot-app.md`, rename them (e.g.
   `my-thing.md`), and change their `title`, `description`, text, and `permalink` (e.g.
   `/projects/my-thing/`, `/es/projects/my-thing/`, `/fa/projects/my-thing/`). Give all three
   the same new `ref:`.
2. Add a card for it to `_data/projects.yml`, with `slug: my-thing` and a title and one-line
   summary in each language. It appears on the home and Projects pages in all three languages.

## Private notes

Keep your own to-do list in `NOTES.md` in this folder. Git ignores that file, so it
stays on your computer and never reaches GitHub. Remember this repo is public:
anything you commit, anyone can read.
