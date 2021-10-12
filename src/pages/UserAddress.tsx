import React, { useState } from 'react';
import { 
    SafeAreaView, 
    View, 
    Text, 
    StyleSheet, 
    KeyboardAvoidingView, 
    Platform, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaskedTextInput } from 'react-native-mask-text';

import { UserProps, saveUserData } from '../libs/storage';
import api from '../services/api';
import { Button } from '../components/Button';
import { Load } from '../components/Load';

import colors from '../styles/colors';

export function UserAddress(){
    const navigation = useNavigation();
    const routes = useRoute();
    const [address, setAddress] = useState<string>();
    const [loading, setLoading] = useState(false);

    const userData = routes.params as UserProps;

    async function handleSubmit(){
        try {
            if(!address){
                return Alert.alert('Digite seu CEP!');
            }
            setLoading(true);
            const response = await api.post('/users', {
                googleId: userData.id,
                address
            });

            if(response.status == 200){
                const newUserData = {...userData, address, registrationStep: 'questionnaire'};
                await saveUserData(newUserData);
                setLoading(false);
                navigation.navigate('Questionnaire', {...newUserData, status: 'create'});
            }
            else {
                setLoading(false);
                return Alert.alert('Erro', 'Ocorreu um erro ao tentar salvar os dados. Tente novamente');
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar salvar os dados. Tente novamente');
        }
    }

    function handleInputChange(value: string){
        setAddress(value);
    }

    if(loading) return <Load/>

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
                                    Qual seu CEP?
                                </Text>

                                <Text style={styles.subtitle}>
                                    Precisamos dessa informação para {'\n'}
                                    criarmos melhores rotas para você
                                </Text>
                            </View>

                            <MaskedTextInput 
                                style={styles.input}
                                placeholder='Digite seu CEP'
                                onChangeText={(text: string, rawText: string) => handleInputChange(rawText)}
                                mask='99999-999'
                                keyboardType='numeric'
                            ></MaskedTextInput>

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