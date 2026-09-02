import {
  ContentSource,
  ContentIR,
  WorkflowPlan,
  GeneratedAssetsPackage,
  ProofFlowReport,
  PublishingScheduleItem,
  CreatorProfile,
  AutomationRule,
  AnalyticsSummary
} from '../types';

export const DEFAULT_CREATOR_PROFILE: CreatorProfile = {
  name: "Alex Vance",
  handle: "@alexvance_dev",
  role: "AI Systems Architect & Founder",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
  niche: "AI Infrastructure & High-Velocity Engineering",
  tone: "Technical, Direct, High-Signal, No-Fluff",
  toneSliders: {
    technicalVsBeginner: 85,
    conciseVsDetailed: 70,
    humorousVsSerious: 40
  },
  forbiddenBuzzwords: [
    "game-changer",
    "supercharge",
    "revolutionize",
    "mind-blowing",
    "delve",
    "in today's fast-paced world",
    "synergy",
    "unleash"
  ],
  memoryFacts: [
    "Serving 4.2M daily completions across enterprise clusters",
    "Reduced CI/CD build cycle times from 20m down to 4m (-80%)",
    "Trimmed monthly Cloud bills from $14.2K to $5.8K (-59%)",
    "Decoupled 8GB model checkpoints into lazy-loaded SSD buckets",
    "Philosophy: 'If your feedback loop takes >5 mins, engineers lose flow'"
  ],
  voiceProfile: {
    tone: ["Direct", "Technical", "Pragmatic", "High-Signal", "Transparent"],
    pacing: "Rapid, punchy paragraphs with numbered steps",
    technicalDepth: "Staff/Principal Engineer Level (Concrete code, architectures, benchmarks)",
    vocabulary: ["Latency", "Throughput", "P99", "Edge inference", "Orchestration", "Determinism", "Decoupled"],
    bannedPhrases: [
      "In today's fast-paced world",
      "Game-changer",
      "Supercharge",
      "Buckle up",
      "Revolutionize the landscape",
      "Mind-blowing"
    ]
  },
  audienceProfile: {
    primarySegment: "Technical Founders & Senior Software Engineers",
    personas: [
      "AI Infrastructure Engineers building production LLM stacks",
      "Bootstrapped SaaS founders seeking lean DevOps leverage",
      "Engineering managers optimizing deployment pipelines"
    ],
    painPoints: [
      "LLM latency bottlenecks and non-deterministic failures",
      "High GPU compute bills with low utilization",
      "Bloated CI/CD build times stalling release velocity"
    ]
  },
  winningThemes: [
    { theme: "AI Infrastructure & Latency", historicalMultiplier: 2.18, totalAssets: 42, recommendedFrequency: "2x / week" },
    { theme: "DevOps & Build Acceleration", historicalMultiplier: 1.84, totalAssets: 28, recommendedFrequency: "1x / week" },
    { theme: "Bootstrapping in Public", historicalMultiplier: 1.55, totalAssets: 19, recommendedFrequency: "1x / week" },
    { theme: "Multi-Agent System Architecture", historicalMultiplier: 1.92, totalAssets: 31, recommendedFrequency: "1x / week" }
  ]
};

export const SAMPLE_SOURCES: ContentSource[] = [
  {
    id: "src_startup_deploy",
    title: "How I Scaled Our AI Pipeline: 20-Min to 4-Min Deployments",
    type: "video",
    duration: "14:28",
    durationSec: 868,
    uploadDate: "2026-09-02",
    speakerName: "Alex Vance",
    topics: ["AI Infrastructure", "CI/CD Optimization", "Container Caching", "Developer Velocity", "Cloud Run"],
    rawText: `00:00 - Hey everyone, Alex here. Today I'm breaking down the exact architectural overhaul we did to drop our AI service deployment pipeline from twenty minutes down to four minutes.
01:15 - When we started six months ago, every developer push triggered a massive 8GB container rebuild that bundled model checkpoints and Python runtime wheels from scratch.
03:14 - We measured our cycle time and realized that deployment time was dragging at 20 minutes per PR, causing severe merge queue congestion.
04:02 - Step one was decoupling our model checkpoint storage from the application image layer into lazy-loaded persistent SSD buckets.
05:30 - We also implemented multi-stage Docker build caching and pinned Debian dependencies.
07:12 - Right now, we're experimenting with AI routing layers to dynamically tier our GPU workloads across cold and warm instances.
08:45 - The result was immediate: our deployment time dropped from twenty minutes to four minutes, an 80% reduction in cycle time.
10:15 - We also trimmed our Cloud compute bill from $14,200 a month down to $5,800 a month while serving over 4.2 million daily completions.
11:42 - My philosophy has always been: 'If your feedback loop takes more than five minutes, your engineers lose cognitive flow.'
13:10 - In the next sprint, we plan to open-source our pipeline caching script. Let's get into the step-by-step benchmark breakdown.`,
    transcript: [
      { id: "t1", startSec: 0, endSec: 75, timestamp: "00:00–01:15", speaker: "Alex", text: "Hey everyone, Alex here. Today I'm breaking down the exact architectural overhaul we did to drop our AI service deployment pipeline from twenty minutes down to four minutes." },
      { id: "t2", startSec: 75, endSec: 194, timestamp: "01:15–03:14", speaker: "Alex", text: "When we started six months ago, every developer push triggered a massive 8GB container rebuild that bundled model checkpoints and Python runtime wheels from scratch." },
      { id: "t3", startSec: 194, endSec: 242, timestamp: "03:14–04:02", speaker: "Alex", text: "We measured our cycle time and realized that deployment time was dragging at 20 minutes per PR, causing severe merge queue congestion." },
      { id: "t4", startSec: 242, endSec: 330, timestamp: "04:02–05:30", speaker: "Alex", text: "Step one was decoupling our model checkpoint storage from the application image layer into lazy-loaded persistent SSD buckets." },
      { id: "t5", startSec: 330, endSec: 432, timestamp: "05:30–07:12", speaker: "Alex", text: "We also implemented multi-stage Docker build caching and pinned Debian dependencies across our arm64 builders." },
      { id: "t6", startSec: 432, endSec: 525, timestamp: "07:12–08:45", speaker: "Alex", text: "Right now, we're experimenting with AI routing layers to dynamically tier our GPU workloads across cold and warm instances." },
      { id: "t7", startSec: 525, endSec: 615, timestamp: "08:45–10:15", speaker: "Alex", text: "The result was immediate: our deployment time dropped from twenty minutes to four minutes, an 80% reduction in cycle time." },
      { id: "t8", startSec: 615, endSec: 702, timestamp: "10:15–11:42", speaker: "Alex", text: "We also trimmed our Cloud compute bill from $14,200 a month down to $5,800 a month while serving over 4.2 million daily completions." },
      { id: "t9", startSec: 702, endSec: 790, timestamp: "11:42–13:10", speaker: "Alex", text: "My philosophy has always been: 'If your feedback loop takes more than five minutes, your engineers lose cognitive flow.'" },
      { id: "t10", startSec: 790, endSec: 868, timestamp: "13:10–14:28", speaker: "Alex", text: "In the next sprint, we plan to open-source our pipeline caching script. Let's get into the step-by-step benchmark breakdown." }
    ]
  },
  {
    id: "src_agent_architecture",
    title: "Multi-Agent System Architecture in 2026: Lessons from 100M Requests",
    type: "video",
    duration: "18:50",
    durationSec: 1130,
    uploadDate: "2026-08-28",
    speakerName: "Alex Vance",
    topics: ["Multi-Agent Orchestration", "State Management", "Deterministic Guardrails", "Token Optimization"],
    rawText: `00:00 - Multi-agent systems fail in production when you treat agents as chat bots instead of state machines.
03:20 - Over the last year, we served 100M production agent tool calls across our enterprise customer base.
06:40 - The single biggest latency bottleneck was cascading sequential tool execution without early exit conditions.
09:15 - By introducing a shared Intermediate Representation (IR) state bus, we reduced redundant token re-generation by 43%.
12:30 - Always enforce schema validation at the tool boundary before executing arbitrary sub-agent operations.
16:00 - Treat agent handoffs like deterministic RPC calls rather than conversational chatter.`,
    transcript: [
      { id: "ma1", startSec: 0, endSec: 200, timestamp: "00:00–03:20", speaker: "Alex", text: "Multi-agent systems fail in production when you treat agents as chat bots instead of state machines." },
      { id: "ma2", startSec: 200, endSec: 400, timestamp: "03:20–06:40", speaker: "Alex", text: "Over the last year, we served 100M production agent tool calls across our enterprise customer base." },
      { id: "ma3", startSec: 400, endSec: 555, timestamp: "06:40–09:15", speaker: "Alex", text: "The single biggest latency bottleneck was cascading sequential tool execution without early exit conditions." },
      { id: "ma4", startSec: 555, endSec: 750, timestamp: "09:15–12:30", speaker: "Alex", text: "By introducing a shared Intermediate Representation (IR) state bus, we reduced redundant token re-generation by 43%." }
    ]
  },
  {
    id: "src_saas_bootstrap",
    title: "Bootstrapping an AI Developer Tool to $2.4M ARR with 3 Engineers",
    type: "podcast",
    duration: "24:10",
    durationSec: 1450,
    uploadDate: "2026-08-20",
    speakerName: "Alex Vance",
    topics: ["Bootstrapping", "SaaS Metrics", "Developer Marketing", "Lean Team"],
    rawText: `00:00 - We crossed $2.4M in annual recurring revenue this quarter with zero venture funding and just three engineers.
04:10 - Our distribution engine was simple: build high-value CLI tools in public and document our architecture failures.
08:20 - Retention jumped from 68% to 92% the moment we introduced local sandbox offline support.`,
    transcript: [
      { id: "bs1", startSec: 0, endSec: 250, timestamp: "00:00–04:10", speaker: "Alex", text: "We crossed $2.4M in annual recurring revenue this quarter with zero venture funding and just three engineers." },
      { id: "bs2", startSec: 250, endSec: 500, timestamp: "04:10–08:20", speaker: "Alex", text: "Our distribution engine was simple: build high-value CLI tools in public and document our architecture failures." }
    ]
  }
];

export const INITIAL_CONTENT_IR: ContentIR = {
  sourceId: "src_startup_deploy",
  title: "How I Scaled Our AI Pipeline: 20-Min to 4-Min Deployments",
  summary: "A technical architectural breakdown of optimizing an AI container deployment pipeline. By decoupling 8GB model checkpoints into lazy-loaded SSD volumes and implementing multi-stage caching, cycle time dropped by 80% (from 20 minutes to 4 minutes) and monthly cloud infrastructure spend was reduced from $14.2K to $5.8K.",
  keyInsights: [
    "Decoupling static model checkpoints from Docker images prevents multi-gigabyte layer rebuilds on every PR.",
    "Cycle time was reduced from 20 minutes to 4 minutes (80% drop), unblocking developer flow.",
    "Monthly cloud infrastructure bills decreased from $14,200 to $5,800 while sustaining 4.2M daily completions.",
    "Cognitive flow degrades significantly when CI/CD cycle times exceed 5 minutes."
  ],
  topics: [
    "AI Infrastructure",
    "CI/CD Optimization",
    "Docker Multi-Stage Caching",
    "Cloud Run Cost Reduction",
    "Developer Flow State"
  ],
  statistics: [
    { label: "Deployment Time", value: "20m → 4m (-80%)", context: "PR build and deploy cycle time" },
    { label: "Cloud Spend", value: "$14.2K → $5.8K (-59%)", context: "Monthly infrastructure compute cost" },
    { label: "Daily Throughput", value: "4.2M completions/day", context: "Production traffic volume" },
    { label: "Container Size", value: "8GB down to 340MB", context: "Base image footprint" }
  ],
  controversialOpinions: [
    "Bundling model weights inside application Docker images is an anti-pattern in production AI engineering.",
    "Engineers should refuse merge queues with build times over 5 minutes because context switching destroys velocity."
  ],
  hooks: [
    {
      id: "h1",
      hookText: "If your deployment takes more than 5 minutes, you aren't waiting on CI—you're losing your best engineers.",
      hookType: "contrarian",
      estimatedRetentionMultiplier: 1.45,
      timestamp: "11:42"
    },
    {
      id: "h2",
      hookText: "Here is how we shaved 16 minutes off every single AI build and saved $8,400/month.",
      hookType: "statistic",
      estimatedRetentionMultiplier: 1.38,
      timestamp: "00:00"
    },
    {
      id: "h3",
      hookText: "Stop baking 8GB model checkpoints into Docker layers. Do this instead.",
      hookType: "challenge",
      estimatedRetentionMultiplier: 1.52,
      timestamp: "04:02"
    }
  ],
  quotes: [
    {
      id: "q1",
      quote: "If your feedback loop takes more than five minutes, your engineers lose cognitive flow.",
      speaker: "Alex Vance",
      timestamp: "11:42–12:05",
      startSec: 702,
      endSec: 725,
      context: "Discussing engineering ergonomics and developer flow retention",
      fidelityScore: 100
    },
    {
      id: "q2",
      quote: "Right now, we're experimenting with AI routing layers to dynamically tier our GPU workloads.",
      speaker: "Alex Vance",
      timestamp: "07:12–07:35",
      startSec: 432,
      endSec: 455,
      context: "Explaining early-stage GPU tiering experiments",
      fidelityScore: 100
    }
  ],
  moments: [
    {
      id: "short_1",
      clipNumber: 1,
      title: "The 5-Minute Developer Rule",
      startSec: 702,
      endSec: 752,
      timestampRange: "11:42–12:32",
      durationSeconds: 50,
      hook: "If your CI takes over 5 minutes, you don't have a tooling problem—you have a team velocity crisis.",
      overallScore: 94,
      scoreBreakdown: {
        hookStrength: 96,
        standaloneContext: 92,
        infoDensity: 94,
        novelty: 90,
        shareability: 98
      },
      reasons: [
        "Strong universal developer pain point",
        "Clear standalone takeaway without external context",
        "High emotional resonance and quote shareability"
      ],
      caption: "Why 5-minute build times are non-negotiable for high-velocity engineering teams. #devops #softwareengineering #coding",
      suggestedBroll: "Fast visual zoom on terminal countdown clock transitioning to green checkmark",
      targetPlatform: "YouTube Shorts"
    },
    {
      id: "short_2",
      clipNumber: 2,
      title: "How to Stop Baking 8GB Models into Docker",
      startSec: 242,
      endSec: 302,
      timestampRange: "04:02–05:02",
      durationSeconds: 60,
      hook: "Are you still pushing 8GB Docker containers every time you tweak one line of Python?",
      overallScore: 91,
      scoreBreakdown: {
        hookStrength: 92,
        standaloneContext: 89,
        infoDensity: 95,
        novelty: 88,
        shareability: 90
      },
      reasons: [
        "Direct tactical fix for concrete engineering bottleneck",
        "Architecture diagram overlay potential",
        "Clear quantitative before/after contrast"
      ],
      caption: "Decouple your checkpoint storage from your container layers. Here's how. #ai #docker #cloudrun",
      suggestedBroll: "Architecture diagram showing Docker container pulling from SSD bucket on cold boot",
      targetPlatform: "YouTube Shorts"
    },
    {
      id: "short_3",
      clipNumber: 3,
      title: "Cutting $8,400/mo Cloud Bills in 1 Sprint",
      startSec: 615,
      endSec: 675,
      timestampRange: "10:15–11:15",
      durationSeconds: 60,
      hook: "We trimmed our AI cloud bill from $14.2k to $5.8k while serving 4.2M daily requests.",
      overallScore: 87,
      scoreBreakdown: {
        hookStrength: 90,
        standaloneContext: 88,
        infoDensity: 89,
        novelty: 84,
        shareability: 86
      },
      reasons: [
        "Concrete financial metrics attract founders and leads",
        "High information density with practical numbers",
        "Addresses high cloud bills directly"
      ],
      caption: "How we cut 59% of our monthly AI compute costs. #startups #cloudcost #aws #gcp",
      suggestedBroll: "Billing graph overlay dipping sharply with green savings highlight",
      targetPlatform: "YouTube Shorts"
    },
    {
      id: "short_4",
      clipNumber: 4,
      title: "Multi-Stage Docker Caching for Arm64",
      startSec: 330,
      endSec: 390,
      timestampRange: "05:30–06:30",
      durationSeconds: 60,
      hook: "The exact Dockerfile pattern that sped up our CI by 400%.",
      overallScore: 82,
      scoreBreakdown: {
        hookStrength: 80,
        standaloneContext: 85,
        infoDensity: 90,
        novelty: 80,
        shareability: 75
      },
      reasons: [
        "Actionable code walkthrough snippet",
        "Solves specific Python wheels compile time",
        "High bookmark/save rate"
      ],
      caption: "Multi-stage caching setup for Python + AI microservices. #devops #cicd",
      suggestedBroll: "Code terminal highlighting Dockerfile RUN mount=type=cache lines",
      targetPlatform: "YouTube Shorts"
    }
  ],
  claims: [
    {
      id: "c1",
      claimNumber: 1,
      text: "Deployment pipeline time was reduced from 20 minutes down to 4 minutes (an 80% reduction).",
      claimType: "numeric",
      sourceSpan: {
        startSec: 194,
        endSec: 615,
        timestamp: "03:14–10:15",
        originalQuote: "The result was immediate: our deployment time dropped from twenty minutes to four minutes, an 80% reduction in cycle time."
      },
      verificationStatus: "VERIFIED",
      confidence: 0.98,
      evidence: "Explicitly spoken at 00:00, 03:14, and 08:45 with exact identical figures.",
      riskLevel: "LOW"
    },
    {
      id: "c2",
      claimNumber: 2,
      text: "Monthly Cloud compute bill dropped from $14,200 to $5,800 while serving 4.2M daily completions.",
      claimType: "numeric",
      sourceSpan: {
        startSec: 615,
        endSec: 702,
        timestamp: "10:15–11:42",
        originalQuote: "We also trimmed our Cloud compute bill from $14,200 a month down to $5,800 a month while serving over 4.2 million daily completions."
      },
      verificationStatus: "VERIFIED",
      confidence: 0.97,
      evidence: "Direct numeric data corroborated in timestamp 10:15.",
      riskLevel: "LOW"
    },
    {
      id: "c3",
      claimNumber: 3,
      text: "Initial Docker containers were 8GB because model checkpoints were bundled into image layers.",
      claimType: "factual",
      sourceSpan: {
        startSec: 75,
        endSec: 194,
        timestamp: "01:15–03:14",
        originalQuote: "every developer push triggered a massive 8GB container rebuild that bundled model checkpoints and Python runtime wheels from scratch."
      },
      verificationStatus: "VERIFIED",
      confidence: 0.95,
      evidence: "Direct factual statement from speaker at 01:15.",
      riskLevel: "LOW"
    },
    {
      id: "c4_drift",
      claimNumber: 4,
      text: "The startup is going all-in on AI across their entire routing infrastructure.",
      claimType: "factual",
      sourceSpan: {
        startSec: 432,
        endSec: 525,
        timestamp: "07:12–08:45",
        originalQuote: "Right now, we're experimenting with AI routing layers to dynamically tier our GPU workloads across cold and warm instances."
      },
      verificationStatus: "SEMANTIC_DRIFT",
      confidence: 0.94,
      evidence: "Source states the team is 'experimenting with AI routing layers', whereas generated text claims they are 'going all-in on AI'.",
      riskLevel: "MEDIUM",
      generatedContext: "Generated in draft LinkedIn post: 'We are going all-in on AI to revolutionize every server route.'",
      driftReason: "The generated statement exaggerates an early-stage experiment into a full production commitment.",
      proposedCorrection: "The team is currently experimenting with AI routing layers to tier GPU workloads dynamically."
    },
    {
      id: "c5_numeric_mismatch",
      claimNumber: 5,
      text: "The team reduced deployment time down to 2 minutes.",
      claimType: "numeric",
      sourceSpan: {
        startSec: 194,
        endSec: 615,
        timestamp: "03:14–10:15",
        originalQuote: "our deployment time dropped from twenty minutes to four minutes"
      },
      verificationStatus: "NUMERIC_MISMATCH",
      confidence: 0.99,
      evidence: "Generated copy states '2 minutes' instead of the verified source value '4 minutes'.",
      riskLevel: "HIGH",
      generatedContext: "Generated in draft X Thread Post #3: 'We reduced deploy times from 20 minutes to 2 minutes.'",
      driftReason: "Critical factual number distortion: 2 minutes contradicts the original 4-minute measurement.",
      proposedCorrection: "We reduced deploy times from 20 minutes to 4 minutes (80% drop)."
    },
    {
      id: "c6",
      claimNumber: 6,
      text: "Developer cognitive flow degrades when CI build times exceed 5 minutes.",
      claimType: "opinion",
      sourceSpan: {
        startSec: 702,
        endSec: 790,
        timestamp: "11:42–13:10",
        originalQuote: "If your feedback loop takes more than five minutes, your engineers lose cognitive flow."
      },
      verificationStatus: "VERIFIED",
      confidence: 0.96,
      evidence: "Verified speaker opinion stated at 11:42.",
      riskLevel: "LOW"
    }
  ],
  targetAudience: "Technical Founders, Staff Engineers, DevOps Leads",
  complexityLevel: "Advanced"
};

export const INITIAL_WORKFLOW_PLAN: WorkflowPlan = {
  id: "wf_startup_01",
  sourceId: "src_startup_deploy",
  title: "AI Operating Workflow: Pipeline Scaled 20m → 4m",
  status: "COMPLETED",
  overallProgress: 100,
  startedAt: "2026-09-02T05:08:10Z",
  completedAt: "2026-09-02T05:11:51Z",
  manualEffortEstimateMinutes: 252, // 4 hours 12 minutes
  automatedTimeSeconds: 221, // 3 minutes 41 seconds
  tasks: [
    {
      id: "task_1",
      title: "Content Ingestion & Audio Segmentation",
      taskType: "analyze",
      status: "COMPLETED",
      priority: 1.0,
      reason: "Parse source video, segment timestamps, extract speaker diariation",
      dependsOn: [],
      progress: 100,
      executionTimeMs: 1240,
      outputPreview: "14:28 duration transcribed into 10 timestamped segments across 8 topics."
    },
    {
      id: "task_2",
      title: "Extract Content IR & Factual Claims",
      taskType: "extract_claims",
      status: "COMPLETED",
      priority: 0.98,
      reason: "Isolate numeric benchmarks, architectural claims, and quote spans",
      dependsOn: ["task_1"],
      progress: 100,
      executionTimeMs: 1850,
      outputPreview: "6 core claims extracted (3 numeric, 2 factual, 1 opinion) with timestamp provenance."
    },
    {
      id: "task_3",
      title: "Shorts Opportunity Detection & Scoring",
      taskType: "find_moments",
      status: "COMPLETED",
      priority: 0.94,
      reason: "Rank high-energy clips using 5-factor mathematical hook model",
      dependsOn: ["task_2"],
      progress: 100,
      executionTimeMs: 2100,
      outputPreview: "4 candidate Shorts identified. Top moment: 'The 5-Minute Developer Rule' (Score: 94)."
    },
    {
      id: "task_4",
      title: "Compile YouTube Package (SEO + Chapters)",
      taskType: "compile_youtube",
      status: "COMPLETED",
      priority: 0.92,
      reason: "Produce high-CTR title variations, full chapter timestamps, and thumbnail concept",
      dependsOn: ["task_2"],
      progress: 100,
      executionTimeMs: 2400,
      outputPreview: "3 title variations (CTR 91-94%), 8 timestamp chapters, and detailed thumbnail brief."
    },
    {
      id: "task_5",
      title: "Compile LinkedIn Thought Leadership Post",
      taskType: "compile_linkedin",
      status: "COMPLETED",
      priority: 0.90,
      reason: "Format technical post aligned with creator voice guidelines",
      dependsOn: ["task_2"],
      progress: 100,
      executionTimeMs: 1900,
      outputPreview: "Structured post with hook, technical bullet points, and high-signal takeaway."
    },
    {
      id: "task_6",
      title: "Compile X (Twitter) Multi-Post Thread",
      taskType: "compile_x_thread",
      status: "COMPLETED",
      priority: 0.88,
      reason: "Transform IR into a 5-tweet high-retention architectural breakdown",
      dependsOn: ["task_2"],
      progress: 100,
      executionTimeMs: 1750,
      outputPreview: "5-tweet breakdown featuring Docker cache diagrams and benchmark stats."
    },
    {
      id: "task_7",
      title: "Compile Technical Newsletter Issue",
      taskType: "compile_newsletter",
      status: "COMPLETED",
      priority: 0.85,
      reason: "Deep-dive edition with code rationale and actionable takeaway",
      dependsOn: ["task_2"],
      progress: 100,
      executionTimeMs: 2300,
      outputPreview: "Newsletter edition: 'How We Shaved 80% Off Our AI Build Pipeline'."
    },
    {
      id: "task_8",
      title: "ProofFlow Verification Quality Gate",
      taskType: "run_proofflow",
      status: "FIXED",
      priority: 0.99,
      reason: "Audit all 6 derivative assets against source timestamps for numeric & semantic fidelity",
      dependsOn: ["task_4", "task_5", "task_6", "task_7"],
      progress: 100,
      executionTimeMs: 3100,
      outputPreview: "Detected 1 Semantic Drift & 1 Numeric Mismatch. Auto-repaired to 96/100 Trust Score."
    },
    {
      id: "task_9",
      title: "Build 7-Day Multi-Platform Publishing Schedule",
      taskType: "build_schedule",
      status: "COMPLETED",
      priority: 0.80,
      reason: "Sequence assets according to audience engagement windows across platforms",
      dependsOn: ["task_8"],
      progress: 100,
      executionTimeMs: 1100,
      outputPreview: "7-day staggered rollout planned: Day 1 YouTube, Day 2 Short #1, Day 3 LinkedIn..."
    },
    {
      id: "task_10",
      title: "Creator Memory & Feedback Loop Update",
      taskType: "learn_feedback",
      status: "COMPLETED",
      priority: 0.75,
      reason: "Ingest content pattern into creator profile and calculate next-action recommendations",
      dependsOn: ["task_9"],
      progress: 100,
      executionTimeMs: 950,
      outputPreview: "Identified +218% topic spike. Generated 4 strategic follow-up actions."
    }
  ]
};

export const INITIAL_GENERATED_ASSETS: GeneratedAssetsPackage = {
  sourceId: "src_startup_deploy",
  generatedAt: "2026-09-02T05:11:40Z",
  youtube: {
    selectedTitleIndex: 0,
    titles: [
      {
        title: "How I Scaled Our AI Pipeline: From 20-Min to 4-Min Deployments",
        predictedCTR: 94,
        angle: "Direct Engineering Outcome (High Signal)"
      },
      {
        title: "Stop Baking 8GB Models into Docker: The 4-Minute CI/CD Architecture",
        predictedCTR: 92,
        angle: "Pain Point & Problem Callout"
      },
      {
        title: "How We Cut 80% Off Our AI Build Pipeline (And Saved $8,400/Mo)",
        predictedCTR: 89,
        angle: "Financial & Speed Benchmark Combined"
      }
    ],
    description: `Here is the exact architectural teardown of how we dropped our AI container deployment pipeline from 20 minutes down to 4 minutes—saving 16 minutes per PR and $8,400/month in cloud compute.

⏱️ Timestamps & Chapters:
00:00 - The 20-Minute Merge Bottleneck
01:15 - Why 8GB Docker Containers Kill Velocity
03:14 - Measuring Cycle Time & Merge Congestion
04:02 - Step 1: Decoupling Checkpoints to Persistent SSDs
05:30 - Step 2: Multi-Stage Build Caching on Arm64
07:12 - Step 3: Dynamic GPU Tiering Experiments
08:45 - The Benchmark Results (80% Speedup)
10:15 - Slashing Cloud Bills from $14.2K to $5.8K
11:42 - The 5-Minute Developer Flow Rule
13:10 - Open-Source Script & Next Steps

📦 Tech Stack Covered:
- Docker Multi-Stage BuildKit
- Lazy-loaded Persistent Storage Buckets
- Cloud Run & GPU Warm Pools
- Fast CI/CD Cache Mounts

👇 Get the open-source pipeline config in our newsletter:
https://creatoros.dev/alexvance/pipeline-config`,
    chapters: [
      { timestamp: "00:00", title: "The 20-Minute Merge Bottleneck" },
      { timestamp: "01:15", title: "Why 8GB Containers Kill Velocity" },
      { timestamp: "04:02", title: "Decoupling Checkpoints to SSDs" },
      { timestamp: "05:30", title: "Multi-Stage Build Caching" },
      { timestamp: "08:45", title: "Benchmark Results (80% Speedup)" },
      { timestamp: "10:15", title: "Slashing Cloud Bills to $5.8K" },
      { timestamp: "11:42", title: "The 5-Minute Developer Flow Rule" }
    ],
    tags: [
      "AI Infrastructure",
      "Docker Caching",
      "CI/CD Pipeline",
      "Cloud Run",
      "DevOps",
      "Python Microservices",
      "Developer Velocity",
      "Software Architecture"
    ],
    thumbnailConcept: {
      headline: "20 MIN → 4 MIN",
      visualDescription: "Split screen: Left side shows red slow loading bar (8GB Docker image). Right side shows glowing cyan terminal with lightning speed checkmark (340MB container).",
      focalPoint: "Alex pointing at the 80% speedup badge in center",
      colorPalette: "Slate dark (#020617) with Electric Cyan (#06b6d4) and Crimson Red (#ef4444) contrast"
    },
    cta: "Subscribe for more raw production infrastructure post-mortems every Tuesday."
  },
  linkedin: {
    hook: "If your deployment pipeline takes more than 5 minutes, you aren't waiting on CI—you're losing your best engineers.",
    body: `Six months ago, every single push in our AI startup triggered a 20-minute merge queue nightmare.

The culprit?
Every container build was baking 8GB model checkpoints and raw Python wheels from scratch.

Here is the 3-step architecture we used to drop deployment time to 4 minutes (an 80% reduction):

1️⃣ Decoupled Checkpoint Storage
We stripped model weights out of Docker images entirely. Weights now live in lazy-loaded persistent SSD buckets mounted at container runtime. Base image size plummeted from 8GB to 340MB.

2️⃣ Multi-Stage BuildKit Caching
We pinned Debian dependencies and mounted cached pip wheels across our arm64 builders. No more re-compiling C++ extensions on every PR.

3️⃣ Workload Tiering Experiments
The team is currently experimenting with AI routing layers to tier GPU workloads dynamically between warm standby and cold nodes.

The Impact:
⚡ Deploy time: 20m ➔ 4m (-80%)
💰 Monthly compute spend: $14,200 ➔ $5,800 (-59%)
🚀 Volume: 4.2M daily completions sustained

Rule of thumb for engineering leaders:
When CI takes 20 minutes, engineers switch tabs, check Slack, and lose cognitive flow.
When CI takes 4 minutes, they stay in the zone and ship.`,
    takeaways: [
      "Never bundle heavy model checkpoints into static Docker images",
      "Use lazy-loaded SSD volume mounts for runtime model retrieval",
      "Protect engineer cognitive flow by keeping PR verification under 5 minutes"
    ],
    cta: "What is the average build time in your team's CI/CD pipeline right now? Let's discuss in the comments.",
    hashtags: ["#SoftwareEngineering", "#AIInfrastructure", "#DevOps", "#CloudComputing", "#DeveloperExperience"],
    characterCount: 1480,
    estimatedReadTime: "2 min read"
  },
  xThread: {
    hookPost: "We dropped our AI deployment pipeline from 20 minutes to 4 minutes.\n\nIn the process, we cut our cloud bill by $8,400/mo while serving 4.2M completions/day.\n\nHere's the exact architectural breakdown 🧵👇",
    totalPosts: 5,
    suggestedPostingTime: "Wednesday 09:30 AM EST",
    threadPosts: [
      {
        postNumber: 1,
        text: "We dropped our AI deployment pipeline from 20 minutes to 4 minutes.\n\nIn the process, we cut our cloud bill by $8,400/mo while serving 4.2M completions/day.\n\nHere's the exact architectural breakdown 🧵👇",
        characterCount: 224
      },
      {
        postNumber: 2,
        text: "1/ The Bottleneck:\n\nOur Docker image was 8GB.\n\nEvery commit rebuilt model layers, downloaded PyTorch wheels, and re-compiled dependencies.\n\nResult: 20-minute PR queues and broken developer flow.",
        characterCount: 206
      },
      {
        postNumber: 3,
        text: "2/ The Fix: Decoupling Checkpoints\n\nWe moved model weights out of the Docker image into persistent SSD buckets loaded lazily at container startup.\n\nBase image dropped from 8GB to 340MB.\n\nImage transfer time went from 6 minutes to 18 seconds.",
        characterCount: 247
      },
      {
        postNumber: 4,
        text: "3/ Multi-Stage BuildKit Caching:\n\nWe pinned OS dependencies and enabled BuildKit cache mounts for Python wheels.\n\nNow 90% of PRs hit a warm cache layer instead of rebuilding from scratch.",
        characterCount: 194
      },
      {
        postNumber: 5,
        text: "4/ The Results:\n\n• Deploy time: 20m → 4m (80% drop)\n• Monthly bill: $14.2k → $5.8k\n• Traffic: 4.2M completions/day\n\nIf your CI feedback loop takes >5 mins, you're bleeding engineer velocity.\n\nRT if you care about developer speed 🔁",
        characterCount: 243
      }
    ]
  },
  shorts: [
    {
      id: "short_1",
      clipNumber: 1,
      title: "The 5-Minute Developer Rule",
      startSec: 702,
      endSec: 752,
      timestampRange: "11:42–12:32",
      durationSeconds: 50,
      hook: "If your CI takes over 5 minutes, you don't have a tooling problem—you have a team velocity crisis.",
      overallScore: 94,
      scoreBreakdown: {
        hookStrength: 96,
        standaloneContext: 92,
        infoDensity: 94,
        novelty: 90,
        shareability: 98
      },
      reasons: [
        "Strong universal developer pain point",
        "Clear standalone takeaway without external context",
        "High emotional resonance and quote shareability"
      ],
      caption: "Why 5-minute build times are non-negotiable for high-velocity engineering teams. #devops #softwareengineering #coding",
      suggestedBroll: "Fast visual zoom on terminal countdown clock transitioning to green checkmark",
      targetPlatform: "YouTube Shorts"
    },
    {
      id: "short_2",
      clipNumber: 2,
      title: "How to Stop Baking 8GB Models into Docker",
      startSec: 242,
      endSec: 302,
      timestampRange: "04:02–05:02",
      durationSeconds: 60,
      hook: "Are you still pushing 8GB Docker containers every time you tweak one line of Python?",
      overallScore: 91,
      scoreBreakdown: {
        hookStrength: 92,
        standaloneContext: 89,
        infoDensity: 95,
        novelty: 88,
        shareability: 90
      },
      reasons: [
        "Direct tactical fix for concrete engineering bottleneck",
        "Architecture diagram overlay potential",
        "Clear quantitative before/after contrast"
      ],
      caption: "Decouple your checkpoint storage from your container layers. Here's how. #ai #docker #cloudrun",
      suggestedBroll: "Architecture diagram showing Docker container pulling from SSD bucket on cold boot",
      targetPlatform: "YouTube Shorts"
    },
    {
      id: "short_3",
      clipNumber: 3,
      title: "Cutting $8,400/mo Cloud Bills in 1 Sprint",
      startSec: 615,
      endSec: 675,
      timestampRange: "10:15–11:15",
      durationSeconds: 60,
      hook: "We trimmed our AI cloud bill from $14.2k to $5.8k while serving 4.2M daily requests.",
      overallScore: 87,
      scoreBreakdown: {
        hookStrength: 90,
        standaloneContext: 88,
        infoDensity: 89,
        novelty: 84,
        shareability: 86
      },
      reasons: [
        "Concrete financial metrics attract founders and leads",
        "High information density with practical numbers",
        "Addresses high cloud bills directly"
      ],
      caption: "How we cut 59% of our monthly AI compute costs. #startups #cloudcost #aws #gcp",
      suggestedBroll: "Billing graph overlay dipping sharply with green savings highlight",
      targetPlatform: "YouTube Shorts"
    },
    {
      id: "short_4",
      clipNumber: 4,
      title: "Multi-Stage Docker Caching for Arm64",
      startSec: 330,
      endSec: 390,
      timestampRange: "05:30–06:30",
      durationSeconds: 60,
      hook: "The exact Dockerfile pattern that sped up our CI by 400%.",
      overallScore: 82,
      scoreBreakdown: {
        hookStrength: 80,
        standaloneContext: 85,
        infoDensity: 90,
        novelty: 80,
        shareability: 75
      },
      reasons: [
        "Actionable code walkthrough snippet",
        "Solves specific Python wheels compile time",
        "High bookmark/save rate"
      ],
      caption: "Multi-stage caching setup for Python + AI microservices. #devops #cicd",
      suggestedBroll: "Code terminal highlighting Dockerfile RUN mount=type=cache lines",
      targetPlatform: "YouTube Shorts"
    }
  ],
  newsletter: {
    selectedSubjectIndex: 0,
    subjectLines: [
      "How we cut 80% off our AI deployment pipeline (and saved $8.4k/mo)",
      "The 5-minute CI/CD rule: Why slow builds kill engineering velocity",
      "Stop baking 8GB models into Docker: Our architecture teardown"
    ],
    previewSnippet: "How decoupling model checkpoints and BuildKit caching dropped our deployment cycle from 20m to 4m.",
    salutation: "Hey builders,",
    openingStory: "Last month, I watched one of our senior engineers sit staring at a GitHub Actions merge queue for 22 minutes just to test a 2-line prompt formatting change. That was the day we declared war on our deployment pipeline.",
    coreInsight: "When your CI build takes 20 minutes, your developers don't wait attentively—they context switch. By the time the green checkmark arrives, cognitive momentum is shattered.",
    breakdownSections: [
      {
        heading: "1. The 8GB Container Anti-Pattern",
        content: "We discovered that 94% of our image payload consisted of static model weights and heavy Python wheels. By moving checkpoints to persistent SSD buckets, our container transfer time plummeted from 6 minutes to 18 seconds."
      },
      {
        heading: "2. BuildKit Cache Mounts on Arm64",
        content: "Using Docker BuildKit `RUN --mount=type=cache,target=/root/.cache/pip` ensured that recurring PRs never re-downloaded wheels, cutting local stage build time by 75%."
      },
      {
        heading: "3. The Benchmark & Cost Payoff",
        content: "Cycle time dropped from 20m to 4m (-80%). Our monthly cloud infrastructure bill fell from $14,200 to $5,800 (-59%) while sustaining 4.2 million daily completions."
      }
    ],
    actionableStep: "Action for this week: Measure your P90 PR merge cycle time. If it exceeds 5 minutes, isolate your static assets from your application image layers.",
    closingSignoff: "Keep building with high velocity,\nAlex Vance"
  }
};

export const INITIAL_PROOFFLOW_REPORT: ProofFlowReport = {
  overallTrustScore: 96,
  scoreBreakdown: {
    sourceGrounding: 98,
    claimConsistency: 96,
    numericIntegrity: 98,
    quoteFidelity: 100,
    semanticFidelity: 94,
    brandAlignment: 92
  },
  totalClaimsChecked: 6,
  verifiedCount: 4,
  issuesCount: 2,
  resolvedIssuesCount: 2,
  status: "PASSED",
  claims: INITIAL_CONTENT_IR.claims
};

export const INITIAL_PUBLISHING_SCHEDULE: PublishingScheduleItem[] = [
  {
    id: "pub_1",
    dayNumber: 1,
    dayLabel: "Day 1 (Tuesday)",
    dateStr: "2026-09-02",
    platform: "YouTube",
    assetTitle: "How I Scaled Our AI Pipeline: From 20-Min to 4-Min Deployments",
    assetSnippet: "Full long-form technical video with chapters and benchmark breakdown.",
    status: "READY",
    optimalTime: "11:00 AM EST"
  },
  {
    id: "pub_2",
    dayNumber: 2,
    dayLabel: "Day 2 (Wednesday)",
    dateStr: "2026-09-03",
    platform: "YouTube Shorts",
    assetTitle: "Short #1: The 5-Minute Developer Rule",
    assetSnippet: "High-retention 50s clip on engineering velocity and cognitive flow.",
    status: "SCHEDULED",
    optimalTime: "01:30 PM EST"
  },
  {
    id: "pub_3",
    dayNumber: 3,
    dayLabel: "Day 3 (Thursday)",
    dateStr: "2026-09-04",
    platform: "LinkedIn",
    assetTitle: "Thought Leadership: The 3-Step CI/CD Architecture",
    assetSnippet: "Formatted breakdown post with metrics ($14.2k to $5.8k) and key takeaways.",
    status: "SCHEDULED",
    optimalTime: "08:45 AM EST"
  },
  {
    id: "pub_4",
    dayNumber: 4,
    dayLabel: "Day 4 (Friday)",
    dateStr: "2026-09-05",
    platform: "YouTube Shorts",
    assetTitle: "Short #2: Stop Baking 8GB Models into Docker",
    assetSnippet: "Tactical 60s architecture clip explaining decoupled SSD storage.",
    status: "SCHEDULED",
    optimalTime: "04:15 PM EST"
  },
  {
    id: "pub_5",
    dayNumber: 5,
    dayLabel: "Day 5 (Saturday)",
    dateStr: "2026-09-06",
    platform: "X",
    assetTitle: "5-Tweet Architectural Breakdown Thread",
    assetSnippet: "Step-by-step thread with code patterns and benchmark stats.",
    status: "SCHEDULED",
    optimalTime: "10:00 AM EST"
  },
  {
    id: "pub_6",
    dayNumber: 6,
    dayLabel: "Day 6 (Sunday)",
    dateStr: "2026-09-07",
    platform: "YouTube Shorts",
    assetTitle: "Short #3: Cutting $8,400/mo Cloud Bills in 1 Sprint",
    assetSnippet: "Financial payoff clip for startup founders and engineering leads.",
    status: "SCHEDULED",
    optimalTime: "02:00 PM EST"
  },
  {
    id: "pub_7",
    dayNumber: 7,
    dayLabel: "Day 7 (Monday)",
    dateStr: "2026-09-08",
    platform: "Newsletter",
    assetTitle: "Newsletter Edition: The 5-Minute CI/CD Rule",
    assetSnippet: "Deep-dive email with open-source configuration script link.",
    status: "SCHEDULED",
    optimalTime: "09:00 AM EST"
  }
];

export const INITIAL_AUTOMATION_RULES: AutomationRule[] = [
  {
    id: "rule_1",
    name: "Auto-Ingest & Workflow Planning",
    trigger: "New video or transcript uploaded",
    condition: "Duration >= 2 minutes",
    action: "Run Content Analyst, build Content IR, and generate optimal task graph",
    active: true,
    timesFired: 27,
    category: "ingestion"
  },
  {
    id: "rule_2",
    name: "ProofFlow Pre-Publish Quality Gate",
    trigger: "Asset generation completed",
    condition: "Trust Score < 90 OR Numeric Mismatch detected",
    action: "Block automatic publish, flag discrepancies, and generate 1-click surgical repairs",
    active: true,
    timesFired: 14,
    category: "verification"
  },
  {
    id: "rule_3",
    name: "Performance Spike Next-Action Trigger",
    trigger: "Asset exceeds baseline by >= 150%",
    condition: "Views or comments > 2x 30-day moving average",
    action: "Trigger Next-Action Engine, mine top audience questions, and propose derivative series",
    active: true,
    timesFired: 6,
    category: "analytics"
  },
  {
    id: "rule_4",
    name: "Multi-Platform Cadence Staggering",
    trigger: "Workflow approved by creator",
    condition: "All assets marked VERIFIED",
    action: "Populate 7-day calendar staggered across optimal platform engagement windows",
    active: true,
    timesFired: 22,
    category: "publishing"
  }
];

export const INITIAL_ANALYTICS_SUMMARY: AnalyticsSummary = {
  contentProcessed: 27,
  hoursAutomated: 43.2,
  assetsCreated: 118,
  verificationPassRate: 96,
  topicPerformance: [
    {
      topic: "AI Infrastructure & Latency",
      averageViews: 48200,
      engagementRate: 6.8,
      assetsDerived: 42,
      performanceScore: 94
    },
    {
      topic: "CI/CD & DevOps Acceleration",
      averageViews: 39500,
      engagementRate: 5.4,
      assetsDerived: 28,
      performanceScore: 88
    },
    {
      topic: "Multi-Agent System Architecture",
      averageViews: 41200,
      engagementRate: 6.1,
      assetsDerived: 31,
      performanceScore: 91
    },
    {
      topic: "Bootstrapping Developer Tools",
      averageViews: 28400,
      engagementRate: 4.8,
      assetsDerived: 19,
      performanceScore: 78
    }
  ],
  minedComments: [
    {
      id: "mc_1",
      platform: "YouTube",
      author: "dev_lead_sarah",
      text: "How do you handle cold-start latency when pulling 8GB weights from SSD buckets on container init? Would love to see the mmap code.",
      upvotes: 42,
      suggestedTopic: "GPU Container Cold Boot Latency & Mmap Architecture",
      status: "PENDING"
    },
    {
      id: "mc_2",
      platform: "LinkedIn",
      author: "marcus_k_cloud",
      text: "Is this Docker BuildKit caching compatible with GitHub Actions ephemeral arm64 runners without cache evictions?",
      upvotes: 29,
      suggestedTopic: "GitHub Actions Ephemeral Cache Persistence Guide",
      status: "PENDING"
    },
    {
      id: "mc_3",
      platform: "X",
      author: "@ai_engineer_dan",
      text: "What was your total monthly storage cost for the SSD buckets vs container registry egress fees?",
      upvotes: 18,
      suggestedTopic: "Egress vs Storage Pricing Breakdown for LLMs",
      status: "PENDING"
    }
  ],
  recentSpike: {
    videoTitle: "How I Scaled Our AI Pipeline: 20-Min to 4-Min Deployments",
    topic: "AI Infrastructure & Build Acceleration",
    viewsVsBaseline: 218, // +218%
    commentsVsBaseline: 84, // +84%
    retentionVsBaseline: 31, // +31%
    detectedSignal: "Massive audience interest clustered around 'Docker checkpoint decoupling' and 'GPU warm pool routing'.",
    recommendedActions: [
      {
        id: "act_1",
        title: "Create Follow-up Deep Dive: GPU Warm Pool Architecture",
        description: "Expand section 07:12 into a dedicated 12-minute technical walkthrough with live Terraform code.",
        expectedROI: "+240% Engagement (Matches top historical cluster)",
        actionType: "follow_up_video"
      },
      {
        id: "act_2",
        title: "Extract 2 Additional Micro-Shorts from Spike Moments",
        description: "Generate standalone clips for 'PyTorch wheel cache mount' and 'SSD bucket cold boot latency'.",
        expectedROI: "+65K Estimated Short-Form Views",
        actionType: "extract_shorts"
      },
      {
        id: "act_3",
        title: "Publish Technical LinkedIn Post on Cloud Run GPU Quotas",
        description: "Address the #1 most upvoted question in comments regarding memory bandwidth limits.",
        expectedROI: "+380 Profile Engagements",
        actionType: "technical_deepdive"
      },
      {
        id: "act_4",
        title: "Turn Top 5 Audience Questions into FAQ Newsletter Issue",
        description: "Answer community questions on persistent storage pricing vs Docker registry transfer fees.",
        expectedROI: "+48% Newsletter Open Rate",
        actionType: "faq_compilation"
      }
    ],
    audienceQuestions: [
      {
        question: "How do you handle cold-start latency when pulling 8GB weights from SSD buckets on container init?",
        count: 42,
        sentiment: "Technical",
        suggestedDerivative: "Dedicated follow-up video on lazy-loading memory mapping (mmap)."
      },
      {
        question: "Is this Docker BuildKit caching compatible with GitHub Actions ephemeral runners?",
        count: 29,
        sentiment: "Curious",
        suggestedDerivative: "Quick 60-second Short demonstrating GitHub Actions cache action."
      },
      {
        question: "What was your total monthly storage cost for the SSD buckets vs container registry egress?",
        count: 18,
        sentiment: "Technical",
        suggestedDerivative: "LinkedIn breakdown graphic comparing egress vs volume mount costs."
      }
    ]
  }
};

// Aliases for component imports
export const SAMPLE_CREATOR_PROFILE = DEFAULT_CREATOR_PROFILE;
export const SAMPLE_CONTENT_IR = INITIAL_CONTENT_IR;
export const SAMPLE_WORKFLOW_PLAN = INITIAL_WORKFLOW_PLAN;
export const SAMPLE_ASSETS_PACKAGE = INITIAL_GENERATED_ASSETS;
export const SAMPLE_PROOFFLOW_REPORT = INITIAL_PROOFFLOW_REPORT;
export const SAMPLE_PUBLISHING_SCHEDULE = INITIAL_PUBLISHING_SCHEDULE;
export const SAMPLE_AUTOMATION_RULES = INITIAL_AUTOMATION_RULES;
export const SAMPLE_ANALYTICS_SUMMARY = INITIAL_ANALYTICS_SUMMARY;
