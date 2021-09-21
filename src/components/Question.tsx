import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import colors from '../styles/colors';

type QuestionsProps = {
    questionLabel: string;
    optionsList: Array<string>;
    selectedOption: number | undefined;
    setState: Function;
}

export function Question(props: QuestionsProps) {
    const onSelect = (index: number) => {
        if (props.selectedOption !== undefined && props.selectedOption === index) {
            props.setState(undefined);
        } else {
            props.setState(index);
        }
    }

    return (
        <View style={styles.questionContainer}>
            <Text style={styles.question}>{props.questionLabel}</Text>
            {props.optionsList.map((item, index) => {
                return (
                    <View key={index} style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.circle}
                            onPress={() => {
                                onSelect(index);
                            }}>
                            {props.selectedOption !== undefined && props.selectedOption === index && (
                                <View style={styles.checkedCircle} />
                            )}
                        </TouchableOpacity>
                        <Text>{item}</Text>
                    </View>
                );
            })}
        </View>
  );
}

const styles = StyleSheet.create({
    questionContainer: {
        paddingBottom: 20,
        marginBottom: 10
    },
    question: {
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ACACAC',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    checkedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: colors.background_blue,
    },
});
