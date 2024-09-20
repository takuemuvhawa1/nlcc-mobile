import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Splash from './src/screens/Splash';
import SignIn from './src/screens/SignIn';
import Home from './src/screens/Home';
import Services from './src/screens/Services';
import Contributions from './src/screens/Contributions';
import Events from './src/screens/Events';
import More from './src/screens/More';
import ForgotPassword from './src/screens/ForgotPassword';
import Otp from './src/screens/Otp';
import ResetPassword from './src/screens/ResetPassword';
import About from './src/screens/About';
import MyProfile from './src/screens/MyProfile';
import Ministry from './src/screens/Ministry';
import Event from './src/screens/Event';
import CellGroup from './src/screens/CellGroup';
import Sermons from './src/screens/Sermons';
import Register from './src/screens/Register';
import SetPassword from './src/screens/SetPassword';
import SelectMinistry from './src/screens/SelectMinistry';
import AdminMinistry from './src/screens/AdminMinistry';

const Stack = createStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState('More');
  
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
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Services" component={Services} />
            <Stack.Screen name="Contributions" component={Contributions} />
            <Stack.Screen name="Events" component={Events} />
            <Stack.Screen name="More" component={More} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Otp" component={Otp} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="MyProfile" component={MyProfile} />
            <Stack.Screen name="Ministry" component={Ministry} />
            <Stack.Screen name="Event" component={Event} />
            <Stack.Screen name="CellGroup" component={CellGroup} />
            <Stack.Screen name="Sermons" component={Sermons} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="SetPassword" component={SetPassword} />
            <Stack.Screen name="SelectMinistry" component={SelectMinistry} />
            <Stack.Screen name="AdminMinistry" component={AdminMinistry} />
          </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
