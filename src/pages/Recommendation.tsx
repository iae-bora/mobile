import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import colors from '../styles/colors';

import { Button } from '../components/Button';

export function Recommendation(){
    const navigation = useNavigation();

    async function handleSubmit(){
        navigation.navigate('Home');
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Sua recomendação 🛣</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.cardWrapper}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                            <Card.Content style={styles.cardContent}>
                                <Title>Parque Raphael Lazzuri</Title>
                                <Paragraph>Avenida Kennedy, 111</Paragraph>
                                <Paragraph>6h - 22h</Paragraph>
                            </Card.Content>
                        </Card>
                    </View>

                    <View style={styles.cardWrapper}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                            <Card.Content style={styles.cardContent}>
                                <Title>Parque Raphael Lazzuri</Title>
                                <Paragraph>Avenida Kennedy, 111</Paragraph>
                                <Paragraph>6h - 22h</Paragraph>
                            </Card.Content>
                        </Card>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Button 
                        title='Bora lá!'
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
        height: StatusBar.currentHeight,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 38,
        lineHeight: 34,
        color: colors.heading,
        fontWeight: 'bold'
    },
    content: {
        marginBottom: 20
    },
    cardWrapper: {
        marginVertical: 20
    },
    cardContent: {
        paddingVertical: 10
    },
    footer: {
        alignItems: 'center',
        marginBottom: 50
    }
})