import React, { useState, useEffect } from 'react';
import { Alert, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import colors from '../styles/colors';

import { UserProps, saveUserData } from '../libs/storage';
import api from '../services/api';
import { Question } from '../components/Question';
import { Button } from '../components/Button';
import { Load } from '../components/Load';

type RouteParams = UserProps & {
    status: string;
}

export function Questionnaire(){
    const navigation = useNavigation();
    const route = useRoute();
    const user = route.params as RouteParams;

    const answersQuestionOne = ["Rock","Sertanejo","Forró","Gospel","Pop","Funk","RAP"]
    const answersQuestionTwo = ["Churrasco","Caseira","Vegetariana","Fast Food","Japonesa","Italiana"]
    const answersQuestionThree = ["Drama","Ação","Aventura","Romance","Animação","Suspense","Terror","Comédia"]
    const answersQuestionFour = ["Futebol","Basquete","Volei","Tênis","Lutas"]
    const answersQuestionFive = ["Palmeiras","Corinthians","Santos","São Paulo","Nenhum"]
    const answersQuestionSix = ["Cristianismo","Hinduísmo","Budismo","Judaísmo","Espiritismo","Nenhuma"]
    const answersQuestionSeven = ["Não","Sim"]

    const [loading, setLoading] = useState(false);
    const [id, setId] = useState();
    const [answerOne, setAnswerOne] = useState<number>();
    const [answerTwo, setAnswerTwo] = useState<number>();
    const [answerThree, setAnswerThree] = useState<number>();
    const [answerFour, setAnswerFour] = useState<number>();
    const [answerFive, setAnswerFive] = useState<number>();
    const [answerSix, setAnswerSix] = useState<number>();
    const [answerSeven, setAnswerSeven] = useState<number>();
    const [age, setAge] = useState<number>();
    const [placesCount, setPlacesCount] = useState(0);

    useEffect(() => {
        async function retrieveAnswers(){
            try {
                const response = await api.get(`/answers/${user.id}`);
                if(response.status == 200){
                    const answers = response.data;

                    setAnswerOne(answers['musics']);
                    setAnswerTwo(answers['food']);
                    setAnswerThree(answers['movies']);
                    setAnswerFour(answers['sports']);
                    setAnswerFive(answers['teams']);
                    setAnswerSix(answers['religion']);
                    setAnswerSeven(answers['haveChildren']);
                    setAge(answers['userAge']);
                    setPlacesCount(answers['placesCount']);
                    setId(answers['id']);

                    setLoading(false);
                }
                else{
                    setLoading(false);
                    Alert.alert('Erro', 'Não foi possível carregar suas respostas. Tente novamente');
                    navigation.goBack();
                }
            } catch (error: any) {
                setLoading(false);
                return;
            }
        }

        if(user.status == 'update'){
            setLoading(true);
            retrieveAnswers();
        }
    }, []);

    async function handleSubmit(){
        const answers = [answerOne, answerTwo, answerThree, answerFour, answerFive, answerSix, answerSeven];
        if (answers.includes(undefined) || !age){
            return Alert.alert(
                'Erro',
                'Responda todas as perguntas para continuar!'
            )
        }

        if(age <= 0){
            return Alert.alert('Erro', 'A idade precisa ser maior ou igual a 1');
        }

        const requestData = {
            "musics": answerOne,
            "food": answerTwo,
            "movies": answerThree,
            "sports": answerFour,
            "teams": answerFive,
            "religion": answerSix,
            "haveChildren": answerSeven,
            "userAge": age,
            "placesCount": placesCount,
            "user": {
                "googleId": user.id,
                "address": user.address
            }
        };

        try {
            setLoading(true);
            let response;
            if(user.status == 'create'){
                response = await api.post('/answers', requestData);
            }
            else{
                Object.assign(requestData, { id });
                response = await api.put('/answers', requestData);
            }

            if(response.status == 200){
                const newUserData = {...user, registrationStep: 'completed'};
                await saveUserData(newUserData);
                setLoading(false);
                navigation.navigate('Home', newUserData);
            }            
        } catch (error: any) {
            setLoading(false);
            Alert.alert('Ocorreu um erro ao tentar salvar suas respostas, tente novamente');
        }
    }

    if(loading) return <Load/>

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

                <Question
                    questionLabel='Qual gênero musical você mais gosta?'
                    selectedOption={answerOne}
                    optionsList={answersQuestionOne}
                    setState={setAnswerOne}
                />

                <Question
                    questionLabel='Qual o seu tipo de comida favorito?'
                    selectedOption={answerTwo}
                    optionsList={answersQuestionTwo}
                    setState={setAnswerTwo}
                 />

                <Question
                    questionLabel='Qual o seu estilo de filme favorito?'
                    selectedOption={answerThree}
                    optionsList={answersQuestionThree}
                    setState={setAnswerThree}
                 />

                <Question
                    questionLabel='Qual seu esporte favorito?'
                    selectedOption={answerFour}
                    optionsList={answersQuestionFour}
                    setState={setAnswerFour}
                />

                <Question
                    questionLabel='Torce para algum time?'
                    selectedOption={answerFive}
                    optionsList={answersQuestionFive}
                    setState={setAnswerFive}
                 />

                <Question
                    questionLabel='Possui alguma religião?'
                    selectedOption={answerSix}
                    optionsList={answersQuestionSix}
                    setState={setAnswerSix}
                 />

                <Question
                    questionLabel='Tem filhos?'
                    selectedOption={answerSeven}
                    optionsList={answersQuestionSeven}
                    setState={setAnswerSeven}
                 />

                <Text style={styles.textInputHeader}>Idade</Text>
                <TextInput
                    style={styles.textInput}
                    value={age?.toString()}
                    onChangeText={value => setAge(parseInt(value.replace(/[^0-9]/g, '')))}
                    keyboardType='numeric'
                />

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
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    footer: {
        alignItems: 'center',
        marginBottom: 50
    },
    textInputHeader: {
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading,
        fontWeight: 'bold'
    },
    textInput: {
        width: 60,
        paddingVertical: 12,
        marginBottom: 40,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.gray,
        color: colors.heading,
        textAlign: 'right',
        paddingHorizontal: 10
    }
})