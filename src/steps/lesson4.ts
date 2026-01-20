/**
 * Lesson 4: Interactions Bug Fix
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getLesson4Interactions(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Lesson 4: Interactions Bug Fix',
        content: `
            ${ctx.getEnhancedLessonBadge(4, 9, 'Interactions Bug Fix')}

            <p>Debug and fix multi-file issues in the AI-generated crafting system. Learn systematic approaches to tracing bugs across client and server code.</p>

            ${ctx.getCollapsibleSection('l4-context', 1, 'The Problem', `
                <div class="info-box">
                    <strong>Scenario:</strong> The crafting interactions were originally "chat coded" quickly and contain subtle bugs. Items sometimes fail to combine correctly on the workbench.
                </div>

                <div class="warning-box">
                    <strong>Prerequisite:</strong> Physics bug from Lesson 3 should be fixed. Game must be running.
                </div>

                <h4>Skills You'll Practice</h4>
                <div class="journey-container">
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Multi-File Debugging</div>
                            <div class="journey-desc">Trace issues across components</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Data Flow Analysis</div>
                            <div class="journey-desc">Follow data from UI to server</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">AI Code Validation</div>
                            <div class="journey-desc">Verify generated logic</div>
                        </div>
                    </div>
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('l4-reproduce', 2, 'Reproduce the Bug', `
                <p>First, reproduce the bug to understand what's happening:</p>

                <div class="info-item">
                    <strong>Step 1:</strong> Start a game session
                    <p>Log in and enter the game world.</p>
                </div>

                <div class="info-item">
                    <strong>Step 2:</strong> Get crafting materials
                    <p>Pull the <strong>red lever</strong> multiple times to get <code>Wood</code> and <code>Stone</code> items.</p>
                </div>

                <div class="info-item">
                    <strong>Step 3:</strong> Attempt to craft
                    <p>Place both items on the <strong>workbench</strong> and observe the result.</p>
                </div>

                <button class="action-btn browser" onclick="openUrl('http://localhost:5173')">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    Open Game
                </button>

                <div class="warning-box" style="margin-top: 12px;">
                    <strong>Expected vs Actual:</strong><br>
                    <span style="color: var(--kiro-success);">Expected:</span> Wood + Stone = Tool<br>
                    <span style="color: #f85149;">Actual:</span> Nothing happens, or wrong item produced
                </div>

                <img src="https://kiro.dev/images/video-game-guide/interactions-bug.gif" alt="Interactions bug demonstration" style="width: 100%; border-radius: 8px; margin: 12px 0; border: 1px solid var(--vscode-widget-border);">
            `)}

            ${ctx.getCollapsibleSection('l4-investigate', 3, 'Investigate with Kiro', `
                <p>Ask Kiro to trace the crafting flow from UI to server:</p>

                <button class="prompt-button" onclick="executePrompt('I have a bug in the crafting system. When I combine Wood and Stone on the workbench, I get unexpected results. Can you trace the interaction flow from the client workbench component through to the server crafting logic and identify where the bug might be?')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Trace the crafting flow and find the bug..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Key Files to Examine</h4>
                <div class="code-block-container">
                    <div class="code-block">client/src/game/Workbench.tsx    # UI interactions
server/src/crafting/recipes.ts   # Recipe definitions
server/src/crafting/engine.ts    # Crafting logic
shared/types/interactions.ts     # Type definitions</div>
                </div>

                <div class="tip-box">
                    <strong>Debugging Strategy:</strong> Start at the UI, verify the correct items are being sent, then trace into server-side recipe matching.
                </div>

                <h4 style="margin-top: 16px;">Follow-up Investigation</h4>
                <button class="prompt-button" onclick="executePrompt('Can you show me the recipe matching logic in the crafting engine? I want to understand how it compares input items against defined recipes.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Deep Dive</div>
                        "Show me the recipe matching logic..."
                    </div>
                </button>
            `)}

            ${ctx.getCollapsibleSection('l4-fix', 4, 'Implement the Fix', `
                <p>Once you've identified the issue, ask Kiro to fix it:</p>

                <button class="prompt-button" onclick="executePrompt('Please fix the crafting bug you identified. The recipe matching logic needs to be corrected so Wood + Stone produces a Tool correctly. Make sure to handle the case where items can be placed in any order.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Fix the crafting bug..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Common Root Causes</h4>
                <ul>
                    <li><strong>Order sensitivity</strong> - Recipe expects items in specific order</li>
                    <li><strong>Type mismatches</strong> - String vs enum comparison issues</li>
                    <li><strong>Missing recipes</strong> - Incomplete recipe definitions</li>
                    <li><strong>State sync</strong> - Client/server state mismatch</li>
                </ul>

                <div class="tip-box">
                    <strong>Review the diff:</strong> Before accepting changes, review Kiro's modifications to understand exactly what was wrong.
                </div>
            `)}

            ${ctx.getCollapsibleSection('l4-verify', 5, 'Verify & Complete', `
                <p>Test that the fix works correctly:</p>

                <div class="info-item">
                    <strong>Test 1:</strong> Basic crafting
                    <p>Wood + Stone should produce a Tool</p>
                </div>

                <div class="info-item">
                    <strong>Test 2:</strong> Order independence
                    <p>Stone + Wood (reversed) should also produce a Tool</p>
                </div>

                <div class="info-item">
                    <strong>Test 3:</strong> Other recipes
                    <p>Verify other crafting combinations still work</p>
                </div>

                <button class="action-btn browser" onclick="openUrl('http://localhost:5173')">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    Test Crafting
                </button>

                <div class="tip-box" style="margin-top: 16px; background: var(--kiro-success-light); border-color: var(--kiro-success);">
                    <strong>Key Learning:</strong> Multi-file bugs require systematic tracing. AI can quickly map data flow across components - ask it to "trace" or "follow" the data path.
                </div>
            `)}
        `,
        actions: []
    };
}
