import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTheme } from './ThemeContext';
import { commonStyles } from './styles';

const QuestionComponent = ({ question, options, answer, onAnswer }) => {
  const { theme } = useTheme();

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[commonStyles.question, { color: theme.text }]}>{question}</Text>
      {options && options.map((option, index) => (
        <View style={commonStyles.buttonContainer} key={index}>
          <Button 
            title={option} 
            onPress={() => onAnswer(option === answer)} 
            color={theme.buttonBackground} 
          />
        </View>
      ))}
    </View>
  );
};

export default QuestionComponent;
