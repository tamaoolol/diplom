import React, { useState } from 'react';
import { View, Button, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import { commonStyles } from './styles';

const FreeCodeEditorScreen = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const { theme } = useTheme();

  const runCode = () => {
    let resultOutput = '';
    const consoleLog = console.log;

    console.log = (message) => {
      resultOutput += message + '\n';
    };

    try {
      const resultFunction = new Function(code);
      resultFunction();
    } catch (error) {
      resultOutput = 'Error: ' + error.message;
    }

    console.log = consoleLog;
    setOutput(resultOutput.trim() || 'No output');
  };

  return (
    <ScrollView contentContainerStyle={[commonStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[commonStyles.header, { color: theme.text }]}>Редактор кода</Text>
      <TextInput
        style={[styles.textInput, { backgroundColor: theme.inputBackground, color: theme.inputText }]}
        multiline
        numberOfLines={10}
        placeholder="Начни писать код JavaScript..."
        value={code}
        onChangeText={setCode}
        placeholderTextColor={theme.inputText}
      />
      <Button title="Запустить" onPress={runCode} color={theme.buttonBackground} />
      <Text style={[styles.resultHeader, { color: theme.text }]}>Вывод:</Text>
      <Text style={[styles.output, { color: theme.text }]}>{output}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
});

export default FreeCodeEditorScreen;