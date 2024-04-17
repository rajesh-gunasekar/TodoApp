import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, Button, TouchableOpacity, Alert } from 'react-native'
import { Checkbox } from 'react-native-paper';
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { setError, setUser } from '../redux/reducers/userReducer';
import { loginUser, registerUser } from '../redux/thunks/userThunks';
import { AppDispatch, RootState } from '../redux/store';

const AuthScreen = () => {
    const navigation = useNavigation();
    const { error, loading } = useSelector((state: RootState) => state.userReducer);
    const dispatch: AppDispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);

    const handleSubmit = async () => {
        if (username.length < 3) {
            Alert.alert('Warning', 'Username should be atleast 3 characters long!', [
                { text: 'OK', onPress: () => { } },
            ]);
            return;
        }
        if (password.length < 6) {
            Alert.alert('Warning', 'Password should be atleast 6 characters long!', [
                { text: 'OK', onPress: () => { } },
            ]);
            return;
        }

        let user = null;
        if (isLogin) {
            dispatch(loginUser({ username, password }))
        } else {
            // console.log("Registering the user");
            // const data = await registerUser(username, password);
            // console.log(data);

            // if (!data.status) {
            //     Alert.alert('Warning', data.message, [
            //         { text: 'OK', onPress: () => { } },
            //     ]);

            //     return;
            // }
            // user = data.user;
            dispatch(registerUser({ username, password }));
        }
    }

    if (error) {
        Alert.alert('Warning', error, [
            {
                text: 'OK', onPress: () => {
                    dispatch(setError(null))
                }
            },
        ]);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require("../assets/tasklist.png")}
                style={styles.logo}
            />

            <View style={styles.content}>
                <Text style={styles.title}>Organize your work</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder='Username'
                />

                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder='Password'
                />

                <TouchableOpacity style={styles.btnContainer} onPress={handleSubmit}>
                    <Text style={styles.btn}>{isLogin ? "Login" : "Register"}</Text>
                </TouchableOpacity>

                <View style={styles.checkboxContainer}>
                    <Checkbox.Android
                        status={isSelected ? "checked" : "unchecked"}
                        onPress={() => setIsSelected(!isSelected)}
                        color='#ff9f1c'
                    />
                    <Text>Remember me</Text>
                </View>


                <Text>
                    {isLogin ? "New User?" : "Already a User"} <Text
                        onPress={() => setIsLogin(!isLogin)}
                        style={styles.link}
                    >
                        {isLogin ? "Register" : "Login"}
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    logo: {
        width: "100%",
        height: 300,
    },
    content: {
        paddingHorizontal: 20
    },
    title: {
        textAlign: "center",
        fontSize: 22,
        textTransform: "capitalize",
        fontWeight: "bold",
        marginBottom: 20
    },
    input: {
        borderWidth: 2,
        padding: 15,
        borderRadius: 10,
        borderColor: "lightgray",
        marginBottom: 15,
    },
    btnContainer: {
        backgroundColor: "#ff9f1c",
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: "center",
        marginBottom: 15
    },
    btn: {
        color: "#fff",
        textTransform: "uppercase",
        letterSpacing: 2,
        fontSize: 16
    },
    checkboxContainer: {
        flexDirection: "row-reverse",
        alignItems: "center",
        marginBottom: 5
    },
    link: {
        fontStyle: "italic",
        color: "#023e8a",
        textDecorationLine: "underline"
    }
})

export default AuthScreen;