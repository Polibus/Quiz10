import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerItem } from '@react-navigation/drawer';
import { Home, ResultScreen, Test, Score,Name,RandomTest} from '../Screens';
import CustomDrawer from './CustomDrawer';
const Drawer = createDrawerNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props =><CustomDrawer {...props} />}>
        <Drawer.Screen name="Name" component={Name} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Result" component={ResultScreen} />
        <Drawer.Screen
            name="Test"
            component={Test}
            options={{unmountOnBlur: true}}
            />
        <Drawer.Screen
            name="Score"
            component={Score}
            options={{unmountOnBlur: true}}
            />
        <Drawer.Screen
            name="Random Test"
            component={RandomTest}
            options={{unmountOnBlur: true}}
            />
      </Drawer.Navigator>
     </NavigationContainer>
     
  );
}

export default Routes