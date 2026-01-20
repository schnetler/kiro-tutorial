/**
 * Timeline styles - Timeline, lesson badges, progress
 */

export const timelineStyles = `
    .timeline-container {
        display: flex;
        flex-direction: column;
        gap: 0;
        margin: 16px 0;
    }

    .timeline-item {
        display: flex;
        gap: 14px;
        position: relative;
        padding: 8px 12px 16px 0;
        border-radius: var(--kiro-radius-sm);
        transition: background var(--kiro-transition-fast);
        animation: fade-in-up 0.3s ease backwards;
    }

    .timeline-item:nth-child(1) { animation-delay: 0ms; }
    .timeline-item:nth-child(2) { animation-delay: 40ms; }
    .timeline-item:nth-child(3) { animation-delay: 80ms; }
    .timeline-item:nth-child(4) { animation-delay: 120ms; }
    .timeline-item:nth-child(5) { animation-delay: 160ms; }
    .timeline-item:nth-child(6) { animation-delay: 200ms; }
    .timeline-item:nth-child(7) { animation-delay: 240ms; }
    .timeline-item:nth-child(8) { animation-delay: 280ms; }
    .timeline-item:nth-child(9) { animation-delay: 320ms; }

    .timeline-item:hover {
        background: var(--kiro-surface-hover);
    }

    .timeline-number {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--kiro-purple-500);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 13px;
        flex-shrink: 0;
        z-index: 1;
        transition: all var(--kiro-transition-fast);
    }

    .timeline-item:hover .timeline-number {
        background: var(--kiro-purple-600);
        box-shadow: 0 2px 8px var(--kiro-purple-300);
    }

    .timeline-item:not(:last-child)::before {
        content: '';
        position: absolute;
        left: 13px;
        top: 36px;
        bottom: 0;
        width: 2px;
        background: var(--kiro-purple-200);
        transition: background var(--kiro-transition-fast);
    }

    .timeline-item:hover:not(:last-child)::before {
        background: var(--kiro-purple-300);
    }

    .timeline-content {
        flex: 1;
        padding-top: 4px;
    }

    .timeline-title {
        font-weight: 600;
        margin-bottom: 2px;
        font-size: 13px;
        transition: color var(--kiro-transition-fast);
    }

    .timeline-item:hover .timeline-title {
        color: var(--kiro-purple-600);
    }

    .timeline-desc {
        font-size: 12px;
        color: var(--vscode-descriptionForeground);
        line-height: 1.4;
    }

    /* Interactive Timeline */
    .timeline-interactive {
        display: flex;
        flex-direction: column;
        gap: 0;
        margin: 16px 0;
        padding: 8px;
        background: var(--kiro-surface-elevated);
        border-radius: var(--kiro-radius-lg);
        border: 1px solid var(--kiro-border-subtle);
    }

    .timeline-item-interactive {
        display: flex;
        gap: 14px;
        position: relative;
        padding: 10px 12px;
        border-radius: var(--kiro-radius-sm);
        cursor: pointer;
        transition: all var(--kiro-transition-fast);
        animation: fade-in-up 0.3s ease backwards;
    }

    .timeline-item-interactive:nth-child(1) { animation-delay: 0ms; }
    .timeline-item-interactive:nth-child(2) { animation-delay: 30ms; }
    .timeline-item-interactive:nth-child(3) { animation-delay: 60ms; }
    .timeline-item-interactive:nth-child(4) { animation-delay: 90ms; }
    .timeline-item-interactive:nth-child(5) { animation-delay: 120ms; }
    .timeline-item-interactive:nth-child(6) { animation-delay: 150ms; }
    .timeline-item-interactive:nth-child(7) { animation-delay: 180ms; }
    .timeline-item-interactive:nth-child(8) { animation-delay: 210ms; }
    .timeline-item-interactive:nth-child(9) { animation-delay: 240ms; }

    .timeline-item-interactive:hover {
        background: var(--kiro-purple-50);
    }

    .timeline-item-interactive:active {
        transform: scale(0.99);
    }

    .timeline-item-interactive.completed {
        opacity: 0.85;
    }

    .timeline-item-interactive.completed:hover {
        opacity: 1;
    }

    .timeline-item-interactive.current {
        background: var(--kiro-purple-100);
        border: 1px solid var(--kiro-purple-300);
        margin: -1px;
    }

    .timeline-item-interactive.locked {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .timeline-item-interactive.locked:hover {
        background: transparent;
    }

    .timeline-node {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 13px;
        flex-shrink: 0;
        z-index: 1;
        transition: all var(--kiro-transition-fast);
    }

    .timeline-node.pending {
        background: var(--kiro-surface-hover);
        border: 2px solid var(--kiro-border-default);
        color: var(--vscode-descriptionForeground);
    }

    .timeline-node.current {
        background: linear-gradient(135deg, var(--kiro-purple-600) 0%, var(--kiro-purple-700) 100%);
        color: white;
        box-shadow: 0 0 0 4px var(--kiro-purple-200), 0 2px 8px var(--kiro-purple-300);
        animation: pulse-node 2s ease infinite;
    }

    .timeline-node.completed {
        background: var(--kiro-success);
        color: white;
        box-shadow: 0 2px 6px rgba(46, 160, 67, 0.3);
    }

    .timeline-node.completed::after {
        content: '✓';
        font-size: 14px;
    }

    .timeline-node.completed span {
        display: none;
    }

    .timeline-item-interactive:hover .timeline-node.pending {
        border-color: var(--kiro-purple-400);
        background: var(--kiro-purple-100);
    }

    .timeline-item-interactive:not(:last-child)::before {
        content: '';
        position: absolute;
        left: calc(12px + 16px);
        top: 42px;
        bottom: -10px;
        width: 2px;
        background: var(--kiro-border-default);
        transition: background var(--kiro-transition-fast);
    }

    .timeline-item-interactive.completed:not(:last-child)::before {
        background: var(--kiro-success);
    }

    .timeline-item-interactive.current:not(:last-child)::before {
        background: linear-gradient(to bottom, var(--kiro-purple-400) 0%, var(--kiro-border-default) 100%);
    }

    .timeline-info {
        flex: 1;
        padding-top: 6px;
        min-width: 0;
    }

    .timeline-info-title {
        font-weight: 600;
        font-size: 13px;
        margin-bottom: 2px;
        transition: color var(--kiro-transition-fast);
    }

    .timeline-item-interactive:hover .timeline-info-title {
        color: var(--kiro-purple-600);
    }

    .timeline-item-interactive.completed .timeline-info-title {
        color: var(--kiro-success);
    }

    .timeline-info-desc {
        font-size: 11px;
        color: var(--vscode-descriptionForeground);
        line-height: 1.4;
    }

    .timeline-status {
        display: flex;
        align-items: center;
        padding-top: 6px;
        font-size: 11px;
        font-weight: 500;
        color: var(--vscode-descriptionForeground);
        transition: all var(--kiro-transition-fast);
    }

    .timeline-item-interactive.current .timeline-status {
        color: var(--kiro-purple-600);
    }

    .timeline-item-interactive.completed .timeline-status {
        color: var(--kiro-success);
    }

    .timeline-status svg {
        width: 14px;
        height: 14px;
        margin-right: 4px;
    }

    .timeline-item-interactive:hover .timeline-status {
        transform: translateX(4px);
    }

    /* Lesson Badge */
    .lesson-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: var(--kiro-purple-100);
        border: 1px solid var(--kiro-purple-200);
        border-radius: 20px;
        padding: 4px 12px 4px 4px;
        margin-bottom: 12px;
        transition: all var(--kiro-transition-fast);
    }

    .lesson-badge:hover {
        border-color: var(--kiro-purple-300);
    }

    .lesson-badge .badge-number {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--kiro-purple-600);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 12px;
    }

    .lesson-badge .badge-text {
        font-size: 12px;
        font-weight: 500;
        color: var(--kiro-purple-600);
    }

    /* Enhanced Lesson Badge with Progress */
    .lesson-badge-enhanced {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 14px 16px;
        background: linear-gradient(135deg, var(--kiro-purple-100) 0%, var(--kiro-purple-50) 100%);
        border: 1px solid var(--kiro-purple-200);
        border-radius: var(--kiro-radius-lg);
        margin-bottom: 16px;
        animation: fade-in-up 0.3s ease;
    }

    .lesson-badge-enhanced .badge-header {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .lesson-badge-enhanced .badge-number {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background: linear-gradient(135deg, var(--kiro-purple-600) 0%, var(--kiro-purple-700) 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 14px;
        box-shadow: 0 2px 8px var(--kiro-purple-300);
    }

    .lesson-badge-enhanced .badge-info {
        flex: 1;
    }

    .lesson-badge-enhanced .badge-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--vscode-foreground);
        margin-bottom: 2px;
    }

    .lesson-badge-enhanced .badge-subtitle {
        font-size: 11px;
        color: var(--vscode-descriptionForeground);
    }

    .lesson-badge-enhanced .progress-dots {
        display: flex;
        gap: 6px;
        padding-top: 4px;
    }

    .lesson-badge-enhanced .progress-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--kiro-purple-200);
        transition: all var(--kiro-transition-normal);
    }

    .lesson-badge-enhanced .progress-dot.completed {
        background: var(--kiro-success);
        box-shadow: 0 0 6px var(--kiro-success-light);
    }

    .lesson-badge-enhanced .progress-dot.current {
        background: var(--kiro-purple-600);
        box-shadow: 0 0 0 3px var(--kiro-purple-200);
        animation: pulse-dot 2s ease infinite;
    }

    /* Sub-step navigation */
    .sub-step-indicator {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        background: rgba(127, 86, 217, 0.1);
        border-radius: 8px;
        margin-bottom: 16px;
        font-size: 13px;
    }

    .sub-step-indicator .step-text {
        font-weight: 500;
        color: rgba(127, 86, 217, 1);
    }

    .sub-step-nav {
        display: flex;
        gap: 8px;
        margin-top: 20px;
        padding-top: 16px;
        border-top: 1px solid var(--vscode-widget-border);
    }

    .sub-step-nav button {
        flex: 1;
        padding: 10px 16px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        transition: all 0.2s ease;
    }

    .sub-step-nav button.prev {
        background: var(--vscode-button-secondaryBackground);
        color: var(--vscode-button-secondaryForeground);
    }

    .sub-step-nav button.next {
        background: linear-gradient(135deg, rgba(127, 86, 217, 0.9) 0%, rgba(99, 66, 179, 0.9) 100%);
        color: white;
    }

    .sub-step-nav button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;
