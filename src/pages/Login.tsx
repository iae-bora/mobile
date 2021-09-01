import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
                onPress={handleSubmit}
            >
                <Text>
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
    }
})