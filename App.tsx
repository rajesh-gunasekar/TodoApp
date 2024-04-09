import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import TodosScreen from './app/screens/TodosScreen';
import AddTodoScreen from './app/screens/AddTodoScreen';
import { TodoContext, TodoProvider } from './app/context/TodoContext';
import { UPDATE_SORT_VALUE } from './app/models/Constants';

const Tab = createBottomTabNavigator();

const App = () => {
    const { dispatch } = useContext(TodoContext);

    return (
        <TodoProvider>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen
                        name="Todos"
                        component={TodosScreen}
                        options={{
                            tabBarLabel: 'Home',
                            tabBarIcon: ({ color, size, focused }) => (
                                <Ionicons
                                    name={focused ? "home" : "home-outline"}
                                    size={size}
                                    color="#118ab2"
                                />
                            ),
                            // headerRight: () => (
                            //     <MaterialIcons
                            //         name="sort"
                            //         size={24}
                            //         color="#118ab2"
                            //         style={{ marginRight: 20 }}
                            //         onPress={() => {
                            //             console.log("called");

                            //             dispatch({ type: UPDATE_SORT_VALUE, payload: null })
                            //         }}
                            //     />
                            // )
                        }}
                    />
                    <Tab.Screen
                        name="AddTodo"
                        component={AddTodoScreen}
                        options={{
                            tabBarLabel: 'Add',
                            tabBarIcon: ({ color, size, focused }) => (
                                <Ionicons
                                    name={focused ? "checkmark-circle" : "checkmark-circle-outline"}
                                    size={size}
                                    color="#118ab2"
                                />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </TodoProvider>
    );
};

export default App;
