import React from 'react';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  Clock,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCw,
  Cpu,
  Share2,
  FileCheck,
  Flame,
  HelpCircle,
  GitFork
} from 'lucide-react';
import {
  ContentSource,
  WorkflowPlan,
  ProofFlowReport,
  AnalyticsSummary,
  CreatorProfile
} from '../types';

interface OverviewDashboardProps {
  currentSource: ContentSource;
  workflowPlan: WorkflowPlan;
  proofFlowReport: ProofFlowReport;
  analyticsSummary: AnalyticsSummary;
  creatorProfile: CreatorProfile;
  onNavigateTab: (tab: string) => void;
  onRunWorkflow: () => void;
  isExecuting: boolean;
  onSelectSource: (src: ContentSource) => void;
  allSources: ContentSource[];
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  currentSource,
  workflowPlan,
  proofFlowReport,
  analyticsSummary,
  creatorProfile,
  onNavigateTab,
  onRunWorkflow,
  isExecuting,
  onSelectSource,
  allSources
}) => {
  const unresolvedIssues = proofFlowReport.claims.filter(
    c => (c.verificationStatus === 'SEMANTIC_DRIFT' || c.verificationStatus === 'NUMERIC_MISMATCH') && !c.isFixed
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Operational Banner - Editorial Artistic Flair Layout */}
      <div className="relative overflow-hidden rounded-sm border border-white/10 bg-[#0E0E11] p-8 lg:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none select-none">
          <div className="text-[220px] leading-none font-black italic">X</div>
        </div>
        
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[9px] tracking-[0.35em] uppercase text-emerald-500 font-bold">
                System Synthesis v2.04
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[9px] font-mono tracking-widest uppercase opacity-40">
                Autonomous Loop Active
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter italic text-white">
              STRATEGIC <span className="font-extrabold text-white not-italic tracking-tight">EVOLUTION</span>
            </h1>

            <div className="w-24 h-[1px] bg-emerald-500 my-3"></div>

            <p className="text-sm text-[#A0A0A5] leading-relaxed max-w-xl font-normal">
              Synthesizing multi-modal data streams into a singular, high-performance output engine. Engineered for maximum efficiency and aesthetic precision.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('ingestion')}
              className="flex items-center gap-2 rounded-sm border border-white/10 bg-[#141418] px-4 py-2.5 text-xs font-semibold text-white/80 hover:text-white hover:border-white/20 hover:bg-[#1A1A20] transition-all"
            >
              <Layers className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[11px] tracking-wide uppercase">Source Ingestion</span>
            </button>
            <button
              onClick={onRunWorkflow}
              disabled={isExecuting}
              className={`flex items-center gap-2 rounded-sm px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                isExecuting
                  ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 cursor-not-allowed animate-pulse'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.35)]'
              }`}
            >
              {isExecuting ? (
                <>
                  <RotateCw className="h-3.5 w-3.5 animate-spin text-black" />
                  <span className="text-[11px]">Executing Pipeline...</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span className="text-[11px]">Run Autonomous Loop</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 Performance Metrics with Editorial Numbering & Emerald Accents */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-5 relative group hover:border-white/20 transition-all">
          <div className="text-[10px] tracking-[0.2em] uppercase text-emerald-500 font-bold mb-1">
            01 / Content Volume
          </div>
          <div className="text-3xl font-light italic font-mono text-white mt-2">
            {analyticsSummary.contentProcessed}
          </div>
          <div className="mt-2 text-[10px] opacity-40 leading-relaxed">
            Source units analyzed across channel clusters.
          </div>
        </div>

        <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-5 relative group hover:border-white/20 transition-all">
          <div className="text-[10px] tracking-[0.2em] uppercase text-emerald-500 font-bold mb-1">
            02 / Hours Automated
          </div>
          <div className="text-3xl font-light italic font-mono text-white mt-2">
            {analyticsSummary.hoursAutomated}<span className="text-lg not-italic font-sans text-emerald-400">h</span>
          </div>
          <div className="mt-2 text-[10px] opacity-40 leading-relaxed">
            Manual labor equivalent: ~280+ engineering hrs.
          </div>
        </div>

        <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-5 relative group hover:border-white/20 transition-all">
          <div className="text-[10px] tracking-[0.2em] uppercase text-emerald-500 font-bold mb-1">
            03 / Assets Derived
          </div>
          <div className="text-3xl font-light italic font-mono text-white mt-2">
            {analyticsSummary.assetsCreated}
          </div>
          <div className="mt-2 text-[10px] opacity-40 leading-relaxed">
            Cross-compiled YouTube, LinkedIn, X, Shorts.
          </div>
        </div>

        <div className="rounded-sm border border-emerald-500/20 bg-emerald-500/5 p-5 relative group hover:border-emerald-500/40 transition-all">
          <div className="text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-bold mb-1 flex items-center justify-between">
            <span>04 / Integrity Gate</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
          </div>
          <div className="text-3xl font-light italic font-mono text-emerald-400 mt-2">
            {proofFlowReport.overallTrustScore}.0%
          </div>
          <div className="mt-2 text-[10px] text-emerald-300/60 leading-relaxed">
            {unresolvedIssues.length > 0 ? `${unresolvedIssues.length} requiring review` : '100% Provenance grounded'}
          </div>
        </div>
      </div>

      {/* Main Grid: Active Workflow Hub & Strategic Next-Action Loop */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Active Operational Workflow Tracker */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">Active Workflow Context</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                </div>
                <h3 className="mt-1 text-lg font-light tracking-tight text-white">{currentSource.title}</h3>
                <p className="text-[11px] font-mono opacity-50 mt-0.5">Length: {currentSource.duration} • {currentSource.topics.join(' • ')}</p>
              </div>

              <button
                onClick={() => onNavigateTab('planner')}
                className="flex items-center gap-2 rounded-sm border border-white/10 bg-[#141418] px-3 py-1.5 text-xs text-[#E0E0E0] hover:border-white/20 transition-colors"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider">DAG Graph</span>
                <ArrowRight className="h-3 w-3 text-emerald-400" />
              </button>
            </div>

            {/* Step execution progress bar */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[10px] tracking-[0.2em] uppercase opacity-50 font-semibold">Autonomous Compilation DAG</span>
                <span className="font-mono font-bold text-emerald-400 text-xs">{workflowPlan.overallProgress}% Complete</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden bg-white/10">
                <div 
                  className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-700 ease-out"
                  style={{ width: `${workflowPlan.overallProgress}%` }}
                />
              </div>
            </div>

            {/* Task list compact view */}
            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {workflowPlan.tasks.slice(0, 6).map((task) => (
                <div
                  key={task.id}
                  onClick={() => onNavigateTab('planner')}
                  className="flex cursor-pointer items-center justify-between rounded-sm border border-white/10 bg-[#141418] p-3 hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                    <span className="text-xs font-medium text-[#E0E0E0] truncate">{task.title}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-40 shrink-0">
                    {task.executionTimeMs}ms
                  </span>
                </div>
              ))}
            </div>

            {/* Efficiency benchmark banner */}
            <div className="mt-5 flex items-center justify-between rounded-sm border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs">
              <div className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-[#C0C0C5] text-[11px]">
                  Manual benchmark: <strong className="text-white">4h 12m</strong> → CreatorOS: <strong className="text-emerald-400">3m 41s</strong>
                </span>
              </div>
              <span className="font-mono text-emerald-400 font-bold text-[11px]">98.5% SAVED</span>
            </div>
          </div>

          {/* Quick Platform Compilation Overview */}
          <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-500">Compiled Platform Outputs</h3>
              <button 
                onClick={() => onNavigateTab('compiler')}
                className="text-xs font-medium text-[#E0E0E0] hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
              >
                <span className="text-[10px] uppercase font-mono tracking-wider">Open Studio</span>
                <ArrowRight className="h-3 w-3 text-emerald-400" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div 
                onClick={() => onNavigateTab('compiler')} 
                className="cursor-pointer rounded-sm border border-white/10 bg-[#141418] p-3 hover:border-emerald-500/40 transition-all text-center group"
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">YouTube</div>
                <div className="mt-1 text-sm font-light italic text-white group-hover:text-emerald-300">Package</div>
                <div className="text-[9px] font-mono opacity-40 mt-1">3 Titles • 94% CTR</div>
              </div>

              <div 
                onClick={() => onNavigateTab('compiler')} 
                className="cursor-pointer rounded-sm border border-white/10 bg-[#141418] p-3 hover:border-emerald-500/40 transition-all text-center group"
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Shorts</div>
                <div className="mt-1 text-sm font-light italic text-white group-hover:text-emerald-300">4 Ranked</div>
                <div className="text-[9px] font-mono opacity-40 mt-1">Virality 94/100</div>
              </div>

              <div 
                onClick={() => onNavigateTab('compiler')} 
                className="cursor-pointer rounded-sm border border-white/10 bg-[#141418] p-3 hover:border-emerald-500/40 transition-all text-center group"
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">LinkedIn</div>
                <div className="mt-1 text-sm font-light italic text-white group-hover:text-emerald-300">Deep Dive</div>
                <div className="text-[9px] font-mono opacity-40 mt-1">1,480 Chars</div>
              </div>

              <div 
                onClick={() => onNavigateTab('compiler')} 
                className="cursor-pointer rounded-sm border border-white/10 bg-[#141418] p-3 hover:border-emerald-500/40 transition-all text-center group"
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">X Thread</div>
                <div className="mt-1 text-sm font-light italic text-white group-hover:text-emerald-300">5 Posts</div>
                <div className="text-[9px] font-mono opacity-40 mt-1">High-Retention</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: AI Closed-Loop Next-Action Recommendation in Editorial Style */}
        <div className="space-y-6">
          <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">Signal Intelligence</span>
              <span className="text-[9px] font-mono uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm border border-emerald-500/20">
                +{analyticsSummary.recentSpike.viewsVsBaseline}% Spike
              </span>
            </div>
            
            <div className="border-l-2 border-emerald-500 pl-3 py-1 bg-white/[0.02]">
              <div className="text-xs font-medium text-white">"{analyticsSummary.recentSpike.topic}"</div>
              <p className="text-[11px] opacity-50 mt-1 leading-relaxed">
                Outperforming channel average baseline by +{analyticsSummary.recentSpike.viewsVsBaseline}% views.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40">
                Recommended Actions:
              </div>
              {analyticsSummary.recentSpike.recommendedActions.slice(0, 3).map((act, idx) => (
                <div
                  key={act.id}
                  onClick={() => onNavigateTab('analytics')}
                  className="group cursor-pointer rounded-sm border border-white/10 bg-[#141418] p-3 hover:border-emerald-500/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#E0E0E0] group-hover:text-emerald-300">
                      0{idx + 1} / {act.title}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">
                      {act.expectedROI}
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] opacity-40 leading-relaxed line-clamp-2">
                    {act.description}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigateTab('analytics')}
              className="mt-5 w-full rounded-sm border border-white/10 bg-[#141418] hover:border-emerald-500/40 hover:bg-emerald-500/10 py-2.5 text-center text-[10px] font-mono uppercase tracking-widest text-[#E0E0E0] hover:text-emerald-300 transition-all"
            >
              Analyze Feedback & Mine Audience →
            </button>
          </div>

          {/* ProofFlow Alert Widget */}
          <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-emerald-500">ProofFlow Gate</div>
              <span className="font-mono text-xs font-bold text-emerald-400">{proofFlowReport.overallTrustScore}.0%</span>
            </div>

            <p className="mt-2 text-xs opacity-50 leading-relaxed">
              Automated defense against hallucinations, numeric errors, and accidental distortions before release.
            </p>

            <div className="mt-4 flex items-center justify-between rounded-sm border border-white/10 bg-[#141418] p-3 text-xs">
              <span className="text-[10px] uppercase tracking-wider opacity-40">Claims Verified</span>
              <span className="font-mono text-xs text-white">{proofFlowReport.totalClaimsChecked} statements</span>
            </div>

            <button
              onClick={() => onNavigateTab('proofflow')}
              className="mt-4 w-full rounded-sm border border-white/10 bg-[#141418] hover:border-white/20 py-2.5 text-center text-[10px] font-mono uppercase tracking-widest text-white/80 hover:text-white transition-colors"
            >
              Inspect Quality Gate →
            </button>
          </div>
        </div>
      </div>

      {/* Project Milestones / Architectural Innovations in Editorial Design Style */}
      <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">System Architecture</span>
            <h3 className="text-xl font-light italic tracking-tight text-white mt-1">Core Autonomous Innovations</h3>
          </div>
          <div className="hidden sm:flex gap-1.5">
            <div className="w-4 h-1 bg-emerald-500"></div>
            <div className="w-4 h-1 bg-white/10"></div>
            <div className="w-4 h-1 bg-white/10"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div 
            onClick={() => onNavigateTab('planner')} 
            className="cursor-pointer rounded-sm border border-white/10 bg-[#141418] p-6 hover:border-emerald-500/40 transition-all group"
          >
            <div className="text-2xl font-light italic text-white group-hover:text-emerald-400 transition-colors">Phase 01</div>
            <div className="text-[10px] uppercase text-emerald-500 font-bold tracking-wider mt-1">Autonomous DAG Planner</div>
            <p className="mt-3 text-xs opacity-50 leading-relaxed">
              Transforms raw input into a dependency-aware execution DAG graph. Dynamically chooses formats and parallelizes compilation.
            </p>
          </div>

          <div 
            onClick={() => onNavigateTab('compiler')} 
            className="cursor-pointer rounded-sm border border-white/10 bg-[#141418] p-6 hover:border-emerald-500/40 transition-all group"
          >
            <div className="text-2xl font-light italic text-white group-hover:text-emerald-400 transition-colors">Phase 02</div>
            <div className="text-[10px] uppercase text-emerald-500 font-bold tracking-wider mt-1">Content IR & Compilers</div>
            <p className="mt-3 text-xs opacity-50 leading-relaxed">
              Treats content like code. Generates a structured Intermediate Representation (IR) so all target formats compile from singular truth.
            </p>
          </div>

          <div 
            onClick={() => onNavigateTab('proofflow')} 
            className="cursor-pointer rounded-sm border border-white/10 bg-[#141418] p-6 hover:border-emerald-500/40 transition-all group"
          >
            <div className="text-2xl font-light italic text-white group-hover:text-emerald-400 transition-colors">Phase 03</div>
            <div className="text-[10px] uppercase text-emerald-500 font-bold tracking-wider mt-1">ProofFlow Quality Gate</div>
            <p className="mt-3 text-xs opacity-50 leading-relaxed">
              Automated pre-publish verification that flags semantic drift, numeric discrepancies, and quote distortions with 1-click surgical repair.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
