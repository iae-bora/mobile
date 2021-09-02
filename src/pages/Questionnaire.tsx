import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../styles/colors';

import { Button } from '../components/Button';

export function Questionnaire(){
    const navigation = useNavigation();

    async function handleSubmit(){
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Precisamos te conhecer melhor</Text>

                <Text style={styles.subtitle}>
                    Este simples questionário nos {'\n'}
                    ajudará a conhecer melhor seu {'\n'}
                    perfil e te recomendar melhores {'\n'}
                    lugares
                </Text>
            </View>

            <View style={styles.questionContainer}>
                <Text style={styles.question}>Qual gênero musical você mais gosta?</Text>
            </View>

            <Button 
                title='Confirmar'
                onPress={handleSubmit}
            />
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
    subtitle: {
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 20,
        color: colors.heading
    },
    questionContainer: {
        paddingBottom: 20,
        marginBottom: 40
    },
    question: {
        fontSize: 17,
        paddingVertical: 20,
        color: colors.heading,
        fontWeight: 'bold'
    }
})