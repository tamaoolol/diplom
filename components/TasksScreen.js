// import React from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { useTheme } from './ThemeContext';
// import { commonStyles } from './styles';

// const tasks = [
//   {
//     id: 1,
//     description: "Напишите функцию, которая возвращает сумму двух чисел.",
//     codeTemplate: `function sum(a, b) {
//   // Ваш код здесь
// }`,
//     correctAnswer: `5`,
//     testFunction: `sum(2, 3)`,
//   },
//   {
//     id: 2,
//     description: "Напишите функцию, которая проверяет, является ли число четным.",
//     codeTemplate: `function isEven(num) {
//   // Ваш код здесь
// }`,
//     correctAnswer: `true`,
//     testFunction: `isEven(2)`,
//   },
//   {
//     id: 3,
//     description: "Допишите функцию, которая возвращает квадрат числа.",
//     codeTemplate: `function square(num) {
//   // Ваш код здесь
// }`,
//     correctAnswer: `9`,
//     testFunction: `square(3)`,
//   },
//   {
//     id: 4,
//     description: "Допишите функцию, которая возвращает первый элемент массива.",
//     codeTemplate: `function getFirstElement(arr) {
//   // Ваш код здесь
// }`,
//     correctAnswer: `1`,
//     testFunction: `getFirstElement([1, 2, 3])`,
//   },
//   {
//     id: 5,
//     description: "Допишите функцию, которая проверяет, является ли строка пустой.",
//     codeTemplate: `function isEmptyString(str) {
//   // Ваш код здесь
// }`,
//     correctAnswer: `true`,
//     testFunction: `isEmptyString('')`,
//   },
// ];
  

// const TasksScreen = ({ navigation }) => {
//   const { theme } = useTheme();

//   return (
//     <View style={[commonStyles.container, { backgroundColor: theme.background }]}>
//       <Text style={[commonStyles.header, { color: theme.text }]}>Задачи для обучения</Text>
//       <FlatList
//         data={tasks}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity 
//             style={[styles.taskContainer, { backgroundColor: theme.buttonBackground }]}
//             onPress={() => navigation.navigate('CodeEditor', { task: item })}
//           >
//             <Text style={[styles.taskDescription, { color: theme.text }]}>{item.description}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   taskContainer: {
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#dddddd',
//   },
//   taskDescription: {
//     fontSize: 18,
//   },
// });

// export default TasksScreen;
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import { commonStyles } from './styles';

const languages = [
  { id: 'JavaScript', name: 'JavaScript' },
  { id: 'Python', name: 'Python' },
  { id: 'Cpp', name: 'C++' }
];

const TasksScreen = ({ navigation }) => {
  const { theme } = useTheme();

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.itemContainer, { backgroundColor: theme.buttonBackground }]}
      onPress={() => navigation.navigate('Sections', { language: item.id })}
    >
      <Text style={[styles.itemText, { color: theme.text }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[commonStyles.header, { color: theme.text }]}>Выберите язык</Text>
      <FlatList
        data={languages}
        keyExtractor={(item) => item.id}
        renderItem={renderLanguageItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  itemText: {
    fontSize: 18,
  },
  list: {
    paddingHorizontal: 10,
  },
});

export default TasksScreen;
