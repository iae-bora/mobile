import React, { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';

import { Header } from '../components/Header';
import { Button } from '../components/Button';

import { UserProps } from '../libs/storage';

import colors from '../styles/colors';
import { removeUserData } from '../libs/storage';

export function Home(){
    const navigation = useNavigation();
    const route = useRoute();
    const user = route.params as UserProps;

    useEffect(() => {
        const remove = async (e: any) => {
            e.preventDefault();

            Alert.alert(
                'Deseja sair?',
                'Você irá retornar para a página inicial do aplicativo',
                [
                    { text: "Cancelar", style: 'cancel', onPress: () => {} },
                    {
                        text: 'Sair',
                        style: 'destructive',
                        onPress: async () => {
                            await removeUserData();
                            navigation.removeListener('beforeRemove', (e) => remove(e));
                            navigation.dispatch(CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'Welcome' }]
                            }))
                        },
                    }
                ]
            );
        }
        navigation.addListener('beforeRemove', (e) => remove(e))

        return () => navigation.removeListener('beforeRemove', (e) => remove(e));
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Header username={user.displayName || ''} />

            <View style={styles.wrapper}>
                <Button 
                    button_style={styles.button} 
                    title='Quero uma recomendação'
                    onPress={() => navigation.navigate('AskRecommendation', user)}
                />

                <Button 
                    button_style={styles.button} 
                    title='Meus passeios'
                    onPress={() => navigation.navigate('TourHistory', user)}
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