import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, DELETE_TODO_ENDPOINT, GET_TODOS_ENDPOINT, POST_TODO_ENDPOINT, PUT_TODO_ENDPOINT } from "../../models/Constants";
import Todo from "../../models/Todo";

export const getTodos = createAsyncThunk(
    'todos/get',
    async (userID: string, { rejectWithValue }) => {
        try {
            const URL = BASE_URL + GET_TODOS_ENDPOINT + userID;
            const response: any = await axios.get(URL);
            const todos: Todo[] = response?.data;

            return todos;
        } catch (error: any) {
            return rejectWithValue(error?.message)
        }
    }
)

export const postTodos = createAsyncThunk(
    'todos/post',
    async (todo: Todo, { rejectWithValue }) => {
        try {
            const URL = BASE_URL + POST_TODO_ENDPOINT;
            const response = await axios.post(URL, JSON.stringify(todo));
            const addedTodo: Todo = response?.data;

            return addedTodo;
        } catch (error: any) {
            return rejectWithValue(error?.message);
        }
    }
)

export const editTodos = createAsyncThunk(
    'todos/edit',
    async (todo: Todo, { rejectWithValue }) => {
        try {
            const URL = BASE_URL + PUT_TODO_ENDPOINT + `/${todo.id}`;
            // console.log(URL);
            // console.log(todo);

            const response = await axios.put(URL, JSON.stringify(todo));
            const editedTodo: Todo = response?.data;

            return editedTodo;
        } catch (error: any) {
            return rejectWithValue(error?.message);
        }
    }
)

export const deleteTodos = createAsyncThunk(
    'todos/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            const URL = BASE_URL + DELETE_TODO_ENDPOINT + `/${id}`;
            const response = await axios.delete(URL);
            const deleteTodo: Todo = response?.data;

            return deleteTodo.id;
        } catch (error: any) {
            return rejectWithValue(error?.message);
        }
    }
)