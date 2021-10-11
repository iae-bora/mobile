import React, { useEffect, useState } from 'react';
import { TextInput, StatusBar, StyleSheet, Text, View, Alert, Platform, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import colors from '../styles/colors';

import { Button } from '../components/Button';

import api from '../services/api';
import { User } from '../types/user';

export function AskRecommendation(){
    const navigation = useNavigation();
    const routes = useRoute();
    const user = routes.params as User;
    
    const [localsQuantity, setLocalsQuantity] = useState(1);
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');
    const [mode, setMode] = useState('date');
    const [answers, setAnswers] = useState<object>();

    useEffect(() => {
        async function getAnswers(){
            try {
                const { data } = await api.get(`/answers/${user.id}`);
                setAnswers(data);
            } catch (error: any) {
                Alert.alert('Não foi possível carregar seus dados, tente novamente');
                navigation.goBack();
            }
        }
        getAnswers();
    }, []);

    async function handleSubmit(){
        if(localsQuantity <= 0 || localsQuantity > 10){
            return Alert.alert('A quantidade de locais deve ser maior ou igual a 1 e menor ou igual a 10');
        }
        if(isBefore(selectedDateTime, Date.now())){
            return Alert.alert('A data deve ser após ao dia de hoje');
        }

        try {
            const newAnswers = { 
                ...answers, 
                placesCount: localsQuantity,
                routeDateAndTime: `${format(selectedDateTime, 'yyyy-MM-dd')}T${format(selectedDateTime, 'HH:mm')}:00.000Z`
            };
            await api.put('/answers', newAnswers);

            const { status, data } = await api.post('/routes', newAnswers);
            if(status == 200){
                navigation.navigate('Recommendation', data[0]);
            }
        } catch (error) {
            Alert.alert('Erro ao tentar gerar a rota, tente novamente');
        }
    }

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS === 'android'){
            setShowDatePicker(oldState => !oldState);
        }

        if(dateTime){
            setSelectedDateTime(dateTime);
        }
    }

    function handleOpenDatePickerForAndroid(){
        setMode('date');
        setShowDatePicker(oldState => !oldState);
    }

    function handleOpenTimePickerForAndroid(){
        setMode('time');
        setShowDatePicker(oldState => !oldState);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Detalhes da rota 😊</Text>
            </View>

            <View style={styles.filterContainer}>
                <Text style={styles.filterLabel}>Quantidade de locais</Text>
                <TextInput 
                    style={styles.filterInput} 
                    value={localsQuantity.toString()} 
                    onChangeText={text => setLocalsQuantity(+text)} 
                />

                <Text style={styles.filterLabel}>Data e hora de início do passeio</Text>
                {
                    showDatePicker && mode && (
                    <DateTimePicker 
                        value={selectedDateTime}
                        style={[styles.dateTimePickerButton, styles.dateTimePickerContainer, styles.dateTimePickerIOSButton]}
                        mode={Platform.OS == 'ios' ? 'datetime' : (mode == 'date' ? 'date' : 'time')}
                        display='spinner'
                        onChange={handleChangeTime}
                        minimumDate={new Date()}
                        locale='pt-BR'
                    />
                )}

                {
                    Platform.OS === 'android' && (
                        <View style={styles.dateTimePickerContainer}>
                            <View style={styles.dateTimeAndroidContainer}>
                                <Text style={styles.dateTimeText}>
                                    Data: {' '}
                                </Text>
                                <TouchableOpacity 
                                    style={[styles.dateTimePickerButton, styles.dateTimePickerAndroidButton]}
                                    onPress={handleOpenDatePickerForAndroid}
                                >
                                    <Text style={[styles.dateTimeText]}>
                                        {`${format(selectedDateTime, 'dd/MM/yyyy')}`}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.dateTimeAndroidContainer}>
                                <Text style={styles.dateTimeText}>
                                    Horário: {' '}
                                </Text>
                                <TouchableOpacity 
                                    style={[styles.dateTimePickerButton, styles.dateTimePickerAndroidButton]}
                                    onPress={handleOpenTimePickerForAndroid}
                                >
                                    <Text style={styles.dateTimeText}>
                                        {`${format(selectedDateTime, 'HH:mm')}`}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
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
        paddingHorizontal: 40,
        justifyContent: 'center'
    },
    header: {
        alignItems: 'center',
        paddingVertical: Platform.OS == 'ios' ? 20 : 40,
        marginBottom: 10
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
        marginBottom: 10,
        alignItems: 'center',
        paddingVertical: Platform.OS == 'ios' ? 0 : 60
    },
    filterLabel: {
        fontSize: 22,
        color: colors.heading,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    filterInput: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginBottom: 40,
        padding: 10,
        alignSelf: 'center',
        textAlign: 'center'
    },
    dateTimePickerContainer: {
        paddingVertical: 12,
        marginBottom: 10
    },
    dateTimePickerButton: {
        borderRadius: 20
    },
    dateTimePickerAndroidButton: {
        backgroundColor: colors.shape,
        paddingHorizontal: 20
    },
    dateTimePickerIOSButton: {
        width: 300
    },
    dateTimeAndroidContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },
    dateTimeText: {
        color: colors.heading,
        alignSelf: 'center',
        fontSize: 24,
        paddingVertical: 8,
    },
    footer: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center'
    }
})