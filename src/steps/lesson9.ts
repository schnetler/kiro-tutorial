/**
 * Lesson 9: Conclusion & Next Steps
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getLesson9Conclusion(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Lesson 9: Conclusion & Next Steps',
        content: `
            ${ctx.getEnhancedLessonBadge(9, 9, 'Conclusion & Next Steps')}

            <style>
                @keyframes celebration-glow {
                    0%, 100% {
                        box-shadow: 0 0 20px rgba(127, 86, 217, 0.4), 0 0 40px rgba(127, 86, 217, 0.2), 0 0 60px rgba(127, 86, 217, 0.1);
                        transform: scale(1);
                    }
                    50% {
                        box-shadow: 0 0 30px rgba(127, 86, 217, 0.6), 0 0 60px rgba(127, 86, 217, 0.3), 0 0 80px rgba(127, 86, 217, 0.15);
                        transform: scale(1.02);
                    }
                }
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes float-particle {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(-80px) rotate(360deg); opacity: 0; }
                }
                @keyframes sparkle {
                    0%, 100% { opacity: 0; transform: scale(0); }
                    50% { opacity: 1; transform: scale(1); }
                }
                @keyframes ring-fill {
                    from { stroke-dashoffset: 251; }
                    to { stroke-dashoffset: 0; }
                }
                .celebration-container {
                    position: relative;
                    padding: 32px 20px;
                    margin: 8px 0 16px;
                    background: linear-gradient(135deg, rgba(127, 86, 217, 0.08) 0%, rgba(46, 160, 67, 0.08) 100%);
                    border-radius: 16px;
                    border: 1px solid rgba(127, 86, 217, 0.2);
                    overflow: hidden;
                }
                .celebration-particles {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    overflow: hidden;
                }
                .particle {
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    animation: float-particle 3s ease-out infinite;
                }
                .particle:nth-child(1) { left: 10%; bottom: 20%; background: #7F56D9; animation-delay: 0s; }
                .particle:nth-child(2) { left: 25%; bottom: 10%; background: #2EA043; animation-delay: 0.5s; }
                .particle:nth-child(3) { left: 40%; bottom: 25%; background: #E3B341; animation-delay: 1s; }
                .particle:nth-child(4) { left: 60%; bottom: 15%; background: #388BFD; animation-delay: 0.3s; }
                .particle:nth-child(5) { left: 75%; bottom: 20%; background: #7F56D9; animation-delay: 0.8s; }
                .particle:nth-child(6) { left: 90%; bottom: 10%; background: #2EA043; animation-delay: 1.2s; }
                .sparkle {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    animation: sparkle 2s ease-in-out infinite;
                }
                .sparkle svg { width: 100%; height: 100%; fill: #E3B341; }
                .sparkle:nth-child(7) { top: 15%; left: 15%; animation-delay: 0s; }
                .sparkle:nth-child(8) { top: 20%; right: 20%; animation-delay: 0.7s; }
                .sparkle:nth-child(9) { top: 60%; left: 10%; animation-delay: 1.4s; }
                .sparkle:nth-child(10) { top: 50%; right: 15%; animation-delay: 0.3s; }
                .achievement-badge {
                    position: relative;
                    width: 100px;
                    height: 100px;
                    margin: 0 auto 20px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #7F56D9 0%, #633CB4 100%);
                    animation: celebration-glow 2s ease-in-out infinite;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .achievement-badge svg {
                    width: 50px;
                    height: 50px;
                    fill: none;
                    stroke: white;
                    stroke-width: 2;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                }
                .completion-ring {
                    position: absolute;
                    top: -6px;
                    left: -6px;
                    width: 112px;
                    height: 112px;
                }
                .completion-ring circle {
                    fill: none;
                    stroke-width: 3;
                    transform: rotate(-90deg);
                    transform-origin: center;
                }
                .completion-ring .ring-bg {
                    stroke: rgba(127, 86, 217, 0.2);
                }
                .completion-ring .ring-fill {
                    stroke: #2EA043;
                    stroke-dasharray: 251;
                    stroke-dashoffset: 0;
                    animation: ring-fill 1.5s ease-out forwards;
                }
                .celebration-title {
                    font-size: 28px;
                    font-weight: 700;
                    background: linear-gradient(90deg, #7F56D9, #2EA043, #E3B341, #7F56D9);
                    background-size: 300% 100%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: gradient-shift 4s ease infinite;
                    margin-bottom: 8px;
                }
                .celebration-subtitle {
                    font-size: 15px;
                    color: var(--vscode-descriptionForeground);
                    margin-bottom: 16px;
                }
                .completion-stats {
                    display: flex;
                    justify-content: center;
                    gap: 24px;
                    margin-top: 16px;
                }
                .stat-item {
                    text-align: center;
                }
                .stat-value {
                    font-size: 24px;
                    font-weight: 700;
                    color: var(--kiro-purple-600);
                }
                .stat-label {
                    font-size: 11px;
                    color: var(--vscode-descriptionForeground);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
            </style>

            <div class="celebration-container">
                <div class="celebration-particles">
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="sparkle"><svg viewBox="0 0 24 24"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg></div>
                    <div class="sparkle"><svg viewBox="0 0 24 24"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg></div>
                    <div class="sparkle"><svg viewBox="0 0 24 24"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg></div>
                    <div class="sparkle"><svg viewBox="0 0 24 24"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg></div>
                </div>

                <div style="position: relative; z-index: 1; text-align: center;">
                    <div class="achievement-badge">
                        <svg class="completion-ring" viewBox="0 0 112 112">
                            <circle class="ring-bg" cx="56" cy="56" r="40"/>
                            <circle class="ring-fill" cx="56" cy="56" r="40"/>
                        </svg>
                        <svg viewBox="0 0 24 24">
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7"/>
                            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 17 7 17 7"/>
                            <path d="M4 22h16"/>
                            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/>
                            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/>
                            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                        </svg>
                    </div>

                    <div class="celebration-title">Congratulations!</div>
                    <div class="celebration-subtitle">You have completed Spirit of Kiro</div>

                    <div class="completion-stats">
                        <div class="stat-item">
                            <div class="stat-value">9</div>
                            <div class="stat-label">Lessons</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">6</div>
                            <div class="stat-label">Skills</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">100%</div>
                            <div class="stat-label">Complete</div>
                        </div>
                    </div>
                </div>
            </div>

            ${ctx.getCollapsibleSection('l9-mastered', 1, 'What You Have Mastered', `
                <div class="journey-container">
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Chat Mode</div>
                            <div class="journey-desc">Quick prototyping through natural conversation</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Spec-Driven Development</div>
                            <div class="journey-desc">Structured planning for complex features</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">AI-Assisted Debugging</div>
                            <div class="journey-desc">Systematic bug investigation and fixes</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Refactoring</div>
                            <div class="journey-desc">DRY principles and code quality</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Automation</div>
                            <div class="journey-desc">Hooks for repetitive workflows</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><path d="M14 12v.01"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Customization</div>
                            <div class="journey-desc">MCP for project-specific tools</div>
                        </div>
                    </div>
                </div>

                <div class="tip-box" style="margin-top: 16px; background: var(--kiro-purple-100); border-color: var(--kiro-purple-400);">
                    <strong>Fun Fact:</strong> Spirit of Kiro was 95% built using Kiro! You've learned the same techniques used to create real production applications.
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('l9-next', 2, 'Continue Your Journey', `
                <h4>What's Next?</h4>

                <div class="info-item">
                    <strong>🚀 Start Your Own Project</strong>
                    <p>Apply what you've learned to your own ideas. Start with chat mode, graduate to specs for complex features.</p>
                </div>

                <div class="info-item">
                    <strong>📚 Explore Kiro Documentation</strong>
                    <p>Deep dive into advanced features, keyboard shortcuts, and configuration options.</p>
                </div>

                <div class="info-item">
                    <strong>🎮 Enhance Spirit of Kiro</strong>
                    <p>Add your own features to the game! New items, crafting recipes, or gameplay mechanics.</p>
                </div>

                <div class="info-item">
                    <strong>💬 Join the Community</strong>
                    <p>Share your experience, get help, and learn from other Kiro users.</p>
                </div>

                <div class="info-item">
                    <strong>🔧 Build MCP Tools</strong>
                    <p>Create custom tools for your workflow and share them with others.</p>
                </div>

                <button class="action-btn browser" onclick="openUrl('https://kiro.dev/docs')" style="margin-top: 16px;">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                    Visit Kiro Documentation
                </button>
            `)}

            ${ctx.getCollapsibleSection('l9-resources', 3, 'Resources', `
                <div class="info-item">
                    <strong>Kiro Documentation</strong>
                    <p>Complete reference for all Kiro features and capabilities.</p>
                    <a href="https://kiro.dev/docs" style="color: var(--kiro-purple-600);">kiro.dev/docs</a>
                </div>

                <div class="info-item">
                    <strong>MCP Specification</strong>
                    <p>Build custom tools to extend Kiro's capabilities.</p>
                    <a href="https://modelcontextprotocol.io" style="color: var(--kiro-purple-600);">modelcontextprotocol.io</a>
                </div>

                <div class="info-item">
                    <strong>Spirit of Kiro Source</strong>
                    <p>Explore the full game source code and contribute.</p>
                    <a href="https://github.com/kirodotdev/spirit-of-kiro" style="color: var(--kiro-purple-600);">github.com/kirodotdev/spirit-of-kiro</a>
                </div>

                <div class="info-item">
                    <strong>Kiro Community</strong>
                    <p>Connect with other Kiro users and share your projects.</p>
                    <a href="https://discord.gg/kiro" style="color: var(--kiro-purple-600);">discord.gg/kiro</a>
                </div>
            `)}

            <div style="text-align: center; padding: 20px 0; margin-top: 16px; border-top: 1px solid var(--kiro-border-subtle);">
                <p style="font-size: 12px; color: var(--vscode-descriptionForeground); margin-bottom: 12px;">
                    Thank you for learning with Kiro!
                </p>
                <p style="font-size: 11px; color: var(--vscode-descriptionForeground); opacity: 0.7;">
                    Built with 💜 by the Kiro team
                </p>
            </div>
        `,
        actions: []
    };
}
