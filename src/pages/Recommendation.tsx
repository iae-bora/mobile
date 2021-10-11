import React from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import colors from '../styles/colors';

import { Button } from '../components/Button';
import { Route } from '../types/touristPoint';

export function Recommendation(){
    const navigation = useNavigation();
    const route = useRoute();

    const categories = ['Parque', 'Museu', 'Cinema', 'Shopping', 'Bar', 'Show', 'Biblioteca', 'Estádio', 'Jogos', 'Teatro'];
    const params = route.params as Route;

    async function handleSubmit(){
        navigation.navigate('Home');
    }

    const setByTimezone = (datetime: string) => {
        const date: Date = new Date(datetime);
        const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        return new Date(date.getTime() + userTimezoneOffset);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Sua recomendação 🛣</Text>
                </View>

                <View style={styles.dateContainer}>
                    <Text style={styles.date}>Data: {format(Date.parse(params.routeDate), 'dd/MM/yyyy')}</Text>
                </View>

                <View style={styles.content}>
                    {params.touristPoints.map(touristPoint => {
                        return (
                            <View key={touristPoint.id} style={styles.cardWrapper}>
                                <Card>
                                    <Card.Cover source={{ uri: touristPoint.openingHours.place.image || '' }} />
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

                <View style={styles.footer}>
                    <Button 
                        title='Bora lá!'
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
    }
})