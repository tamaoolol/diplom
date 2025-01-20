import { StyleSheet } from 'react-native';

export const lightTheme = {
  background: '#ffffff',
  text: '#000000',
  buttonBackground: '#e0e0e0',
  buttonText: '#000000',
  inputBackground: '#f2f2f2',
  inputText: '#000000',
};

export const darkTheme = {
  background: '#000000',
  text: '#ffffff',
  buttonBackground: '#333333',
  buttonText: '#ffffff',
  inputBackground: '#333333',
  inputText: '#ffffff',
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
  textInput: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  icon: {
    marginRight: 10,
  },
});
