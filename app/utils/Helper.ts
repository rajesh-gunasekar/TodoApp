import Todo from "../models/Todo";

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
