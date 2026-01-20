/**
 * Feature 10: Kiro Powers - Dynamic Tool Loading
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getFeature10Powers(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Feature: Kiro Powers',
        content: `
            ${ctx.getEnhancedLessonBadge(1, 7, 'Kiro Powers - Dynamic Tool Loading')}

            <p>Powers give Kiro instant expertise for any technology by dynamically loading tools, workflows, and best practices on-demand.</p>

            ${ctx.getCollapsibleSection('f10-intro', 1, 'What are Powers?', `
                <div class="info-box">
                    <strong>Powers</strong> package MCP servers, steering files, and hooks into reusable bundles that Kiro activates automatically based on your conversation context.
                </div>

                <h4>The Problem Powers Solve</h4>
                <p>Connect five MCP servers and your agent loads 100+ tool definitions before writing a single line of code. This consumes ~40% of your context window before you even start!</p>

                <h4>The Solution</h4>
                <p>Powers load tools <strong>on-demand</strong>. Install five powers and your baseline context usage is near zero. Mention "payment" and the Stripe power activates. Switch to database work and Supabase loads while Stripe deactivates.</p>

                <div class="journey-container">
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Dynamic Loading</div>
                            <div class="journey-desc">Tools load only when needed</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Context Efficient</div>
                            <div class="journey-desc">Preserves precious context window</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Bundled Expertise</div>
                            <div class="journey-desc">Tools + steering + hooks together</div>
                        </div>
                    </div>
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('f10-browse', 2, 'Browse & Install Powers', `
                <p>Explore available powers from industry leaders:</p>

                <h4>Launch Partner Powers</h4>
                <div class="info-item">
                    <strong>Figma</strong> - Design system integration, component inspection
                </div>
                <div class="info-item">
                    <strong>Supabase</strong> - Database queries, auth management
                </div>
                <div class="info-item">
                    <strong>Stripe</strong> - Payment integration, subscription management
                </div>
                <div class="info-item">
                    <strong>Netlify</strong> - Deploy previews, site management
                </div>
                <div class="info-item">
                    <strong>Datadog / Dynatrace</strong> - Observability and monitoring
                </div>
                <div class="info-item">
                    <strong>Postman</strong> - API testing and documentation
                </div>

                <h4 style="margin-top: 16px;">Try It: Install a Power</h4>
                <p>Click the ghost icon with thunderbolt in Kiro's sidebar, then browse available powers. Click "Install" on any power to add it.</p>

                <button class="action-btn browser" onclick="openUrl('https://kiro.dev/powers/')">
                    <svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    Browse Powers Marketplace
                </button>

                <div class="tip-box" style="margin-top: 12px;">
                    <strong>No additional cost:</strong> All Kiro users can access and use powers at no extra charge.
                </div>
            `)}

            ${ctx.getCollapsibleSection('f10-use', 3, 'Using Powers in Practice', `
                <p>Once installed, powers activate automatically based on context:</p>

                <button class="prompt-button" onclick="executePrompt('I need to set up Stripe payment processing for subscriptions. Create a checkout flow with monthly and yearly plans.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro (activates Stripe power)</div>
                        "Set up Stripe payment processing..."
                    </div>
                </button>

                <button class="prompt-button" onclick="executePrompt('Query my Supabase database to find all users who signed up in the last 7 days and show their subscription status.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro (activates Supabase power)</div>
                        "Query my Supabase database..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">What Happens Behind the Scenes</h4>
                <ol style="margin-left: 20px; color: var(--kiro-text-secondary);">
                    <li>Kiro reads your prompt</li>
                    <li>Evaluates installed powers against keywords</li>
                    <li>Loads relevant power's MCP tools and steering</li>
                    <li>Deactivates other powers to save context</li>
                    <li>Executes with specialized expertise</li>
                </ol>
            `)}

            ${ctx.getCollapsibleSection('f10-create', 4, 'Create Your Own Power', `
                <p>Build custom powers for your team's specific needs:</p>

                <h4>Power Structure</h4>
                <div class="code-block-container">
                    <div class="code-block">my-power/
├── POWER.md        # Required: Power definition
├── mcp.json        # Optional: MCP server config
└── steering/       # Optional: Workflow files
    └── best-practices.md</div>
                </div>

                <button class="prompt-button" onclick="executePrompt('Help me create a custom Kiro power for our internal API. It should include an MCP server for querying our endpoints and steering files with our API conventions and error handling patterns.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Create a custom power for our internal API..."
                    </div>
                </button>

                <button class="action-btn browser" onclick="openUrl('https://kiro.dev/docs/powers/create/')">
                    <svg viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>
                    Read Power Creation Docs
                </button>

                <div class="tip-box" style="margin-top: 16px; background: var(--kiro-success-light); border-color: var(--kiro-success);">
                    <strong>Key Learning:</strong> Powers transform MCP from manual configuration to intelligent, context-aware tool loading. Install once, use automatically.
                </div>
            `)}
        `,
        actions: []
    };
}
