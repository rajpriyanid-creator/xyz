import React, { useState } from 'react';
import {
  Cpu,
  Youtube,
  Linkedin,
  Twitter,
  Mail,
  Film,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Clock,
  Eye,
  Tag,
  Flame,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { GeneratedAssetsPackage, ContentIR, ContentSource } from '../types';

interface ContentCompilerViewProps {
  assets: GeneratedAssetsPackage;
  contentIR: ContentIR;
  currentSource: ContentSource;
  onNavigateTab: (tab: string) => void;
}

export const ContentCompilerView: React.FC<ContentCompilerViewProps> = ({
  assets,
  contentIR,
  currentSource,
  onNavigateTab
}) => {
  const [activePlatform, setActivePlatform] = useState<'linkedin' | 'x' | 'youtube' | 'shorts' | 'newsletter'>('linkedin');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedShortIndex, setSelectedShortIndex] = useState<number>(0);
  const [selectedYtTitleIndex, setSelectedYtTitleIndex] = useState<number>(assets.youtube.selectedTitleIndex);
  const [selectedNewsletterSubjectIndex, setSelectedNewsletterSubjectIndex] = useState<number>(assets.newsletter.selectedSubjectIndex);
  const [provenanceHighlight, setProvenanceHighlight] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Platform Switcher */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">
              03 / Generative Compilers
            </span>
            <span className="text-white/20">•</span>
            <span className="rounded-sm bg-emerald-500/10 px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-400 border border-emerald-500/20">
              IR-POWERED TRANSFORMATION
            </span>
          </div>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-light italic tracking-tight text-white">
            Multi-Platform <span className="font-bold not-italic text-white">Asset Synthesis</span>
          </h2>
          <p className="text-xs text-[#A0A0A5] max-w-2xl mt-1">
            Each platform receives a bespoke, controlled transformation of the verified Content IR instead of uncontrolled raw text rewrites.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('proofflow')}
          className="flex items-center gap-2 rounded-sm bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all"
        >
          <ShieldCheck className="h-4 w-4 text-black" />
          <span>Verify in ProofFlow Gate</span>
          <ChevronRight className="h-4 w-4 text-black" />
        </button>
      </div>

      {/* Platform Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 rounded-sm border border-white/10 bg-[#0F0F12] p-1.5">
        <button
          onClick={() => setActivePlatform('linkedin')}
          className={`flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
            activePlatform === 'linkedin'
              ? 'bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'text-white/60 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Linkedin className="h-3.5 w-3.5" />
          <span>LinkedIn Post</span>
        </button>

        <button
          onClick={() => setActivePlatform('x')}
          className={`flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
            activePlatform === 'x'
              ? 'bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'text-white/60 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Twitter className="h-3.5 w-3.5" />
          <span>X Thread</span>
        </button>

        <button
          onClick={() => setActivePlatform('youtube')}
          className={`flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
            activePlatform === 'youtube'
              ? 'bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'text-white/60 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Youtube className="h-3.5 w-3.5" />
          <span>YouTube Package</span>
        </button>

        <button
          onClick={() => setActivePlatform('shorts')}
          className={`flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
            activePlatform === 'shorts'
              ? 'bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'text-white/60 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Film className="h-3.5 w-3.5" />
          <span>Shorts Engine ({assets.shorts.length} Clips)</span>
        </button>

        <button
          onClick={() => setActivePlatform('newsletter')}
          className={`flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
            activePlatform === 'newsletter'
              ? 'bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'text-white/60 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Mail className="h-3.5 w-3.5" />
          <span>Newsletter Issue</span>
        </button>
      </div>

      {/* Compiler Platform Body */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Col (8 cols): Platform Output View */}
        <div className="lg:col-span-8 space-y-4">
          {/* 1. LinkedIn Compiler View */}
          {activePlatform === 'linkedin' && (
            <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Linkedin className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-medium text-white">LinkedIn Executive Commentary</span>
                </div>

                <div className="flex items-center gap-3 text-xs opacity-60">
                  <span className="font-mono">{assets.linkedin.characterCount} chars</span>
                  <span>•</span>
                  <span className="font-mono">{assets.linkedin.estimatedReadTime}</span>
                  <button
                    onClick={() => handleCopy(`${assets.linkedin.hook}\n\n${assets.linkedin.body}\n\n${assets.linkedin.cta}\n\n${assets.linkedin.hashtags.join(' ')}`, 'linkedin')}
                    className="flex items-center gap-1.5 rounded-sm border border-white/10 bg-[#141418] px-3 py-1 text-xs font-mono uppercase tracking-wider text-white hover:border-emerald-500/50 transition-all ml-2"
                  >
                    {copiedKey === 'linkedin' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedKey === 'linkedin' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Hook Banner */}
              <div 
                onClick={() => setProvenanceHighlight('11:42 – "If your feedback loop takes more than five minutes, your engineers lose cognitive flow."')}
                className="cursor-pointer rounded-sm border border-emerald-500/30 bg-emerald-500/5 p-4 hover:border-emerald-500/60 transition-all"
              >
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-1 font-mono">
                  Primary Hook (Click to inspect provenance link)
                </div>
                <p className="text-xs font-light italic text-white leading-relaxed">
                  "{assets.linkedin.hook}"
                </p>
              </div>

              {/* Formatted Post Body */}
              <div className="rounded-sm border border-white/10 bg-[#0A0A0B] p-5 text-xs leading-relaxed text-[#D0D0D5] font-sans whitespace-pre-wrap">
                {assets.linkedin.body}
              </div>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {assets.linkedin.hashtags.map((tag, i) => (
                  <span key={i} className="rounded-sm bg-[#141418] border border-white/10 px-2.5 py-1 text-[11px] text-emerald-400 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 2. X (Twitter) Thread Compiler */}
          {activePlatform === 'x' && (
            <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Twitter className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-medium text-white">5-Post Architectural Thread</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono opacity-50">{assets.xThread.suggestedPostingTime}</span>
                  <button
                    onClick={() => handleCopy(assets.xThread.threadPosts.map(p => p.text).join('\n\n---\n\n'), 'x_thread')}
                    className="flex items-center gap-1.5 rounded-sm border border-white/10 bg-[#141418] px-3 py-1 text-xs font-mono uppercase tracking-wider text-white hover:border-emerald-500/50 transition-all ml-2"
                  >
                    {copiedKey === 'x_thread' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedKey === 'x_thread' ? 'Copied' : 'Copy Thread'}</span>
                  </button>
                </div>
              </div>

              {/* Thread Cards Sequence */}
              <div className="space-y-3">
                {assets.xThread.threadPosts.map((post) => (
                  <div key={post.postNumber} className="rounded-sm border border-white/10 bg-[#0A0A0B] p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs opacity-60">
                      <span className="font-mono text-emerald-400 font-semibold">Post {post.postNumber}/{assets.xThread.totalPosts}</span>
                      <span className="font-mono text-[10px]">{post.characterCount} / 280 chars</span>
                    </div>
                    <p className="text-xs text-[#D0D0D5] whitespace-pre-wrap leading-relaxed font-sans">
                      {post.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. YouTube Package Compiler */}
          {activePlatform === 'youtube' && (
            <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Youtube className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-medium text-white">YouTube Distribution Metadata & Chapters</span>
                </div>

                <button
                  onClick={() => handleCopy(assets.youtube.description, 'yt_desc')}
                  className="flex items-center gap-1.5 rounded-sm border border-white/10 bg-[#141418] px-3 py-1 text-xs font-mono uppercase tracking-wider text-white hover:border-emerald-500/50 transition-all"
                >
                  {copiedKey === 'yt_desc' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedKey === 'yt_desc' ? 'Copied' : 'Copy Description'}</span>
                </button>
              </div>

              {/* Title Variations with CTR scores */}
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 mb-2 font-mono">
                  Predictive Title Variations (Ranked by Click-Through Predictor):
                </div>
                <div className="space-y-2">
                  {assets.youtube.titles.map((t, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedYtTitleIndex(idx)}
                      className={`cursor-pointer rounded-sm border p-3.5 text-xs transition-all ${
                        selectedYtTitleIndex === idx
                          ? 'border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                          : 'border-white/10 bg-[#0A0A0B] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">{t.title}</span>
                        <span className="rounded-sm bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold font-mono text-emerald-400 border border-emerald-500/30 shrink-0 ml-2">
                          {t.predictedCTR}% EST. CTR
                        </span>
                      </div>
                      <span className="mt-1 block text-[10px] opacity-40 font-mono">Angle: {t.angle}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thumbnail Concept Box */}
              <div className="rounded-sm border border-white/10 bg-[#0A0A0B] p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-emerald-400">Thumbnail Blueprint</span>
                  <span className="font-mono text-[10px] opacity-50">Text Overlay: "{assets.youtube.thumbnailConcept.headline}"</span>
                </div>
                <p className="text-xs text-[#C0C0C5]">{assets.youtube.thumbnailConcept.visualDescription}</p>
                <div className="text-[11px] opacity-50">
                  <strong className="text-white/80">Color Palette:</strong> {assets.youtube.thumbnailConcept.colorPalette}
                </div>
              </div>

              {/* Chapters List */}
              <div className="rounded-sm border border-white/10 bg-[#0A0A0B] p-4 space-y-2">
                <div className="text-[9px] font-mono uppercase tracking-[0.2em] opacity-40">Timestamp Chapters</div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
                  {assets.youtube.chapters.map((ch, i) => (
                    <div key={i} className="flex items-center gap-2 font-mono text-white/80">
                      <span className="text-emerald-400 font-bold">{ch.timestamp}</span>
                      <span className="truncate">{ch.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. Shorts / Reels Engine */}
          {activePlatform === 'shorts' && (
            <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Film className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-medium text-white">Shorts & Reels Virality Engine</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm border border-emerald-500/20">
                  {assets.shorts.length} CLIPS INDEXED
                </span>
              </div>

              {/* Short Moment Selector Tabs */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {assets.shorts.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedShortIndex(idx)}
                    className={`rounded-sm border p-3 text-left text-xs transition-all ${
                      selectedShortIndex === idx
                        ? 'border-emerald-500/60 bg-emerald-500/10 text-white shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                        : 'border-white/10 bg-[#0A0A0B] text-white/60 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-wider">Clip #{s.clipNumber}</span>
                      <span className="text-[9px] font-mono text-emerald-400 font-bold">{s.overallScore}/100</span>
                    </div>
                    <div className="mt-1 font-medium text-white truncate">{s.title}</div>
                  </button>
                ))}
              </div>

              {/* Selected Short Detailed Breakdown & 9:16 Portrait Preview */}
              {assets.shorts[selectedShortIndex] && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-12 rounded-sm border border-white/10 bg-[#0A0A0B] p-5">
                  {/* Left: 9:16 Vertical Video Preview Simulator */}
                  <div className="sm:col-span-5 flex flex-col items-center">
                    <div className="relative aspect-[9/16] w-full max-w-[200px] overflow-hidden rounded-sm border border-white/20 bg-[#141418] p-3 shadow-lg flex flex-col justify-between">
                      <div className="flex items-center justify-between text-[9px] text-emerald-400 font-mono">
                        <span>{assets.shorts[selectedShortIndex].durationSeconds}s</span>
                        <span className="rounded-sm bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5">9:16 HD</span>
                      </div>

                      {/* Center Hook Text Overlay */}
                      <div className="rounded-sm bg-black/90 p-3 text-center text-xs font-light italic text-white border border-white/10 shadow">
                        "{assets.shorts[selectedShortIndex].hook}"
                      </div>

                      <div className="text-[9px] text-white/40 font-mono truncate">
                        {assets.shorts[selectedShortIndex].timestampRange}
                      </div>
                    </div>
                  </div>

                  {/* Right: Scoring Breakdown & Reasons */}
                  <div className="sm:col-span-7 space-y-3.5 text-xs">
                    <div>
                      <h4 className="text-sm font-light italic text-white">{assets.shorts[selectedShortIndex].title}</h4>
                      <p className="text-white/40 text-[10px] font-mono mt-0.5">TIMECODE: {assets.shorts[selectedShortIndex].timestampRange}</p>
                    </div>

                    {/* 5-Factor Score Radar */}
                    <div className="space-y-2 rounded-sm border border-white/10 bg-[#141418] p-3.5">
                      <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400 font-mono">
                        5-Factor Virality Audit:
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>Hook Strength: <strong className="font-mono text-emerald-400">{assets.shorts[selectedShortIndex].scoreBreakdown.hookStrength}%</strong></div>
                        <div>Context Standalone: <strong className="font-mono text-emerald-400">{assets.shorts[selectedShortIndex].scoreBreakdown.standaloneContext}%</strong></div>
                        <div>Info Density: <strong className="font-mono text-emerald-400">{assets.shorts[selectedShortIndex].scoreBreakdown.infoDensity}%</strong></div>
                        <div>Shareability: <strong className="font-mono text-emerald-400">{assets.shorts[selectedShortIndex].scoreBreakdown.shareability}%</strong></div>
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] font-mono uppercase opacity-40 block mb-0.5">Suggested B-Roll</span>
                      <p className="text-[#A0A0A5] italic">{assets.shorts[selectedShortIndex].suggestedBroll}</p>
                    </div>

                    <div>
                      <span className="text-[9px] font-mono uppercase opacity-40 block mb-0.5">Caption Prompt</span>
                      <p className="text-white/80">{assets.shorts[selectedShortIndex].caption}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 5. Newsletter Issue Compiler */}
          {activePlatform === 'newsletter' && (
            <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-medium text-white">Technical Newsletter Edition</span>
                </div>

                <button
                  onClick={() => handleCopy(`${assets.newsletter.openingStory}\n\n${assets.newsletter.coreInsight}`, 'newsletter')}
                  className="flex items-center gap-1.5 rounded-sm border border-white/10 bg-[#141418] px-3 py-1 text-xs font-mono uppercase tracking-wider text-white hover:border-emerald-500/50 transition-all"
                >
                  {copiedKey === 'newsletter' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedKey === 'newsletter' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Subject Lines */}
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 mb-2 font-mono">Subject Lines:</div>
                <div className="space-y-1.5">
                  {assets.newsletter.subjectLines.map((subj, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedNewsletterSubjectIndex(idx)}
                      className={`cursor-pointer rounded-sm border p-3 text-xs transition-all ${
                        selectedNewsletterSubjectIndex === idx
                          ? 'border-emerald-500/60 bg-emerald-500/10 text-white font-medium shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                          : 'border-white/10 bg-[#0A0A0B] text-white/70 hover:border-white/20'
                      }`}
                    >
                      {subj}
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Body Preview */}
              <div className="rounded-sm border border-white/10 bg-[#0A0A0B] p-5 space-y-4 text-xs leading-relaxed text-[#C0C0C5]">
                <p className="font-semibold text-emerald-400 font-mono">{assets.newsletter.salutation}</p>
                <p className="text-white/90">{assets.newsletter.openingStory}</p>
                <div className="rounded-sm border border-white/10 bg-[#141418] p-4 italic text-white">
                  {assets.newsletter.coreInsight}
                </div>

                {assets.newsletter.breakdownSections.map((sec, i) => (
                  <div key={i} className="space-y-1.5 pt-1">
                    <h5 className="font-medium text-white text-xs">{sec.heading}</h5>
                    <p className="text-white/70">{sec.content}</p>
                  </div>
                ))}

                <div className="rounded-sm border border-emerald-500/20 bg-emerald-500/5 p-4 text-emerald-300">
                  <strong className="text-emerald-400">Action Step:</strong> {assets.newsletter.actionableStep}
                </div>

                <p className="whitespace-pre-wrap opacity-40 font-mono pt-2">{assets.newsletter.closingSignoff}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Col (4 cols): Side-by-Side Provenance Inspector */}
        <div className="lg:col-span-4 space-y-4">
          <div className="sticky top-20 rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">Provenance Gate</span>
              </div>
              <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm border border-emerald-500/20">
                100% BOUND
              </span>
            </div>

            <p className="text-xs text-[#A0A0A5] leading-relaxed">
              Every factual sentence produced by the compiler maps directly back to a verified timestamp in the source video.
            </p>

            {provenanceHighlight ? (
              <div className="rounded-sm border border-emerald-500/40 bg-emerald-500/10 p-3.5 text-xs">
                <div className="text-[9px] font-bold uppercase text-emerald-400 mb-1 font-mono tracking-wider">Active Provenance Link</div>
                <p className="text-white">{provenanceHighlight}</p>
              </div>
            ) : (
              <div className="rounded-sm border border-white/10 bg-[#0A0A0B] p-3.5 text-xs opacity-40 italic">
                Click any highlighted claim or hook on the left to inspect its original spoken timestamp.
              </div>
            )}

            <div className="space-y-2 pt-2">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 font-mono">
                Extracted Grounding Anchors:
              </div>
              {contentIR.claims.slice(0, 3).map((c) => (
                <div key={c.id} className="rounded-sm border border-white/10 bg-[#141418] p-3 text-xs">
                  <div className="flex items-center justify-between text-[9px] font-mono text-emerald-400 mb-1">
                    <span>{c.sourceSpan.timestamp}</span>
                    <span>CONF: {Math.round(c.confidence * 100)}%</span>
                  </div>
                  <p className="text-white/80 italic text-[11px]">"{c.sourceSpan.originalQuote}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
