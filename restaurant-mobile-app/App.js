import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import UploadMealScreen from './src/screens/UploadMealScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator 
        initialRouteName="Register"
        screenOptions={{
          headerStyle: { backgroundColor: '#FF6B00' },
          headerTintColor: '#FFF',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'Restaurant Registration', headerShown: false }}
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ title: 'Partner Dashboard', headerBackVisible: false }}
        />
        <Stack.Screen 
          name="UploadMeal" 
          component={UploadMealScreen} 
          options={{ title: 'Upload New Meal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
