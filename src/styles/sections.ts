/**
 * Section styles - Collapsible sections, validation, inputs
 */

export const sectionStyles = `
    /* Collapsible sections */
    .collapsible-section {
        border: 1px solid var(--kiro-border-subtle);
        border-radius: var(--kiro-radius-md);
        margin: 12px 0;
        overflow: hidden;
        transition: border-color var(--kiro-transition-fast), box-shadow var(--kiro-transition-fast);
        animation: fade-in-up 0.3s ease backwards;
    }

    /* Staggered entrance for collapsible sections */
    .collapsible-section:nth-child(1) { animation-delay: 0ms; }
    .collapsible-section:nth-child(2) { animation-delay: 50ms; }
    .collapsible-section:nth-child(3) { animation-delay: 100ms; }
    .collapsible-section:nth-child(4) { animation-delay: 150ms; }
    .collapsible-section:nth-child(5) { animation-delay: 200ms; }
    .collapsible-section:nth-child(6) { animation-delay: 250ms; }

    .collapsible-section:hover {
        border-color: var(--kiro-border-default);
    }

    .collapsible-section.expanded {
        border-color: var(--kiro-purple-300);
        box-shadow: 0 2px 8px rgba(127, 86, 217, 0.1);
    }

    .collapsible-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 14px;
        background: var(--kiro-surface-elevated);
        cursor: pointer;
        transition: background var(--kiro-transition-fast);
    }

    .collapsible-header:hover {
        background: var(--kiro-purple-100);
    }

    .collapsible-section.expanded .collapsible-header {
        background: var(--kiro-purple-50);
    }

    .collapsible-header .chevron {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        transition: transform var(--kiro-transition-normal);
    }

    .collapsible-header .chevron svg {
        width: 100%;
        height: 100%;
        stroke: var(--vscode-descriptionForeground);
        fill: none;
        stroke-width: 2;
        transition: stroke var(--kiro-transition-fast);
    }

    .collapsible-section.expanded .collapsible-header .chevron {
        transform: rotate(90deg);
    }

    .collapsible-section.expanded .collapsible-header .chevron svg {
        stroke: var(--kiro-purple-600);
    }

    .collapsible-header .section-number {
        width: 24px;
        height: 24px;
        border-radius: var(--kiro-radius-sm);
        background: var(--kiro-purple-600);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 12px;
        flex-shrink: 0;
        transition: all var(--kiro-transition-fast);
    }

    .collapsible-section.expanded .collapsible-header .section-number {
        background: linear-gradient(135deg, var(--kiro-purple-600) 0%, var(--kiro-purple-700) 100%);
        box-shadow: 0 2px 6px var(--kiro-purple-300);
    }

    .collapsible-header .section-title {
        flex: 1;
        font-weight: 600;
        font-size: 13px;
        transition: color var(--kiro-transition-fast);
    }

    .collapsible-section.expanded .collapsible-header .section-title {
        color: var(--kiro-purple-600);
    }

    .collapsible-header .section-status {
        font-size: 14px;
        transition: transform var(--kiro-transition-fast);
    }

    .collapsible-section.expanded .collapsible-header .section-status {
        transform: scale(1.1);
    }

    .collapsible-content {
        display: none;
        padding: 14px;
        border-top: 1px solid var(--kiro-border-subtle);
    }

    .collapsible-section.expanded .collapsible-content {
        display: block;
        animation: fade-in 0.2s ease;
    }

    /* Validation check items */
    .validation-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        background: var(--vscode-textCodeBlock-background);
        border-radius: 6px;
        margin: 8px 0;
    }

    .validation-item .check-info {
        flex: 1;
    }

    .validation-item .check-name {
        font-weight: 500;
        font-size: 13px;
    }

    .validation-item .check-desc {
        font-size: 11px;
        color: var(--vscode-descriptionForeground);
    }

    .validation-item .check-btn {
        padding: 4px 12px;
        font-size: 12px;
        border-radius: 4px;
        cursor: pointer;
        border: none;
        background: rgba(127, 86, 217, 0.2);
        color: var(--vscode-foreground);
        transition: all 0.2s;
    }

    .validation-item .check-btn:hover {
        background: rgba(127, 86, 217, 0.4);
    }

    .validation-item .install-btn {
        padding: 4px 12px;
        font-size: 12px;
        border-radius: 4px;
        cursor: pointer;
        border: none;
        background: rgba(56, 139, 253, 0.3);
        color: var(--vscode-foreground);
        transition: all 0.2s;
    }

    .validation-item .install-btn:hover {
        background: rgba(56, 139, 253, 0.5);
    }

    .validation-item .status-icon {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }

    .validation-item .status-icon.pass {
        color: rgba(46, 160, 67, 1);
    }

    .validation-item .status-icon.fail {
        color: rgba(248, 81, 73, 1);
    }

    .validation-item .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid var(--vscode-descriptionForeground);
        border-top-color: rgba(127, 86, 217, 1);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    .validation-item .check-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* AWS Profile input */
    .profile-input-group {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        background: var(--vscode-textCodeBlock-background);
        border-radius: 6px;
        margin: 8px 0;
    }

    .profile-input-group label {
        font-weight: 500;
        font-size: 13px;
        white-space: nowrap;
    }

    .profile-input-group input {
        flex: 1;
        padding: 6px 10px;
        border: 1px solid var(--vscode-input-border);
        background: var(--vscode-input-background);
        color: var(--vscode-input-foreground);
        border-radius: 4px;
        font-size: 13px;
        font-family: var(--vscode-font-family);
        min-width: 80px;
    }

    .profile-input-group input:focus {
        outline: 1px solid var(--vscode-focusBorder);
        border-color: var(--vscode-focusBorder);
    }

    /* Action buttons within collapsible content */
    .action-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        padding: 10px 14px;
        margin: 8px 0;
        background: linear-gradient(135deg, rgba(127, 86, 217, 0.15) 0%, rgba(99, 66, 179, 0.15) 100%);
        border: 1px solid rgba(127, 86, 217, 0.3);
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        color: var(--vscode-foreground);
        text-align: left;
        transition: all 0.2s ease;
    }

    .action-btn:hover {
        background: linear-gradient(135deg, rgba(127, 86, 217, 0.25) 0%, rgba(99, 66, 179, 0.25) 100%);
        border-color: rgba(127, 86, 217, 0.5);
    }

    .action-btn svg {
        width: 16px;
        height: 16px;
        stroke: rgba(127, 86, 217, 1);
        fill: none;
        stroke-width: 2;
        flex-shrink: 0;
    }

    .action-btn.terminal {
        background: linear-gradient(135deg, rgba(46, 160, 67, 0.15) 0%, rgba(35, 134, 54, 0.15) 100%);
        border-color: rgba(46, 160, 67, 0.3);
    }

    .action-btn.terminal:hover {
        background: linear-gradient(135deg, rgba(46, 160, 67, 0.25) 0%, rgba(35, 134, 54, 0.25) 100%);
        border-color: rgba(46, 160, 67, 0.5);
    }

    .action-btn.terminal svg {
        stroke: rgba(46, 160, 67, 1);
    }

    .action-btn.browser {
        background: linear-gradient(135deg, rgba(56, 139, 253, 0.15) 0%, rgba(31, 111, 235, 0.15) 100%);
        border-color: rgba(56, 139, 253, 0.3);
    }

    .action-btn.browser:hover {
        background: linear-gradient(135deg, rgba(56, 139, 253, 0.25) 0%, rgba(31, 111, 235, 0.25) 100%);
        border-color: rgba(56, 139, 253, 0.5);
    }

    .action-btn.browser svg {
        stroke: rgba(56, 139, 253, 1);
    }

    /* Code block with copy */
    .code-block-container {
        position: relative;
        margin: 12px 0;
    }

    .code-block-container .copy-btn {
        position: absolute;
        top: 6px;
        right: 6px;
        padding: 4px 8px;
        font-size: 11px;
        background: rgba(127, 86, 217, 0.3);
        border: none;
        border-radius: 4px;
        cursor: pointer;
        color: var(--vscode-foreground);
        opacity: 0;
        transition: opacity 0.2s;
    }

    .code-block-container:hover .copy-btn {
        opacity: 1;
    }

    .code-block-container .copy-btn:hover {
        background: rgba(127, 86, 217, 0.5);
    }
`;
