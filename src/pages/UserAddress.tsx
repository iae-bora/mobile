import React, { useState } from 'react';
import { 
    SafeAreaView, 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    KeyboardAvoidingView, 
    Platform, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { UserProps, saveUserData } from '../libs/storage';
import api from '../services/api';
import { Button } from '../components/Button';

import colors from '../styles/colors';

export function UserAddress(){
    const navigation = useNavigation();
    const routes = useRoute();
    const [address, setAddress] = useState<string>();

    const userData = routes.params as UserProps;

    async function handleSubmit(){
        try {
            if(!address){
                return Alert.alert('Digite seu endereço!');
            }
            // const response = await api.post('/users', {
            //     ...userData,
            //     address
            // });
            const response = {
                status: 200
            }

            if(response.status == 200){
                const newUserData = {...userData, registrationStep: 'questionnaire', status: 'create'};
                await saveUserData(newUserData);
                navigation.navigate('Questionnaire', newUserData); 
            }
            else {
                return Alert.alert('Erro', 'Ocorreu um erro ao tentar salvar os dados. Tente novamente');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao tentar salvar os dados. Tente novamente');
        }
    }

    function handleInputChange(value: string){
        setAddress(value);
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.title}>
                                    Qual seu endereço?
                                </Text>

                                <Text style={styles.subtitle}>
                                    Precisamos dessa informação para {'\n'}
                                    criarmos melhores rotas para você
                                </Text>
                            </View>

                            <TextInput 
                                style={styles.input}
                                placeholder='Digite seu endereço'
                                onChangeText={handleInputChange}
                            ></TextInput>

                            <View style={styles.footer}>
                                <Button 
                                    title='Confirmar'
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
    },
    header: {
        alignItems: 'center'
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 70,
        padding: 10
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 0,
        fontWeight: 'bold'
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 20,
        color: colors.heading
    },
    footer: {
        marginTop: 50,
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center'
    }
})