import React from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import logo from '../assets/logo.png';

import { Button } from '../components/Button';
import colors from '../styles/colors';

export function Welcome() {
  const navigation = useNavigation();

  function handleSubmit(){
    navigation.navigate('Login');
  }

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
    flex: 1
  },
  wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 38,
    lineHeight: 34,
    color: colors.heading,
    fontWeight: 'bold',
  },
  image: {
    height: Dimensions.get('window').width * 0.7
  }
});
