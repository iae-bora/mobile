import React, { useEffect, useState } from 'react';
import { Alert, Linking, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment-timezone';
import { Rating } from 'react-native-ratings';
import AwesomeAlert from 'react-native-awesome-alerts';

import colors from '../styles/colors';
import logo from '../assets/logo.png';

import { Button } from '../components/Button';
import { Load } from '../components/Load';
import { Route } from '../types/touristPoint';
import { User } from '../types/user';

import api from '../services/api';
import { loadUserData } from '../libs/storage';

interface Recommendation {
    createdRoute: Route;
    creating: boolean;
}

interface Feedback {
    id: number;
    rating: number;
    text?: string;
    userRouteId: number;
    route: {
        id: number;
    }
}

export function Recommendation(){
    const navigation = useNavigation();
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>();
    const [feedback, setFeedback] = useState<Feedback | undefined>(undefined);

    const categories = ['Parque', 'Museu', 'Cinema', 'Shopping', 'Bar', 'Restaurante', 'Show', 'Biblioteca', 'Estádio', 'Jogos', 'Teatro'];
    const { createdRoute, creating } = route.params as Recommendation;

    useEffect(() => {
        async function getFeedbackFromRoute(){
            try {
                const userData = await loadUserData();
                setUser(userData);

                const { status, data } = await api.get(`/feedback/${userData.id}`);
                if(status == 200 && data.length > 0){
                    const routeFeedback = data.filter((userFeedback: Feedback) => {
                        return userFeedback.route.id == createdRoute.id
                    })[0];
                    setFeedback(routeFeedback);
                }
            } catch (error: any) {
                console.log(error);
            }
            setLoading(false);
        }
        if(!creating){
            setLoading(true);
            getFeedbackFromRoute();
        }
    }, []);

    async function handleSubmit(){
        navigation.navigate('Home');
    }

    function openFormsWebPage(){
        const url = 'https://forms.gle/771NaYDCgVpcKDCR9';
        Linking.canOpenURL(url).then(supported => {
            if(supported){
                Linking.openURL(url);
            }
            else{
                Alert.alert('Não foi possível abrir o forms, tente novamente');
            }
        })
    }

    const [showAlertMsg, setShowAlertMsg] = useState(false);

    const showAlert = () => {
        if(feedback){
            openFormsWebPage();
        }
        else{
            setShowAlertMsg(true);
        }
    };

    if(loading) return <Load/>

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Sua recomendação 🛣</Text>
                </View>

                <AwesomeAlert
                    show={showAlertMsg}
                    showProgress={false}
                    title="Avaliação"
                    message={
                        `Qual tipo de avaliação você gostaria de fazer?
                        ${'\n'} No momento estamos priorizando as avaliações realizadas pelo Forms!`
                    }
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={true}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="  Aplicativo  "
                    confirmText="       Forms       "
                    confirmButtonColor={colors.background_blue}
                    onCancelPressed={() => {
                        navigation.navigate('Feedback', { userRouteId: createdRoute.id });
                        setShowAlertMsg(false);
                    }}
                    onConfirmPressed={() => {
                        openFormsWebPage();
                        setShowAlertMsg(false);
                    }}
                    onDismiss={() => {
                        setShowAlertMsg(false);
                    }}
                    titleStyle={styles.alertTitleStyle}
                    messageStyle={styles.alertMessageStyle}
                />

                <View style={styles.dateContainer}>
                    <Text style={styles.date}>Data: {moment.tz(createdRoute.routeDate, 'UTC').format('DD/MM/yyyy')}</Text>
                </View>

                <View style={styles.content}>
                    {createdRoute.touristPoints.map(touristPoint => {
                        return (
                            <View key={touristPoint.id} style={styles.cardWrapper}>
                                <Card>
                                    <Card.Cover 
                                        source={
                                            touristPoint.openingHours.place.image ? ({ uri: touristPoint.openingHours.place.image }) : (logo)
                                        } 
                                    />
                                    <Card.Content style={styles.cardContent}>
                                        <Title style={styles.cardTitle}>{touristPoint.openingHours.place.name}</Title>
                                        <Paragraph>
                                            <Text style={{fontWeight: 'bold'}}>Endereço: </Text>
                                            {touristPoint.openingHours.place.address}
                                        </Paragraph>
                                        <Paragraph>
                                            <Text style={{fontWeight: 'bold'}}>Nota geral: </Text>
                                            {touristPoint.openingHours.place.rating}
                                        </Paragraph>
                                        <Paragraph>
                                            <Text style={{fontWeight: 'bold'}}>Categoria: </Text>
                                            {categories[touristPoint.openingHours.place.category - 1]}
                                        </Paragraph>
                                        <Paragraph>
                                            <Text style={{fontWeight: 'bold'}}>Horário do passeio: {' '}</Text>
                                            {moment.tz(touristPoint.startHour, 'UTC').format('HH:mm')} - {moment.tz(touristPoint.endHour, 'UTC').format('HH:mm')}
                                        </Paragraph>
                                    </Card.Content>
                                </Card>
                            </View>
                        )
                    })}
                </View>

                {
                    creating ? (
                        <View style={styles.footer}>
                            <Text style={styles.feedbackText}>
                                O que achou da recomendação? Avalie clicando no botão abaixo, sua opinião é muito importante para nós!
                            </Text>
                            <View style={{ marginBottom: 20 }}>
                                <Button 
                                    title='Avaliar'
                                    onPress={openFormsWebPage}
                                />
                            </View>

                            <View>
                                <Button 
                                    title='Voltar'
                                    onPress={handleSubmit}
                                    button_style={styles.backButton}
                                    text_style={styles.backButtonText}
                                />
                            </View>
                        </View>
                    ) : (
                        <View style={styles.footer}>
                            {feedback && (
                                <View style={{ marginBottom: 40 }}>
                                    <Text style={[styles.feedbackText, { marginBottom: 10 }]}>Sua avaliação</Text>
                                    <Rating
                                        startingValue={feedback.rating}
                                        readonly
                                    />
                                </View>
                            )}
                            <View style={{ marginBottom: 20 }}>
                                <Button 
                                    title={feedback ? "Avaliar pelo Forms" : 'Avaliar'}
                                    onPress={showAlert}
                                />
                            </View>

                            <View>
                                <Button 
                                    button_style={styles.backButton}
                                    text_style={styles.backButtonText}
                                    title='Voltar'
                                    onPress={() => navigation.goBack()}
                                />
                            </View>
                        </View>
                    )
                }
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
        paddingVertical: 20,
        marginBottom: 20
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 38,
        lineHeight: 34,
        color: colors.heading,
        fontWeight: 'bold'
    },
    dateContainer: {
        alignItems: 'center',
        paddingVertical: 20
    },
    date: {
        fontSize: 24,
        textAlign: 'center',
        lineHeight: 34,
        color: colors.heading,
        fontWeight: 'bold'
    },
    content: {
        marginBottom: 20
    },
    cardWrapper: {
        marginVertical: 20
    },
    cardContent: {
        paddingVertical: 10
    },
    cardTitle: {
        color: colors.heading
    },
    footer: {
        alignItems: 'center',
        marginBottom: 50
    },
    feedbackText: {
        paddingHorizontal: 20,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 34,
        color: colors.heading,
        fontWeight: 'bold'
    },
    backButton: {
        backgroundColor: colors.white,
        borderColor: colors.background_blue,
        color: colors.background_blue,
        borderWidth: 2
    },
    backButtonText: {
        color: colors.background_blue
    },
    alertTitleStyle: {
        color: colors.heading,
        fontWeight: 'bold',
        fontSize: 20
    },
    alertMessageStyle: {
        textAlign: 'center',
        fontSize: 15
    }
})