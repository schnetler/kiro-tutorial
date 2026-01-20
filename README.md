# Kiro Tutorial - VS Code Extension

An interactive VS Code extension that teaches Kiro through **project-based learning**. Build real applications using both Vibe and Spec modes, then level up to Spirit of Kiro game development!

## 🎯 Learning Path

This tutorial follows a progressive, hands-on approach:

### Part 1: Vibe Mode (Quick & Conversational)
Build a todo app quickly using Vibe mode
- Natural language prompts
- Rapid iteration
- Fast prototyping
- Learn when to use Vibe

### Part 2: Spec Mode (Structured & Planned)
Build the **same todo app** using Spec mode
- Create requirements.md, design.md, tasks.md
- Systematic approach
- Documentation-first
- Compare with Vibe experience

### Part 3: Spirit of Kiro (Real Game Development)
Level up with the official Kiro tutorial
- Fix bugs in a real game
- Multi-file refactoring
- Steering files
- Agent hooks & MCP extensions

## Features

### 🎯 Always-Visible Sidebar Panel
- **Dedicated activity bar icon** - Click to open the tutorial
- **Always accessible** - Tutorial stays visible while you work
- **Beautiful UI** - Modern design with progress tracking
- **Thunder Client-style** - Professional extension experience

### ✨ Interactive & Project-Based
- **Real projects** - Build actual todo apps, not toy examples
- **Progressive difficulty** - Start simple, level up to game dev
- **Hands-on learning** - Code alongside the tutorial
- **Compare approaches** - Experience Vibe vs Spec firsthand

### 📚 22 Tutorial Steps

**Basics (Steps 1-6)**
1. **Welcome to Kiro** - Introduction to Vibe vs Spec modes
2. **Part 1: Vibe Mode** - Build todo app quickly
3. **Part 2: Spec Mode** - Build same app with planning
4. **Vibe vs Spec: Compare** - Understand the trade-offs
5. **Part 3: Spirit of Kiro** - Introduction to the game
6. **Spirit: Prerequisites** - Setup for advanced lessons

**Advanced (Steps 7-15)**
7. **Spirit: Steering & Homepage** - Lessons 1-2
8. **Spirit: Debugging & Refactoring** - Lessons 3-5
9. **Spirit: Email & Hooks** - Lessons 6-7
10. **Spirit: MCP & Next Steps** - Lessons 8-9

**Features (Steps 16-22)** - New Kiro capabilities
11. **Kiro Powers** - Dynamic MCP tool loading with on-demand activation
12. **Checkpointing** - Roll back to any previous agent state
13. **Property-Based Testing** - Verify specs with random test generation
14. **Autonomous Agent** - Persistent context and multi-repo support
15. **Subagents** - Parallel task delegation with live tracking
16. **Plan Agent** - Structured implementation planning via /plan
17. **Web Tools** - Web search and URL fetching for research

### 🚀 Smart Session Launching
- **One-click Vibe sessions** - Opens Kiro chat with todo app prompt
- **One-click Spec sessions** - Creates spec files and launches with context
- **Automatic text insertion** - Prompts sent to Kiro automatically
- **Links to official docs** - Jump to Spirit of Kiro tutorials

## How to Use

### 1. Launch Extension Development Host

```bash
cd /Users/anwschne/work/kiro/kiro-tutorial
code .
# Press F5
```

### 2. Find the Kiro Icon

In the Extension Development Host window, look for the **Kiro icon in the activity bar** (left sidebar) and click it to open the tutorial panel.

### 3. Follow the Project-Based Tutorial

**Step 1: Start with Vibe Mode**
- Click "Start Vibe Mode Todo App" button
- Kiro chat opens with the todo app prompt
- Build the app conversationally
- Iterate quickly

**Step 2: Try Spec Mode**
- Click buttons to create requirements.md, design.md, tasks.md
- Review the generated spec files (real todo app specs!)
- Click "Start Spec Mode Session"
- Kiro will review your specs and help implement systematically

**Step 3: Compare & Reflect**
- Read about the trade-offs between approaches
- Decide when to use each mode

**Step 4: Level Up to Spirit of Kiro**
- Click links to official Spirit of Kiro tutorial
- Follow the 9-lesson game development course
- Learn advanced features: steering, hooks, MCP

## What Makes This Different

### ✅ Project-Based Learning
- **Not generic templates** - Real todo app specifications
- **Build something tangible** - Actual working applications
- **Progressive difficulty** - Todo app → Game development
- **Compare approaches** - Same project, two methods

### ✅ Interactive Sessions
- **Launches Kiro for you** - One-click session starts
- **Pre-written prompts** - Optimized for learning
- **Real development flow** - Exactly how you'd use Kiro

### ✅ Official Integration
- **Spirit of Kiro links** - Direct access to official tutorials
- **Documentation buttons** - Jump to Kiro docs
- **Best practices** - Learn the recommended way

## Project Structure

```
kiro-tutorial/
├── src/
│   ├── extension.ts          # Commands & Kiro integration
│   └── sidebarView.ts        # Tutorial UI & navigation
├── templates/                 # Todo app spec files
│   ├── requirements.md        # Real todo app requirements
│   ├── design.md              # Real todo app design
│   ├── tasks.md               # Real todo app task breakdown
│   └── hooks.json             # Sample hooks configuration
├── .prompts/                  # Custom Kiro prompts
│   ├── vibe-todo-app.prompt.md
│   ├── spec-todo-app.prompt.md
│   ├── create-requirements.prompt.md
│   ├── create-design.prompt.md
│   └── create-tasks.prompt.md
├── media/
│   └── icon.svg              # Activity bar icon
└── package.json              # Extension configuration
```

## Available Commands

### Session Commands
- `Kiro Tutorial: Start Vibe Session` - Launches Kiro with todo app Vibe prompt
- `Kiro Tutorial: Start Spec Session` - Launches Kiro with todo app Spec prompt

### File Creation Commands
- `Kiro: Create requirements.md` - Creates todo app requirements
- `Kiro: Create design.md` - Creates todo app design
- `Kiro: Create tasks.md` - Creates todo app task breakdown
- `Kiro: Create hooks.json` - Creates sample hooks config

### Documentation Commands
- `Kiro Tutorial: Open Spirit of Kiro Tutorial` - Opens official game tutorial
- `Kiro Tutorial: Open Spirit of Kiro Setup` - Opens setup instructions
- `Kiro Tutorial: Open Steering Documentation` - Opens steering docs
- `Kiro Tutorial: Open MCP Documentation` - Opens MCP docs
- `Kiro Tutorial: Open Kiro Documentation` - Opens main Kiro docs

## Example: Todo App Spec Files

When you click the Spec mode buttons, you get **real, complete specifications** for a todo app:

### requirements.md
- Functional requirements (add/delete/toggle todos)
- Non-functional requirements (performance, responsive design)
- Constraints (vanilla JS, localStorage)
- Out of scope (what we're NOT building)

### design.md
- Architecture overview (Model-View pattern)
- Technology stack (HTML/CSS/JS)
- Component breakdown (UI Layer, TodoManager, Event Handlers)
- Data models (Todo object structure)
- Design decisions with rationale

### tasks.md
- Sprint 1: Core Setup & Basic UI (3 tasks)
- Sprint 2: Core Functionality (4 tasks)
- Sprint 3: Persistence & Polish (3 tasks)
- Each task has subtasks, time estimates, dependencies, and acceptance criteria

## Development

```bash
# Compile TypeScript
npm run compile

# Watch mode (auto-compile)
npm run watch

# Debug: Set breakpoints and press F5
# Reload: Cmd+R in Extension Development Host
```

## Why This Approach Works

### 1. Learn by Building
You don't read about todo apps - you **build** one. Twice. Two different ways. Then you build a game.

### 2. Compare & Contrast
Experience Vibe and Spec modes with the same project. Understand the trade-offs firsthand.

### 3. Progressive Difficulty
- Start simple (todo app)
- Learn the concepts (Vibe vs Spec)
- Level up (real game development)

### 4. Real-World Integration
The Spirit of Kiro integration shows you how professional developers use Kiro on real projects.

## Testing Checklist

1. ✅ Press F5 to launch extension
2. ✅ Find Kiro icon in activity bar
3. ✅ Click icon to open sidebar
4. ✅ Click "Start Vibe Mode Todo App"
5. ✅ Verify Kiro chat opens with prompt
6. ✅ Navigate to Spec mode step
7. ✅ Click "Create requirements.md" button
8. ✅ Verify file created with todo app specs
9. ✅ Repeat for design.md and tasks.md
10. ✅ Click "Start Spec Mode Session"
11. ✅ Verify Kiro receives spec-focused prompt
12. ✅ Test Spirit of Kiro documentation links

## Future Enhancements

- Persist completed steps across sessions
- Add more example projects (calculator, weather app, etc.)
- Video walkthroughs embedded in steps
- Interactive code snippets
- Progress badges and achievements
- Export learning progress
- Community-contributed projects

## License

MIT

---

**Learn Kiro by building real projects! Start with Vibe, master Spec, level up with Spirit of Kiro.** 🚀
