import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { useNavigation } from '@react-navigation/native';
import { 
    IOS_CLIENT_ID,
    ANDROID_CLIENT_ID,
    IOS_STANDALONE_APP_CLIENT_ID,
    ANDROID_STANDALONE_APP_CLIENT_ID
    } from '@env';

import { firebase } from "../services/firebase";

import googleIconImg from '../assets/google-icon.png';
import colors from '../styles/colors';

type GoogleSignInButton = {
    navigationRoute: string;
    registrationStep: string;
}

export function GoogleSigninButton(props: GoogleSignInButton){
    const navigation = useNavigation();

    async function authenticate() {
        const result = await Google.logInAsync({
            iosClientId: IOS_CLIENT_ID,
            androidClientId: ANDROID_CLIENT_ID,
            iosStandaloneAppClientId: IOS_STANDALONE_APP_CLIENT_ID,
            androidStandaloneAppClientId: ANDROID_STANDALONE_APP_CLIENT_ID,
            scopes: ['profile', 'email']
        });
          
          if (result.type === 'success') {
            const { idToken, accessToken } = result;
            const credential = firebase.auth.GoogleAuthProvider.credential(
                idToken, accessToken
            );

            const firebaseResult = await firebase.auth().signInWithCredential(credential);
            const user = firebaseResult.user;
            if (user){
                const { email, photoURL, displayName, uid } = user;
                const registrationStep = props.registrationStep;

                navigation.navigate(props.navigationRoute, { email, photoURL, displayName, googleId: uid, registrationStep });
            }
          }   
    }

    return (
        <TouchableOpacity
                style={styles.button}
                onPress={authenticate}
            >
            <View style={styles.imageContainer}>
                <Image style={styles.googleImage} source={googleIconImg} />
            </View>
            <Text style={styles.buttonText}>
                Login com o Google
            </Text>
        </TouchableOpacity>
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