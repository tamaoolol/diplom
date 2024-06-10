import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const QuestionComponent = ({ question, options, answer, onAnswer }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      {options && options.map((option, index) => (
        <View style={styles.buttonContainer} key={index}>
          <Button 
            title={option} 
            onPress={() => onAnswer(option === answer)} 
            color="#0782F9" 
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333333',
  },
  buttonContainer: {
    marginBottom: 10,
  }
});

export default QuestionComponent;
