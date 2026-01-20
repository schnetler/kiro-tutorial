/**
 * Component styles - Cards, buttons, boxes
 */

export const componentStyles = `
    .journey-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin: 20px 0;
    }

    .journey-card {
        display: flex;
        align-items: flex-start;
        gap: 14px;
        padding: 16px;
        background: linear-gradient(135deg, var(--kiro-purple-100) 0%, var(--kiro-purple-50) 100%);
        border: 1px solid var(--kiro-purple-200);
        border-radius: var(--kiro-radius-md);
        transition: all var(--kiro-transition-fast);
        animation: fade-in-up 0.3s ease backwards;
    }

    .journey-card:nth-child(1) { animation-delay: 0ms; }
    .journey-card:nth-child(2) { animation-delay: 60ms; }
    .journey-card:nth-child(3) { animation-delay: 120ms; }

    .journey-card:hover {
        border-color: var(--kiro-purple-400);
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(127, 86, 217, 0.15);
    }

    .journey-icon {
        flex-shrink: 0;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--kiro-purple-200);
        border-radius: var(--kiro-radius-sm);
        padding: 6px;
        transition: all var(--kiro-transition-fast);
    }

    .journey-card:hover .journey-icon {
        background: var(--kiro-purple-300);
    }

    .journey-icon svg {
        width: 20px;
        height: 20px;
        stroke: var(--kiro-purple-600);
        stroke-width: 2;
        fill: none;
    }

    .journey-content {
        flex: 1;
    }

    .journey-title {
        font-weight: 600;
        font-size: 14px;
        color: var(--vscode-foreground);
        margin-bottom: 4px;
    }

    .journey-step {
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--kiro-purple-500);
        margin-bottom: 2px;
        font-weight: 600;
    }

    .journey-desc {
        font-size: 12px;
        color: var(--vscode-descriptionForeground);
        line-height: 1.4;
    }

    .spec-flow {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin: 20px 0;
        padding: 16px;
        background: var(--kiro-purple-50);
        border-radius: var(--kiro-radius-lg);
        border: 1px solid var(--kiro-purple-200);
    }

    .spec-flow-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        flex: 1;
    }

    .spec-flow-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(127, 86, 217, 0.15);
        border-radius: 10px;
        margin-bottom: 8px;
    }

    .spec-flow-icon svg {
        width: 22px;
        height: 22px;
        stroke: rgba(127, 86, 217, 1);
    }

    .spec-flow-label {
        font-weight: 600;
        font-size: 12px;
        color: var(--vscode-foreground);
        margin-bottom: 2px;
    }

    .spec-flow-desc {
        font-size: 10px;
        color: var(--vscode-descriptionForeground);
    }

    .spec-flow-arrow {
        color: rgba(127, 86, 217, 0.6);
        font-size: 18px;
        font-weight: bold;
    }

    .primary-cta {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
        padding: 14px 20px;
        margin: 20px 0;
        font-size: 15px;
        font-weight: 600;
        color: white;
        background: linear-gradient(135deg, rgba(127, 86, 217, 1) 0%, rgba(99, 60, 180, 1) 100%);
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(127, 86, 217, 0.3);
    }

    .primary-cta:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(127, 86, 217, 0.4);
    }

    .primary-cta:active {
        transform: translateY(0);
    }

    .primary-cta svg {
        width: 20px;
        height: 20px;
        stroke: white;
        fill: none;
    }

    .action-buttons {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin: 20px 0;
    }

    .action-buttons button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
        padding: 12px 16px;
        font-size: 14px;
        font-weight: 600;
        font-family: var(--vscode-font-family);
        color: white;
        background: linear-gradient(135deg, rgba(127, 86, 217, 1) 0%, rgba(99, 60, 180, 1) 100%);
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(127, 86, 217, 0.3);
    }

    .action-buttons button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(127, 86, 217, 0.4);
    }

    .action-buttons button:active {
        transform: translateY(0);
    }

    .action-buttons button svg {
        width: 18px;
        height: 18px;
        stroke: white;
        stroke-width: 2;
        fill: none;
    }

    .action-buttons button.secondary {
        background: linear-gradient(135deg, rgba(46, 160, 67, 1) 0%, rgba(35, 134, 54, 1) 100%);
        box-shadow: 0 4px 12px rgba(46, 160, 67, 0.3);
    }

    .action-buttons button.secondary:hover {
        box-shadow: 0 6px 20px rgba(46, 160, 67, 0.4);
    }

    .action-buttons button.clicked {
        background: linear-gradient(135deg, rgba(46, 160, 67, 0.8) 0%, rgba(35, 134, 54, 0.8) 100%);
        opacity: 0.9;
    }

    .action-buttons button.clicked:hover {
        opacity: 1;
    }

    .action-buttons button.locked {
        opacity: 0.4;
        cursor: not-allowed;
        background: linear-gradient(135deg, rgba(100, 100, 100, 1) 0%, rgba(80, 80, 80, 1) 100%);
        box-shadow: none;
    }

    .action-buttons button.locked:hover {
        opacity: 0.4;
        transform: none;
        box-shadow: none;
    }

    button {
        background-color: var(--vscode-button-background);
        color: var(--vscode-button-foreground);
        border: none;
        padding: 10px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        font-family: var(--vscode-font-family);
        transition: all 0.2s ease;
        text-align: left;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    button:hover {
        background-color: var(--vscode-button-hoverBackground);
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Code blocks */
    .code-block {
        background: var(--vscode-textCodeBlock-background);
        border: 1px solid var(--vscode-widget-border);
        border-radius: 6px;
        padding: 12px;
        margin: 12px 0;
        font-family: var(--vscode-editor-font-family), monospace;
        font-size: 12px;
        overflow-x: auto;
        white-space: pre-wrap;
        word-break: break-all;
    }

    /* Prompt button */
    .prompt-button {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 12px 16px;
        margin: 12px 0;
        background: linear-gradient(135deg, rgba(127, 86, 217, 0.15) 0%, rgba(99, 66, 179, 0.15) 100%);
        border: 1px solid rgba(127, 86, 217, 0.4);
        border-radius: 8px;
        cursor: pointer;
        text-align: left;
        transition: all 0.2s ease;
    }

    .prompt-button:hover {
        background: linear-gradient(135deg, rgba(127, 86, 217, 0.25) 0%, rgba(99, 66, 179, 0.25) 100%);
        border-color: rgba(127, 86, 217, 0.6);
    }

    .prompt-button .prompt-icon {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
    }

    .prompt-button .prompt-icon svg {
        width: 100%;
        height: 100%;
        stroke: rgba(127, 86, 217, 1);
        fill: none;
        stroke-width: 2;
    }

    .prompt-button .prompt-text {
        flex: 1;
        font-size: 13px;
        color: var(--vscode-foreground);
    }

    .prompt-button .prompt-label {
        font-size: 11px;
        color: rgba(127, 86, 217, 1);
        font-weight: 500;
    }

    /* Tip and warning boxes */
    .tip-box {
        background: var(--kiro-success-light);
        border: 1px solid rgba(46, 160, 67, 0.25);
        border-left: 3px solid var(--kiro-success);
        border-radius: var(--kiro-radius-sm);
        padding: 12px 14px;
        margin: 12px 0;
        font-size: 13px;
        line-height: 1.5;
        animation: fade-in 0.3s ease;
    }

    .tip-box strong {
        color: var(--kiro-success);
    }

    .info-item {
        background: var(--kiro-surface-elevated);
        border: 1px solid var(--kiro-border-subtle);
        border-radius: var(--kiro-radius-sm);
        padding: 12px 14px;
        margin: 8px 0;
        transition: border-color var(--kiro-transition-fast);
    }

    .info-item:hover {
        border-color: var(--kiro-border-default);
    }

    .info-item strong {
        display: block;
        margin-bottom: 4px;
        color: var(--vscode-foreground);
        font-size: 13px;
    }

    .info-item p {
        margin: 0;
        color: var(--vscode-descriptionForeground);
        font-size: 12px;
        line-height: 1.5;
    }

    .warning-box {
        background: var(--kiro-warning-light);
        border: 1px solid rgba(227, 179, 65, 0.25);
        border-left: 3px solid var(--kiro-warning);
        border-radius: var(--kiro-radius-sm);
        padding: 12px 14px;
        margin: 12px 0;
        font-size: 13px;
        line-height: 1.5;
        animation: fade-in 0.3s ease;
    }

    .warning-box strong {
        color: var(--kiro-warning);
    }

    /* Game controls list */
    .game-controls {
        background: var(--vscode-textCodeBlock-background);
        border-radius: 8px;
        padding: 16px;
        margin: 12px 0;
    }

    .game-controls li {
        margin-bottom: 8px;
        font-size: 13px;
    }

    .game-controls code {
        background: rgba(127, 86, 217, 0.2);
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: 500;
    }
`;
