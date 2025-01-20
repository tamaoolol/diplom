// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { db } from './firebase';
// import { getAuth } from 'firebase/auth';
// import { useIsFocused } from '@react-navigation/native';
// import { useTheme } from './ThemeContext';
// import { MdCheckCircle, MdError } from 'react-icons/md'; // Используем react-icons
// import { commonStyles } from './styles';

// const ProfileScreen = () => {
//   const [progress, setProgress] = useState({});
//   const isFocused = useIsFocused();
//   const { theme } = useTheme();

//   useEffect(() => {
//     const fetchProgress = async () => {
//       try {
//         const auth = getAuth();
//         const user = auth.currentUser;
//         if (user) {
//           const userRef = db.collection('users').doc(user.uid);
//           const doc = await userRef.get();
//           if (doc.exists) {
//             setProgress(doc.data().progress || {});
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching progress: ', error);
//       }
//     };

//     if (isFocused) {
//       fetchProgress();
//     }
//   }, [isFocused]);

//   const renderProgress = () => {
//     return Object.keys(progress).map((topic) => {
//       const topicData = progress[topic];
//       if (!topicData || typeof topicData !== 'object') return null;

//       return Object.keys(topicData).map((level) => {
//         const levelData = topicData[level];
//         if (!levelData || typeof levelData !== 'object') return null;
//         const correctAnswers = Object.values(levelData).filter(answer => answer === true).length;
//         const totalQuestions = Object.keys(levelData).length;

//         return (
//           <View key={`${topic}-${level}`} style={[styles.progressItem, { backgroundColor: theme.buttonBackground }]}>
//             <Text style={[styles.progressText, { color: theme.text }]}>
//               {`${topic} (${level}): ${correctAnswers} / ${totalQuestions} правильных ответов`}
//               {correctAnswers === totalQuestions ? (
//                 <MdCheckCircle size={24} color="green" />
//               ) : (
//                 <MdError size={24} color="red" />
//               )}
//             </Text>
//           </View>
//         );
//       });
//     });
//   };

//   return (
//     <View style={[commonStyles.container, { backgroundColor: theme.background }]}>
//       <Text style={[commonStyles.header, { color: theme.text }]}>Ваш прогресс:</Text>
//       {renderProgress()}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   progressItem: {
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#dddddd',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   progressText: {
//     fontSize: 18,
//     marginRight: 10,
//   },
// });

// export default ProfileScreen;
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { db } from './firebase';
import { getAuth } from 'firebase/auth';
import { useTheme } from './ThemeContext';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { commonStyles } from './styles';

const ProfileScreen = () => {
  const [progress, setProgress] = useState({});
  const isFocused = useIsFocused();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const userRef = db.collection('users').doc(user.uid);
          const doc = await userRef.get();
          if (doc.exists) {
            setProgress(doc.data().progress || {});
          }
        }
      } catch (error) {
        console.error('Error fetching progress: ', error);
      }
    };

    if (isFocused) {
      fetchProgress();
    }
  }, [isFocused]);

  const renderProgress = () => {
    return Object.keys(progress).map((topic) => {
      const topicData = progress[topic];
      if (!topicData || typeof topicData !== 'object') return null;

      return Object.keys(topicData).map((level) => {
        const levelData = topicData[level];
        if (!levelData || typeof levelData !== 'object') return null;
        const correctAnswers = Object.values(levelData).filter(answer => answer === true).length;
        const totalQuestions = Object.keys(levelData).length;

        return (
          <View key={`${topic}-${level}`} style={[styles.progressItem, { backgroundColor: theme.buttonBackground }]}>
            <Text style={[styles.progressText, { color: theme.text }]}>
              {`${topic} (${level}): ${correctAnswers} / ${totalQuestions} правильных ответов`}
              {correctAnswers === totalQuestions ? (
                <Icon name="check-circle" size={24} color="green" />
              ) : (
                <Icon name="error" size={24} color="red" />
              )}
            </Text>
          </View>
        );
      });
    });
  };

  return (
    <ScrollView style={[commonStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[commonStyles.header, { color: theme.text }]}>Ваш прогресс:</Text>
      {renderProgress()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  progressItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dddddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 18,
    marginRight: 10,
  },
});

export default ProfileScreen;
