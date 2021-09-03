import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

import colors from '../styles/colors';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    button_style?: StyleProp<ViewStyle>;
}

export function Button({ title, button_style, ...rest }: ButtonProps){
    return (
        <TouchableOpacity 
            style={[styles.container, button_style]}
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
        width: 168,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        color: colors.white,
        textAlign: 'center'
    }
})