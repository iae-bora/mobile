import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { List, Divider } from 'react-native-paper';

import colors from '../styles/colors';

export function TourHistory(){
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Onde já visitei? 🤔</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.listWrapper}>
                        <List.Section>
                            <List.Subheader style={styles.subheader}>12/08/2021</List.Subheader>
                            <Divider style={styles.subheaderDivider} />
                            <List.Item style={styles.listItem} title='Parque Raphael Lazzuri' />
                            <Divider />
                            <List.Item style={styles.listItem} title='Golden Square Shopping' />
                            <Divider />
                            <List.Item style={styles.listItem} title='Manza Sushi Bar' />
                        </List.Section>
                    </View>
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
    listWrapper: {
        marginVertical: 20,
        borderColor: colors.gray,
        borderRadius: 8,
        borderWidth: 1
    },
    subheader: {
        color: colors.heading,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 0
    },
    subheaderDivider: {
        color: colors.gray,
        height: 4
    },
    listItem: {
        paddingVertical: 10
    }
})