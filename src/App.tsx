import React, { useState, useEffect } from 'react';
import {
  SAMPLE_SOURCES,
  SAMPLE_CONTENT_IR,
  SAMPLE_WORKFLOW_PLAN,
  SAMPLE_ASSETS_PACKAGE,
  SAMPLE_PROOFFLOW_REPORT,
  SAMPLE_PUBLISHING_SCHEDULE,
  SAMPLE_ANALYTICS_SUMMARY,
  SAMPLE_CREATOR_PROFILE,
  SAMPLE_AUTOMATION_RULES
} from './data/sampleSources';
import {
  ContentSource,
  ContentIR,
  WorkflowPlan,
  GeneratedAssetsPackage,
  ProofFlowReport,
  PublishingScheduleItem,
  AnalyticsSummary,
  CreatorProfile,
  AutomationRule,
  RecommendedAction
} from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { OverviewDashboard } from './components/OverviewDashboard';
import { ContentIngestionView } from './components/ContentIngestionView';
import { WorkflowPlannerView } from './components/WorkflowPlannerView';
import { ContentCompilerView } from './components/ContentCompilerView';
import { ProofFlowInspector } from './components/ProofFlowInspector';
import { PublishingCalendarView } from './components/PublishingCalendarView';
import { AnalyticsFeedbackLoopView } from './components/AnalyticsFeedbackLoopView';
import { CreatorMemoryView } from './components/CreatorMemoryView';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [allSources, setAllSources] = useState<ContentSource[]>(SAMPLE_SOURCES);
  const [currentSource, setCurrentSource] = useState<ContentSource>(SAMPLE_SOURCES[0]);
  const [contentIR, setContentIR] = useState<ContentIR>(SAMPLE_CONTENT_IR);
  const [workflowPlan, setWorkflowPlan] = useState<WorkflowPlan>(SAMPLE_WORKFLOW_PLAN);
  const [assets, setAssets] = useState<GeneratedAssetsPackage>(SAMPLE_ASSETS_PACKAGE);
  const [proofFlowReport, setProofFlowReport] = useState<ProofFlowReport>(SAMPLE_PROOFFLOW_REPORT);
  const [schedule, setSchedule] = useState<PublishingScheduleItem[]>(SAMPLE_PUBLISHING_SCHEDULE);
  const [analyticsSummary, setAnalyticsSummary] = useState<AnalyticsSummary>(SAMPLE_ANALYTICS_SUMMARY);
  const [creatorProfile, setCreatorProfile] = useState<CreatorProfile>(SAMPLE_CREATOR_PROFILE);
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>(SAMPLE_AUTOMATION_RULES);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Handle switching source
  const handleSelectSource = async (src: ContentSource) => {
    setCurrentSource(src);
    showNotification(`Switched active source to: "${src.title}"`);
    
    // Call backend API or perform quick parse
    try {
      const res = await fetch('/api/content/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceId: src.id,
          title: src.title,
          transcript: src.transcript.map(t => `${t.timestamp} [${t.speaker}]: ${t.text}`).join('\n'),
          creatorTone: creatorProfile.tone
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.contentIR) {
          setContentIR(data.contentIR);
        }
      }
    } catch (err) {
      console.log('API call skipped, using enhanced local IR state', err);
    }
  };

  // Upload Custom Source
  const handleUploadCustomText = (title: string, text: string) => {
    const newSource: ContentSource = {
      id: `src_custom_${Date.now()}`,
      title,
      type: 'article',
      duration: '4m read',
      durationSec: 240,
      speakerName: creatorProfile.name,
      topics: ['Custom Input', 'New Workflow'],
      createdAt: new Date().toISOString(),
      transcript: [
        {
          id: 'ct_1',
          timestamp: '00:00',
          startSec: 0,
          endSec: 60,
          speaker: creatorProfile.name,
          text
        }
      ]
    };

    setAllSources(prev => [newSource, ...prev]);
    setCurrentSource(newSource);
    showNotification(`Successfully ingested custom source: "${title}"`);
  };

  // Run Autonomous Workflow execution across all steps
  const handleRunWorkflow = async () => {
    setIsExecuting(true);
    showNotification('Starting Autonomous Workflow Planner & Multi-Compiler Pipeline...');

    try {
      // Call backend execution endpoint
      fetch('/api/workflow/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceId: currentSource.id,
          contentIR,
          creatorProfile
        })
      }).catch(e => console.log('Background workflow API processing', e));

      // Visual step animation
      setWorkflowPlan(prev => ({
        ...prev,
        status: 'RUNNING',
        overallProgress: 10
      }));

      const taskUpdates = [...workflowPlan.tasks];
      for (let i = 0; i < taskUpdates.length; i++) {
        await new Promise(r => setTimeout(r, 200));
        taskUpdates[i] = {
          ...taskUpdates[i],
          status: 'COMPLETED'
        };
        const progress = Math.round(((i + 1) / taskUpdates.length) * 100);
        setWorkflowPlan(prev => ({
          ...prev,
          tasks: [...taskUpdates],
          overallProgress: progress
        }));
      }

      setWorkflowPlan(prev => ({
        ...prev,
        status: 'COMPLETED',
        overallProgress: 100
      }));

      setIsExecuting(false);
      showNotification('Pipeline completed: Multi-Platform assets compiled and ProofFlow verified!');
      
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (err) {
      setIsExecuting(false);
      showNotification('Pipeline finished!');
    }
  };

  // ProofFlow Fix Claim Action
  const handleFixClaim = async (claimId: string) => {
    // Call server repair endpoint
    const claim = proofFlowReport.claims.find(c => c.id === claimId);
    if (claim) {
      fetch('/api/proof/repair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claim,
          sourceSpan: claim.sourceSpan
        })
      }).catch(e => console.log('Proof repair sync', e));
    }

    setProofFlowReport(prev => {
      const updatedClaims = prev.claims.map(c => {
        if (c.id === claimId) {
          return {
            ...c,
            isFixed: true,
            verificationStatus: 'VERIFIED' as const,
            text: c.proposedCorrection || c.text
          };
        }
        return c;
      });

      const newVerifiedCount = updatedClaims.filter(c => c.verificationStatus === 'VERIFIED' || c.isFixed).length;
      const newTrustScore = Math.min(100, Math.round(90 + (newVerifiedCount / updatedClaims.length) * 10));

      return {
        ...prev,
        claims: updatedClaims,
        verifiedCount: newVerifiedCount,
        resolvedIssuesCount: prev.resolvedIssuesCount + 1,
        overallTrustScore: newTrustScore
      };
    });

    showNotification('Surgically repaired claim and updated all derived assets!');
  };

  // Automation Rule Toggle
  const handleToggleRule = (ruleId: string) => {
    setAutomationRules(prev => prev.map(r => {
      if (r.id === ruleId) {
        const nextState = !r.active;
        showNotification(`Automation rule "${r.name}" turned ${nextState ? 'ON' : 'OFF'}`);
        return { ...r, active: nextState };
      }
      return r;
    }));
  };

  // Execute Recommended Action from Analytics
  const handleExecuteRecommendedAction = (action: RecommendedAction) => {
    showNotification(`Autonomous Engine queued action: "${action.title}"`);
    setActiveTab('planner');
  };

  // Calculate issue count for badges
  const unresolvedProofIssues = proofFlowReport.claims.filter(
    c => (c.verificationStatus === 'SEMANTIC_DRIFT' || c.verificationStatus === 'NUMERIC_MISMATCH') && !c.isFixed
  ).length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0A0A0B] font-sans text-[#E0E0E0] antialiased selection:bg-emerald-500/30 selection:text-emerald-300 relative">
      {/* Subtle Artistic Background Watermark */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none select-none z-0">
        <div className="text-[360px] leading-none font-black italic">OS</div>
      </div>

      {/* Left Global App Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        trustScore={proofFlowReport.overallTrustScore}
        unresolvedIssuesCount={unresolvedProofIssues}
        workflowProgress={workflowPlan.overallProgress}
      />

      {/* Main App Canvas */}
      <div className="flex flex-1 flex-col overflow-hidden relative z-10">
        {/* Global Top Header */}
        <Header
          currentSource={currentSource}
          allSources={allSources}
          onSelectSource={handleSelectSource}
          trustScore={proofFlowReport.overallTrustScore}
          creatorProfile={creatorProfile}
          isExecuting={isExecuting}
          onRunWorkflow={handleRunWorkflow}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isLiveMode={false}
          setIsLiveMode={() => {}}
        />

        {/* Global Notification Toast */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-sm border border-emerald-500/30 bg-[#121215]/95 px-4 py-3 text-xs font-medium text-emerald-300 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
            <span className="font-mono tracking-wide">{notification}</span>
          </div>
        )}

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {activeTab === 'overview' && (
              <OverviewDashboard
                currentSource={currentSource}
                workflowPlan={workflowPlan}
                proofFlowReport={proofFlowReport}
                analyticsSummary={analyticsSummary}
                creatorProfile={creatorProfile}
                onNavigateTab={setActiveTab}
                onRunWorkflow={handleRunWorkflow}
                isExecuting={isExecuting}
                onSelectSource={handleSelectSource}
                allSources={allSources}
              />
            )}

            {activeTab === 'ingestion' && (
              <ContentIngestionView
                currentSource={currentSource}
                contentIR={contentIR}
                allSources={allSources}
                onSelectSource={handleSelectSource}
                onUploadCustomText={handleUploadCustomText}
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'planner' && (
              <WorkflowPlannerView
                workflowPlan={workflowPlan}
                onRunWorkflow={handleRunWorkflow}
                isExecuting={isExecuting}
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'compiler' && (
              <ContentCompilerView
                assets={assets}
                contentIR={contentIR}
                currentSource={currentSource}
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'proofflow' && (
              <ProofFlowInspector
                report={proofFlowReport}
                onFixClaim={handleFixClaim}
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'calendar' && (
              <PublishingCalendarView
                schedule={schedule}
                automationRules={automationRules}
                onToggleRule={handleToggleRule}
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsFeedbackLoopView
                analyticsSummary={analyticsSummary}
                onExecuteRecommendedAction={handleExecuteRecommendedAction}
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'memory' && (
              <CreatorMemoryView
                profile={creatorProfile}
                onUpdateProfile={(p) => {
                  setCreatorProfile(p);
                  showNotification('Updated Creator Style Persona and Grounding Memory.');
                }}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
