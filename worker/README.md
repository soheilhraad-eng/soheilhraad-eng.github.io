# The classifier Worker

"Type a feeling" on the home page knows about 200 feeling words and matches those on the
visitor's own device. For any other word it asks this small program, which runs on Cloudflare
Workers (free) and asks Cloudflare's own AI (Google's Gemma) which of nine feelings the word
is closest to. There's no API key anywhere: the model is reached through a Cloudflare
"binding" instead.

**The contract.** The page sends `{"text": "..."}` (at most 40 characters; anything longer is
refused). The Worker answers `{"emotion": "<id>" | null, "lang": "en" | "es" | "fa"}` and
nothing else. `<id>` is one of `joy, sadness, calm, fear, anger, tenderness, longing, wonder,
hope`; whatever the model says is checked against that list, and anything else becomes `null`.
Only the site's own pages may call it, each address gets a small allowance per minute, and the
text is never logged or stored.

**Cost:** on Cloudflare's Workers **Free** plan, requests beyond the daily free allowance are
refused, not billed. The worst case is unknown words not being understood until the next day.
Don't upgrade the account to a paid plan without deciding on limits first.

## Deploy it (once, about 10 minutes, all in the browser)

Cloudflare's dashboard changes its wording now and then; if a button is named slightly
differently, look for the nearest match. If the Worker named `marco` from earlier already
exists, skip to step 3: keeping the name keeps the address, so `_config.yml` doesn't change.

1. Create a free account at **dash.cloudflare.com**.
2. Go to **Workers & Pages** → **Create** → create a **Worker** from the "Hello World"
   starter. Name it and deploy it.
3. Open the Worker → **Edit code**. Delete everything in the editor, paste in the contents of
   `worker.js` from this folder, and **Deploy**.
4. In the Worker's **Settings** → **Bindings** → **Add** → **Workers AI**. Set the variable name
   to exactly `AI`, and save.
5. Copy the Worker's address. It looks like `https://<name>.<your-name>.workers.dev`.
6. Put that address in `_config.yml` as `classify_endpoint: "https://<name>.<your-name>.workers.dev/"`,
   commit and push.

## Optional: a shared rate limit

`wrangler.toml` sets up a limit of 10 requests a minute per address, shared across every copy
of the Worker. Dashboard deploys skip it and use a per-copy counter with the same numbers
instead. To include the shared one, deploy with the command line, from this folder (needs
Node.js):

```
npx wrangler login
npx wrangler deploy
```

## When the site gets its own domain

Add the new address to `ALLOWED_ORIGINS` at the top of `worker.js`, then deploy again (step 3).
Until then the Worker refuses the new address.
