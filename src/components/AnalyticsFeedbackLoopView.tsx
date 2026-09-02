import React, { useState } from 'react';
import {
  TrendingUp,
  Flame,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Zap,
  BarChart3,
  ThumbsUp,
  Cpu,
  Clock,
  CheckCircle2,
  Share2,
  Lightbulb,
  Plus
} from 'lucide-react';
import { AnalyticsSummary, RecommendedAction } from '../types';

interface AnalyticsFeedbackLoopViewProps {
  analyticsSummary: AnalyticsSummary;
  onExecuteRecommendedAction: (action: RecommendedAction) => void;
  onNavigateTab: (tab: string) => void;
}

export const AnalyticsFeedbackLoopView: React.FC<AnalyticsFeedbackLoopViewProps> = ({
  analyticsSummary,
  onExecuteRecommendedAction,
  onNavigateTab
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>(analyticsSummary.topicPerformance[0].topic);
  const [minedComments, setMinedComments] = useState(analyticsSummary.minedComments);
  const [executedActionId, setExecutedActionId] = useState<string | null>(null);

  const handleActionClick = (action: RecommendedAction) => {
    setExecutedActionId(action.id);
    setTimeout(() => {
      onExecuteRecommendedAction(action);
      setExecutedActionId(null);
    }, 800);
  };

  const handleConvertComment = (commentId: string) => {
    setMinedComments(prev => prev.map(c => c.id === commentId ? { ...c, status: 'CONVERTED' } : c));
    alert('Idea added to Autonomous Workflow Planner queue!');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">
              06 / Closed-Loop Intelligence
            </span>
            <span className="text-white/20">•</span>
            <span className="rounded-sm bg-emerald-500/10 px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-400 border border-emerald-500/20">
              STRATEGY FEEDBACK
            </span>
          </div>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-light italic tracking-tight text-white">
            Closed-Loop <span className="font-bold not-italic text-white">Strategy Engine</span>
          </h2>
          <p className="text-xs text-[#A0A0A5] max-w-2xl mt-1">
            CreatorOS mines viewer feedback signals across published channels, isolates high-ROI topics, and feeds new autonomous cycles.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('memory')}
          className="flex items-center gap-2 rounded-sm bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all self-start sm:self-auto"
        >
          <span>Open Creator Memory Graph</span>
          <ArrowRight className="h-4 w-4 text-black" />
        </button>
      </div>

      {/* Hero Performance Spike & Recommended Next Actions */}
      <div className="rounded-sm border border-emerald-500/30 bg-[#0F0F12] p-6 shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Flame className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">Live AI Performance Signal</span>
              <h3 className="text-base font-light italic text-white">Outperforming Cluster Detected</h3>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-sm border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold text-emerald-400">
            +{analyticsSummary.recentSpike.viewsVsBaseline}% Views vs Channel Baseline
          </span>
        </div>

        <div className="rounded-sm border border-white/10 bg-[#141418] p-4 text-xs text-[#A0A0A5] leading-relaxed">
          <p>
            Your topic <strong className="text-white">"{analyticsSummary.recentSpike.topic}"</strong> generated <strong className="text-emerald-400">+{analyticsSummary.recentSpike.commentsVsBaseline}% comment engagement</strong> and high retention on technical architecture details. The feedback loop recommends 3 immediate follow-ups.
          </p>
        </div>

        {/* 3 Interactive Recommended Actions */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {analyticsSummary.recentSpike.recommendedActions.map((action) => (
            <div
              key={action.id}
              className="flex flex-col justify-between rounded-sm border border-white/10 bg-[#141418] p-5 space-y-4 hover:border-emerald-500/40 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                  <span className="uppercase tracking-wider text-white/50">{action.actionType.replace('_', ' ')}</span>
                  <span className="text-emerald-400 font-bold">{action.expectedROI}</span>
                </div>
                <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">{action.title}</h4>
                <p className="mt-1.5 text-xs text-[#A0A0A5] leading-relaxed">{action.description}</p>
              </div>

              <button
                onClick={() => handleActionClick(action)}
                disabled={executedActionId === action.id}
                className="flex items-center justify-center gap-2 rounded-sm bg-emerald-500 hover:bg-emerald-400 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow transition-all"
              >
                {executedActionId === action.id ? (
                  <span>Queuing Workflow...</span>
                ) : (
                  <>
                    <Zap className="h-3.5 w-3.5 text-black" />
                    <span>Auto-Execute Action</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Performance Benchmarks & Audience Comment Mining */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left (6 cols): Topic Performance Table */}
        <div className="lg:col-span-6 rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-lg space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">Telemetry</span>
              <span className="text-white/20">•</span>
              <h3 className="text-sm font-light italic text-white">Topic Performance Benchmarking</h3>
            </div>
          </div>

          <div className="space-y-3">
            {analyticsSummary.topicPerformance.map((tp, idx) => (
              <div
                key={idx}
                className="rounded-sm border border-white/10 bg-[#141418] p-4 text-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{tp.topic}</span>
                  <span className={`font-mono text-[10px] font-bold ${
                    tp.performanceScore >= 80 ? 'text-emerald-400' : 'text-white/50'
                  }`}>
                    Score: {tp.performanceScore}/100
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px] text-[#A0A0A5] font-mono pt-2 border-t border-white/5">
                  <div>
                    <span className="text-[9px] block text-white/40 uppercase">AVG VIEWS</span>
                    <strong className="text-white">{tp.averageViews.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] block text-white/40 uppercase">ENGAGEMENT</span>
                    <strong className="text-emerald-400">{tp.engagementRate}%</strong>
                  </div>
                  <div>
                    <span className="text-[9px] block text-white/40 uppercase">ASSETS DERIVED</span>
                    <strong className="text-white">{tp.assetsDerived}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (6 cols): Cross-Platform Comment Mining */}
        <div className="lg:col-span-6 rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-lg space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">Viewer Signals</span>
              <span className="text-white/20">•</span>
              <h3 className="text-sm font-light italic text-white">Cross-Platform Comment Mining</h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm border border-emerald-500/20">
              {minedComments.length} IDEAS MINED
            </span>
          </div>

          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {minedComments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-sm border border-white/10 bg-[#141418] p-4 text-xs space-y-2.5"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
                  <span className="text-emerald-400 font-bold">{comment.platform.toUpperCase()} • {comment.author}</span>
                  <span>{comment.upvotes} upvotes</span>
                </div>

                <p className="text-white font-light italic leading-relaxed text-xs">
                  "{comment.text}"
                </p>

                <div className="rounded-sm border border-white/10 bg-[#0A0A0B] p-2.5 text-[11px] text-[#A0A0A5] flex items-center justify-between">
                  <span><strong className="text-white font-mono text-[10px] uppercase">Suggested:</strong> {comment.suggestedTopic}</span>
                  
                  {comment.status === 'CONVERTED' ? (
                    <span className="rounded-sm bg-emerald-500/10 px-2 py-0.5 text-[9px] font-mono uppercase font-bold text-emerald-400 border border-emerald-500/30">
                      ✓ Plan Generated
                    </span>
                  ) : (
                    <button
                      onClick={() => handleConvertComment(comment.id)}
                      className="flex items-center gap-1 rounded-sm bg-emerald-500 hover:bg-emerald-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black transition-all"
                    >
                      <Plus className="h-3 w-3 text-black" />
                      <span>Convert</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

