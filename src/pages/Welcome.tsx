import React, { useEffect } from 'react';
import { Dimensions, Image, StatusBar, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import logo from '../assets/logo.png';

import { Button } from '../components/Button';
import colors from '../styles/colors';
import { UserProps, loadUserData } from '../libs/storage';

export function Welcome() {
  const navigation = useNavigation();

  function handleSubmit(){
    navigation.navigate('Login');
  }

  useEffect(() => {
    async function loadData(){
      const data = await loadUserData() as UserProps;

      if(data){
        if (data.registrationStep == 'questionnaire'){
          navigation.navigate('Questionnaire', {...data, status: 'create'});
        }
        else if(data.registrationStep == 'completed'){
          navigation.navigate('Home', data);
        }
      }
    }

    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
            <Text style={styles.title}>Bem-vindo!</Text>
            
            <Image 
              source={logo} 
              style={styles.image}
              resizeMode='contain'
            />

            <Button 
              title='Começar'
              onPress={handleSubmit}
            ></Button>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: StatusBar.currentHeight,
  },
  wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 20,
      paddingVertical: 80
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 34,
    color: colors.heading,
    fontWeight: 'bold',
  },
  image: {
    height: Dimensions.get('window').width * 0.7
  }
});
