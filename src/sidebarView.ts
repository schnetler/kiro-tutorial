import * as vscode from 'vscode';
import { getStyles } from './styles';
import { HelperState } from './types';
import {
    getCollapsibleSection,
    getEnhancedLessonBadge,
    getInteractiveTimeline,
    getValidationItem,
    getAwsProfileInput,
    getCodeBlockWithCopy
} from './helpers';
import { getAllSteps, StepGeneratorContext } from './steps';

export class TutorialViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'kiro-tutorial.sidebarView';
    private _view?: vscode.WebviewView;
    private _currentStep: number = 0;
    private _completedSteps: Set<number> = new Set();
    private _clickedButtons: Map<number, Set<number>> = new Map(); // Map of step -> Set of clicked button indices
    private _lessonSubSteps: Map<number, number> = new Map(); // Map of lesson step index -> current sub-step
    private _expandedSections: Set<string> = new Set(); // Track which collapsible sections are expanded
    private _validationResults: Map<string, boolean | null> = new Map(); // Track validation check results
    private _validationInProgress: Set<string> = new Set(); // Track which validations are running
    private _awsProfile: string = 'default'; // AWS profile name
    private _awsRegion: string = 'us-east-1'; // AWS region
    private _containerRuntime: 'podman' | 'docker' = 'podman'; // Which container runtime to use
    private _terminal?: vscode.Terminal; // Reusable terminal
    private _fileWatcher?: vscode.FileSystemWatcher;

    constructor(private readonly _extensionUri: vscode.Uri) {
        // Watch for spec file changes
        this._fileWatcher = vscode.workspace.createFileSystemWatcher('**/.kiro/**/*.md');
        this._fileWatcher.onDidCreate(() => this._updateView());
        this._fileWatcher.onDidChange(() => this._updateView());
        this._fileWatcher.onDidDelete(() => this._updateView());
    }

    public dispose() {
        this._fileWatcher?.dispose();
        this._terminal?.dispose();
    }

    // ==================== TEST INTERFACE ====================
    // These methods expose internal state and command generation for testing
    // They should only be used in test files

    /** Get the current AWS profile (for testing) */
    public get awsProfile(): string { return this._awsProfile; }

    /** Get the current AWS region (for testing) */
    public get awsRegion(): string { return this._awsRegion; }

    /** Get the current container runtime (for testing) */
    public get containerRuntime(): 'podman' | 'docker' { return this._containerRuntime; }

    /** Get validation results (for testing) */
    public get validationResults(): Map<string, boolean | null> { return new Map(this._validationResults); }

    /** Set AWS profile (for testing) */
    public setAwsProfileForTest(profile: string): void { this._awsProfile = profile; }

    /** Set AWS region (for testing) */
    public setAwsRegionForTest(region: string): void { this._awsRegion = region; }

    /** Set container runtime (for testing) */
    public setContainerRuntimeForTest(runtime: 'podman' | 'docker'): void { this._containerRuntime = runtime; }

    /**
     * Generate all Lesson 1 commands based on current state (for testing)
     * Returns the exact commands that would be executed
     */
    public generateLesson1Commands(): {
        clone: string;
        dependencyCheck: string;
        deployCognito: string;
        disableEmailVerification: string;
        buildAndLaunch: string;
        bootstrapDatabase: string;
        testServer: string;
    } {
        return {
            clone: 'git clone git@github.com:kirodotdev/spirit-of-kiro.git && cd spirit-of-kiro && git checkout challenge',
            dependencyCheck: `AWS_PROFILE=${this._awsProfile} ./scripts/check-dependencies.sh`,
            deployCognito: `AWS_PROFILE=${this._awsProfile} AWS_REGION=${this._awsRegion} ./scripts/deploy-cognito.sh game-auth`,
            disableEmailVerification: `source dev.env && AWS_PROFILE=${this._awsProfile} aws cognito-idp update-user-pool --user-pool-id $COGNITO_USER_POOL_ID --region ${this._awsRegion} --auto-verified-attributes email`,
            buildAndLaunch: `${this._containerRuntime} compose build && ${this._containerRuntime} compose up --watch --remove-orphans --timeout 0 --force-recreate`,
            bootstrapDatabase: `cd spirit-of-kiro && ${this._containerRuntime} exec server mkdir -p /app/server/iac && ${this._containerRuntime} cp scripts/bootstrap-local-dynamodb.js server:/app/ && ${this._containerRuntime} cp server/iac/dynamodb.yml server:/app/server/iac/ && ${this._containerRuntime} exec server bun run /app/bootstrap-local-dynamodb.js`,
            testServer: 'curl localhost:8080'
        };
    }

    /**
     * Get the validation commands that are executed (for testing)
     */
    public getValidationCommands(): {
        git: string;
        docker: string;
        podman: string;
        aws: string;
        awsProfile: string;
    } {
        return {
            git: 'git --version',
            docker: 'docker info',
            podman: 'podman info',
            aws: 'aws --version',
            awsProfile: `aws sts get-caller-identity --profile ${this._awsProfile}`
        };
    }

    /**
     * Generate all Lesson 2 data for testing
     * Lesson 2 is primarily UI/prompt based, so we return URLs and prompts
     */
    public generateLesson2Data(): {
        homepageUrl: string;
        serverUrl: string;
        steeringCommand: string;
        steeringFiles: string[];
        prompts: {
            improve: string;
            themes: string;
            amazonStyle: string;
            carousel: string;
        };
    } {
        return {
            homepageUrl: 'http://localhost:5173',
            serverUrl: 'http://localhost:8080',
            steeringCommand: 'Kiro: Generate project steering documents',
            steeringFiles: [
                '.kiro/product.md',
                '.kiro/tech.md',
                '.kiro/structure.md'
            ],
            prompts: {
                improve: 'I want you to make my homepage better. Add compelling graphics, game explanations, and make it visually appealing.',
                themes: 'Give me 20 potential themes for a game landing page',
                amazonStyle: 'Reimagine the homepage in Amazon product marketing style with clear CTAs and customer focus',
                carousel: 'Add a carousel, customer quotes, and smooth animations to the homepage'
            }
        };
    }

    /**
     * Simulate a message from the webview (for testing)
     */
    public async handleMessageForTest(data: { type: string; [key: string]: any }): Promise<void> {
        switch (data.type) {
            case 'setAwsProfile':
                this._awsProfile = data.profile || 'default';
                this._validationResults.delete('aws-profile');
                break;
            case 'setAwsRegion':
                this._awsRegion = data.region || 'us-east-1';
                break;
            case 'toggleSection':
                if (this._expandedSections.has(data.sectionId)) {
                    this._expandedSections.delete(data.sectionId);
                } else {
                    this._expandedSections.add(data.sectionId);
                }
                break;
            case 'runValidation':
                await this._runValidation(data.check);
                break;
        }
    }

    // ==================== END TEST INTERFACE ====================

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        this._getHtmlForWebviewAsync(webviewView.webview).then(html => {
            webviewView.webview.html = html;
        });

        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(data => {
            switch (data.type) {
                case 'gotoStep':
                    // Mark steps 0, 1 and 4 as complete when navigating away from them
                    if ((this._currentStep === 0 || this._currentStep === 1 || this._currentStep === 4) && data.step > this._currentStep) {
                        this._completedSteps.add(this._currentStep);
                    }
                    this._currentStep = data.step;
                    this._updateView();
                    break;
                case 'executeCommand':
                    // Track which button was clicked
                    if (data.buttonIndex !== undefined) {
                        if (!this._clickedButtons.has(this._currentStep)) {
                            this._clickedButtons.set(this._currentStep, new Set());
                        }
                        this._clickedButtons.get(this._currentStep)?.add(data.buttonIndex);
                    }

                    vscode.commands.executeCommand(data.command);
                    if (data.markComplete) {
                        this._completedSteps.add(this._currentStep);
                        // Auto-progress on spec steps (2-5)
                        if (this._currentStep >= 2 && this._currentStep <= 5) {
                            this._currentStep++;
                        }
                    }
                    this._updateView();
                    break;
                case 'markComplete':
                    // Track the completion button click
                    if (data.buttonIndex !== undefined) {
                        if (!this._clickedButtons.has(this._currentStep)) {
                            this._clickedButtons.set(this._currentStep, new Set());
                        }
                        this._clickedButtons.get(this._currentStep)?.add(data.buttonIndex);
                    }

                    this._completedSteps.add(this._currentStep);

                    // On step 1 (Chat Mode), also navigate to next step
                    if (this._currentStep === 1) {
                        this._currentStep = 2;
                    }

                    this._updateView();
                    break;
                case 'nextSubStep':
                    {
                        const currentSubStep = this._lessonSubSteps.get(this._currentStep) || 0;
                        this._lessonSubSteps.set(this._currentStep, currentSubStep + 1);
                        this._updateView();
                    }
                    break;
                case 'prevSubStep':
                    {
                        const currentSubStep = this._lessonSubSteps.get(this._currentStep) || 0;
                        if (currentSubStep > 0) {
                            this._lessonSubSteps.set(this._currentStep, currentSubStep - 1);
                        }
                        this._updateView();
                    }
                    break;
                case 'executePrompt':
                    vscode.commands.executeCommand('kiro-tutorial.executePrompt', data.prompt);
                    break;
                case 'toggleSection':
                    // Just persist state, don't re-render (toggle is handled client-side)
                    if (this._expandedSections.has(data.sectionId)) {
                        this._expandedSections.delete(data.sectionId);
                    } else {
                        // Accordion: clear all other sections, keep only the new one
                        this._expandedSections.clear();
                        this._expandedSections.add(data.sectionId);
                    }
                    break;
                case 'runValidation':
                    this._runValidation(data.check);
                    break;
                case 'openUrl':
                    vscode.env.openExternal(vscode.Uri.parse(data.url));
                    break;
                case 'runTerminalCommand':
                    // Reuse existing terminal or create new one (unless newTerminal is requested)
                    if (data.newTerminal || !this._terminal || this._terminal.exitStatus !== undefined) {
                        const terminalName = data.newTerminal ? 'Kiro Tutorial 2' : 'Kiro Tutorial';
                        this._terminal = vscode.window.createTerminal(terminalName);
                    }
                    this._terminal.show();
                    this._terminal.sendText(data.command);
                    break;
                case 'copyToClipboard':
                    vscode.env.clipboard.writeText(data.text);
                    vscode.window.showInformationMessage('Copied to clipboard!');
                    break;
                case 'setAwsProfile':
                    this._awsProfile = data.profile || 'default';
                    // Clear the aws-profile validation when profile changes
                    this._validationResults.delete('aws-profile');
                    this._updateView();
                    break;
                case 'setAwsRegion':
                    this._awsRegion = data.region || 'us-east-1';
                    this._updateView();
                    break;
                case 'navigateToStep':
                    // Navigate to a specific step (used by interactive timeline)
                    if (data.step >= 0 && data.step <= 24) {
                        this._currentStep = data.step;
                        this._updateView();
                    }
                    break;
            }
        });
    }

    private async _runValidation(check: string) {
        // Mark as in progress and update view
        this._validationInProgress.add(check);
        this._updateView();

        // Run validation check and update state
        const exec = require('child_process').exec;
        const runCheck = (cmd: string): Promise<boolean> => {
            return new Promise((resolve) => {
                exec(cmd, (error: any) => {
                    resolve(!error);
                });
            });
        };

        let result = false;
        switch (check) {
            case 'git':
                result = await runCheck('git --version');
                break;
            case 'node':
                result = await runCheck('node --version');
                break;
            case 'docker':
                // Check if docker/podman daemon is actually running and track which one
                const dockerRunning = await runCheck('docker info');
                const podmanRunning = await runCheck('podman info');
                if (podmanRunning) {
                    this._containerRuntime = 'podman';
                    result = true;
                } else if (dockerRunning) {
                    this._containerRuntime = 'docker';
                    result = true;
                } else {
                    result = false;
                }
                break;
            case 'aws':
                // Just check if AWS CLI is installed
                result = await runCheck('aws --version');
                break;
            case 'aws-profile':
                // Check if the specified AWS profile has valid credentials
                result = await runCheck(`aws sts get-caller-identity --profile ${this._awsProfile}`);
                break;
            case 'podman':
                // Check if podman machine is running
                result = await runCheck('podman info');
                break;
        }

        this._validationResults.set(check, result);
        this._validationInProgress.delete(check);
        this._updateView();

        if (result) {
            vscode.window.showInformationMessage(`${check} is installed and available.`);
        } else {
            vscode.window.showWarningMessage(`${check} is not installed or not in PATH.`);
        }
    }

    private async _updateView() {
        if (this._view) {
            this._view.webview.html = await this._getHtmlForWebviewAsync(this._view.webview);
        }
    }

    private async _checkFileExists(pattern: string): Promise<boolean> {
        const files = await vscode.workspace.findFiles(pattern, null, 1);
        return files.length > 0;
    }

    /** Create helper state from current class properties */
    private _getHelperState(): HelperState {
        return {
            expandedSections: this._expandedSections,
            completedSteps: this._completedSteps,
            currentStep: this._currentStep,
            validationResults: this._validationResults,
            validationInProgress: this._validationInProgress,
            awsProfile: this._awsProfile,
            awsRegion: this._awsRegion,
            containerRuntime: this._containerRuntime
        };
    }

    /** Create step generator context with bound helper functions */
    private _getStepContext(): StepGeneratorContext {
        const state = this._getHelperState();
        return {
            getCollapsibleSection: (id, num, title, content, status, defaultExpanded) =>
                getCollapsibleSection(state, id, num, title, content, status, defaultExpanded),
            getEnhancedLessonBadge: (currentLesson, totalLessons, title) =>
                getEnhancedLessonBadge(state, currentLesson, totalLessons, title),
            getInteractiveTimeline: () => getInteractiveTimeline(state),
            getValidationItem: (name, checkId, desc, url) =>
                getValidationItem(state, name, checkId, desc, url),
            getAwsProfileInput: () => getAwsProfileInput(state),
            getCodeBlockWithCopy: (code) => getCodeBlockWithCopy(code),
            awsProfile: this._awsProfile,
            awsRegion: this._awsRegion,
            containerRuntime: this._containerRuntime
        };
    }

    private async _getHtmlForWebviewAsync(webview: vscode.Webview): Promise<string> {
        const steps = getAllSteps(this._getStepContext());
        const currentStep = steps[this._currentStep];

        // Check which spec files exist
        const requirementsFiles = await vscode.workspace.findFiles('**/.kiro/**/requirements.md', null, 1);
        const designFiles = await vscode.workspace.findFiles('**/.kiro/**/design.md', null, 1);
        const tasksFiles = await vscode.workspace.findFiles('**/.kiro/**/tasks.md', null, 1);

        const requirementsExists = requirementsFiles.length > 0;
        const designExists = designFiles.length > 0;
        const tasksExists = tasksFiles.length > 0;

        // Check if requirements.md has at least 20 lines
        let requirementsHasEnoughLines = false;
        if (requirementsExists && requirementsFiles.length > 0) {
            try {
                const requirementsContent = await vscode.workspace.fs.readFile(requirementsFiles[0]);
                const textContent = Buffer.from(requirementsContent).toString('utf8');
                const lineCount = textContent.split('\n').length;
                requirementsHasEnoughLines = lineCount >= 20;
            } catch (error) {
                requirementsHasEnoughLines = false;
            }
        }

        // Check if design.md has at least 20 lines
        let designHasEnoughLines = false;
        if (designExists && designFiles.length > 0) {
            try {
                const designContent = await vscode.workspace.fs.readFile(designFiles[0]);
                const textContent = Buffer.from(designContent).toString('utf8');
                const lineCount = textContent.split('\n').length;
                designHasEnoughLines = lineCount >= 20;
            } catch (error) {
                // If we can't read the file, treat it as not having enough lines
                designHasEnoughLines = false;
            }
        }

        // Check Spirit of Kiro prerequisites
        let dockerInstalled = false;
        let awsConfigured = false;
        let gitInstalled = false;
        let nodeInstalled = false;
        let spiritRepoCloned = false;

        // Check if Spirit of Kiro repo is cloned
        const spiritRepoFiles = await vscode.workspace.findFiles('**/spirit-of-kiro/package.json', null, 1);
        spiritRepoCloned = spiritRepoFiles.length > 0;

        // Note: We'll set these to true for now - the actual checks will be performed
        // by command handlers when user clicks prerequisite check buttons
        // These flags are more for tracking completion status
        dockerInstalled = true;
        awsConfigured = true;
        gitInstalled = true;
        nodeInstalled = true;

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src https://kiro.dev https://*.kiro.dev; media-src https://kiro.dev https://*.kiro.dev; connect-src https://kiro.dev https://*.kiro.dev;">
    <title>Kiro Tutorial</title>
    <style>
        ${getStyles()}
    </style>
</head>
<body>
    <div class="header">
        <h1>Kiro Tutorial</h1>
        <div class="progress-text">Step ${this._currentStep + 1} of ${steps.length}: ${currentStep.title}</div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${((this._currentStep + 1) / steps.length) * 100}%"></div>
        </div>
        <div class="steps-nav-container">
            <div class="steps-section">
                <div class="section-label">Basics</div>
                <div class="steps-nav">
                    ${steps.slice(0, 6).map((step, index) => `
                        <button
                            class="step-dot ${index === this._currentStep ? 'active' : ''} ${this._completedSteps.has(index) ? 'completed' : ''}"
                            onclick="gotoStep(${index})"
                            title="${step.title}"
                        >${this._completedSteps.has(index) ? '' : index + 1}</button>
                    `).join('')}
                </div>
            </div>
            <div class="steps-section">
                <div class="section-label">Advanced</div>
                <div class="steps-nav">
                    ${steps.slice(6, 15).map((step, index) => `
                        <button
                            class="step-dot ${index + 6 === this._currentStep ? 'active' : ''} ${this._completedSteps.has(index + 6) ? 'completed' : ''}"
                            onclick="gotoStep(${index + 6})"
                            title="${step.title}"
                        >${this._completedSteps.has(index + 6) ? '' : index + 1}</button>
                    `).join('')}
                </div>
            </div>
            <div class="steps-section">
                <div class="section-label">Features</div>
                <div class="steps-nav">
                    ${steps.slice(15).map((step, index) => `
                        <button
                            class="step-dot ${index + 15 === this._currentStep ? 'active' : ''} ${this._completedSteps.has(index + 15) ? 'completed' : ''}"
                            onclick="gotoStep(${index + 15})"
                            title="${step.title}"
                        >${this._completedSteps.has(index + 15) ? '' : index + 1}</button>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>

    <div class="content">
        <div class="step-title">${currentStep.title}</div>
        <div class="step-content">
            ${currentStep.content}
        </div>

        ${currentStep.actions ? `
            <div class="action-buttons">
                ${currentStep.actions.map((action, index) => {
                    const isClicked = this._clickedButtons.get(this._currentStep)?.has(index) || false;
                    const clickedClass = isClicked ? ' clicked' : '';

                    // Check if button should be locked based on prerequisites
                    const requiresFile = (action as any).requiresFile;
                    let isLocked = false;

                    // For Part 2, check file prerequisites
                    if (requiresFile === 'requirements') {
                        isLocked = !requirementsExists;
                    } else if (requiresFile === 'requirementsComplete') {
                        // Requires requirements.md to exist AND have at least 20 lines
                        isLocked = !requirementsExists || !requirementsHasEnoughLines;
                    } else if (requiresFile === 'design') {
                        isLocked = !designExists;
                    } else if (requiresFile === 'designComplete') {
                        // Requires design.md to exist AND have at least 20 lines
                        isLocked = !designExists || !designHasEnoughLines;
                    } else if (requiresFile === 'tasks') {
                        isLocked = !tasksExists;
                    } else if (requiresFile === 'spiritRepoCloned') {
                        // For Spirit lessons, require repo to be cloned
                        isLocked = !spiritRepoCloned;
                    }

                    const lockedClass = isLocked ? ' locked' : '';
                    const disabled = isLocked ? ' disabled' : '';

                    let buttonHtml = '';
                    if (action.command) {
                        buttonHtml = `
                            <button class="${clickedClass}${lockedClass}" onclick="executeCommand('${action.command}', ${action.markComplete || false}, ${index})"${disabled}>
                                <span class="icon">${action.icon}</span>
                                <span>${action.label}</span>
                            </button>
                        `;
                    } else {
                        // Button that just marks complete without executing a command
                        buttonHtml = `
                            <button class="secondary${clickedClass}${lockedClass}" onclick="markComplete(${index})"${disabled}>
                                <span class="icon">${action.icon}</span>
                                <span>${action.label}</span>
                            </button>
                        `;
                    }

                    // Add arrow after button if there's a next action and current action has showArrow property
                    const showArrow = (action as any).showArrow;
                    if (showArrow && index < currentStep.actions.length - 1) {
                        buttonHtml += '<div class="flow-arrow">↓</div>';
                    }

                    return buttonHtml;
                }).join('')}
            </div>
        ` : ''}
    </div>

    ${this._currentStep < 1 || this._currentStep > 5 ? `
    <div class="navigation">
        <button
            class="secondary"
            onclick="gotoStep(${this._currentStep - 1})"
            ${this._currentStep === 0 ? 'disabled' : ''}
        >← Previous</button>
        <button
            onclick="gotoStep(${this._currentStep + 1})"
            ${this._currentStep === steps.length - 1 ? 'disabled' : ''}
        >Next →</button>
    </div>
    ` : ''}

    <script>
        const vscode = acquireVsCodeApi();

        function gotoStep(step) {
            vscode.postMessage({ type: 'gotoStep', step: step });
        }

        function executeCommand(command, markComplete, buttonIndex) {
            vscode.postMessage({
                type: 'executeCommand',
                command: command,
                markComplete: markComplete,
                buttonIndex: buttonIndex
            });
        }

        function markComplete(buttonIndex) {
            vscode.postMessage({
                type: 'markComplete',
                buttonIndex: buttonIndex
            });
        }

        function nextSubStep() {
            vscode.postMessage({ type: 'nextSubStep' });
        }

        function prevSubStep() {
            vscode.postMessage({ type: 'prevSubStep' });
        }

        function executePrompt(prompt) {
            vscode.postMessage({ type: 'executePrompt', prompt: prompt });
        }

        function toggleSection(sectionId) {
            // Toggle client-side immediately (no server round-trip)
            const header = document.querySelector(\`[onclick="toggleSection('\${sectionId}')"]\`);
            if (header) {
                const section = header.closest('.collapsible-section');
                if (section) {
                    const isExpanding = !section.classList.contains('expanded');

                    // Accordion: collapse all other sections first
                    if (isExpanding) {
                        document.querySelectorAll('.collapsible-section.expanded').forEach(s => {
                            if (s !== section) {
                                s.classList.remove('expanded');
                                // Get the section id from the onclick attribute and notify extension
                                const otherHeader = s.querySelector('.collapsible-header');
                                if (otherHeader) {
                                    const onclick = otherHeader.getAttribute('onclick');
                                    const match = onclick && onclick.match(/toggleSection\\('([^']+)'\\)/);
                                    if (match) {
                                        vscode.postMessage({ type: 'toggleSection', sectionId: match[1] });
                                    }
                                }
                            }
                        });
                    }

                    section.classList.toggle('expanded');
                }
            }
            // Persist state to extension (but don't re-render)
            vscode.postMessage({ type: 'toggleSection', sectionId: sectionId });
        }

        function runValidation(check) {
            vscode.postMessage({ type: 'runValidation', check: check });
        }

        function openUrl(url) {
            vscode.postMessage({ type: 'openUrl', url: url });
        }

        function runTerminalCommand(command, newTerminal) {
            vscode.postMessage({ type: 'runTerminalCommand', command: command, newTerminal: newTerminal });
        }

        function copyToClipboard(text) {
            vscode.postMessage({ type: 'copyToClipboard', text: text });
        }

        function setAwsProfile(profile) {
            vscode.postMessage({ type: 'setAwsProfile', profile: profile });
        }

        function setAwsRegion(region) {
            vscode.postMessage({ type: 'setAwsRegion', region: region });
        }

        function navigateToStep(step) {
            vscode.postMessage({ type: 'navigateToStep', step: step });
        }
    </script>
</body>
</html>`;
    }
}
