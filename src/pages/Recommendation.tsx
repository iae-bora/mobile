import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

import colors from '../styles/colors';

import { Button } from '../components/Button';

interface TouristicSpotProps {
    id: number;
    place: {
        id: number;
        name: string;
        image: string;
        business_status: string;
        address: string;
        phone?: string;
    }
    opening_hours: {
        id: number;
        day_of_week: string;
        open: boolean;
        start_hour?: string;
        end_hour?: string;
    }
}

export function Recommendation(){
    const navigation = useNavigation();
    const route = useRoute();

    const params = route.params as Array<TouristicSpotProps>;

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
                    {params.map(touristicSpot => {
                        return (
                            <View key={touristicSpot.id} style={styles.cardWrapper}>
                                <Card>
                                    <Card.Cover source={{ uri: touristicSpot.place.image }} />
                                    <Card.Content style={styles.cardContent}>
                                        <Title>{touristicSpot.place.name}</Title>
                                        <Paragraph>{touristicSpot.place.address}</Paragraph>
                                        <Paragraph>{touristicSpot.opening_hours.start_hour} - {touristicSpot.opening_hours.end_hour}</Paragraph>
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