import React from 'react';
import { useIsFocused } from "@react-navigation/native";
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TodoView from '../components/TodoView';
import { getDisplayMessage, getTitle } from '../utils/Helper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { updateTodoStatus, updateSortValue } from '../redux/reducers/todoReducer';

const TodosScreen = ({ navigation }: { navigation: any }) => {
    const { filteredTodos, sortValue } = useSelector((state: RootState) => state.todoReducer);
    const dispatch = useDispatch()

    const isFocused = useIsFocused();

    const handleClick = (id: string) => {
        dispatch(updateTodoStatus(id));
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerFlex}>
                <Text style={styles.title}>{getTitle(sortValue)}</Text>

                <MaterialIcons
                    name="sort"
                    size={24}
                    color="#118ab2"
                    onPress={() => dispatch(updateSortValue(null))}
                />
            </View>

            {
                filteredTodos.length ? (
                    <FlatList
                        data={filteredTodos}
                        renderItem={({ item }) => (
                            <TouchableWithoutFeedback onPress={() => handleClick(item.id)}>
                                <TodoView todo={item} navigation={navigation} />
                            </TouchableWithoutFeedback>
                        )}
                        keyExtractor={item => item.id}
                    />
                ) : (
                    <View style={styles.displayMessageContainer}>
                        <Text style={styles.displayMessage}>{getDisplayMessage(sortValue)}</Text>
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
