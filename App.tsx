import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import TodosScreen from './app/screens/TodosScreen';
import AddTodoScreen from './app/screens/AddTodoScreen';
import { TodoProvider } from './app/context/TodoContext';

const Tab = createBottomTabNavigator();

const App = () => {
    const [todos, setTodos] = useState<string[]>([]);

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
                            headerRight: () => (
                                <MaterialIcons
                                    name="sort"
                                    size={24}
                                    color="#118ab2"
                                    style={{ marginRight: 20 }}
                                    onPress={() => console.log("icon pressed")}
                                />
                            )
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
