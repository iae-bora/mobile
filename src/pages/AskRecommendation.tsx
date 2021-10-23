import React, { useEffect, useState } from 'react';
import { TextInput, StatusBar, StyleSheet, Text, View, Alert, Platform, TouchableOpacity, ScrollView, SafeAreaView, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { format, isBefore } from 'date-fns';

import colors from '../styles/colors';

import { Button } from '../components/Button';
import { Load } from '../components/Load';

import api from '../services/api';
import { User } from '../types/user';

export function AskRecommendation(){
    const navigation = useNavigation();
    const routes = useRoute();
    const user = routes.params as User;
    
    const [loading, setLoading] = useState(false);
    const [localsQuantity, setLocalsQuantity] = useState(1);
    const [takeNewPlaces, setTakeNewPlaces] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');
    const [mode, setMode] = useState('date');
    const [answers, setAnswers] = useState<object>();

    useEffect(() => {
        async function getAnswers(){
            try {
                const { data } = await api.get(`/answers/${user.id}`);
                setAnswers(data);
                setLoading(false);
            } catch (error: any) {
                setLoading(false);
                Alert.alert('Não foi possível carregar seus dados, tente novamente');
                navigation.goBack();
            }
        }
        setLoading(true);
        getAnswers();
    }, []);

    async function handleSubmit(){
        if(localsQuantity <= 0 || localsQuantity > 10){
            return Alert.alert('Erro', 'A quantidade de locais deve ser maior ou igual a 1 e menor ou igual a 10');
        }
        if(isBefore(selectedDateTime, Date.now())){
            return Alert.alert('Erro', 'A data e hora precisa maior que o momento atual');
        }

        try {
            const newAnswers = { 
                ...answers, 
                placesCount: localsQuantity,
                routeDateAndTime: `${format(selectedDateTime, 'yyyy-MM-dd')}T${format(selectedDateTime, 'HH:mm')}:00.000Z`,
                takeNewPlaces
            };
            setLoading(true);
            await api.put('/answers', newAnswers);

            const { status, data } = await api.post('/routes', newAnswers);
            setLoading(false);
            if(status == 200){
                navigation.navigate('Recommendation', {
                    createdRoute: data[0],
                    creating: true
                });
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Erro', 'Erro ao tentar gerar a rota, tente novamente');
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

    if(loading) return <Load/>

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps='handled'>
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

                    <View style={styles.checkboxContainer}>
                        <BouncyCheckbox
                            size={50}
                            fillColor={colors.background_blue}
                            unfillColor={colors.white}
                            isChecked={takeNewPlaces}
                            iconStyle={{ borderColor: colors.background_blue }}
                            disableText
                            style={{ 
                                paddingRight: 40
                            }}
                            onPress={(isChecked: boolean) => {setTakeNewPlaces(isChecked)}}
                        />
                        <Text style={styles.filterLabel}>Deseja visitar apenas locais novos?</Text>
                    </View>

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
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollContainer: {
        width: '100%',
        paddingHorizontal: 30
    },
    header: {
        alignItems: 'center',
        paddingVertical: Platform.OS == 'ios' ? 20 : 40
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
        paddingVertical: Platform.OS == 'ios' ? 0 : 30
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
        width: 50,
        fontSize: 18,
        marginBottom: 40,
        padding: 10,
        alignSelf: 'center',
        textAlign: 'center'
    },
    checkboxContainer: { 
        flexDirection: 'row', 
        paddingHorizontal: 60, 
        justifyContent: 'space-around', 
        marginBottom: 40 
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
        alignItems: 'center',
        marginBottom: 20
    }
})