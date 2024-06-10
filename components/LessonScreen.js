import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native';
import { db } from './firebase';

const LessonScreen = ({ navigation }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const snapshot = await db.collection('lessons').get();
        const topicsData = snapshot.docs.map(doc => doc.id);
        setTopics(topicsData);
      } catch (error) {
        console.error('Error fetching topics: ', error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Выберите тему:</Text>
      {topics.length > 0 ? (
        topics.map(topic => (
          <View key={topic} style={styles.topicContainer}>
            <Text style={styles.topicHeader}>{topic}</Text>
            <Button
              title={`Пройти тест по ${topic}`}
              onPress={() => navigation.navigate('Test', { topic })}
            />
          </View>
        ))
      ) : (
        <Text style={styles.noTopicsText}>Темы не найдены</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  topicContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  topicHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noTopicsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LessonScreen;




