# Tasks: Todo List Application

## Sprint 1: Core Setup & Basic UI

### Task 1.1: Create HTML Structure
- [ ] Create `index.html` with basic document structure
- [ ] Add semantic HTML elements (header, main, form, list)
- [ ] Include input field and "Add" button in form
- [ ] Add empty `<ul>` element for todo list
- [ ] Link CSS and JavaScript files

**Estimated time**: 0.5 hours
**Dependencies**: None
**Acceptance Criteria**:
- Valid HTML5 document
- All required elements present
- Page displays correctly in browser

### Task 1.2: Create Basic CSS Styling
- [ ] Create `styles.css` file
- [ ] Add CSS reset/normalization
- [ ] Style the page layout (centered, max-width)
- [ ] Style the form and input elements
- [ ] Style the todo list container
- [ ] Add responsive styles for mobile

**Estimated time**: 1 hour
**Dependencies**: Task 1.1
**Acceptance Criteria**:
- Clean, modern appearance
- Responsive on mobile and desktop
- Good spacing and typography

### Task 1.3: Set Up JavaScript Module
- [ ] Create `app.js` file
- [ ] Create TodoManager class/object
- [ ] Add initial state array for todos
- [ ] Create helper function to generate unique IDs
- [ ] Add console.log to verify JavaScript is loaded

**Estimated time**: 0.5 hours
**Dependencies**: Task 1.1
**Acceptance Criteria**:
- JavaScript file loads without errors
- Basic structure in place
- Can verify in browser console

## Sprint 2: Core Functionality

### Task 2.1: Implement Add Todo Feature
- [ ] Create `addTodo(text)` function in TodoManager
- [ ] Add event listener to form submit
- [ ] Prevent default form submission
- [ ] Get input value and validate (not empty)
- [ ] Create new todo object with id, text, completed, createdAt
- [ ] Add todo to state array
- [ ] Clear input field after adding
- [ ] Re-render the todo list

**Estimated time**: 1.5 hours
**Dependencies**: Task 1.3
**Acceptance Criteria**:
- Can add new todos via form
- Input validates (no empty todos)
- Input clears after submission
- New todo appears in list

### Task 2.2: Implement Render Function
- [ ] Create `renderTodos()` function
- [ ] Clear existing list items
- [ ] Loop through todos array
- [ ] For each todo, create `<li>` element
- [ ] Add checkbox, label, and delete button to each item
- [ ] Set checkbox checked state based on todo.completed
- [ ] Apply strikethrough class to completed todos
- [ ] Append all items to the list container

**Estimated time**: 2 hours
**Dependencies**: Task 2.1
**Acceptance Criteria**:
- Todos display correctly in list
- Completed todos have strikethrough
- Each todo shows checkbox and delete button
- UI updates when todos change

### Task 2.3: Implement Toggle Complete Feature
- [ ] Create `toggleTodo(id)` function in TodoManager
- [ ] Find todo by id and flip completed boolean
- [ ] Add event listener to checkboxes (event delegation)
- [ ] Get todo id from event target
- [ ] Call toggleTodo with id
- [ ] Re-render the list

**Estimated time**: 1 hour
**Dependencies**: Task 2.2
**Acceptance Criteria**:
- Can check/uncheck todos
- Strikethrough appears/disappears correctly
- State updates properly

### Task 2.4: Implement Delete Todo Feature
- [ ] Create `deleteTodo(id)` function in TodoManager
- [ ] Filter todos array to remove item with matching id
- [ ] Add event listener to delete buttons (event delegation)
- [ ] Get todo id from event target
- [ ] Call deleteTodo with id
- [ ] Re-render the list

**Estimated time**: 1 hour
**Dependencies**: Task 2.2
**Acceptance Criteria**:
- Can delete todos by clicking delete button
- Todo is removed from list immediately
- No errors when deleting

## Sprint 3: Persistence & Polish

### Task 3.1: Add localStorage Persistence
- [ ] Create `saveTodos()` function that writes to localStorage
- [ ] Create `loadTodos()` function that reads from localStorage
- [ ] Call saveTodos() after add, toggle, and delete operations
- [ ] Call loadTodos() on page load/initialization
- [ ] Handle JSON parse errors gracefully
- [ ] Test persistence by refreshing the page

**Estimated time**: 1.5 hours
**Dependencies**: Tasks 2.1, 2.3, 2.4
**Acceptance Criteria**:
- Todos persist across page refreshes
- No errors if localStorage is empty
- JSON parsing errors handled gracefully

### Task 3.2: Add Empty State
- [ ] Create function to check if todos array is empty
- [ ] Create/show empty state message element when no todos
- [ ] Hide empty state when todos exist
- [ ] Style the empty state message
- [ ] Update render function to toggle empty state

**Estimated time**: 0.5 hours
**Dependencies**: Task 2.2
**Acceptance Criteria**:
- Shows friendly message when no todos
- Hides message when todos are added
- Good visual design

### Task 3.3: Final Polish & Testing
- [ ] Add focus state styles for accessibility
- [ ] Test keyboard navigation (Tab, Enter)
- [ ] Add transitions/animations for adding/removing todos
- [ ] Test on multiple browsers
- [ ] Test on mobile device or browser dev tools
- [ ] Fix any visual or functional bugs
- [ ] Add comments to code for clarity

**Estimated time**: 1.5 hours
**Dependencies**: All previous tasks
**Acceptance Criteria**:
- Smooth animations
- Works on all target browsers
- Keyboard accessible
- Code is well-commented
- No console errors

## Notes
- Use event delegation for checkbox and delete button clicks (more efficient than individual listeners)
- Keep state management simple - a single array of todo objects
- Test localStorage limits aren't hit (unlikely with a todo app, but good practice)
- Consider adding data-id attributes to DOM elements for easier event handling

---

💡 **Tip:** Check off each subtask as you complete it. Update time estimates based on actual time spent to improve future planning!
