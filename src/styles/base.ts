/**
 * Base styles - Reset, design tokens, typography
 */

export const baseStyles = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        color: var(--vscode-foreground);
        background-color: var(--vscode-sideBar-background);
        padding: 0;
        overflow-x: hidden;

        /* Kiro Design System */
        --kiro-purple-50: rgba(127, 86, 217, 0.05);
        --kiro-purple-100: rgba(127, 86, 217, 0.1);
        --kiro-purple-200: rgba(127, 86, 217, 0.2);
        --kiro-purple-300: rgba(127, 86, 217, 0.4);
        --kiro-purple-400: rgba(127, 86, 217, 0.6);
        --kiro-purple-500: rgba(127, 86, 217, 0.8);
        --kiro-purple-600: rgba(127, 86, 217, 1);
        --kiro-purple-700: rgba(99, 60, 180, 1);

        --kiro-success: rgba(46, 160, 67, 1);
        --kiro-success-light: rgba(46, 160, 67, 0.15);
        --kiro-warning: rgba(227, 179, 65, 1);
        --kiro-warning-light: rgba(227, 179, 65, 0.15);
        --kiro-info: rgba(56, 139, 253, 1);
        --kiro-info-light: rgba(56, 139, 253, 0.15);

        --kiro-surface-elevated: rgba(255, 255, 255, 0.03);
        --kiro-surface-hover: rgba(255, 255, 255, 0.06);
        --kiro-border-subtle: rgba(255, 255, 255, 0.08);
        --kiro-border-default: rgba(255, 255, 255, 0.12);

        --kiro-radius-sm: 6px;
        --kiro-radius-md: 10px;
        --kiro-radius-lg: 12px;

        --kiro-transition-fast: 0.15s ease;
        --kiro-transition-normal: 0.25s ease;
        --kiro-transition-slow: 0.4s ease;
    }

    .content {
        padding: 16px;
    }

    .step-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 16px;
        color: var(--vscode-textLink-foreground);
        animation: fade-in-up 0.3s ease;
    }

    .step-content {
        line-height: 1.6;
        animation: fade-in-up 0.35s ease;
    }

    .step-content h2 {
        font-size: 16px;
        margin: 20px 0 12px 0;
        color: var(--vscode-textLink-foreground);
    }

    .step-content h3 {
        font-size: 14px;
        margin: 16px 0 8px 0;
    }

    .step-content p {
        margin-bottom: 12px;
    }

    .step-content ul, .step-content ol {
        margin: 12px 0;
        padding-left: 24px;
    }

    .step-content li {
        margin: 6px 0;
    }

    .step-content code {
        background-color: var(--vscode-textCodeBlock-background);
        padding: 2px 6px;
        border-radius: 3px;
        font-family: var(--vscode-editor-font-family);
        font-size: 0.9em;
    }

    .info-box {
        background-color: var(--vscode-editorInfo-background);
        border-left: 3px solid var(--vscode-editorInfo-foreground);
        padding: 12px;
        margin: 16px 0;
        border-radius: 3px;
    }

    .info-box strong {
        display: block;
        margin-bottom: 6px;
    }

    .icon {
        font-size: 16px;
    }

    .flow-arrow {
        text-align: center;
        font-size: 20px;
        color: var(--vscode-descriptionForeground);
        margin: 8px 0;
        opacity: 0.6;
    }
`;
