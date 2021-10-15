import React, { useEffect, useState } from 'react';
import { Alert, Linking, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { Rating } from 'react-native-ratings';

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
}

export function Recommendation(){
    const navigation = useNavigation();
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>();
    const [feedback, setFeedback] = useState<Feedback>();

    const categories = ['Parque', 'Museu', 'Cinema', 'Shopping', 'Bar', 'Restaurante', 'Show', 'Biblioteca', 'Estádio', 'Jogos', 'Teatro'];
    const { createdRoute, creating } = route.params as Recommendation;

    useEffect(() => {
        async function getFeedbackFromRoute(){
            try {
                const userData = await loadUserData();
                setUser(userData);

                const { status, data } = await api.get(`/feedback/${userData.id}`);
                if(status == 200){
                    const routeFeedback = data.filter((userFeedback: Feedback) => {
                        return userFeedback.userRouteId = createdRoute.id
                    })
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
        const url = 'https://reactnative.dev/docs/alert'
        Linking.canOpenURL(url).then(supported => {
            if(supported){
                Linking.openURL(url);
            }
            else{
                Alert.alert('Não foi possível abrir o forms, tente novamente');
            }
        })
    }

    const setByTimezone = (datetime: string) => {
        const date: Date = new Date(datetime);
        const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        return new Date(date.getTime() + userTimezoneOffset);
    }

    if(loading) return <Load/>

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Sua recomendação 🛣</Text>
                </View>

                <View style={styles.dateContainer}>
                    <Text style={styles.date}>Data: {format(Date.parse(createdRoute.routeDate), 'dd/MM/yyyy')}</Text>
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
                                            {format(setByTimezone(touristPoint.startHour), 'HH:mm')} - {format(setByTimezone(touristPoint.endHour), 'HH:mm')}
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
                            <View style={{ marginBottom: 20 }}>
                                <Button 
                                    title='Avaliar'
                                    onPress={openFormsWebPage}
                                />
                            </View>

                            <View>
                                <Button 
                                    title='Bora lá!'
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    ) : (
                        <View style={styles.footer}>
                            {feedback ? (
                                <View style={{ marginBottom: 20 }}>
                                    <Rating
                                        startingValue={feedback.rating}
                                        readonly
                                    />
                                </View>
                            ) : (
                                <View style={{ marginBottom: 20 }}>
                                    <Button 
                                        title='Avaliar'
                                        onPress={() => navigation.navigate('Feedback', user)}
                                    />
                                </View>
                                
                            )}

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
    backButton: {
        backgroundColor: colors.white,
        borderColor: colors.background_blue,
        color: colors.background_blue,
        borderWidth: 2
    },
    backButtonText: {
        color: colors.background_blue
    }
})