import { Button, GradientBackground } from '@components';
import { StackNavigatorParams } from '@configs/navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { ReactElement } from 'react'
import { ScrollView, Image, View, } from 'react-native'
import styles from './home.styles';

interface HomeProps {
    navigation: NativeStackNavigationProp<StackNavigatorParams, "Home">;
}

export default function Home({ navigation }: HomeProps): ReactElement {
    return (
        <GradientBackground >
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={require('@assets/logo.png')} style={styles.logo} />
                <View style={styles.buttons}>
                    <Button onPress={() => navigation.navigate("SinglePlayerGame", { gameId: "123" })} title={'single player'} style={{ marginBottom: 20 }} />
                    <Button title={'multi player'} style={{ marginBottom: 20 }} />
                    <Button title={'login'} style={{ marginBottom: 20 }} />
                    <Button title={'setting'} style={{ marginBottom: 20 }} />
                </View>
            </ScrollView>
        </GradientBackground>
    )
}
