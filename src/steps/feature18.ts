/**
 * Feature 18: Code Intelligence - Smart Navigation
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getFeature18CodeIntelligence(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Feature: Code Intelligence',
        content: `
            ${ctx.getEnhancedLessonBadge(9, 10, 'Code Intelligence - Smart Navigation')}

            <p>Code Intelligence gives Kiro deep understanding of your codebase with built-in support for 18 languages, symbol search, and the powerful /code overview command.</p>

            ${ctx.getCollapsibleSection('f18-intro', 1, 'What is Code Intelligence?', `
                <div class="info-box">
                    <strong>Code Intelligence</strong> provides semantic understanding of your code - not just text search, but actual comprehension of functions, classes, types, and their relationships.
                </div>

                <h4>Key Capabilities</h4>
                <div class="journey-container">
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Symbol Search</div>
                            <div class="journey-desc">Find functions, classes, types by name</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Code Overview</div>
                            <div class="journey-desc">Complete workspace analysis</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">Find References</div>
                            <div class="journey-desc">See where symbols are used</div>
                        </div>
                    </div>
                    <div class="journey-card">
                        <div class="journey-icon">
                            <svg viewBox="0 0 24 24"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                        </div>
                        <div class="journey-content">
                            <div class="journey-title">18 Languages</div>
                            <div class="journey-desc">No LSP setup required</div>
                        </div>
                    </div>
                </div>

                <h4 style="margin-top: 16px;">Supported Languages</h4>
                <p style="color: var(--kiro-text-secondary);">TypeScript, JavaScript, Python, Go, Rust, Java, C#, C++, Ruby, PHP, Swift, Kotlin, Scala, Elixir, Haskell, OCaml, Zig, and more.</p>
            `, null, true)}

            ${ctx.getCollapsibleSection('f18-overview', 2, 'The /code overview Command', `
                <p>Get a complete picture of any workspace in seconds:</p>

                <h4>What It Shows</h4>
                <div class="info-item">
                    <strong>Project Structure</strong>
                    <p>Directory layout with purpose annotations</p>
                </div>
                <div class="info-item">
                    <strong>Key Entry Points</strong>
                    <p>Main files, exports, and public APIs</p>
                </div>
                <div class="info-item">
                    <strong>Dependencies</strong>
                    <p>Package relationships and versions</p>
                </div>
                <div class="info-item">
                    <strong>Architecture Patterns</strong>
                    <p>Detected patterns (MVC, microservices, etc.)</p>
                </div>

                <h4 style="margin-top: 16px;">Try It Now</h4>
                <button class="prompt-button" onclick="executePrompt('/code overview')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "/code overview"
                    </div>
                </button>

                <div class="tip-box">
                    <strong>Pro tip:</strong> Run /code overview when joining a new project or after major changes to refresh Kiro's understanding.
                </div>
            `)}

            ${ctx.getCollapsibleSection('f18-practice', 3, 'Hands-On: Navigate with Intelligence', `
                <p>Let's use Code Intelligence to explore and understand code:</p>

                <h4>Step 1: Find a Symbol</h4>
                <button class="prompt-button" onclick="executePrompt('Find all functions that handle authentication in this codebase. Show me their signatures and where they\\'re defined.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Find all authentication functions..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Step 2: Trace Usage</h4>
                <button class="prompt-button" onclick="executePrompt('Show me everywhere the User type is used. Include imports, function parameters, and variable declarations.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Show everywhere User type is used..."
                    </div>
                </button>

                <h4 style="margin-top: 16px;">Step 3: Understand Relationships</h4>
                <button class="prompt-button" onclick="executePrompt('Create a diagram showing how the main components in this project depend on each other. Focus on the data flow.')">
                    <div class="prompt-icon">
                        <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div class="prompt-text">
                        <div class="prompt-label">Send to Kiro</div>
                        "Create a component dependency diagram..."
                    </div>
                </button>

                <div class="tip-box" style="background: var(--kiro-warning-light); border-color: var(--kiro-warning);">
                    <strong>Note:</strong> Code Intelligence works best with well-structured projects. Results improve as Kiro learns your codebase patterns.
                </div>
            `)}

            ${ctx.getCollapsibleSection('f18-tips', 4, 'Getting the Most from Code Intelligence', `
                <h4>Effective Queries</h4>
                <div class="info-item">
                    <strong>Be Specific</strong>
                    <p>"Find the validateEmail function" beats "find validation code"</p>
                </div>
                <div class="info-item">
                    <strong>Use Type Names</strong>
                    <p>Reference exact type/class names when known</p>
                </div>
                <div class="info-item">
                    <strong>Ask for Context</strong>
                    <p>"Where is X defined and what calls it?"</p>
                </div>

                <h4 style="margin-top: 16px;">Common Use Cases</h4>
                <div class="code-block-container">
                    <div class="code-block"># Onboarding to new codebase
/code overview

# Understanding a module
"Explain the purpose and API of the auth/ directory"

# Impact analysis
"What would break if I rename UserService to AuthService?"

# Dead code detection
"Find exported functions that are never imported"</div>
                </div>

                <div class="tip-box" style="margin-top: 16px; background: var(--kiro-success-light); border-color: var(--kiro-success);">
                    <strong>Key Learning:</strong> Code Intelligence transforms Kiro from a text processor into a true code-aware assistant that understands structure, relationships, and semantics.
                </div>
            `)}
        `,
        actions: []
    };
}
