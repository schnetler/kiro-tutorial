/**
 * Basic tutorial steps (0-6): Welcome, Chat Mode, Specs Overview, Requirements, Design, Tasks, Spirit Intro
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

/** Step 0: Welcome */
export function getStep0Welcome(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Welcome to Kiro',
        content: `
            <div class="lesson-badge">
                <div class="badge-number">👋</div>
                <div class="badge-text">Getting Started</div>
            </div>

            <p>Learn Kiro by building real projects. Complete each section to understand how Kiro helps you do your best work.</p>

            ${ctx.getCollapsibleSection('welcome-intro', 1, 'What is Kiro?', `
                <p>Kiro is an agentic IDE that helps you build through natural conversation with AI and structured specifications.</p>

                <video controls playsinline autoplay muted loop style="width: 100%; border-radius: 8px; margin: 12px 0;">
                    <source src="https://kiro.dev/videos/kiro_1.mp4?h=dd456d14" type="video/mp4">
                    Your browser does not support the video tag.
                </video>

                <div class="tip-box">
                    <strong>Two ways to build:</strong> Chat mode for quick iteration, Specs mode for structured planning.
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('welcome-journey', 2, 'Your Learning Journey', `
                <p>This tutorial has three parts:</p>

                <div class="info-item">
                    <strong>Part 1: Chat Mode</strong>
                    <p>Build a todo app through natural conversation. Quick and intuitive.</p>
                </div>

                <div class="info-item">
                    <strong>Part 2: Spec-Driven Development</strong>
                    <p>Build the same app with structured planning. See how specs change the experience.</p>
                </div>

                <div class="info-item">
                    <strong>Part 3: Spirit of Kiro (Advanced)</strong>
                    <p>Level up with real game development. 9 hands-on lessons.</p>
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('welcome-start', 3, 'Ready to Begin?', `
                <p>Click <strong>Next</strong> below to start building with Chat Mode.</p>

                <div class="tip-box">
                    <strong>Tip:</strong> You can use the step navigation above to jump between sections anytime.
                </div>
            `, null, true)}
        `,
        actions: []
    };
}

/** Step 1: Chat Mode */
export function getStep1ChatMode(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Part 1: Chat Mode',
        content: `
            <div class="lesson-badge">
                <div class="badge-number">1</div>
                <div class="badge-text">Part 1 of 3</div>
            </div>

            <p>Build a todo app through natural conversation. Just describe what you want and iterate quickly.</p>

            ${ctx.getCollapsibleSection('chat-overview', 1, 'How Chat Mode Works', `
                <p>Chat mode lets you build by describing what you want in natural language.</p>

                <video controls playsinline autoplay muted loop style="width: 100%; border-radius: 8px; margin: 12px 0;">
                    <source src="https://kiro.dev/videos/kiro_1.mp4?h=dd456d14" type="video/mp4">
                    Your browser does not support the video tag.
                </video>

                <div class="tip-box">
                    <strong>Tip:</strong> Press <code>Cmd+L</code> to open chat anytime. Use <code>#</code> to reference files.
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('chat-build', 2, 'Build Your Todo App', `
                <p>You'll build a simple todo app with these features:</p>
                <ul>
                    <li>Add, complete, and delete todos</li>
                    <li>Persist data with localStorage</li>
                    <li>Vanilla HTML/CSS/JS</li>
                </ul>

                <button class="action-btn" onclick="executeCommand('kiro-tutorial.startVibeSession', false, 0)">
                    <svg viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                    Start Building with Chat
                </button>
            `, null, true)}

            ${ctx.getCollapsibleSection('chat-test', 3, 'Test & Complete', `
                <p>Once you've built your app:</p>
                <ol>
                    <li>Open <code>index.html</code> in a browser</li>
                    <li>Add a few todos and mark them complete</li>
                    <li>Refresh the page to verify persistence</li>
                </ol>

                <div class="tip-box">
                    <strong>Done?</strong> Click the button below to mark this section complete and continue to Specs mode.
                </div>
            `, null, true)}
        `,
        actions: [
            {
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
                label: 'Done! Continue to Specs Mode',
                markComplete: true
            }
        ]
    };
}

/** Step 2: Specs Overview */
export function getStep2SpecsOverview(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Part 2: Specs Overview',
        content: `
            <div class="lesson-badge">
                <div class="badge-number">2</div>
                <div class="badge-text">Part 2 of 3</div>
            </div>

            <p>Now build the <strong>same todo app</strong> using specs. See how structured planning changes the experience.</p>

            ${ctx.getCollapsibleSection('specs-flow', 1, 'The Specs Workflow', `
                <p>Specs follow a three-step flow:</p>

                <div class="info-item">
                    <strong>1. Requirements</strong>
                    <p>Define <em>what</em> to build with user stories and acceptance criteria.</p>
                </div>

                <div class="info-item">
                    <strong>2. Design</strong>
                    <p>Plan <em>how</em> to build it with architecture and technical decisions.</p>
                </div>

                <div class="info-item">
                    <strong>3. Tasks</strong>
                    <p>Break it into trackable implementation steps.</p>
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('specs-why', 2, 'Why Use Specs?', `
                <ul>
                    <li><strong>Complex features</strong> need upfront thinking</li>
                    <li><strong>Better accuracy</strong> - Kiro implements more precisely with clear specs</li>
                    <li><strong>You stay in control</strong> of architecture decisions</li>
                </ul>

                <div class="tip-box">
                    <strong>Best for:</strong> Features that touch multiple files, need architectural decisions, or require careful planning.
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('specs-files', 3, 'Files Created', `
                <p>Specs live in <code>.kiro/specs/your-spec/</code>:</p>

                <ul>
                    <li><code>requirements.md</code> - User stories & acceptance criteria</li>
                    <li><code>design.md</code> - Architecture & technical decisions</li>
                    <li><code>tasks.md</code> - Trackable implementation steps</li>
                </ul>

                <button class="action-btn" onclick="executeCommand('kiro-tutorial.startSpecCreation', true, 0)">
                    <svg viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                    Start Spec Creation
                </button>
            `, null, true)}
        `,
        actions: []
    };
}

/** Step 3: Requirements */
export function getStep3Requirements(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Part 2: Requirements',
        content: `
            <div class="lesson-badge">
                <div class="badge-number">2</div>
                <div class="badge-text">Part 2 of 3</div>
            </div>

            <p>Kiro creates requirements as user stories with acceptance criteria. Review and refine them before continuing.</p>

            ${ctx.getCollapsibleSection('req-ears', 1, 'EARS Notation', `
                <p>Requirements use <strong>EARS notation</strong> - the way you wish your PM would write requirements!</p>

                ${ctx.getCodeBlockWithCopy('WHEN [condition/event]\\nTHE SYSTEM SHALL [expected behavior]')}

                <p style="margin-top: 12px;"><strong>Example:</strong></p>
                <div class="code-block" style="white-space: pre-wrap;">WHEN a user submits a form with invalid data
THE SYSTEM SHALL display validation errors next to the relevant fields</div>
            `, null, true)}

            ${ctx.getCollapsibleSection('req-why', 2, 'Why EARS?', `
                <ul>
                    <li><strong>Clarity</strong> - Unambiguous and easy to understand</li>
                    <li><strong>Testability</strong> - Directly translates into test cases</li>
                    <li><strong>Traceability</strong> - Track requirements through implementation</li>
                </ul>
            `, null, true)}

            ${ctx.getCollapsibleSection('req-review', 3, 'Review & Continue', `
                <p>Review the generated requirements. Edit them if needed - you're in control!</p>

                <button class="action-btn" onclick="executeCommand('kiro-tutorial.openRequirementsFile', false, 0)">
                    <svg viewBox="0 0 24 24"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
                    Review Requirements
                </button>

                <div class="tip-box" style="margin-top: 12px;">
                    <strong>Ready?</strong> Click Continue to Design when you're happy with the requirements.
                </div>

                <button class="action-btn" onclick="executeCommand('kiro-tutorial.continueToDesign', true, 1)" style="margin-top: 8px;">
                    <svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    Continue to Design
                </button>
            `, null, true)}
        `,
        actions: []
    };
}

/** Step 4: Design */
export function getStep4Design(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Part 2: Design',
        content: `
            <div class="lesson-badge">
                <div class="badge-number">2</div>
                <div class="badge-text">Part 2 of 3</div>
            </div>

            <p>Kiro generates technical architecture from your requirements. This defines <strong>how</strong> to build it.</p>

            ${ctx.getCollapsibleSection('design-overview', 1, 'Technical Design', `
                <p>The design document captures architecture decisions before implementation.</p>

                <img src="https://kiro.dev/videos/specs-design.gif" alt="Design documentation" style="width: 100%; border-radius: 8px; margin: 12px 0; border: 1px solid var(--vscode-widget-border);">
            `, null, true)}

            ${ctx.getCollapsibleSection('design-contents', 2, "What's in design.md", `
                <ul>
                    <li><strong>Architecture</strong> - System structure and components</li>
                    <li><strong>Data flow</strong> - How data moves through the system</li>
                    <li><strong>Technical decisions</strong> - Technologies and patterns to use</li>
                </ul>

                <div class="tip-box">
                    <strong>This is your chance</strong> to shape the architecture before any code is written.
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('design-review', 3, 'Review & Continue', `
                <p>Review the generated design. Edit if needed - you control the architecture!</p>

                <button class="action-btn" onclick="executeCommand('kiro-tutorial.openDesignFile', false, 0)">
                    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                    Review Design
                </button>

                <button class="action-btn" onclick="executeCommand('kiro-tutorial.continueToTasks', true, 1)" style="margin-top: 8px;">
                    <svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    Continue to Tasks
                </button>
            `, null, true)}
        `,
        actions: []
    };
}

/** Step 5: Tasks & Build */
export function getStep5Tasks(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Part 2: Tasks & Build',
        content: `
            <div class="lesson-badge">
                <div class="badge-number">2</div>
                <div class="badge-text">Part 2 of 3</div>
            </div>

            <p>Design becomes a trackable task list. Kiro implements each task following your specs.</p>

            ${ctx.getCollapsibleSection('tasks-overview', 1, 'Implementation Tasks', `
                <p>Tasks break the design into discrete, implementable steps.</p>

                <img src="https://kiro.dev/videos/spec-task.gif" alt="Task execution" style="width: 100%; border-radius: 8px; margin: 12px 0; border: 1px solid var(--vscode-widget-border);">
            `, null, true)}

            ${ctx.getCollapsibleSection('tasks-contents', 2, "What's in tasks.md", `
                <ul>
                    <li><strong>Discrete tasks</strong> - Clear, implementable steps</li>
                    <li><strong>Acceptance criteria</strong> - How to verify each task</li>
                    <li><strong>Progress tracking</strong> - Check off as you go</li>
                </ul>
            `, null, true)}

            ${ctx.getCollapsibleSection('tasks-run', 3, 'Run Tasks & Test', `
                <p>Review the tasks, then run them to build your app.</p>

                <button class="action-btn" onclick="executeCommand('kiro-tutorial.openTasksFile', false, 0)">
                    <svg viewBox="0 0 24 24"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>
                    Review Tasks
                </button>

                <button class="action-btn" onclick="executeCommand('kiro-tutorial.startTaskExecution', false, 1)" style="margin-top: 8px;">
                    <svg viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                    Run Tasks
                </button>
            `, null, true)}

            ${ctx.getCollapsibleSection('tasks-complete', 4, 'Complete & Continue', `
                <p>Once your app is built and tested:</p>
                <ol>
                    <li>Open <code>index.html</code> in a browser</li>
                    <li>Test the todo functionality</li>
                    <li>Compare the experience to Chat Mode</li>
                </ol>

                <div class="tip-box">
                    <strong>Congratulations!</strong> You've completed the Basics. Ready for the Advanced section?
                </div>

                <button class="action-btn" onclick="markStepComplete()" style="margin-top: 8px;">
                    <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    Done! Continue to Advanced
                </button>
            `, null, true)}
        `,
        actions: []
    };
}

/** Step 6: Spirit of Kiro Intro */
export function getStep6SpiritIntro(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Part 3: Spirit of Kiro',
        content: `
            <img src="https://kiro.dev/images/video-game-guide/intro.png" alt="Spirit of Kiro" style="width: 100%; border-radius: 8px; margin-bottom: 16px;">

            <p>Ready for a bigger challenge? <strong>Spirit of Kiro</strong> is an infinite crafting game where items interact through AI-simulated actions. The game was 95% built using Kiro!</p>

            <img src="https://kiro.dev/images/video-game-guide/crafting.png" alt="Crafting mechanic" style="width: 100%; border-radius: 8px; margin: 16px 0; border: 1px solid var(--vscode-widget-border);">

            <h3>Your Learning Path</h3>
            <p style="font-size: 12px; color: var(--vscode-descriptionForeground); margin-bottom: 8px;">Click any lesson to jump directly to it</p>
            ${ctx.getInteractiveTimeline()}
        `,
        actions: [
            {
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
                label: 'Clone Spirit of Kiro Repository',
                command: 'kiro-tutorial.cloneSpiritRepo',
                markComplete: false
            },
            {
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
                label: 'Open Full Tutorial Guide',
                command: 'kiro-tutorial.openSpiritOfKiro',
                markComplete: false
            }
        ]
    };
}

/** Get all basic steps (0-6) */
export function getBasicSteps(ctx: StepGeneratorContext): TutorialStep[] {
    return [
        getStep0Welcome(ctx),
        getStep1ChatMode(ctx),
        getStep2SpecsOverview(ctx),
        getStep3Requirements(ctx),
        getStep4Design(ctx),
        getStep5Tasks(ctx),
        getStep6SpiritIntro(ctx)
    ];
}
