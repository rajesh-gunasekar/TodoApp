// reducers/todoReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Todo from '../../models/Todo';
import { getFilteredTodos, getTodosLocally, storeTodosLocally } from '../../utils/Helper';

interface TodoState {
    todos: Todo[];
    filteredTodos: Todo[];
    selectedTodo: Todo | null;
    sortValue: number;
}

const initialState: TodoState = {
    todos: [],
    filteredTodos: [],
    selectedTodo: null,
    sortValue: 0
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setInitialData(state, action: PayloadAction<Todo[]>) {
            state.todos = action.payload;
            state.filteredTodos = action.payload;
        },
        addTodo(state, action: PayloadAction<Todo>) {
            state.todos.push(action.payload);
            state.filteredTodos = getFilteredTodos(state.todos, state.sortValue);
            storeTodosLocally(state.todos);
        },
        updateTodoStatus(state, action: PayloadAction<string>) {
            state.todos = state.todos.map(todo => {
                if (todo.id === action.payload) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
            state.filteredTodos = getFilteredTodos(state.todos, state.sortValue);
            storeTodosLocally(state.todos);
        },
        editTodo(state, action: PayloadAction<Todo>) {
            state.todos = state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    return { ...todo, title: action.payload.title };
                }
                return todo;
            });
            state.filteredTodos = getFilteredTodos(state.todos, state.sortValue);
            storeTodosLocally(state.todos);
        },
        deleteTodo(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            state.filteredTodos = getFilteredTodos(state.todos, state.sortValue);
            storeTodosLocally(state.todos);
        },
        updateSortValue(state, action: PayloadAction<null>) {
            state.sortValue = ((state.sortValue + 1) % 3);
            state.filteredTodos = getFilteredTodos(state.todos, state.sortValue);
        },
        updateSelectedTodo(state, action: PayloadAction<Todo | null>) {
            state.selectedTodo = action.payload;
        }
    },
});

export const {
    setInitialData,
    addTodo,
    updateTodoStatus,
    editTodo,
    deleteTodo,
    updateSortValue,
    updateSelectedTodo
} = todoSlice.actions;
export default todoSlice.reducer;
