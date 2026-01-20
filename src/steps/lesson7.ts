/**
 * Lesson 7: Asset Management with Hooks
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getLesson7Hooks(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Lesson 7: Asset Management with Hooks',
        content: `
            ${ctx.getEnhancedLessonBadge(7, 9, 'Asset Management with Hooks')}

            <p>Automate repetitive workflows using Kiro's agent hooks. Reduce manual tasks and ensure consistency across your development process.</p>

            ${ctx.getCollapsibleSection('l7-context', 1, 'Understanding Agent Hooks', `
                <div class="info-box">
                    <strong>What are hooks?</strong> Hooks are automated behaviors that run before or after Kiro actions. They can inject context, run checks, or trigger workflows automatically.
                </div>

                <h4>Hook Use Cases</h4>
                <div class="journey-container">
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Pre-commit Checks</div>
                            <div class="journey-desc">Run linting before commits</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Context Injection</div>
                            <div class="journey-desc">Auto-add relevant docs to prompts</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Asset Processing</div>
                            <div class="journey-desc">Auto-optimize images when added</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Workflow Automation</div>
                            <div class="journey-desc">Chain multiple operations</div>
                        </div>
                    </div>
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('l7-identify', 2, 'Identify Repetitive Patterns', `
                <p>Ask Kiro to identify workflows that could be automated:</p>

                <button class="prompt-button" onclick="executePrompt('Analyze my workflow patterns in this project. What repetitive tasks could be automated with hooks? Look for things like asset optimization, code formatting, testing, or context that I have to repeatedly explain.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Analyze my workflow for automation opportunities..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Common Automation Opportunities</h4>
                <div class="info-item">
                    <strong>Coding Standards</strong>
                    <p>Auto-run formatters and linters on file save</p>
                </div>
                <div class="info-item">
                    <strong>Asset Pipeline</strong>
                    <p>Compress images, generate sprites, optimize SVGs</p>
                </div>
                <div class="info-item">
                    <strong>Documentation</strong>
                    <p>Auto-update docs when APIs change</p>
                </div>
                <div class="info-item">
                    <strong>Testing</strong>
                    <p>Run relevant tests when files change</p>
                </div>

                <div class="tip-box">
                    <strong>Think about friction:</strong> What tasks do you repeatedly do manually? What context do you have to re-explain to Kiro?
                </div>
            `)}

            ${ctx.getCollapsibleSection('l7-configure', 3, 'Create hooks.json', `
                <p>Create a hooks configuration file in your project:</p>

                <div class="code-block-container">
                    <div class="code-block"># File: .kiro/hooks.json
{
  "hooks": [
    {
      "name": "optimize-images",
      "trigger": "file:create",
      "pattern": "**/*.{png,jpg,jpeg}",
      "action": "compress-image"
    },
    {
      "name": "lint-on-save",
      "trigger": "file:save",
      "pattern": "**/*.{ts,tsx}",
      "action": "run-eslint"
    }
  ]
}</div>
                </div>

                <button class="prompt-button" onclick="executePrompt('Help me create a hooks.json file for this project. Based on the workflow analysis, set up hooks for the most impactful automation opportunities you identified.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Create hooks.json for this project..."
                    </div>
                </button>

                <div class="tip-box" style="margin-top: 12px;">
                    <strong>Start small:</strong> Begin with one or two high-impact hooks. Add more as you identify additional automation opportunities.
                </div>

                <img src="https://kiro.dev/images/video-game-guide/create-hook.png" alt="Creating a hook" style="width: 100%; border-radius: 8px; margin: 12px 0; border: 1px solid var(--vscode-widget-border);">

                <img src="https://kiro.dev/images/video-game-guide/asset-create.png" alt="Asset creation hook" style="width: 100%; border-radius: 8px; margin: 12px 0; border: 1px solid var(--vscode-widget-border);">
            `)}

            ${ctx.getCollapsibleSection('l7-test', 4, 'Test Automated Workflows', `
                <p>Verify your hooks are working correctly:</p>

                <div class="info-item">
                    <strong>Step 1:</strong> Trigger the hook condition
                    <p>For image hooks, add a new image. For lint hooks, save a TypeScript file.</p>
                </div>
                <div class="info-item">
                    <strong>Step 2:</strong> Watch Kiro's activity
                    <p>Check the output panel for hook execution logs.</p>
                </div>
                <div class="info-item">
                    <strong>Step 3:</strong> Verify the result
                    <p>Confirm the expected action was performed (file optimized, lint ran, etc.).</p>
                </div>

                <button class="action-btn" onclick="executeCommand('kiro-tutorial.openHooksFile', false, 0)">
                    <svg viewBox="0 0 24 24"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                    Open Hooks Configuration
                </button>

                <img src="https://kiro.dev/images/video-game-guide/hook-run-create.png" alt="Hook running on file create" style="width: 100%; border-radius: 8px; margin: 12px 0; border: 1px solid var(--vscode-widget-border);">

                <img src="https://kiro.dev/images/video-game-guide/hook-run-delete.png" alt="Hook running on file delete" style="width: 100%; border-radius: 8px; margin: 12px 0; border: 1px solid var(--vscode-widget-border);">

                <div class="tip-box" style="margin-top: 16px; background: var(--kiro-success-light); border-color: var(--kiro-success);">
                    <strong>Key Learning:</strong> Hooks eliminate repetitive explanations and automate common workflows. They make AI-assisted development more efficient by reducing manual intervention.
                </div>
            `)}
        `,
        actions: []
    };
}
