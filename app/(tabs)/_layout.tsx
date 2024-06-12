import 'react-native-gesture-handler';
import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Index from './index';
import Controllers from './controllers';
import { RootStackParamList } from "@/constants/types";

const Stack = createStackNavigator<RootStackParamList>();

export default function Layout() {
    return (
        <Stack.Navigator
            initialRouteName="Index"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Index" component={ Index } />
            <Stack.Screen name="Controller" component={ Controllers } />
        </Stack.Navigator>
    );
}
