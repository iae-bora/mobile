import React from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import googleIconImg from '../assets/google-icon.png';
import colors from '../styles/colors';

export function Login(){
    const navigation = useNavigation();

    async function handleSubmit(){
        navigation.navigate('UserAddress');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
            >
                <View>
                    <Image style={styles.googleImage} source={googleIconImg} />
                </View>
                <Text style={styles.buttonText}>
                    Login com o Google
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 38,
        lineHeight: 34,
        color: colors.heading,
        fontWeight: 'bold'
    },
    button: {
        borderColor: colors.gray,
        borderWidth: 1,
        height: 56,
        width: 188,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    googleImage: {
        flex: 1,
        width: 24,
        height: 24,
        resizeMode: 'stretch'
    }
})