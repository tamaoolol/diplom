import React, { useState, useEffect } from 'react';
import { View, Button, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import { commonStyles } from './styles';

const CodeEditorScreen = ({ route }) => {
  const { task } = route.params;
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (task) {
      setCode(task.codeTemplate);
    }
  }, [task]);

  const runCode = () => {
    let resultOutput = '';
    const consoleLog = console.log;

    console.log = (message) => {
      resultOutput += message + '\n';
    };

    try {
      const functionCode = `
        ${code}
        return ${task.testFunction};
      `;
      const resultFunction = new Function(functionCode);
      const result = resultFunction();
      resultOutput = result.toString();
      setIsCorrect(result.toString() === task.correctAnswer.toString());
    } catch (error) {
      resultOutput = 'Error: ' + error.message;
      setIsCorrect(false);
    }

    console.log = consoleLog;
    setOutput(resultOutput.trim() || 'No output');
  };

  return (
    <ScrollView contentContainerStyle={[commonStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[commonStyles.header, { color: theme.text }]}>Задача</Text>
      {task && <Text style={[styles.description, { color: theme.text }]}>{task.description}</Text>}
      <TextInput
        style={[styles.textInput, { backgroundColor: theme.inputBackground, color: theme.inputText }]}
        multiline
        numberOfLines={10}
        placeholder="Write your JavaScript code here"
        value={code}
        onChangeText={setCode}
        placeholderTextColor={theme.inputText}
      />
      <Button title="Запустить" onPress={runCode} color={theme.buttonBackground} />
      <Text style={[styles.resultHeader, { color: theme.text }]}>Вывод:</Text>
      <Text style={[styles.output, { color: theme.text }]}>{output}</Text>
      {output && (
        <Text style={[styles.result, { color: isCorrect ? 'green' : 'red' }]}>
          {isCorrect ? "Правильно!" : "Попробуй еще раз"}
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  textInput: {
    height: 200,
    borderColor: '#cccccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  resultHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  output: {
    fontSize: 16,
    marginTop: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CodeEditorScreen;