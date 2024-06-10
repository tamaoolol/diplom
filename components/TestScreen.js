import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, Button, View, Alert } from 'react-native';
import { db } from './firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuestionComponent from './QuestionComponent';

const TestScreen = ({ route, navigation }) => {
  const { topic } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const snapshot = await db.collection('lessons').doc(topic).collection('questions').get();
        const questionsData = snapshot.docs.map(doc => doc.data());
        setQuestions(questionsData);
      } catch (error) {
        console.error('Error fetching questions: ', error);
      }
    };

    fetchQuestions();
  }, [topic]);

  const handleAnswer = async (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
      await saveProgress(topic, score + (isCorrect ? 1 : 0));
    }
  };

  const saveProgress = async (topic, score) => {
    try {
      const progress = await AsyncStorage.getItem('progress');
      const parsedProgress = progress ? JSON.parse(progress) : {};
      parsedProgress[topic] = score;
      await AsyncStorage.setItem('progress', JSON.stringify(parsedProgress));
      console.log('Progress saved:', parsedProgress);
    } catch (error) {
      Alert.alert('Error', 'Failed to save progress');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {showScore ? (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Your score: {score} out of {questions.length}</Text>
          <Button
            title="Back to Lessons"
            onPress={() => navigation.navigate('Lesson')}
          />
        </View>
      ) : (
        questions.length > 0 && (
          <QuestionComponent
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            answer={questions[currentQuestionIndex].answer}
            onAnswer={handleAnswer}
          />
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
});

export default TestScreen;



