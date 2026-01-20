/**
 * Feature 14: Subagents - Parallel Task Delegation
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getFeature14Subagents(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Feature: Subagents',
        content: `
            ${ctx.getEnhancedLessonBadge(5, 10, 'Subagents - Parallel Task Delegation')}

            <p>Subagents let you delegate complex tasks to specialized workers that run autonomously with their own context, enabling parallel execution of multiple workstreams.</p>

            <div class="video-container" style="margin: 16px 0; border-radius: 8px; overflow: hidden;">
                <video autoplay loop muted playsinline style="width: 100%; border-radius: 8px;">
                    <source src="https://kiro.dev/videos/subagents.mp4" type="video/mp4">
                </video>
            </div>

            ${ctx.getCollapsibleSection('f14-intro', 1, 'What are Subagents?', `
                <div class="info-box">
                    <strong>Subagents</strong> are autonomous workers that Kiro spawns to handle delegated tasks. Each subagent has its own context window and can work independently while you continue with other work.
                </div>

                <h4>Why Subagents Matter</h4>
                <div class="journey-container">
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Parallel Execution</div>
                            <div class="journey-desc">Multiple tasks run simultaneously</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M7 12h10"/><path d="M7 17h10"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Isolated Context</div>
                            <div class="journey-desc">Each agent has focused context</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Live Tracking</div>
                            <div class="journey-desc">Monitor progress in real-time</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Complex Decomposition</div>
                            <div class="journey-desc">Break down big tasks automatically</div>
                        </div>
                    </div>
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('f14-how', 2, 'How Subagents Work', `
                <p>When you delegate a complex task, Kiro automatically determines if subagents would help:</p>

                <h4>Automatic Delegation</h4>
                <ol style="margin-left: 20px; color: var(--kiro-text-secondary);">
                    <li>Kiro analyzes the task complexity</li>
                    <li>Determines if parallel work is beneficial</li>
                    <li>Spawns specialized subagents for subtasks</li>
                    <li>Each subagent works in its own context</li>
                    <li>Results are collected and synthesized</li>
                </ol>

                <h4 style="margin-top: 16px;">Subagent Status Panel</h4>
                <p>Track all active subagents in the status panel:</p>

                <div class="code-block-container">
                    <div class="code-block">Active Subagents:
├─ [Research] Analyzing API docs... 45%
├─ [Implement] Writing service layer... 80%
└─ [Test] Generating unit tests... 30%</div>
                </div>

                <div class="tip-box">
                    <strong>Pro tip:</strong> You can continue chatting with Kiro while subagents work. They'll notify you when complete.
                </div>
            `)}

            ${ctx.getCollapsibleSection('f14-practice', 3, 'Hands-On: Delegate a Complex Task', `
                <p>Let's try delegating a task that benefits from parallel execution:</p>

                <h4>Step 1: Request Complex Work</h4>
                <button class="prompt-button" onclick="executePrompt('Create a complete REST API client for a weather service. I need: 1) TypeScript interfaces for all response types, 2) An HTTP client wrapper with error handling, 3) Unit tests for each endpoint, 4) Usage documentation with examples.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro (may spawn subagents)</div>
                        "Create a complete REST API client..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Step 2: Watch the Delegation</h4>
                <p>Observe how Kiro breaks this into parallel tasks:</p>
                <ul style="margin-left: 20px; color: var(--kiro-text-secondary);">
                    <li>One subagent researches and defines interfaces</li>
                    <li>Another builds the client implementation</li>
                    <li>A third generates comprehensive tests</li>
                    <li>Documentation is created in parallel</li>
                </ul>

                <h4 style="margin-top: 16px;">Step 3: Review Combined Results</h4>
                <p>When all subagents complete, Kiro presents the unified output. You can request changes to any part.</p>

                <div class="tip-box" style="background: var(--kiro-warning-light); border-color: var(--kiro-warning);">
                    <strong>Note:</strong> Subagent spawning is automatic based on task complexity. Simple tasks run directly without delegation.
                </div>
            `)}

            ${ctx.getCollapsibleSection('f14-scenarios', 4, 'Best Use Cases for Subagents', `
                <h4>Ideal Scenarios</h4>
                <div class="info-item">
                    <strong>Multi-Component Features</strong>
                    <p>Tasks requiring frontend, backend, and tests simultaneously</p>
                </div>
                <div class="info-item">
                    <strong>Research + Implementation</strong>
                    <p>When you need docs reviewed while code is being written</p>
                </div>
                <div class="info-item">
                    <strong>Large Refactoring</strong>
                    <p>Breaking down systematic changes across many files</p>
                </div>
                <div class="info-item">
                    <strong>Migration Tasks</strong>
                    <p>Updating multiple services or packages in parallel</p>
                </div>

                <h4 style="margin-top: 16px;">When Subagents Help Most</h4>
                <div class="code-block-container">
                    <div class="code-block"># Good for subagents:
- "Create a user authentication system with signup,
   login, password reset, and comprehensive tests"

# Less beneficial (single-focus task):
- "Fix the null pointer exception in login.ts"</div>
                </div>

                <div class="tip-box" style="margin-top: 16px; background: var(--kiro-success-light); border-color: var(--kiro-success);">
                    <strong>Key Learning:</strong> Subagents transform complex requests into parallel workstreams, dramatically reducing time-to-completion for multi-part tasks.
                </div>
            `)}
        `,
        actions: []
    };
}
