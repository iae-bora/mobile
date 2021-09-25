import React, { useState } from 'react';
import { TextInput, StatusBar, StyleSheet, Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../styles/colors';

import { Button } from '../components/Button';

import api from '../services/api';

export function AskRecommendation(){
    const navigation = useNavigation();
    const [distance, setDistance] = useState(5);
    const [localsQuantity, setLocalsQuantity] = useState(1);

    async function handleSubmit(){
        // const response = await api.post('/routes', {
        //     distance,
        //     localsQuantity
        // });
        const response = {
            status: 200,
            data: [{
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
        }

        if(response.status == 200){
            navigation.navigate('Recommendation', response.data);
        }
        else {
            return Alert.alert('Erro', 'Ocorreu um erro ao tentar salvar os dados. Tente novamente');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Até onde quero ir?</Text>
            </View>

            <View style={styles.filterContainer}>
                <Text style={styles.filter}>Distância (km)</Text>

                <TextInput style={styles.filterInput} value={distance.toString()} onChangeText={text => setDistance(+text)} />
            </View>

            <View style={styles.filterContainer}>
                <Text style={styles.filter}>Quantidade de locais</Text>

                <TextInput style={styles.filterInput} value={localsQuantity.toString()} onChangeText={text => setLocalsQuantity(+text)} />
            </View>

            <View style={styles.footer}>
                <Button 
                    title='Confirmar'
                    onPress={handleSubmit}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: StatusBar.currentHeight,
        alignItems: 'center',
        paddingHorizontal: 20
    },
    header: {
        alignItems: 'center',
        paddingVertical: 40
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 38,
        lineHeight: 34,
        color: colors.heading,
        fontWeight: 'bold'
    },
    filterContainer: {
        alignItems: 'center',
        marginBottom: 50
    },
    filter: {
        fontSize: 24,
        color: colors.heading,
        fontWeight: 'bold'
    },
    filterInput: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 20,
        padding: 10
    },
    footer: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center'
    }
})