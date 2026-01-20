# Kiro Vibe & Spec Mode Integration

## What's New

The Kiro Tutorial extension now includes **buttons to launch Vibe and Spec sessions** directly from the tutorial sidebar!

## Features Added

### 1. Welcome Step - Try Both Modes
```
Step 1: Welcome to Kiro
├── ⚡ Try Vibe Mode (Quick Start)
└── 💬 Try Spec Mode (Structured)
```

### 2. Design Step - Spec Session
```
Step 3: Design Architecture
├── 🏗️ Create design.md
├── 👁️  View Example Design
└── 💬 Start Spec Session (Design This)
```

### 3. Tasks Step - Vibe Session
```
Step 4: Break Down Tasks
├── ✅ Create tasks.md
├── ⚡ Start Vibe Session (Quick Coding)
└── 👁️  View Example Tasks
```

## How It Works

### Vibe Mode Button
- **Purpose**: Launch quick, conversational coding session
- **Command**: `kiro.startVibeSession`
- **When to use**: Rapid prototyping, quick tasks, exploratory coding
- **What happens**: Opens Kiro's Vibe session picker

### Spec Mode Button
- **Purpose**: Launch structured, spec-driven development session
- **Command**: `kiro.startSpecSession`
- **When to use**: Complex projects, team collaboration, documented development
- **What happens**: Opens Kiro's Spec session with requirements → design → tasks workflow

## Implementation Details

### Commands Added

1. **`kiro-tutorial.startVibeSession`**
   - Executes `kiro.startVibeSession` if available
   - Fallback: Shows informational message with link to docs
   - Location: Available from Welcome and Tasks steps

2. **`kiro-tutorial.startSpecSession`**
   - Executes `kiro.startSpecSession` if available
   - Fallback: Shows informational message with link to docs
   - Location: Available from Welcome and Design steps

### Code Changes

**src/extension.ts:**
```typescript
// Command: Start Kiro Vibe Session
vscode.commands.registerCommand('kiro-tutorial.startVibeSession', async () => {
    try {
        await vscode.commands.executeCommand('kiro.startVibeSession');
    } catch (error) {
        // Fallback message if Kiro not available
    }
});
```

**src/sidebarView.ts:**
```typescript
actions: [
    {
        icon: '⚡',
        label: 'Start Vibe Session (Quick Coding)',
        command: 'kiro-tutorial.startVibeSession',
        markComplete: false
    }
]
```

## Usage Example

### Scenario 1: New to Kiro
1. Open tutorial sidebar
2. Read "Welcome to Kiro" step
3. Click **"Try Vibe Mode"** button
4. Kiro opens session picker
5. Start chatting with AI for quick coding

### Scenario 2: Building a Feature
1. Navigate to "Design Architecture" step
2. Read about design.md
3. Click **"Start Spec Session"** button
4. Kiro opens spec-driven session
5. AI helps generate requirements → design → tasks

### Scenario 3: Quick Implementation
1. Go to "Break Down Tasks" step
2. Have tasks ready
3. Click **"Start Vibe Session"** button
4. Jump into coding with AI assistance

## Fallback Behavior

If Kiro's native commands aren't available (e.g., running in regular VS Code):

**Vibe Session:**
```
ℹ️ Vibe Mode: Start a quick, conversational coding session.
   In Kiro, use the session picker to choose "Vibe" mode
   for rapid prototyping and quick coding tasks.

   [Learn More]  [Dismiss]
```

**Spec Session:**
```
ℹ️ Spec Mode: Start a structured, specification-driven development session.
   In Kiro, use the session picker to choose "Spec" mode for
   generating requirements, design docs, and implementation tasks.

   [Learn More]  [Dismiss]
```

Clicking "Learn More" opens Kiro documentation.

## Benefits

### For Learners
- **Try before commit**: Test both modes from tutorial
- **Contextual**: Launch appropriate mode for each step
- **Smooth transition**: Go from learning to doing instantly

### For Workflow
- **Integrated**: No need to leave tutorial
- **Progressive**: Start with vibe, graduate to spec
- **Flexible**: Choose mode based on task complexity

### For Teaching
- **Show, don't tell**: Buttons demonstrate actual workflow
- **Hands-on**: Click to experience, not just read
- **Real integration**: Uses actual Kiro commands

## Testing

### In Kiro IDE
1. Press F5 to launch extension
2. Click Kiro icon in activity bar
3. Navigate to any step with mode buttons
4. Click "Try Vibe Mode" or "Try Spec Mode"
5. Verify Kiro session picker opens
6. Confirm correct mode is selected

### In Regular VS Code
1. Press F5 to launch extension
2. Click Kiro icon in activity bar
3. Click mode button
4. Verify fallback message appears
5. Click "Learn More"
6. Verify docs open in browser

## Future Enhancements

- Pre-populate session with tutorial examples
- Track which mode user prefers
- Add "Compare Modes" view
- Show session history
- Auto-load requirements.md into spec session
- Quick switch between modes mid-tutorial

## Resources

- [Kiro Vibe Mode Docs](https://kiro.dev/docs/chat/vibe/)
- [Kiro Spec Mode Docs](https://kiro.dev/docs/)
- [Vibe vs Spec Comparison](https://redmonk.com/rstephens/2025/07/31/spec-vs-vibes/)

## Summary

The tutorial now offers **real, clickable buttons** to launch Kiro sessions:

✅ **Vibe Mode** - Quick coding, conversational AI
✅ **Spec Mode** - Structured development, full workflow
✅ **Context-aware** - Right mode for each tutorial step
✅ **Fallback support** - Works even without Kiro commands
✅ **Seamless integration** - From learning to building instantly

Users can now **learn and practice** Kiro workflows directly from the tutorial! 🚀
