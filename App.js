import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store";
import StackNavigation from "./components/StackNavigation";

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation/>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
