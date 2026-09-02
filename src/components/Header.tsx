import React from 'react';
import { 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  Play, 
  CheckCircle2, 
  Layers,
  ChevronDown
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
    </header>
  );
};
