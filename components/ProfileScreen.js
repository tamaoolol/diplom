import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const progressData = await AsyncStorage.getItem('progress');
        if (progressData) {
          const parsedProgress = JSON.parse(progressData);
          console.log('Fetched progress:', parsedProgress);
          setProgress(parsedProgress);
        }
      } catch (error) {
        console.error('Error fetching progress: ', error);
      }
    };

    fetchProgress();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Прогресс</Text>
      {progress ? (
        <View>
          {Object.keys(progress).map(topic => (
            <Text key={topic} style={styles.progress}>
              {topic}: {progress[topic]}
            </Text>
          ))}
        </View>
      ) : (
        <Text style={styles.userInfo}>Please log in to see your profile</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 10,
  },
  progress: {
    fontSize: 18,
    color: 'green',
  },
});

export default ProfileScreen;
