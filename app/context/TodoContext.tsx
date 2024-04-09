import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';
import Todo from '../models/Todo';
import { ADD_TODO, UPDATE_TODO_STATUS, DELETE_TODO, EDIT_TODO, UPDATE_SELECTED_TODO, UPDATE_SORT_VALUE } from '../models/Constants';
import { getFilteredTodos } from '../utils/Helper';

interface State {
    todos: Todo[];
    filteredTodos: Todo[];
    selectedTodo: Todo | undefined;
    sortValue: number;
}

type Action =
    | { type: typeof ADD_TODO; payload: Todo }
    | { type: typeof UPDATE_TODO_STATUS, payload: string }
    | { type: typeof EDIT_TODO, payload: Todo }
    | { type: typeof DELETE_TODO; payload: string }
    | { type: typeof UPDATE_SORT_VALUE; payload: null }
    | { type: typeof UPDATE_SELECTED_TODO, payload: Todo | undefined }

const initialState: State = {
    todos: [],
    filteredTodos: [],
    selectedTodo: undefined,
    sortValue: 1
};

export const TodoContext = createContext<{
    state: State;
    dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => undefined });

const todoReducer = (state: State, action: Action): State => {
    let updatedTodos: Todo[] = [];
    let filteredTodos: Todo[] = [];
    switch (action.type) {
        case ADD_TODO:
            updatedTodos = [...state.todos, action.payload];
            filteredTodos = getFilteredTodos(updatedTodos, state.sortValue);

            return {
                ...state,
                todos: updatedTodos,
                filteredTodos: filteredTodos
            };

        case UPDATE_TODO_STATUS:
            updatedTodos = state.todos.map(todo => {
                if (todo.id === action.payload) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
            filteredTodos = getFilteredTodos(updatedTodos, state.sortValue);

            return {
                ...state,
                todos: updatedTodos,
                filteredTodos: filteredTodos
            };

        case EDIT_TODO:
            updatedTodos = state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    return { ...todo, title: action.payload.title };
                }
                return todo;
            });
            filteredTodos = getFilteredTodos(updatedTodos, state.sortValue);

            return {
                ...state,
                selectedTodo: undefined,
                todos: updatedTodos,
                filteredTodos: filteredTodos
            };

        case DELETE_TODO:
            updatedTodos = state.todos.filter(todo => todo.id !== action.payload);
            filteredTodos = getFilteredTodos(updatedTodos, state.sortValue);

            return {
                ...state,
                todos: updatedTodos,
                filteredTodos: filteredTodos
            };

        case UPDATE_SORT_VALUE:
            let newSortValue = ((state.sortValue + 1) % 3);
            filteredTodos = getFilteredTodos(state.todos, newSortValue);

            return {
                ...state,
                filteredTodos: filteredTodos,
                sortValue: newSortValue
            };

        case UPDATE_SELECTED_TODO:
            return {
                ...state,
                selectedTodo: action.payload
            }

        default:
            return state;
    }
};

interface TodoProviderProps {
    children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
};