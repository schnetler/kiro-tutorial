/**
 * Feature 13: Autonomous Agent - Persistent AI Teammate
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getFeature13AutonomousAgent(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Feature: Autonomous Agent',
        content: `
            ${ctx.getEnhancedLessonBadge(4, 7, 'Autonomous Agent - Persistent AI Teammate')}

            <p>The Kiro autonomous agent maintains context across sessions, learns from feedback, and executes complex tasks asynchronously across multiple repositories.</p>

            ${ctx.getCollapsibleSection('f13-intro', 1, 'What is the Autonomous Agent?', `
                <div class="info-box">
                    <strong>Kiro autonomous agent</strong> is a persistent AI system that works independently on development tasks. Unlike chat sessions that start fresh, it maintains awareness across all your work and never forgets.
                </div>

                <h4>Key Differentiators</h4>
                <div class="journey-container">
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Persistent Context</div>
                            <div class="journey-desc">Remembers across all sessions</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Learns from Feedback</div>
                            <div class="journey-desc">Applies your preferences to future work</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M7 12h10"/><path d="M7 17h10"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Multi-Repo Awareness</div>
                            <div class="journey-desc">Unified tasks across repositories</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Async Execution</div>
                            <div class="journey-desc">Works while you do other things</div>
                        </div>
                    </div>
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('f13-multi-repo', 2, 'Multi-Repository Tasks', `
                <p>The autonomous agent treats changes across repositories as a unified task:</p>

                <h4>Example: Library Upgrade</h4>
                <div class="info-item">
                    <strong>The Problem</strong>
                    <p>You need to upgrade a critical library used across 15 microservices. Manually: open each repo, update dependencies, fix breaking changes, run tests, create PR. Repeat 15 times.</p>
                </div>

                <div class="info-item">
                    <strong>With Autonomous Agent</strong>
                    <p>Create one task. The agent plans, implements, tests, and creates PRs across all 15 repos while you focus on other work.</p>
                </div>

                <div class="code-block-container">
                    <div class="code-block"># Example task description:
"Upgrade axios from v0.x to v1.x across all our
microservices. Handle breaking changes in the
request/response interceptors. Run tests and
create PRs for each repo."</div>
                </div>

                <div class="tip-box">
                    <strong>Concurrent execution:</strong> The agent can work on up to 10 tasks simultaneously, making large-scale changes practical.
                </div>
            `)}

            ${ctx.getCollapsibleSection('f13-learning', 3, 'Learning from Feedback', `
                <p>The autonomous agent improves based on your code review feedback:</p>

                <h4>How Learning Works</h4>
                <ol style="margin-left: 20px; color: var(--kiro-text-secondary);">
                    <li>Agent creates a PR with changes</li>
                    <li>You review and leave comments ("prefer early returns" or "use our custom logger")</li>
                    <li>Agent remembers this feedback</li>
                    <li>Future work automatically applies these patterns</li>
                </ol>

                <div class="info-item" style="margin-top: 16px;">
                    <strong>Team Knowledge</strong>
                    <p>For teams, the agent builds collective understanding from everyone's feedback. Architectural decisions, ticket discussions, and code reviews all inform future work.</p>
                </div>

                <div class="code-block-container">
                    <div class="code-block"># Feedback on PR #47:
"Use our ErrorBoundary component for error handling"

# Agent remembers and applies to PR #52, #55, #61...
// All future error handling uses ErrorBoundary</div>
                </div>
            `)}

            ${ctx.getCollapsibleSection('f13-getting-started', 4, 'Getting Started with Autonomous Agent', `
                <div class="info-box" style="background: var(--kiro-warning-light); border-color: var(--kiro-warning);">
                    <strong>Preview Feature:</strong> The autonomous agent is currently rolling out in preview for Kiro Pro, Pro+, and Power subscribers. Usage is free during preview with weekly limits.
                </div>

                <h4>How to Access</h4>
                <div class="info-item">
                    <strong>Check Eligibility</strong>
                    <p>Ensure you have a Pro or higher Kiro subscription</p>
                </div>
                <div class="info-item">
                    <strong>Enable in Settings</strong>
                    <p>Look for "Autonomous Agent" in Kiro settings</p>
                </div>
                <div class="info-item">
                    <strong>Connect Repositories</strong>
                    <p>Link the repos you want the agent to work with</p>
                </div>

                <h4 style="margin-top: 16px;">Ideal Use Cases</h4>
                <ul style="margin-left: 20px; color: var(--kiro-text-secondary);">
                    <li>Dependency updates across multiple repos</li>
                    <li>Codebase-wide refactoring</li>
                    <li>Consistent formatting/linting fixes</li>
                    <li>Migration tasks (API versions, frameworks)</li>
                    <li>Documentation generation</li>
                </ul>

                <button class="action-btn browser" onclick="openUrl('https://kiro.dev/autonomous-agent/')">
                    <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/></svg>
                    Learn More About Autonomous Agent
                </button>

                <div class="tip-box" style="margin-top: 16px; background: var(--kiro-success-light); border-color: var(--kiro-success);">
                    <strong>Key Learning:</strong> The autonomous agent transforms Kiro from a chat assistant into a persistent teammate that maintains context, learns your preferences, and handles complex multi-repo tasks asynchronously.
                </div>
            `)}
        `,
        actions: []
    };
}
