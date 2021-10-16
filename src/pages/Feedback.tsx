import React, { useState } from 'react';
import { Alert, Platform, SafeAreaView, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';

import colors from '../styles/colors';

import { Button } from '../components/Button';
import api from '../services/api';
import { Load } from '../components/Load';

export function Feedback(){
    const navigation = useNavigation();
    const route = useRoute();
    const { userRouteId } = route.params as { userRouteId: number; };

    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(){
        if(rating <= 0){
            return Alert.alert('Feedback inválido', 'A nota deve ser maior ou igual a 1');
        }

        const feedback = {
            rating,
            userRouteId
        } as any;
        if(text){
            feedback.text = text;
        }

        try {
            setLoading(true);
            const { status } = await api.post('/feedback', feedback);
            if(status == 200){
                setLoading(false);
                Alert.alert('Sucesso!', 'Muito obrigado pelo feedback 🤗')
                navigation.navigate('TourHistory');
            }
        } catch (error: any) {
            Alert.alert('Não foi possível salvar a avaliação, tente novamente');
            setLoading(false);
        }
    }

    if(loading) return <Load/>

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.wrapper}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <View style={styles.header}>
                            <Text style={styles.title}>Avaliação</Text>
                        </View>

                        <View style={styles.feedbackAttributeContainer}>
                            <Text style={styles.subtitle}>O que você achou da rota?</Text>
                            <Rating 
                                fractions={0}
                                startingValue={rating}
                                minValue={1}
                                onFinishRating={setRating}
                            />
                        </View>

                        <View style={styles.feedbackAttributeContainer}>
                            <Text style={styles.subtitle}>Deixar comentário</Text>
                            <TextInput
                                multiline
                                numberOfLines={4}
                                placeholder='Conte-nos o que achou (opcional)'
                                value={text}
                                onChangeText={setText}
                                style={styles.textInputContainer}
                            />
                        </View>

                        <View style={styles.footer}>
                            <Button 
                                title='Enviar'
                                onPress={handleSubmit}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingVertical: 100
    },
    header: {
        alignItems: 'center',
        paddingVertical: 10
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 18,
        lineHeight: 34,
        color: colors.heading,
        fontWeight: 'bold'
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 17,
        marginBottom: 20,
        color: colors.heading
    },
    feedbackAttributeContainer: {
        paddingVertical: 25
    },
    textInputContainer: {
        borderWidth: 1,
        borderColor: colors.shape,
        borderRadius: 8,
        padding: 10,
        fontSize: 16
    },
    footer: {
        alignItems: 'center',
        marginBottom: 50
    }
})