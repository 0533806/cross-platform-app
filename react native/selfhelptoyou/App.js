import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import login from './src/login';
import signup from './src/signup';
import visiter from './src/visiter';
import  user  from './src/user';
import setting from './src/setting';
import manager from './src/manager';
import { store, persistor } from "./src/reducers/store";
import { PersistGate } from "redux-persist/integration/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Stack = createStackNavigator();



  export default function App() {
 
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  
  
    
 return (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
  <NavigationContainer>
  {isLoggedIn ? 
      <Stack.Navigator 
      initialRouteName="User"
      screenOptions={{ headerShown: false }}>
        <Stack.Screen name="User" component={user} /> 
        <Stack.Screen name="Visiter" component={visiter} />  
        <Stack.Screen name="Setting" component={setting} />   
        <Stack.Screen name="Manager" component={manager} />   
    </Stack.Navigator> :
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={login} />  
        <Stack.Screen name="Signup" component={signup} />  
      </Stack.Navigator> }
  </NavigationContainer>
  </PersistGate>
 </Provider>
);
}





