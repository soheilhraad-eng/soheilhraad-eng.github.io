# Marco — the chat Worker

The chat box on the home page talks to this small program, which runs on Cloudflare
Workers (free). It adds Marco's persona, enforces the 3-message limit and length caps,
accepts requests only from this site, and asks Cloudflare's own AI (Google's Gemma 4) for
the reply. There's no API key anywhere: the model is reached through a Cloudflare
"binding" instead.

**Cost:** on Cloudflare's Workers **Free** plan, requests beyond the daily free
allowance are refused, not billed. The worst case is Marco being unavailable until the
next day. Don't upgrade the account to a paid plan without deciding on limits first.

## Deploy it (once, about 10 minutes, all in the browser)

Cloudflare's dashboard changes its wording now and then; if a button is named slightly
differently, look for the nearest match.

1. Create a free account at **dash.cloudflare.com**.
2. Go to **Workers & Pages** → **Create** → create a **Worker** from the "Hello World"
   starter. Name it `marco` and deploy it.
3. Open the new Worker → **Edit code**. Delete everything in the editor, paste in the
   contents of `worker.js` from this folder, and **Deploy**.
4. In the Worker's **Settings** → **Bindings** → **Add** → **Workers AI**. Set the
   variable name to exactly `AI`, and save.
5. Copy the Worker's address. It looks like `https://marco.<your-name>.workers.dev`.
6. Put that address in `_config.yml` as `chat_endpoint: "https://marco.<your-name>.workers.dev"`,
   commit and push. The chat box appears on the home page in all three languages.

## Optional: a per-visitor rate limit

`wrangler.toml` also sets up a limit of 6 messages a minute per visitor address, on top
of the 3-message rule. Dashboard deploys skip it. To include it, deploy with the command
line instead, from this folder (needs Node.js):

```
npx wrangler login
npx wrangler deploy
```

## Changing Marco

His persona, voice and what he knows about your work are in `systemPrompt()` at the top of
`worker.js`. After editing, deploy again (step 3). The limits are the constants above it.
If you change `MAX_VISITOR_MESSAGES`, change `MAX` in `assets/js/chat.js` and the "3" in the
chat strings in `_data/i18n.yml` to match.
