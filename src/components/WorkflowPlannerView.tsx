import React, { useState } from 'react';
import {
  GitFork,
  Play,
  RotateCw,
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  ChevronRight,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { WorkflowPlan, WorkflowTask } from '../types';

interface WorkflowPlannerViewProps {
  workflowPlan: WorkflowPlan;
  onRunWorkflow: () => void;
  isExecuting: boolean;
  onNavigateTab: (tab: string) => void;
}

export const WorkflowPlannerView: React.FC<WorkflowPlannerViewProps> = ({
  workflowPlan,
  onRunWorkflow,
  isExecuting,
  onNavigateTab
}) => {
  const [selectedTask, setSelectedTask] = useState<WorkflowTask>(workflowPlan.tasks[0]);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredTasks = workflowPlan.tasks.filter(t => {
    if (filterType === 'all') return true;
    if (filterType === 'completed') return t.status === 'COMPLETED' || t.status === 'FIXED';
    if (filterType === 'compilers') return t.taskType.startsWith('compile_');
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Controls in Editorial Artistic Flair Style */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">
              02 / Autonomous Planner
            </span>
            <span className="text-white/20">•</span>
            <span className="rounded-sm bg-emerald-500/10 px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-400 border border-emerald-500/20">
              DAG ORCHESTRATION
            </span>
          </div>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-light italic tracking-tight text-white">
            Dependency-Aware <span className="font-bold not-italic text-white">Execution Engine</span>
          </h2>
          <p className="text-xs text-[#A0A0A5] max-w-2xl mt-1">
            Replaces manual multi-prompt fragmentation with a dependency-directed acyclic graph executing in synchronized parallel loops.
          </p>
        </div>

        <div className="flex items-center gap-3">
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
                <span className="text-[11px]">Running DAG Engine...</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span className="text-[11px]">Run Entire Workflow</span>
              </>
            )}
          </button>

          <button
            onClick={() => onNavigateTab('compiler')}
            className="flex items-center gap-1.5 rounded-sm border border-white/10 bg-[#141418] px-4 py-2.5 text-xs font-semibold text-white/80 hover:text-white hover:border-white/20 transition-all"
          >
            <span className="text-[11px] uppercase tracking-wider">Go to Compilers</span>
            <ChevronRight className="h-3.5 w-3.5 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* Manual vs Automated Efficiency Comparison Hero Banner */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-5">
          <div className="text-[10px] tracking-[0.2em] uppercase text-emerald-500 font-bold mb-1">
            01 / Manual Baseline
          </div>
          <div className="mt-2 text-3xl font-light italic font-mono text-white">
            4h 12m
          </div>
          <div className="mt-2 text-[10px] opacity-40 leading-relaxed">
            Clip selection, transcription, 5 platform drafts & manual cross-checks.
          </div>
        </div>

        <div className="rounded-sm border border-emerald-500/20 bg-emerald-500/5 p-5">
          <div className="text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-bold mb-1">
            02 / Autonomous Cycle
          </div>
          <div className="mt-2 text-3xl font-light italic font-mono text-emerald-400">
            3m 41s
          </div>
          <div className="mt-2 text-[10px] text-emerald-300/60 leading-relaxed">
            Singular prompt dispatch to parallel multi-asset compilation.
          </div>
        </div>

        <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-5">
          <div className="text-[10px] tracking-[0.2em] uppercase text-emerald-500 font-bold mb-1">
            03 / Net Speedup
          </div>
          <div className="mt-2 text-3xl font-light italic font-mono text-white">
            98.5%
          </div>
          <div className="mt-2 text-[10px] opacity-40 leading-relaxed">
            100% Provenance verified via ProofFlow quality gate.
          </div>
        </div>
      </div>

      {/* Interactive Workflow DAG Visualizer */}
      <div className="rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-lg">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">Execution Topology</span>
            <span className="text-white/20">•</span>
            <span className="text-xs font-mono text-white/70">Visual DAG Task Graph</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm border border-emerald-500/20">
            STATUS: {isExecuting ? 'RUNNING' : 'ALL NODES VERIFIED'}
          </span>
        </div>

        {/* SVG Flowchart Simulation */}
        <div className="overflow-x-auto py-4">
          <div className="min-w-[760px] flex items-center justify-between relative px-6 py-8 bg-[#0A0A0B] rounded-sm border border-white/10">
            {/* Stage 1: Ingest */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div 
                onClick={() => setSelectedTask(workflowPlan.tasks[0])}
                className="cursor-pointer rounded-sm border border-emerald-500 bg-[#141418] p-3 shadow-[0_0_12px_rgba(16,185,129,0.15)] hover:border-emerald-400 transition-all text-center w-36"
              >
                <div className="text-[9px] font-bold text-emerald-400 uppercase font-mono tracking-wider">Input Node</div>
                <div className="text-xs font-light italic text-white mt-0.5">Source Audio/Video</div>
                <div className="text-[9px] font-mono text-emerald-400 mt-1">✓ Transcribed</div>
              </div>
            </div>

            {/* Line 1 */}
            <div className="h-[1px] w-12 bg-emerald-500/50" />

            {/* Stage 2: Content IR */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div 
                onClick={() => setSelectedTask(workflowPlan.tasks[1])}
                className="cursor-pointer rounded-sm border border-emerald-500 bg-[#141418] p-3 shadow-[0_0_12px_rgba(16,185,129,0.15)] hover:border-emerald-400 transition-all text-center w-36"
              >
                <div className="text-[9px] font-bold text-emerald-400 uppercase font-mono tracking-wider">State Layer</div>
                <div className="text-xs font-light italic text-white mt-0.5">Content IR</div>
                <div className="text-[9px] font-mono text-emerald-400 mt-1">✓ 6 Claims / 4 Clips</div>
              </div>
            </div>

            {/* Line 2 */}
            <div className="h-[1px] w-12 bg-emerald-500/50" />

            {/* Stage 3: Parallel Compilers (Vertical Stack) */}
            <div className="flex flex-col gap-2 z-10">
              {workflowPlan.tasks.slice(2, 7).map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTask(t)}
                  className={`cursor-pointer rounded-sm border p-2 text-center w-40 transition-all ${
                    selectedTask?.id === t.id
                      ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                      : 'border-white/10 bg-[#141418] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-medium text-white truncate">{t.title.split('(')[0]}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.8)] shrink-0" />
                  </div>
                </div>
              ))}
            </div>

            {/* Line 3 */}
            <div className="h-[1px] w-12 bg-emerald-500/50" />

            {/* Stage 4: ProofFlow Quality Gate */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div 
                onClick={() => setSelectedTask(workflowPlan.tasks[7])}
                className="cursor-pointer rounded-sm border border-emerald-500 bg-[#141418] p-3 shadow-[0_0_12px_rgba(16,185,129,0.15)] hover:border-emerald-400 transition-all text-center w-36"
              >
                <div className="text-[9px] font-bold text-emerald-400 uppercase font-mono tracking-wider">Quality Gate</div>
                <div className="text-xs font-light italic text-white mt-0.5">ProofFlow</div>
                <div className="text-[9px] font-mono text-emerald-400 mt-1">96/100 Passed</div>
              </div>
            </div>

            {/* Line 4 */}
            <div className="h-[1px] w-12 bg-emerald-500/50" />

            {/* Stage 5: Publishing Plan & Feedback */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div 
                onClick={() => setSelectedTask(workflowPlan.tasks[8])}
                className="cursor-pointer rounded-sm border border-purple-500/60 bg-[#141418] p-3 shadow-[0_0_12px_rgba(168,85,247,0.15)] hover:border-purple-400 transition-all text-center w-36"
              >
                <div className="text-[9px] font-bold text-purple-400 uppercase font-mono tracking-wider">Automation</div>
                <div className="text-xs font-light italic text-white mt-0.5">7-Day Cadence</div>
                <div className="text-[9px] font-mono text-purple-300 mt-1">Ready to Deploy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Breakdown List & Task Details Inspector Split */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left (7 cols): Task Queue List */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-500">
              Task Graph Nodes ({workflowPlan.tasks.length} Total)
            </h4>
            
            <div className="flex gap-1.5">
              <button
                onClick={() => setFilterType('all')}
                className={`rounded-sm px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-all ${
                  filterType === 'all' ? 'bg-emerald-500 text-black font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('compilers')}
                className={`rounded-sm px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-all ${
                  filterType === 'compilers' ? 'bg-emerald-500 text-black font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                Compilers Only
              </button>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
            {filteredTasks.map((task) => {
              const isSelected = selectedTask?.id === task.id;
              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className={`cursor-pointer rounded-sm border p-4 transition-all relative ${
                    isSelected
                      ? 'border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                      : 'border-white/10 bg-[#0F0F12] hover:border-white/20'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-emerald-500" />
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)] shrink-0" />
                      <div>
                        <h5 className="text-xs font-medium text-white">{task.title}</h5>
                        <p className="text-[11px] text-[#A0A0A5] mt-0.5">{task.reason}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-[10px] text-emerald-400 font-semibold">
                        P{task.priority}
                      </span>
                      <div className="text-[10px] font-mono opacity-40">
                        {task.executionTimeMs}ms
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right (5 cols): Selected Task Inspector & AI Decision Rationale */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 rounded-sm border border-white/10 bg-[#0F0F12] p-6 shadow-sm space-y-4">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">Node Inspector</span>
              <h4 className="text-base font-light italic text-white mt-1">{selectedTask.title}</h4>
              <span className="mt-2 inline-block rounded-sm bg-emerald-500/10 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                STATUS: {selectedTask.status}
              </span>
            </div>

            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 mb-1.5">
                AI Planner Decision Rationale:
              </div>
              <p className="text-xs leading-relaxed text-[#C0C0C5] rounded-sm border border-white/10 bg-[#141418] p-3.5">
                {selectedTask.reason}
              </p>
            </div>

            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 mb-1.5">
                Output Artifact Preview:
              </div>
              <p className="text-xs font-mono text-emerald-300/90 leading-relaxed rounded-sm border border-white/10 bg-[#0A0A0B] p-3.5">
                {selectedTask.outputPreview || 'Artifact generated and verified.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="rounded-sm border border-white/10 bg-[#141418] p-3">
                <span className="text-[9px] font-mono uppercase opacity-40">Execution Time</span>
                <div className="font-mono font-light italic text-emerald-400 mt-1">{selectedTask.executionTimeMs} ms</div>
              </div>
              <div className="rounded-sm border border-white/10 bg-[#141418] p-3">
                <span className="text-[9px] font-mono uppercase opacity-40">Dependencies</span>
                <div className="font-mono text-white/80 mt-1 text-[11px] truncate">
                  {selectedTask.dependsOn.length > 0 ? selectedTask.dependsOn.join(', ') : 'Root Node'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
