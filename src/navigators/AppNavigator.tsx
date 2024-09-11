import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, RegisterScreen} from '../screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export enum RouteNames {
  RegistrationScreen = 'RegistrationScreen',
  HomeScreen = 'HomeScreen',
}

export type RootStackParamList = {
  [RouteNames.RegistrationScreen]: undefined;
  [RouteNames.HomeScreen]: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={RouteNames.RegistrationScreen}>
          <Stack.Screen
            name={RouteNames.RegistrationScreen}
            component={RegisterScreen}
          />
          <Stack.Screen name={RouteNames.HomeScreen} component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
