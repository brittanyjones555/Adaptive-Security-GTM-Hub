# Adaptive GTM Command Center

AI-powered go-to-market hub with 7 agents + strategy playbook, built for Adaptive Security.

> **Prototype notice.** This was built from public information about Adaptive Security and standard industry data. Before sending any output to customers, review the assumptions in the ROI Calculator, the customer-story metrics referenced in agent prompts, and the competitor pricing claims in the battle card. None of those are official Adaptive numbers.

## Quick Deploy (GitHub → Vercel)

### Step 1: Get Your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Click **API Keys** → **Create Key**
3. Copy the key — you'll need it in Step 5

---

### Step 2: Create a GitHub Repo

1. Go to [github.com/new](https://github.com/new)
2. Name it `adaptive-gtm-hub` (or whatever you want)
3. Set to **Private** (this has your GTM strategy in it)
4. **Don't** initialize with README (we already have one)
5. Click **Create repository**

---

### Step 3: Push This Code to GitHub

Open your terminal and run:

```bash
cd adaptive-gtm-hub
git init
git add .
git commit -m "Initial commit - Adaptive GTM Hub"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/adaptive-gtm-hub.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

### Step 4: Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your `adaptive-gtm-hub` repo
4. Framework Preset will auto-detect **Next.js** — leave it
5. Click **Deploy**

---

### Step 5: Add Your API Key on Vercel

The agents won't work until you add your Anthropic key:

1. In your Vercel project dashboard, go to **Settings** → **Environment Variables**
2. Add:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** your API key from Step 1
   - **Environment:** Production (check all three if you want it in Preview/Development too)
3. Click **Save**
4. Go to **Deployments** → click the **...** menu on your latest deploy → **Redeploy**

---

### Step 6: You're Live

Your hub is now at `https://adaptive-gtm-hub.vercel.app` (or whatever Vercel assigned).

Share the URL. The agents are functional — they call Claude server-side through the `/api/generate` route, so your API key never touches the browser.

---

## Project Structure

```
adaptive-gtm-hub/
├── app/
│   ├── layout.js          # Root layout + fonts
│   ├── page.js             # Full hub (home, 7 agents, playbook, finance vertical)
│   └── api/
│       └── generate/
│           └── route.js    # Server-side Anthropic API proxy
├── package.json
├── next.config.js
├── .env.example
├── .gitignore
└── README.md
```

## The 7 Agents

| # | Agent | What It Does |
|---|-------|-------------|
| 01 | Outbound Sequence Generator | 5-touch personalized sequences anchored to AI-threat compelling events (Arup, MGM, Retool) |
| 02 | Account Research Agent | 5-dimension ICP scoring — AI threat exposure, SAT incumbent switch cost, regulatory pressure, scale, strategic logo value |
| 03 | Competitive Battle Card | Head-to-head vs KnowBe4, Proofpoint, Hoxhunt, Cofense — with trap questions on deepfake/vishing coverage |
| 04 | ROI Calculator | Per-seat + breach avoidance (IBM data) + SAT spend offset + insurance + admin time savings model |
| 05 | Deal Analysis (MEDDPIC) | CISO+CFO economic-buyer alignment, compelling-event mapping, product-led sequencing |
| 06 | Persona Pitch Builder | Tailored narratives for CISO, Security Awareness Manager, CIO/IT, CFO, Board |
| 07 | Impact Statement Generator | Executive-ready 4-5 page document with click-rate baselines, multichannel coverage, ROI |

## Local Development

```bash
npm install
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
```

Opens at [localhost:3000](http://localhost:3000).

---

## What to Verify Before Customer Use

The agent prompts reference specific numbers and stories. Most are from public/industry sources, but a few should be sanity-checked against what your team actually says in market:

- **Pricing.** Adaptive doesn't publish list pricing. The ROI Calculator assumes per-seat economics in the SAT range; tune the model to your actual deal sizes.
- **Customer metrics.** Any specific click-rate or reduction percentages attributed to named customers should be verified against your case studies before quoting them.
- **Competitor claims.** KnowBe4/Proofpoint/Hoxhunt feature comparisons are based on public positioning. Update the battle card if any have shipped new capabilities.
- **Breach/incident data.** IBM Cost of a Data Breach 2024 figures and the Arup/MGM/Retool incidents are well-documented, but always confirm before citing in customer-facing material.
