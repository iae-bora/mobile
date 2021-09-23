import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Header } from '../components/Header';
import { Button } from '../components/Button';

import { UserProps } from '../libs/storage';

import colors from '../styles/colors';

export function Home(){
    const navigation = useNavigation();
    const route = useRoute();
    const user = route.params as UserProps;

    return (
        <View style={styles.container}>
            <Header username={user.displayName} />

            <View style={styles.wrapper}>
                <Button 
                    button_style={styles.button} 
                    title='Quero uma recomendação'
                    onPress={() => navigation.navigate('AskRecommendation')}
                />

                <Button 
                    button_style={styles.button} 
                    title='Histórico de rotas'
                    onPress={() => navigation.navigate('TourHistory')}
                />

                <Button 
                    button_style={styles.button}
                    title='Revisar questionário'
                    onPress={() => navigation.navigate('Questionnaire', { ...user, status: 'update' })} />
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