import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { TodoContext } from '../context/TodoContext';
import Todo from '../models/Todo';
import { ADD_TODO, EDIT_TODO } from '../models/Constants';

const AddTodoScreen = () => {
    const { state, dispatch } = useContext(TodoContext);
    const [input, setInput] = useState<string>(state.selectedTodo ? state.selectedTodo.title : "");

    useEffect(() => {
        if (state.selectedTodo) {
            setInput(state.selectedTodo.title);
        }
    }, [state]);

    const handleSubmit = () => {
        if (input.length < 3) {
            Alert.alert('Warning', 'Todo should be atleast three characters long!', [
                { text: 'OK', onPress: () => { } },
            ]);
            return
        }

        if (state.selectedTodo) {
            let updatedTodo: Todo = { ...state.selectedTodo, title: input };
            dispatch({ type: EDIT_TODO, payload: updatedTodo })
        } else {
            let id: string = new Date().valueOf().toString();
            let newTodo: Todo = { id: id, title: input, completed: false, date: new Date() };
            dispatch({ type: ADD_TODO, payload: newTodo });
        }

        setInput('');
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setInput}
                value={input}
                placeholder='eg. Fill Timesheet'
            />
            <TouchableOpacity style={styles.btnContainer} onPress={handleSubmit}>
                <Text style={styles.btn}>{state.selectedTodo ? "Save" : "Add"}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        borderColor: "#118ab2",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 10,
        fontSize: 16,
        padding: 16
    },
    btnContainer: {
        marginTop: 20,
        backgroundColor: "#118ab2",
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: "center"
    },
    btn: {
        color: "#fff"
    }
})

export default AddTodoScreen;
