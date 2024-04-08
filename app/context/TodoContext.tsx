import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';
import Todo from '../models/Todo';
import { ADD_TODO, UPDATE_TODO_STATUS, DELETE_TODO, EDIT_TODO, UPDATE_SELECTED_TODO } from '../models/Constants';

interface State {
    todos: Todo[];
    selectedTodo: Todo | undefined
}

type Action =
    | { type: typeof ADD_TODO; payload: Todo }
    | { type: typeof UPDATE_TODO_STATUS, payload: string }
    | { type: typeof EDIT_TODO, payload: Todo }
    | { type: typeof DELETE_TODO; payload: string }
    | { type: typeof UPDATE_SELECTED_TODO, payload: Todo | undefined }

const initialState: State = {
    todos: [],
    selectedTodo: undefined
};

export const TodoContext = createContext<{
    state: State;
    dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => undefined });

const todoReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        case UPDATE_TODO_STATUS:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload) {
                        return { ...todo, completed: !todo.completed };
                    }
                    return todo;
                }),
            };
        case EDIT_TODO:
            return {
                ...state,
                selectedTodo: undefined,
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload.id) {
                        return { ...todo, title: action.payload.title };
                    }
                    return todo;
                })
            };
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload),
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