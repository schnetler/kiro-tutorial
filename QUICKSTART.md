# Quick Start - Kiro Tutorial Sidebar Extension

## 🚀 Launch It

```bash
cd /Users/anwschne/work/kiro/kiro-tutorial
code .
# Press F5
```

## 🎯 Where to Find It

### Look for the Kiro Icon
In the **Extension Development Host** window:

1. Look at the **activity bar** on the far left
2. Find the new **Kiro icon** (should appear at the bottom)
3. **Click the icon** to open the sidebar panel

```
Activity Bar (left edge):
┌─┐
│📁│ ← Explorer
│🔍│ ← Search
│⚡│ ← Source Control
│🐛│ ← Debug
│...│
│K │ ← KIRO ICON (click this!)
└─┘
```

## 📋 What You'll See

A beautiful sidebar panel opens with:

```
┌──────────────────────────────┐
│ Kiro Tutorial                │
│ Step 1 of 8: Welcome to Kiro │
│ ▓▓░░░░░░░░░░░░ 12%           │
│ [1] [2] [3] [4] [5] [6] ...  │ ← Click any number
├──────────────────────────────┤
│                              │
│ 📋 Welcome to Kiro           │
│                              │
│ Content with emojis,         │
│ formatted text, and          │
│ info boxes...                │
│                              │
│ ┌──────────────────────────┐ │
│ │ 📋 Create requirements   │ │ ← Big clickable buttons
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │ 👁️  View Example         │ │
│ └──────────────────────────┘ │
│                              │
├──────────────────────────────┤
│ [← Previous]    [Next →]     │ ← Navigation
└──────────────────────────────┘
```

## ✨ How to Use

### 1. Read the Content
Each step explains a Kiro concept

### 2. Click Big Buttons
- **"Create requirements.md"** → Creates file in your workspace
- **"View Example"** → Opens example for reference
- Files appear instantly and open automatically

### 3. Navigate
- **Next/Previous buttons** at bottom
- **Numbered dots** at top (click to jump)
- **Progress bar** shows completion

### 4. Watch Progress
- Steps turn green ✓ when completed
- Progress bar fills up
- Motivating!

## 🎮 Try These Actions

### Step 2: Create Requirements
```
1. Click "Create requirements.md" button
2. File appears in workspace ✓
3. File opens automatically ✓
4. Step marked complete ✓
5. Green checkmark appears ✓
```

### Step 7: Example Project
```
1. Click "Create Example Project" button
2. Creates 4 files:
   - requirements.md (Todo List app)
   - design.md (Full architecture)
   - tasks.md (Sprint breakdown)
   - .kiro/hooks.json (Hooks config)
3. All files open ✓
4. Complete example to explore ✓
```

## 🔧 Key Features

### Always Visible
- Sidebar stays open while you code
- Can resize, dock, minimize
- No hiding in menus!

### Interactive Buttons
- Real VS Code commands
- Create actual files
- Immediate feedback

### Progress Tracking
- Visual completion indicators
- Numbered steps (1-8)
- Green checkmarks for done steps
- Animated progress bar

### Beautiful Design
- Modern UI like Thunder Client
- VS Code theming (light/dark)
- Smooth animations
- Professional look

## 🐛 Troubleshooting

### Don't See the Icon?
- Restart Extension Development Host (Cmd+R)
- Check Debug Console for errors
- Recompile: `npm run compile`

### Sidebar Won't Open?
- Try Command Palette: `Cmd+Shift+P` → "Kiro: Open Tutorial Panel"
- Check if workspace folder is open

### Buttons Don't Work?
- Open a workspace folder first (File → Open Folder)
- Check notifications for error messages

### Need to Reload?
After making code changes:
- `Cmd+R` (Mac) or `Ctrl+R` (Windows) in Extension Development Host
- Or restart debugging with F5

## 📁 Files Created

When you click buttons, files appear in your workspace:

```
your-workspace/
├── requirements.md      ← Step 2
├── design.md           ← Step 3
├── tasks.md            ← Step 4
└── .kiro/
    └── hooks.json      ← Step 6
```

Example project adds complete examples to all files!

## 💡 Pro Tips

1. **Open a test folder** before starting
2. **Follow steps in order** for best experience
3. **Read all content** - lots of good info
4. **Try example project** to see Kiro in action
5. **Customize templates** after creation

## 🎯 Testing Checklist

- [ ] Press F5 to launch
- [ ] Find Kiro icon in activity bar
- [ ] Click icon to open sidebar
- [ ] See step 1 content
- [ ] Click Next button
- [ ] Click step dot to jump
- [ ] Click "Create requirements.md"
- [ ] Verify file created
- [ ] Verify file opened
- [ ] See green checkmark ✓
- [ ] Test all action buttons
- [ ] Navigate all 8 steps
- [ ] Try example project

## 📊 What Makes This Better?

### vs. Walkthrough API ❌
- Hidden in Help menu
- Static content
- Not always visible
- Limited interaction

### Sidebar Webview ✅
- Dedicated icon in activity bar
- Rich interactive UI
- Always visible
- Real buttons that work
- Progress tracking
- Beautiful design
- Like Thunder Client!

## 🚀 Ready to Test!

**Press F5 and look for the Kiro icon in the activity bar!**

The sidebar panel is where the magic happens - it's always there, beautifully designed, and actually does things when you click buttons.

No more hunting in menus! 🎉
