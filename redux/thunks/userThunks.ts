import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, DELETE_USER_ENDPOINT, GET_PARTICULAR_USERS_ENDPOINT, GET_USER_ENDPOINT, POST_USERS_ENDPOINT, PUT_USER_ENDPOINT } from "../../models/Constants";
import axios from "axios";
import { User } from "../../models/User";

export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials: any, { rejectWithValue }) => {
        try {
            const URL = BASE_URL + GET_PARTICULAR_USERS_ENDPOINT + credentials?.username;
            const response: any = await axios.get(URL);
            const users: User[] = response?.data;

            if (users?.length === 0) {
                return rejectWithValue("User doesn't exist");
            }
            const user = users?.at(0);
            if (user?.password !== credentials?.password) {
                return rejectWithValue("Password doesn't match")
            }
            await axios.post(BASE_URL + PUT_USER_ENDPOINT, JSON.stringify(user));
            return user;
        } catch (error: any) {
            return rejectWithValue(error?.message);
        }
    }
)

export const registerUser = createAsyncThunk(
    'user/register',
    async (credentials: any, { rejectWithValue }) => {
        try {
            let userExist = await isUserExist(credentials?.username);
            if (userExist) {
                return rejectWithValue("User already exist");
            }

            const URL = BASE_URL + POST_USERS_ENDPOINT;
            const response: any = await axios.post(URL, JSON.stringify(credentials));
            const user: User = response?.data;
            await axios.post(BASE_URL + PUT_USER_ENDPOINT, JSON.stringify(user));
            return user
        } catch (error: any) {
            return rejectWithValue(error?.message)
        }
    }
)

export const getUser = createAsyncThunk(
    'user/get',
    async (data: null, { rejectWithValue }) => {
        try {
            let URL = BASE_URL + GET_USER_ENDPOINT;
            let response: any = await axios.get(URL);
            let users: User[] = response?.data;

            console.log(users);


            return users?.at(0);
        } catch (error: any) {
            return rejectWithValue(error?.message);
        }
    }
)

export const logoutUser = createAsyncThunk(
    'user/logout',
    async (id: string | undefined, { rejectWithValue }) => {
        try {
            if (!id) { return rejectWithValue("Oops! An error occured!") }
            let URL = BASE_URL + DELETE_USER_ENDPOINT + `/${id}`;
            let response: any = await axios.delete(URL);
            let user: User = response?.data;

            return user;
        } catch (error: any) {
            return rejectWithValue(error?.message);
        }
    }
)

const isUserExist = async (username: string) => {
    try {
        const URL = BASE_URL + GET_PARTICULAR_USERS_ENDPOINT + username;
        const response: any = await axios.get(URL);
        const users: User[] = response?.data;

        if (users?.length === 0) {
            return false;
        }
        return true;
    } catch (error: any) {
        return true;
    }
}