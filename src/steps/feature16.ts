/**
 * Feature 16: Web Tools - Research Capabilities
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getFeature16WebTools(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Feature: Web Tools',
        content: `
            ${ctx.getEnhancedLessonBadge(7, 7, 'Web Tools - Research Capabilities')}

            <p>Web Tools bring real-time internet access to Kiro, enabling web searches and URL fetching for documentation, research, and staying current with rapidly changing technologies.</p>

            ${ctx.getCollapsibleSection('f16-intro', 1, 'What are Web Tools?', `
                <div class="info-box">
                    <strong>Web Tools</strong> allow Kiro to search the web and fetch content from URLs directly during your conversation. No more context-switching to look up documentation or examples.
                </div>

                <h4>Key Capabilities</h4>
                <div class="journey-container">
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Web Search</div>
                            <div class="journey-desc">Search for current information</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">URL Fetching</div>
                            <div class="journey-desc">Read documentation directly</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Current Information</div>
                            <div class="journey-desc">Access latest docs and APIs</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Seamless Integration</div>
                            <div class="journey-desc">Results flow into your chat</div>
                        </div>
                    </div>
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('f16-search', 2, 'Web Search in Action', `
                <p>Kiro can search the web to find current information:</p>

                <h4>When Web Search Helps</h4>
                <div class="info-item">
                    <strong>New Library Versions</strong>
                    <p>Find what changed in the latest release</p>
                </div>
                <div class="info-item">
                    <strong>Error Messages</strong>
                    <p>Research obscure errors with current solutions</p>
                </div>
                <div class="info-item">
                    <strong>Best Practices</strong>
                    <p>Find current recommendations and patterns</p>
                </div>
                <div class="info-item">
                    <strong>API Documentation</strong>
                    <p>Look up endpoints, parameters, and examples</p>
                </div>

                <h4 style="margin-top: 16px;">Example: Research Before Implementation</h4>
                <button class="prompt-button" onclick="executePrompt('Search for the latest React Server Components best practices and patterns. I want to understand when to use \\'use client\\' vs keeping components on the server.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro (triggers web search)</div>
                        "Search for React Server Components best practices..."
                    </div>
                </button>

                <div class="tip-box">
                    <strong>Pro tip:</strong> Kiro automatically searches when it detects you need current information. You can also explicitly ask it to "search for" something.
                </div>
            `)}

            ${ctx.getCollapsibleSection('f16-fetch', 3, 'Hands-On: Fetch Documentation', `
                <p>Kiro can read documentation directly from URLs:</p>

                <h4>Step 1: Provide a Documentation URL</h4>
                <button class="prompt-button" onclick="executePrompt('Read the Stripe API documentation at https://stripe.com/docs/api/charges/create and show me how to create a charge with idempotency keys for handling retries safely.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro (fetches URL)</div>
                        "Read the Stripe API docs and show me..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Step 2: Apply What Kiro Learned</h4>
                <button class="prompt-button" onclick="executePrompt('Now implement a payment service using the Stripe patterns from the docs. Include proper error handling and idempotency key generation.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Implement a payment service using those patterns..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">What Happens</h4>
                <ol style="margin-left: 20px; color: var(--kiro-text-secondary);">
                    <li>Kiro fetches the URL content</li>
                    <li>Extracts relevant information</li>
                    <li>Summarizes key points in context</li>
                    <li>Uses the information for implementation</li>
                </ol>

                <div class="tip-box" style="background: var(--kiro-warning-light); border-color: var(--kiro-warning);">
                    <strong>Note:</strong> Web fetch respects robots.txt and may not access all sites. Authentication-required pages won't work.
                </div>
            `)}

            ${ctx.getCollapsibleSection('f16-workflow', 4, 'Research-Driven Development Workflow', `
                <h4>Combining Web Tools with Coding</h4>
                <p>A powerful workflow for working with unfamiliar APIs or libraries:</p>

                <div class="code-block-container">
                    <div class="code-block">1. "Search for how to implement OAuth2 PKCE flow"
   ↓ Kiro searches and summarizes current best practices

2. "Read the Auth0 documentation for SPA authentication"
   ↓ Kiro fetches specific implementation details

3. "Now implement the auth flow using those patterns"
   ↓ Kiro builds on researched information</div>
                </div>

                <h4 style="margin-top: 16px;">Best Practices</h4>
                <div class="info-item">
                    <strong>Be Specific</strong>
                    <p>"Search for Next.js 14 app router migration guide" beats "search for Next.js"</p>
                </div>
                <div class="info-item">
                    <strong>Provide URLs When Known</strong>
                    <p>Direct URLs are faster and more accurate than searches</p>
                </div>
                <div class="info-item">
                    <strong>Chain Research + Implementation</strong>
                    <p>Research first, then ask Kiro to implement based on findings</p>
                </div>

                <div class="tip-box" style="margin-top: 16px; background: var(--kiro-success-light); border-color: var(--kiro-success);">
                    <strong>Key Learning:</strong> Web Tools eliminate context-switching between browser and IDE. Research, understand, and implement without leaving Kiro.
                </div>
            `)}
        `,
        actions: []
    };
}
