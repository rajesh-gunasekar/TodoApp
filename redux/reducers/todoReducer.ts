// reducers/todoReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Todo from '../../models/Todo';
import { getFilteredTodos, getTodosLocally, storeTodosLocally } from '../../utils/Helper';
import { deleteTodos, editTodos, getTodos, postTodos } from '../thunks/todoThunks';

interface TodoState {
    todos: Todo[];
    filteredTodos: Todo[];
    selectedTodo: Todo | null;
    sortValue: number;
    loading: boolean;
    error: string | undefined;
}

const initialState: TodoState = {
    todos: [],
    filteredTodos: [],
    selectedTodo: null,
    sortValue: 0,
    loading: false,
    error: undefined
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        updateSortValue(state, action: PayloadAction<null>) {
            state.sortValue = ((state.sortValue + 1) % 3);
            state.filteredTodos = getFilteredTodos(state.todos, state.sortValue);
        },
        updateSelectedTodo(state, action: PayloadAction<Todo | null>) {
            state.selectedTodo = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
                state.filteredTodos = action.payload;
                state.error = undefined;
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.loading = false;
                state.todos = [];
                state.filteredTodos = [];
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = "An Error Occured.";
                }
            })
            .addCase(postTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(postTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos.push(action.payload);
                state.filteredTodos = getFilteredTodos(state.todos, state.sortValue);
                state.error = undefined;
            })
            .addCase(postTodos.rejected, (state, action) => {
                state.loading = false;
                state.todos = [];
                state.filteredTodos = [];
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = "An Error Occured.";
                }
            })
            .addCase(editTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(editTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = state.todos.map(todo => {
                    if (todo.id === action.payload.id) {
                        return action.payload;
                    }
                    return todo;
                });
                state.filteredTodos = getFilteredTodos(state.todos, state.sortValue);
                state.error = undefined;
            })
            .addCase(editTodos.rejected, (state, action) => {
                state.loading = false;
                state.todos = [];
                state.filteredTodos = [];
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = "An Error Occured.";
                }
            })
            .addCase(deleteTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
                state.filteredTodos = getFilteredTodos(state.todos, state.sortValue);
                state.error = undefined;
            })
            .addCase(deleteTodos.rejected, (state, action) => {
                state.loading = false;
                state.todos = [];
                state.filteredTodos = [];
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = "An Error Occured.";
                }
            })
    }
});

export const {
    updateSortValue,
    updateSelectedTodo
} = todoSlice.actions;
export default todoSlice.reducer;
