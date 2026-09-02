import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Wand2,
  FileCheck,
  Zap,
  Info,
  ExternalLink,
  Check,
  Clock,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProofFlowReport, Claim } from '../types';

interface ProofFlowInspectorProps {
  report: ProofFlowReport;
  onFixClaim: (claimId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const ProofFlowInspector: React.FC<ProofFlowInspectorProps> = ({
  report,
  onFixClaim,
  onNavigateTab
}) => {
  const [filter, setFilter] = useState<'all' | 'issues' | 'verified'>('all');
  const [selectedClaim, setSelectedClaim] = useState<Claim>(
    report.claims.find(c => c.verificationStatus === 'SEMANTIC_DRIFT' || c.verificationStatus === 'NUMERIC_MISMATCH') || report.claims[0]
  );
  const [fixingId, setFixingId] = useState<string | null>(null);

  const handleFix = (claim: Claim) => {
    setFixingId(claim.id);
    setTimeout(() => {
      onFixClaim(claim.id);
      setFixingId(null);
      // Trigger festive confetti celebration on repair
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  const filteredClaims = report.claims.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'issues') return c.verificationStatus === 'SEMANTIC_DRIFT' || c.verificationStatus === 'NUMERIC_MISMATCH';
    if (filter === 'verified') return c.verificationStatus === 'VERIFIED' || c.isFixed;
    return true;
  });

  const unresolvedCount = report.claims.filter(
    c => (c.verificationStatus === 'SEMANTIC_DRIFT' || c.verificationStatus === 'NUMERIC_MISMATCH') && !c.isFixed
  ).length;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">
              04 / ProofFlow Quality Gate
            </span>
            <span className="text-white/20">•</span>
            <span className="rounded-sm bg-emerald-500/10 px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-400 border border-emerald-500/20">
              EDITORIAL FIREWALL
            </span>
          </div>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-light italic tracking-tight text-white">
            Automated <span className="font-bold not-italic text-white">Factual Integrity Gate</span>
          </h2>
          <p className="text-xs text-[#A0A0A5] max-w-2xl mt-1">
            Detects semantic drift, numeric distortion, and ungrounded statements across all compiled assets before publication.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('calendar')}
          className="flex items-center gap-2 rounded-sm bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all"
        >
          <span>Proceed to Publishing Plan</span>
          <ChevronRight className="h-4 w-4 text-black" />
        </button>
      </div>

      {/* Trust Score Gauge & 6-Dimension Audit Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Big Trust Score Card (4 cols) */}
        <div className="lg:col-span-4 rounded-sm border border-white/10 bg-[#0F0F12] p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500 mb-1">
              Audit Index
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-5xl font-light italic font-mono text-emerald-400">
                {report.overallTrustScore}
              </span>
              <span className="opacity-40 font-mono text-xl">/ 100</span>
            </div>

            <div className="mt-4">
              <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-700"
                  style={{ width: `${report.overallTrustScore}%` }}
                />
              </div>
            </div>

            <p className="mt-4 text-xs text-[#A0A0A5] leading-relaxed">
              {unresolvedCount > 0 ? (
                <span className="text-amber-400 font-medium flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                  {unresolvedCount} discrepancies require verification before publishing.
                </span>
              ) : (
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  All claims verified against source timestamps!
                </span>
              )}
            </p>
          </div>

          <div className="mt-6 rounded-sm border border-white/10 bg-[#141418] p-4 text-xs space-y-2">
            <div className="flex justify-between text-[#A0A0A5]">
              <span className="font-mono text-[11px]">Total Claims Audited:</span>
              <span className="font-mono font-bold text-white">{report.totalClaimsChecked}</span>
            </div>
            <div className="flex justify-between text-[#A0A0A5]">
              <span className="font-mono text-[11px]">Verified Spans:</span>
              <span className="font-mono text-emerald-400 font-bold">{report.verifiedCount}</span>
            </div>
            <div className="flex justify-between text-[#A0A0A5]">
              <span className="font-mono text-[11px]">Auto-Repaired:</span>
              <span className="font-mono text-emerald-400 font-bold">{report.resolvedIssuesCount}</span>
            </div>
          </div>
        </div>

        {/* 6-Dimension Breakdown Bars (8 cols) */}
        <div className="lg:col-span-8 rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-lg space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">Audit Matrices</span>
              <span className="text-white/20">•</span>
              <span className="text-xs font-mono text-white/70">6-Dimension Verification Weights</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm border border-emerald-500/20">
              PROOF_FLOW_v2.4
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-2 rounded-sm border border-white/10 bg-[#141418] p-3.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#A0A0A5]">Source Grounding (30%)</span>
                <span className="font-mono font-bold text-emerald-400">{report.scoreBreakdown.sourceGrounding}%</span>
              </div>
              <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${report.scoreBreakdown.sourceGrounding}%` }} />
              </div>
            </div>

            <div className="space-y-2 rounded-sm border border-white/10 bg-[#141418] p-3.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#A0A0A5]">Claim Consistency (25%)</span>
                <span className="font-mono font-bold text-emerald-400">{report.scoreBreakdown.claimConsistency}%</span>
              </div>
              <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${report.scoreBreakdown.claimConsistency}%` }} />
              </div>
            </div>

            <div className="space-y-2 rounded-sm border border-white/10 bg-[#141418] p-3.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#A0A0A5]">Numeric Integrity (15%)</span>
                <span className="font-mono font-bold text-emerald-400">{report.scoreBreakdown.numericIntegrity}%</span>
              </div>
              <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${report.scoreBreakdown.numericIntegrity}%` }} />
              </div>
            </div>

            <div className="space-y-2 rounded-sm border border-white/10 bg-[#141418] p-3.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#A0A0A5]">Quote Fidelity (15%)</span>
                <span className="font-mono font-bold text-emerald-400">{report.scoreBreakdown.quoteFidelity}%</span>
              </div>
              <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${report.scoreBreakdown.quoteFidelity}%` }} />
              </div>
            </div>

            <div className="space-y-2 rounded-sm border border-white/10 bg-[#141418] p-3.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#A0A0A5]">Semantic Fidelity (10%)</span>
                <span className="font-mono font-bold text-emerald-400">{report.scoreBreakdown.semanticFidelity}%</span>
              </div>
              <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${report.scoreBreakdown.semanticFidelity}%` }} />
              </div>
            </div>

            <div className="space-y-2 rounded-sm border border-white/10 bg-[#141418] p-3.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#A0A0A5]">Brand Alignment (5%)</span>
                <span className="font-mono font-bold text-emerald-400">{report.scoreBreakdown.brandAlignment}%</span>
              </div>
              <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${report.scoreBreakdown.brandAlignment}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Claim Explorer & DriftDiff Split */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Col (6 cols): Filterable Claims List */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-500">
              Audited Spans ({report.claims.length} Claims)
            </h3>

            <div className="flex gap-1.5">
              <button
                onClick={() => setFilter('all')}
                className={`rounded-sm px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-all ${
                  filter === 'all' ? 'bg-emerald-500 text-black font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('issues')}
                className={`rounded-sm px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-all ${
                  filter === 'issues' ? 'bg-amber-500 text-black font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                Discrepancies
              </button>
              <button
                onClick={() => setFilter('verified')}
                className={`rounded-sm px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-all ${
                  filter === 'verified' ? 'bg-emerald-500 text-black font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                Verified
              </button>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            {filteredClaims.map((claim) => {
              const isSelected = selectedClaim?.id === claim.id;
              const isDrift = claim.verificationStatus === 'SEMANTIC_DRIFT' && !claim.isFixed;
              const isNumeric = claim.verificationStatus === 'NUMERIC_MISMATCH' && !claim.isFixed;
              const isFixed = claim.isFixed;

              return (
                <div
                  key={claim.id}
                  onClick={() => setSelectedClaim(claim)}
                  className={`cursor-pointer rounded-sm border p-4 transition-all relative ${
                    isSelected
                      ? 'border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                      : isNumeric
                      ? 'border-red-500/30 bg-red-950/10 hover:border-red-500/50'
                      : isDrift
                      ? 'border-amber-500/30 bg-amber-950/10 hover:border-amber-500/50'
                      : 'border-white/10 bg-[#0F0F12] hover:border-white/20'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-emerald-500" />
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] font-bold text-emerald-400">
                        CLAIM #{claim.claimNumber}
                      </span>
                      <span className="rounded-sm bg-[#141418] border border-white/10 px-1.5 py-0.5 text-[9px] uppercase font-mono text-white/60">
                        {claim.claimType}
                      </span>
                    </div>

                    <span className={`rounded-sm px-2 py-0.5 text-[9px] font-bold font-mono uppercase tracking-wider ${
                      isFixed || claim.verificationStatus === 'VERIFIED'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : isDrift
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse'
                        : 'bg-red-500/10 text-red-400 border border-red-500/30 animate-pulse'
                    }`}>
                      {isFixed ? 'REPAIRED' : claim.verificationStatus}
                    </span>
                  </div>

                  <p className="text-xs font-light italic text-white line-clamp-2">
                    {claim.text}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] opacity-40 font-mono">
                    <span>{claim.sourceSpan.timestamp}</span>
                    <span>CONF: {Math.round(claim.confidence * 100)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col (6 cols): DriftDiff Side-by-Side Comparator & 1-Click Fixer */}
        <div className="lg:col-span-6 space-y-4">
          <div className="sticky top-20 rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-lg space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">DriftDiff Comparator</span>
                <h4 className="text-sm font-light italic text-white mt-0.5">Claim #{selectedClaim.claimNumber} Inspection</h4>
              </div>

              <span className={`rounded-sm px-2 py-0.5 text-[9px] font-bold font-mono uppercase tracking-wider ${
                selectedClaim.isFixed || selectedClaim.verificationStatus === 'VERIFIED'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              }`}>
                {selectedClaim.isFixed ? 'VERIFIED' : selectedClaim.verificationStatus}
              </span>
            </div>

            {/* Side-by-Side Original Source Truth vs Generated Copy */}
            <div className="space-y-3.5 text-xs">
              {/* Source Original */}
              <div className="rounded-sm border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1.5">
                <div className="flex items-center justify-between text-[9px] font-bold uppercase text-emerald-400 font-mono tracking-wider">
                  <span>Source Spoken Reference</span>
                  <span>{selectedClaim.sourceSpan.timestamp}</span>
                </div>
                <p className="text-white font-light italic text-xs leading-relaxed">
                  "{selectedClaim.sourceSpan.originalQuote}"
                </p>
              </div>

              {/* Generated Asset Statement */}
              <div className={`rounded-sm border p-4 space-y-1.5 ${
                selectedClaim.isFixed
                  ? 'border-emerald-500/40 bg-emerald-500/10'
                  : selectedClaim.verificationStatus !== 'VERIFIED'
                  ? 'border-red-500/30 bg-red-950/10'
                  : 'border-white/10 bg-[#0A0A0B]'
              }`}>
                <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-wider">
                  <span className={selectedClaim.isFixed ? 'text-emerald-400 font-bold' : 'text-red-400'}>
                    {selectedClaim.isFixed ? 'Repaired Statement' : 'Generated Output Statement'}
                  </span>
                  <span className="opacity-40">Context: Social / Thread</span>
                </div>
                <p className="text-[#D0D0D5] font-sans leading-relaxed text-xs">
                  {selectedClaim.isFixed && selectedClaim.proposedCorrection
                    ? selectedClaim.proposedCorrection
                    : selectedClaim.generatedContext || selectedClaim.text}
                </p>
              </div>
            </div>

            {/* Why was it flagged? Explanation */}
            {selectedClaim.driftReason && (
              <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 p-4 text-xs text-amber-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                  <span>Discrepancy Analysis:</span>
                </div>
                <p className="text-white/80 leading-relaxed pl-5 text-xs">
                  {selectedClaim.driftReason}
                </p>
              </div>
            )}

            {/* Proposed Fix & Action Button */}
            {selectedClaim.proposedCorrection && (
              <div className="space-y-3.5 pt-1">
                <div className="rounded-sm border border-white/10 bg-[#141418] p-4 text-xs">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 mb-1.5">Recommended Correction:</div>
                  <p className="text-white leading-relaxed italic text-xs">
                    "{selectedClaim.proposedCorrection}"
                  </p>
                </div>

                {!selectedClaim.isFixed ? (
                  <button
                    onClick={() => handleFix(selectedClaim)}
                    disabled={fixingId === selectedClaim.id}
                    className="flex w-full items-center justify-center gap-2 rounded-sm bg-emerald-500 hover:bg-emerald-400 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all"
                  >
                    {fixingId === selectedClaim.id ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin text-black" />
                        <span>Applying Surgical Correction...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4 text-black" />
                        <span>Fix Automatically (Align to Source)</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 rounded-sm bg-emerald-500/10 border border-emerald-500/40 py-2.5 text-xs font-mono uppercase tracking-wider text-emerald-400">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Corrected & Grounded to Source</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
