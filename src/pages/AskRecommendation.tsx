import React, { useState } from 'react';
import { TextInput, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../styles/colors';

import { Button } from '../components/Button';

export function AskRecommendation(){
    const navigation = useNavigation();
    const [distance, setDistance] = useState('5 km');
    const [localsQuantity, setLocalsQuantity] = useState('1');

    async function handleSubmit(){
        // navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Até onde quero ir?</Text>
            </View>

            <View style={styles.filterContainer}>
                <Text style={styles.filter}>Distância</Text>

                <TextInput style={styles.filterInput} value={distance} onChangeText={text => setDistance(text)} />
            </View>

            <View style={styles.filterContainer}>
                <Text style={styles.filter}>Quantidade de locais</Text>

                <TextInput style={styles.filterInput} value={localsQuantity} onChangeText={text => setLocalsQuantity(text)} />
            </View>

            <View style={styles.footer}>
                <Button 
                    title='Confirmar'
                    onPress={handleSubmit}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: StatusBar.currentHeight,
        alignItems: 'center',
        paddingHorizontal: 20
    },
    header: {
        alignItems: 'center',
        paddingVertical: 40
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 38,
        lineHeight: 34,
        color: colors.heading,
        fontWeight: 'bold'
    },
    filterContainer: {
        alignItems: 'center',
        marginBottom: 50
    },
    filter: {
        fontSize: 24,
        color: colors.heading,
        fontWeight: 'bold'
    },
    filterInput: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 20,
        padding: 10
    },
    footer: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center'
    }
})