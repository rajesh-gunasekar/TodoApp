import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TodosScreen from './screens/TodosScreen';
import AddTodoScreen from './screens/AddTodoScreen';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { AppDispatch, RootState } from './redux/store';
import LoginScreen from './screens/AuthScreen';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { getUser, logoutUser } from './redux/thunks/userThunks';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
    // const [fontsLoaded, fontError] = useFonts({
    //     "nunito-black": require("./assets/fonts/Nunito-Black.ttf"),
    //     "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
    //     "nunito-medium": require("./assets/fonts/Nunito-Medium.ttf"),
    //     "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    //     "nunito-light": require("./assets/fonts/Nunito-Light.ttf"),
    // });

    // const onLayoutRootView = useCallback(async () => {
    //     if (fontsLoaded || fontError) {
    //         await SplashScreen.hideAsync();
    //     }
    // }, [fontsLoaded, fontError]);

    // useLayoutEffect(() => {
    //     onLayoutRootView();
    // }, []);

    // if (!fontsLoaded && !fontError) {
    //     return null;
    // }
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    );
};

const Navigation = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser(null));
    }, []);

    return (
        <NavigationContainer>
            {
                user ? <MainScreens /> : <AuthScreens />
            }
        </NavigationContainer>
    )
}

const AuthScreens = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    )
}

const MainScreens = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);
    const { selectedTodo } = useSelector((state: RootState) => state.todoReducer);
    const dispatch: AppDispatch = useDispatch();

    return (
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
                        <Text
                            style={{ color: "#007AFF", marginRight: 20 }}
                            onPress={() => dispatch(logoutUser(user?.id))}
                        >Logout</Text>
                    )
                }}
            />
            <Tab.Screen
                name={selectedTodo ? "EditTodo" : "AddTodo"}
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
    )
}

export default App;
