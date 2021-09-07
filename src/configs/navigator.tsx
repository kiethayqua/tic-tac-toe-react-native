import React, { ReactElement } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, SinglePlayerGame, Setting } from '@screens';
import { Platform } from 'react-native'

export type StackNavigatorParams = {
    Home: undefined;
    SinglePlayerGame: { gameId: string };
    Setting: undefined;
}

const Stack = createNativeStackNavigator<StackNavigatorParams>();

export default function Navigator(): ReactElement {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={Platform.OS === "android" ? { headerShown: false } : {}}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="SinglePlayerGame" component={SinglePlayerGame} />
                <Stack.Screen name="Setting" component={Setting} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}
