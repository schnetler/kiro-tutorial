/**
 * Feature 15: Contextual Hooks - Automated Workflows
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getFeature15ContextualHooks(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Feature: Contextual Hooks',
        content: `
            ${ctx.getEnhancedLessonBadge(6, 10, 'Contextual Hooks - Automated Workflows')}

            <p>Contextual Hooks let you automate actions at key moments in your workflow - when you submit a prompt, when the agent stops, or when files change.</p>

            <div class="video-container" style="margin: 16px 0; border-radius: 8px; overflow: hidden;">
                <video autoplay loop muted playsinline style="width: 100%; border-radius: 8px;">
                    <source src="https://kiro.dev/videos/kiro-hook.mp4" type="video/mp4">
                </video>
            </div>

            ${ctx.getCollapsibleSection('f15-intro', 1, 'What are Contextual Hooks?', `
                <div class="info-box">
                    <strong>Contextual Hooks</strong> are automated actions triggered at specific points in your Kiro workflow. They can inject context, run commands, or execute custom logic.
                </div>

                <h4>Hook Triggers</h4>
                <div class="journey-container">
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Prompt Submit</div>
                            <div class="journey-desc">Runs before your message is sent</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Agent Stop</div>
                            <div class="journey-desc">Runs when Kiro finishes a task</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">File Events</div>
                            <div class="journey-desc">Create, save, or delete files</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Manual Invoke</div>
                            <div class="journey-desc">Run hooks on demand</div>
                        </div>
                    </div>
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('f15-actions', 2, 'Hook Actions', `
                <p>When a hook triggers, it can perform two types of actions:</p>

                <h4>Agent Prompt Action</h4>
                <div class="info-item">
                    <strong>Inject context or instructions</strong>
                    <p>Add information to the conversation automatically. Great for injecting project standards, current state, or relevant documentation.</p>
                </div>

                <div class="code-block-container">
                    <div class="code-block">{
  "name": "inject-standards",
  "trigger": "prompt-submit",
  "action": {
    "type": "agent-prompt",
    "prompt": "Remember our coding standards: use TypeScript strict mode, prefer functional components, and always add error boundaries."
  }
}</div>
                </div>

                <h4 style="margin-top: 16px;">Shell Command Action</h4>
                <div class="info-item">
                    <strong>Run local commands</strong>
                    <p>Execute scripts, run tests, or perform any shell operation. Output can be captured and used in the conversation.</p>
                </div>

                <div class="code-block-container">
                    <div class="code-block">{
  "name": "run-tests-on-stop",
  "trigger": "agent-stop",
  "action": {
    "type": "shell",
    "command": "npm test -- --coverage"
  }
}</div>
                </div>
            `)}

            ${ctx.getCollapsibleSection('f15-practice', 3, 'Hands-On: Create a Hook', `
                <p>Let's create a hook that automatically runs tests when Kiro finishes making changes:</p>

                <h4>Step 1: Ask Kiro to Create the Hook</h4>
                <button class="prompt-button" onclick="executePrompt('Create a Kiro hook that runs our test suite whenever the agent stops working. It should use the agent-stop trigger and run npm test. Save it to .kiro/hooks/run-tests.json')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Create a hook that runs tests when agent stops..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Step 2: Create a Context Injection Hook</h4>
                <button class="prompt-button" onclick="executePrompt('Create another hook that injects our project context on every prompt. It should remind the agent about our tech stack (React, TypeScript, Tailwind) and coding conventions.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Create a context injection hook for our tech stack..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Step 3: Test Your Hooks</h4>
                <p>Make a small code change and watch the test hook run automatically when Kiro finishes.</p>

                <div class="tip-box">
                    <strong>Pro tip:</strong> Use the Command Palette to manually invoke hooks: "Kiro: Run Hook"
                </div>
            `)}

            ${ctx.getCollapsibleSection('f15-examples', 4, 'Useful Hook Patterns', `
                <h4>Common Hook Configurations</h4>

                <div class="info-item">
                    <strong>Auto-format on save</strong>
                    <p>Run Prettier or ESLint fix when files are saved</p>
                </div>

                <div class="info-item">
                    <strong>Security scan on changes</strong>
                    <p>Run security checks when sensitive files are modified</p>
                </div>

                <div class="info-item">
                    <strong>Documentation reminder</strong>
                    <p>Inject "update docs" reminder when API files change</p>
                </div>

                <div class="info-item">
                    <strong>Build verification</strong>
                    <p>Run build after agent completes to catch errors early</p>
                </div>

                <h4 style="margin-top: 16px;">Hook File Location</h4>
                <div class="code-block-container">
                    <div class="code-block">.kiro/
└── hooks/
    ├── run-tests.json
    ├── inject-context.json
    └── format-on-save.json</div>
                </div>

                <div class="tip-box" style="margin-top: 16px; background: var(--kiro-success-light); border-color: var(--kiro-success);">
                    <strong>Key Learning:</strong> Contextual Hooks automate repetitive workflows, ensuring consistency and catching issues early without manual intervention.
                </div>
            `)}
        `,
        actions: []
    };
}
