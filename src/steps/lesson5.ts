/**
 * Lesson 5: Code Refactoring
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getLesson5Refactoring(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Lesson 5: Code Refactoring',
        content: `
            ${ctx.getEnhancedLessonBadge(5, 9, 'Code Refactoring')}

            <p>Apply DRY principles to eliminate code duplication. Learn how AI can identify patterns humans might miss and refactor safely across multiple files.</p>

            ${ctx.getCollapsibleSection('l5-context', 1, 'Why Refactor?', `
                <div class="info-box">
                    <strong>Context:</strong> Chat-coded projects often accumulate technical debt through duplicated patterns. Before adding new features, it's valuable to consolidate repeated logic.
                </div>

                <div class="warning-box">
                    <strong>Prerequisite:</strong> Interactions bug from Lesson 4 should be fixed.
                </div>

                <h4>Benefits of Refactoring</h4>
                <div class="journey-container">
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Maintainability</div>
                            <div class="journey-desc">Fix bugs in one place, not ten</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Readability</div>
                            <div class="journey-desc">Clearer, more focused code</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Testability</div>
                            <div class="journey-desc">Isolated, reusable functions</div>
                        </div>
                    </div>
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('l5-identify', 2, 'Find Duplication', `
                <p>Ask Kiro to analyze the codebase for duplicated patterns:</p>

                <button class="prompt-button" onclick="executePrompt('Analyze the codebase for duplicated patterns. Look for repeated logic in item handling, crafting operations, API responses, and UI components that could be extracted into shared utilities. Show me specific examples.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Find duplicated patterns in the codebase..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Common Duplication Areas</h4>
                <div class="info-item">
                    <strong>Item Validation</strong>
                    <p>Checking item types, quantities, and properties in multiple places</p>
                </div>
                <div class="info-item">
                    <strong>API Response Handling</strong>
                    <p>Similar error handling and data transformation logic</p>
                </div>
                <div class="info-item">
                    <strong>UI State Patterns</strong>
                    <p>Loading, error, and success states repeated across components</p>
                </div>
                <div class="info-item">
                    <strong>Event Handlers</strong>
                    <p>Similar interaction patterns for different game objects</p>
                </div>

                <div class="tip-box">
                    <strong>AI Advantage:</strong> AI can scan entire codebases instantly and spot patterns that would take humans hours to find manually.
                </div>
            `)}

            ${ctx.getCollapsibleSection('l5-extract', 3, 'Extract Common Logic', `
                <p>Once duplication is identified, ask Kiro to refactor:</p>

                <button class="prompt-button" onclick="executePrompt('Please refactor the duplicated patterns you identified. Extract common logic into shared utility functions and update all call sites to use them. Show me the before and after for each change.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Refactor the duplicated patterns..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Refactoring Best Practices</h4>
                <div class="code-block-container">
                    <div class="code-block">// Before: Duplicated validation
if (item.type === 'wood' && item.quantity > 0) { ... }
if (item.type === 'stone' && item.quantity > 0) { ... }

// After: Extracted utility
const isValidItem = (item, type) =>
  item.type === type && item.quantity > 0;

if (isValidItem(item, 'wood')) { ... }
if (isValidItem(item, 'stone')) { ... }</div>
                </div>

                <div class="warning-box">
                    <strong>Review carefully:</strong> AI sometimes over-abstracts. Reject changes that add complexity without clear benefit. Simple duplication is sometimes better than a complex abstraction.
                </div>
            `)}

            ${ctx.getCollapsibleSection('l5-verify', 4, 'Verify & Test', `
                <p>After refactoring, thoroughly test that nothing broke:</p>

                <div class="info-item">
                    <strong>Test 1:</strong> Core gameplay
                    <p>Move around, pick up items, interact with objects</p>
                </div>
                <div class="info-item">
                    <strong>Test 2:</strong> Crafting system
                    <p>All recipes should still work correctly</p>
                </div>
                <div class="info-item">
                    <strong>Test 3:</strong> Edge cases
                    <p>Empty inventory, full inventory, rapid interactions</p>
                </div>

                <button class="action-btn browser" onclick="openUrl('http://localhost:5173')">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    Test Game
                </button>

                <div class="tip-box" style="margin-top: 16px;">
                    <strong>Optional:</strong> Ask Kiro to run any existing tests to verify the refactoring didn't break anything.
                </div>

                <button class="prompt-button" onclick="executePrompt('Run the tests to verify the refactoring didnt break anything. If there are test failures, fix them.')" style="margin-top: 8px;">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Run tests and fix any failures..."
                    </div>
                </button>

                <div class="tip-box" style="margin-top: 16px; background: var(--kiro-success-light); border-color: var(--kiro-success);">
                    <strong>Key Learning:</strong> Regular refactoring prevents technical debt accumulation. AI excels at finding patterns across large codebases that humans might miss.
                </div>
            `)}
        `,
        actions: []
    };
}
