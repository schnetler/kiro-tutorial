/**
 * Lesson 8: Extending Kiro with MCP
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getLesson8MCP(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Lesson 8: Extending Kiro with MCP',
        content: `
            ${ctx.getEnhancedLessonBadge(8, 9, 'Extending Kiro with MCP')}

            <p>Extend Kiro's capabilities with Model Context Protocol (MCP) to add project-specific tools and integrations.</p>

            ${ctx.getCollapsibleSection('l8-intro', 1, 'What is MCP?', `
                <div class="info-box">
                    <strong>Model Context Protocol (MCP)</strong> is an open standard for connecting AI assistants to external tools and data sources. It lets you extend Kiro with custom capabilities.
                </div>

                <img src="https://kiro.dev/images/video-game-guide/mcp-basics.png" alt="MCP basics" style="width: 100%; border-radius: 8px; margin: 12px 0; border: 1px solid var(--vscode-widget-border);">

                <h4>MCP Enables</h4>
                <div class="journey-container">
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Custom Tools</div>
                            <div class="journey-desc">Add project-specific capabilities</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Data Access</div>
                            <div class="journey-desc">Connect to databases and APIs</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Workflow Integration</div>
                            <div class="journey-desc">Connect to CI/CD, issue trackers</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Shared Tooling</div>
                            <div class="journey-desc">Team-wide custom tools</div>
                        </div>
                    </div>
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('l8-identify', 2, 'Identify Custom Tool Needs', `
                <p>Think about what custom tools would enhance your workflow:</p>

                <button class="prompt-button" onclick="executePrompt('What custom MCP tools would be useful for this game development project? Consider: database access (DynamoDB queries), API testing, asset generation, deployment automation, and game state inspection.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "What custom MCP tools would be useful..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Example Tool Ideas</h4>
                <div class="info-item">
                    <strong>Database Inspector</strong>
                    <p>Query player data, inventory, and game state directly from Kiro</p>
                </div>
                <div class="info-item">
                    <strong>API Tester</strong>
                    <p>Call game APIs with proper authentication</p>
                </div>
                <div class="info-item">
                    <strong>Asset Generator</strong>
                    <p>Create game assets (sprites, icons) programmatically</p>
                </div>
                <div class="info-item">
                    <strong>Deploy Tool</strong>
                    <p>Trigger deployments with environment configuration</p>
                </div>
            `)}

            ${ctx.getCollapsibleSection('l8-create', 3, 'Create an MCP Server', `
                <p>Ask Kiro to help create a simple MCP server:</p>

                <button class="prompt-button" onclick="executePrompt('Help me create a simple MCP server that provides a tool to query our DynamoDB game state. It should be able to list players and their inventories. Use TypeScript and the MCP SDK.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Create an MCP server for DynamoDB..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">MCP Server Structure</h4>
                <div class="code-block-container">
                    <div class="code-block">mcp-server/
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── src/
│   ├── index.ts        # Server entry point
│   └── tools/          # Tool implementations
│       └── dynamodb.ts # DynamoDB tool
└── README.md           # Documentation</div>
                </div>

                <div class="tip-box">
                    <strong>MCP servers</strong> are simple processes that expose tools via JSON-RPC. They can be written in any language, but TypeScript has the best SDK support.
                </div>

                <img src="https://kiro.dev/images/video-game-guide/memory-behavior.png" alt="Memory behavior example" style="width: 100%; border-radius: 8px; margin: 12px 0; border: 1px solid var(--vscode-widget-border);">
            `)}

            ${ctx.getCollapsibleSection('l8-integrate', 4, 'Integrate & Test', `
                <p>Connect your MCP server to Kiro:</p>

                <div class="info-item">
                    <strong>Step 1:</strong> Configure MCP server
                    <p>Add the server to your Kiro MCP configuration</p>
                </div>
                <div class="info-item">
                    <strong>Step 2:</strong> Restart Kiro
                    <p>Kiro needs to restart to load new MCP servers</p>
                </div>
                <div class="info-item">
                    <strong>Step 3:</strong> Test the tool
                    <p>Use the custom tool in a prompt to verify it works</p>
                </div>

                <div class="code-block-container">
                    <div class="code-block"># Example: Using your custom tool
"Use the dynamodb tool to list all players
and show their current inventory"</div>
                </div>

                <button class="action-btn browser" onclick="openUrl('https://modelcontextprotocol.io/docs')">
                    <svg viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>
                    Read MCP Documentation
                </button>

                <img src="https://kiro.dev/images/video-game-guide/steering-mcp.png" alt="Steering MCP integration" style="width: 100%; border-radius: 8px; margin: 12px 0; border: 1px solid var(--vscode-widget-border);">

                <div class="tip-box" style="margin-top: 16px; background: var(--kiro-success-light); border-color: var(--kiro-success);">
                    <strong>Key Learning:</strong> MCP extends Kiro's capabilities beyond chat. Custom tools make AI assistance more powerful for your specific workflow and can be shared across your team.
                </div>
            `)}
        `,
        actions: []
    };
}
