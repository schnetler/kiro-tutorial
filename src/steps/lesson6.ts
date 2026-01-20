/**
 * Lesson 6: Complex Feature Implementation
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getLesson6Features(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Lesson 6: Complex Feature Implementation',
        content: `
            ${ctx.getEnhancedLessonBadge(6, 9, 'Complex Feature Implementation')}

            <p>Implement a multi-component feature using spec-driven development. Learn when structured planning outperforms chat-based iteration.</p>

            ${ctx.getCollapsibleSection('l6-feature', 1, 'The Feature: Email Verification', `
                <div class="info-box">
                    <strong>Goal:</strong> Add email verification to the authentication flow. Users must verify their email before playing the game.
                </div>

                <div class="warning-box">
                    <strong>Prerequisite:</strong> Refactoring from Lesson 5 should be complete.
                </div>

                <h4>Components Involved</h4>
                <div class="journey-container">
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">AWS Cognito</div>
                            <div class="journey-desc">Configure verification settings</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Server API</div>
                            <div class="journey-desc">Handle verification endpoints</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Client UI</div>
                            <div class="journey-desc">Verification flow screens</div>
                        </div>
                    </div>
                </div>

                <div class="tip-box">
                    <strong>Why Specs?</strong> Multi-component features benefit from upfront planning. Specs ensure all pieces work together before any code is written.
                </div>
            `, null, true)}

            ${ctx.getCollapsibleSection('l6-requirements', 2, 'Write Requirements', `
                <p>Start by creating a spec with clear requirements:</p>

                <button class="prompt-button" onclick="executePrompt('Create a spec for adding email verification to the game. Requirements: 1) Users receive a verification email after signup, 2) Unverified users see a verification pending screen, 3) Users can request to resend the verification email, 4) After verification, users can access the game.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Create a spec for email verification..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Requirements Should Cover</h4>
                <ul>
                    <li><strong>Happy path</strong> - Normal verification flow</li>
                    <li><strong>Resend flow</strong> - User didn't receive email</li>
                    <li><strong>Error handling</strong> - Invalid/expired codes</li>
                    <li><strong>Edge cases</strong> - Already verified, multiple attempts</li>
                </ul>

                <div class="tip-box">
                    <strong>Review carefully:</strong> Add any edge cases Kiro might have missed. The spec is your blueprint.
                </div>
            `)}

            ${ctx.getCollapsibleSection('l6-design', 3, 'Create Design', `
                <p>Generate the technical design from requirements:</p>

                <button class="prompt-button" onclick="executePrompt('Generate the technical design for the email verification spec. Include: Cognito configuration changes, API endpoint specifications, client component architecture, and error handling strategy.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Generate technical design..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Design Should Include</h4>
                <div class="code-block-container">
                    <div class="code-block"># API Endpoints
POST /auth/verify        - Submit verification code
POST /auth/resend-code   - Request new code
GET  /auth/status        - Check verification status

# Client Routes
/verify                  - Verification code entry
/verify-pending          - Waiting for verification</div>
                </div>

                <div class="tip-box">
                    <strong>Architecture decisions:</strong> This is your chance to shape how the feature is built. Review and modify before proceeding.
                </div>
            `)}

            ${ctx.getCollapsibleSection('l6-implement', 4, 'Implement & Test', `
                <p>Execute the tasks to implement the feature:</p>

                <button class="prompt-button" onclick="executePrompt('Implement the email verification feature according to the spec and design. Start with the Cognito configuration, then the server endpoints, and finally the client UI.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Implement email verification..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Testing Checklist</h4>
                <div class="info-item">
                    <strong>Test 1:</strong> New user signup
                    <p>Sign up with a new email, check for verification email</p>
                </div>
                <div class="info-item">
                    <strong>Test 2:</strong> Verification flow
                    <p>Enter the code from email, verify access is granted</p>
                </div>
                <div class="info-item">
                    <strong>Test 3:</strong> Resend functionality
                    <p>Request new code, verify it arrives and works</p>
                </div>
                <div class="info-item">
                    <strong>Test 4:</strong> Error handling
                    <p>Try invalid codes, expired codes, already verified accounts</p>
                </div>

                <button class="action-btn browser" onclick="openUrl('http://localhost:5173')">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    Test in Game
                </button>

                <div class="tip-box" style="margin-top: 16px; background: var(--kiro-success-light); border-color: var(--kiro-success);">
                    <strong>Key Learning:</strong> Spec-driven development shines for complex, multi-component features. The upfront planning makes implementation smoother and reduces rework.
                </div>
            `)}
        `,
        actions: []
    };
}
