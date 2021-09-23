import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import colors from '../styles/colors';

interface HeaderProps {
    username: string;
}

export function Header(props: HeaderProps){
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>
                    {props.username}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: StatusBar.currentHeight
    },
    greeting: {
        fontSize: 32,
        color: colors.heading
    },
    userName: {
        fontSize: 32,
        color: colors.heading,
        lineHeight: 40,
        fontWeight: 'bold'
    }
})