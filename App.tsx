import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TodosScreen from './app/screens/TodosScreen';
import AddTodoScreen from './app/screens/AddTodoScreen';
import { Provider } from 'react-redux';
import store from './app/redux/store';

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <Provider store={store}>
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
        </Provider>
    );
};

export default App;
