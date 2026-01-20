/**
 * Feature 11: Checkpointing - Time Travel for Your Code
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getFeature11Checkpointing(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Feature: Checkpointing',
        content: `
            ${ctx.getEnhancedLessonBadge(2, 10, 'Checkpointing - Time Travel for Your Code')}

            <p>Roll back to any previous agent state without losing progress or re-spending credits. Checkpointing gives you a safety net for bold experimentation.</p>

            ${ctx.getCollapsibleSection('f11-intro', 1, 'What is Checkpointing?', `
                <div class="info-box">
                    <strong>Checkpointing</strong> records every agent action so you can rewind to earlier steps in an execution without losing work or consuming additional credits.
                </div>

                <h4>Why Checkpointing Matters</h4>
                <div class="journey-container">
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Safe Experimentation</div>
                            <div class="journey-desc">Try bold changes, revert if needed</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Recover from Mistakes</div>
                            <div class="journey-desc">Undo when refactors go wrong</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Branch Exploration</div>
                            <div class="journey-desc">Explore multiple approaches</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">No Credit Waste</div>
                            <div class="journey-desc">Rollback doesn't cost extra</div>
                        </div>
                    </div>
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('f11-how', 2, 'How Checkpoints Work', `
                <p>Kiro automatically creates checkpoints as you work:</p>

                <div class="info-item">
                    <strong>Automatic Recording</strong>
                    <p>Every agent action creates a checkpoint - file edits, command executions, tool calls</p>
                </div>
                <div class="info-item">
                    <strong>Instant Rollback</strong>
                    <p>Click any previous checkpoint to restore that state instantly</p>
                </div>
                <div class="info-item">
                    <strong>Full Context Preserved</strong>
                    <p>Rolling back restores both files AND conversation context</p>
                </div>

                <h4 style="margin-top: 16px;">Checkpoint Timeline</h4>
                <p>The checkpoint panel shows your session history as a timeline. Each node represents a state you can return to.</p>

                <div class="code-block-container">
                    <div class="code-block">Session Timeline:
[Start] → [Created file] → [Added function] → [Refactored] → [Current]
                          ↑
                    Click to restore this state</div>
                </div>

                <div class="tip-box">
                    <strong>Pro tip:</strong> Before attempting a risky refactor, note your current checkpoint. If things go wrong, you can instantly return.
                </div>
            `)}

            ${ctx.getCollapsibleSection('f11-practice', 3, 'Hands-On: Using Checkpoints', `
                <p>Let's practice using checkpoints with a safe experiment:</p>

                <h4>Step 1: Start a Task</h4>
                <button class="prompt-button" onclick="executePrompt('Create a simple utility function that validates email addresses. Add it to a new file called validators.ts')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Create an email validation function..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Step 2: Make More Changes</h4>
                <button class="prompt-button" onclick="executePrompt('Now refactor the validator to use a more complex regex pattern that handles edge cases like plus addressing and international domains')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Refactor to handle edge cases..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Step 3: Rollback</h4>
                <p>Now use the checkpoint panel to roll back to the simpler version. Look for the timeline icon in Kiro's interface.</p>

                <div class="tip-box" style="background: var(--kiro-warning-light); border-color: var(--kiro-warning);">
                    <strong>Note:</strong> Rollback restores file state. Any external changes (database writes, API calls) are not reverted.
                </div>
            `)}

            ${ctx.getCollapsibleSection('f11-scenarios', 4, 'When to Use Checkpoints', `
                <h4>Ideal Scenarios</h4>
                <div class="info-item">
                    <strong>Large Refactors</strong>
                    <p>Restructuring code across multiple files - checkpoint before starting</p>
                </div>
                <div class="info-item">
                    <strong>Experimental Approaches</strong>
                    <p>Trying a new architecture or pattern you're unsure about</p>
                </div>
                <div class="info-item">
                    <strong>Iterative Debugging</strong>
                    <p>When fix attempts might introduce new issues</p>
                </div>
                <div class="info-item">
                    <strong>A/B Implementation</strong>
                    <p>Exploring different solutions to the same problem</p>
                </div>

                <h4 style="margin-top: 16px;">Example Workflow</h4>
                <div class="code-block-container">
                    <div class="code-block">1. Note checkpoint before risky change
2. Ask Kiro to implement bold refactor
3. Test the changes
4. If broken → rollback to checkpoint
5. If good → continue building</div>
                </div>

                <div class="tip-box" style="margin-top: 16px; background: var(--kiro-success-light); border-color: var(--kiro-success);">
                    <strong>Key Learning:</strong> Checkpoints remove the fear of experimentation. You can try aggressive changes knowing you have a safety net.
                </div>
            `)}
        `,
        actions: []
    };
}
