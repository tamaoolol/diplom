// import React, { useState, useEffect } from 'react';
// import { ScrollView, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import { db } from './firebase';
// import { getAuth } from 'firebase/auth';
// import { useTheme } from './ThemeContext';
// import { MdLibraryBooks, MdArrowBack } from 'react-icons/md'; // Используем react-icons
// import { commonStyles } from './styles';

// const LessonScreen = () => {
//   const [topics, setTopics] = useState([]);
//   const [selectedTopic, setSelectedTopic] = useState(null);
//   const [selectedLevel, setSelectedLevel] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [results, setResults] = useState({});
//   const { theme } = useTheme();

//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const snapshot = await db.collection('lessons').get();
//         const topicsData = snapshot.docs.map(doc => doc.id);
//         setTopics(topicsData);
//       } catch (error) {
//         console.error('Error fetching topics: ', error);
//       }
//     };

//     fetchTopics();
//   }, []);

//   useEffect(() => {
//     if (selectedTopic && selectedLevel) {
//       const fetchQuestions = async () => {
//         try {
//           const snapshot = await db.collection('lessons').doc(selectedTopic).collection('levels').doc(selectedLevel).collection('questions').get();
//           const questionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//           setQuestions(questionsData);
//         } catch (error) {
//           console.error('Error fetching questions: ', error);
//         }
//       };

//       fetchQuestions();
//     }
//   }, [selectedTopic, selectedLevel]);

//   const handleAnswer = (questionId, answer, correctAnswer) => {
//     setAnswers({ ...answers, [questionId]: answer });
//     setResults({ ...results, [questionId]: answer === correctAnswer });
//   };

//   const saveProgress = async () => {
//     try {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (user) {
//         const userRef = db.collection('users').doc(user.uid);
//         const userDoc = await userRef.get();
//         const currentProgress = userDoc.exists ? userDoc.data().progress : {};
//         const updatedProgress = {
//           ...currentProgress,
//           [selectedTopic]: {
//             ...currentProgress[selectedTopic],
//             [selectedLevel]: results
//           }
//         };
//         await userRef.set({ progress: updatedProgress }, { merge: true });
//         alert('Progress saved successfully!');
//       }
//     } catch (error) {
//       console.error('Error saving progress: ', error);
//     }
//   };

//   const renderQuestion = ({ item }) => (
//     <View style={[styles.questionContainer, { backgroundColor: theme.buttonBackground }]}>
//       <Text style={[styles.questionText, { color: theme.text }]}>{item.question}</Text>
//       {item.options.map((option, index) => (
//         <TouchableOpacity
//           key={index}
//           style={[
//             styles.optionButton,
//             answers[item.id] === option && (results[item.id] ? styles.correctOptionButton : styles.incorrectOptionButton)
//           ]}
//           onPress={() => handleAnswer(item.id, option, item.answer)}
//         >
//           <Text style={[styles.optionText, { color: theme.text }]}>{option}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );

//   if (!selectedTopic) {
//     return (
//       <ScrollView style={[commonStyles.container, { backgroundColor: theme.background }]}>
//         <Text style={[commonStyles.header, { color: theme.text }]}>Выберите тему:</Text>
//         {topics.length > 0 ? (
//           topics.map(topic => (
//             <View key={topic} style={[styles.topicContainer, { backgroundColor: theme.buttonBackground }]}>
//               <MdLibraryBooks size={24} color={theme.text} />
//               <TouchableOpacity onPress={() => setSelectedTopic(topic)}>
//                 <Text style={[styles.topicHeader, { color: theme.text }]}>{topic}</Text>
//               </TouchableOpacity>
//             </View>
//           ))
//         ) : (
//           <Text style={[styles.noTopicsText, { color: theme.text }]}>Темы не найдены</Text>
//         )}
//       </ScrollView>
//     );
//   }

//   if (!selectedLevel) {
//     return (
//       <ScrollView style={[commonStyles.container, { backgroundColor: theme.background }]}>
//         <Text style={[commonStyles.header, { color: theme.text }]}>Выберите уровень сложности для {selectedTopic}:</Text>
//         <TouchableOpacity style={[styles.levelButton, { backgroundColor: theme.buttonBackground }]} onPress={() => setSelectedLevel('easy')}>
//           <Text style={[styles.levelText, { color: theme.text }]}>Легкий</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.levelButton, { backgroundColor: theme.buttonBackground }]} onPress={() => setSelectedLevel('medium')}>
//           <Text style={[styles.levelText, { color: theme.text }]}>Средний</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.levelButton, { backgroundColor: theme.buttonBackground }]} onPress={() => setSelectedLevel('hard')}>
//           <Text style={[styles.levelText, { color: theme.text }]}>Тяжелый</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.backButton, { backgroundColor: theme.buttonBackground }]} onPress={() => setSelectedTopic(null)}>
//           <MdArrowBack size={24} color={theme.text} />
//           <Text style={[styles.levelText, { color: theme.text }]}>Назад</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     );
//   }

//   return (
//     <View style={[commonStyles.container, { backgroundColor: theme.background }]}>
//       <FlatList
//         data={questions}
//         renderItem={renderQuestion}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={commonStyles.container}
//         ListHeaderComponent={<Text style={[commonStyles.header, { color: theme.text }]}>Вопросы по теме {selectedTopic} - Уровень {selectedLevel}</Text>}
//       />
//       <TouchableOpacity style={[styles.saveButton, { backgroundColor: theme.buttonBackground }]} onPress={saveProgress}>
//         <Text style={[styles.saveButtonText, { color: theme.text }]}>Сохранить прогресс</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   questionContainer: {
//     marginBottom: 20,
//     padding: 20,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#dddddd',
//   },
//   questionText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   optionButton: {
//     marginTop: 10,
//     padding: 10,
//     borderRadius: 5,
//   },
//   correctOptionButton: {
//     backgroundColor: '#a0e0a0',
//   },
//   incorrectOptionButton: {
//     backgroundColor: '#e0a0a0',
//   },
//   optionText: {
//     fontSize: 16,
//   },
//   topicContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     padding: 20,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#dddddd',
//   },
//   topicHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   noTopicsText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   levelButton: {
//     padding: 10,
//     borderRadius: 5,
//     marginVertical: 10,
//     alignItems: 'center',
//   },
//   levelText: {
//     fontSize: 18,
//   },
//   backButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 5,
//     marginVertical: 10,
//     justifyContent: 'center',
//   },
//   saveButton: {
//     padding: 10,
//     borderRadius: 5,
//     marginVertical: 10,
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     fontSize: 18,
//   },
// });

// export default LessonScreen;
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { db } from './firebase';
import { getAuth } from 'firebase/auth';
import { useTheme } from './ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { commonStyles } from './styles';

const LessonScreen = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const { theme } = useTheme();

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

  useEffect(() => {
    if (selectedTopic && selectedLevel) {
      const fetchQuestions = async () => {
        try {
          const snapshot = await db.collection('lessons').doc(selectedTopic).collection('levels').doc(selectedLevel).collection('questions').get();
          const questionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setQuestions(questionsData);
        } catch (error) {
          console.error('Error fetching questions: ', error);
        }
      };

      fetchQuestions();
    }
  }, [selectedTopic, selectedLevel]);

  const handleAnswer = (questionId, answer, correctAnswer) => {
    setAnswers({ ...answers, [questionId]: answer });
    setResults({ ...results, [questionId]: answer === correctAnswer });
  };

  const saveProgress = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userRef = db.collection('users').doc(user.uid);
        const userDoc = await userRef.get();
        const currentProgress = userDoc.exists ? userDoc.data().progress : {};

        if (!currentProgress[selectedTopic]) {
          currentProgress[selectedTopic] = {};
        }
        currentProgress[selectedTopic][selectedLevel] = results;

        const updatedProgress = {
          ...currentProgress,
        };

        await userRef.set({ progress: updatedProgress }, { merge: true });
        alert('Progress saved successfully!');
      }
    } catch (error) {
      console.error('Error saving progress: ', error);
    }
  };

  const renderQuestion = ({ item }) => (
    <View style={[styles.questionContainer, { backgroundColor: theme.buttonBackground }]}>
      <Text style={[styles.questionText, { color: theme.text }]}>{item.question}</Text>
      {item.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            answers[item.id] === option && (results[item.id] ? styles.correctOptionButton : styles.incorrectOptionButton)
          ]}
          onPress={() => handleAnswer(item.id, option, item.answer)}
        >
          <Text style={[styles.optionText, { color: theme.text }]}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  if (!selectedTopic) {
    return (
      <View style={[commonStyles.container, { backgroundColor: theme.background }]}>
        <Text style={[commonStyles.header, { color: theme.text }]}>Выберите тему:</Text>
        {topics.length > 0 ? (
          topics.map(topic => (
            <View key={topic} style={[styles.topicContainer, { backgroundColor: theme.buttonBackground }]}>
              <Icon name="library-books" size={24} color={theme.text} />
              <TouchableOpacity onPress={() => setSelectedTopic(topic)}>
                <Text style={[styles.topicHeader, { color: theme.text }]}>{topic}</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={[styles.noTopicsText, { color: theme.text }]}>Темы не найдены</Text>
        )}
      </View>
    );
  }

  if (!selectedLevel) {
    return (
      <View style={[commonStyles.container, { backgroundColor: theme.background }]}>
        <Text style={[commonStyles.header, { color: theme.text }]}>Выберите уровень сложности для {selectedTopic}:</Text>
        <TouchableOpacity style={[styles.levelButton, { backgroundColor: theme.buttonBackground }]} onPress={() => setSelectedLevel('easy')}>
          <Text style={[styles.levelText, { color: theme.text }]}>Легкий</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.levelButton, { backgroundColor: theme.buttonBackground }]} onPress={() => setSelectedLevel('medium')}>
          <Text style={[styles.levelText, { color: theme.text }]}>Средний</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.levelButton, { backgroundColor: theme.buttonBackground }]} onPress={() => setSelectedLevel('hard')}>
          <Text style={[styles.levelText, { color: theme.text }]}>Тяжелый</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: theme.buttonBackground }]} onPress={() => setSelectedTopic(null)}>
          <Icon name="arrow-back" size={24} color={theme.text} />
          <Text style={[styles.levelText, { color: theme.text }]}>Назад</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[commonStyles.header, { color: theme.text }]}>Вопросы по теме {selectedTopic} - Уровень {selectedLevel}</Text>
      <FlatList
        data={questions}
        renderItem={renderQuestion}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <TouchableOpacity style={[styles.saveButton, { backgroundColor: theme.buttonBackground }]} onPress={saveProgress}>
        <Text style={[styles.saveButtonText, { color: theme.text }]}>Сохранить прогресс</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  correctOptionButton: {
    backgroundColor: '#a0e0a0',
  },
  incorrectOptionButton: {
    backgroundColor: '#e0a0a0',
  },
  optionText: {
    fontSize: 16,
  },
  topicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  topicHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  noTopicsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  levelButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  levelText: {
    fontSize: 18,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
  },
  saveButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
  },
});

export default LessonScreen;
