/**
 * Lesson 3: Physics Bug Investigation
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getLesson3Physics(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Lesson 3: Physics Bug Investigation',
        content: `
            ${ctx.getEnhancedLessonBadge(3, 9, 'Physics Bug Investigation')}

            <p>Investigate and fix a physics glitch where the game becomes unstable when tabbing away and returning.</p>

            ${ctx.getCollapsibleSection('l3-bug', 1, 'The Physics Bug', `
                <p>There's a subtle bug in the game physics: when you switch browser tabs and come back, the physics simulation becomes unstable.</p>

                <div class="warning-box">
                    <strong>Prerequisite:</strong> Game must be running from Lesson 1, with steering files from Lesson 2.
                </div>

                <h4>What You'll Learn</h4>
                <ul>
                    <li>Debugging runtime timing issues</li>
                    <li>Investigating game state lifecycle</li>
                    <li>Handling browser visibility changes</li>
                </ul>
            `)}

            ${ctx.getCollapsibleSection('l3-reproduce', 2, 'Reproduce the Issue', `
                <ol>
                    <li>Open the game at <code>localhost:5173</code></li>
                    <li>Start a game session with some items on screen</li>
                    <li>Switch to another browser tab for 10-15 seconds</li>
                    <li>Switch back to the game tab</li>
                </ol>

                <img src="https://kiro.dev/images/video-game-guide/physics-bug.gif" alt="Physics bug demonstration" style="width: 100%; border-radius: 8px; margin: 12px 0; border: 1px solid var(--vscode-widget-border);">

                <button class="action-btn browser" onclick="openUrl('http://localhost:5173')">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    Open Game
                </button>

                <div class="tip-box">
                    <strong>What to watch for:</strong> Items may jump, accelerate unnaturally, or clip through boundaries.
                </div>
            `)}

            ${ctx.getCollapsibleSection('l3-investigate', 3, 'Investigate with Kiro', `
                <button class="prompt-button" onclick="executePrompt('I have a physics bug in my game. When I switch browser tabs and come back, the physics simulation becomes unstable - objects fly around erratically. Can you help me investigate the game loop and timing logic to find the root cause?')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "I have a physics bug when switching tabs..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Key areas to investigate:</h4>
                <ul>
                    <li><code>requestAnimationFrame</code> timing behavior</li>
                    <li>Delta time calculations in the game loop</li>
                    <li><code>visibilitychange</code> event handling</li>
                </ul>
            `)}

            ${ctx.getCollapsibleSection('l3-fix', 4, 'Implement the Fix', `
                <button class="prompt-button" onclick="executePrompt('Please implement a fix for the physics timing bug. We need to handle the case where the browser tab was inactive and a large delta time has accumulated.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Please implement a fix for the physics timing bug..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Common solutions:</h4>
                <ul>
                    <li>Cap maximum delta time to a reasonable value</li>
                    <li>Listen for <code>visibilitychange</code> and pause/resume physics</li>
                    <li>Reset simulation state when returning from background</li>
                </ul>
            `)}

            ${ctx.getCollapsibleSection('l3-verify', 5, 'Verify the Fix', `
                <ol>
                    <li>Refresh the game page</li>
                    <li>Start a game session with items on screen</li>
                    <li>Switch tabs for 10-15 seconds</li>
                    <li>Return and verify physics are stable</li>
                </ol>

                <button class="action-btn browser" onclick="openUrl('http://localhost:5173')">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    Test the Fix
                </button>

                <div class="tip-box">
                    <strong>Key Learning:</strong> Always test edge cases like tab visibility changes.
                </div>
            `)}
        `,
        actions: []
    };
}
