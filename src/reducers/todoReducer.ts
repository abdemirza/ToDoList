import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the shape of a todo item
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// Define the shape of the todo state
export interface TodoState {
  todos: Todo[];
}

// Define the initial state for todos
const initialState: TodoState = {
  todos: [],
};

// Create a slice of the redux store for managing todos
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Add a new todo item
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    // Toggle the completion status of a todo item
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    // Delete a todo item
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
});

// Export the action creators
export const {addTodo, toggleTodo, deleteTodo} = todoSlice.actions;
// Export the reducer function
export default todoSlice.reducer;
