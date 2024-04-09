import React, { useContext } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TodoContext } from '../context/TodoContext';
import { UPDATE_SORT_VALUE, UPDATE_TODO_STATUS } from '../models/Constants';
import TodoView from '../components/TodoView';
import { getDisplayMessage, getTitle } from '../utils/Helper';

const TodosScreen = ({ navigation }: { navigation: any }) => {
    const { state, dispatch } = useContext(TodoContext);
    const isFocused = useIsFocused();

    const handleClick = (id: string) => {
        dispatch({ type: UPDATE_TODO_STATUS, payload: id })
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerFlex}>
                <Text style={styles.title}>{getTitle(state.sortValue)}</Text>

                <MaterialIcons
                    name="sort"
                    size={24}
                    color="#118ab2"
                    onPress={() => dispatch({ type: UPDATE_SORT_VALUE, payload: null })}
                />
            </View>

            {
                state.filteredTodos.length ? (
                    <FlatList
                        data={state.filteredTodos}
                        renderItem={({ item }) => (
                            <TouchableWithoutFeedback onPress={() => handleClick(item.id)}>
                                <TodoView todo={item} navigation={navigation} />
                            </TouchableWithoutFeedback>
                        )}
                        keyExtractor={item => item.id}
                    />
                ) : (
                    <View style={styles.displayMessageContainer}>
                        <Text style={styles.displayMessage}>{getDisplayMessage(state.sortValue)}</Text>
                    </View>
                )
            }


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    headerFlex: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    displayMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    displayMessage: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: 'bold'
    }
})

export default TodosScreen;
