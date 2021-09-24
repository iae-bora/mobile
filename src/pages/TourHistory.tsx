import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { useRoute } from '@react-navigation/core';

import colors from '../styles/colors';

import { UserProps } from '../libs/storage';
import api from '../services/api';

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

interface TouristicRouteProps {
    id: number;
    places: Array<TouristicSpotProps>;
}

export function TourHistory(){
    const routes = useRoute();
    const [touristicSpotsHistoric, setTouristicSpotsHistoric] = useState<Array<TouristicRouteProps>>();

    const user = routes.params as UserProps;

    useEffect(() => {
        async function retrieveTouristicSpotsHistoric(){
            // const response = await api.get(`/routes/${user.uid}`);
            const response = {
                status: 200,
                data: [{
                    id: 1,
                    places: [{
                        id: 1,
                        place: {
                            id: 2,
                            name: 'Parque Raphael Lazzuri',
                            address: 'Av. Kennedy, 1111 - Anchieta, São Bernardo do Campo - SP, 09726-263, Brasil',
                            image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/6e/2c/3a/parque-rafael-lazzuri.jpg?w=300&h=300&s=1',
                            business_status: 'OPERATIONAL',
                            phone: '(11) 4332-4510',
                            category_id: 1
                        },
                        opening_hours: {
                            id: 10,
                            day_of_week: 'sexta-feira',
                            open: true,
                            start_hour: '6:00',
                            end_hour: '22:00'
                        }
                    },
                    {
                        id: 2,
                        place: {
                            id: 4,
                            name: 'Golden Square Shopping',
                            address: 'Av. Kennedy, 1111 - Anchieta, São Bernardo do Campo - SP, 09726-263, Brasil',
                            image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/6e/2c/3a/parque-rafael-lazzuri.jpg?w=300&h=300&s=1',
                            business_status: 'OPERATIONAL',
                            phone: '(11) 4332-4510',
                            category_id: 1
                        },
                        opening_hours: {
                            id: 20,
                            day_of_week: 'sexta-feira',
                            open: true,
                            start_hour: '6:00',
                            end_hour: '22:00'
                        }
                    }]
                }]
            }
            if(response.status == 200){
                setTouristicSpotsHistoric(response.data);
            }
        }

        retrieveTouristicSpotsHistoric();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Onde já visitei? 🤔</Text>
                </View>

                <View style={styles.content}>
                    {touristicSpotsHistoric?.map(touristicSpotRoute => {
                        return (
                            <View key={touristicSpotRoute.id} style={styles.listWrapper}>
                                <List.Section>
                                    <List.Subheader style={styles.subheader}>12/08/2021</List.Subheader>
                                    {touristicSpotRoute.places.map(touristicSpot => {
                                        return (
                                            <View key={touristicSpot.id}>
                                                <Divider style={styles.subheaderDivider} />
                                                <List.Item style={styles.listItem} title={touristicSpot.place.name} />
                                            </View>
                                        )
                                    })}
                                </List.Section>
                            </View>
                        )
                    })}
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
    listWrapper: {
        marginVertical: 20,
        borderColor: colors.gray,
        borderRadius: 8,
        borderWidth: 1
    },
    subheader: {
        color: colors.heading,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 0
    },
    subheaderDivider: {
        color: colors.gray,
        height: 4
    },
    listItem: {
        paddingVertical: 10
    }
})