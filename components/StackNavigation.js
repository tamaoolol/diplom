// import { createStackNavigator } from "@react-navigation/stack";
// import TabNavigator from "./TabNavigator";
// import LoginScreen from "./LoginScreen";
// import CodeEditorScreen from './CodeEditorScreen';
// import FreeCodeEditorScreen from './FreeCodeEditorScreen';
// import TasksScreen from "./TasksScreen";
// import LessonScreen from "./LessonScreen";
// import TestScreen from "./TestScreen";

// const Stack = createStackNavigator();

// const StackNavigation = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{ title: "Вход" }}
//       />
//       <Stack.Screen
//         name="Tab"
//         component={TabNavigator}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Lesson"
//         component={LessonScreen}
//         options={{ title: "Урок" }}
//       />
//       <Stack.Screen
//       name="Test"
//       component={TestScreen}
//       options={{ title: "Уроки" }}
//       />
//       <Stack.Screen
//         name="CodeEditor"
//         component={CodeEditorScreen}
//         options={{ title: "Задачи" }}
//       />
//       <Stack.Screen
//         name="FreeCodeEditor"
//         component={FreeCodeEditorScreen}
//         options={{ title: "Код" }}
//       />
//       <Stack.Screen
//         name="Tasks"
//         component={TasksScreen}
//         options={{ title: "Задания" }}
//       />
//     </Stack.Navigator>
//   );
// };

// export default StackNavigation;
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import LoginScreen from "./LoginScreen";
import FreeCodeEditorScreen from './FreeCodeEditorScreen';
import TasksScreen from "./TasksScreen";
import LessonScreen from "./LessonScreen";
import TestScreen from "./TestScreen";
import SectionsScreen from "./SectionsScreen";
import TaskDetailsScreen from "./TaskDetailsScreen";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Вход" }}
      />
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Lesson"
        component={LessonScreen}
        options={{ title: "Урок" }}
      />
      <Stack.Screen
      name="Test"
      component={TestScreen}
      options={{ title: "Уроки" }}
      />
      <Stack.Screen
        name="FreeCodeEditor"
        component={FreeCodeEditorScreen}
        options={{ title: "Код" }}
      />
      <Stack.Screen
        name="Tasks"
        component={TasksScreen}
        options={{ title: "Задания" }}
      />
      <Stack.Screen
        name="Sections"
        component={SectionsScreen}
        options={{ title: "Разделы" }}
      />
      <Stack.Screen
        name="TaskDetails"
        component={TaskDetailsScreen}
        options={{ title: "Детали задания" }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;