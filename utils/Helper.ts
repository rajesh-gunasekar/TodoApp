import { BASE_URL, GET_USER_ENDPOINT, POST_USER_ENDPOINT, TODOS } from "../models/Constants";
import Todo from "../models/Todo";
import axios from "axios";
import * as Font from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from "../models/User";

export const getTitle = (sortValue: number) => {
    let title = ""

    switch (sortValue) {
        case 0:
            title = "List of Todos";
            break;

        case 1:
            title = "Completed Todos";
            break;

        case 2:
            title = "Uncompleted Todos";
            break;

        default:
            break;
    }

    return title;
}

export const getDisplayMessage = (sortValue: number) => {
    let title = ""

    switch (sortValue) {
        case 0:
            title = "You have no todos. Go add one😅";
            break;

        case 1:
            title = "You haven't completed any todo. Go complete one🥹";
            break;

        case 2:
            title = "Hurrah, you have no pending tasks😀";
            break;

        default:
            break;
    }

    return title;
}

export const getFilteredTodos = (todos: Todo[], sortValue: number) => {
    let filteredTodos: Todo[] = [];

    switch (sortValue) {
        case 0:
            filteredTodos = todos;
            break;

        case 1:
            filteredTodos = todos.filter(todo => todo.completed);
            break;

        case 2:
            filteredTodos = todos.filter(todo => !todo.completed);
            break;

        default:
            filteredTodos = todos;
            break;
    }

    return filteredTodos;
}

export const storeTodosLocally = async (todos: Todo[]) => {
    try {
        await AsyncStorage.setItem(TODOS, JSON.stringify(todos));
    } catch {
        console.log("Error occured while storing data");
    }
}

export const getTodosLocally = async () => {
    try {
        return await AsyncStorage.getItem(TODOS);
    } catch {
        console.log("Error occured while storing data");
    }
}

export const getFonts = () =>
    Font.loadAsync({
        "nunito-black": require("../assets/fonts/Nunito-Black.ttf"),
        "nunito-bold": require("../assets/fonts/Nunito-Bold.ttf"),
        "nunito-medium": require("../assets/fonts/Nunito-Medium.ttf"),
        "nunito-regular": require("../assets/fonts/Nunito-Regular.ttf"),
        "nunito-light": require("../assets/fonts/Nunito-Light.ttf"),
    });

export const loginUser = async (username: string, password: string) => {
    try {
        const URL = BASE_URL + GET_USER_ENDPOINT + username;
        const response: any = await axios.get(URL);
        const users: User[] = response?.data;

        if (users?.length === 0) {
            return { message: "User doesn't exist", status: false, user: null };
        }
        const user = users?.at(0);
        if (user?.password !== password) {
            return { message: "Password doesn't match", status: false, user: null };
        }
        return { message: "Login Successfull", status: true, user: users?.at(0) };
    } catch (error: any) {
        return { message: error, status: false, user: null };
    }
}

export const isUserExist = async (username: string) => {
    try {
        const URL = BASE_URL + GET_USER_ENDPOINT + username;
        const response: any = await axios.get(URL);
        const users: User[] = response?.data;

        console.log("isUserExist: ", users);
        if (users?.length === 0) {
            return false;
        }
        return true;
    } catch (error: any) {
        return true;
    }
}

export const registerUser = async (username: string, password: string) => {
    try {
        let userExist = await isUserExist(username);
        if (userExist) {
            return { message: "User already exist", status: false, user: null };
        }

        const URL = BASE_URL + POST_USER_ENDPOINT;
        const data = { username, password };
        const response: any = await axios.post(URL, JSON.stringify(data));
        const user: User = response?.data;
        return { message: "Register Successfull", status: true, user: user };
    } catch (error: any) {
        return { message: error, status: false, user: null };
    }
}