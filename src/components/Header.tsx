import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  Play, 
  CheckCircle2, 
  Layers,
  ChevronDown,
  Cpu,
  X,
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { ContentSource, CreatorProfile } from '../types';

interface HeaderProps {
  currentSource: ContentSource;
  allSources: ContentSource[];
  onSelectSource: (source: ContentSource) => void;
  trustScore: number;
  creatorProfile: CreatorProfile;
  isExecuting: boolean;
  onRunWorkflow: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLiveMode: boolean;
  setIsLiveMode: (live: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSource,
  allSources,
  onSelectSource,
  trustScore,
  creatorProfile,
  isExecuting,
  onRunWorkflow,
  setActiveTab,
  isLiveMode,
  setIsLiveMode,
}) => {
  const [showAiModal, setShowAiModal] = useState(false);
  const [customKey, setCustomKey] = useState(() => localStorage.getItem('creatoros_gemini_key') || '');
  const [isTestingAi, setIsTestingAi] = useState(false);
  const [aiTestResult, setAiTestResult] = useState<{
    success?: boolean;
    hasGeminiKey?: boolean;
    model?: string;
    reply?: string;
    message?: string;
    error?: string;
    latencyMs?: number;
    fromCache?: boolean;
    quotaSaved?: boolean;
    isQuotaExceeded?: boolean;
  } | null>(null);

  const handleSaveKey = (key: string) => {
    setCustomKey(key);
    if (key.trim()) {
      localStorage.setItem('creatoros_gemini_key', key.trim());
    } else {
      localStorage.removeItem('creatoros_gemini_key');
    }
  };

  const testGeminiConnection = async () => {
    setIsTestingAi(true);
    setAiTestResult(null);
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (customKey.trim()) {
        headers['x-gemini-key'] = customKey.trim();
      }

      const res = await fetch('/api/ai/test', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          prompt: 'Confirm CreatorOS engine connection in 1 short sentence.'
        })
      });

      const contentType = res.headers.get('content-type') || '';
      let data: any;

      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = {
          success: false,
          error: res.status === 404
            ? 'Endpoint /api/ai/test not found. Ensure Vercel deployment includes api/index.ts.'
            : text.slice(0, 300) || `Server returned HTTP ${res.status}`
        };
      }
      setAiTestResult(data);
    } catch (err: any) {
      setAiTestResult({
        success: false,
        error: err.message || 'Connection error contacting /api/ai/test'
      });
    } finally {
      setIsTestingAi(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-white/10 bg-[#0A0A0B]/90 px-4 backdrop-blur-md lg:px-8">
      {/* Brand & Active Source Picker */}
      <div className="flex items-center gap-6">
        <div 
          onClick={() => setActiveTab('overview')} 
          className="flex cursor-pointer flex-col group transition-opacity"
        >
          <span className="text-[9px] tracking-[0.35em] uppercase text-emerald-500 font-bold">
            Creator Engine v2.6
          </span>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-light tracking-tighter italic text-[#E0E0E0]">
              Creator.<span className="font-bold text-white not-italic">OS</span>
            </h1>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
          </div>
        </div>

        <div className="hidden h-7 w-[1px] bg-white/10 md:block" />

        {/* Source Dropdown / Switcher */}
        <div className="relative hidden md:block">
          <div className="flex items-center gap-2 rounded-sm border border-white/10 bg-[#121215] px-3 py-1.5 text-xs text-[#E0E0E0]">
            <span className="text-[10px] tracking-[0.15em] uppercase opacity-40">Source</span>
            <span className="text-white/20">•</span>
            <select
              value={currentSource.id}
              onChange={(e) => {
                const s = allSources.find(src => src.id === e.target.value);
                if (s) onSelectSource(s);
              }}
              className="bg-transparent font-mono text-xs text-white outline-none cursor-pointer pr-1"
            >
              {allSources.map(src => (
                <option key={src.id} value={src.id} className="bg-[#121215] text-[#E0E0E0]">
                  {src.title.length > 36 ? `${src.title.substring(0, 36)}...` : src.title} [{src.duration}]
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Right Controls: Mode Toggle, ProofFlow Trust Score, Run Action, Profile */}
      <div className="flex items-center gap-4">
        {/* Test AI Real API Key Button */}
        <button
          onClick={() => {
            setShowAiModal(true);
            if (!aiTestResult) testGeminiConnection();
          }}
          className="flex items-center gap-2 rounded-sm border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs text-purple-300 transition-all hover:border-purple-500/50 hover:bg-purple-500/20"
          title="Test real Gemini API Key"
        >
          <Cpu className="h-3.5 w-3.5 text-purple-400" />
          <span className="font-mono text-[11px] font-semibold tracking-wider uppercase">Test AI Key</span>
        </button>

        {/* Output Quality Index / Trust Score Indicator */}
        <button
          onClick={() => setActiveTab('proofflow')}
          className="group flex items-center gap-3 rounded-sm border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1.5 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10"
          title="ProofFlow Quality Gate"
        >
          <div className="text-right">
            <div className="text-[9px] tracking-[0.2em] uppercase opacity-40 text-right">Quality Index</div>
            <div className="text-sm font-mono font-bold text-emerald-400 leading-none">{trustScore}.0%</div>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
        </button>

        {/* Primary Action Button: Run Workflow with Artistic Flair styling */}
        <button
          onClick={onRunWorkflow}
          disabled={isExecuting}
          className={`flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
            isExecuting
              ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 cursor-not-allowed animate-pulse'
              : 'bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]'
          }`}
        >
          {isExecuting ? (
            <>
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
              <span className="font-mono text-[11px]">Compiling Pipeline...</span>
            </>
          ) : (
            <>
              <Play className="h-3 w-3 fill-current" />
              <span className="text-[11px] tracking-[0.1em]">Execute Workflow</span>
            </>
          )}
        </button>

        {/* Creator Profile Badge */}
        <div 
          onClick={() => setActiveTab('memory')}
          className="flex cursor-pointer items-center gap-2.5 rounded-sm border border-white/10 bg-[#121215] p-1 pl-2.5 hover:border-white/20 transition-colors"
          title="Creator Memory & Voice Profile"
        >
          <div className="hidden text-right text-xs lg:block">
            <div className="font-medium text-white text-[11px]">{creatorProfile.name}</div>
            <div className="text-[9px] font-mono opacity-40">{creatorProfile.handle}</div>
          </div>
          <img 
            src={creatorProfile.avatarUrl} 
            alt={creatorProfile.name} 
            className="h-7 w-7 rounded-sm object-cover border border-emerald-500/30" 
          />
        </div>
      </div>

      {/* AI Key & Connectivity Diagnostics Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-md border border-white/20 bg-[#111114] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-purple-400" />
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                  Gemini AI Model Connection Test
                </h3>
              </div>
              <button 
                onClick={() => setShowAiModal(false)}
                className="rounded p-1 text-white/40 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="my-5 space-y-4">
              <div className="rounded border border-white/10 bg-black/40 p-4 font-mono text-xs text-white/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/40 uppercase tracking-widest text-[10px]">Target Model</span>
                  <span className="text-purple-400 font-semibold">models/gemini-3.7-flash</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/40 uppercase tracking-widest text-[10px]">Server Route</span>
                  <span className="text-emerald-400">POST /api/ai/test</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/40 uppercase tracking-widest text-[10px]">Authentication</span>
                  <span className="text-white/60">process.env.GEMINI_API_KEY</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40 uppercase tracking-widest text-[10px]">Quota Protection</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Active (20 req/min & Caching)
                  </span>
                </div>
              </div>

              {/* Optional Custom Key Input for Direct Testing without redeployment */}
              <div className="rounded border border-white/10 bg-[#0c0c0f] p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                    Direct API Key Override (Optional)
                  </label>
                  {customKey && (
                    <span className="text-[10px] font-mono text-emerald-400">Saved for session</span>
                  )}
                </div>
                <input
                  type="password"
                  value={customKey}
                  onChange={(e) => handleSaveKey(e.target.value)}
                  placeholder="AIzaSy... (Paste Gemini Key to test directly)"
                  className="w-full rounded border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-xs text-white placeholder-white/20 focus:border-purple-500 focus:outline-none"
                />
                <p className="text-[10px] text-white/40 leading-relaxed">
                  Tip: On Vercel, set <code className="text-purple-300">GEMINI_API_KEY</code> in <em>Project Settings → Environment Variables</em> for zero-config global authentication.
                </p>
              </div>

              {/* Status Display */}
              {isTestingAi && (
                <div className="flex items-center gap-3 rounded border border-purple-500/30 bg-purple-500/10 p-4 text-purple-300">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-400 border-t-transparent" />
                  <span className="font-mono text-xs">Sending minimal-token verification prompt to Gemini...</span>
                </div>
              )}

              {aiTestResult && !isTestingAi && (
                <div className={`rounded border p-4 text-xs font-mono ${
                  aiTestResult.success 
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                    : 'border-amber-500/40 bg-amber-500/10 text-amber-200'
                }`}>
                  <div className="flex items-center gap-2 font-bold mb-2">
                    {aiTestResult.success ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-300">
                          Live AI Connection Verified {aiTestResult.fromCache ? '(Cached / 0 Tokens Consumed)' : '(Live ~10 Tokens)'}
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-amber-400" />
                        <span className="text-amber-300">
                          {aiTestResult.isQuotaExceeded ? 'Gemini Quota Limit Reached (429)' : 'Key Not Detected or Serverless Route Unreachable'}
                        </span>
                      </>
                    )}
                  </div>

                  {aiTestResult.reply && (
                    <div className="mt-2 rounded bg-black/50 p-3 text-[11px] text-white/90 border border-emerald-500/20">
                      <span className="text-emerald-400 block text-[9px] uppercase tracking-wider mb-1 font-bold">Model Output:</span>
                      "{aiTestResult.reply}"
                    </div>
                  )}

                  {aiTestResult.message && (
                    <p className="mt-1 text-[11px] text-amber-300/90 leading-relaxed">
                      {aiTestResult.message}
                    </p>
                  )}

                  {aiTestResult.error && (
                    <div className="mt-2 rounded bg-red-950/40 border border-red-500/30 p-2.5 text-[11px] text-red-200 leading-relaxed">
                      <span className="font-bold text-red-400 block mb-0.5">Details:</span>
                      {aiTestResult.error}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 text-xs font-mono text-white/60 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={testGeminiConnection}
                disabled={isTestingAi}
                className="flex items-center gap-2 rounded bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-500 disabled:opacity-50"
              >
                <Zap className="h-3.5 w-3.5" />
                {isTestingAi ? 'Testing...' : 'Run Test Prompt'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
