// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useTheme } from './ThemeContext';
// import { MdLibraryBooks, MdCode, MdAssignment } from 'react-icons/md'; // Используем react-icons
// import { commonStyles } from './styles';

// const MainMenu = ({ navigation }) => {
//   const { theme } = useTheme();

//   return (
//     <View style={[commonStyles.container, { backgroundColor: theme.background }]}>
//       <Text style={[commonStyles.header, { color: theme.text }]}>Квиз</Text>
//       <Text style={[styles.description, { color: theme.text }]}>Выбери раздел</Text>

//       <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBackground }]} onPress={() => navigation.navigate('Lesson')}>
//         <MdLibraryBooks size={24} color={theme.text} />
//         <Text style={[styles.buttonText, { color: theme.text }]}>Квиз по языкам</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBackground }]} onPress={() => navigation.navigate('FreeCodeEditor')}>
//         <MdCode size={24} color={theme.text} />
//         <Text style={[styles.buttonText, { color: theme.text }]}>Свободный редактор кода</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBackground }]} onPress={() => navigation.navigate('Tasks')}>
//         <MdAssignment size={24} color={theme.text} />
//         <Text style={[styles.buttonText, { color: theme.text }]}>Задачки в редакторе кода</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   description: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#666666',
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     marginBottom: 20,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#dddddd',
//   },
//   buttonText: {
//     fontSize: 18,
//     marginLeft: 10,
//   },
// });

// export default MainMenu;
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Заменяем react-icons
import { commonStyles } from './styles';

const MainMenu = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[commonStyles.header, { color: theme.text }]}>Квиз</Text>
      <Text style={[styles.description, { color: theme.text }]}>Выбери раздел</Text>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBackground }]} onPress={() => navigation.navigate('Lesson')}>
        <Icon name="library-books" size={24} color={theme.text} />
        <Text style={[styles.buttonText, { color: theme.text }]}>Квиз по языкам</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBackground }]} onPress={() => navigation.navigate('FreeCodeEditor')}>
        <Icon name="code" size={24} color={theme.text} />
        <Text style={[styles.buttonText, { color: theme.text }]}>Свободный редактор кода</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBackground }]} onPress={() => navigation.navigate('Tasks')}>
        <Icon name="assignment" size={24} color={theme.text} />
        <Text style={[styles.buttonText, { color: theme.text }]}>Задачки в редакторе кода</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666666',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default MainMenu;