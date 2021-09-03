import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import colors from '../styles/colors';

import { Button } from '../components/Button';

export function Questionnaire(){
    const navigation = useNavigation();
    const [answerOne, setAnswerOne] = useState<string>('');

    async function handleSubmit(){
        navigation.navigate('Home');
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Precisamos te conhecer melhor</Text>

                    <Text style={styles.subtitle}>
                        Este simples questionário nos {'\n'}
                        ajudará a conhecer melhor seu {'\n'}
                        perfil e te recomendar melhores {'\n'}
                        lugares (só será necessário responder {'\n'}
                        essa pesquisa uma vez 😊)
                    </Text>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.question}>Qual gênero musical você mais gosta?</Text>

                    <RadioButton.Group onValueChange={answer => setAnswerOne(answer)} value={answerOne}>
                        <RadioButton.Item style={styles.answer} label='Rock' value='Rock' />
                        <RadioButton.Item style={styles.answer} label='Sertanejo' value='Sertanejo' />
                        <RadioButton.Item style={styles.answer} label='Forró' value='Forró' />
                        <RadioButton.Item style={styles.answer} label='Gospel' value='Gospel' />
                        <RadioButton.Item style={styles.answer} label='Pop' value='Pop' />
                        <RadioButton.Item style={styles.answer} label='Funk' value='Funk' />
                        <RadioButton.Item style={styles.answer} label='Rap' value='Rap' />
                    </RadioButton.Group>
                </View>

                <View style={styles.footer}>
                    <Button 
                        title='Confirmar'
                        onPress={handleSubmit}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: StatusBar.currentHeight,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20
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
        paddingVertical: 10,
        color: colors.heading,
        fontWeight: 'bold'
    },
    answer: {
        height: 40,
        paddingVertical: 0
    },
    footer: {
        alignItems: 'center',
        marginBottom: 50
    }
})