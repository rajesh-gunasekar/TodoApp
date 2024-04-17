import { Alert, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect } from 'react'
import moment from 'moment';
import Todo from '../models/Todo';
import TodoStatusIcon from './TodoStatusIcon';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { updateSelectedTodo, } from '../redux/reducers/todoReducer';
import { deleteTodos, editTodos } from '../redux/thunks/todoThunks';

interface Props {
    todo: Todo;
    navigation: any;
}

const TodoView: React.FC<Props> = ({ todo, navigation }) => {
    const { selectedTodo } = useSelector((state: RootState) => state.todoReducer);
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (selectedTodo) {
            navigation.navigate("EditTodo");
        }
    }, [selectedTodo]);

    const handleClick = (todo: Todo) => {
        const updatedTodo = { ...todo, completed: !todo.completed };
        console.log(updatedTodo);

        dispatch(editTodos(updatedTodo));
    }

    const handleEdit = (todo: Todo) => {
        dispatch(updateSelectedTodo(todo));
    }

    const handleDelete = (todo: Todo) => {
        Alert.alert('Alert', `Are you sure want to delete the todo[${todo.title}]?`, [
            { text: 'Cancel', onPress: () => { } },
            {
                text: 'Yes', onPress: () => {
                    dispatch(deleteTodos(todo.id))
                }
            },
        ]);
    }

    return (
        <TouchableWithoutFeedback onPress={() => handleClick(todo)}>
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
