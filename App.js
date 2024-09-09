import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Splash from './src/screens/Splash';
import SignIn from './src/screens/SignIn';
import Home from './src/screens/Home';

const Stack = createStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState('Splash');
  
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     authUser();
  //   }, 2000);
  // }, []);

  // const authUser = async () => {
  //   try {
  //     let userData = await AsyncStorage.getItem('userData');
  //     if (userData) {
  //       userData = JSON.parse(userData);
  //       if (userData.loggedIn) {
  //         setInitialRouteName('HomeScreen');
  //       } else {
  //         setInitialRouteName('LoginScreen');
  //       }
  //     } else {
  //       setInitialRouteName('RegistrationScreen');
  //     }
  //   } catch (error) {
  //     setInitialRouteName('RegistrationScreen');
  //   }
  // };

  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Home" component={Home} />
           
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default App;
