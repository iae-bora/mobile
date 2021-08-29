import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import logo from '../assets/Logo.svg';

export function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
            <Text style={styles.title}>Bem-vindo!</Text>
            
            <Image source={logo} style={styles.image}/>

            <TouchableOpacity style={styles.button}>
                <Text>Começar</Text>
            </TouchableOpacity>
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
    lineHeight: 34
  },
  image: {

  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56
  }
});
