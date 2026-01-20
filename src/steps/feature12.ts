/**
 * Feature 12: Property-Based Testing - Verify Your Specs
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getFeature12PropertyTesting(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Feature: Property-Based Testing',
        content: `
            ${ctx.getEnhancedLessonBadge(3, 7, 'Property-Based Testing - Verify Your Specs')}

            <p>Property-based testing (PBT) generates hundreds of random test cases to find edge cases and verify your code matches your specifications.</p>

            ${ctx.getCollapsibleSection('f12-intro', 1, 'What is Property-Based Testing?', `
                <div class="info-box">
                    <strong>Property-Based Testing</strong> extracts properties from your specifications and tests them with randomly generated inputs. Unlike unit tests with fixed examples, PBT probes for counter-examples that break your assumptions.
                </div>

                <h4>Unit Tests vs Property-Based Tests</h4>
                <div class="journey-container">
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Unit Tests</div>
                            <div class="journey-desc">Test specific examples you think of</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="M12 18v4"/><path d="m19.07 19.07-2.83-2.83"/><path d="M22 12h-4"/><path d="m19.07 4.93-2.83 2.83"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Property Tests</div>
                            <div class="journey-desc">Hundreds of random cases find what you missed</div>
                        </div>
                    </div>
                </div>

                <h4 style="margin-top: 16px;">How Kiro Uses PBT</h4>
                <ol style="margin-left: 20px; color: var(--kiro-text-secondary);">
                    <li>Reads your spec (requirements.md, design.md)</li>
                    <li>Extracts testable properties</li>
                    <li>Generates random test inputs</li>
                    <li>Runs tests hundreds of times</li>
                    <li>Reports counter-examples that violate properties</li>
                    <li>Uses "shrinking" to find minimal failing cases</li>
                </ol>
            `, null, true)}

            ${ctx.getCollapsibleSection('f12-example', 2, 'Real Example: Finding Hidden Bugs', `
                <p>Property-based testing catches bugs that human intuition misses:</p>

                <div class="info-item">
                    <strong>Scenario: User Authentication</strong>
                    <p>Your spec says "usernames must be unique and case-insensitive"</p>
                </div>

                <div class="code-block-container">
                    <div class="code-block"># Property extracted from spec:
"For any two users with usernames that differ
only in case, registration should fail"

# PBT generates test cases:
- User "Admin" then "ADMIN" → should fail
- User "Test_User" then "test_user" → should fail
- User "John123" then "john123" → should fail
...runs 100+ variations</div>
                </div>

                <p style="margin-top: 12px;">On the 47th iteration, PBT finds that Unicode characters aren't being normalized - "Adm\u0131n" (Turkish dotless i) bypasses the uniqueness check!</p>

                <div class="tip-box" style="background: var(--kiro-warning-light); border-color: var(--kiro-warning);">
                    <strong>Real security bugs</strong> have been found this way. PBT found a prototype pollution vulnerability on the 75th test iteration that traditional testing would have missed.
                </div>
            `)}

            ${ctx.getCollapsibleSection('f12-practice', 3, 'Hands-On: Generate Property Tests', `
                <p>Let's generate property-based tests for a specification:</p>

                <h4>Step 1: Define a Spec Property</h4>
                <button class="prompt-button" onclick="executePrompt('Create a simple shopping cart module with these requirements: \\n- Cart total must equal sum of item prices \\n- Removing an item decreases total by that item\\'s price \\n- Empty cart has zero total \\n- Quantities must be positive integers')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Create a shopping cart with spec requirements..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Step 2: Generate Property Tests</h4>
                <button class="prompt-button" onclick="executePrompt('Generate property-based tests for the shopping cart. Test properties like: total calculation invariants, add/remove symmetry, and quantity constraints. Use fast-check or similar PBT library.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Generate property-based tests..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Step 3: Run and Analyze</h4>
                <p>Run the tests and observe how PBT explores edge cases:</p>
                <ul style="margin-left: 20px; color: var(--kiro-text-secondary);">
                    <li>Negative prices</li>
                    <li>Floating point precision issues</li>
                    <li>Very large quantities</li>
                    <li>Empty strings as item names</li>
                </ul>
            `)}

            ${ctx.getCollapsibleSection('f12-workflow', 4, 'PBT Workflow with Kiro', `
                <h4>When PBT Finds a Problem</h4>
                <p>Kiro gives you options when property tests fail:</p>

                <div class="info-item">
                    <strong>Fix the Implementation</strong>
                    <p>The code doesn't match the spec - update the code</p>
                </div>
                <div class="info-item">
                    <strong>Update the Spec</strong>
                    <p>The spec was too strict or had unintended implications</p>
                </div>
                <div class="info-item">
                    <strong>Refine the Test</strong>
                    <p>The property test itself had incorrect assumptions</p>
                </div>

                <h4 style="margin-top: 16px;">Best Properties to Test</h4>
                <div class="code-block-container">
                    <div class="code-block"># Round-trip properties
encode(decode(x)) == x

# Invariants
cart.total >= 0
sorted(list) is always sorted

# Symmetry
add(remove(x)) == identity
serialize(deserialize(x)) == x

# Idempotence
deduplicate(deduplicate(x)) == deduplicate(x)</div>
                </div>

                <button class="action-btn browser" onclick="openUrl('https://kiro.dev/blog/property-based-testing/')">
                    <svg viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>
                    Read PBT Deep Dive
                </button>

                <div class="tip-box" style="margin-top: 16px; background: var(--kiro-success-light); border-color: var(--kiro-success);">
                    <strong>Key Learning:</strong> Property-based testing bridges the gap between specs and code. It systematically verifies that your implementation matches the behavior you defined.
                </div>
            `)}
        `,
        actions: []
    };
}
