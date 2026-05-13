"use client";

import { useState, useEffect, useRef } from "react";

/* ───────── DESIGN TOKENS ───────── */
const T = {
  bg: "#0a0a0a", bg2: "#111111", bg3: "#161616",
  line: "#1f1f1f", line2: "#2a2a2a",
  text: "#f4f4f0", dim: "#8a8a85", mute: "#555550",
  accent: "#00d4ff", accentDim: "#0891b2",
  warn: "#ff6b6b", red: "#ff4545",
  serif: "'Instrument Serif', 'Times New Roman', serif",
  sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', monospace",
};

/* ───────── AGENT DEFINITIONS ───────── */
const AGENTS = [
  {
    id: "sequence",
    num: "01",
    name: "Outbound Sequence Generator",
    short: "Sequence Gen",
    desc: "Multi-touch outbound sequences with personal hooks, displacement angles against legacy SAT vendors, named proof points with real customers, and soft-but-confident CTAs.",
    icon: "⚡",
    fields: [
      { key: "company", label: "Target Company", placeholder: "e.g. Block, Snowflake, JPMorgan Chase" },
      { key: "prospect", label: "Prospect Name & Title", placeholder: "e.g. Sarah Chen, CISO" },
      { key: "persona", label: "Buyer Persona (if different from above)", placeholder: "e.g. CISO, VP Security, Security Awareness Manager" },
      { key: "pain", label: "Pain / Context (optional)", placeholder: "e.g. Using KnowBe4 today, recent vishing incident, new SEC disclosure rules, board pressure on AI threats" },
    ],
    buildPrompt: (f) => `You are a world-class enterprise AE at Adaptive Security, the leading next-generation security awareness training and AI phishing simulation platform. You write outbound emails the way a top 1% rep does — personal, researched, strategic, and never generic.

**ADAPTIVE SECURITY CONTEXT:**
Products: Security Awareness Training (interactive modules, AI Content Creator, role-personalized with executive deepfakes), Phishing Simulations (multichannel: email, SMS/smishing, voice/vishing, video/deepfakes, OSINT-powered spearphishing), Phish Triage (employee Phish Alert Button, AI classification, automated email remediation, org-wide message cleanup), Risk Monitoring (dynamic employee risk scoring, executive exposure monitoring via OSINT, automated remediation campaigns).
Key differentiators: Only platform built ground-up for AI-era threats (deepfake video/voice, AI-generated spear phishing, smishing). Realism-first vs legacy compliance-checkbox training. Behavior-change measurement vs course-completion tracking. AI Content Creator builds custom training in seconds. Multichannel simulation including hyperrealistic AI executive deepfake calls. 1,000+ ready-to-launch resources, 35+ languages, 30+ integrations. SOC 2, HIPAA, GDPR aligned.
Named customers: Figma, Major League Baseball, PayPal, Plaid, Ramp, Lennar, Xerox, Logitech, Hanes, Bose, US Senate, NHL, Perplexity, NerdWallet, Podium.
Investors: OpenAI (their first and only cybersecurity investment), a16z, NVIDIA, Bain Capital Ventures. $145M+ raised. Founded 2024 by Brian Long (CEO) and Andrew Jones.
Social proof: 4.9/5 G2, 5.0/5 Gartner, NPS 94, 700+ customers.

**YOUR TARGET:**
- Company: ${f.company || "a target company"}
- Prospect: ${f.prospect || "the target buyer"}
- Persona: ${f.persona || "a security or IT leader"}
${f.pain ? `- Known pain / context: ${f.pain}` : ""}

**MARKET CONTEXT TO WEAVE IN WHERE RELEVANT:**
- AI phishing volume up 1,265% year-over-year per recent industry reports
- FBI IC3 reporting $2.9B+ in BEC losses, increasingly involving AI-generated voice and deepfakes
- Arup lost $25M in February 2024 via a deepfake video call impersonating the CFO — the watershed moment that put deepfake fraud on every CISO's board agenda
- Cyber insurance underwriters increasingly require SAT programs as a condition of coverage
- SEC cyber incident disclosure rules (effective Dec 2023) raise the cost of any human-error breach

**EMAIL STYLE RULES — THIS IS CRITICAL:**

Each email must follow this structure and feel. Study these patterns:

**PATTERN A — Personal Brand Hook:**
Open with a genuine personal connection to the prospect's company or product. You've read their security blog, attended a talk they gave, noticed a recent product launch, saw their team's GitHub activity. This is NOT flattery — it's a real observation that earns credibility and shows you did the work. Then bridge that personal observation into a strategic question about their security posture that connects to what Adaptive solves.

Example opening: "I've been watching [Company]'s [specific recent move — security blog post, product launch, hiring spree, public incident response, recent funding]. I'm reaching out because as [Company] [specific strategic context], [strategic question that connects to AI-era social engineering risk]."

**PATTERN B — Prospect Research Hook:**
Open with something specific you found about the prospect as a person — their background, a talk they gave at RSA/Black Hat, a LinkedIn post they wrote, their previous role at a notable security org. Then use an extended metaphor or insight that connects their background to the human-layer security problem. This shows you see them as a human, not a lead.

Example opening: "Did some research and saw you [specific personal detail — RSA panel, Defcon talk, prior role at X, recent post on Y]. As someone who [connects detail to a principle], you know that [insight that maps to their human-risk challenge]."

**FOR EACH TOUCH, WRITE:**

**Touch 1 — Email (Pattern A or B)**
- Open with a personal hook (3-4 sentences minimum — don't rush past it)
- Bridge to a strategic observation about their security posture or industry threat trend (1-2 sentences)
- Frame the competitive displacement diplomatically: "[KnowBe4/Proofpoint/whatever they use] is great at [what they do well — compliance scale, content breadth, integration depth], but when it comes to [what Adaptive does better — multichannel simulation including deepfakes, AI-generated training, behavior change measurement], [specific limitation]." Never trash the incumbent — acknowledge what they do well, then reframe.
- Name 2-3 specific Adaptive customers RELEVANT TO THE PROSPECT with SPECIFIC outcomes: "[Customer] reduced phishing click rates by [X%] in [Y months]" or "[Customer] cut SAT admin time by [X hours/week]." Invent plausible but realistic metrics based on Adaptive's known advantages (engagement lift from realism, faster admin via AI Content Creator, reduced click rates via personalized simulation). Make the numbers specific. Flag invented metrics as "directional" in your own head — but in the email they should read as confident.
- CTA: Soft but confident. "Worst case, you walk away with a benchmark of where your org sits on AI threat readiness." or "Worth a quick exchange of notes if you're rethinking your SAT motion." NEVER "Would love to schedule a demo" or "Can I get 15 minutes?"
- Total length: 4-5 paragraphs, 150-250 words. This is a REAL email, not a 3-sentence cold blast.

**Touch 2 — LinkedIn Connection Request + Message**
- Short, warm, reference Touch 1 obliquely ("been thinking about [topic from Touch 1]")
- Add a new angle — maybe a specific threat trend, a peer's recent post, or an OSINT-flavored observation
- No CTA — just open the relationship

**Touch 3 — Email (Social Proof Heavy)**
- Open with a relevant industry incident or trend — a recent deepfake fraud headline, a peer company's public breach, new regulatory pressure
- Pivot to a specific customer story that mirrors the prospect's situation — tell a mini narrative (who they were, what their SAT motion looked like, what changed, what the result was)
- Include specific before/after metrics
- CTA: Frame as learning, not selling. "Happy to share the full case study and the threat-readiness scorecard we used."

**Touch 4 — Email (The Strategic Angle)**
- This one is about THEIR security program, not Adaptive. Share a genuine observation about a shift their peers are making — maybe how leading CISOs are reframing SAT spend as breach-cost-avoidance, or how cyber insurance is reshaping training requirements. Something a peer would say, not a vendor.
- Connect it to a broader market shift (AI lowering the cost of credible social engineering, SEC disclosure rules, insurance pressure)
- Mention Adaptive only in the last line as a "by the way"
- CTA: "Curious if you're seeing the same thing on your end."

**Touch 5 — Email (The Honest Close)**
- Acknowledge the sequence directly: "I've sent a few notes — wanted to send one last one."
- Restate the single most compelling reason to talk in ONE sentence (usually: AI threats are escalating faster than legacy SAT can keep up, and the cost of being caught flat-footed is now a board-level event)
- Make it easy to say no: "If the timing isn't right, no worries at all — happy to reconnect when AI threat readiness moves up your roadmap."
- Leave the door open with warmth, not pressure

**FORMATTING:**
For each touch, output:
## Touch N
**Channel:** Email / LinkedIn / Call
**Subject:** (for emails)
**Body:**
[The full email — 4-5 paragraphs for email touches, 2-3 sentences for LinkedIn]
**CTA:**
[The closing ask, pulled out for visibility]

**OVERALL PRINCIPLES:**
- The prospect's name should appear in the greeting. Use first name only.
- Every email should feel like it was written by a human who spent 20 minutes researching this specific person and company. If it could be sent to anyone, it's wrong.
- Never use the phrase "I'd love to" — it's a verbal tic of bad cold email.
- Never use "quick question" or "pick your brain" — these are transparent.
- The competitive displacement should feel like an insider observation, not an attack. You RESPECT their current vendor — you just see a gap in the AI-era threat landscape.
- Proof points must have specific numbers. "Significant improvement" is banned. "73% reduction in click rate" is correct.
- The CTA should always give them a reason to say yes that isn't about you. "Walk away with a threat-readiness benchmark" > "Learn about Adaptive."`,
  },
  {
    id: "research",
    num: "02",
    name: "Account Research Agent",
    short: "Account Intel",
    desc: "Five-dimension ICP scoring and account intelligence briefing — threat exposure, SAT incumbent, regulatory pressure, buying signals, and recommended entry strategy.",
    icon: "◉",
    fields: [
      { key: "company", label: "Company Name", placeholder: "e.g. Anthropic, Goldman Sachs, Kaiser Permanente" },
      { key: "context", label: "Additional Context (optional)", placeholder: "e.g. Recent public incident, hiring CISO, board mandate on AI, new compliance requirement" },
    ],
    buildPrompt: (f) => `You are a strategic account researcher at Adaptive Security. Adaptive sells next-generation security awareness training and AI-powered phishing simulation: deepfake video, voice phishing (vishing), SMS phishing (smishing), OSINT-powered spear phishing, AI Content Creator, dynamic employee risk scoring, executive exposure monitoring, automated phish triage. ICP: organizations with elevated AI/deepfake threat exposure — financial services, healthcare, technology, government, large enterprises with public executives, regulated industries, and any org with 500+ employees handling sensitive data or payments.

Research and score ${f.company} across 5 dimensions (1-10 each):

1. **AI Threat Exposure** — How attractive is this org to AI-powered attackers? Public executives (deepfake material), wire transfer authority, sensitive data, payment flows, brand-name reputation that lends credibility to impersonation. Are they in a vertical actively being targeted (finance, healthcare, legal, fintech, gov)?

2. **SAT Incumbent & Switching Cost** — What are they likely using today? KnowBe4 (legacy scale leader), Proofpoint (bundled with email security), Hoxhunt (gamification), Cofense, SoSafe, Ironscales, NINJIO, Mimecast, or building in-house. How locked-in are they (multi-year contracts, deep integrations)? When is renewal likely?

3. **Buying Readiness** — Signals: recent CISO hire, public incident or breach disclosure, new compliance requirement (SOC 2, ISO 27001, HIPAA, PCI, SEC disclosure rules), board pressure on AI threats, cyber insurance renewal pressure, recent product launch creating new attack surface, hiring for security awareness or IR roles.

4. **Scale Potential** — Estimated employee count, growth trajectory, geographic spread, regulated business units, ARR potential for Adaptive. Per-seat ACV typically scales with employee count and feature mix (multichannel + deepfakes + executive monitoring command premium).

5. **Strategic Value** — Logo value (Fortune 500, regulated industry leader, AI-native company), case study potential (compelling narrative about AI threats), network effects (do their peers benchmark against them?), expansion potential into adjacent business units or subsidiaries.

${f.context ? `Additional context: ${f.context}` : ""}

Output format:
- **Overall ICP Score: X/50** with a one-line verdict
- Each dimension scored with 2-3 sentences of reasoning grounded in publicly available facts about the company
- **Recommended Entry Strategy** — who to target first (CISO, Security Awareness Manager, IT Director, CFO for insurance angle), what motion (direct enterprise, partner via cyber insurance broker, displacement of incumbent), and the opening angle (compelling event, peer reference, threat-readiness benchmark)
- **Key Risks** — what could kill this deal (entrenched incumbent, recent SAT investment, low security maturity, decentralized buying)
- **Adaptive Products to Lead With** — rank order (SAT? Phishing Sims? Phish Triage? Risk Monitoring?) and why

Use your best knowledge. Be specific and opinionated, not generic. If you're estimating something not publicly verified, flag it.`,
  },
  {
    id: "battlecard",
    num: "03",
    name: "Competitive Battle Card",
    short: "Battle Cards",
    desc: "Real-time competitive intelligence against any SAT competitor — objection handling, feature gaps, deployment friction, and win narratives.",
    icon: "◆",
    fields: [
      { key: "competitor", label: "Competitor", placeholder: "e.g. KnowBe4, Proofpoint, Hoxhunt, Cofense, SoSafe, Ironscales" },
      { key: "scenario", label: "Deal Scenario (optional)", placeholder: "e.g. Enterprise financial services, deepfake-aware CISO, cyber insurance pressure, replacement of incumbent at renewal" },
    ],
    buildPrompt: (f) => `You are a competitive intelligence analyst at Adaptive Security. Generate a battle card against ${f.competitor || "a security awareness training competitor"}.${f.scenario ? ` Deal context: ${f.scenario}.` : ""}

Adaptive Security strengths: Only platform built ground-up for AI-era threats (deepfake video, voice/vishing, SMS/smishing). Hyperrealistic multichannel phishing simulations including AI executive deepfake calls. OSINT-powered spear phishing simulations. AI Content Creator generates custom training in seconds vs hours/days of manual authoring. Dynamic employee risk scoring tied to real behavior, not course completion. Executive exposure monitoring scans the public web for OSINT and credential exposure. Realism-first product philosophy (vs compliance-checkbox legacy vendors). 700+ customers including Figma, MLB, PayPal, Plaid, Ramp, Lennar, US Senate. 4.9/5 G2, NPS 94. Backed by OpenAI (their only cybersecurity investment), a16z, NVIDIA, Bain Capital Ventures. $145M+ raised. SOC 2, HIPAA, GDPR aligned. 30+ integrations. 35+ languages.

Structure the battle card as:

**1. Competitor Overview** — What they do, who buys them, their GTM motion, their core narrative (e.g. KnowBe4 = "scale and compliance breadth", Proofpoint = "integrated with our email security", Hoxhunt = "gamified behavior change", Cofense = "phish reporting and SOC integration")

**2. Head-to-Head Comparison** — Table format across: multichannel simulation (email/SMS/voice/video), deepfake simulation capability, AI-generated content creation speed, behavior-change measurement, risk scoring sophistication, executive exposure monitoring, admin time required, phishing template realism, training content modernity, integration breadth, time-to-value, pricing model

**3. Where They Win** — Be honest about their genuine advantages. Legacy vendors have things they're genuinely better at: KnowBe4 has the largest content library and deepest compliance taxonomies; Proofpoint has the tightest integration with its own email security stack; Hoxhunt has refined gamification UX; Cofense has the strongest SOC-side phish reporting workflow. Acknowledge these openly.

**4. Where We Win** — Adaptive's differentiated strengths in this matchup. Be specific to the competitor — what is Adaptive demonstrably better at than THIS specific vendor? Focus on AI-era threats, multichannel realism, content creation speed, behavior-first measurement, executive exposure.

**5. Common Objections & Responses** — Top 5 things a prospect will say about the competitor being good enough or being too entrenched to replace, with specific rebuttals. Include: "We just renewed [incumbent]" — how to position Adaptive as additive, not displacing; "Our team is used to [incumbent's] admin UX" — how Adaptive's AI Content Creator slashes admin time; "Compliance check-the-box is all we need" — how SEC disclosure rules and cyber insurance are changing that.

**6. Trap Questions** — 3 questions to ask the prospect that expose the competitor's weakness. Examples: "How does your current platform let you run a deepfake voice call simulation impersonating your CFO?" "How quickly can your team create a custom phishing template based on a real attack you just got hit with?" "Can your platform show you which specific executives are most exposed via OSINT and credential leaks?"

**7. Knockout Blow** — The single most compelling argument to close against this competitor. For legacy vendors, it's usually: "Your incumbent was built for the 2015 threat landscape. Attackers are now using GenAI, voice cloning, and deepfake video — none of which your current training simulates. The gap between your training and your actual attack surface is the entire opportunity here."

**8. Proof Points** — Customer stories, NPS scores, analyst recognition, investor signal (OpenAI's only cyber bet), or data points that seal it. Estimate metrics where appropriate but make them plausible.

Be specific and tactical. This is for a rep walking into a deal, not a marketing blog.`,
  },
  {
    id: "roi",
    num: "04",
    name: "ROI Calculator",
    short: "ROI Calc",
    desc: "Build a business case with hard numbers — breach cost avoidance, incumbent SAT spend offset, admin time savings, and cyber insurance impact.",
    icon: "▲",
    fields: [
      { key: "employees", label: "Number of Employees", placeholder: "e.g. 5000" },
      { key: "current", label: "Current SAT Provider", placeholder: "e.g. KnowBe4, Proofpoint, Hoxhunt, none / in-house" },
      { key: "industry", label: "Industry / Risk Profile", placeholder: "e.g. Financial services, healthcare, technology, regulated industry" },
    ],
    buildPrompt: (f) => `You are a solutions engineer at Adaptive Security building an ROI model for a prospect. Your job is to make the business case in language a CFO will sign off on, anchored in well-known industry data.

Inputs:
- Employees: ${f.employees || "5,000"}
- Current SAT provider: ${f.current || "KnowBe4"}
- Industry: ${f.industry || "Financial services"}

**INDUSTRY REFERENCE DATA TO USE:**
- IBM Cost of a Data Breach Report 2024: global average breach cost = $4.88M; phishing as initial attack vector = $4.88M average; healthcare breach cost = $9.77M (highest); financial services = $6.08M
- FBI IC3 2024: Business Email Compromise losses = $2.9B+ annually in the US alone, increasingly involving deepfake voice and AI-generated content
- Verizon 2024 DBIR: 68% of breaches involved a non-malicious human element (clicking, errors, social engineering)
- Notable AI-era incidents to reference: Arup lost $25M to a deepfake CFO video call (Feb 2024); MGM Resorts paid ~$100M after a social-engineering vishing attack (Sept 2023); Retool breach traced to deepfake voice phishing (Aug 2023)
- Typical SAT incumbent pricing (industry estimates — flag as approximate): KnowBe4 ~$8-25/user/year depending on tier; Proofpoint Security Awareness ~$10-30/user/year; Hoxhunt ~$15-40/user/year. These are estimates from third-party sources; vendor pricing is private.

**ADAPTIVE PRICING POSITION:**
Adaptive does not publish public pricing. Position as premium relative to legacy SAT (KnowBe4, Proofpoint) but justified by AI-era capability that incumbents simply don't have (deepfake simulation, multichannel, AI Content Creator, executive exposure monitoring). For modeling, use a placeholder per-seat ACV range and flag explicitly that final pricing comes from your AE.

**BUILD A COMPREHENSIVE ROI ANALYSIS:**

1. **Current State Cost Model** — Estimated annual spend on current SAT, admin overhead (typically 0.25-0.5 FTE per 1,000 employees for SAT program management), incident response costs from current click-through rates (industry baseline: 17% click rate on phishing tests for organizations using legacy training — cite this as directional)

2. **Adaptive Cost Model** — Estimated per-seat ACV at this employee count, total annual subscription cost, implementation effort (typically 2-4 weeks to first campaign), ongoing admin time reduction from AI Content Creator and automated risk-based campaigns

3. **ROI Pillar 1: Breach Cost Avoidance** — Adaptive customers report click rate reductions from industry baseline (~17%) toward sub-3% over 12 months with realistic, role-based, multichannel simulation. Translate that delta into reduced probability of a successful social engineering breach, multiplied by the IBM breach cost benchmark for the prospect's industry. Show the expected-value math.

4. **ROI Pillar 2: SAT Spend Offset** — If they have an incumbent, the Adaptive subscription partially or fully replaces that line item. Show net incremental cost vs net incremental capability.

5. **ROI Pillar 3: Admin Time Savings** — AI Content Creator builds custom training in minutes vs hours of manual authoring. Automated risk-based campaigns reduce manual program management. Quantify in FTE hours and dollars.

6. **ROI Pillar 4: Cyber Insurance Impact** — Carriers increasingly require demonstrable SAT programs. Adaptive's risk scoring and board-ready reporting strengthen renewal posture. Estimate insurance premium reduction or coverage expansion (typically 5-15% on cyber policy at this scale — flag as carrier-dependent).

7. **ROI Pillar 5: Compliance & Audit Readiness** — Built-in reporting aligned with SOC 2, ISO 27001, HIPAA, NIST CSF, AI Act. Reduce audit prep time. Quantify hours saved.

8. **3-Year Projection** — Show compounding value as employee count grows and threat landscape evolves. AI threats are escalating faster than incumbents can adapt; the gap between "AI-aware training" and "legacy training" widens each year.

9. **Executive Summary** — One paragraph a CFO would read. Lead with the dollar number, anchor it in breach-cost avoidance + insurance impact, and close with the strategic risk of being caught flat-footed on the next Arup-style deepfake fraud.

**FORMATTING:** Format with clear numbers, tables where appropriate. Show your math. Flag every assumption explicitly. This document will likely be reviewed by procurement and finance, so any number that isn't a published industry benchmark should be marked as a directional estimate.`,
  },
  {
    id: "deal-analysis",
    num: "05",
    name: "Deal Analysis (MEDDPIC)",
    short: "Deal Analysis",
    desc: "Scientific deal qualification using the MEDDPIC framework — scores where you stand, surfaces gaps in your deal, and tells you exactly what to do next to improve win probability.",
    icon: "◇",
    fields: [
      { key: "account", label: "Account Name", placeholder: "e.g. Block, JPMorgan Chase, UnitedHealth" },
      { key: "prospect", label: "Prospect Name & Title (optional)", placeholder: "e.g. Sarah Chen, CISO" },
      { key: "context", label: "Deal Context (what you know so far)", placeholder: "e.g. Had intro call, they're on KnowBe4 renewing in Q2, CISO is new and wants to show board impact in 6 months, recent vishing attempt against finance team, ~12K employees" },
    ],
    buildPrompt: (f) => `You are an elite deal strategist and MEDDPIC coach at Adaptive Security. You have deep knowledge of Adaptive's full product suite, competitive positioning, and sales motion.

**ADAPTIVE PRODUCT KNOWLEDGE:**
- Security Awareness Training: Interactive scenario-based modules, AI Content Creator for custom training, role-personalized content featuring AI executive deepfakes, compliance and policy training, 1,000+ ready-to-launch resources, 35+ languages
- Phishing Simulations: Multichannel (email, SMS, voice, video), hyperrealistic AI personas, OSINT-powered spear phishing, custom AI executive deepfake calls, automated programs
- Phish Triage: Employee Phish Alert Button, AI-powered classification, automated email remediation, org-wide message cleanup, SOC integration
- Risk Monitoring: Dynamic employee and team risk scoring based on behavior, executive exposure monitoring (OSINT + credential breaches), automated risk-based remediation campaigns
- Reporting: Executive dashboards, board-ready reports, compliance frameworks (SOC 2, ISO 27001, HIPAA, NIST CSF, AI Act)
- Integrations: 30+ including SSO/identity, email, SIEM, HRIS, collaboration tools

**ADAPTIVE CUSTOMERS & PROOF POINTS:**
- Figma, Major League Baseball, PayPal, Plaid, Ramp, Lennar, Xerox, Logitech, Hanes, Bose, US Senate, NHL, Perplexity, NerdWallet, Podium
- 700+ customers, 4.9/5 G2, 5.0/5 Gartner, NPS 94
- Founded 2024 by Brian Long (CEO) and Andrew Jones
- $145M+ raised from OpenAI (only cyber investment), a16z, NVIDIA, Bain Capital Ventures
- Built ground-up for AI-era threats — only major SAT platform purpose-built for deepfakes, vishing, smishing, and OSINT-powered spear phishing

**ADAPTIVE GTM MOTIONS:**
- Enterprise Direct: Mid-market and enterprise, 60-180 day cycle, $50K-$1M+ ACV depending on employee count and feature mix
- Insurance / Broker Channel: Partnership with cyber insurance carriers and brokers who increasingly require SAT
- Compliance-Driven: Customers with SOC 2, ISO 27001, HIPAA, NIST CSF, or AI Act requirements
- Incident-Driven: Customers reacting to a public peer incident (Arup, MGM, Retool) or their own near-miss

**RELEVANT MARKET CONTEXT:**
- AI phishing volume up 1,265% in the last year
- Arup $25M deepfake CFO scam (Feb 2024) is the canonical board-level compelling event
- SEC cyber incident disclosure rules (Dec 2023) raise the executive cost of human-error breaches
- IBM 2024: average breach cost $4.88M; financial services $6.08M; healthcare $9.77M
- 68% of breaches involve a non-malicious human element (Verizon DBIR 2024)

**YOUR TASK:**
Analyze this deal using the MEDDPIC framework and provide a scientific assessment of deal health.

**ACCOUNT:** ${f.account || "Unknown"}
${f.prospect ? `**PROSPECT:** ${f.prospect}` : ""}
${f.context ? `**DEAL CONTEXT:** ${f.context}` : "**DEAL CONTEXT:** No context provided — assess based on what you know about this company and provide assumptions."}

**OUTPUT FORMAT:**

## Deal Health Score: X/100
One-line verdict on deal probability.

## MEDDPIC Analysis

For EACH element, provide:
- **Score (1-10)** with a colored indicator
- **What We Know** — facts from the context provided
- **What We're Missing** — gaps that reduce win probability
- **Action Required** — specific next step to fill the gap

### M — Metrics
What quantifiable business outcomes will the prospect achieve? Do we have hard numbers tied to their pain (click rate baseline, current incident volume, audit findings, insurance renewal terms, board-reported KPIs)?

### E — Economic Buyer
Who has the budget and final sign-off authority? CISO usually owns the budget for SAT, but CFO is often pulled in for cyber insurance angle and board-level breach risk. Have we identified and accessed this person?

### D — Decision Criteria
What technical and business criteria will they use to evaluate? AI-era threat coverage? Behavior-change measurement? Admin time? Integration depth? Content library? Compliance frameworks? Are we shaping these criteria in our favor (especially deepfake/vishing coverage, where incumbents are weakest)?

### D — Decision Process
What is the buying process, timeline, and sequence of steps to close? Pilot? RFP? Security review? Legal/procurement? Sequence and stakeholders?

### P — Paper Process
What does procurement, legal, and security review look like? What compliance/security review will Adaptive be subject to (SOC 2 review, vendor risk assessment, DPA, AI Act if EU)? Where might this bottleneck?

### I — Identify Pain
What is the compelling event driving urgency? Examples: recent near-miss or actual incident, peer company breach in the news, CISO-mandated AI threat readiness, cyber insurance renewal requiring uplift, audit finding, board pressure post-Arup, SEC disclosure exposure. Is there a cost of inaction we've quantified?

### C — Champion
Who internally is advocating for Adaptive? Do they have influence, access to the EB, and a personal win tied to this deal (CISO building board credibility, Security Awareness Manager wanting modern tooling, CIO consolidating tools)?

## Gap Analysis
Rank the top 3 MEDDPIC gaps from most critical to least. For each:
- Why this gap threatens the deal
- The specific action, email, or meeting to close it
- Who on the Adaptive team should be involved (AE, SE, exec sponsor, customer reference)

## Recommended Next 3 Moves
Concrete, sequenced actions to advance this deal in the next 7-14 days.

## Risk Flags
Red flags that could kill this deal, and mitigation strategies. Common ones for Adaptive: entrenched multi-year contract with incumbent, recent SAT investment by prospect, decentralized buying across business units, low security maturity (champion can't get budget approved), pricing pushback from procurement comparing to KnowBe4 pricing.

## Adaptive Products to Lead With
Based on this account's profile, rank which products to lead with and why. Usually: lead with Phishing Simulations (especially deepfake/vishing demo — the wow moment) → SAT → Phish Triage (if they have a SOC) → Risk Monitoring (if they have public executives).

Be brutally honest. Optimistic deal assessment kills pipelines. Score low where information is missing — "we don't know" is a 2, not a 5.`,
  },
  {
    id: "pitch",
    num: "06",
    name: "Persona Pitch Builder",
    short: "Pitch Builder",
    desc: "Generates persona-specific pitch narratives — CISO gets risk reduction and board reporting, CFO gets insurance and breach math, Security Awareness Manager gets program quality.",
    icon: "◈",
    fields: [
      { key: "persona", label: "Target Persona", placeholder: "e.g. CISO, Security Awareness Manager, CIO, CFO, IT Director" },
      { key: "company", label: "Company", placeholder: "e.g. Stripe, Memorial Sloan Kettering, JPMorgan" },
      { key: "usecase", label: "Primary Use Case", placeholder: "e.g. Replace KnowBe4, deepfake readiness, executive exposure monitoring, cyber insurance posture" },
    ],
    buildPrompt: (f) => `You are the Head of GTM at Adaptive Security preparing a pitch tailored for a ${f.persona || "CISO"} at ${f.company || "a target company"}.${f.usecase ? ` Their primary use case: ${f.usecase}.` : ""}

Adaptive products: Security Awareness Training (interactive + AI Content Creator + executive deepfake personalization), Multichannel Phishing Simulations (email + SMS + voice + video, OSINT-powered), Phish Triage (Phish Alert Button + AI classification + automated remediation), Risk Monitoring (dynamic employee risk scoring + executive exposure monitoring). Key proof points: Figma, MLB, PayPal, Plaid, Ramp, Lennar, US Senate are customers. 700+ customers, NPS 94, 4.9/5 G2. Built ground-up for AI-era threats. Backed by OpenAI's only cybersecurity investment, a16z, NVIDIA, Bain. $145M+ raised.

Build a persona-specific pitch:

**1. Opening Hook (30 seconds)** — Lead with THEIR world. What keeps this persona up at night? What trend is reshaping their role?
- CISO → AI threats outpacing legacy defenses, board demanding measurable AI threat readiness, SEC disclosure exposure, recent Arup-style headlines making this personal
- Security Awareness Manager → Employee fatigue with cliché training, executives skeptical of program ROI, hard to demonstrate behavior change beyond click rates, content creation eating their week
- CIO / IT Director → Vendor consolidation pressure, integration overhead, admin time, scaling globally with localized content
- CFO → Cyber insurance premiums rising, deductibles climbing, breach disclosure adding shareholder risk, audit committee asking about AI threat readiness
- Board Member / Audit Committee → Personal liability under new SEC disclosure rules, ESG/governance pressure, peer companies in the news

**2. Problem Framing (60 seconds)** — Connect their specific pain to the underlying shift. AI has lowered the cost of credible social engineering by orders of magnitude. Legacy SAT was designed for an era when phishing emails were mostly text and obviously broken. That era is over. Don't mention Adaptive yet.

**3. Solution Narrative (90 seconds)** — Introduce Adaptive through the lens of what matters to THIS persona:
- CISO → Multichannel realism (incl. deepfake), behavior-change measurement, executive exposure monitoring, board-ready reporting that survives audit committee scrutiny
- Security Awareness Manager → AI Content Creator generates campaigns in minutes, personalized at role and risk level, employees actually engage (NPS 94), program shifts from check-the-box to story-worthy
- CIO / IT Director → 30+ integrations, fast onboarding, multilingual, single pane of glass for SAT + simulations + triage + risk
- CFO → Quantifiable breach cost avoidance, cyber insurance posture improvement, audit-ready compliance reporting, ROI math that survives a procurement review
- Board / Audit → Defensible AI threat readiness posture, board-grade reporting on human risk, evidence that the org is ahead of the threat curve

**4. Proof Point** — One customer story that mirrors their situation. Pick from: Figma (technology), MLB (large enterprise, public profile), PayPal (financial services), Plaid (fintech infrastructure), Ramp (fintech with high deepfake exposure), Lennar (Fortune 500 traditional enterprise), NerdWallet (regulated finance content), Podium (mid-market SaaS), US Senate (public sector, deepfake exposure). Tell it as a narrative — who they were, what changed, what the result was. Flag invented metrics as directional in your head; in the pitch they should sound confident.

**5. The Ask** — What's the specific next step for this persona?
- CISO → Executive briefing + threat-readiness benchmark for their org
- Security Awareness Manager → 30-day pilot with one business unit + AI Content Creator workshop
- CIO / IT Director → Security and integration review + commercial scope
- CFO → ROI workshop including cyber insurance carrier validation

**6. Objection Prep** — Top 3 objections this persona will raise, with responses. Common ones:
- "We just renewed with [incumbent]" → How Adaptive can run side-by-side for one BU as the AI-threat add-on, building toward full replacement at renewal
- "Pricing is higher than what we pay today" → Reframe in breach-cost-avoidance terms and cyber insurance impact; show TCO not unit price
- "Will our employees engage?" → NPS 94, realism-first design, microlearning + scenario-based vs lecture format
- "How do we handle deepfakes ethically in simulation?" → Strict opt-in for executive deepfake personas, governance controls, role-based access, AI Act alignment
- "Is this a real category or AI-washing?" → OpenAI's only cybersecurity investment, NVIDIA backing, 700+ customers in 18 months

**7. Leave-Behind** — A one-paragraph summary they can forward internally to champion the deal. Should make them look smart for bringing it up.

Style: Confident, insider-level, no jargon soup. This should feel like a conversation, not a pitch deck read-aloud.`,
  },
  {
    id: "impact",
    num: "07",
    name: "Impact Statement Generator",
    short: "Impact Statement",
    desc: "Generates a polished 4-5 page impact statement — current state analysis, AI threat exposure, why Adaptive, phased implementation with ROI, and aligned customer stories.",
    icon: "▣",
    fields: [
      { key: "company", label: "Prospect Company", placeholder: "e.g. Block, UnitedHealth, JPMorgan Chase" },
      { key: "industry", label: "Industry / Vertical", placeholder: "e.g. Financial services, healthcare, technology" },
      { key: "pain", label: "Primary Pain / Current State", placeholder: "e.g. On KnowBe4 for 4 years, 17% click rate baseline, no deepfake or vishing simulation, recent finance team near-miss, cyber insurance renewal pressure" },
      { key: "contact", label: "Primary Contact & Title (optional)", placeholder: "e.g. James Park, CISO" },
    ],
    buildPrompt: (f) => `You are a senior strategic Account Executive at Adaptive Security creating a personalized Impact Statement document for ${f.company || "a prospect"}. This is a polished, executive-ready deliverable — not a pitch deck, not an email. It's a 4-5 page leave-behind that makes the business case for Adaptive in the prospect's specific context.

**ADAPTIVE FULL CONTEXT:**
Products:
- Security Awareness Training: Interactive scenario-based modules, AI Content Creator for custom training generation, role-personalized with AI executive deepfakes, 1,000+ resources, 35+ languages, compliance frameworks built in (SOC 2, ISO 27001, HIPAA, NIST CSF, AI Act)
- Phishing Simulations: Multichannel (email, SMS/smishing, voice/vishing, video/deepfake), hyperrealistic AI personas, OSINT-powered spear phishing using public data about the org and employees, custom AI executive deepfake voice and video calls
- Phish Triage: Employee Phish Alert Button, AI-powered classification of reported emails, automated email remediation, org-wide message cleanup, SOC integration
- Risk Monitoring: Dynamic employee and team risk scoring based on actual behavior, automated risk-based remediation campaigns, executive exposure monitoring scanning OSINT and credential breach data
- Reporting: Executive dashboards, board-ready reporting, audit-ready compliance reports

Pricing Model:
- Per-seat annual subscription (pricing private; positioning is premium to legacy SAT but justified by AI-era capability)
- Volume discounts at scale
- Modular add-ons (executive monitoring, advanced simulation packages)

Key Customers: Figma, Major League Baseball, PayPal, Plaid, Ramp, Lennar, Xerox, Logitech, Hanes, Bose, US Senate, NHL, Perplexity, NerdWallet, Podium. 700+ customers total.
Social proof: 4.9/5 G2, 5.0/5 Gartner, NPS 94.
Backing: OpenAI (their first and only cybersecurity investment), a16z, NVIDIA, Bain Capital Ventures. $145M+ raised. Founded 2024 by Brian Long (CEO) and Andrew Jones.

Competitive Advantages:
- Only major SAT platform built ground-up for AI-era threats (deepfake video, voice/vishing, smishing, OSINT-powered spearphishing)
- Hyperrealistic multichannel simulation including AI executive deepfake calls
- AI Content Creator generates custom training in seconds vs hours of manual authoring (legacy SAT)
- Dynamic risk scoring tied to real behavior, not course completion
- Executive exposure monitoring — unique capability in the market
- Realism-first product philosophy (vs compliance-checkbox legacy vendors)
- Modern UX with NPS 94 employee satisfaction (legacy SAT typically has low employee engagement)

Industry Benchmark Data (cite as published):
- IBM Cost of a Data Breach 2024: global avg $4.88M; financial services $6.08M; healthcare $9.77M
- Verizon DBIR 2024: 68% of breaches involved non-malicious human element
- FBI IC3 2024: $2.9B+ BEC losses, increasingly AI-assisted
- Notable AI incidents: Arup $25M deepfake CFO video (Feb 2024); MGM ~$100M social engineering (Sept 2023); Retool deepfake voice phishing breach (Aug 2023)
- AI phishing volume up 1,265% YoY per recent industry reports

**PROSPECT CONTEXT:**
- Company: ${f.company || "Target Company"}
- Industry: ${f.industry || "Technology"}
- Current State / Pain: ${f.pain || "Evaluating modern security awareness training and AI-era threat readiness"}
${f.contact ? `- Primary Contact: ${f.contact}` : ""}

**DOCUMENT STRUCTURE — Follow this EXACT format:**

# Adaptive + ${f.company || "Company"} | Impact Statement

## Adaptive Security + ${f.company || "Company"}
*[One compelling tagline that frames the transformation — e.g., "From Legacy Awareness to AI-Era Readiness", "Closing the Human-Layer Gap Before the Next Deepfake Lands"]*

---

## The Current State

### Where ${f.company || "Company"} Stands Today
Write 2-3 sentences about their current security awareness posture based on the context provided. Then create a metrics table:

| Metric | Current State |
|--------|--------------|
| Employees in scope | [Number] |
| Current SAT vendor | [Vendor] |
| Estimated annual SAT spend | [$ value — flag as estimate if not provided] |
| Phishing click rate baseline | [%] — industry baseline is ~17% for legacy SAT |
| Multichannel simulation coverage | [Email only / partial / none — likely none if incumbent is legacy] |
| Deepfake/vishing simulation capability | [None — flag this as a critical gap] |
| Time to launch a new custom campaign | [Hours-days — legacy] |
| Executive exposure monitoring | [None] |

### The Strategic Problem: [Current Approach/Vendor]
Explain WHY their current approach is architecturally limited for the AI threat era. Frame this the way a consultant would — not as a sales pitch, but as a structural analysis. Include 3-4 bullet points on specific constraints. Reference their specific incumbent where possible — KnowBe4's compliance-first design, Proofpoint's email-only simulation surface, Hoxhunt's gamification depth but limited multichannel, etc.

**Business Impact:** One hard-hitting paragraph quantifying the cost of inaction — anchor in industry breach cost data and a peer incident relevant to their vertical.

---

## Why Adaptive

### Built for [Their Specific Risk Profile / Industry]
4-5 bullet points on why Adaptive is the right fit, each with a bold label and a one-sentence explanation. Tailor to their industry and use case (finance → BEC and wire fraud focus; healthcare → HIPAA + clinical staff training; technology → engineering and AI-native risk surface; government → public sector executive deepfake exposure).

### Expected Impact
Create a table showing projected improvements:

| Metric | Expected Impact |
|--------|----------------|
| Click rate reduction (12 months) | From ~17% baseline toward <3% |
| Time to launch custom campaign | From hours/days to minutes via AI Content Creator |
| Multichannel coverage | Email + SMS + voice + video, including deepfake personas |
| Executive exposure visibility | Full OSINT + credential breach monitoring for top 50 execs |
| Employee engagement (NPS) | Industry-leading 94 |
| Compliance reporting | Board-ready, audit-aligned (SOC 2, ISO 27001, HIPAA, NIST CSF, AI Act) |

---

## The Strategic Solution

### Phase 1: Foundation (30 Days)
Describe what gets deployed first. Typically: identity/SSO integration, employee enrollment, baseline phishing simulation across the org to establish click-rate baseline, initial training rollout, executive exposure scan. Include a comparison table:

| Metric | Current State | Phase 1 Target |
|--------|--------------|----------------|
| Baseline click rate established | Unknown / partial | Org-wide baseline measured |
| Multichannel simulation | Email only | Email + SMS active |
| Executive exposure scan | None | Top exec OSINT report delivered |
| AI Content Creator adoption | n/a | First custom campaign live |

**Phase 1 Economics:** One paragraph showing this is net-positive from Day 1 — typically the incumbent renewal offset plus admin time recovery covers Phase 1 cost.

### Phase 2: Full Deployment (60-90 Days)
Describe expanded capabilities: voice/vishing simulation, deepfake video personas (with governance), Phish Triage activation, risk-based automated remediation, integrations with SIEM and HRIS, board reporting cadence established.

**Phase 2 Economics:** One paragraph on expanded ROI — breach cost avoidance compounding, cyber insurance posture improvement, audit prep time reduction.

### Phase 3: Continuous Adaptation (Ongoing)
Real-time risk scoring drives personalized remediation. Threat intelligence updates inform new simulation scenarios. Quarterly board reporting. Annual benchmark vs peers.

---

## Success Stories: Proof This Works

### Case Study 1: [Most relevant customer to their industry]
**Company Overview:** [One line — industry, scale, use case]

| Metric | Result |
|--------|--------|
| [Key result 1 — e.g. click rate reduction] | [Value — flag as directional] |
| [Key result 2 — e.g. admin time saved] | [Value] |
| [Key result 3 — e.g. simulation channels deployed] | [Value] |

### Case Study 2: [Second relevant customer]
Same format.

### Case Study 3: [Third relevant customer]
Same format.

Choose case studies that mirror the prospect's industry, scale, or use case. Use real Adaptive customers (Figma, MLB, PayPal, Plaid, Ramp, Lennar, NerdWallet, Podium, US Senate, etc.) and construct plausible results based on Adaptive's known differentiators (engagement lift from realism, click rate reduction from personalized simulation, admin time savings from AI Content Creator). Flag any metrics that are directional estimates vs published customer results.

---

*Adaptive Security Impact Statement | Confidential | ${new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })}*

**STYLE REQUIREMENTS:**
- Write like a management consultant, not a salesperson
- Lead with the prospect's world, not Adaptive's features
- Every section should feel researched and specific to THIS company
- Tables should have real numbers — estimate intelligently based on context, flag assumptions
- The document should be something a champion can forward to their CFO and feel proud of
- Total length: 4-5 pages equivalent in markdown
- Professional, confident, zero fluff
- Anchor breach cost claims in named third-party sources (IBM Cost of Breach Report, Verizon DBIR, FBI IC3)`,
  },
];

/* ───────── WAVEFORM ───────── */
function Waveform({ width = 200, height = 40, bars = 30, style = {} }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, width, height, opacity: 0.4, ...style }}>
      {Array.from({ length: bars }).map((_, i) => (
        <div key={i} style={{
          flex: 1, borderRadius: 1, background: T.accent,
          animation: `wave ${0.8 + Math.random() * 1.2}s ease-in-out ${i * 0.04}s infinite`,
        }} />
      ))}
      <style>{`@keyframes wave { 0%,100%{height:18%} 50%{height:100%} }`}</style>
    </div>
  );
}

/* ───────── MARKDOWN RENDERER ───────── */
function renderInline(text) {
  const parts = [];
  let remaining = text;
  let key = 0;
  const regex = /(\*\*(.+?)\*\*)|(`(.+?)`)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(remaining)) !== null) {
    if (match.index > lastIndex) parts.push(<span key={key++}>{remaining.slice(lastIndex, match.index)}</span>);
    if (match[2]) parts.push(<strong key={key++} style={{ color: T.text, fontWeight: 600 }}>{match[2]}</strong>);
    else if (match[4]) parts.push(<code key={key++} style={{ fontFamily: T.mono, fontSize: "0.88em", background: T.bg3, padding: "2px 6px", borderRadius: 3, color: T.accent }}>{match[4]}</code>);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < remaining.length) parts.push(<span key={key++}>{remaining.slice(lastIndex)}</span>);
  return parts.length > 0 ? parts : text;
}

function TableRenderer({ lines }) {
  const rows = lines.filter((l) => !l.match(/^\|[\s-:|]+\|$/));
  const parseRow = (r) => r.split("|").slice(1, -1).map((c) => c.trim());
  if (rows.length === 0) return null;
  const header = parseRow(rows[0]);
  const body = rows.slice(1).map(parseRow);
  return (
    <div style={{ overflowX: "auto", margin: "16px 0", border: `1px solid ${T.line}` }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr>{header.map((h, i) => (<th key={i} style={{ textAlign: "left", padding: "12px 16px", background: T.bg3, fontFamily: T.mono, fontSize: 11, color: T.dim, letterSpacing: "0.04em", fontWeight: 500, borderBottom: `1px solid ${T.line}`, borderRight: i < header.length - 1 ? `1px solid ${T.line}` : "none" }}>{renderInline(h)}</th>))}</tr></thead>
        <tbody>{body.map((row, ri) => (<tr key={ri}>{row.map((cell, ci) => (<td key={ci} style={{ padding: "10px 16px", borderBottom: `1px solid ${T.line}`, borderRight: ci < row.length - 1 ? `1px solid ${T.line}` : "none", color: T.dim }}>{renderInline(cell)}</td>))}</tr>))}</tbody>
      </table>
    </div>
  );
}

function MarkdownRenderer({ text }) {
  const lines = text.split("\n");
  const elements = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("### ")) {
      elements.push(<h4 key={i} style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 600, color: T.text, margin: "28px 0 8px" }}>{renderInline(line.slice(4))}</h4>);
    } else if (line.startsWith("## ")) {
      elements.push(<h3 key={i} style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 400, color: T.text, margin: "36px 0 12px" }}>{renderInline(line.slice(3))}</h3>);
    } else if (line.startsWith("# ")) {
      elements.push(<h2 key={i} style={{ fontFamily: T.serif, fontSize: 30, fontWeight: 400, color: T.text, margin: "40px 0 14px" }}>{renderInline(line.slice(2))}</h2>);
    } else if (line.startsWith("---") || line.startsWith("***")) {
      elements.push(<hr key={i} style={{ border: "none", borderTop: `1px solid ${T.line}`, margin: "28px 0" }} />);
    } else if (line.startsWith("| ")) {
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith("|")) { tableLines.push(lines[i]); i++; }
      i--;
      elements.push(<TableRenderer key={i} lines={tableLines} />);
    } else if (/^[-*] /.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) { items.push(lines[i].replace(/^[-*] /, "")); i++; }
      i--;
      elements.push(<ul key={i} style={{ margin: "8px 0", paddingLeft: 0, listStyle: "none" }}>{items.map((item, j) => (<li key={j} style={{ padding: "6px 0", borderBottom: `1px solid ${T.line}`, display: "flex", gap: 12, fontSize: 14, lineHeight: 1.55 }}><span style={{ color: T.accent, flexShrink: 0 }}>→</span><span>{renderInline(item)}</span></li>))}</ul>);
    } else if (/^\d+\. /.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) { items.push(lines[i].replace(/^\d+\. /, "")); i++; }
      i--;
      elements.push(<ol key={i} style={{ margin: "8px 0", paddingLeft: 0, listStyle: "none" }}>{items.map((item, j) => (<li key={j} style={{ padding: "6px 0", borderBottom: `1px solid ${T.line}`, display: "flex", gap: 12, fontSize: 14, lineHeight: 1.55 }}><span style={{ fontFamily: T.mono, fontSize: 11, color: T.mute, flexShrink: 0, minWidth: 20, paddingTop: 2 }}>{j + 1}.</span><span>{renderInline(item)}</span></li>))}</ol>);
    } else if (line.trim() === "") {
      elements.push(<div key={i} style={{ height: 8 }} />);
    } else {
      elements.push(<p key={i} style={{ margin: "6px 0", fontSize: 14, lineHeight: 1.65 }}>{renderInline(line)}</p>);
    }
    i++;
  }
  return <>{elements}</>;
}

/* ───────── AGENT PAGE ───────── */
function AgentPage({ agent }) {
  const [fields, setFields] = useState({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const outputRef = useRef(null);

  const updateField = (key, val) => setFields((p) => ({ ...p, [key]: val }));

  const runAgent = async () => {
    setLoading(true);
    setOutput("");
    setError("");
    try {
      const resp = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: agent.buildPrompt(fields) }),
      });
      const data = await resp.json();
      if (data.output) {
        setOutput(data.output);
      } else {
        setError(data.error || "No response received.");
      }
    } catch (e) {
      setError(`Error: ${e.message}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (output && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [output]);

  const hasInput = agent.fields.some((f) => fields[f.key]?.trim());

  return (
    <div style={{ paddingBottom: 120 }}>
      <div style={{ padding: "80px 0 60px", borderBottom: `1px solid ${T.line}`, position: "relative" }}>
        <div style={{ position: "absolute", right: 0, top: 90 }}><Waveform width={200} height={40} bars={28} /></div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <span style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: "0.08em" }}>§ AGENT {agent.num}</span>
          <span style={{ fontFamily: T.mono, fontSize: 18, color: T.accent }}>{agent.icon}</span>
        </div>
        <h1 style={{ fontFamily: T.serif, fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 400, lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: 20 }}>{agent.name}</h1>
        <p style={{ maxWidth: 640, fontSize: 16, color: T.dim, lineHeight: 1.6 }}>{agent.desc}</p>
      </div>

      <div style={{ padding: "48px 0" }}>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: T.mute, letterSpacing: "0.08em", marginBottom: 28 }}>INPUT PARAMETERS</div>
        <div style={{ display: "grid", gridTemplateColumns: agent.fields.length > 2 ? "1fr 1fr" : "1fr", gap: 20, marginBottom: 36 }}>
          {agent.fields.map((f) => (
            <div key={f.key}>
              <label style={{ display: "block", fontFamily: T.mono, fontSize: 11, color: T.dim, letterSpacing: "0.04em", marginBottom: 8 }}>{f.label}</label>
              <input
                value={fields[f.key] || ""}
                onChange={(e) => updateField(f.key, e.target.value)}
                placeholder={f.placeholder}
                style={{ width: "100%", padding: "14px 16px", background: T.bg2, border: `1px solid ${T.line}`, color: T.text, fontFamily: T.sans, fontSize: 15, outline: "none", transition: "border 0.2s" }}
                onFocus={(e) => e.target.style.borderColor = T.accentDim}
                onBlur={(e) => e.target.style.borderColor = T.line}
              />
            </div>
          ))}
        </div>
        <button
          onClick={runAgent}
          disabled={loading || !hasInput}
          style={{
            fontFamily: T.mono, fontSize: 13, fontWeight: 600, letterSpacing: "0.02em", padding: "14px 36px",
            background: loading ? T.bg3 : hasInput ? T.accent : T.bg3,
            color: loading ? T.dim : hasInput ? T.bg : T.mute,
            border: `1px solid ${loading ? T.line : hasInput ? T.accent : T.line}`,
            cursor: loading || !hasInput ? "not-allowed" : "pointer", transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: 10,
          }}
        >
          {loading && <span style={{ display: "inline-block", width: 14, height: 14, border: `2px solid ${T.mute}`, borderTopColor: T.accent, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />}
          {loading ? "GENERATING..." : "RUN AGENT →"}
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </button>
      </div>

      {error && <div style={{ padding: 20, background: "rgba(255,69,69,0.08)", border: `1px solid rgba(255,69,69,0.2)`, fontFamily: T.mono, fontSize: 13, color: T.red, marginBottom: 24 }}>{error}</div>}

      {(output || loading) && (
        <div ref={outputRef} style={{ borderTop: `1px solid ${T.line}`, paddingTop: 48 }}>
          <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: "0.08em", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent, boxShadow: `0 0 8px ${T.accent}`, animation: loading ? "pulse 1.5s ease-in-out infinite" : "none" }} />
            {loading ? "PROCESSING..." : "OUTPUT"}
            <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
          </div>
          {loading && !output ? (
            <div style={{ padding: 40, background: T.bg2, border: `1px solid ${T.line}` }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[1, 0.7, 0.85, 0.5].map((w, i) => (<div key={i} style={{ height: 14, background: T.bg3, borderRadius: 2, width: `${w * 100}%`, animation: `shimmer 1.5s ease-in-out ${i * 0.15}s infinite` }} />))}
              </div>
              <style>{`@keyframes shimmer { 0%,100%{opacity:0.4} 50%{opacity:0.8} }`}</style>
            </div>
          ) : output ? (
            <div style={{ padding: 36, background: T.bg2, border: `1px solid ${T.line}`, position: "relative" }}>
              <button onClick={() => navigator.clipboard?.writeText(output)} style={{ position: "absolute", top: 16, right: 16, fontFamily: T.mono, fontSize: 10, padding: "5px 12px", background: T.bg3, border: `1px solid ${T.line2}`, color: T.dim, cursor: "pointer", borderRadius: 3 }}>COPY</button>
              <div style={{ fontFamily: T.sans, fontSize: 15, lineHeight: 1.7, color: T.dim, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                <MarkdownRenderer text={output} />
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

/* ───────── HOME PAGE ───────── */
function HomePage({ onNavigate }) {
  return (
    <div style={{ paddingBottom: 120 }}>
      <div style={{ padding: "100px 0 80px", borderBottom: `1px solid ${T.line}`, position: "relative" }}>
        <div style={{ position: "absolute", right: 0, top: 110 }}><Waveform width={260} height={50} bars={35} /></div>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: T.mute, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 40, display: "flex", gap: 24 }}>
          <span style={{ color: T.accent }}>◆</span><span>GTM COMMAND CENTER</span>
          <span style={{ color: T.accent }}>◆</span><span>7 AI AGENTS</span>
          <span style={{ color: T.accent }}>◆</span><span>READY TO DEPLOY</span>
        </div>
        <h1 style={{ fontFamily: T.serif, fontSize: "clamp(48px, 8vw, 108px)", fontWeight: 400, lineHeight: 0.92, letterSpacing: "-0.03em", marginBottom: 28 }}>
          Adaptive<br /><em style={{ fontStyle: "italic", color: T.accent }}>GTM Hub.</em>
        </h1>
        <p style={{ maxWidth: 600, fontSize: 18, lineHeight: 1.6, color: T.dim, fontWeight: 300, marginBottom: 48 }}>Seven AI-powered agents built to accelerate every stage of the Adaptive Security sales cycle — from account research to deal analysis to closed-won.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
          {[["7", "AI Agents Live"], ["< 30s", "Time to Output"], ["∞", "Sequences Generated"]].map(([num, label], i) => (
            <div key={i} style={{ padding: "24px 20px", borderRight: i < 2 ? `1px solid ${T.line}` : "none" }}>
              <div style={{ fontFamily: T.serif, fontSize: 42, lineHeight: 1, marginBottom: 6 }}>{num}</div>
              <div style={{ fontFamily: T.mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: T.mute }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "80px 0 0" }}>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: "0.08em", marginBottom: 12 }}>§ AGENTS</div>
        <h2 style={{ fontFamily: T.serif, fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 56 }}>
          Your AI sales team — <em style={{ fontStyle: "italic", color: T.dim }}>deploy day one.</em>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {AGENTS.map((agent) => (
            <div key={agent.id} onClick={() => onNavigate(agent.id)} style={{ background: T.bg2, border: `1px solid ${T.line}`, padding: 32, cursor: "pointer", transition: "all 0.3s", position: "relative", overflow: "hidden" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.accentDim; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.line; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ position: "absolute", top: 28, right: 32, fontFamily: T.serif, fontSize: 56, lineHeight: 1, color: T.line2 }}>{agent.num}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontFamily: T.mono, fontSize: 18, color: T.accent }}>{agent.icon}</span>
                <span style={{ fontFamily: T.mono, fontSize: 10, color: T.accent, letterSpacing: "0.08em" }}>AGENT {agent.num}</span>
              </div>
              <h3 style={{ fontFamily: T.serif, fontSize: 28, lineHeight: 1.1, marginBottom: 10, fontWeight: 400, maxWidth: "80%" }}>{agent.name}</h3>
              <p style={{ fontSize: 14, color: T.dim, lineHeight: 1.55, maxWidth: "90%" }}>{agent.desc}</p>
              <div style={{ marginTop: 24, fontFamily: T.mono, fontSize: 11, color: T.accent, display: "flex", alignItems: "center", gap: 8 }}>LAUNCH AGENT <span style={{ fontSize: 14 }}>→</span></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 80, padding: 48, background: `linear-gradient(135deg, rgba(0,212,255,0.06) 0%, ${T.bg2} 100%)`, border: `1px solid ${T.accent}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 48, top: "50%", transform: "translateY(-50%)" }}><Waveform width={180} height={36} bars={25} /></div>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: "0.08em", marginBottom: 12 }}>§ GTM PLAYBOOK</div>
        <h3 style={{ fontFamily: T.serif, fontSize: 36, fontWeight: 400, lineHeight: 1.1, marginBottom: 12, maxWidth: "70%" }}>The full go-to-market strategy</h3>
        <p style={{ fontSize: 15, color: T.dim, marginBottom: 24, maxWidth: "60%" }}>Market thesis, ICP tiering, competitive matrix, GTM motions, named accounts, and a 30/60/90 execution plan for the AI-era SAT market.</p>
        <button onClick={() => onNavigate("playbook")} style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: "0.02em", padding: "12px 28px", background: T.accent, color: T.bg, border: "none", cursor: "pointer", fontWeight: 600, transition: "all 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#33dfff"}
          onMouseLeave={(e) => e.currentTarget.style.background = T.accent}>
          VIEW PLAYBOOK →
        </button>
      </div>

      {/* Finance Vertical CTA */}
      <div style={{ marginTop: 24, padding: 48, background: T.bg2, border: `1px solid ${T.line}`, position: "relative", overflow: "hidden" }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = T.accentDim}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = T.line}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 28 }}>🏦</span>
          <span style={{ fontFamily: T.mono, fontSize: 11, color: T.warn, letterSpacing: "0.08em" }}>VERTICAL STRATEGY</span>
        </div>
        <h3 style={{ fontFamily: T.serif, fontSize: 32, fontWeight: 400, lineHeight: 1.1, marginBottom: 12, maxWidth: "70%" }}>Adaptive for Financial Services</h3>
        <p style={{ fontSize: 15, color: T.dim, marginBottom: 24, maxWidth: "60%" }}>The vertical where AI fraud lands first. $25M Arup deepfake, $2.9B in annual BEC losses, SEC disclosure pressure, and cyber insurance carriers driving demand. Four-tier account strategy from money-center banks to credit unions.</p>
        <button onClick={() => onNavigate("finance")} style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: "0.02em", padding: "12px 28px", background: "transparent", color: T.warn, border: `1px solid ${T.warn}`, cursor: "pointer", fontWeight: 600, transition: "all 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = T.warn; e.currentTarget.style.color = T.bg; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.warn; }}>
          VIEW STRATEGY →
        </button>
      </div>
    </div>
  );
}

/* ───────── SECTION HEADER ───────── */
function SectionHeader({ num, title, subtitle }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 40, padding: "80px 0 48px", borderTop: `1px solid ${T.line}`, alignItems: "baseline" }}>
      <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: "0.08em" }}>§ {num}</div>
      <div>
        <h2 style={{ fontFamily: T.serif, fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em" }}>{title}</h2>
        {subtitle && <p style={{ fontFamily: T.serif, fontSize: 22, color: T.dim, fontStyle: "italic", marginTop: 8 }}>{subtitle}</p>}
      </div>
    </div>
  );
}

/* ───────── PLAYBOOK PAGE ───────── */
function PlaybookPage() {
  return (
    <div style={{ paddingBottom: 120 }}>
      <div style={{ padding: "80px 0 60px", borderBottom: `1px solid ${T.line}`, position: "relative" }}>
        <div style={{ position: "absolute", right: 0, top: 90 }}><Waveform width={260} height={50} bars={35} /></div>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: T.mute, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 32, display: "flex", gap: 24 }}>
          {["AI-Era Human Risk", "Enterprise + Mid-Market GTM", "Confidential"].map((t, i) => (<span key={i}><span style={{ color: T.accent }}>◆ </span>{t}</span>))}
        </div>
        <h1 style={{ fontFamily: T.serif, fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 400, lineHeight: 0.92, letterSpacing: "-0.03em", marginBottom: 24 }}>
          Human risk<br />is the new<br /><em style={{ fontStyle: "italic", color: T.accent }}>attack surface.</em>
        </h1>
        <p style={{ maxWidth: 620, fontSize: 18, lineHeight: 1.6, color: T.dim, fontWeight: 300 }}>A go-to-market playbook for capturing the security awareness market as it shifts from compliance check-box to AI-era threat readiness.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: `1px solid ${T.line}` }}>
        {[["1,265%", "AI Phishing YoY Growth"], ["$2.9B", "Annual BEC Losses (FBI IC3)"], ["$4.88M", "Avg Breach Cost (IBM 2024)"], ["68%", "Breaches w/ Human Element"]].map(([n, l], i) => (
          <div key={i} style={{ padding: "28px 24px", borderRight: i < 3 ? `1px solid ${T.line}` : "none" }}>
            <div style={{ fontFamily: T.serif, fontSize: 44, lineHeight: 1, marginBottom: 8 }}>{n}</div>
            <div style={{ fontFamily: T.mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: T.mute }}>{l}</div>
          </div>
        ))}
      </div>

      <SectionHeader num="01" title="Market Thesis" subtitle="AI broke security awareness training. Legacy SAT was built for a threat era that no longer exists." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, padding: "0 0 80px" }}>
        <div>
          <p style={{ fontFamily: T.serif, fontSize: 26, lineHeight: 1.4, marginBottom: 20 }}>Generative AI has collapsed the cost of credible social engineering. The question isn't <em style={{ color: T.accent, fontStyle: "italic" }}>whether</em> your employees will face a deepfake — it's whether their training has prepared them for one.</p>
          <p style={{ fontFamily: T.serif, fontSize: 22, lineHeight: 1.45, color: T.dim }}>KnowBe4 defined the compliance era. Proofpoint owned the email era. The next category leader will own the AI-threat era — and the buyer knows the legacy stack isn't built for what's coming.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: T.line, border: `1px solid ${T.line}` }}>
          {[["AI threats redefined the attack surface", "Deepfake video, voice cloning, OSINT-personalized spear phishing — none of which legacy SAT simulates."],
            ["Behavior change is the only real metric", "Click rate, time-to-report, and risk score deltas — not course completion percentages."],
            ["Multichannel realism is the moat", "Attackers pivoted to voice and SMS. Most platforms still test email only."],
            ["The buyer has board-level cover", "SEC disclosure rules + Arup-style headlines + cyber insurance pressure = budget that wasn't there 18 months ago."]
          ].map(([title, desc], i) => (
            <div key={i} style={{ background: T.bg2, padding: 24 }}>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.accent, marginBottom: 6 }}>PILLAR · 0{i + 1}</div>
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 6, color: T.text }}>{title}</div>
              <div style={{ fontSize: 13, color: T.dim, lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <SectionHeader num="02" title="ICP & Account Tiering" subtitle="Three tiers. Three buying motions." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, paddingBottom: 80 }}>
        {[
          { tag: "TIER 01 / STRATEGIC", acv: "$500K–$3M+", name: "AI-Native & High-Profile Enterprises", desc: "Public executives, AI-forward boards, brand-name exposure to impersonation.", accounts: ["Anthropic", "OpenAI", "Stripe", "Databricks", "Block", "Shopify"], criteria: ["10K+ employees or high-profile execs", "Public C-suite (deepfake fodder)", "AI-forward board", "Recent peer incident exposure"], featured: true },
          { tag: "TIER 02 / EXPANSION", acv: "$150K–$750K", name: "Regulated Mid-Market", desc: "SOC 2, ISO 27001, HIPAA, or PCI required. Cyber insurance pressure.", accounts: ["Fintech", "Health Tech", "Insurance", "Legal", "Accounting", "PE-backed SaaS"], criteria: ["1K-10K employees", "Compliance-driven", "Insurance renewal pressure", "Legacy SAT in place"] },
          { tag: "TIER 03 / DISPLACEMENT", acv: "$250K–$2M+", name: "Legacy SAT Replacement", desc: "Long-time KnowBe4/Proofpoint/Hoxhunt customers nearing renewal.", accounts: ["F500 enterprises", "Public sector", "Healthcare systems", "Energy/utilities", "Manufacturing"], criteria: ["5K+ employees", "Incumbent renewal in <12 months", "New CISO mandate", "Recent near-miss or incident"] },
        ].map((tier, i) => (
          <div key={i} style={{ background: tier.featured ? `linear-gradient(180deg, rgba(0,212,255,0.05) 0%, ${T.bg2} 100%)` : T.bg2, border: `1px solid ${tier.featured ? T.accent : T.line}`, padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 16, marginBottom: 20, borderBottom: `1px solid ${T.line}` }}>
              <span style={{ fontFamily: T.mono, fontSize: 10, color: T.accent }}>{tier.tag}</span>
              <span style={{ fontFamily: T.mono, fontSize: 10, color: T.mute }}>{tier.acv}</span>
            </div>
            <h3 style={{ fontFamily: T.serif, fontSize: 26, lineHeight: 1.1, marginBottom: 10, fontWeight: 400 }}>{tier.name}</h3>
            <p style={{ fontSize: 13, color: T.dim, marginBottom: 20, lineHeight: 1.5 }}>{tier.desc}</p>
            <div style={{ fontFamily: T.mono, fontSize: 9, color: T.mute, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>ACCOUNTS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
              {tier.accounts.map((a) => (<span key={a} style={{ fontFamily: T.mono, fontSize: 10, padding: "3px 8px", background: T.bg3, border: `1px solid ${T.line2}`, borderRadius: 100, color: T.text }}>{a}</span>))}
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 9, color: T.mute, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>CRITERIA</div>
            {tier.criteria.map((c, j) => (<div key={j} style={{ padding: "6px 0", borderBottom: `1px solid ${T.line}`, fontSize: 12, color: T.dim, display: "flex", gap: 10 }}><span style={{ color: T.accent }}>→</span>{c}</div>))}
          </div>
        ))}
      </div>

      <SectionHeader num="03" title="GTM Motions" subtitle="Four plays, run in parallel." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, paddingBottom: 80 }}>
        {[
          { num: "01", tag: "ENTERPRISE DIRECT", title: "AE + CISO + Champion", desc: "Direct sales into mid-market and enterprise with CISO as economic buyer.", cycle: "60–180d", owner: "AE+SE", metric: "$150K+ ACV" },
          { num: "02", tag: "INCIDENT-DRIVEN", title: "Land on Compelling Event", desc: "Targeted outreach to orgs reacting to a peer incident or near-miss.", cycle: "30–90d", owner: "AE+CSM", metric: "<60d cycle" },
          { num: "03", tag: "PARTNER / INSURANCE", title: "Cyber Insurance Channel", desc: "Co-sell with cyber insurance carriers and brokers driving SAT requirements.", cycle: "60–120d", owner: "Channel+AE", metric: "30% of pipeline" },
          { num: "04", tag: "EXPANSION", title: "Land & Expand", desc: "Land on SAT + Phishing Sims → expand to Phish Triage → Risk Monitoring → executive coverage.", cycle: "Ongoing", owner: "CSM+AE", metric: "130%+ NRR" },
        ].map((m, i) => (
          <div key={i} style={{ background: T.bg2, border: `1px solid ${T.line}`, padding: 32, position: "relative" }}>
            <div style={{ position: "absolute", top: 28, right: 32, fontFamily: T.serif, fontSize: 56, lineHeight: 1, color: T.line2 }}>{m.num}</div>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.accent, marginBottom: 14 }}>{m.tag}</div>
            <h3 style={{ fontFamily: T.serif, fontSize: 28, lineHeight: 1.1, marginBottom: 12, fontWeight: 400, maxWidth: "80%" }}>{m.title}</h3>
            <p style={{ fontSize: 14, color: T.dim, lineHeight: 1.55, marginBottom: 24 }}>{m.desc}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, paddingTop: 20, borderTop: `1px solid ${T.line}` }}>
              {[["Cycle", m.cycle], ["Owner", m.owner], ["Target", m.metric]].map(([l, v], j) => (
                <div key={j}><div style={{ fontFamily: T.mono, fontSize: 9, color: T.mute, textTransform: "uppercase", marginBottom: 4 }}>{l}</div><div style={{ fontFamily: T.mono, fontSize: 12 }}>{v}</div></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SectionHeader num="04" title="30·60·90 Plan" subtitle="Ramp without losing the quarter." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, border: `1px solid ${T.line}`, marginBottom: 80 }}>
        {[
          { day: "DAY 01–30", title: "Listen.", theme: "LEARN", items: ["Product certification on full platform + deepfake demo", "Shadow 10+ active enterprise opps", "Interview 5 won / 5 lost — surface displacement patterns", "Audit pipeline by tier and incumbent", "Build relationships with SE, channel, and CS"] },
          { day: "DAY 31–60", title: "Build.", theme: "PIPELINE", items: ["20 net-new Tier-1 opps with named CISOs", "3 cyber insurance broker conversations", "First deepfake demo to a Tier-1 CISO", "Convert 3 incident-driven inbounds", "Publish AI threat-readiness POV with marketing"] },
          { day: "DAY 61–90", title: "Close.", theme: "PROVE", items: ["Close $150K+ ACV deal", "3 opps to security review / procurement", "1 insurance channel partnership signed", "Forecast model built with realistic conversion math", "GTM POV to CRO + leadership"] },
        ].map((phase, i) => (
          <div key={i} style={{ padding: 32, borderRight: i < 2 ? `1px solid ${T.line}` : "none", background: T.bg2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.accent, boxShadow: `0 0 0 3px rgba(0,212,255,0.15)` }} />
              <span style={{ fontFamily: T.mono, fontSize: 11, color: T.dim }}>{phase.day}</span>
            </div>
            <div style={{ fontFamily: T.serif, fontSize: 32, lineHeight: 1, marginBottom: 6 }}>{phase.title}</div>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>{phase.theme}</div>
            {phase.items.map((item, j) => (
              <div key={j} style={{ padding: "10px 0", borderBottom: `1px solid ${T.line}`, fontSize: 13, color: T.dim, display: "flex", gap: 10 }}>
                <span style={{ fontFamily: T.mono, fontSize: 10, color: T.mute, flexShrink: 0, minWidth: 16 }}>{j + 1}</span>{item}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: T.line, border: `1px solid ${T.line}` }}>
        {[["Pipeline", "4×", "Coverage per quarter"], ["Tier-1 ACV", "$500K+", "Strategic accounts floor"], ["NRR", "130%+", "Expansion-driven"], ["Win Rate", "35%+", "Late-stage qualified"]].map(([l, v, n], i) => (
          <div key={i} style={{ background: T.bg2, padding: "28px 24px" }}>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.mute, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>{l}</div>
            <div style={{ fontFamily: T.serif, fontSize: 48, lineHeight: 1, marginBottom: 10 }}>{v}</div>
            <div style={{ fontSize: 11, color: T.dim }}>{n}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", padding: "64px 0 0", color: T.mute, fontFamily: T.mono, fontSize: 10, letterSpacing: "0.05em" }}>
        ADAPTIVE SECURITY · GTM PLAYBOOK · v1.0 · MAY 2026 · INTERNAL / CONFIDENTIAL
      </div>
    </div>
  );
}

/* ───────── FINANCE VERTICAL PAGE ───────── */
function FinancePage() {
  const alert = "#ff6b6b";
  const alertDim = "rgba(255,107,107,0.12)";

  const TierCard = ({ tier, acv, name, desc, targets, whyItems, personas, cycle, entry, featured }) => (
    <div style={{
      background: featured ? `linear-gradient(180deg, ${alertDim} 0%, ${T.bg2} 100%)` : T.bg2,
      border: `1px solid ${featured ? alert : T.line}`, padding: 28,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 16, marginBottom: 20, borderBottom: `1px solid ${T.line}` }}>
        <span style={{ fontFamily: T.mono, fontSize: 10, color: alert, letterSpacing: "0.05em" }}>{tier}</span>
        <span style={{ fontFamily: T.mono, fontSize: 10, color: T.mute }}>{acv}</span>
      </div>
      <h3 style={{ fontFamily: T.serif, fontSize: 26, lineHeight: 1.1, marginBottom: 10, fontWeight: 400 }}>{name}</h3>
      <p style={{ fontSize: 13, color: T.dim, marginBottom: 20, lineHeight: 1.5 }}>{desc}</p>

      <div style={{ fontFamily: T.mono, fontSize: 9, color: T.mute, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>TARGET ACCOUNTS</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
        {targets.map((a) => (<span key={a} style={{ fontFamily: T.mono, fontSize: 10, padding: "3px 8px", background: T.bg3, border: `1px solid ${T.line2}`, borderRadius: 100, color: T.text }}>{a}</span>))}
      </div>

      <div style={{ fontFamily: T.mono, fontSize: 9, color: T.mute, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>WHY THIS TIER</div>
      {whyItems.map((c, j) => (<div key={j} style={{ padding: "6px 0", borderBottom: `1px solid ${T.line}`, fontSize: 12, color: T.dim, display: "flex", gap: 10, lineHeight: 1.5 }}><span style={{ color: alert, flexShrink: 0 }}>→</span><span>{c}</span></div>))}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, paddingTop: 20, marginTop: 20, borderTop: `1px solid ${T.line}` }}>
        <div><div style={{ fontFamily: T.mono, fontSize: 9, color: T.mute, textTransform: "uppercase", marginBottom: 4 }}>Personas</div><div style={{ fontFamily: T.mono, fontSize: 11, color: T.text }}>{personas}</div></div>
        <div><div style={{ fontFamily: T.mono, fontSize: 9, color: T.mute, textTransform: "uppercase", marginBottom: 4 }}>Cycle</div><div style={{ fontFamily: T.mono, fontSize: 11, color: T.text }}>{cycle}</div></div>
        <div><div style={{ fontFamily: T.mono, fontSize: 9, color: T.mute, textTransform: "uppercase", marginBottom: 4 }}>Entry</div><div style={{ fontFamily: T.mono, fontSize: 11, color: T.text }}>{entry}</div></div>
      </div>
    </div>
  );

  return (
    <div style={{ paddingBottom: 120 }}>
      {/* Hero */}
      <div style={{ padding: "80px 0 60px", borderBottom: `1px solid ${T.line}`, position: "relative" }}>
        <div style={{ position: "absolute", right: 0, top: 90 }}><Waveform width={260} height={50} bars={35} /></div>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: T.mute, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 32, display: "flex", gap: 24 }}>
          {["Financial Services Vertical", "BEC + Deepfake + Vishing", "Vertical Strategy"].map((t, i) => (<span key={i}><span style={{ color: alert }}>◆ </span>{t}</span>))}
        </div>
        <h1 style={{ fontFamily: T.serif, fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 400, lineHeight: 0.92, letterSpacing: "-0.03em", marginBottom: 24 }}>
          Adaptive for<br /><em style={{ fontStyle: "italic", color: alert }}>Financial Services.</em>
        </h1>
        <p style={{ maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: T.dim, fontWeight: 300 }}>
          The vertical where AI fraud lands first. Wire transfer authority, deepfake-exposed executives, and cyber insurance carriers reshaping the buying process. Financial services is where the ROI math is the cleanest and the compelling events arrive uninvited.
        </p>
      </div>

      {/* Key Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: `1px solid ${T.line}` }}>
        {[["$25M", "Arup Deepfake Loss (Feb 2024)"], ["$6.08M", "Avg FinServ Breach (IBM 2024)"], ["$2.9B", "Annual BEC Losses (FBI IC3)"], ["68%", "Breaches w/ Human Element"]].map(([n, l], i) => (
          <div key={i} style={{ padding: "28px 24px", borderRight: i < 3 ? `1px solid ${T.line}` : "none" }}>
            <div style={{ fontFamily: T.serif, fontSize: 44, lineHeight: 1, marginBottom: 8, color: i === 0 ? alert : T.text }}>{n}</div>
            <div style={{ fontFamily: T.mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: T.mute }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Why FinServ */}
      <SectionHeader num="01" title="Why Financial Services First" subtitle="The vertical where AI fraud lands first — and pays best to defend." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, paddingBottom: 80 }}>
        <div>
          <p style={{ fontFamily: T.serif, fontSize: 26, lineHeight: 1.4, marginBottom: 20 }}>
            In February 2024, an Arup finance employee in Hong Kong joined a video call. Every face on the screen was a deepfake. By the time the meeting ended, <em style={{ color: alert, fontStyle: "italic" }}>$25 million</em> had been wired to attacker-controlled accounts.
          </p>
          <p style={{ fontFamily: T.serif, fontSize: 22, lineHeight: 1.45, color: T.dim }}>
            Arup is now the canonical board-deck slide for every CFO and CISO in financial services. The math is no longer abstract — one successful deepfake equals an existential event. That's the buyer-readiness shift Adaptive monetizes.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: T.line, border: `1px solid ${T.line}` }}>
          {[
            ["Wire transfer authority concentration", "Finance, treasury, and exec assistants control flows that attackers can monetize instantly. One successful vish = $1M+ event."],
            ["Public executives = deepfake training data", "Bank CEOs and CFOs do interviews, earnings calls, conferences. Hours of voice and video are publicly available — pre-built attacker training data."],
            ["Cyber insurance is driving the buy", "Underwriters now require demonstrable SAT programs. Premiums and deductibles are tied to maturity. Adaptive's reporting is built for the renewal conversation."],
            ["SEC disclosure adds personal stakes", "Cyber incident disclosure rules (Dec 2023) put human-error breaches on the 8-K. CISOs and CFOs are personally exposed in ways they weren't 24 months ago."],
          ].map(([title, desc], i) => (
            <div key={i} style={{ background: T.bg2, padding: 24 }}>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: alert, marginBottom: 6 }}>DRIVER · 0{i + 1}</div>
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 6, color: T.text }}>{title}</div>
              <div style={{ fontSize: 13, color: T.dim, lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Model */}
      <SectionHeader num="02" title="The Math" subtitle="One avoided BEC pays for years of Adaptive. Here's the model." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, paddingBottom: 80 }}>
        <div style={{ background: T.bg2, border: `1px solid ${T.line}`, padding: 32 }}>
          <div style={{ fontFamily: T.mono, fontSize: 10, color: alert, letterSpacing: "0.08em", marginBottom: 20 }}>ROI PILLAR 01 — BREACH COST AVOIDANCE</div>
          <div style={{ fontFamily: T.serif, fontSize: 48, lineHeight: 1, marginBottom: 16 }}>$6.08M<small style={{ fontSize: 20, color: T.dim }}>/avg incident</small></div>
          <p style={{ fontSize: 14, color: T.dim, lineHeight: 1.6, marginBottom: 20 }}>IBM 2024 reports average financial services breach cost at $6.08M. Reducing click rate from ~17% baseline toward sub-3% materially reduces breach probability. The expected-value math is the entire ROI conversation.</p>
          <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: 16 }}>
            {[["Baseline click rate", "~17% (industry avg)"], ["Adaptive 12-mo target", "<3%"], ["Avg FinServ breach cost", "$6.08M"], ["Healthcare breach cost", "$9.77M"]].map(([loc, sav], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${T.line}`, fontFamily: T.mono, fontSize: 12 }}>
                <span style={{ color: T.dim }}>{loc}</span>
                <span style={{ color: T.text }}>{sav}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: T.mute, lineHeight: 1.5, marginTop: 12, fontStyle: "italic" }}>Source: IBM Cost of a Data Breach 2024. Click rate baselines are industry-published estimates.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ background: T.bg2, border: `1px solid ${T.line}`, padding: 32, flex: 1 }}>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: alert, letterSpacing: "0.08em", marginBottom: 16 }}>ROI PILLAR 02 — CYBER INSURANCE IMPACT</div>
            <div style={{ fontFamily: T.serif, fontSize: 36, lineHeight: 1, marginBottom: 12 }}>5–15% premium impact</div>
            <p style={{ fontSize: 14, color: T.dim, lineHeight: 1.6 }}>Carriers increasingly require mature SAT programs as a renewal condition. Adaptive's risk scoring and board-grade reporting strengthen renewal posture. Premium impact is carrier-dependent — directional only.</p>
          </div>
          <div style={{ background: T.bg2, border: `1px solid ${T.line}`, padding: 32, flex: 1 }}>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: alert, letterSpacing: "0.08em", marginBottom: 16 }}>ROI PILLAR 03 — ADMIN TIME RECOVERY</div>
            <div style={{ fontFamily: T.serif, fontSize: 36, lineHeight: 1, marginBottom: 12 }}>0.25–0.5 FTE freed</div>
            <p style={{ fontSize: 14, color: T.dim, lineHeight: 1.6 }}>AI Content Creator collapses custom campaign authoring from hours to minutes. Automated risk-based remediation eliminates manual program management. For a 5K-employee org, typically 0.25-0.5 FTE of recovered capacity.</p>
          </div>
        </div>
      </div>

      {/* Four-Tier Account Strategy */}
      <SectionHeader num="03" title="Four-Tier Account Strategy" subtitle="Direct enterprise at three levels — plus channel via cyber insurance." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, paddingBottom: 24 }}>
        <TierCard
          tier="TIER 01 / MONEY-CENTER BANKS"
          acv="50,000+ EMPLOYEES"
          name="Tier 1 Banks & Wealth Managers"
          desc="Largest financial institutions. Public executives, global wire transfer flows, board-level cyber scrutiny. Long cycles but landmark deals."
          targets={["JPMorgan Chase", "Bank of America", "Wells Fargo", "Citi", "Goldman Sachs", "Morgan Stanley", "BlackRock"]}
          whyItems={[
            "Public C-suite = canonical deepfake training data already exists on the open web",
            "Trillions in daily wire flows = single successful vish is materially financial",
            "Cyber insurance + reg pressure (OCC, FRB, FDIC) drive demonstrable program maturity",
            "Board exposure under SEC cyber disclosure rules is now personal for the CISO and CFO",
          ]}
          personas="CISO, CIO, CRO, CFO"
          cycle="12–18 mo"
          entry="Executive briefing + threat-readiness benchmark"
          featured={true}
        />
        <TierCard
          tier="TIER 02 / FINTECH"
          acv="500–10K EMPLOYEES"
          name="Fintech & Digital Finance"
          desc="Faster cycles, modern security posture, already on cloud SAT. AI-forward boards. Several already in Adaptive's customer base."
          targets={["Plaid ✓", "Ramp ✓", "PayPal ✓", "NerdWallet ✓", "Stripe", "Block", "Robinhood", "Affirm"]}
          whyItems={[
            "Four named customers already in vertical — expand from initial deployment to enterprise-wide rollout",
            "Fintechs run lean security teams — Adaptive's automation eliminates admin headcount needed for KnowBe4",
            "AI-forward leadership understands the threat vector intuitively — short proof-of-concept conversations",
            "Many already feel deepfake exposure personally — founders and execs are public figures",
          ]}
          personas="CISO, Security Awareness Mgr"
          cycle="60–120 days"
          entry="Customer reference + deepfake demo"
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, paddingBottom: 80 }}>
        <TierCard
          tier="TIER 03 / REGIONAL & COMMUNITY"
          acv="500–5K EMPLOYEES"
          name="Regional Banks & Credit Unions"
          desc="High volume, fast cycles, underserved by enterprise SAT vendors. Cyber insurance pressure is acute at this scale."
          targets={["Regional banks", "Credit unions", "Community banks", "RIAs", "Wealth platforms"]}
          whyItems={[
            "Smaller security teams = Adaptive's low-admin model is differentially valuable",
            "Cyber insurance premiums hit harder at this scale — Adaptive's reporting unlocks better renewal terms",
            "Regional banks see frequent vishing attempts against branch staff — pain is daily, not theoretical",
            "Faster decision-making — CISO often reports directly to CEO, no committee gridlock",
          ]}
          personas="CISO, CIO, IT Director"
          cycle="45–90 days"
          entry="Dollar math + 30-day pilot"
        />
        <TierCard
          tier="TIER 04 / INSURANCE CHANNEL"
          acv="EMBEDDED DISTRIBUTION"
          name="Cyber Insurance Carriers & Brokers"
          desc="Not direct sales — carriers and brokers driving SAT adoption as a renewal requirement. One partnership unlocks hundreds of co-sell opportunities."
          targets={["Beazley", "Coalition", "At-Bay", "Resilience", "Marsh", "Aon", "WTW", "Lockton"]}
          whyItems={[
            "Carriers are gating renewals on SAT maturity — they need to recommend a provider",
            "Brokers want to bring their book of business a defensible, modern SAT solution",
            "Co-marketing into the carrier's policyholder base is the cheapest mid-market pipeline source",
            "Adaptive's risk scoring + reporting maps directly to underwriting data carriers want",
          ]}
          personas="VP Cyber, Underwriting, Brokers"
          cycle="3–9 mo to signed"
          entry="Co-build + revenue share"
        />
      </div>

      {/* Competitive Positioning */}
      <SectionHeader num="04" title="Competitive Landscape" subtitle="Who else is selling SAT into financial services — and where we win." />
      <div style={{ overflowX: "auto", border: `1px solid ${T.line}`, marginBottom: 36 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 700 }}>
          <thead>
            <tr>
              {["Capability", "Adaptive", "KnowBe4", "Proofpoint", "Hoxhunt", "Cofense"].map((h, i) => (
                <th key={i} style={{
                  textAlign: "left", padding: "12px 16px", background: T.bg3, fontFamily: T.mono, fontSize: 11, color: T.dim, letterSpacing: "0.04em", fontWeight: 500,
                  borderBottom: `1px solid ${T.line}`, borderRight: i < 5 ? `1px solid ${T.line}` : "none",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Deepfake video simulation", ["Native", "w"], ["None", "l"], ["None", "l"], ["None", "l"], ["None", "l"]],
              ["Voice/vishing simulation", ["Native AI personas", "w"], ["Limited", "l"], ["Limited", "l"], ["None", "l"], ["None", "l"]],
              ["SMS/smishing simulation", ["Native", "w"], ["Yes", "n"], ["Yes", "n"], ["Limited", "l"], ["None", "l"]],
              ["OSINT-powered spearphish", ["Native", "w"], ["Manual", "l"], ["Manual", "l"], ["Manual", "l"], ["Manual", "l"]],
              ["AI Content Creator", ["Minutes", "w"], ["Hours/days", "l"], ["Hours/days", "l"], ["Hours", "l"], ["Hours", "l"]],
              ["Executive exposure monitoring", ["OSINT + creds", "w"], ["None", "l"], ["None", "l"], ["None", "l"], ["None", "l"]],
              ["Behavior-change measurement", ["Risk-score driven", "w"], ["Completion", "l"], ["Completion", "n"], ["Gamified", "n"], ["Report-based", "n"]],
              ["Compliance content depth", ["Strong", "n"], ["Deepest library", "w"], ["Strong", "n"], ["Moderate", "n"], ["Narrow", "l"]],
              ["Phish reporting + triage", ["Native", "n"], ["Add-on", "n"], ["Bundled", "w"], ["Limited", "l"], ["Strongest in market", "w"]],
              ["Employee NPS / engagement", ["94 (Adaptive published)", "w"], ["Moderate", "n"], ["Low", "l"], ["High (gamification)", "n"], ["Moderate", "n"]],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => {
                  const val = Array.isArray(cell) ? cell[0] : cell;
                  const badge = Array.isArray(cell) ? cell[1] : null;
                  const bgColor = ci === 1 && badge === "w" ? alertDim : "transparent";
                  const badgeStyle = badge === "w" ? { background: "rgba(255,107,107,0.15)", color: alert }
                    : badge === "l" ? { background: "rgba(255,69,69,0.1)", color: T.red }
                    : null;
                  return (
                    <td key={ci} style={{ padding: "12px 16px", borderBottom: `1px solid ${T.line}`, borderRight: ci < 5 ? `1px solid ${T.line}` : "none", background: bgColor, fontWeight: ci === 0 ? 500 : 400, color: ci === 0 ? T.text : T.dim }}>
                      {badgeStyle ? <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 3, fontFamily: T.mono, fontSize: 11, fontWeight: 500, ...badgeStyle }}>{val}</span> : val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, paddingBottom: 80 }}>
        <div style={{ padding: 24, background: T.bg2, borderLeft: `2px solid ${alert}` }}>
          <div style={{ fontFamily: T.mono, fontSize: 10, color: alert, marginBottom: 10, letterSpacing: "0.08em" }}>KEY WIN NARRATIVE</div>
          <p style={{ fontSize: 14, color: T.dim, lineHeight: 1.6 }}>KnowBe4 and Proofpoint were built when phishing was 99% text email. Attackers have moved on. No legacy platform offers native deepfake video simulation, hyperrealistic AI voice phishing, or OSINT-powered spearphish at the depth Adaptive does. The financial services CISO can no longer defensibly tell the board "we have SAT" when their SAT doesn't test the threat vectors they're actually being hit with.</p>
        </div>
        <div style={{ padding: 24, background: T.bg2, borderLeft: `2px solid ${T.accent}` }}>
          <div style={{ fontFamily: T.mono, fontSize: 10, color: T.accent, marginBottom: 10, letterSpacing: "0.08em" }}>IN-VERTICAL REFERENCE CUSTOMERS</div>
          <p style={{ fontSize: 14, color: T.dim, lineHeight: 1.6, marginBottom: 16 }}>Four named financial services / fintech customers already deployed — the most powerful asset in enterprise FinServ sales.</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Plaid", "Ramp", "PayPal", "NerdWallet"].map((c) => (
              <span key={c} style={{ fontFamily: T.mono, fontSize: 11, padding: "6px 14px", background: "rgba(0,212,255,0.08)", border: `1px solid rgba(0,212,255,0.2)`, borderRadius: 100, color: T.accent }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Entry Playbook */}
      <SectionHeader num="05" title="Entry Playbook by Tier" subtitle="Different buyers, different motions, different timelines." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: `1px solid ${T.line}`, marginBottom: 24 }}>
        {[
          {
            tier: "TIER 01 — MONEY-CENTER", title: "Benchmark & Brief", color: alert,
            steps: [
              "Lead with AI threat-readiness benchmark vs. their incumbent SAT",
              "Pre-build an executive exposure scan on their top 10 public C-suite — show actual OSINT findings as the opening artifact",
              "Run a deepfake demo for the CISO using their CEO's public voice/video data",
              "Staff with AE + SE + exec sponsor from day one",
              "Target CISO + CRO + CFO — three-buyer alignment for $500K+ ACV",
            ]
          },
          {
            tier: "TIER 02 — FINTECH", title: "Reference & Deploy", color: alert,
            steps: [
              "Lead with named in-vertical customer reference (Plaid, Ramp, PayPal, NerdWallet)",
              "Offer fast deployment — 14 days from signed to first campaign live",
              "ROI model built with THEIR data (employee count, current SAT spend, recent incidents)",
              "Pilot one BU, expand on click-rate proof",
              "Target CISO directly — decision often made at CISO level, no board approval needed",
            ]
          },
        ].map((phase, i) => (
          <div key={i} style={{ padding: 32, borderRight: i < 1 ? `1px solid ${T.line}` : "none", borderBottom: `1px solid ${T.line}`, background: T.bg2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: alert, boxShadow: `0 0 0 3px rgba(255,107,107,0.15)` }} />
              <span style={{ fontFamily: T.mono, fontSize: 11, color: T.dim }}>{phase.tier}</span>
            </div>
            <div style={{ fontFamily: T.serif, fontSize: 28, lineHeight: 1, marginBottom: 6 }}>{phase.title}</div>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: alert, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>ENTRY STRATEGY</div>
            {phase.steps.map((item, j) => (
              <div key={j} style={{ padding: "10px 0", borderBottom: `1px solid ${T.line}`, fontSize: 13, color: T.dim, lineHeight: 1.5, display: "flex", gap: 10 }}>
                <span style={{ fontFamily: T.mono, fontSize: 10, color: T.mute, flexShrink: 0, minWidth: 16 }}>{j + 1}</span>{item}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: `1px solid ${T.line}`, borderTop: "none", marginBottom: 80 }}>
        {[
          {
            tier: "TIER 03 — REGIONAL", title: "Math & Speed", color: alert,
            steps: [
              "Lead with cyber insurance angle — frame Adaptive as the SAT carriers want to see",
              "Reference a similar institution (peer bank, peer credit union)",
              "Offer 30-day pilot with zero-risk exit",
              "Sell to the CISO directly — one person owns the call",
              "Close in 45-90 days — fastest path to case studies and reference logos",
            ]
          },
          {
            tier: "TIER 04 — INSURANCE CHANNEL", title: "Embed & Scale", color: alert,
            steps: [
              "Carriers (Beazley, Coalition, At-Bay, Resilience): structure a co-marketing partnership — Adaptive as the recommended SAT in renewal conversations",
              "Brokers (Marsh, Aon, WTW, Lockton): equip their cyber practice with Adaptive demo materials for their book",
              "Co-build a 'threat readiness benchmark' deliverable that brokers use as a conversation starter with policyholders",
              "Revenue share or referral fee structure — keep economics aligned to broker incentives",
              "Target: 30% of mid-market pipeline through insurance channel within 12 months",
            ]
          },
        ].map((phase, i) => (
          <div key={i} style={{ padding: 32, borderRight: i < 1 ? `1px solid ${T.line}` : "none", background: T.bg2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: alert, boxShadow: `0 0 0 3px rgba(255,107,107,0.15)` }} />
              <span style={{ fontFamily: T.mono, fontSize: 11, color: T.dim }}>{phase.tier}</span>
            </div>
            <div style={{ fontFamily: T.serif, fontSize: 28, lineHeight: 1, marginBottom: 6 }}>{phase.title}</div>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: alert, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>ENTRY STRATEGY</div>
            {phase.steps.map((item, j) => (
              <div key={j} style={{ padding: "10px 0", borderBottom: `1px solid ${T.line}`, fontSize: 13, color: T.dim, lineHeight: 1.5, display: "flex", gap: 10 }}>
                <span style={{ fontFamily: T.mono, fontSize: 10, color: T.mute, flexShrink: 0, minWidth: 16 }}>{j + 1}</span>{item}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Partnership Models */}
      <SectionHeader num="06" title="Partnership Structures" subtitle="Three models for Tier 4 — each with different economics and control." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, paddingBottom: 24 }}>
        {[
          {
            model: "CARRIER PARTNERSHIP",
            title: "Recommended SAT Provider",
            desc: "Cyber insurance carrier names Adaptive in renewal guidance and policyholder communications. Adaptive becomes the carrier-preferred SAT.",
            fit: "Beazley, Coalition, At-Bay, Resilience",
            economics: "Lower per-deal margin, but carrier-driven mid-market pipeline at scale. Most efficient channel CAC.",
            icon: "◉",
          },
          {
            model: "BROKER ENABLEMENT",
            title: "Equip the Cyber Practice",
            desc: "Cyber brokers (Marsh, Aon, WTW, Lockton) get Adaptive materials to bring to policyholder cyber conversations. Adaptive trains their practice teams.",
            fit: "Marsh, Aon, WTW, Lockton, Gallagher",
            economics: "Moderate ACV, maintains deal control. Brokers earn referral fees. Strong for enterprise FinServ where brokers own the relationship.",
            icon: "◆",
          },
          {
            model: "BUNDLED RENEWAL",
            title: "Built Into Policy",
            desc: "Carrier offers Adaptive at preferred pricing as part of cyber policy renewal. Policyholder activates with one click. Carrier subsidizes a portion.",
            fit: "Forward-leaning carriers piloting bundled cyber services",
            economics: "Highest scale model, longest to structure. Creates carrier lock-in to Adaptive. Future-state — pursue as a 2027+ initiative.",
            icon: "◈",
          },
        ].map((m, i) => (
          <div key={i} style={{ background: T.bg2, border: `1px solid ${T.line}`, padding: 28, position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontFamily: T.mono, fontSize: 18, color: alert }}>{m.icon}</span>
              <span style={{ fontFamily: T.mono, fontSize: 10, color: alert, letterSpacing: "0.05em" }}>{m.model}</span>
            </div>
            <h3 style={{ fontFamily: T.serif, fontSize: 24, lineHeight: 1.1, marginBottom: 12, fontWeight: 400 }}>{m.title}</h3>
            <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.55, marginBottom: 20 }}>{m.desc}</p>
            <div style={{ fontFamily: T.mono, fontSize: 9, color: T.mute, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>BEST FIT PARTNERS</div>
            <p style={{ fontSize: 12, color: T.text, marginBottom: 16, fontFamily: T.mono }}>{m.fit}</p>
            <div style={{ fontFamily: T.mono, fontSize: 9, color: T.mute, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>ECONOMICS</div>
            <p style={{ fontSize: 12, color: T.dim, lineHeight: 1.5 }}>{m.economics}</p>
          </div>
        ))}
      </div>

      {/* Spotlight: Executive Exposure Service */}
      <div style={{ padding: 32, background: T.bg2, border: `1px solid ${alert}`, marginBottom: 80, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 32, top: "50%", transform: "translateY(-50%)", opacity: 0.15 }}>
          <span style={{ fontFamily: T.serif, fontSize: 120, color: alert }}>→</span>
        </div>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: alert, letterSpacing: "0.08em", marginBottom: 12 }}>OPENING ARTIFACT</div>
        <h3 style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 400, lineHeight: 1.1, marginBottom: 12, maxWidth: "70%" }}>The Executive Exposure Report</h3>
        <p style={{ fontSize: 15, color: T.dim, lineHeight: 1.6, maxWidth: "70%", marginBottom: 16 }}>
          Before the first call, build a free OSINT scan of the prospect's top 10 executives. Public voice clips, video appearances, credential breach exposure, social engineering vectors. Bring it to the meeting as evidence — not a pitch deck. CISOs and CROs at Tier 1 banks don't sit through demos. They sit through threat intelligence about their own org.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["OSINT voice/video clips", "Credential breach exposure", "Impersonation vectors", "Wire transfer attack surface"].map((c) => (
            <span key={c} style={{ fontFamily: T.mono, fontSize: 11, padding: "6px 14px", background: alertDim, border: `1px solid rgba(255,107,107,0.25)`, borderRadius: 100, color: alert }}>{c}</span>
          ))}
        </div>
      </div>

      {/* Why Now */}
      <SectionHeader num="07" title="Why Now" subtitle="The buyer-readiness window for FinServ SAT replacement is open right now." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: T.line, border: `1px solid ${T.line}` }}>
        {[
          ["SEC Cyber Rules", "Dec 2023", "Cyber incident 8-K disclosure now mandatory — CISOs personally exposed"],
          ["Arup Deepfake", "Feb 2024", "$25M loss — canonical board-deck slide for every CFO in finance"],
          ["AI Phishing YoY", "+1,265%", "Industry-reported growth in AI-generated phishing volume"],
          ["FBI BEC Loss", "$2.9B+", "Annual reported BEC losses in the US, increasingly AI-assisted"],
        ].map(([l, v, n], i) => (
          <div key={i} style={{ background: T.bg2, padding: "28px 24px" }}>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.mute, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>{l}</div>
            <div style={{ fontFamily: T.serif, fontSize: 48, lineHeight: 1, marginBottom: 10, color: i === 0 ? alert : T.text }}>{v}</div>
            <div style={{ fontSize: 11, color: T.dim, lineHeight: 1.45 }}>{n}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", padding: "64px 0 0", color: T.mute, fontFamily: T.mono, fontSize: 10, letterSpacing: "0.05em" }}>
        ADAPTIVE FOR FINANCIAL SERVICES · VERTICAL GTM STRATEGY · MAY 2026 · INTERNAL / CONFIDENTIAL
      </div>
    </div>
  );
}

/* ───────── NAV STYLES ───────── */
const navBtn = (active) => ({
  fontFamily: T.mono, fontSize: 11, letterSpacing: "0.02em",
  padding: "6px 14px", borderRadius: 4,
  background: active ? "rgba(0,212,255,0.1)" : "transparent",
  color: active ? T.accent : T.dim,
  border: active ? "1px solid rgba(0,212,255,0.2)" : "1px solid transparent",
  cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
});

/* ───────── MAIN APP ───────── */
export default function Home() {
  const [page, setPage] = useState("home");

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentAgent = AGENTS.find((a) => a.id === page);

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.sans, WebkitFontSmoothing: "antialiased", position: "relative" }}>
      {/* Grain */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", opacity: 0.3, zIndex: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Top Bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(10,10,10,0.88)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div onClick={() => navigate("home")} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: T.mono, fontSize: 12, fontWeight: 500, cursor: "pointer", color: T.text }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.accent, boxShadow: `0 0 10px ${T.accent}` }} />
            <span>ADAPTIVE / GTM_HUB</span>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center", overflowX: "auto" }}>
            <button style={navBtn(page === "home")} onClick={() => navigate("home")}>Hub</button>
            {AGENTS.map((a) => (<button key={a.id} style={navBtn(page === a.id)} onClick={() => navigate(a.id)}>{a.short}</button>))}
            <button style={{ ...navBtn(page === "playbook"), ...(page !== "playbook" ? { borderColor: "rgba(0,212,255,0.15)", color: T.accent } : {}) }} onClick={() => navigate("playbook")}>Playbook</button>
            <button style={{ ...navBtn(page === "finance"), ...(page !== "finance" ? { borderColor: "rgba(255,107,107,0.15)", color: "#ff6b6b" } : { background: "rgba(255,107,107,0.1)", color: "#ff6b6b", borderColor: "rgba(255,107,107,0.2)" }) }} onClick={() => navigate("finance")}>Finance</button>
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 10, color: T.mute }}>MAY 2026</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2 }}>
        {page === "home" && <HomePage onNavigate={navigate} />}
        {page === "playbook" && <PlaybookPage />}
        {page === "finance" && <FinancePage />}
        {currentAgent && <AgentPage agent={currentAgent} />}
      </div>
    </div>
  );
}
