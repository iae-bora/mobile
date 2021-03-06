import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { useNavigation } from '@react-navigation/native';
import { 
    IOS_CLIENT_ID,
    ANDROID_CLIENT_ID,
    IOS_STANDALONE_APP_CLIENT_ID,
    ANDROID_STANDALONE_APP_CLIENT_ID
    } from '@env';

import googleIconImg from '../assets/google-icon.png';
import colors from '../styles/colors';
import api from '../services/api';
import { saveUserData } from '../libs/storage';

type GoogleSignInButton = {
    navigationRoute: string;
    registrationStep: string;
}

export function GoogleSigninButton(props: GoogleSignInButton){
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    async function authenticate() {
        setLoading(true);
        const result = await Google.logInAsync({
            iosClientId: IOS_CLIENT_ID,
            androidClientId: ANDROID_CLIENT_ID,
            iosStandaloneAppClientId: IOS_STANDALONE_APP_CLIENT_ID,
            androidStandaloneAppClientId: ANDROID_STANDALONE_APP_CLIENT_ID,
            scopes: ['profile', 'email']
        });
          
        if (result.type === 'success') {
            const { photoUrl, name, id } = result.user;

            try {
                const { data, status } = await api.get(`/users/${id}`);
                if(status == 200){
                    try {
                        const answers = await api.get(`/answers/${id}`);
                        if(answers.status == 200){
                            const user = { 
                                id: id, 
                                displayName: name, 
                                photoUrl: photoUrl, 
                                address: data.address,
                                registrationStep: 'completed' 
                            };
        
                            await saveUserData(user);
                            return navigation.navigate('Home', user);
                        }
                    } catch (error: any) {
                        if(error.response.status == 400){
                            const user = { 
                                id: id, 
                                displayName: name, 
                                photoUrl: photoUrl, 
                                address: data.address,
                                registrationStep: 'questionnaire' 
                            };

                            await saveUserData(user);
                            setLoading(false);
                            return navigation.navigate('Questionnaire', {...user, status: 'create'});
                        }
                        else{
                            setLoading(false);
                            return Alert.alert('Erro ao tentar relizar a autentica????o, tente novamente');
                        }
                    }
                }
                else{
                    setLoading(false);
                    return Alert.alert('Erro ao obter os dados. Tente novamente');
                }
            } catch (error: any) {
                if(error.response.status == 400){
                    const registrationStep = props.registrationStep;
                    setLoading(false);
                    return navigation.navigate(props.navigationRoute, { photoUrl, name, id, registrationStep });
                }
            }
        }
    }

    return (
        loading ? (
            <ActivityIndicator size='large' color={colors.background_blue} />
        ) :
        (
            <TouchableOpacity
                    style={styles.button}
                    onPress={authenticate}
                >
                <View style={styles.imageContainer}>
                    <Image style={styles.googleImage} source={googleIconImg} />
                </View>
                <Text style={styles.buttonText}>
                    Login com Google
                </Text>
            </TouchableOpacity>
        )
    )
}

const styles = StyleSheet.create({
    button: {
        borderColor: colors.gray,
        borderWidth: 1,
        height: 56,
        width: 188,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageContainer: {
        height: 24, 
        width: 24
    },
    googleImage: {
        flex: 1,
        width: 24,
        height: 24,
        resizeMode: 'stretch'
    }
})