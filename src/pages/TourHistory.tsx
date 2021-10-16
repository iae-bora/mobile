import React, { useState, useEffect } from 'react';
import { Alert, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/core';
import { format, isBefore } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../styles/colors';

import { User } from '../types/user';
import { Route } from '../types/touristPoint';
import api from '../services/api';
import { Load } from '../components/Load';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function TourHistory(){
    const routes = useRoute();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [touristSpotsHistoric, setTouristSpotsHistoric] = useState<Array<Route>>();

    const user = routes.params as User;

    useEffect(() => {
        async function retrieveTouristSpotsHistoric(){
            try {
                const { status, data } = await api.get(`/routes/all/${user.id}`);
                if(status == 200){
                    // const tourHistory = data.filter((touristSpot: Route) => {
                    //     return isBefore(Date.parse(touristSpot.routeDate), Date.now())
                    // });
                    // setTouristSpotsHistoric(tourHistory);
                    const tourHistory = data.filter((route: Route) => {
                        return route.touristPoints.length > 0
                    });
                    setTouristSpotsHistoric(tourHistory);
                } 
                setLoading(false);
            } catch (error: any) {
                setLoading(false);
                Alert.alert('Erro', 'Não foi possível carregar seu histórico de rotas, tente novamente');
                navigation.goBack();
            }
        }
        setLoading(true);
        retrieveTouristSpotsHistoric();
    }, []);

    if(loading) return <Load/>

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={{ paddingHorizontal: 40 }}>
                <View style={styles.header}>
                    <Text style={styles.title}>Onde já visitei? 🤔</Text>
                    <Text style={styles.subtitle}>Clique em um dos cards para avaliar a recomendação</Text>
                </View>

                {
                    touristSpotsHistoric && (
                        <View style={styles.content}>
                            {touristSpotsHistoric.map(touristSpotRoute => {
                                return (
                                    <TouchableOpacity
                                        key={touristSpotRoute.id}
                                        onPress={() => navigation.navigate('Recommendation', {
                                            createdRoute: touristSpotRoute,
                                            creating: false
                                        })}
                                    >
                                        <View style={styles.listWrapper}>
                                            <List.Section>
                                                <View style={styles.subheaderContainer}>
                                                    <List.Subheader style={styles.subheader}>
                                                        {format(Date.parse(touristSpotRoute.routeDate), 'dd/MM/yyyy')}
                                                    </List.Subheader>
                                                    <List.Subheader style={styles.subheader}>
                                                        <MaterialIcons 
                                                                name='keyboard-arrow-right'
                                                                size={30}
                                                                color={colors.heading}
                                                            />
                                                    </List.Subheader>
                                                </View>
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
                                    </TouchableOpacity>
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
    subtitle: {
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 20,
        marginTop: 10,
        color: colors.heading
    },
    content: {
        marginBottom: 20
    },
    listWrapper: {
        marginVertical: 20,
        borderColor: colors.gray,
        borderRadius: 8,
        borderWidth: 1,
        paddingBottom: 0
    },
    subheaderContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingRight: 0,
        paddingVertical: 10
    },
    subheader: {
        color: colors.heading,
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 0
    },
    subheaderDivider: {
        backgroundColor: colors.gray,
        height: 2
    },
    listItem: {
        paddingVertical: 10
    }
})