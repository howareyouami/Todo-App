import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Containers/Home/Home';
import ConfigTask from './src/Containers/ConfigTask/ConfigTask';
import { themes, Ithemes } from './src/constants/themes';
import { ThemeContext } from './src/utils/themeContext';

import firebaseApp from './firebase'
import { Button } from 'react-native';

const db = firebaseApp.firestore()


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const usedTheme: Array<keyof Ithemes> = ['light', 'dark'];

function CustomDrawerContent(props: any) {
  const { setTheme } = props;
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
      <DrawerItem
        label="About"
        onPress={() => props.navigation.toggleDrawer()}
      />
      {usedTheme.map((item, index) => (
        <DrawerItem
          key={index.toString()}
          label={'set theme' + item}
          onPress={() => {
            setTheme(themes[item]);
          }}
        />
      ))}
    </DrawerContentScrollView>
  );
}

function root() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ConfigTask" component={ConfigTask} />
    </Stack.Navigator>
  );
}

export default function App() {

  const testDb = () => {
    db.collection("users").get().then((snapshot: any) => {
      snapshot.docs.forEach((i: any) => {
        console.log(i.data())
      })
    })

    db.collection("users").add({
      id: "user.user.uid",
      name: "formValues.name",
      email: "formValues.email",
      followers: [],
      following: [],
      post: [{
        content: "Hey, I joined TweetX",
        time: Date.now()
      }]
    })
  }
  return (
    <Button style={{ margin: 40 }} onPress={() => testDb()} title="Test">Test</Button>
  );
}
