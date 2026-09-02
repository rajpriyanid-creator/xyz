import React, { useState } from 'react';
import {
  Brain,
  Sliders,
  Shield,
  Tag,
  Plus,
  Trash2,
  Save,
  Check,
  Sparkles,
  Zap,
  Volume2,
  FileCheck
} from 'lucide-react';
import { CreatorProfile } from '../types';

interface CreatorMemoryViewProps {
  profile: CreatorProfile;
  onUpdateProfile: (profile: CreatorProfile) => void;
}

export const CreatorMemoryView: React.FC<CreatorMemoryViewProps> = ({
  profile,
  onUpdateProfile
}) => {
  const [currentProfile, setCurrentProfile] = useState<CreatorProfile>(profile);
  const [newBuzzword, setNewBuzzword] = useState<string>('');
  const [newFact, setNewFact] = useState<string>('');
  const [saved, setSaved] = useState<boolean>(false);

  const handleAddBuzzword = () => {
    if (!newBuzzword.trim()) return;
    setCurrentProfile(prev => ({
      ...prev,
      forbiddenBuzzwords: [...prev.forbiddenBuzzwords, newBuzzword.trim()]
    }));
    setNewBuzzword('');
  };

  const handleRemoveBuzzword = (idx: number) => {
    setCurrentProfile(prev => ({
      ...prev,
      forbiddenBuzzwords: prev.forbiddenBuzzwords.filter((_, i) => i !== idx)
    }));
  };

  const handleAddFact = () => {
    if (!newFact.trim()) return;
    setCurrentProfile(prev => ({
      ...prev,
      memoryFacts: [...prev.memoryFacts, newFact.trim()]
    }));
    setNewFact('');
  };

  const handleRemoveFact = (idx: number) => {
    setCurrentProfile(prev => ({
      ...prev,
      memoryFacts: prev.memoryFacts.filter((_, i) => i !== idx)
    }));
  };

  const handleSave = () => {
    onUpdateProfile(currentProfile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">
              07 / Creator Memory & Persona
            </span>
            <span className="text-white/20">•</span>
            <span className="rounded-sm bg-emerald-500/10 px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-400 border border-emerald-500/20">
              PERSISTENT REASONING
            </span>
          </div>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-light italic tracking-tight text-white">
            Creator Memory <span className="font-bold not-italic text-white">& Voice Fingerprint</span>
          </h2>
          <p className="text-xs text-[#A0A0A5] max-w-2xl mt-1">
            Enforces your specific tone, brand persona, verified channel facts, and anti-slop rules across all generated assets.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-sm bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all"
        >
          {saved ? <Check className="h-4 w-4 text-black" /> : <Save className="h-4 w-4 text-black" />}
          <span>{saved ? 'Saved to Memory' : 'Save Voice Profile'}</span>
        </button>
      </div>

      {/* Grid: Tone Profile & Style Attributes on Left, Facts & Anti-Buzzwords on Right */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Col (6 cols): Profile & Sliders */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-lg space-y-5">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">Identity</span>
              <span className="text-white/20">•</span>
              <h3 className="text-sm font-light italic text-white">Creator Identity</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1.5">Creator / Brand Name</label>
                <input
                  type="text"
                  value={currentProfile.name}
                  onChange={(e) => setCurrentProfile({ ...currentProfile, name: e.target.value })}
                  className="w-full rounded-sm border border-white/10 bg-[#141418] px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1.5">Channel Niche / Focus</label>
                <input
                  type="text"
                  value={currentProfile.niche}
                  onChange={(e) => setCurrentProfile({ ...currentProfile, niche: e.target.value })}
                  className="w-full rounded-sm border border-white/10 bg-[#141418] px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1.5">Primary Tone Descriptor</label>
                <input
                  type="text"
                  value={currentProfile.tone}
                  onChange={(e) => setCurrentProfile({ ...currentProfile, tone: e.target.value })}
                  className="w-full rounded-sm border border-white/10 bg-[#141418] px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Tone Sliders */}
          <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-lg space-y-5">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">Calibration</span>
              <span className="text-white/20">•</span>
              <h3 className="text-sm font-light italic text-white">Voice Fingerprint Sliders</h3>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs text-[#A0A0A5] mb-2">
                  <span>Technical Density vs Beginner Accessible</span>
                  <span className="font-mono text-emerald-400 font-bold">{currentProfile.toneSliders.technicalVsBeginner}% Technical</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentProfile.toneSliders.technicalVsBeginner}
                  onChange={(e) => setCurrentProfile({
                    ...currentProfile,
                    toneSliders: { ...currentProfile.toneSliders, technicalVsBeginner: parseInt(e.target.value) }
                  })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#A0A0A5] mb-2">
                  <span>Concise / Punchy vs Detailed Exposition</span>
                  <span className="font-mono text-emerald-400 font-bold">{currentProfile.toneSliders.conciseVsDetailed}% Concise</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentProfile.toneSliders.conciseVsDetailed}
                  onChange={(e) => setCurrentProfile({
                    ...currentProfile,
                    toneSliders: { ...currentProfile.toneSliders, conciseVsDetailed: parseInt(e.target.value) }
                  })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#A0A0A5] mb-2">
                  <span>Contrarian / Opinionated vs Neutral Analysis</span>
                  <span className="font-mono text-emerald-400 font-bold">{currentProfile.toneSliders.humorousVsSerious}% Contrarian</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentProfile.toneSliders.humorousVsSerious}
                  onChange={(e) => setCurrentProfile({
                    ...currentProfile,
                    toneSliders: { ...currentProfile.toneSliders, humorousVsSerious: parseInt(e.target.value) }
                  })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Col (6 cols): Anti-Buzzwords & Grounded Channel Facts */}
        <div className="lg:col-span-6 space-y-6">
          {/* Forbidden AI Slop & Buzzword Filter */}
          <div className="rounded-sm border border-red-500/30 bg-[#0F0F12] p-6 shadow-lg space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-red-400">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-red-400">Anti-Slop</span>
                <span className="text-white/20">•</span>
                <h3 className="text-sm font-light italic text-white">Forbidden Buzzwords & Clichés</h3>
              </div>
              <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded-sm border border-red-500/20">STRICTLY FILTERED</span>
            </div>

            <p className="text-xs text-[#A0A0A5]">
              The compiler strictly rejects cliché AI buzzwords, vague superlatives, and hollow marketing fluff during drafting.
            </p>

            <div className="flex flex-wrap gap-2">
              {currentProfile.forbiddenBuzzwords.map((word, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 rounded-sm border border-red-500/30 bg-red-950/20 px-3 py-1 text-xs text-red-300 font-mono"
                >
                  <span>"{word}"</span>
                  <button
                    onClick={() => handleRemoveBuzzword(idx)}
                    className="hover:text-white"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Add forbidden phrase (e.g. 'unleash', 'supercharge')..."
                value={newBuzzword}
                onChange={(e) => setNewBuzzword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddBuzzword()}
                className="flex-1 rounded-sm border border-white/10 bg-[#141418] px-3.5 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
              />
              <button
                onClick={handleAddBuzzword}
                className="rounded-sm bg-red-950/80 border border-red-500/40 hover:bg-red-900 px-4 py-2 text-xs font-mono uppercase tracking-wider text-red-300 transition-all"
              >
                Add Filter
              </button>
            </div>
          </div>

          {/* Persistent Verified Facts */}
          <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-lg space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">Knowledge Core</span>
                <span className="text-white/20">•</span>
                <h3 className="text-sm font-light italic text-white">Persistent Channel Grounding Facts</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm border border-emerald-500/20 font-bold">
                {currentProfile.memoryFacts.length} FACTS
              </span>
            </div>

            <p className="text-xs text-[#A0A0A5]">
              Verified background knowledge injected into prompt contexts to prevent misattribution or hallucinations.
            </p>

            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
              {currentProfile.memoryFacts.map((fact, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-2 rounded-sm border border-white/10 bg-[#141418] p-3 text-xs text-white/80"
                >
                  <p className="leading-relaxed font-mono text-[11px]">✓ {fact}</p>
                  <button
                    onClick={() => handleRemoveFact(idx)}
                    className="text-white/40 hover:text-red-400 shrink-0"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Add verified fact (e.g. 'Founded in 2023, team of 8 engineers')..."
                value={newFact}
                onChange={(e) => setNewFact(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddFact()}
                className="flex-1 rounded-sm border border-white/10 bg-[#141418] px-3.5 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
              <button
                onClick={handleAddFact}
                className="rounded-sm bg-emerald-500 hover:bg-emerald-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition-all"
              >
                Save Fact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
