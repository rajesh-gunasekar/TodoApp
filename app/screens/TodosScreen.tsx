import React, { useEffect, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import { TodoContext } from '../context/TodoContext';
import Todo from '../models/Todo';
import { UPDATE_SELECTED_TODO, UPDATE_TODO_STATUS } from '../models/Constants';
import TodoView from '../components/TodoView';

const TodosScreen = ({ navigation }: { navigation: any }) => {
    const { state, dispatch } = useContext(TodoContext);

    // useFocusEffect(() => {
    //     console.log("called");
    //     dispatch({ type: UPDATE_SELECTED_TODO, payload: undefined });
    // }, [state]);
    // useFocusEffect(
    //     React.useCallback(() => {
    //         dispatch({ type: UPDATE_SELECTED_TODO, payload: undefined });

    //         return () => unsubscribe();
    //     }, [state.selectedTodo])
    // );

    const handleClick = (id: string) => {
        dispatch({ type: UPDATE_TODO_STATUS, payload: id })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>List of Todos</Text>

            <FlatList
                data={state.todos}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => handleClick(item.id)}>
                        <TodoView todo={item} navigation={navigation} />
                    </TouchableWithoutFeedback>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default TodosScreen;
