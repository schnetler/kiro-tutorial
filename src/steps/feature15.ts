/**
 * Feature 15: Plan Agent - Structured Implementation Planning
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getFeature15PlanAgent(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Feature: Plan Agent',
        content: `
            ${ctx.getEnhancedLessonBadge(6, 7, 'Plan Agent - Structured Implementation Planning')}

            <p>The Plan Agent transforms vague ideas into detailed implementation plans through interactive requirements gathering, codebase research, and systematic task breakdowns.</p>

            ${ctx.getCollapsibleSection('f15-intro', 1, 'What is the Plan Agent?', `
                <div class="info-box">
                    <strong>Plan Agent</strong> is a specialized planning mode that helps you think through implementations before writing code. Access it via <code>Shift+Tab</code> or the <code>/plan</code> command.
                </div>

                <h4>The Planning Workflow</h4>
                <div class="journey-container">
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Requirements Gathering</div>
                            <div class="journey-desc">Clarifies what you actually need</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Codebase Research</div>
                            <div class="journey-desc">Understands existing patterns</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Task Breakdown</div>
                            <div class="journey-desc">Creates actionable steps</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Execution Ready</div>
                            <div class="journey-desc">Plan approved, ready to build</div>
                        </div>
                    </div>
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('f15-access', 2, 'Accessing Plan Mode', `
                <p>Two ways to enter planning mode:</p>

                <h4>Option 1: Keyboard Shortcut</h4>
                <div class="info-item">
                    <strong>Shift + Tab</strong>
                    <p>Press while in the chat input to switch to plan mode</p>
                </div>

                <h4>Option 2: Slash Command</h4>
                <div class="code-block-container">
                    <div class="code-block">/plan</div>
                </div>
                <p>Type <code>/plan</code> followed by your feature description.</p>

                <h4 style="margin-top: 16px;">Plan Mode Indicators</h4>
                <p>When in plan mode, you'll see:</p>
                <ul style="margin-left: 20px; color: var(--kiro-text-secondary);">
                    <li>A planning icon in the chat header</li>
                    <li>Structured output with numbered sections</li>
                    <li>Interactive approval prompts</li>
                </ul>

                <div class="tip-box">
                    <strong>Pro tip:</strong> Use plan mode for features that touch multiple files or require architectural decisions.
                </div>
            `)}

            ${ctx.getCollapsibleSection('f15-practice', 3, 'Hands-On: Plan a Feature', `
                <p>Let's use the Plan Agent to design a feature implementation:</p>

                <h4>Step 1: Enter Plan Mode</h4>
                <button class="prompt-button" onclick="executePrompt('/plan I want to add a notifications system to my app. Users should see in-app notifications and optionally receive email notifications for important events.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro (Plan Mode)</div>
                        "/plan Add a notifications system..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Step 2: Answer Clarifying Questions</h4>
                <p>The Plan Agent will ask questions like:</p>
                <ul style="margin-left: 20px; color: var(--kiro-text-secondary);">
                    <li>What notification types do you need?</li>
                    <li>Should notifications persist or be ephemeral?</li>
                    <li>What email provider integration?</li>
                    <li>How should users manage preferences?</li>
                </ul>

                <h4 style="margin-top: 16px;">Step 3: Review the Generated Plan</h4>
                <p>The Plan Agent produces a structured plan:</p>
                <div class="code-block-container">
                    <div class="code-block">## Implementation Plan: Notifications System

### Requirements
1. In-app notification bell with unread count
2. Notification center with history
3. Email notifications for critical events
4. User preferences for notification types

### Technical Approach
- Use existing event system for triggers
- Add notifications table to database
- Integrate with SendGrid for emails
- Create NotificationService class

### Tasks
1. Create database schema (notifications, preferences)
2. Implement NotificationService
3. Add notification UI components
4. Wire up email integration
5. Add user preference settings

Ready to proceed? [Approve] [Modify] [Cancel]</div>
                </div>
            `)}

            ${ctx.getCollapsibleSection('f15-workflow', 4, 'Plan-First Development Workflow', `
                <h4>When to Use Plan Mode</h4>
                <div class="info-item">
                    <strong>New Features</strong>
                    <p>Any feature touching 3+ files benefits from upfront planning</p>
                </div>
                <div class="info-item">
                    <strong>Architectural Changes</strong>
                    <p>Refactoring, pattern changes, or system redesigns</p>
                </div>
                <div class="info-item">
                    <strong>Unfamiliar Codebase</strong>
                    <p>Let the Plan Agent research existing patterns first</p>
                </div>
                <div class="info-item">
                    <strong>Team Collaboration</strong>
                    <p>Generate plans to share and discuss with teammates</p>
                </div>

                <h4 style="margin-top: 16px;">Plan → Spec → Execute Flow</h4>
                <div class="code-block-container">
                    <div class="code-block">1. /plan "feature description"
   ↓ Clarification questions
2. Review and approve plan
   ↓ Plan saved to .kiro/plans/
3. Kiro executes against the approved plan
   ↓ Implementation with guardrails
4. Verify against original requirements</div>
                </div>

                <div class="tip-box" style="margin-top: 16px; background: var(--kiro-success-light); border-color: var(--kiro-success);">
                    <strong>Key Learning:</strong> The Plan Agent prevents "coding yourself into a corner" by forcing you to think through requirements and approach before implementation begins.
                </div>
            `)}
        `,
        actions: []
    };
}
