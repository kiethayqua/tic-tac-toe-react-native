import { StackNavigatorParams } from '@configs/navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { ReactElement } from 'react'
import { View, Text, Button } from 'react-native'
import styles from './home.styles';

interface HomeProps {
    navigation: NativeStackNavigationProp<StackNavigatorParams, "Home">;
}

export default function Home({ navigation }: HomeProps): ReactElement {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Button title="Game" onPress={() => navigation.navigate("Game", { gameId: "123" })} />
        </View>
    )
}
