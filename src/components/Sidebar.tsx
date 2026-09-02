import React from 'react';
import {
  LayoutDashboard,
  FileText,
  GitFork,
  Cpu,
  ShieldCheck,
  Calendar,
  TrendingUp,
  Brain,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  trustScore: number;
  unresolvedIssuesCount: number;
  workflowProgress: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  trustScore,
  unresolvedIssuesCount,
  workflowProgress
}) => {
  const navItems = [
    {
      id: 'overview',
      number: '00',
      label: 'System Hub & Telemetry',
      icon: LayoutDashboard,
      badge: null,
      description: 'Pipeline health & telemetry metrics'
    },
    {
      id: 'ingestion',
      number: '01',
      label: 'Ingestion & Content IR',
      icon: FileText,
      badge: 'Transcribed',
      description: 'Source segmentation & claims'
    },
    {
      id: 'planner',
      number: '02',
      label: 'Autonomous Planner',
      icon: GitFork,
      badge: `${workflowProgress}%`,
      description: 'Execution DAG task graph'
    },
    {
      id: 'compiler',
      number: '03',
      label: 'Multi-Asset Compiler',
      icon: Cpu,
      badge: '5 Platforms',
      description: 'Generative platform compilers'
    },
    {
      id: 'proofflow',
      number: '04',
      label: 'ProofFlow Quality Gate',
      icon: ShieldCheck,
      badge: unresolvedIssuesCount > 0 ? `${unresolvedIssuesCount} Drift` : `${trustScore}%`,
      badgeVariant: unresolvedIssuesCount > 0 ? 'warning' : 'success',
      description: 'Factual verification & diff repair'
    },
    {
      id: 'calendar',
      number: '05',
      label: 'Cadence & Automation',
      icon: Calendar,
      badge: '7-Day',
      description: 'Staggered release schedule'
    },
    {
      id: 'analytics',
      number: '06',
      label: 'Feedback Intelligence',
      icon: TrendingUp,
      badge: '+218%',
      badgeVariant: 'spike',
      description: 'Spike detection & comment miner'
    },
    {
      id: 'memory',
      number: '07',
      label: 'Creator Style Persona',
      icon: Brain,
      badge: 'Locked',
      description: 'Voice rules & anti-slop filters'
    }
  ];

  return (
    <aside className="flex w-64 flex-col border-r border-white/10 bg-[#0A0A0B] p-4 lg:w-72 select-none">
      {/* Execution Progress Bar Container */}
      <div className="mb-6 rounded-sm border border-white/10 bg-[#121215] p-3.5">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-[10px] tracking-[0.2em] uppercase opacity-50 font-semibold">Engine Loop</span>
          <span className="font-mono text-emerald-400 font-bold text-xs">{workflowProgress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-none bg-white/10">
          <div 
            className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] transition-all duration-500 ease-out"
            style={{ width: `${workflowProgress}%` }}
          />
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono opacity-50">
          <span>10/10 Tasks</span>
          <span className="text-emerald-400 font-semibold">3m 41s Cycle</span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="space-y-1.5 flex-1 overflow-y-auto pr-1">
        <div className="px-2 py-1 text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">
          System Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group flex w-full flex-col rounded-sm p-2.5 text-left transition-all relative ${
                isActive
                  ? 'border border-emerald-500/30 bg-emerald-500/10 text-white shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                  : 'border border-transparent text-[#A0A0A5] hover:bg-white/[0.03] hover:text-white'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              )}
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-semibold transition-colors ${
                    isActive ? 'text-emerald-400' : 'opacity-40 group-hover:text-emerald-400'
                  }`}>
                    {item.number} /
                  </span>
                  <span className="text-xs font-medium tracking-tight">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`rounded-sm px-1.5 py-0.2 text-[9px] font-mono uppercase tracking-wider font-semibold ${
                    item.badgeVariant === 'warning'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : item.badgeVariant === 'spike'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'bg-white/10 text-white/80'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mt-1 pl-6 text-[10px] opacity-40 group-hover:opacity-70 line-clamp-1">
                {item.description}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer System Status Card in Artistic Flair style */}
      <div className="mt-auto rounded-sm border border-emerald-500/20 bg-emerald-500/5 p-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-400 font-bold">Analysis Status</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Optimal</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono opacity-50 pt-1 border-t border-white/5">
          <span>Saved Effort:</span>
          <span className="text-white font-medium">43.2h Automated</span>
        </div>
      </div>
    </aside>
  );
};
