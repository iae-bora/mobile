import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

import colors from '../styles/colors';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function Button({ title, ...rest }: ButtonProps){
    return (
        <TouchableOpacity 
            style={styles.container}
            {...rest}
        >
            <Text style={styles.text}>
                { title }
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background_blue,
        height: 56,
        width: 112,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        color: colors.white,
    }
})