import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Zap,
  Download,
  Share2,
  ChevronRight,
  Send,
  Sparkles,
  Layers,
  Youtube,
  Linkedin,
  Twitter,
  Mail,
  Film
} from 'lucide-react';
import { PublishingScheduleItem, AutomationRule } from '../types';

interface PublishingCalendarViewProps {
  schedule: PublishingScheduleItem[];
  automationRules: AutomationRule[];
  onToggleRule: (ruleId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const PublishingCalendarView: React.FC<PublishingCalendarViewProps> = ({
  schedule,
  automationRules,
  onToggleRule,
  onNavigateTab
}) => {
  const [scheduleItems, setScheduleItems] = useState<PublishingScheduleItem[]>(schedule);
  const [selectedPlatformFilter, setSelectedPlatformFilter] = useState<string>('all');
  const [exported, setExported] = useState<boolean>(false);

  const getPlatformIcon = (plat: string) => {
    switch (plat) {
      case 'YouTube': return <Youtube className="h-4 w-4 text-emerald-400" />;
      case 'YouTube Shorts': return <Film className="h-4 w-4 text-emerald-400" />;
      case 'LinkedIn': return <Linkedin className="h-4 w-4 text-emerald-400" />;
      case 'X': return <Twitter className="h-4 w-4 text-emerald-400" />;
      case 'Newsletter': return <Mail className="h-4 w-4 text-emerald-400" />;
      default: return <Sparkles className="h-4 w-4 text-emerald-400" />;
    }
  };

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  const filteredSchedule = scheduleItems.filter(item => {
    if (selectedPlatformFilter === 'all') return true;
    return item.platform === selectedPlatformFilter;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">
              05 / Publishing & Automation
            </span>
            <span className="text-white/20">•</span>
            <span className="rounded-sm bg-emerald-500/10 px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-400 border border-emerald-500/20">
              7-DAY STAGGERED CADENCE
            </span>
          </div>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-light italic tracking-tight text-white">
            Publishing Schedule <span className="font-bold not-italic text-white">& Autonomous Triggers</span>
          </h2>
          <p className="text-xs text-[#A0A0A5] max-w-2xl mt-1">
            Automatically sequences verified derivatives across peak audience engagement windows with zero manual cross-posting overhead.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-sm border border-white/10 bg-[#141418] hover:border-white/20 px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-white transition-all"
          >
            <Download className="h-3.5 w-3.5 text-emerald-400" />
            <span>{exported ? 'Package Downloaded' : 'Export Ready Assets'}</span>
          </button>

          <button
            onClick={() => onNavigateTab('analytics')}
            className="flex items-center gap-2 rounded-sm bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all"
          >
            <span>Feedback Loop Analytics</span>
            <ChevronRight className="h-4 w-4 text-black" />
          </button>
        </div>
      </div>

      {/* 7-Day Publishing Timeline Grid */}
      <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">Timeline</span>
            <span className="text-white/20">•</span>
            <h3 className="text-sm font-light italic text-white">Staggered 7-Day Channel Rollout</h3>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-1.5">
            {['all', 'YouTube', 'YouTube Shorts', 'LinkedIn', 'X', 'Newsletter'].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPlatformFilter(p)}
                className={`rounded-sm px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-all ${
                  selectedPlatformFilter === p ? 'bg-emerald-500 text-black font-bold' : 'text-white/60 hover:text-white bg-[#141418]'
                }`}
              >
                {p === 'all' ? 'All' : p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-7">
          {filteredSchedule.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-sm border border-white/10 bg-[#141418] p-4 space-y-3 hover:border-emerald-500/40 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-white/50 mb-2 font-mono">
                  <span className="font-bold text-emerald-400">{item.dayLabel.split(' ')[0]}</span>
                  <span className="opacity-60">{item.optimalTime}</span>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                  {getPlatformIcon(item.platform)}
                  <span className="text-xs font-mono font-bold text-white truncate">{item.platform}</span>
                </div>

                <h5 className="mt-2 text-xs font-light italic text-white line-clamp-2">{item.assetTitle}</h5>
                <p className="mt-1.5 text-[10px] text-[#A0A0A5] line-clamp-2">{item.assetSnippet}</p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className={`rounded-sm px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider ${
                  item.status === 'READY'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/5 text-white/60 border border-white/10'
                }`}>
                  {item.status}
                </span>

                <button
                  onClick={() => alert(`Marked ${item.assetTitle} as published!`)}
                  className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 hover:text-emerald-300"
                >
                  Publish →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Automation Trigger-Action Rules Engine */}
      <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-lg space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">Auto-Execute</span>
            <span className="text-white/20">•</span>
            <h3 className="text-sm font-light italic text-white">
              Autonomous Trigger → Action Rules
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm border border-emerald-500/20">
            {automationRules.filter(r => r.active).length} RULES ARMED
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {automationRules.map((rule) => (
            <div
              key={rule.id}
              className={`rounded-sm border p-4 transition-all relative ${
                rule.active
                  ? 'border-white/10 bg-[#141418]'
                  : 'border-white/5 bg-[#0F0F12] opacity-50'
              }`}
            >
              {rule.active && (
                <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-emerald-500" />
              )}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">{rule.name}</span>
                <button
                  onClick={() => onToggleRule(rule.id)}
                  className="cursor-pointer text-emerald-400 hover:text-emerald-300 transition-all"
                >
                  {rule.active ? <ToggleRight className="h-6 w-6 text-emerald-400" /> : <ToggleLeft className="h-6 w-6 text-white/30" />}
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="text-[#A0A0A5]">
                  <strong className="text-white/80 font-mono text-[10px] uppercase tracking-wider">WHEN:</strong> {rule.trigger}
                </div>
                <div className="text-[#A0A0A5]">
                  <strong className="text-white/80 font-mono text-[10px] uppercase tracking-wider">IF:</strong> {rule.condition}
                </div>
                <div className="text-emerald-300 font-medium">
                  <strong className="text-white/80 font-mono text-[10px] uppercase tracking-wider">THEN DO:</strong> {rule.action}
                </div>
              </div>

              <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-white/5 text-[10px] text-white/40 font-mono">
                <span>Triggered {rule.timesFired} times</span>
                <span className="uppercase tracking-wider">{rule.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
