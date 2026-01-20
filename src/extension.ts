import * as vscode from 'vscode';
import * as path from 'path';
import { TutorialViewProvider } from './sidebarView';

export function activate(context: vscode.ExtensionContext) {
    console.log('Kiro Tutorial extension is now active');

    // Register the sidebar view provider
    const tutorialViewProvider = new TutorialViewProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            TutorialViewProvider.viewType,
            tutorialViewProvider
        )
    );

    // Command: Open Tutorial Panel (focuses the sidebar)
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.start', () => {
            vscode.commands.executeCommand('kiro-tutorial.sidebarView.focus');
        })
    );

    // Command: Create requirements.md
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.createRequirements', async () => {
            await createFileFromTemplate(context, 'requirements.md', 'requirements.md');
        })
    );

    // Command: Create design.md
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.createDesign', async () => {
            await createFileFromTemplate(context, 'design.md', 'design.md');
        })
    );

    // Command: Create tasks.md
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.createTasks', async () => {
            await createFileFromTemplate(context, 'tasks.md', 'tasks.md');
        })
    );

    // Command: Create hooks.json
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.createHooks', async () => {
            await createFileFromTemplate(context, '.kiro/hooks.json', 'hooks.json');
        })
    );

    // Command: Open requirements.md
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openRequirements', async () => {
            await openOrCreateFile(context, 'requirements.md', 'requirements.md');
        })
    );

    // Command: Open design.md
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openDesign', async () => {
            await openOrCreateFile(context, 'design.md', 'design.md');
        })
    );

    // Command: Open tasks.md
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openTasks', async () => {
            await openOrCreateFile(context, 'tasks.md', 'tasks.md');
        })
    );

    // Command: Create Example Project
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.createExampleProject', async () => {
            await createExampleProject(context);
        })
    );

    // Command: Show Workflow Diagram
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.showWorkflowDiagram', async () => {
            await showWorkflowDiagram(context);
        })
    );

    // Command: Start Kiro Chat Session (forces Chat mode)
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.startVibeSession', async () => {
            try {
                const chatPrompt = `I want to build a simple todo list application using Chat mode!

Let's create a web app with these features:
- Add new todos
- Mark todos as complete/incomplete
- Delete todos
- Persist todos using localStorage

Tech stack:
- Vanilla HTML/CSS/JavaScript (keep it simple!)
- No frameworks needed
- Modern ES6+ syntax

Let's start by creating the basic HTML structure and UI, then add the JavaScript functionality. Keep it clean and simple!

After creating the HTML file, please open it in the browser so I can see it working!`;

                // Use kiroAgent.agent.chatAgent to force Chat mode
                await vscode.commands.executeCommand('kiroAgent.agent.chatAgent', chatPrompt);
            } catch (error) {
                // Fallback to original method if chatAgent command fails
                try {
                    await vscode.commands.executeCommand('kiroAgent.continueGUIView.focus');
                    await new Promise(resolve => setTimeout(resolve, 300));
                    await vscode.commands.executeCommand('kiroAgent.newSession');
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const chatPrompt = `I want to build a simple todo list application using Chat mode!

Let's create a web app with these features:
- Add new todos
- Mark todos as complete/incomplete
- Delete todos
- Persist todos using localStorage

Tech stack:
- Vanilla HTML/CSS/JavaScript (keep it simple!)
- No frameworks needed
- Modern ES6+ syntax

Let's start by creating the basic HTML structure and UI, then add the JavaScript functionality. Keep it clean and simple!

After creating the HTML file, please open it in the browser so I can see it working!`;

                    await vscode.commands.executeCommand('kiroAgent.sendMainUserInput', chatPrompt);
                } catch {
                    // Silent fallback
                }
            }
        })
    );

    // Command: Start Kiro Spec Session
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.startSpecSession', async () => {
            try {
                // Open the chat view
                await vscode.commands.executeCommand('kiroAgent.continueGUIView.focus');
                await new Promise(resolve => setTimeout(resolve, 300));

                // Start a new session
                await vscode.commands.executeCommand('kiroAgent.newSession');
                await new Promise(resolve => setTimeout(resolve, 500));

                const specPrompt = `I want to build a todo list application using Spec mode with proper planning.

I have already created Requirements, Design, and Tasks in my workspace.

Please review these spec files and help me implement the todo app according to the specifications. Let's work through the tasks systematically:

1. First, review the requirements to understand what we're building
2. Check the design document for the technical approach
3. Follow the task breakdown in Tasks
4. Build the app step by step according to the plan

Let's start by reviewing the spec files and then begin implementation!`;

                // Try to send the message directly
                try {
                    await vscode.commands.executeCommand('kiroAgent.sendMainUserInput', specPrompt);
                } catch {
                    // Fallback: copy to clipboard and try paste command
                    try {
                        await vscode.env.clipboard.writeText(specPrompt);
                        await vscode.commands.executeCommand('kiroAgent.focusContinueInputWithoutClear');
                        // Try to trigger paste
                        await vscode.commands.executeCommand('editor.action.clipboardPasteAction');
                    } catch {
                        // Silent fallback - text is in clipboard at least
                    }
                }
            } catch (error) {
                // Silent error
            }
        })
    );

    // Command: Start Spec Mode Creation with Kiro
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.startSpecCreation', async () => {
            try {
                // Use Kiro's built-in spec creation command
                await vscode.commands.executeCommand('kiroAgent.initiateSpecCreation');
            } catch (error) {
                // Fallback: open chat and guide manually
                try {
                    await vscode.commands.executeCommand('kiroAgent.continueGUIView.focus');
                    await new Promise(resolve => setTimeout(resolve, 300));
                    await vscode.commands.executeCommand('kiroAgent.newSession');
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const prompt = `I want to create a spec for a simple todo list web application. Let's start with the Requirements.

The todo app should:
- Allow users to add, complete, and delete todos
- Persist data using localStorage
- Work entirely in the browser (no backend)
- Use vanilla JavaScript, HTML, and CSS

Please help me create the requirements.md file with user stories and acceptance criteria in EARS notation.`;

                    try {
                        await vscode.commands.executeCommand('kiroAgent.sendMainUserInput', prompt);
                    } catch {
                        await vscode.env.clipboard.writeText(prompt);
                        await vscode.commands.executeCommand('kiroAgent.focusContinueInputWithoutClear');
                    }
                } catch {}
            }
        })
    );

    // Command: Continue to Design phase
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.continueToDesign', async () => {
            try {
                await vscode.commands.executeCommand('kiroAgent.continueGUIView.focus');
                await new Promise(resolve => setTimeout(resolve, 200));

                const prompt = "The requirements look good! Let's proceed to create the Design file.";

                try {
                    await vscode.commands.executeCommand('kiroAgent.sendMainUserInput', prompt);
                } catch {
                    await vscode.env.clipboard.writeText(prompt);
                    await vscode.commands.executeCommand('kiroAgent.focusContinueInputWithoutClear');
                }
            } catch (error) {}
        })
    );

    // Command: Execute a prompt in Kiro
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.executePrompt', async (prompt: string) => {
            try {
                await vscode.commands.executeCommand('kiroAgent.continueGUIView.focus');
                await new Promise(resolve => setTimeout(resolve, 200));

                try {
                    await vscode.commands.executeCommand('kiroAgent.sendMainUserInput', prompt);
                } catch {
                    await vscode.env.clipboard.writeText(prompt);
                    await vscode.commands.executeCommand('kiroAgent.focusContinueInputWithoutClear');
                    vscode.window.showInformationMessage('Prompt copied to clipboard. Paste it into Kiro chat.');
                }
            } catch (error) {
                vscode.window.showErrorMessage('Failed to send prompt to Kiro');
            }
        })
    );

    // Command: Continue to Tasks phase
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.continueToTasks', async () => {
            try {
                await vscode.commands.executeCommand('kiroAgent.continueGUIView.focus');
                await new Promise(resolve => setTimeout(resolve, 200));

                const prompt = "The design looks good! Let's proceed to create the Tasks file.";

                try {
                    await vscode.commands.executeCommand('kiroAgent.sendMainUserInput', prompt);
                } catch {
                    await vscode.env.clipboard.writeText(prompt);
                    await vscode.commands.executeCommand('kiroAgent.focusContinueInputWithoutClear');
                }
            } catch (error) {}
        })
    );

    // Command: Start Task Execution
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.startTaskExecution', async () => {
            try {
                // Use Kiro's built-in task execution command
                await vscode.commands.executeCommand('spec.executeTask');
            } catch (error) {
                // Fallback: open chat and prompt manually
                try {
                    await vscode.commands.executeCommand('kiroAgent.continueGUIView.focus');
                    await new Promise(resolve => setTimeout(resolve, 200));

                    const prompt = `The tasks are ready! Let's start implementing.

Please look at the tasks.md file and begin working on the first uncompleted task. Work through each task systematically, checking them off as you complete them.

Start with the first task now!`;

                    try {
                        await vscode.commands.executeCommand('kiroAgent.sendMainUserInput', prompt);
                    } catch {
                        await vscode.env.clipboard.writeText(prompt);
                        await vscode.commands.executeCommand('kiroAgent.focusContinueInputWithoutClear');
                    }
                } catch {}
            }
        })
    );

    // Helper function to find the newest file
    async function findNewestFile(pattern: string): Promise<vscode.Uri | undefined> {
        const files = await vscode.workspace.findFiles(pattern);
        if (files.length === 0) {
            return undefined;
        }

        // Get file stats and sort by modification time (newest first)
        const filesWithStats = await Promise.all(
            files.map(async (file) => {
                const stat = await vscode.workspace.fs.stat(file);
                return { file, mtime: stat.mtime };
            })
        );

        filesWithStats.sort((a, b) => b.mtime - a.mtime);
        return filesWithStats[0].file;
    }

    // Command: Open requirements.md with fallback
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openRequirementsFile', async () => {
            try {
                // Try Kiro's navigation command first
                await vscode.commands.executeCommand('kiro.spec.navigateToRequirements');
            } catch {
                // Fallback: search for newest requirements.md in .kiro folder
                const workspaceFolder = await getWorkspaceFolder();
                if (workspaceFolder) {
                    const file = await findNewestFile('**/.kiro/**/requirements.md');
                    if (file) {
                        const doc = await vscode.workspace.openTextDocument(file);
                        await vscode.window.showTextDocument(doc);
                    } else {
                        vscode.window.showWarningMessage('requirements.md not found. Create spec files first.');
                    }
                }
            }
        })
    );

    // Command: Open design.md with fallback
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openDesignFile', async () => {
            try {
                // Try Kiro's navigation command first
                await vscode.commands.executeCommand('kiro.spec.navigateToDesign');
            } catch {
                // Fallback: search for newest design.md in .kiro folder
                const workspaceFolder = await getWorkspaceFolder();
                if (workspaceFolder) {
                    const file = await findNewestFile('**/.kiro/**/design.md');
                    if (file) {
                        const doc = await vscode.workspace.openTextDocument(file);
                        await vscode.window.showTextDocument(doc);
                    } else {
                        vscode.window.showWarningMessage('design.md not found. Create spec files first.');
                    }
                }
            }
        })
    );

    // Command: Open tasks.md with fallback
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openTasksFile', async () => {
            try {
                // Try Kiro's navigation command first
                await vscode.commands.executeCommand('kiro.spec.navigateToTasks');
            } catch {
                // Fallback: search for newest tasks.md or plan.md in .kiro folder
                const workspaceFolder = await getWorkspaceFolder();
                if (workspaceFolder) {
                    let file = await findNewestFile('**/.kiro/**/tasks.md');
                    if (!file) {
                        // Try plan.md as alternative
                        file = await findNewestFile('**/.kiro/**/plan.md');
                    }
                    if (file) {
                        const doc = await vscode.workspace.openTextDocument(file);
                        await vscode.window.showTextDocument(doc);
                    } else {
                        vscode.window.showWarningMessage('tasks.md not found. Create spec files first.');
                    }
                }
            }
        })
    );

    // Debug command: List all available commands to find Kiro's
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.findKiroCommands', async () => {
            const allCommands = await vscode.commands.getCommands();
            const kiroCommands = allCommands.filter(cmd =>
                cmd.toLowerCase().includes('kiro') ||
                cmd.toLowerCase().includes('chat') ||
                cmd.toLowerCase().includes('spec') ||
                cmd.toLowerCase().includes('vibe')
            );

            const output = vscode.window.createOutputChannel('Kiro Commands');
            output.clear();
            output.appendLine('=== Available Kiro-related commands ===');
            output.appendLine('');

            // Group commands by type
            const specCommands = kiroCommands.filter(cmd => cmd.toLowerCase().includes('spec'));
            const vibeCommands = kiroCommands.filter(cmd => cmd.toLowerCase().includes('vibe'));
            const requirementsCommands = kiroCommands.filter(cmd => cmd.toLowerCase().includes('requirement'));
            const designCommands = kiroCommands.filter(cmd => cmd.toLowerCase().includes('design'));
            const taskCommands = kiroCommands.filter(cmd => cmd.toLowerCase().includes('task'));

            if (specCommands.length > 0) {
                output.appendLine('=== SPEC COMMANDS ===');
                specCommands.forEach(cmd => output.appendLine(cmd));
                output.appendLine('');
            }

            if (vibeCommands.length > 0) {
                output.appendLine('=== VIBE COMMANDS ===');
                vibeCommands.forEach(cmd => output.appendLine(cmd));
                output.appendLine('');
            }

            if (requirementsCommands.length > 0) {
                output.appendLine('=== REQUIREMENTS COMMANDS ===');
                requirementsCommands.forEach(cmd => output.appendLine(cmd));
                output.appendLine('');
            }

            if (designCommands.length > 0) {
                output.appendLine('=== DESIGN COMMANDS ===');
                designCommands.forEach(cmd => output.appendLine(cmd));
                output.appendLine('');
            }

            if (taskCommands.length > 0) {
                output.appendLine('=== TASK COMMANDS ===');
                taskCommands.forEach(cmd => output.appendLine(cmd));
                output.appendLine('');
            }

            output.appendLine('=== ALL KIRO COMMANDS ===');
            kiroCommands.forEach(cmd => output.appendLine(cmd));
            output.appendLine('');
            output.appendLine(`Found ${kiroCommands.length} commands total`);
            output.show();

            vscode.window.showInformationMessage(`Found ${kiroCommands.length} Kiro-related commands. Check the Output panel.`);
        })
    );

    // Commands to open Spirit of Kiro documentation URLs
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openSpiritOfKiro', () => {
            vscode.env.openExternal(vscode.Uri.parse('https://kiro.dev/docs/guides/learn-by-playing/'));
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openSpiritSetup', () => {
            vscode.env.openExternal(vscode.Uri.parse('https://kiro.dev/docs/guides/learn-by-playing/00-setup/'));
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openSteeringDocs', () => {
            vscode.env.openExternal(vscode.Uri.parse('https://kiro.dev/docs/features/steering/'));
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openMCPDocs', () => {
            vscode.env.openExternal(vscode.Uri.parse('https://kiro.dev/docs/features/mcp/'));
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openKiroDocs', () => {
            vscode.env.openExternal(vscode.Uri.parse('https://kiro.dev/docs/'));
        })
    );

    // Command: Clone Spirit of Kiro Repository
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.cloneSpiritRepo', async () => {
            try {
                const workspaceFolder = await getWorkspaceFolder();
                if (!workspaceFolder) { return; }

                // Ask user where to clone the repository
                const cloneInWorkspace = await vscode.window.showQuickPick(
                    [
                        { label: 'Clone in current workspace', value: 'workspace' },
                        { label: 'Choose different location', value: 'choose' }
                    ],
                    { placeHolder: 'Where would you like to clone Spirit of Kiro?' }
                );

                if (!cloneInWorkspace) { return; }

                let targetPath: vscode.Uri;
                if (cloneInWorkspace.value === 'workspace') {
                    targetPath = vscode.Uri.joinPath(workspaceFolder, 'spirit-of-kiro');
                } else {
                    const chosen = await vscode.window.showOpenDialog({
                        canSelectFiles: false,
                        canSelectFolders: true,
                        canSelectMany: false,
                        title: 'Select folder to clone Spirit of Kiro into'
                    });
                    if (!chosen || chosen.length === 0) { return; }
                    targetPath = vscode.Uri.joinPath(chosen[0], 'spirit-of-kiro');
                }

                // Execute git clone
                const terminal = vscode.window.createTerminal('Clone Spirit of Kiro');
                terminal.show();
                terminal.sendText(`git clone https://github.com/kirodotdev/spirit-of-kiro.git "${targetPath.fsPath}"`);

                vscode.window.showInformationMessage('Cloning Spirit of Kiro repository... Check the terminal for progress.');
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to clone repository: ${error}`);
            }
        })
    );

    // Command: Check Docker Installation
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.checkDocker', async () => {
            try {
                const terminal = vscode.window.createTerminal('Check Docker');
                terminal.show();
                terminal.sendText('docker --version && docker ps');

                vscode.window.showInformationMessage('Checking Docker installation... See terminal output.');
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to check Docker: ${error}`);
            }
        })
    );

    // Command: Check AWS Credentials
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.checkAWS', async () => {
            try {
                const terminal = vscode.window.createTerminal('Check AWS');
                terminal.show();
                terminal.sendText('aws --version && aws sts get-caller-identity');

                vscode.window.showInformationMessage('Checking AWS credentials... See terminal output.');
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to check AWS: ${error}`);
            }
        })
    );

    // Command: Check Git Installation
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.checkGit', async () => {
            try {
                const terminal = vscode.window.createTerminal('Check Git');
                terminal.show();
                terminal.sendText('git --version');

                vscode.window.showInformationMessage('Checking Git installation... See terminal output.');
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to check Git: ${error}`);
            }
        })
    );

    // Command: Check Node.js Installation
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.checkNodeJS', async () => {
            try {
                const terminal = vscode.window.createTerminal('Check Node.js');
                terminal.show();
                terminal.sendText('node --version && npm --version');

                vscode.window.showInformationMessage('Checking Node.js installation... See terminal output.');
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to check Node.js: ${error}`);
            }
        })
    );

    // Commands: Open Spirit of Kiro Lesson Guides
    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openSpiritLesson1', () => {
            vscode.env.openExternal(vscode.Uri.parse('https://kiro.dev/docs/guides/learn-by-playing/00-setup'));
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openSpiritLesson2', () => {
            vscode.env.openExternal(vscode.Uri.parse('https://kiro.dev/docs/guides/learn-by-playing/01-improve-the-homepage'));
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openSpiritLesson3', () => {
            vscode.env.openExternal(vscode.Uri.parse('https://kiro.dev/docs/guides/learn-by-playing/02-physics-bug'));
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openSpiritLesson4', () => {
            vscode.env.openExternal(vscode.Uri.parse('https://kiro.dev/docs/guides/learn-by-playing/03-interactions-bug'));
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openSpiritLesson5', () => {
            vscode.env.openExternal(vscode.Uri.parse('https://kiro.dev/docs/guides/learn-by-playing/04-dry-code-refactor'));
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openSpiritLesson6', () => {
            vscode.env.openExternal(vscode.Uri.parse('https://kiro.dev/docs/guides/learn-by-playing/05-using-specs-for-complex-work'));
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openSpiritLesson7', () => {
            vscode.env.openExternal(vscode.Uri.parse('https://kiro.dev/docs/guides/learn-by-playing/06-managing-assets-with-agent-hooks'));
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openSpiritLesson8', () => {
            vscode.env.openExternal(vscode.Uri.parse('https://kiro.dev/docs/guides/learn-by-playing/07-extending-kiro-with-mcp'));
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('kiro-tutorial.openSpiritLesson9', () => {
            vscode.env.openExternal(vscode.Uri.parse('https://kiro.dev/docs/guides/learn-by-playing/99-conclusion'));
        })
    );
}

async function getWorkspaceFolder(): Promise<vscode.Uri | undefined> {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders || workspaceFolders.length === 0) {
        const openFolder = await vscode.window.showErrorMessage(
            'No workspace folder open. Please open a folder first.',
            'Open Folder'
        );

        if (openFolder === 'Open Folder') {
            await vscode.commands.executeCommand('vscode.openFolder');
        }
        return undefined;
    }

    return workspaceFolders[0].uri;
}

async function ensurePromptsDirectory(): Promise<void> {
    const workspaceFolder = await getWorkspaceFolder();
    if (!workspaceFolder) { return; }

    const promptsDir = vscode.Uri.joinPath(workspaceFolder, '.prompts');

    // Check if .prompts directory exists
    try {
        await vscode.workspace.fs.stat(promptsDir);
        // Directory exists, we're done
        return;
    } catch {
        // Directory doesn't exist, create it with prompts
    }

    // Create .prompts directory
    await vscode.workspace.fs.createDirectory(promptsDir);

    // Create chat prompt
    const chatPrompt = `---
name: Chat Quick Start
description: Start a quick Chat session for rapid prototyping
---

I want to build a quick prototype using Chat mode. Let's jump straight into coding!

Please help me:
1. Understand what I want to build
2. Suggest a tech stack
3. Start scaffolding the project

Let's move fast and iterate!`;

    // Create spec prompt
    const specPrompt = `---
name: Spec-Driven Development
description: Start spec-driven development with requirements, design, and tasks
---

I want to build this project using spec-driven development with proper documentation.

Please help me create:
1. **requirements.md** - Detailed requirements with functional and non-functional specs
2. **design.md** - Technical design with architecture decisions and rationale
3. **tasks.md** - Breakdown of implementation tasks with time estimates

Let's do this systematically and thoroughly!`;

    // Write prompt files
    await vscode.workspace.fs.writeFile(
        vscode.Uri.joinPath(promptsDir, 'chat-quickstart.prompt.md'),
        Buffer.from(chatPrompt, 'utf-8')
    );

    await vscode.workspace.fs.writeFile(
        vscode.Uri.joinPath(promptsDir, 'spec-driven.prompt.md'),
        Buffer.from(specPrompt, 'utf-8')
    );
}

async function createFileFromTemplate(
    context: vscode.ExtensionContext,
    targetPath: string,
    templateName: string
): Promise<void> {
    const workspaceFolder = await getWorkspaceFolder();
    if (!workspaceFolder) { return; }

    const targetFilePath = vscode.Uri.joinPath(workspaceFolder, targetPath);

    // Check if file already exists
    try {
        await vscode.workspace.fs.stat(targetFilePath);
        const overwrite = await vscode.window.showWarningMessage(
            `${path.basename(targetPath)} already exists. Do you want to overwrite it?`,
            'Overwrite',
            'Cancel'
        );

        if (overwrite !== 'Overwrite') {
            return;
        }
    } catch {
        // File doesn't exist, which is fine
    }

    // Create parent directory if needed
    const parentDir = vscode.Uri.joinPath(workspaceFolder, path.dirname(targetPath));
    try {
        await vscode.workspace.fs.createDirectory(parentDir);
    } catch {
        // Directory might already exist
    }

    // Read template
    const templatePath = vscode.Uri.joinPath(context.extensionUri, 'templates', templateName);
    let content: string;

    try {
        const templateContent = await vscode.workspace.fs.readFile(templatePath);
        content = Buffer.from(templateContent).toString('utf-8');
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to read template: ${error}`);
        return;
    }

    // Write file
    try {
        await vscode.workspace.fs.writeFile(targetFilePath, Buffer.from(content, 'utf-8'));
        vscode.window.showInformationMessage(`✓ Created ${path.basename(targetPath)}`);

        // Open the file
        const document = await vscode.workspace.openTextDocument(targetFilePath);
        await vscode.window.showTextDocument(document);
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to create file: ${error}`);
    }
}

async function openOrCreateFile(
    context: vscode.ExtensionContext,
    targetPath: string,
    templateName: string
): Promise<void> {
    const workspaceFolder = await getWorkspaceFolder();
    if (!workspaceFolder) { return; }

    const filePath = vscode.Uri.joinPath(workspaceFolder, targetPath);

    try {
        // Try to open existing file
        await vscode.workspace.fs.stat(filePath);
        const document = await vscode.workspace.openTextDocument(filePath);
        await vscode.window.showTextDocument(document);
    } catch {
        // File doesn't exist, offer to create it
        const create = await vscode.window.showInformationMessage(
            `${path.basename(targetPath)} doesn't exist. Would you like to create it?`,
            'Create',
            'Cancel'
        );

        if (create === 'Create') {
            await createFileFromTemplate(context, targetPath, templateName);
        }
    }
}

async function createExampleProject(context: vscode.ExtensionContext): Promise<void> {
    const workspaceFolder = await getWorkspaceFolder();
    if (!workspaceFolder) { return; }

    const exampleFiles = [
        {
            path: 'requirements.md',
            content: getExampleRequirements()
        },
        {
            path: 'design.md',
            content: getExampleDesign()
        },
        {
            path: 'tasks.md',
            content: getExampleTasks()
        },
        {
            path: '.kiro/hooks.json',
            content: getExampleHooks()
        }
    ];

    try {
        // Create .kiro directory
        const kiroDir = vscode.Uri.joinPath(workspaceFolder, '.kiro');
        await vscode.workspace.fs.createDirectory(kiroDir);

        // Create all files
        for (const file of exampleFiles) {
            const filePath = vscode.Uri.joinPath(workspaceFolder, file.path);
            await vscode.workspace.fs.writeFile(filePath, Buffer.from(file.content, 'utf-8'));
        }

        vscode.window.showInformationMessage('✓ Created example Todo List project! Check your workspace for the new files.');

        // Open requirements.md
        const requirementsPath = vscode.Uri.joinPath(workspaceFolder, 'requirements.md');
        const document = await vscode.workspace.openTextDocument(requirementsPath);
        await vscode.window.showTextDocument(document);
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to create example project: ${error}`);
    }
}

async function showWorkflowDiagram(context: vscode.ExtensionContext): Promise<void> {
    const panel = vscode.window.createWebviewPanel(
        'kiroWorkflow',
        'Kiro Workflow',
        vscode.ViewColumn.One,
        { enableScripts: true }
    );

    panel.webview.html = getWorkflowHtml();
}

function getWorkflowHtml(): string {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kiro Workflow</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
            padding: 20px;
            line-height: 1.6;
        }
        .workflow-container {
            max-width: 900px;
            margin: 0 auto;
        }
        h1 {
            color: var(--vscode-textLink-foreground);
            text-align: center;
        }
        .workflow {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin: 40px 0;
        }
        .step {
            background: var(--vscode-editor-selectionBackground);
            border-left: 4px solid var(--vscode-textLink-foreground);
            padding: 20px;
            border-radius: 5px;
        }
        .step h2 {
            margin-top: 0;
            color: var(--vscode-textLink-foreground);
        }
        .arrow {
            text-align: center;
            font-size: 30px;
            color: var(--vscode-textLink-foreground);
        }
        .cycle-note {
            background: var(--vscode-editorInfo-background);
            border: 1px solid var(--vscode-editorInfo-foreground);
            padding: 15px;
            border-radius: 5px;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="workflow-container">
        <h1>🔄 The Kiro Development Workflow</h1>

        <div class="workflow">
            <div class="step">
                <h2>1️⃣ Write Requirements</h2>
                <p>Start by documenting <strong>what</strong> you need to build in <code>requirements.md</code>.</p>
                <ul>
                    <li>Define functional requirements</li>
                    <li>Specify non-functional requirements</li>
                    <li>List constraints and scope</li>
                </ul>
            </div>

            <div class="arrow">↓</div>

            <div class="step">
                <h2>2️⃣ Design Solution</h2>
                <p>Based on requirements, plan <strong>how</strong> you'll build it in <code>design.md</code>.</p>
                <ul>
                    <li>Choose technology stack</li>
                    <li>Design architecture</li>
                    <li>Document key decisions</li>
                </ul>
            </div>

            <div class="arrow">↓</div>

            <div class="step">
                <h2>3️⃣ Create Tasks</h2>
                <p>Break down design into concrete steps in <code>tasks.md</code>.</p>
                <ul>
                    <li>Write actionable tasks</li>
                    <li>Estimate time</li>
                    <li>Identify dependencies</li>
                </ul>
            </div>

            <div class="arrow">↓</div>

            <div class="step">
                <h2>4️⃣ Execute Tasks</h2>
                <p>Work through your task list systematically.</p>
                <ul>
                    <li>Complete tasks one by one</li>
                    <li>Check off subtasks</li>
                    <li>Track progress</li>
                </ul>
            </div>

            <div class="arrow">↓</div>

            <div class="step">
                <h2>5️⃣ Update & Refine</h2>
                <p>As you learn, update your specs to stay current.</p>
                <ul>
                    <li>Revise requirements if needed</li>
                    <li>Update design decisions</li>
                    <li>Adjust tasks based on reality</li>
                </ul>
            </div>
        </div>

        <div class="cycle-note">
            <strong>🔄 This is an iterative cycle!</strong><br>
            Specs are living documents. Update them as you learn and grow your project.
        </div>
    </div>
</body>
</html>`;
}

function getExampleRequirements(): string {
    return `# Requirements: Todo List Application

## Overview
A simple, user-friendly todo list application that helps individuals manage their daily tasks and track completion progress.

## Functional Requirements

### Task Management
- FR1: Users must be able to create new todo items with a title and optional description
- FR2: Users must be able to mark todo items as complete/incomplete
- FR3: Users must be able to edit existing todo items
- FR4: Users must be able to delete todo items
- FR5: Users must be able to reorder todo items via drag and drop

### Organization
- FR6: Users must be able to create categories/lists to organize todos
- FR7: Users must be able to filter todos by category
- FR8: Users must be able to filter todos by completion status (all, active, completed)

### Data Persistence
- FR9: Todo items must persist between sessions
- FR10: User preferences must persist between sessions

## Non-Functional Requirements

### Performance
- NFR1: Initial page load must complete within 2 seconds
- NFR2: Todo operations (create, update, delete) must complete within 500ms

### Usability
- NFR3: Interface must be intuitive and require no tutorial for basic operations
- NFR4: Application must be fully keyboard accessible
- NFR5: Application must work on screens 320px wide and larger

### Reliability
- NFR6: Application must work offline and sync when connection returns
- NFR7: No data loss should occur during normal operation

### Browser Compatibility
- NFR8: Must work on Chrome, Firefox, Safari, and Edge (latest 2 versions)

## Constraints
- Must be a client-side web application (no server required)
- Must use local storage for data persistence
- Budget: Personal project (free hosting only)
- Timeline: 2 weeks for MVP

## Out of Scope
- User accounts and authentication (future phase)
- Collaboration/sharing features (future phase)
- Mobile native apps (future phase)
- Recurring tasks (future phase)
- Due dates and reminders (future phase)
`;
}

function getExampleDesign(): string {
    return `# Design: Todo List Application

## Architecture Overview
Single-page application (SPA) with client-side state management and local storage persistence.

## Technology Stack
- **Frontend**: React 18 with TypeScript
- **State Management**: React Context API + Hooks
- **Styling**: CSS Modules with CSS Variables for theming
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library
- **Deployment**: Netlify (static hosting)

## System Components

### Component 1: Todo Manager
- **Purpose**: Core todo CRUD operations and state management
- **Responsibilities**:
  - Create, read, update, delete todos
  - Toggle todo completion status
  - Reorder todos
  - Persist changes to local storage
- **Dependencies**: Local Storage Adapter

### Component 2: Category Manager
- **Purpose**: Organize todos into categories/lists
- **Responsibilities**:
  - Create, read, update, delete categories
  - Assign todos to categories
  - Filter todos by category
- **Dependencies**: Local Storage Adapter

### Component 3: UI Layer
- **Purpose**: React components for user interface
- **Key Components**:
  - TodoList: Displays filtered todo items
  - TodoItem: Individual todo with edit/delete actions
  - TodoForm: Create/edit todo form
  - CategorySelector: Filter by category
  - FilterBar: Filter by completion status

### Component 4: Local Storage Adapter
- **Purpose**: Abstract storage operations
- **Responsibilities**:
  - Save/load todos from localStorage
  - Save/load categories from localStorage
  - Handle serialization/deserialization
  - Provide migration path for schema changes

## Data Models

### Todo
\`\`\`typescript
interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    categoryId: string | null;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
\`\`\`

### Category
\`\`\`typescript
interface Category {
    id: string;
    name: string;
    color: string;
    order: number;
}
\`\`\`

### AppState
\`\`\`typescript
interface AppState {
    todos: Todo[];
    categories: Category[];
    filter: {
        categoryId: string | null;
        status: 'all' | 'active' | 'completed';
    };
}
\`\`\`

## Local Storage Schema
- Key: \`kiro-todos-v1\` - stores todos array
- Key: \`kiro-categories-v1\` - stores categories array
- Key: \`kiro-filter-v1\` - stores current filter state

## Design Decisions

### Decision 1: Use React Context instead of Redux
- **Rationale**: Application state is simple enough that Redux overhead isn't justified. Context API provides sufficient state management with less boilerplate.
- **Alternatives Considered**: Redux, Zustand, Recoil
- **Trade-offs**:
  - ✅ Simpler setup, less code
  - ✅ No external dependencies for state
  - ❌ Less tooling (no DevTools)
  - ❌ May need refactoring if app grows complex

### Decision 2: Client-side only (no backend)
- **Rationale**: Keeps project simple and cost-free. Local storage is sufficient for MVP and single-user scenario.
- **Alternatives Considered**: Firebase, Supabase, custom Node.js backend
- **Trade-offs**:
  - ✅ Zero infrastructure costs
  - ✅ Faster development
  - ✅ Works offline by default
  - ❌ No cross-device sync
  - ❌ No user accounts
  - ❌ Data only in browser

### Decision 3: Vite instead of Create React App
- **Rationale**: Vite offers much faster development server and build times. CRA is no longer actively maintained.
- **Alternatives Considered**: Create React App, Next.js, Parcel
- **Trade-offs**:
  - ✅ Extremely fast HMR
  - ✅ Modern tooling
  - ✅ Smaller bundle sizes
  - ❌ Less mature ecosystem than CRA
  - ❌ Different configuration format

## UI/UX Considerations
- Clean, minimal interface inspired by Todoist
- Drag handles visible on hover for reordering
- Inline editing for quick updates
- Keyboard shortcuts: n (new todo), / (focus search)
- Optimistic UI updates for responsiveness
`;
}

function getExampleTasks(): string {
    return `# Tasks: Todo List Application

## Sprint 1: Project Foundation (Week 1, Days 1-3)

### Task 1.1: Project Setup
- [ ] Create new Vite + React + TypeScript project
- [ ] Configure ESLint and Prettier
- [ ] Set up folder structure (components/, hooks/, utils/, types/)
- [ ] Install dependencies (uuid, date-fns)
- [ ] Create README with setup instructions

**Estimated time**: 2 hours
**Dependencies**: None
**Acceptance Criteria**:
- Dev server runs without errors
- Linting passes with no warnings

### Task 1.2: Data Models and Types
- [ ] Create TypeScript interfaces for Todo, Category, AppState
- [ ] Create helper functions for generating IDs
- [ ] Write unit tests for type guards
- [ ] Document data structures in comments

**Estimated time**: 1.5 hours
**Dependencies**: Task 1.1
**Acceptance Criteria**:
- All types exported from types/index.ts
- Tests pass with >90% coverage

### Task 1.3: Local Storage Adapter
- [ ] Create LocalStorageService class
- [ ] Implement saveTodos() and loadTodos()
- [ ] Implement saveCategories() and loadCategories()
- [ ] Add error handling for quota exceeded
- [ ] Write unit tests with localStorage mock

**Estimated time**: 3 hours
**Dependencies**: Task 1.2
**Acceptance Criteria**:
- Can save and load data successfully
- Handles corrupted data gracefully
- Tests pass

## Sprint 2: Core Functionality (Week 1, Days 4-7)

### Task 2.1: Todo Context Setup
- [ ] Create TodoContext with React Context API
- [ ] Implement useTodoContext hook
- [ ] Add actions: addTodo, updateTodo, deleteTodo, toggleTodo
- [ ] Integrate with LocalStorageService
- [ ] Add loading state

**Estimated time**: 3 hours
**Dependencies**: Task 1.3
**Acceptance Criteria**:
- Context provides all CRUD operations
- Changes persist to localStorage
- No prop drilling needed in components

### Task 2.2: TodoItem Component
- [ ] Create TodoItem presentational component
- [ ] Add checkbox for completion toggle
- [ ] Add inline edit mode
- [ ] Add delete button with confirmation
- [ ] Style with CSS modules
- [ ] Add hover states and animations

**Estimated time**: 4 hours
**Dependencies**: Task 2.1
**Acceptance Criteria**:
- Component is fully accessible (ARIA labels, keyboard nav)
- Looks good on mobile and desktop
- Smooth transitions between states

### Task 2.3: TodoForm Component
- [ ] Create form for adding/editing todos
- [ ] Add validation (title required, max lengths)
- [ ] Handle form submission
- [ ] Add keyboard shortcuts (Enter to submit, Esc to cancel)
- [ ] Style form with error states

**Estimated time**: 3 hours
**Dependencies**: Task 2.1
**Acceptance Criteria**:
- Form validates input correctly
- Shows clear error messages
- Works with keyboard only

### Task 2.4: TodoList Component
- [ ] Create TodoList container component
- [ ] Connect to TodoContext
- [ ] Implement drag-and-drop reordering
- [ ] Add empty state when no todos
- [ ] Add loading state

**Estimated time**: 4 hours
**Dependencies**: Task 2.2, Task 2.3
**Acceptance Criteria**:
- Can reorder todos via drag and drop
- Reorder persists to storage
- Smooth animations

## Sprint 3: Categories & Polish (Week 2)

### Task 3.1: Category System
- [ ] Add category CRUD to context
- [ ] Create CategorySelector component
- [ ] Add category assignment to TodoForm
- [ ] Add category filtering to TodoList
- [ ] Implement category color coding

**Estimated time**: 4 hours
**Dependencies**: Task 2.4
**Acceptance Criteria**:
- Can create and delete categories
- Todos display with category colors
- Filter works correctly

### Task 3.2: Filter Bar
- [ ] Create FilterBar component
- [ ] Add status filter (all/active/completed)
- [ ] Add search functionality
- [ ] Persist filter state to localStorage
- [ ] Show count of visible todos

**Estimated time**: 2.5 hours
**Dependencies**: Task 3.1
**Acceptance Criteria**:
- All filters work correctly
- Search is case-insensitive
- Filter state persists on reload

### Task 3.3: Keyboard Shortcuts
- [ ] Implement global keyboard listener
- [ ] Add 'n' shortcut for new todo
- [ ] Add '/' shortcut for search focus
- [ ] Add Escape to close modals/forms
- [ ] Show keyboard shortcuts in help dialog

**Estimated time**: 2 hours
**Dependencies**: Task 3.2
**Acceptance Criteria**:
- All shortcuts work as expected
- Shortcuts don't interfere with input fields
- Help dialog lists all shortcuts

### Task 3.4: Testing & Bug Fixes
- [ ] Write integration tests for main flows
- [ ] Test on all required browsers
- [ ] Test responsive design on different screen sizes
- [ ] Fix any discovered bugs
- [ ] Optimize performance (check bundle size)

**Estimated time**: 4 hours
**Dependencies**: All previous tasks
**Acceptance Criteria**:
- Test coverage >80%
- Works on all required browsers
- Lighthouse score >90
- No console errors

### Task 3.5: Deployment
- [ ] Create production build
- [ ] Set up Netlify deployment
- [ ] Configure custom domain (if available)
- [ ] Test deployed version
- [ ] Update README with live demo link

**Estimated time**: 1.5 hours
**Dependencies**: Task 3.4
**Acceptance Criteria**:
- App deployed and accessible
- All features work in production
- Fast load times (<2s)

## Notes
- Commit after each completed task
- Update design.md if architecture changes
- Keep accessibility in mind throughout (use semantic HTML, ARIA labels)
- Test keyboard navigation at each step
- Consider adding analytics in future (not in MVP)
`;
}

function getExampleHooks(): string {
    return `{
  "hooks": [
    {
      "name": "project-context",
      "description": "Automatically share project requirements and design with AI",
      "trigger": "onNewConversation",
      "action": {
        "type": "injectContext",
        "content": [
          {
            "file": "requirements.md",
            "section": "all"
          },
          {
            "file": "design.md",
            "section": "Architecture Overview"
          },
          {
            "file": "design.md",
            "section": "Technology Stack"
          }
        ],
        "message": "Here's the context for our Todo List project. Please keep these requirements and design decisions in mind when helping with code."
      }
    },
    {
      "name": "ensure-tests",
      "description": "Remind to create tests for new source files",
      "trigger": "onFileCreate",
      "condition": {
        "filePattern": "src/**/*.{ts,tsx}",
        "exclude": "**/*.test.{ts,tsx}"
      },
      "action": {
        "type": "remind",
        "message": "Don't forget to create a corresponding test file with good coverage! Our target is >80%."
      }
    },
    {
      "name": "task-completion-reminder",
      "description": "Remind to update tasks.md after commits",
      "trigger": "onCommit",
      "action": {
        "type": "remind",
        "message": "Have you checked off the completed tasks in tasks.md? Let's keep our progress up to date!"
      }
    },
    {
      "name": "design-decision-check",
      "description": "Prompt to document significant design changes",
      "trigger": "onFileChange",
      "condition": {
        "filePattern": "src/**/*.{ts,tsx}",
        "significantChange": true
      },
      "action": {
        "type": "validate",
        "message": "This looks like a significant change. Should we document this decision in design.md?"
      }
    }
  ]
}
`;
}

export function deactivate() {}
