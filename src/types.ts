export type ContentType = 'video' | 'audio' | 'podcast' | 'article' | 'transcript' | 'livestream';

export interface TranscriptSegment {
  id: string;
  startSec: number;
  endSec: number;
  timestamp: string;
  speaker: string;
  text: string;
}

export interface ContentSource {
  id: string;
  title: string;
  type: ContentType;
  duration: string;
  durationSec: number;
  uploadDate?: string;
  createdAt?: string;
  rawText?: string;
  transcript: TranscriptSegment[];
  topics: string[];
  thumbnailUrl?: string;
  videoUrl?: string;
  sourceUrl?: string;
  speakerName?: string;
}

export type ClaimVerificationStatus = 
  | 'VERIFIED'
  | 'SEMANTIC_DRIFT'
  | 'NUMERIC_MISMATCH'
  | 'UNSUPPORTED'
  | 'QUOTE_DISTORTION'
  | 'NEEDS_REVIEW';

export type ClaimType = 'numeric' | 'factual' | 'quote' | 'opinion' | 'benchmark';

export interface Claim {
  id: string;
  claimNumber: number;
  text: string;
  claimType: ClaimType;
  sourceSpan: {
    startSec: number;
    endSec: number;
    timestamp: string;
    originalQuote: string;
  };
  verificationStatus: ClaimVerificationStatus;
  confidence: number;
  evidence: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  generatedContext?: string;
  driftReason?: string;
  proposedCorrection?: string;
  isFixed?: boolean;
}

export interface QuoteItem {
  id: string;
  quote: string;
  speaker: string;
  timestamp: string;
  startSec: number;
  endSec: number;
  context: string;
  fidelityScore: number;
}

export interface HookItem {
  id: string;
  hookText: string;
  hookType: 'question' | 'contrarian' | 'statistic' | 'story' | 'challenge';
  estimatedRetentionMultiplier: number;
  timestamp: string;
}

export interface ShortOpportunity {
  id: string;
  clipNumber: number;
  title: string;
  startSec: number;
  endSec: number;
  timestampRange: string;
  durationSeconds: number;
  hook: string;
  overallScore: number;
  scoreBreakdown: {
    hookStrength: number;
    standaloneContext: number;
    infoDensity: number;
    novelty: number;
    shareability: number;
  };
  reasons: string[];
  caption: string;
  suggestedBroll: string;
  targetPlatform: 'YouTube Shorts' | 'TikTok' | 'Instagram Reels';
}

export interface ContentIR {
  sourceId: string;
  title: string;
  summary: string;
  keyInsights: string[];
  topics: string[];
  claims: Claim[];
  quotes: QuoteItem[];
  hooks: HookItem[];
  moments: ShortOpportunity[];
  controversialOpinions: string[];
  statistics: { label: string; value: string; context: string }[];
  targetAudience: string;
  complexityLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export type TaskStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'BLOCKED' | 'FAILED' | 'FIXED';

export type TaskType = 
  | 'analyze'
  | 'extract_claims'
  | 'find_moments'
  | 'compile_youtube'
  | 'compile_linkedin'
  | 'compile_x_thread'
  | 'compile_newsletter'
  | 'run_proofflow'
  | 'build_schedule'
  | 'learn_feedback';

export interface WorkflowTask {
  id: string;
  title: string;
  taskType: TaskType;
  status: TaskStatus;
  priority: number;
  reason: string;
  dependsOn: string[];
  progress: number;
  executionTimeMs?: number;
  outputPreview?: string;
  errorMessage?: string;
}

export interface WorkflowPlan {
  id: string;
  sourceId: string;
  title: string;
  status: 'IDLE' | 'RUNNING' | 'COMPLETED' | 'NEEDS_ATTENTION';
  overallProgress: number;
  startedAt?: string;
  completedAt?: string;
  tasks: WorkflowTask[];
  manualEffortEstimateMinutes: number;
  automatedTimeSeconds: number;
}

export interface YouTubeAsset {
  titles: { title: string; predictedCTR: number; angle: string }[];
  selectedTitleIndex: number;
  description: string;
  chapters: { timestamp: string; title: string }[];
  tags: string[];
  thumbnailConcept: {
    headline: string;
    visualDescription: string;
    focalPoint: string;
    colorPalette: string;
  };
  cta: string;
}

export interface LinkedInAsset {
  hook: string;
  body: string;
  takeaways: string[];
  cta: string;
  hashtags: string[];
  characterCount: number;
  estimatedReadTime: string;
}

export interface XPost {
  postNumber: number;
  text: string;
  characterCount: number;
  mediaSuggestion?: string;
}

export interface XThreadAsset {
  hookPost: string;
  threadPosts: XPost[];
  totalPosts: number;
  suggestedPostingTime: string;
}

export interface NewsletterAsset {
  subjectLines: string[];
  selectedSubjectIndex: number;
  previewSnippet: string;
  salutation: string;
  openingStory: string;
  coreInsight: string;
  breakdownSections: { heading: string; content: string }[];
  actionableStep: string;
  closingSignoff: string;
}

export interface GeneratedAssetsPackage {
  sourceId: string;
  youtube: YouTubeAsset;
  linkedin: LinkedInAsset;
  xThread: XThreadAsset;
  shorts: ShortOpportunity[];
  newsletter: NewsletterAsset;
  generatedAt: string;
}

export interface ProofFlowReport {
  overallTrustScore: number;
  scoreBreakdown: {
    sourceGrounding: number;
    claimConsistency: number;
    numericIntegrity: number;
    quoteFidelity: number;
    semanticFidelity: number;
    brandAlignment: number;
  };
  totalClaimsChecked: number;
  verifiedCount: number;
  issuesCount: number;
  resolvedIssuesCount: number;
  claims: Claim[];
  status: 'PASSED' | 'WARNINGS_DETECTED' | 'CRITICAL_BLOCK';
}

export interface PublishingScheduleItem {
  id: string;
  dayNumber: number;
  dayLabel: string;
  dateStr: string;
  platform: 'YouTube' | 'YouTube Shorts' | 'LinkedIn' | 'X' | 'Newsletter';
  assetTitle: string;
  assetSnippet: string;
  status: 'SCHEDULED' | 'READY' | 'PUBLISHED' | 'BLOCKED_BY_QUALITY_GATE';
  optimalTime: string;
}

export interface CreatorProfile {
  name: string;
  handle?: string;
  role?: string;
  avatarUrl?: string;
  niche: string;
  tone: string;
  toneSliders: {
    technicalVsBeginner: number;
    conciseVsDetailed: number;
    humorousVsSerious: number;
  };
  forbiddenBuzzwords: string[];
  memoryFacts: string[];
  voiceProfile?: {
    tone: string[];
    pacing: string;
    technicalDepth: string;
    vocabulary: string[];
    bannedPhrases: string[];
  };
  audienceProfile?: {
    primarySegment: string;
    personas: string[];
    painPoints: string[];
  };
  winningThemes?: {
    theme: string;
    historicalMultiplier: number;
    totalAssets: number;
    recommendedFrequency: string;
  }[];
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  active: boolean;
  timesFired: number;
  category: 'ingestion' | 'verification' | 'analytics' | 'publishing';
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  expectedROI: string;
  actionType: 'follow_up_video' | 'extract_shorts' | 'technical_deepdive' | 'faq_compilation' | string;
}

export interface MinedComment {
  id: string;
  platform: string;
  author: string;
  text: string;
  upvotes: number;
  suggestedTopic: string;
  status: 'PENDING' | 'CONVERTED';
}

export interface TopicPerformanceMetric {
  topic: string;
  averageViews: number;
  engagementRate: number;
  assetsDerived: number;
  performanceScore: number;
}

export interface AnalyticsSummary {
  contentProcessed: number;
  hoursAutomated: number;
  assetsCreated: number;
  verificationPassRate: number;
  topicPerformance: TopicPerformanceMetric[];
  minedComments: MinedComment[];
  recentSpike: {
    videoTitle: string;
    topic: string;
    viewsVsBaseline: number;
    commentsVsBaseline: number;
    retentionVsBaseline: number;
    detectedSignal: string;
    recommendedActions: RecommendedAction[];
    audienceQuestions: {
      question: string;
      count: number;
      sentiment: 'Curious' | 'Skeptical' | 'Technical' | 'Supportive' | string;
      suggestedDerivative: string;
    }[];
  };
}
