/**
 * Helper functions for generating HTML components
 */

import { HelperState } from '../types';

// Re-export platform helpers
export * from './platform';

/**
 * Generate a collapsible section
 */
export function getCollapsibleSection(
    state: HelperState,
    id: string,
    number: number,
    title: string,
    content: string,
    status?: 'complete' | 'pending' | null,
    defaultExpanded?: boolean
): string {
    // Default: section 1 is expanded by default, others are collapsed
    const shouldDefaultExpand = defaultExpanded ?? (number === 1);
    const isExpanded = shouldDefaultExpand
        ? !state.expandedSections.has(id)
        : state.expandedSections.has(id);
    const expandedClass = isExpanded ? ' expanded' : '';
    const statusIcon = status === 'complete' ? '✓' : status === 'pending' ? '○' : '';

    return `
        <div class="collapsible-section${expandedClass}">
            <div class="collapsible-header" onclick="toggleSection('${id}')">
                <div class="chevron">
                    <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
                <div class="section-number">${number}</div>
                <div class="section-title">${title}</div>
                ${statusIcon ? `<div class="section-status">${statusIcon}</div>` : ''}
            </div>
            <div class="collapsible-content">
                ${content}
            </div>
        </div>
    `;
}

/**
 * Generate an enhanced lesson badge with progress dots
 */
export function getEnhancedLessonBadge(
    state: HelperState,
    currentLesson: number,
    totalLessons: number,
    title: string
): string {
    const dots = [];
    for (let i = 1; i <= totalLessons; i++) {
        let dotClass = 'progress-dot';
        if (state.completedSteps.has(i + 5)) {
            // Lessons start at step 6
            dotClass += ' completed';
        } else if (i === currentLesson) {
            dotClass += ' current';
        }
        dots.push(`<div class="${dotClass}"></div>`);
    }

    return `
        <div class="lesson-badge-enhanced">
            <div class="badge-header">
                <div class="badge-number">${currentLesson}</div>
                <div class="badge-info">
                    <div class="badge-title">${title}</div>
                    <div class="badge-subtitle">Lesson ${currentLesson} of ${totalLessons}</div>
                </div>
            </div>
            <div class="progress-dots">
                ${dots.join('')}
            </div>
        </div>
    `;
}

/**
 * Generate an interactive timeline for lesson navigation
 */
export function getInteractiveTimeline(state: HelperState): string {
    const lessons = [
        { num: 1, title: 'Setup', desc: 'Environment configuration and game launch', step: 7 },
        { num: 2, title: 'Improve Homepage', desc: 'Project understanding and UI enhancement', step: 8 },
        { num: 3, title: 'Physics Glitch', desc: 'Debugging subtle timing issues', step: 9 },
        { num: 4, title: 'Interactions Bug', desc: 'Complex multi-file corrections', step: 10 },
        { num: 5, title: 'DRY Refactor', desc: 'Code optimization patterns', step: 11 },
        { num: 6, title: 'Complex Features', desc: 'Email verification implementation', step: 12 },
        { num: 7, title: 'Agent Hooks', desc: 'Automation for asset management', step: 13 },
        { num: 8, title: 'MCP Integration', desc: 'Extending Kiro capabilities', step: 14 },
        { num: 9, title: 'Conclusion', desc: 'Wrap-up and next steps', step: 15 }
    ];

    const items = lessons.map((lesson) => {
        const isCompleted = state.completedSteps.has(lesson.step);
        const isCurrent = state.currentStep === lesson.step;

        let stateClass = '';
        let nodeClass = '';
        let statusHtml = '';

        if (isCompleted) {
            stateClass = 'completed';
            nodeClass = 'completed';
            statusHtml = `<div class="timeline-status">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Completed
            </div>`;
        } else if (isCurrent) {
            stateClass = 'current';
            nodeClass = 'current';
            statusHtml = `<div class="timeline-status">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                In Progress
            </div>`;
        } else {
            stateClass = '';
            nodeClass = 'pending';
            statusHtml = `<div class="timeline-status">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                Start
            </div>`;
        }

        return `
            <div class="timeline-item-interactive ${stateClass}" onclick="navigateToStep(${lesson.step})">
                <div class="timeline-node ${nodeClass}">
                    <span>${lesson.num}</span>
                </div>
                <div class="timeline-info">
                    <div class="timeline-info-title">${lesson.title}</div>
                    <div class="timeline-info-desc">${lesson.desc}</div>
                </div>
                ${statusHtml}
            </div>
        `;
    });

    return `
        <div class="timeline-interactive">
            ${items.join('')}
        </div>
    `;
}

/**
 * Generate a validation check item
 */
export function getValidationItem(
    state: HelperState,
    name: string,
    checkId: string,
    description: string,
    installUrl?: string
): string {
    const result = state.validationResults.get(checkId);
    const isChecking = state.validationInProgress.has(checkId);
    let statusHtml = '';

    if (isChecking) {
        statusHtml = '<div class="spinner"></div>';
    } else if (result === true) {
        statusHtml = '<div class="status-icon pass">✓</div>';
    } else if (result === false) {
        statusHtml = `
            <div class="status-icon fail">✗</div>
            ${installUrl ? `<button class="install-btn" onclick="openUrl('${installUrl}')">Install</button>` : ''}
        `;
    } else {
        statusHtml = `<button class="check-btn" onclick="runValidation('${checkId}')">Check</button>`;
    }

    return `
        <div class="validation-item">
            <div class="check-info">
                <div class="check-name">${name}</div>
                <div class="check-desc">${description}</div>
            </div>
            ${statusHtml}
        </div>
    `;
}

/**
 * Generate an AWS profile input field
 */
export function getAwsProfileInput(state: HelperState): string {
    return `
        <div class="profile-input-group">
            <label>AWS Profile:</label>
            <input type="text" value="${state.awsProfile}" onchange="setAwsProfile(this.value)" placeholder="default">
        </div>
        <div class="profile-input-group">
            <label>AWS Region:</label>
            <input type="text" value="${state.awsRegion}" onchange="setAwsRegion(this.value)" placeholder="us-east-1">
        </div>
    `;
}

/**
 * Generate a code block with copy button
 */
export function getCodeBlockWithCopy(code: string): string {
    const escapedCode = code.replace(/'/g, "\\'").replace(/\n/g, '\\n');
    return `
        <div class="code-block-container">
            <div class="code-block">${code}</div>
            <button class="copy-btn" onclick="copyToClipboard('${escapedCode}')">Copy</button>
        </div>
    `;
}

/**
 * Generate a prompt button
 */
export function getPromptButton(prompt: string, label?: string): string {
    const escapedPrompt = prompt.replace(/'/g, "\\'").replace(/\n/g, '\\n');
    return `
        <button class="prompt-button" onclick="executePrompt('${escapedPrompt}')">
            <div class="prompt-icon">
                <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div class="prompt-text">${prompt}</div>
            ${label ? `<div class="prompt-label">${label}</div>` : ''}
        </button>
    `;
}
