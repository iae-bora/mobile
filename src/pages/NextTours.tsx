import React, { useState, useEffect } from 'react';
import { Alert, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/core';
import { format, isAfter } from 'date-fns';

import colors from '../styles/colors';

import { User } from '../types/user';
import { Route } from '../types/touristPoint';
import api from '../services/api';

export function NextTours(){
    const routes = useRoute();
    const navigation = useNavigation();
    const [touristSpotsHistoric, setTouristSpotsHistoric] = useState<Array<Route>>();

    const user = routes.params as User;

    useEffect(() => {
        async function retrieveTouristSpotsHistoric(){
            try {
                const { status, data } = await api.get(`/routes/all/${user.id}`);
                if(status == 200){
                    const nextTours = data.filter((touristSpot: Route) => {
                        return isAfter(Date.parse(touristSpot.routeDate), Date.now())
                    });
                    setTouristSpotsHistoric(nextTours);
                }  
            } catch (error) {
                console.log(error);
                Alert.alert('Não foi possível carregar seu histórico de rotas, tente novamente');
                navigation.goBack();
            }
        }

        retrieveTouristSpotsHistoric();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={{ paddingHorizontal: 30 }}>
                <View style={styles.header}>
                    <Text style={styles.title}>Próximos passeios 🚏</Text>
                </View>

                {
                    touristSpotsHistoric && (
                        <View style={styles.content}>
                            {touristSpotsHistoric.map(touristSpotRoute => {
                                return (
                                    <View key={touristSpotRoute.id} style={styles.listWrapper}>
                                        <List.Section>
                                            <List.Subheader style={styles.subheader}>
                                                {format(Date.parse(touristSpotRoute.routeDate), 'dd/MM/yyyy')}
                                            </List.Subheader>
                                            {touristSpotRoute.touristPoints.map(touristSpot => {
                                                return (
                                                    <View key={touristSpot.id}>
                                                        <Divider style={styles.subheaderDivider} />
                                                        <List.Item style={styles.listItem} title={touristSpot.openingHours.place.name} />
                                                    </View>
                                                )
                                            })}
                                        </List.Section>
                                    </View>
                                )
                            })}
                        </View>
                    )
                }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        alignItems: 'center'
    },
    scrollContainer: {
        width: '100%',
        paddingHorizontal: 30
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