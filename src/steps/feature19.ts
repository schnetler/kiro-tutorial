/**
 * Feature 19: Conversation Compaction - Context Management
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getFeature19Compaction(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Feature: Conversation Compaction',
        content: `
            ${ctx.getEnhancedLessonBadge(10, 10, 'Conversation Compaction - Context Management')}

            <p>Conversation Compaction intelligently summarizes your chat history to free up context space, letting you continue long sessions without losing important information.</p>

            <div class="image-container" style="margin: 16px 0; border-radius: 8px; overflow: hidden;">
                <img src="https://kiro.dev/images/changelogs/v0.7/summarization.png" alt="Conversation summarization" style="width: 100%; border-radius: 8px;">
            </div>

            ${ctx.getCollapsibleSection('f19-intro', 1, 'What is Conversation Compaction?', `
                <div class="info-box">
                    <strong>Conversation Compaction</strong> uses the <code>/compact</code> command to summarize earlier parts of your conversation, preserving key decisions and context while freeing up token space for new work.
                </div>

                <h4>Why It Matters</h4>
                <div class="journey-container">
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Limited Context</div>
                            <div class="journey-desc">AI models have token limits</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Preserve What Matters</div>
                            <div class="journey-desc">Key decisions and context kept</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Longer Sessions</div>
                            <div class="journey-desc">Work for hours without restarting</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Auto Trigger</div>
                            <div class="journey-desc">Optionally compact at 80% capacity</div>
                        </div>
                    </div>
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('f19-how', 2, 'How Compaction Works', `
                <p>When you run /compact, Kiro intelligently processes your conversation:</p>

                <h4>What Gets Preserved</h4>
                <div class="info-item">
                    <strong>Decisions Made</strong>
                    <p>"We chose React over Vue because..." - kept in summary</p>
                </div>
                <div class="info-item">
                    <strong>Current Context</strong>
                    <p>What files are being edited, current task status</p>
                </div>
                <div class="info-item">
                    <strong>Important Constraints</strong>
                    <p>Requirements, limitations, and preferences you mentioned</p>
                </div>
                <div class="info-item">
                    <strong>Recent Messages</strong>
                    <p>Last few exchanges stay intact for continuity</p>
                </div>

                <h4 style="margin-top: 16px;">What Gets Summarized</h4>
                <ul style="margin-left: 20px; color: var(--kiro-text-secondary);">
                    <li>Exploratory back-and-forth discussions</li>
                    <li>Code that was shown but not modified</li>
                    <li>Intermediate debugging steps</li>
                    <li>Options that were considered but rejected</li>
                </ul>

                <div class="tip-box">
                    <strong>Pro tip:</strong> Compact when you feel the conversation getting "forgetful" or before starting a major new task.
                </div>
            `)}

            ${ctx.getCollapsibleSection('f19-practice', 3, 'Hands-On: Manage Your Context', `
                <p>Let's practice using conversation compaction:</p>

                <h4>Step 1: Check Context Usage</h4>
                <p>Look at the context indicator in Kiro's status bar. It shows how much of your context window is used.</p>

                <h4 style="margin-top: 16px;">Step 2: Run Compaction</h4>
                <button class="prompt-button" onclick="executePrompt('/compact')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "/compact"
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Step 3: Review the Summary</h4>
                <p>Kiro will show you what it preserved:</p>
                <div class="code-block-container">
                    <div class="code-block">📝 Conversation Compacted

Preserved context:
- Building a todo app with React + TypeScript
- Using localStorage for persistence
- Following your preference for functional components
- Currently implementing the filter feature

Context usage: 45% → 12%</div>
                </div>

                <h4 style="margin-top: 16px;">Step 4: Continue Working</h4>
                <button class="prompt-button" onclick="executePrompt('Now let\\'s continue with the filter feature. Add the ability to filter todos by completed status.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Continue with the filter feature..."
                    </div>
                </button>

                <div class="tip-box" style="background: var(--kiro-warning-light); border-color: var(--kiro-warning);">
                    <strong>Note:</strong> After compaction, Kiro remembers decisions but not exact wording. Reference specific details if needed.
                </div>
            `)}

            ${ctx.getCollapsibleSection('f19-auto', 4, 'Auto-Compaction Settings', `
                <h4>Automatic Compaction</h4>
                <p>Configure Kiro to compact automatically when context reaches a threshold:</p>

                <div class="code-block-container">
                    <div class="code-block">// In Kiro settings
{
  "autoCompact": {
    "enabled": true,
    "threshold": 80,  // Trigger at 80% usage
    "keepRecent": 5   // Preserve last 5 messages
  }
}</div>
                </div>

                <h4 style="margin-top: 16px;">Best Practices</h4>
                <div class="info-item">
                    <strong>Compact Before Major Pivots</strong>
                    <p>Switching from backend to frontend? Compact first.</p>
                </div>
                <div class="info-item">
                    <strong>Explicit Over Implicit</strong>
                    <p>After compacting, restate critical requirements explicitly</p>
                </div>
                <div class="info-item">
                    <strong>Natural Break Points</strong>
                    <p>Compact after completing a feature, before starting the next</p>
                </div>

                <h4 style="margin-top: 16px;">When NOT to Compact</h4>
                <ul style="margin-left: 20px; color: var(--kiro-text-secondary);">
                    <li>Mid-debugging (you might need that stack trace)</li>
                    <li>During active code review</li>
                    <li>When referencing specific earlier messages</li>
                </ul>

                <div class="tip-box" style="margin-top: 16px; background: var(--kiro-success-light); border-color: var(--kiro-success);">
                    <strong>Key Learning:</strong> Conversation Compaction lets you maintain long, productive sessions by intelligently managing context limits - keeping what matters, summarizing what doesn't.
                </div>
            `)}
        `,
        actions: []
    };
}
