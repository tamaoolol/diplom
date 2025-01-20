// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useDispatch } from 'react-redux';
// import { signOut } from '../store';
// import { auth, db } from './firebase';
// import { getAuth } from 'firebase/auth';
// import { useTheme } from './ThemeContext';
// import { MdRefresh, MdExitToApp, MdBrightness6 } from 'react-icons/md'; // Используем react-icons

// const SettingsScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { theme, toggleTheme } = useTheme();

//   const handleLogout = () => {
//     auth.signOut().then(() => {
//       dispatch(signOut());
//       navigation.replace('Login');
//     });
//   };

//   const handleResetProgress = async () => {
//     try {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (user) {
//         const userRef = db.collection('users').doc(user.uid);
//         await userRef.set({ progress: {} }, { merge: true });
//         alert('Прогресс успешно сброшен!');
//         navigation.navigate('Профиль');
//       }
//     } catch (error) {
//       console.error('Error resetting progress: ', error);
//     }
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: theme.background }]}>
//       <Text style={[styles.header, { color: theme.text }]}>Настройки</Text>

//       <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBackground }]} onPress={handleResetProgress}>
//         <MdRefresh size={24} color={theme.text} />
//         <Text style={[styles.buttonText, { color: theme.text }]}>Сбросить прогресс</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBackground }]} onPress={handleLogout}>
//         <MdExitToApp size={24} color={theme.text} />
//         <Text style={[styles.buttonText, { color: theme.text }]}>Выход</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBackground }]} onPress={toggleTheme}>
//         <MdBrightness6 size={24} color={theme.text} />
//         <Text style={[styles.buttonText, { color: theme.text }]}>Переключить тему</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     marginBottom: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     fontSize: 18,
//     marginLeft: 10,
//   },
// });

// export default SettingsScreen;
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { signOut } from '../store';
import { auth, db } from './firebase';
import { getAuth } from 'firebase/auth';
import { useTheme } from './ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Заменяем react-icons

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    auth.signOut().then(() => {
      dispatch(signOut());
      navigation.replace('Login');
    });
  };

  const handleResetProgress = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userRef = db.collection('users').doc(user.uid);
        await userRef.set({ progress: {} }, { merge: true });
        alert('Прогресс успешно сброшен!');
        navigation.navigate('Профиль');
      }
    } catch (error) {
      console.error('Error resetting progress: ', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Настройки</Text>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBackground }]} onPress={handleResetProgress}>
        <Icon name="refresh" size={24} color={theme.text} />
        <Text style={[styles.buttonText, { color: theme.text }]}>Сбросить прогресс</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBackground }]} onPress={handleLogout}>
        <Icon name="exit-to-app" size={24} color={theme.text} />
        <Text style={[styles.buttonText, { color: theme.text }]}>Выход</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBackground }]} onPress={toggleTheme}>
        <Icon name="brightness-6" size={24} color={theme.text} />
        <Text style={[styles.buttonText, { color: theme.text }]}>Переключить тему</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default SettingsScreen;
