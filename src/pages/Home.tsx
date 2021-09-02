import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Header } from '../components/Header';
import { Button } from '../components/Button';

import colors from '../styles/colors';

export function Home(){
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.wrapper}>
                <Button button_style={styles.button} title='Quero uma recomendação' />

                <Button button_style={styles.button} title='Histórico de rotas' />

                <Button button_style={styles.button} title='Avaliações de usuários' />

                <Button 
                    button_style={styles.button}
                    title='Revisar questionário'
                    onPress={() => navigation.navigate('Questionnaire')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 20
    },
    button: {
        height: 80,
        width: 231
    }
})