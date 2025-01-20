// import React, { useEffect, useState } from "react";
// import {
//   KeyboardAvoidingView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from "react-native";
// import { auth } from "./firebase";
// import { useTheme } from './ThemeContext';
// import { MdEmail, MdLock } from 'react-icons/md';

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { theme } = useTheme();

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         navigation.replace("Tab");
//       }
//     });

//     return unsubscribe;
//   }, []);

//   const handleSignUp = () => {
//     auth
//       .createUserWithEmailAndPassword(email, password)
//       .then((userCredentials) => {
//         const user = userCredentials.user;
//         console.log("Registered with:", user.email);
//       })
//       .catch((error) => alert(error.message));
//   };

//   const handleLogin = () => {
//     auth
//       .signInWithEmailAndPassword(email, password)
//       .then((userCredentials) => {
//         const user = userCredentials.user;
//         console.log("Logged in with:", user.email);
//       })
//       .catch((error) => alert(error.message));
//   };

//   return (
//     <KeyboardAvoidingView style={[styles.container, { backgroundColor: theme.background }]} behavior="padding">
//       <View style={styles.inputContainer}>
//         <View style={styles.inputWrapper}>
//           <MdEmail size={24} color={theme.text} style={styles.icon} />
//           <TextInput
//             placeholder="Email"
//             placeholderTextColor={theme.text}
//             value={email}
//             onChangeText={(text) => setEmail(text)}
//             style={[styles.input, { color: theme.text, backgroundColor: theme.inputBackground }]}
//           />
//         </View>
//         <View style={styles.inputWrapper}>
//           <MdLock size={24} color={theme.text} style={styles.icon} />
//           <TextInput
//             placeholder="Password"
//             placeholderTextColor={theme.text}
//             value={password}
//             onChangeText={(text) => setPassword(text)}
//             style={[styles.input, { color: theme.text, backgroundColor: theme.inputBackground }]}
//             secureTextEntry
//           />
//         </View>
//       </View>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity onPress={handleLogin} style={[styles.button, { backgroundColor: theme.buttonBackground }]}>
//           <Text style={[styles.buttonText, { color: theme.buttonText }]}>Login</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={handleSignUp}
//           style={[styles.button, styles.buttonOutline, { borderColor: theme.buttonBackground }]}
//         >
//           <Text style={[styles.buttonOutlineText, { color: theme.buttonText }]}>Register</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   inputContainer: {
//     width: "80%",
//     marginBottom: 20,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     borderRadius: 10,
//   },
//   buttonContainer: {
//     width: "60%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   button: {
//     width: "100%",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   buttonOutline: {
//     backgroundColor: "transparent",
//     borderWidth: 2,
//   },
//   buttonText: {
//     fontWeight: "700",
//     fontSize: 18,
//   },
//   buttonOutlineText: {
//     fontWeight: "700",
//     fontSize: 18,
//   },
// });

// export default LoginScreen;
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { auth } from "./firebase";
import { useTheme } from './ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Заменяем react-icons

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Tab");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: theme.background }]} behavior="padding">
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Icon name="email" size={24} color={theme.text} style={styles.icon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor={theme.text}
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={[styles.input, { color: theme.text, backgroundColor: theme.inputBackground }]}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={24} color={theme.text} style={styles.icon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor={theme.text}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={[styles.input, { color: theme.text, backgroundColor: theme.inputBackground }]}
            secureTextEntry
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={[styles.button, { backgroundColor: theme.buttonBackground }]}>
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline, { borderColor: theme.buttonBackground }]}
        >
          <Text style={[styles.buttonOutlineText, { color: theme.buttonText }]}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 18,
  },
  buttonOutlineText: {
    fontWeight: "700",
    fontSize: 18,
  },
});

export default LoginScreen;