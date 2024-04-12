import { Alert, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import moment from 'moment';
import Todo from '../models/Todo';
import { TodoContext } from '../context/TodoContext';
import { DELETE_TODO, UPDATE_SELECTED_TODO, UPDATE_TODO_STATUS } from '../models/Constants';
import TodoStatusIcon from './TodoStatusIcon';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { updateSelectedTodo, updateTodoStatus, deleteTodo } from '../redux/reducers/todoReducer';

interface Props {
    todo: Todo;
    navigation: any;
}

const TodoView: React.FC<Props> = ({ todo, navigation }) => {
    const { selectedTodo } = useSelector((state: RootState) => state.todoReducer);
    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedTodo) {
            navigation.navigate("AddTodo");
        }
    }, [selectedTodo]);

    const handleClick = (id: string) => {
        dispatch(updateTodoStatus(id));
    }

    const handleEdit = (todo: Todo) => {
        dispatch(updateSelectedTodo(todo));
    }

    const handleDelete = (todo: Todo) => {
        Alert.alert('Alert', `Are you sure want to delete the todo[${todo.title}]?`, [
            { text: 'Cancel', onPress: () => { } },
            { text: 'Yes', onPress: () => { dispatch(deleteTodo(todo.id)) } },
        ]);
    }

    return (
        <TouchableWithoutFeedback onPress={() => handleClick(todo.id)}>
            <View style={styles.container}>
                <View style={styles.row}>
                    {
                        <TodoStatusIcon isCompleted={todo.completed} />
                    }
                    <View>
                        <Text style={styles.title}>{todo.title}</Text>
                        <Text style={styles.date}>{moment(new Date(todo.date)).fromNow()}</Text>
                        <View style={styles.actions}>
                            <Text onPress={() => handleEdit(todo)} style={styles.editAction}>Edit</Text>
                            <Text onPress={() => handleDelete(todo)} style={styles.deleteAction}>Delete</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
        marginTop: 10,
        borderRadius: 10
    },
    row: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center"
    },
    title: {
        fontSize: 16,
        fontWeight: "500"
    },
    date: {
        marginTop: 10,
        fontSize: 12,
        color: "#adb5bd"
    },
    actions: {
        flexDirection: "row",
        gap: 10,
        marginTop: 5
    },
    editAction: {
        fontSize: 12,
        color: "#ff9f1c"
    },
    deleteAction: {
        fontSize: 12,
        color: "#dd2d4a"
    }
})

export default TodoView
