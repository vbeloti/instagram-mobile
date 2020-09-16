import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity } from 'react-native';

import logo from './assets/logo.png';
import camera from './assets/camera.png';

import Feed from './pages/Feed';
import New from './pages/New';

const { Navigator, Screen } = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        mode="modal"
        screenOptions={{
          headerTitle: <Image source={logo} />,
          headerTitleAlign: 'center',
          headerBackTitle: null,
          headerTintColor: '#000',
        }}
      >
        <Screen
          name="Feed"
          component={Feed}
          options={({ navigation, route }) => ({
            headerRight: (props) => (
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => {
                  navigation.navigate('New');
                }}
              >
                <Image source={camera} />
              </TouchableOpacity>
            ),
          })}
        />
        <Screen
          name="New"
          component={New}
          options={{ headerTitle: 'Nova publicação' }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;
