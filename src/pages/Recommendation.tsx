import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

import colors from '../styles/colors';

import { Button } from '../components/Button';
import { Route } from '../types/touristicPoint';

export function Recommendation(){
    const navigation = useNavigation();
    const route = useRoute();

    const params = route.params as Route;

    async function handleSubmit(){
        navigation.navigate('Home');
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Sua recomendação 🛣</Text>
                </View>

                <View style={styles.content}>
                    {params.touristPoints.map(touristPoint => {
                        return (
                            <View key={touristPoint.id} style={styles.cardWrapper}>
                                <Card>
                                    <Card.Cover source={{ uri: touristPoint.openingHours.place.image || '' }} />
                                    <Card.Content style={styles.cardContent}>
                                        <Title>{touristPoint.openingHours.place.name}</Title>
                                        <Paragraph>{touristPoint.openingHours.place.address}</Paragraph>
                                        <Paragraph>{touristPoint.openingHours.place.rating}</Paragraph>
                                        <Paragraph>{touristPoint.startHour} - {touristPoint.endHour}</Paragraph>
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
    content: {
        marginBottom: 20
    },
    cardWrapper: {
        marginVertical: 20
    },
    cardContent: {
        paddingVertical: 10
    },
    footer: {
        alignItems: 'center',
        marginBottom: 50
    }
})