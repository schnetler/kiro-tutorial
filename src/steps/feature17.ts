/**
 * Feature 17: Enhanced Supervised Mode - Per-File Review
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getFeature17SupervisedMode(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Feature: Supervised Mode',
        content: `
            ${ctx.getEnhancedLessonBadge(8, 10, 'Enhanced Supervised Mode - Per-File Review')}

            <p>Supervised Mode gives you granular control over Kiro's changes, letting you review, accept, or reject modifications on a per-file basis before they're applied.</p>

            <div class="video-container" style="margin: 16px 0; border-radius: 8px; overflow: hidden;">
                <video autoplay loop muted playsinline style="width: 100%; border-radius: 8px;">
                    <source src="https://kiro.dev/videos/supervised-mode.mp4" type="video/mp4">
                </video>
            </div>

            ${ctx.getCollapsibleSection('f17-intro', 1, 'What is Supervised Mode?', `
                <div class="info-box">
                    <strong>Supervised Mode</strong> pauses before applying changes, showing you exactly what will be modified. You can accept all, reject all, or selectively approve individual files.
                </div>

                <h4>Why Supervised Mode Matters</h4>
                <div class="journey-container">
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Full Visibility</div>
                            <div class="journey-desc">See every change before it happens</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Selective Approval</div>
                            <div class="journey-desc">Accept good changes, reject others</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Safe Experimentation</div>
                            <div class="journey-desc">Try bold changes without risk</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Team Safety</div>
                            <div class="journey-desc">Review before shared code changes</div>
                        </div>
                    </div>
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('f17-how', 2, 'How It Works', `
                <p>When Supervised Mode is enabled, Kiro's workflow changes:</p>

                <h4>The Review Flow</h4>
                <ol style="margin-left: 20px; color: var(--kiro-text-secondary);">
                    <li>Kiro analyzes your request and plans changes</li>
                    <li>Changes are staged (not applied) with full diffs</li>
                    <li>You see a file-by-file breakdown</li>
                    <li>Accept or reject each file individually</li>
                    <li>Only approved changes are written to disk</li>
                </ol>

                <h4 style="margin-top: 16px;">Review Actions</h4>
                <div class="info-item">
                    <strong>Accept All</strong>
                    <p>Apply all proposed changes at once</p>
                </div>
                <div class="info-item">
                    <strong>Reject All</strong>
                    <p>Discard all changes and keep current state</p>
                </div>
                <div class="info-item">
                    <strong>Per-File Selection</strong>
                    <p>Checkbox each file to accept or reject individually</p>
                </div>
                <div class="info-item">
                    <strong>Request Revision</strong>
                    <p>Ask Kiro to modify specific changes before accepting</p>
                </div>

                <div class="tip-box">
                    <strong>Pro tip:</strong> Click any file diff to expand and see the exact line-by-line changes.
                </div>
            `)}

            ${ctx.getCollapsibleSection('f17-practice', 3, 'Hands-On: Use Supervised Mode', `
                <p>Let's try a multi-file refactoring with Supervised Mode:</p>

                <h4>Step 1: Enable Supervised Mode</h4>
                <p>Click the shield icon in Kiro's toolbar or use the Command Palette: "Kiro: Enable Supervised Mode"</p>

                <h4 style="margin-top: 16px;">Step 2: Request a Multi-File Change</h4>
                <button class="prompt-button" onclick="executePrompt('Refactor all console.log statements in this project to use a proper logger utility. Create a logger.ts file and update all existing files to import and use it.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro (with Supervised Mode)</div>
                        "Refactor console.log to use a logger utility..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Step 3: Review the Changes</h4>
                <p>Kiro will show you:</p>
                <ul style="margin-left: 20px; color: var(--kiro-text-secondary);">
                    <li>New file: logger.ts (the utility)</li>
                    <li>Modified: All files with console.log replaced</li>
                    <li>Full diff for each file</li>
                </ul>

                <h4 style="margin-top: 16px;">Step 4: Selective Approval</h4>
                <p>Try accepting the logger.ts file but rejecting changes to test files where console.log might be intentional.</p>

                <div class="tip-box" style="background: var(--kiro-warning-light); border-color: var(--kiro-warning);">
                    <strong>Note:</strong> Supervised Mode adds a review step but ensures you maintain full control over your codebase.
                </div>
            `)}

            ${ctx.getCollapsibleSection('f17-when', 4, 'When to Use Supervised Mode', `
                <h4>Ideal Scenarios</h4>
                <div class="info-item">
                    <strong>Large Refactoring</strong>
                    <p>Changes touching many files benefit from file-by-file review</p>
                </div>
                <div class="info-item">
                    <strong>Critical Code</strong>
                    <p>Authentication, payments, or data handling changes</p>
                </div>
                <div class="info-item">
                    <strong>Learning Projects</strong>
                    <p>Understand what Kiro does by reviewing each change</p>
                </div>
                <div class="info-item">
                    <strong>Shared Codebases</strong>
                    <p>Extra review before changes that affect teammates</p>
                </div>

                <h4 style="margin-top: 16px;">When to Skip It</h4>
                <ul style="margin-left: 20px; color: var(--kiro-text-secondary);">
                    <li>Quick prototyping where speed matters</li>
                    <li>Single-file changes with low risk</li>
                    <li>Generated code you'll review anyway (tests, docs)</li>
                </ul>

                <div class="tip-box" style="margin-top: 16px; background: var(--kiro-success-light); border-color: var(--kiro-success);">
                    <strong>Key Learning:</strong> Supervised Mode balances Kiro's productivity with human oversight, giving you the best of both autonomous and controlled development.
                </div>
            `)}
        `,
        actions: []
    };
}
