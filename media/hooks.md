# Agent Hooks

Agent hooks are a powerful Kiro feature that **automatically shares your specs with AI assistants** based on triggers and conditions.

## What Are Agent Hooks?

Hooks inject context from your spec files into AI conversations, ensuring the AI always has the right information to help you effectively.

### How They Work

1. **Define hooks** in `.kiro/hooks.json`
2. **Set triggers** (onNewConversation, onFileChange, etc.)
3. **Specify content** to inject (files, sections)
4. **Automatic sharing** with AI agents

## Common Use Cases

### 🎯 Project Context Hook
Automatically shares requirements and design when starting a conversation

### 📏 Coding Standards Hook
Reminds AI of your style guide and conventions

### 🧪 Testing Hook
Ensures tests are written for new features

### 📚 Documentation Hook
Prompts for documentation updates

## Example Hook Configuration

```json
{
  "hooks": [
    {
      "name": "project-context",
      "trigger": "onNewConversation",
      "action": {
        "type": "injectContext",
        "content": [
          { "file": "requirements.md", "section": "all" },
          { "file": "design.md", "section": "Architecture Overview" }
        ]
      }
    }
  ]
}
```

## Benefits

✅ No need to repeatedly explain your project
✅ AI stays aligned with your architecture
✅ Consistent guidance across conversations
✅ Saves time and reduces errors

## Try It Now!

Click the **"Create hooks.json"** button above to set up your first agent hook!

---

**💡 Pro Tip:** Start simple with a basic context injection hook, then expand as you learn what's most helpful.
