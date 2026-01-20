/**
 * Layout styles - Header, navigation, progress
 */

export const layoutStyles = `
    .header {
        padding: 16px;
        background: linear-gradient(180deg, var(--vscode-sideBarSectionHeader-background) 0%, var(--vscode-sideBar-background) 100%);
        border-bottom: 1px solid var(--kiro-border-subtle);
        position: sticky;
        top: 0;
        z-index: 10;
    }

    .header h1 {
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 4px;
        letter-spacing: -0.01em;
    }

    .header-subtitle {
        font-size: 11px;
        color: var(--vscode-descriptionForeground);
        margin-bottom: 10px;
    }

    .progress-bar {
        width: 100%;
        height: 3px;
        background-color: var(--kiro-border-subtle);
        border-radius: 3px;
        overflow: hidden;
        margin-top: 8px;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--kiro-success) 0%, var(--kiro-purple-600) 100%);
        border-radius: 3px;
        transition: width 0.4s ease;
    }

    .progress-text {
        font-size: 11px;
        color: var(--vscode-descriptionForeground);
        margin-top: 4px;
    }

    .steps-nav-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 14px;
    }

    .steps-section {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .section-label {
        font-size: 9px;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--vscode-descriptionForeground);
        min-width: 60px;
        letter-spacing: 0.8px;
        opacity: 0.7;
    }

    .steps-nav {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
    }

    .step-dot {
        width: 30px;
        height: 30px;
        border-radius: var(--kiro-radius-sm);
        background-color: var(--kiro-surface-elevated);
        color: var(--vscode-descriptionForeground);
        border: 1px solid var(--kiro-border-subtle);
        cursor: pointer;
        font-size: 11px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--kiro-transition-fast);
        position: relative;
    }

    .step-dot:hover {
        background-color: var(--kiro-purple-100);
        border-color: var(--kiro-purple-300);
        color: var(--kiro-purple-600);
        transform: translateY(-1px);
    }

    .step-dot:active {
        transform: translateY(0) scale(0.97);
    }

    .step-dot.active {
        background: linear-gradient(135deg, var(--kiro-purple-600) 0%, var(--kiro-purple-700) 100%);
        color: white;
        border-color: transparent;
        font-weight: 700;
        box-shadow: 0 2px 8px var(--kiro-purple-300), 0 0 0 2px var(--kiro-purple-200);
        animation: step-pulse 2s ease infinite;
    }

    .step-dot.active:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px var(--kiro-purple-300), 0 0 0 2px var(--kiro-purple-200);
    }

    .step-dot.completed {
        background-color: var(--kiro-success);
        border-color: transparent;
        color: white;
        box-shadow: 0 1px 4px rgba(46, 160, 67, 0.3);
    }

    .step-dot.completed:hover {
        background-color: #2da44e;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(46, 160, 67, 0.4);
    }

    .step-dot.completed span {
        display: none;
    }

    .step-dot.completed::after {
        content: '✓';
        font-size: 13px;
        font-weight: 700;
    }

    .navigation {
        display: flex;
        gap: 8px;
        padding: 16px;
        border-top: 1px solid var(--vscode-sideBarSectionHeader-border);
        position: sticky;
        bottom: 0;
        background-color: var(--vscode-sideBar-background);
    }

    .navigation button {
        flex: 1;
    }
`;
