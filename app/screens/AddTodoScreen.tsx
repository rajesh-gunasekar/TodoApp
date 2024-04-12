import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import Todo from '../models/Todo';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { updateSelectedTodo, addTodo, editTodo } from '../redux/reducers/todoReducer';

const AddTodoScreen = ({ navigation }: { navigation: any }) => {
    const { selectedTodo } = useSelector((state: RootState) => state.todoReducer);
    const dispatch = useDispatch()

    const isFocused = useIsFocused();
    const [input, setInput] = useState<string>("");

    useEffect(() => {
        if (isFocused && selectedTodo) {
            setInput(selectedTodo.title);
        } else if (!isFocused && selectedTodo) {
            dispatch(updateSelectedTodo(null));
        }

        if (!isFocused) {
            setInput("");
        }
    }, [isFocused]);

    const handleSubmit = () => {
        if (input.length < 3) {
            Alert.alert('Warning', 'Todo should be atleast three characters long!', [
                { text: 'OK', onPress: () => { } },
            ]);
            return
        }

        if (selectedTodo) {
            let updatedTodo: Todo = { ...selectedTodo, title: input };
            dispatch(editTodo(updatedTodo));
            navigation.navigate("Todos");
        } else {
            let id: string = new Date().valueOf().toString();
            let newTodo: Todo = { id: id, title: input, completed: false, date: (new Date()).toISOString() };
            dispatch(addTodo(newTodo));
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
                <Text style={styles.btn}>{selectedTodo ? "Save" : "Add"}</Text>
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
        paddingVertical: 15,
        alignItems: "center"
    },
    btn: {
        color: "#fff",
        fontSize: 16,
        textTransform: "uppercase"
    }
})

export default AddTodoScreen;
