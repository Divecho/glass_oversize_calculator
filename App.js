import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import CalculatorScreen from './screens/CalculatorScreen';
import GstScreen from './screens/GstScreen';
import { theme } from './core/theme'
const Stack = createNativeStackNavigator();

export default function App() {
  const [appLoading, setAppLoading] = useState({ 'status': 1 });
  useEffect(() => {
    fetch('https://apis.divecho.com/oversize-calculator/appStartCondition.php')
      .then(response => response.json())
      .then(data => {
        setAppLoading(data);
      })
      .catch(error => {

      });
  }, []);
  //console.log(appLoading);
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Calculator">
        {appLoading.status == 1 ? (
          <>
            {/* <Stack.Screen name="Welcome" component={WelcomeScreen}
              options={{
                title: 'Welcome',
                headerShown: false
              }} /> */}
            <Stack.Screen name="Calculator" component={CalculatorScreen}
              options={{
                title: 'GST Calc',
                headerShown:false,
                headerBackVisible: false,
              }} />
            <Stack.Screen name="Home" component={HomeScreen}
              options={{
                title: 'Calculate',
                headerBackVisible: false,
              }} />
            <Stack.Screen name="GST" component={GstScreen}
              options={{
                title: 'Chnage GST',
              }} />
          </>
        ) : (
          <Stack.Screen name="Loading"
            initialParams={{
              checkLoadingApi: appLoading,
            }} component={LoadingScreen}
            options={{
              title: 'Loading',
              headerShown: false
            }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}