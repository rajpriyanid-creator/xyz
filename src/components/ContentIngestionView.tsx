import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  Play,
  Pause,
  Clock,
  CheckCircle2,
  Tag,
  Quote,
  Sparkles,
  Layers,
  Code2,
  Copy,
  Check,
  ChevronRight,
  Video,
  Volume2,
  Flame,
  ShieldCheck,
  Search
} from 'lucide-react';
import { ContentSource, ContentIR, TranscriptSegment } from '../types';

interface ContentIngestionViewProps {
  currentSource: ContentSource;
  contentIR: ContentIR;
  allSources: ContentSource[];
  onSelectSource: (src: ContentSource) => void;
  onUploadCustomText: (title: string, text: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const ContentIngestionView: React.FC<ContentIngestionViewProps> = ({
  currentSource,
  contentIR,
  allSources,
  onSelectSource,
  onUploadCustomText,
  onNavigateTab
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSec, setCurrentSec] = useState<number>(0);
  const [activeSegmentId, setActiveSegmentId] = useState<string>('t1');
  const [irTab, setIrTab] = useState<'insights' | 'claims' | 'moments' | 'quotes' | 'hooks' | 'rawJson'>('insights');
  const [copiedJson, setCopiedJson] = useState<boolean>(false);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customTranscript, setCustomTranscript] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle segment click
  const handleSeek = (seg: TranscriptSegment) => {
    setCurrentSec(seg.startSec);
    setActiveSegmentId(seg.id);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(contentIR, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle || !customTranscript) return;
    onUploadCustomText(customTitle, customTranscript);
    setShowUploadModal(false);
    setCustomTitle('');
    setCustomTranscript('');
  };

  // Filter transcript segments by search
  const filteredTranscript = currentSource.transcript.filter(t => 
    t.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.timestamp.includes(searchQuery)
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Source Selection Presets in Editorial Layout */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">
              01 / Ingestion & Content IR
            </span>
            <span className="text-white/20">•</span>
            <span className="rounded-sm bg-white/10 px-2 py-0.5 text-[9px] font-mono uppercase text-white/80">
              {currentSource.type.toUpperCase()}
            </span>
          </div>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-light italic tracking-tight text-white">
            Content Intelligence & <span className="font-bold not-italic text-white">Shared State</span>
          </h2>
          <p className="text-xs text-[#A0A0A5] max-w-2xl mt-1">
            Raw source audio/video is decomposed into an Intermediate Representation (Content IR) for deterministic multi-platform compilation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 rounded-sm border border-white/10 bg-[#141418] px-3.5 py-2.5 text-xs font-semibold text-white/80 hover:text-white hover:border-white/20 transition-all"
          >
            <UploadCloud className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[11px] uppercase tracking-wider">Ingest Custom Stream</span>
          </button>

          <button
            onClick={() => onNavigateTab('planner')}
            className="flex items-center gap-2 rounded-sm bg-emerald-500 hover:bg-emerald-400 px-4 py-2.5 text-xs font-bold text-black uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
          >
            <span className="text-[11px]">Proceed to DAG Planner</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Preset Source Picker Carousel */}
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-500 mb-3">
          Select Active Source Stream:
        </div>
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
          {allSources.map((src) => {
            const isSelected = src.id === currentSource.id;
            return (
              <div
                key={src.id}
                onClick={() => onSelectSource(src)}
                className={`cursor-pointer rounded-sm border p-4 transition-all relative ${
                  isSelected
                    ? 'border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                    : 'border-white/10 bg-[#0F0F12] hover:border-white/20 hover:bg-[#141418]'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-emerald-500" />
                )}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold text-white/70">
                    {src.type === 'video' ? <Video className="h-3 w-3 text-emerald-400" /> : <Volume2 className="h-3 w-3 text-purple-400" />}
                    <span>{src.type}</span>
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400 font-semibold">{src.duration}</span>
                </div>
                <h4 className="mt-2 text-sm font-medium text-white line-clamp-1">{src.title}</h4>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {src.topics.slice(0, 2).map((t, idx) => (
                    <span key={idx} className="rounded-sm bg-white/5 border border-white/5 px-2 py-0.5 text-[9px] font-mono text-white/60">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Split: Source Player & Transcript on Left, Content IR on Right */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Col (5 cols): Media Player & Timestamped Transcript */}
        <div className="lg:col-span-5 space-y-4">
          {/* Simulated Media Player Card */}
          <div className="overflow-hidden rounded-sm border border-white/10 bg-[#0F0F12] shadow-md">
            <div className="relative aspect-video bg-[#0A0A0B] p-5 flex flex-col justify-between border-b border-white/10">
              <div className="flex items-center justify-between text-xs text-white/50">
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                  AUDIO STREAM ANALYSIS
                </span>
                <span className="font-mono text-[11px] text-white/60">{currentSource.duration}</span>
              </div>

              {/* Center visual audio waveforms / preview */}
              <div className="my-auto flex items-center justify-center gap-1.5 py-4">
                {[40, 65, 30, 85, 95, 45, 60, 100, 75, 50, 90, 60, 40, 80, 55, 30, 90, 65, 45, 70].map((h, i) => (
                  <div
                    key={i}
                    className={`w-1 transition-all duration-300 ${
                      isPlaying ? 'bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]' : 'bg-white/20'
                    }`}
                    style={{ height: `${(h / 100) * 44}px` }}
                  />
                ))}
              </div>

              {/* Player Bottom Controls */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-emerald-400 text-[11px] font-bold">
                    {Math.floor(currentSec / 60)}:{(currentSec % 60).toString().padStart(2, '0')}
                  </span>
                  <span className="text-[11px] font-mono text-white/50">{currentSource.speakerName}</span>
                </div>

                <div className="h-1.5 w-full bg-white/10 overflow-hidden cursor-pointer">
                  <div 
                    className="h-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" 
                    style={{ width: `${Math.min(100, (currentSec / currentSource.durationSec) * 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-1.5 rounded-sm border border-white/10 bg-[#141418] px-3 py-1 text-xs font-semibold text-white/80 hover:text-white hover:border-white/20 transition-colors"
                  >
                    {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 fill-current text-emerald-400" />}
                    <span className="text-[11px] uppercase font-mono tracking-wider">{isPlaying ? 'Pause' : 'Simulate Playback'}</span>
                  </button>

                  <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400">100% Provenance Bound</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transcript Reader */}
          <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-500">Timestamped Transcript</span>
              </div>
              <span className="text-[10px] font-mono text-white/40">{currentSource.transcript.length} Segments</span>
            </div>

            {/* Search filter in transcript */}
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-white/40" />
              <input
                type="text"
                placeholder="Search transcript by keyword or timestamp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-sm border border-white/10 bg-[#141418] pl-8 pr-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Segment List */}
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {filteredTranscript.map((seg) => {
                const isActive = activeSegmentId === seg.id;
                return (
                  <div
                    key={seg.id}
                    onClick={() => handleSeek(seg)}
                    className={`cursor-pointer rounded-sm p-3 text-xs transition-all ${
                      isActive
                        ? 'border border-emerald-500/40 bg-emerald-500/10 text-white shadow-sm'
                        : 'border border-white/5 bg-[#141418] text-[#C0C0C5] hover:border-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] font-bold text-emerald-400">{seg.timestamp}</span>
                      <span className="text-[10px] font-mono text-white/40">{seg.speaker}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#A0A0A5]">{seg.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col (7 cols): Content Intermediate Representation (Content IR) Hub */}
        <div className="lg:col-span-7">
          <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-sm">
            {/* Header with Tab Navigation */}
            <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">
                  Extracted IR Schema
                </span>
                <h3 className="text-lg font-light italic tracking-tight text-white mt-0.5">
                  Intermediate Representation
                </h3>
              </div>

              {/* Sub-tabs */}
              <div className="flex flex-wrap gap-1 rounded-sm border border-white/10 bg-[#141418] p-1">
                {(['insights', 'claims', 'moments', 'quotes', 'hooks', 'rawJson'] as const).map((tabKey) => {
                  const labels: Record<string, string> = {
                    insights: 'Insights',
                    claims: `Claims (${contentIR.claims.length})`,
                    moments: `Moments (${contentIR.moments.length})`,
                    quotes: `Quotes (${contentIR.quotes.length})`,
                    hooks: 'Hooks',
                    rawJson: 'JSON IR'
                  };
                  const active = irTab === tabKey;
                  return (
                    <button
                      key={tabKey}
                      onClick={() => setIrTab(tabKey)}
                      className={`rounded-sm px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-all ${
                        active 
                          ? 'bg-emerald-500 text-black font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {labels[tabKey]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab 1: Key Insights & Executive Summary */}
            {irTab === 'insights' && (
              <div className="mt-5 space-y-5">
                <div className="rounded-sm border border-white/10 bg-[#141418] p-5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-500 mb-2">
                    Core Thesis & Summary
                  </div>
                  <p className="text-xs leading-relaxed text-[#C0C0C5]">
                    {contentIR.summary}
                  </p>
                </div>

                {/* Key Insights List */}
                <div className="space-y-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
                    Extracted Knowledge Pillars:
                  </div>
                  {contentIR.keyInsights.map((insight, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-sm border border-white/10 bg-[#141418] p-3 text-xs">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-emerald-500/10 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/30">
                        0{idx + 1}
                      </span>
                      <p className="text-[#C0C0C5] leading-relaxed">{insight}</p>
                    </div>
                  ))}
                </div>

                {/* Key Statistics Grid */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-2.5">
                    Verified Numeric Benchmarks:
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {contentIR.statistics.map((stat, idx) => (
                      <div key={idx} className="rounded-sm border border-white/10 bg-[#141418] p-3.5">
                        <div className="text-[9px] uppercase font-mono tracking-wider opacity-40">{stat.label}</div>
                        <div className="mt-1 text-base font-light italic font-mono text-emerald-400">{stat.value}</div>
                        <div className="text-[10px] opacity-50 mt-1">{stat.context}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Controversial / Contrarian Opinions */}
                {contentIR.controversialOpinions.length > 0 && (
                  <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 p-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-2">
                      <Flame className="h-3.5 w-3.5 text-amber-400" />
                      <span className="text-[10px] uppercase font-mono tracking-wider">Contrarian Signal:</span>
                    </div>
                    {contentIR.controversialOpinions.map((op, idx) => (
                      <p key={idx} className="text-xs text-[#E0E0E0] italic pl-5">
                        "{op}"
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Factual Claims */}
            {irTab === 'claims' && (
              <div className="mt-5 space-y-3 max-h-[460px] overflow-y-auto pr-1">
                <div className="text-[11px] font-mono opacity-50">
                  Showing {contentIR.claims.length} claims extracted with timestamp provenance.
                </div>

                {contentIR.claims.map((claim) => {
                  const isDrift = claim.verificationStatus === 'SEMANTIC_DRIFT';
                  const isNumeric = claim.verificationStatus === 'NUMERIC_MISMATCH';
                  
                  return (
                    <div
                      key={claim.id}
                      className={`rounded-sm border p-4 text-xs transition-all ${
                        isDrift
                          ? 'border-amber-500/40 bg-amber-500/10'
                          : isNumeric
                          ? 'border-red-500/40 bg-red-500/10'
                          : 'border-white/10 bg-[#141418]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold text-emerald-400">CLAIM #{claim.claimNumber}</span>
                          <span className="rounded-sm bg-white/10 px-1.5 py-0.5 text-[9px] uppercase font-mono text-white/80">
                            {claim.claimType}
                          </span>
                        </div>

                        <span className={`rounded-sm px-2 py-0.5 text-[9px] font-bold font-mono uppercase tracking-wider ${
                          claim.verificationStatus === 'VERIFIED'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : isDrift
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-red-500/20 text-red-300 border border-red-500/40'
                        }`}>
                          {claim.verificationStatus}
                        </span>
                      </div>

                      <p className="font-medium text-white">{claim.text}</p>

                      <div className="mt-2.5 rounded-sm border border-white/10 bg-[#0A0A0B] p-2.5 text-[11px]">
                        <div className="flex items-center justify-between text-[10px] text-emerald-400 mb-1 font-mono">
                          <span>TIMESTAMP: {claim.sourceSpan.timestamp}</span>
                          <span>Confidence: {Math.round(claim.confidence * 100)}%</span>
                        </div>
                        <p className="italic text-[#A0A0A5]">"{claim.sourceSpan.originalQuote}"</p>
                      </div>

                      {claim.driftReason && (
                        <div className="mt-2 text-[11px] text-amber-300 font-mono">
                          <strong>Detection:</strong> {claim.driftReason}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tab 3: Short Moments */}
            {irTab === 'moments' && (
              <div className="mt-5 space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {contentIR.moments.map((m) => (
                  <div key={m.id} className="rounded-sm border border-white/10 bg-[#141418] p-4 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-emerald-400">
                        MOMENT #{m.clipNumber} • {m.timestampRange} ({m.durationSeconds}s)
                      </span>
                      <span className="rounded-sm bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold font-mono text-emerald-300 border border-emerald-500/30">
                        Score: {m.overallScore}/100
                      </span>
                    </div>

                    <h4 className="mt-1.5 text-sm font-medium text-white">{m.title}</h4>
                    <p className="mt-1 text-[#A0A0A5] italic">Hook: "{m.hook}"</p>

                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {m.reasons.map((r, i) => (
                        <span key={i} className="rounded-sm bg-white/5 border border-white/5 px-2 py-0.5 text-[9px] font-mono text-white/60">
                          ✓ {r}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: Quotes */}
            {irTab === 'quotes' && (
              <div className="mt-5 space-y-3">
                {contentIR.quotes.map((q) => (
                  <div key={q.id} className="rounded-sm border border-white/10 bg-[#141418] p-4 text-xs">
                    <div className="flex items-center justify-between text-[10px] opacity-50 mb-2 font-mono">
                      <span className="text-emerald-400">{q.speaker} • {q.timestamp}</span>
                      <span className="rounded-sm bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5">
                        {q.fidelityScore}% Fidelity
                      </span>
                    </div>
                    <p className="text-sm font-light italic text-white">
                      "{q.quote}"
                    </p>
                    <div className="mt-2 text-[10px] opacity-40 font-mono">
                      Context: {q.context}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 5: Hooks */}
            {irTab === 'hooks' && (
              <div className="mt-5 space-y-3">
                {contentIR.hooks.map((h) => (
                  <div key={h.id} className="rounded-sm border border-white/10 bg-[#141418] p-4 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="rounded-sm bg-emerald-500/10 px-2 py-0.5 text-[9px] uppercase font-mono text-emerald-300 border border-emerald-500/30">
                        {h.hookType}
                      </span>
                      <span className="font-mono text-[10px] text-emerald-400">
                        ~{h.estimatedRetentionMultiplier}x Est. Retention
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-light italic text-white">"{h.hookText}"</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 6: Raw JSON IR */}
            {irTab === 'rawJson' && (
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-xs opacity-50">
                  <span className="font-mono text-[10px] uppercase">Structured Intermediate Representation Schema</span>
                  <button
                    onClick={handleCopyJson}
                    className="flex items-center gap-1.5 rounded-sm border border-white/10 bg-[#141418] px-2.5 py-1 text-xs font-semibold text-white/80 hover:text-white"
                  >
                    {copiedJson ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span className="text-[10px] font-mono">{copiedJson ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                </div>
                <pre className="max-h-[420px] overflow-auto rounded-sm border border-white/10 bg-[#0A0A0B] p-4 font-mono text-[11px] text-emerald-300/90 leading-relaxed">
                  {JSON.stringify(contentIR, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Custom Text/Transcript Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-light italic text-white">Ingest Custom Source Content</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-white/40 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCustomSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-1">
                  Source Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How We Built an AI Agent in 48 Hours"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full rounded-sm border border-white/10 bg-[#141418] px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-1">
                  Transcript / Article / Audio Notes
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Paste timestamped transcript or text here... e.g. 00:00 - Today we launched our new LLM stack..."
                  value={customTranscript}
                  onChange={(e) => setCustomTranscript(e.target.value)}
                  className="w-full rounded-sm border border-white/10 bg-[#141418] px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="rounded-sm border border-white/10 px-4 py-2 text-xs font-semibold text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-sm bg-emerald-500 px-4 py-2 text-xs font-bold text-black hover:bg-emerald-400"
                >
                  Analyze & Build Content IR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
