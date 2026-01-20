# Design: Todo List Application

## Architecture Overview
A single-page application (SPA) built with vanilla JavaScript, HTML, and CSS. The app follows a simple Model-View pattern where:
- The DOM serves as the View
- JavaScript manages state and handles user interactions
- localStorage provides persistent data storage

## Technology Stack
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Storage**: Browser localStorage API
- **Styling**: Custom CSS with CSS variables for theming
- **Build**: None required - direct browser execution

## System Components

### Component 1: UI Layer (View)
- **Purpose**: Render the todo list and handle user interactions
- **Responsibilities**:
  - Display todo items in a list
  - Show/hide empty state message
  - Handle button clicks and checkbox changes
  - Update UI when todos change
- **Dependencies**: TodoManager (for data operations)

### Component 2: TodoManager (Model)
- **Purpose**: Manage todo data and localStorage operations
- **Responsibilities**:
  - Add new todos
  - Toggle todo completion status
  - Delete todos
  - Load todos from localStorage
  - Save todos to localStorage
- **Dependencies**: None

### Component 3: Event Handlers
- **Purpose**: Bridge user interactions to data operations
- **Responsibilities**:
  - Handle form submission (add todo)
  - Handle checkbox changes (toggle complete)
  - Handle delete button clicks
- **Dependencies**: TodoManager, UI Layer

## Data Models

### Todo Item
```javascript
{
    id: string,           // Unique identifier (timestamp-based)
    text: string,         // Todo description
    completed: boolean,   // Completion status
    createdAt: number     // Unix timestamp
}
```

### Storage Structure
```javascript
// Stored in localStorage under key "todos"
[
    { id: "1234567890", text: "Learn Kiro", completed: false, createdAt: 1234567890 },
    { id: "1234567891", text: "Build todo app", completed: true, createdAt: 1234567891 }
]
```

## UI Structure

### HTML Elements
- Input field for new todo text
- "Add" button to create new todos
- Unordered list (`<ul>`) to display todos
- Each todo item (`<li>`) contains:
  - Checkbox for completion toggle
  - Text label
  - Delete button

### CSS Styling
- Modern, minimal design
- Responsive layout (mobile-first)
- Strikethrough for completed todos
- Hover effects on interactive elements
- CSS variables for easy theming

## Design Decisions

### Decision 1: Use localStorage instead of a backend
- **Rationale**: Keeps the app simple, fast, and works offline. Perfect for a learning project.
- **Alternatives Considered**: Backend API with database, IndexedDB
- **Trade-offs**:
  - ✅ Pro: No server setup needed, instant access
  - ❌ Con: Data is device-specific, no sync across devices

### Decision 2: Vanilla JavaScript (no frameworks)
- **Rationale**: Focus on fundamentals, zero dependencies, fast load time
- **Alternatives Considered**: React, Vue, or other frameworks
- **Trade-offs**:
  - ✅ Pro: Simple, easy to understand, no build step
  - ❌ Con: More manual DOM manipulation code

### Decision 3: Timestamp-based IDs
- **Rationale**: Simple to generate, unique enough for this use case
- **Alternatives Considered**: UUID library, auto-incrementing integers
- **Trade-offs**:
  - ✅ Pro: No external dependencies, good enough uniqueness
  - ❌ Con: Not guaranteed unique if two todos created in same millisecond (unlikely in practice)

---

💡 **Implementation Note:** Keep the code organized with clear separation between UI rendering, data management, and event handling.
