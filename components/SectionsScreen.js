import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import { commonStyles } from './styles';

const sections = [
  { id: 'Оператор вывода', name: 'Оператор вывода' },
  { id: 'Деление и остаток', name: 'Деление и остаток' },
  { id: 'Ветвления', name: 'Ветвления' },
  { id: 'Сложные условия', name: 'Сложные условия' },
  { id: 'Циклы с условием', name: 'Циклы с условием' }
];

const SectionsScreen = ({ route, navigation }) => {
  const { language } = route.params;
  const { theme } = useTheme();

  const renderSectionItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.itemContainer, { backgroundColor: theme.buttonBackground }]}
      onPress={() => navigation.navigate('TaskDetails', { language, section: item.id })}
    >
      <Text style={[styles.itemText, { color: theme.text }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[commonStyles.header, { color: theme.text }]}>Разделы для {language}</Text>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderSectionItem}
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

export default SectionsScreen;
