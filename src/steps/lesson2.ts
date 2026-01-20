/**
 * Lesson 2: Improve Game Homepage
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getLesson2Homepage(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Lesson 2: Improve Game Homepage',
        content: `
            ${ctx.getEnhancedLessonBadge(2, 9, 'Improve Game Homepage')}

            <p>Use Kiro to enhance the game homepage through "vibe coding" - creative, experimental AI prompting.</p>

            ${ctx.getCollapsibleSection('l2-view', 1, 'View Current Homepage', `
                <p>Load the game homepage in your browser to see what we're working with:</p>

                <button class="action-btn browser" onclick="openUrl('http://localhost:5173')">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    Open Homepage (localhost:5173)
                </button>

                <p style="margin-top: 12px;">The homepage is quite minimalist - it lacks:</p>
                <ul>
                    <li>Compelling graphics</li>
                    <li>Game explanations</li>
                    <li>Marketing copy</li>
                </ul>

                <div class="warning-box">
                    <strong>Prerequisite:</strong> Make sure your game stack is running from Lesson 1.
                </div>
            `)}

            ${ctx.getCollapsibleSection('l2-steering', 2, 'Setup Steering Files', `
                <p>Steering files help Kiro understand your project context. Open the command palette and run:</p>

                ${ctx.getCodeBlockWithCopy('Kiro: Generate project steering documents')}

                <button class="action-btn" onclick="vscode.postMessage({type: 'executeCommand', command: 'workbench.action.showCommands'})">
                    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m9 12 2 2 4-4"/></svg>
                    Open Command Palette (Cmd/Ctrl+Shift+P)
                </button>

                <p style="margin-top: 12px;">This creates files in <code>.kiro/</code>:</p>
                <ul>
                    <li><strong>product.md</strong> - Project description</li>
                    <li><strong>tech.md</strong> - Technology stack</li>
                    <li><strong>structure.md</strong> - Folder organization</li>
                </ul>
            `)}

            ${ctx.getCollapsibleSection('l2-improve', 3, 'Improve the Homepage', `
                <p>Now let's use Kiro to improve the homepage:</p>

                <button class="prompt-button" onclick="executePrompt('I want you to make my homepage better. Add compelling graphics, game explanations, and make it visually appealing.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "I want you to make my homepage better..."
                    </div>
                </button>

                <p>Watch as Kiro modifies files - Vite's hot reload will show changes instantly!</p>
            `)}

            ${ctx.getCollapsibleSection('l2-creative', 4, 'Get Creative!', `
                <p>Try different themes and styles:</p>

                <button class="prompt-button" onclick="executePrompt('Give me 20 potential themes for a game landing page')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Give me 20 potential themes..."
                    </div>
                </button>

                <button class="prompt-button" onclick="executePrompt('Reimagine the homepage in Amazon product marketing style with clear CTAs and customer focus')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Reimagine in Amazon style..."
                    </div>
                </button>

                <div class="tip-box">
                    <strong>Key Learning:</strong> Steering files guide AI effectively, and AI's creative capabilities reduce experimentation barriers.
                </div>
            `)}
        `,
        actions: []
    };
}
