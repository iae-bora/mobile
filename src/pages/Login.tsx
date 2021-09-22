import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import colors from '../styles/colors';
import { GoogleSigninButton } from '../components/GoogleSignInButton';

export function Login(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <GoogleSigninButton navigationRoute='UserAddress' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingVertical: 150
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