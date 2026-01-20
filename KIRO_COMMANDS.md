# Kiro Commands Reference

Commands available for use with `vscode.commands.executeCommand()`.

## Spec Commands

| Command | Description |
|---------|-------------|
| `kiroAgent.initiateSpecCreation` | Start the spec creation flow |
| `spec.executeTask` | Execute a task from tasks.md |
| `kiro.spec.navigateToRequirements` | Open requirements.md |
| `kiro.spec.navigateToDesign` | Open design.md |
| `kiro.spec.navigateToTasks` | Open tasks.md |
| `kiro.spec.refreshRequirementsFile` | Refresh requirements file |
| `kiro.spec.refreshDesignFile` | Refresh design file |
| `kiro.spec.refreshPlanFile` | Refresh plan file |
| `kiro.spec.nextDocument` | Navigate to next spec document |
| `kiro.spec.previousDocument` | Navigate to previous spec document |
| `kiro.spec.explorerCreateSpec` | Create new spec from explorer |
| `kiro.spec.explorerDeleteSpec` | Delete spec from explorer |
| `kiro.spec.toggleOptionalTask` | Toggle optional task |
| `kiro.spec.startOptionalTask` | Start optional task |
| `kiro.navigateToTask` | Navigate to a specific task |
| `kiro.navigateToRequirement` | Navigate to a specific requirement |

## Chat/Agent Commands

| Command | Description |
|---------|-------------|
| `kiroAgent.agent.chatAgent` | Send message to chat agent |
| `kiroAgent.agent.promptAgent` | Prompt agent |
| `kiroAgent.agent.askAgent` | Ask agent |
| `kiroAgent.continueGUIView.focus` | Focus the chat view |
| `kiroAgent.newSession` | Start a new chat session |
| `kiroAgent.sendMainUserInput` | Send text to chat input |
| `kiroAgent.focusContinueInputWithoutClear` | Focus input without clearing |
| `kiroAgent.userInputFocusNoSubmit` | Focus input without submitting |

## Execution Commands

| Command | Description |
|---------|-------------|
| `kiroAgent.executions.triggerAgent` | Trigger agent execution |
| `kiroAgent.executions.abortActiveAgent` | Abort running agent |
| `kiroAgent.executions.retryAgent` | Retry agent execution |
| `kiroAgent.executions.getExecutionHistory` | Get execution history |
| `kiroAgent.executions.getQueuedExecutions` | Get queued executions |
| `kiroAgent.execution.applyPendingChanges` | Apply pending changes |
| `kiroAgent.execution.restorePendingChanges` | Restore pending changes |

## View Commands

| Command | Description |
|---------|-------------|
| `kiro.views.specExplorer.open` | Open spec explorer |
| `kiro.views.specExplorer.focus` | Focus spec explorer |
| `kiroAgent.views.hooksStatus.open` | Open hooks status view |
| `kiroAgent.views.steeringExplorer.open` | Open steering explorer |
| `kiroAgent.views.mcpServerStatus.open` | Open MCP server status |

## Hooks Commands

| Command | Description |
|---------|-------------|
| `kiroAgent.hooks.create` | Create new hook |
| `kiroAgent.hooks.delete` | Delete hook |
| `kiroAgent.hooks.read` | Read hooks |
| `kiroAgent.hooks.setEnabled` | Enable/disable hook |
| `kiroAgent.hooks.trigger` | Trigger hook |
| `kiroAgent.hooks.openHookFile` | Open hook configuration file |

## Steering Commands

| Command | Description |
|---------|-------------|
| `kiro.steering.createInitialSteering` | Create initial steering files |
| `kiro.steering.createSteering` | Create steering file |
| `kiro.steering.deleteSteering` | Delete steering file |
| `kiro.steering.refineSteeringFile` | Refine steering file |
| `kiroAgent.steering.getSteering` | Get steering configuration |

## MCP Commands

| Command | Description |
|---------|-------------|
| `kiroAgent.mcp.showLogs` | Show MCP logs |
| `kiroAgent.mcp.debugServer` | Debug MCP server |
| `kiroAgent.mcp.retryConnection` | Retry MCP connection |
| `kiroAgent.mcp.reconnectServer` | Reconnect MCP server |
| `kiroAgent.mcp.enableServer` | Enable MCP server |
| `kiroAgent.mcp.disableServer` | Disable MCP server |
| `kiroAgent.mcp.enableTool` | Enable MCP tool |
| `kiroAgent.mcp.disableTool` | Disable MCP tool |
| `kiroAgent.openWorkspaceMcpConfig` | Open workspace MCP config |
| `kiroAgent.openUserMcpConfig` | Open user MCP config |

## Account & Subscription Commands

| Command | Description |
|---------|-------------|
| `kiro.accountDashboard.showDashboard` | Show account dashboard |
| `kiro.subscriptionPlans.showSubscriptionPlans` | Show subscription plans |
| `kiro.profiles.showProfileSelector` | Show profile selector |
| `kiro.usageLimits.getUsageLimits` | Get usage limits |

## Model Commands

| Command | Description |
|---------|-------------|
| `kiro.agentModels.getAvailableModels` | Get available models |
| `kiro.agentModels.getModelsList` | Get models list |
| `kiro.agentModels.getSelectedModelId` | Get selected model ID |
| `kiro.agentModels.setSelectedModelId` | Set selected model ID |

## Code Actions

| Command | Description |
|---------|-------------|
| `kiroAgent.quickFix` | Apply quick fix |
| `kiroAgent.inlineChat.start` | Start inline chat |
| `kiroAgent.writeCommentsForCode` | Write comments for code |
| `kiroAgent.writeDocstringForCode` | Write docstring for code |
| `kiroAgent.fixCode` | Fix code |
| `kiroAgent.optimizeCode` | Optimize code |
| `kiroAgent.acceptDiff` | Accept diff |
| `kiroAgent.rejectDiff` | Reject diff |

## Utility Commands

| Command | Description |
|---------|-------------|
| `kiroAgent.generateCommitMessage` | Generate commit message |
| `kiroAgent.codebaseForceReIndex` | Force reindex codebase |
| `kiroAgent.rebuildCodebaseIndex` | Rebuild codebase index |
| `kiroAgent.viewLogs` | View logs |
| `kiroAgent.openSettingsUI` | Open settings UI |
| `kiroAgent.selectFilesAsContext` | Select files as context |
