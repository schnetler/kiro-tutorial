# Kiro Tutorial: Advanced Section Design Spec

## Overview

This document outlines the design direction for improving the **Advanced Section** (Steps 6-15) of the Kiro Tutorial extension. The goal is to achieve parity with the polish and interactivity of the starting sections while establishing a more refined, cohesive visual language throughout.

---

## Design Philosophy

### Aesthetic Direction: **Refined Technical**

A clean, purposeful interface that feels like a premium developer tool—not a generic onboarding wizard. Think: Linear's polish meets Stripe's documentation clarity.

**Core Principles:**
1. **Substance over decoration** — Every visual element serves a purpose
2. **Progressive disclosure** — Reveal complexity gradually, don't overwhelm
3. **Tactile feedback** — Interactions should feel responsive and satisfying
4. **Contextual immersion** — Keep users in the panel, minimize external jumps

---

## Current State Analysis

### Quality Distribution

```
┌─────────────────────────────────────────────────────────────────┐
│  POLISH LEVEL                                                    │
│                                                                  │
│  ████████████████████  Steps 0-5 (Basics)         ▓▓▓▓▓ HIGH    │
│  ████████████████      Step 6 (Spirit Intro)      ▓▓▓▓  MEDIUM  │
│  ███████████████       Steps 7-9 (Lessons 1-3)    ▓▓▓▓  GOOD    │
│  ██████                Steps 10-15 (Lessons 4-9)  ▓▓    LOW     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Problems to Solve

| Issue | Impact | Priority |
|-------|--------|----------|
| Lessons 4-9 are sparse stubs | Breaks immersion, feels unfinished | **P0** |
| "Open Guide" pattern exports users | Loses tutorial context | **P0** |
| No progress celebration | Completing feels unrewarding | **P1** |
| Timeline is non-interactive | Missed navigation opportunity | **P1** |
| Generic typography | No visual personality | **P2** |
| Minimal motion design | Feels static | **P2** |

---

## Visual Language

### Color System

Retain the purple-based palette but add more nuance:

```css
:root {
  /* Primary Purple Scale */
  --kiro-purple-50: rgba(127, 86, 217, 0.05);
  --kiro-purple-100: rgba(127, 86, 217, 0.1);
  --kiro-purple-200: rgba(127, 86, 217, 0.2);
  --kiro-purple-400: rgba(127, 86, 217, 0.6);
  --kiro-purple-500: rgba(127, 86, 217, 0.8);
  --kiro-purple-600: rgba(127, 86, 217, 1);
  --kiro-purple-700: rgba(99, 60, 180, 1);

  /* Semantic Colors */
  --kiro-success: rgba(46, 160, 67, 1);
  --kiro-success-bg: rgba(46, 160, 67, 0.1);
  --kiro-warning: rgba(227, 179, 65, 1);
  --kiro-warning-bg: rgba(227, 179, 65, 0.1);
  --kiro-info: rgba(56, 139, 253, 1);
  --kiro-info-bg: rgba(56, 139, 253, 0.1);

  /* Surface Colors */
  --kiro-surface-elevated: rgba(255, 255, 255, 0.03);
  --kiro-surface-hover: rgba(255, 255, 255, 0.06);
  --kiro-border-subtle: rgba(255, 255, 255, 0.08);
  --kiro-border-default: rgba(255, 255, 255, 0.12);
}
```

### Typography Hierarchy

While constrained by VS Code's font system, we can create hierarchy through weight and spacing:

```css
/* Display — Section titles, lesson names */
.display {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

/* Heading — Collapsible headers, subsections */
.heading {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.4;
}

/* Body — Main content */
.body {
  font-size: 13px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--vscode-foreground);
}

/* Caption — Descriptions, helper text */
.caption {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--vscode-descriptionForeground);
}

/* Mono — Code, commands */
.mono {
  font-family: var(--vscode-editor-font-family), 'SF Mono', Monaco, monospace;
  font-size: 12px;
  letter-spacing: -0.01em;
}
```

### Spacing Scale

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
```

---

## Component Redesigns

### 1. Lesson Badge (Enhanced)

**Current:** Static badge showing "Lesson X of 9"

**Proposed:** Progress-aware badge with visual completion indicator

```
┌─────────────────────────────────────────┐
│  ┌───┐                                  │
│  │ 3 │  Lesson 3 of 9                   │
│  └───┘  ●●○○○○○○○  (progress dots)      │
│                                         │
└─────────────────────────────────────────┘
```

```css
.lesson-badge-enhanced {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
  background: linear-gradient(
    135deg,
    var(--kiro-purple-100) 0%,
    var(--kiro-purple-50) 100%
  );
  border: 1px solid var(--kiro-purple-200);
  border-radius: 12px;
  margin-bottom: 16px;
}

.lesson-badge-enhanced .progress-dots {
  display: flex;
  gap: 6px;
}

.lesson-badge-enhanced .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--kiro-purple-200);
  transition: all 0.3s ease;
}

.lesson-badge-enhanced .dot.completed {
  background: var(--kiro-success);
}

.lesson-badge-enhanced .dot.current {
  background: var(--kiro-purple-600);
  box-shadow: 0 0 0 3px var(--kiro-purple-200);
}
```

### 2. Interactive Timeline (Step 6)

**Current:** Decorative vertical timeline, non-clickable

**Proposed:** Clickable navigation with hover states and completion tracking

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   ● ─── Setup                          [Completed ✓]   │
│   │     Environment configuration                       │
│   │                                                     │
│   ● ─── Improve Homepage               [Current →]     │
│   │     Project understanding                           │
│   │                                                     │
│   ○ ─── Physics Glitch                 [Locked 🔒]     │
│   │     Debugging timing issues                         │
│   ⋮                                                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

```css
.timeline-interactive {
  --timeline-line: var(--kiro-purple-200);
  --timeline-node-size: 32px;
}

.timeline-item-interactive {
  display: flex;
  gap: 16px;
  position: relative;
  padding: 12px;
  margin-left: 4px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.timeline-item-interactive:hover {
  background: var(--kiro-surface-hover);
}

.timeline-item-interactive.current {
  background: var(--kiro-purple-50);
  border: 1px solid var(--kiro-purple-200);
}

.timeline-item-interactive.locked {
  opacity: 0.5;
  cursor: not-allowed;
}

.timeline-node {
  width: var(--timeline-node-size);
  height: var(--timeline-node-size);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 13px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.timeline-node.completed {
  background: var(--kiro-success);
  color: white;
}

.timeline-node.current {
  background: var(--kiro-purple-600);
  color: white;
  box-shadow: 0 0 0 4px var(--kiro-purple-200);
}

.timeline-node.pending {
  background: var(--kiro-surface-elevated);
  border: 2px solid var(--kiro-border-default);
  color: var(--vscode-descriptionForeground);
}

/* Connecting line */
.timeline-item-interactive:not(:last-child)::before {
  content: '';
  position: absolute;
  left: calc(4px + var(--timeline-node-size) / 2);
  top: calc(12px + var(--timeline-node-size));
  bottom: -12px;
  width: 2px;
  background: var(--timeline-line);
}

.timeline-item-interactive.completed:not(:last-child)::before {
  background: var(--kiro-success);
}
```

### 3. Lesson Content Cards (For Sparse Lessons 4-9)

**Current:** Flat bullet lists with external links

**Proposed:** Rich content cards with inline interactivity

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌─ 1 ─────────────────────────────────────────────┐   │
│  │  Identify Interaction Bugs                       │   │
│  │                                                  │   │
│  │  The crafting system has issues when combining   │   │
│  │  certain items. Let's investigate.               │   │
│  │                                                  │   │
│  │  ┌──────────────────────────────────────────┐   │   │
│  │  │ 💬 "Show me the item interaction code"    │   │   │
│  │  └──────────────────────────────────────────┘   │   │
│  │                                                  │   │
│  │  Files to examine:                              │   │
│  │  • client/src/game/interactions.ts              │   │
│  │  • server/src/crafting/recipes.ts               │   │
│  │                                                  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─ 2 ─────────────────────────────────────────────┐   │
│  │  Map Affected Components                         │   │
│  │  ...                                             │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

```css
.lesson-step-card {
  border: 1px solid var(--kiro-border-subtle);
  border-radius: 10px;
  margin: 12px 0;
  overflow: hidden;
  transition: all 0.2s ease;
}

.lesson-step-card:hover {
  border-color: var(--kiro-border-default);
}

.lesson-step-card.active {
  border-color: var(--kiro-purple-400);
  box-shadow: 0 0 0 1px var(--kiro-purple-200);
}

.lesson-step-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--kiro-surface-elevated);
  cursor: pointer;
}

.lesson-step-number {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: var(--kiro-purple-600);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
}

.lesson-step-content {
  padding: 16px;
  border-top: 1px solid var(--kiro-border-subtle);
}

.lesson-step-content .file-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 12px 0;
}

.lesson-step-content .file-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--vscode-textCodeBlock-background);
  border-radius: 6px;
  font-family: var(--vscode-editor-font-family);
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.lesson-step-content .file-item:hover {
  background: var(--kiro-purple-100);
}
```

### 4. Completion Celebration

**Current:** Silent state change, small checkmark

**Proposed:** Animated celebration moment

```css
@keyframes celebrate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes checkmark-draw {
  0% {
    stroke-dashoffset: 24;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes confetti-burst {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px) scale(0.8);
  }
}

.completion-celebration {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  text-align: center;
  animation: celebrate 0.5s ease;
}

.completion-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--kiro-success) 0%, #1a7f37 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: 0 8px 24px rgba(46, 160, 67, 0.3);
}

.completion-icon svg {
  width: 32px;
  height: 32px;
  stroke: white;
  stroke-width: 3;
  stroke-dasharray: 24;
  animation: checkmark-draw 0.4s ease 0.2s forwards;
}

.completion-message {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.completion-submessage {
  font-size: 13px;
  color: var(--vscode-descriptionForeground);
  margin-bottom: 16px;
}

.completion-next-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, var(--kiro-purple-600) 0%, var(--kiro-purple-700) 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.completion-next-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(127, 86, 217, 0.4);
}
```

### 5. Prompt Button (Enhanced)

**Current:** Purple gradient border, functional but plain

**Proposed:** More tactile with typing indicator animation

```css
.prompt-button-enhanced {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  padding: 14px 16px;
  margin: 12px 0;
  background: linear-gradient(
    135deg,
    var(--kiro-purple-100) 0%,
    var(--kiro-purple-50) 100%
  );
  border: 1px solid var(--kiro-purple-200);
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.prompt-button-enhanced::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(127, 86, 217, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.prompt-button-enhanced:hover {
  border-color: var(--kiro-purple-400);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(127, 86, 217, 0.15);
}

.prompt-button-enhanced:hover::before {
  left: 100%;
}

.prompt-button-enhanced:active {
  transform: translateY(0);
}

.prompt-icon-container {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--kiro-purple-200);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.prompt-icon-container svg {
  width: 18px;
  height: 18px;
  stroke: var(--kiro-purple-600);
}

.prompt-content {
  flex: 1;
  min-width: 0;
}

.prompt-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--kiro-purple-600);
  margin-bottom: 4px;
}

.prompt-text {
  font-size: 13px;
  color: var(--vscode-foreground);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prompt-arrow {
  color: var(--kiro-purple-400);
  transition: transform 0.2s ease;
}

.prompt-button-enhanced:hover .prompt-arrow {
  transform: translateX(4px);
}
```

---

## Animation System

### Entrance Animations

```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Apply to step content on navigation */
.step-content {
  animation: fade-in-up 0.3s ease;
}

/* Stagger collapsible sections */
.collapsible-section:nth-child(1) { animation-delay: 0ms; }
.collapsible-section:nth-child(2) { animation-delay: 50ms; }
.collapsible-section:nth-child(3) { animation-delay: 100ms; }
.collapsible-section:nth-child(4) { animation-delay: 150ms; }
.collapsible-section:nth-child(5) { animation-delay: 200ms; }
.collapsible-section:nth-child(6) { animation-delay: 250ms; }
```

### Micro-interactions

```css
/* Collapsible expand/collapse */
.collapsible-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.25s ease;
}

.collapsible-section.expanded .collapsible-content {
  grid-template-rows: 1fr;
}

.collapsible-content > div {
  overflow: hidden;
}

/* Button press feedback */
.action-btn:active {
  transform: scale(0.98);
}

/* Validation spinner enhancement */
@keyframes pulse-ring {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

.validation-checking::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid var(--kiro-purple-400);
  border-radius: 50%;
  animation: pulse-ring 1s ease infinite;
}
```

---

## Content Structure: Lessons 4-9

Each sparse lesson should be rebuilt with this structure:

### Template for Full Lesson Content

```javascript
{
  title: 'Lesson X: [Title]',
  content: `
    ${this._getLessonBadgeEnhanced(X, 9, completedLessons)}

    <p class="lesson-intro">[One-sentence description of what they'll do]</p>

    ${this._getCollapsibleSection('lX-context', 1, 'Context & Goals', `
      <p>[Why this lesson matters]</p>

      <div class="learning-objectives">
        <h4>What You'll Learn</h4>
        <ul>
          <li>[Objective 1]</li>
          <li>[Objective 2]</li>
          <li>[Objective 3]</li>
        </ul>
      </div>

      <div class="prerequisite-check">
        [Any prerequisites or state checks]
      </div>
    `)}

    ${this._getCollapsibleSection('lX-step1', 2, '[First Action]', `
      <p>[Instructions]</p>

      ${this._getPromptButton('prompt-id', '[Prompt text]')}

      <div class="files-involved">
        ${this._getFileLink('path/to/file.ts')}
        ${this._getFileLink('path/to/other.ts')}
      </div>

      <div class="tip-box">
        <strong>Tip:</strong> [Helpful context]
      </div>
    `)}

    ${this._getCollapsibleSection('lX-step2', 3, '[Second Action]', `
      [More content...]
    `)}

    ${this._getCollapsibleSection('lX-step3', 4, '[Third Action]', `
      [More content...]
    `)}

    ${this._getCollapsibleSection('lX-verify', 5, 'Verify & Complete', `
      <p>Test your changes:</p>
      <ol>
        <li>[Verification step 1]</li>
        <li>[Verification step 2]</li>
      </ol>

      ${this._getCompletionButton()}
    `)}
  `,
  actions: []  // Actions now live inside collapsible sections
}
```

### Lesson 4 Example (Interactions Bug Fix)

```javascript
{
  title: 'Lesson 4: Interactions Bug Fix',
  content: `
    ${this._getLessonBadgeEnhanced(4, 9, completedLessons)}

    <p class="lesson-intro">Debug and fix multi-file issues in the AI-generated interactions system.</p>

    ${this._getCollapsibleSection('l4-context', 1, 'The Problem', `
      <p>The crafting interactions were originally "chat coded" and contain subtle bugs. Items sometimes fail to combine correctly, or produce unexpected results.</p>

      <div class="warning-box">
        <strong>Prerequisite:</strong> Physics bug from Lesson 3 should be fixed.
      </div>

      <h4>What You'll Learn</h4>
      <ul>
        <li>Multi-file debugging strategies</li>
        <li>Tracing data flow through components</li>
        <li>Validating AI-generated code</li>
      </ul>
    `, null, true)}

    ${this._getCollapsibleSection('l4-reproduce', 2, 'Reproduce the Bug', `
      <p>First, let's see the bug in action:</p>

      <ol>
        <li>Open the game and start a session</li>
        <li>Pull the lever to get a <strong>Wood</strong> and <strong>Stone</strong></li>
        <li>Place both items on the workbench</li>
        <li>Notice the unexpected crafting result</li>
      </ol>

      <button class="action-btn browser" onclick="openUrl('http://localhost:5173')">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
        Open Game
      </button>

      <div class="tip-box">
        <strong>What to look for:</strong> The combination should produce a Tool, but may produce nothing or an incorrect item.
      </div>
    `)}

    ${this._getCollapsibleSection('l4-investigate', 3, 'Investigate with Kiro', `
      <p>Ask Kiro to help trace the interaction flow:</p>

      <button class="prompt-button" onclick="executePrompt('I have a bug in the crafting system. When I combine Wood and Stone on the workbench, I get unexpected results. Can you trace the interaction flow from the client workbench component through to the server crafting logic and identify where the bug might be?')">
        <div class="prompt-icon"><svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/></svg></div>
        <div class="prompt-text">
          <div class="prompt-label">Send to Kiro</div>
          "I have a bug in the crafting system..."
        </div>
      </button>

      <h4>Key Files to Examine</h4>
      <div class="file-list">
        <button class="file-item" onclick="openFile('client/src/game/Workbench.tsx')">
          <svg viewBox="0 0 24 24" width="14" height="14"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/></svg>
          client/src/game/Workbench.tsx
        </button>
        <button class="file-item" onclick="openFile('server/src/crafting/recipes.ts')">
          <svg viewBox="0 0 24 24" width="14" height="14"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/></svg>
          server/src/crafting/recipes.ts
        </button>
        <button class="file-item" onclick="openFile('shared/types/interactions.ts')">
          <svg viewBox="0 0 24 24" width="14" height="14"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/></svg>
          shared/types/interactions.ts
        </button>
      </div>
    `)}

    ${this._getCollapsibleSection('l4-fix', 4, 'Implement the Fix', `
      <p>Once you understand the root cause, ask Kiro to fix it:</p>

      <button class="prompt-button" onclick="executePrompt('Based on your investigation, please fix the crafting interaction bug. Make sure Wood + Stone correctly produces a Tool, and verify the fix handles edge cases like missing items or invalid combinations.')">
        <div class="prompt-icon"><svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/></svg></div>
        <div class="prompt-text">
          <div class="prompt-label">Send to Kiro</div>
          "Please fix the crafting interaction bug..."
        </div>
      </button>

      <div class="tip-box">
        <strong>Multi-file changes:</strong> The fix may touch multiple files. Review each change before accepting.
      </div>
    `)}

    ${this._getCollapsibleSection('l4-verify', 5, 'Verify & Complete', `
      <p>Test the fix thoroughly:</p>

      <ol>
        <li>Refresh the game</li>
        <li>Test Wood + Stone → Tool</li>
        <li>Test other combinations work correctly</li>
        <li>Test edge cases (single item, wrong items)</li>
      </ol>

      <button class="action-btn browser" onclick="openUrl('http://localhost:5173')">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
        Test the Fix
      </button>

      <div class="tip-box" style="margin-top: 16px;">
        <strong>Key Learning:</strong> AI-generated code needs validation. Always trace data flow and test edge cases.
      </div>
    `)}
  `,
  actions: []
}
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Update CSS variables and color system
- [ ] Implement enhanced lesson badge with progress dots
- [ ] Add entrance animations to step content
- [ ] Improve collapsible section transitions

### Phase 2: Timeline & Navigation (Week 1-2)
- [ ] Make Step 6 timeline interactive/clickable
- [ ] Add completion state tracking to timeline
- [ ] Implement lesson quick-navigation

### Phase 3: Content Depth (Week 2-3)
- [ ] Rewrite Lesson 4 with full collapsible structure
- [ ] Rewrite Lesson 5 with full collapsible structure
- [ ] Rewrite Lesson 6 with full collapsible structure
- [ ] Rewrite Lesson 7 with full collapsible structure
- [ ] Rewrite Lesson 8 with full collapsible structure
- [ ] Update Lesson 9 conclusion with celebration

### Phase 4: Polish (Week 3)
- [ ] Add completion celebration animations
- [ ] Implement enhanced prompt buttons
- [ ] Add file-link click-to-open functionality
- [ ] Final animation timing refinements
- [ ] Cross-theme testing (light/dark)

---

## Accessibility Considerations

- Maintain keyboard navigation for all interactive elements
- Ensure sufficient color contrast (WCAG AA minimum)
- Respect `prefers-reduced-motion` for animations
- Maintain focus indicators on all interactive elements
- Screen reader announcements for state changes

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Success Metrics

1. **Completion rate** — Users who finish all 9 lessons (target: +20%)
2. **Time in panel** — Average time spent in tutorial panel per session
3. **External jumps** — Reduction in "Open Guide" clicks (target: -50%)
4. **Progression** — Percentage who reach Lesson 4+ (currently low)

---

## Open Questions

1. Should we add a "skip to advanced" option for experienced users?
2. Should lesson completion persist across VS Code sessions?
3. Should we add a "reset progress" option?
4. How do we handle Spirit of Kiro repo not being cloned for Lessons 4-9?

---

*Last updated: January 2026*
*Author: Design Spec for Kiro Tutorial v2*
