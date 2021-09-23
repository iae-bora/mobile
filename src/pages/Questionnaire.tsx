import React, { useState, useEffect } from 'react';
import { Alert, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import colors from '../styles/colors';

import { UserProps, saveUserData } from '../libs/storage';
import api from '../services/api';
import { Question } from '../components/Question';
import { Button } from '../components/Button';

type RouteParams = UserProps & {
    status: string;
}

export function Questionnaire(){
    const navigation = useNavigation();
    const route = useRoute();
    const user = route.params as RouteParams;

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

    const answersQuestionOne = ["Rock","Sertanejo","Forró","Gospel","Pop","Funk","RAP"]
    const answersQuestionTwo = ["Churrasco","Caseira","Vegetariana","Fast Food","Japonesa","Italiana"]
    const answersQuestionThree = ["Drama","Ação","Aventura","Romance","Animação","Suspense","Terror","Comédia"]
    const answersQuestionFour = ["Futebol","Basquete","Volei","Tênis","Lutas"]
    const answersQuestionFive = ["Palmeiras","Corinthians","Santos","São Paulo","Nenhum"]
    const answersQuestionSix = ["Cristianismo","Judeu","Hinduísmo","Budismo","Judaísmo","Espiritismo","Nenhuma"]
    const answersQuestionSeven = ["Sim","Não"]

    const [answerOne, setAnswerOne] = useState<number>();
    const [answerTwo, setAnswerTwo] = useState<number>();
    const [answerThree, setAnswerThree] = useState<number>();
    const [answerFour, setAnswerFour] = useState<number>();
    const [answerFive, setAnswerFive] = useState<number>();
    const [answerSix, setAnswerSix] = useState<number>();
    const [answerSeven, setAnswerSeven] = useState<number>();

    useEffect(() => {
        async function retrieveAnswers(){
            const response = await api.get(`/answers/${user.uid}`);
            if(response.status == 200){
                const answers = response.data;

                setAnswerOne(answers['Musics']);
                setAnswerTwo(answers['Foods']);
                setAnswerThree(answers['Movies']);
                setAnswerFour(answers['Sports']);
                setAnswerFive(answers['Teams']);
                setAnswerSix(answers['Religions']);
                setAnswerSeven(answers['HaveChildren']);
                setSelectedDateTime(answers['DateBirthday'])
            }
        }

        if(user.status == 'update'){
            retrieveAnswers();
        }
    }, []);

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS === 'android'){
            setShowDatePicker(oldState => !oldState);
        }

        if(dateTime){
            setSelectedDateTime(dateTime);
        }
    }

    function handleOpenDateTimePickerForAndroid(){
        setShowDatePicker(oldState => !oldState);
    }

    async function handleSubmit(){
        const answers = [answerOne, answerTwo, answerThree, answerFour, answerFive, answerSix, answerSeven];
        if (answers.includes(undefined)){
            return Alert.alert(
                'Erro',
                'Responda todas as perguntas para continuar!'
            )
        }

        const requestData = {
            "Musics": answerOne,
            "Foods": answerTwo,
            "Movies": answerThree,
            "Sports": answerFour,
            "Teams": answerFive,
            "Religions": answerSix,
            "HaveChildren": answerSeven,
            "DateBirthday": format(selectedDateTime, 'dd/MM/yyyy')
        }

        let response;
        if(user.status == 'create'){
            response = await api.post('/answers', requestData);
        }
        else{
            response = await api.put('/answers', requestData);
        }

        if(response.status == 200){
            const newUserData = {...user, registrationStep: 'completed'};
            await saveUserData(newUserData);
            navigation.navigate('Home', newUserData);
        }
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

                <Text style={styles.dateTimeHeaderText}>Data de nascimento</Text>
                {
                    showDatePicker && (
                    <DateTimePicker 
                        value={selectedDateTime}
                        style={styles.dateTimePickerButton}
                        mode='date'
                        display='spinner'
                        onChange={handleChangeTime}
                        maximumDate={new Date()}
                        locale='pt-BR'
                    />
                )}

                {
                    Platform.OS === 'android' && (
                        <TouchableOpacity 
                            style={styles.dateTimePickerButton}
                            onPress={handleOpenDateTimePickerForAndroid}
                        >
                            <Text style={styles.dateTimePickerText}>
                                {`${format(selectedDateTime, 'dd/MM/yyyy')}`}
                            </Text>
                        </TouchableOpacity>
                    )
                }

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
    dateTimeHeaderText: {
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading,
        fontWeight: 'bold'
    },
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 12,
        marginBottom: 40
    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24
    }
})