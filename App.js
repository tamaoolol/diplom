import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store";
import StackNavigation from "./components/StackNavigation";
import { ThemeProvider } from './components/ThemeContext';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <StackNavigation/>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
