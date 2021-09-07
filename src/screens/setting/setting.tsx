import { Button, GradientBackground, Text } from '@components'
import React from 'react';
import { Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './setting.styles';
import { setting } from '@utils';
import { observer } from 'mobx-react-lite';


function Setting() {
    return (
        <GradientBackground >
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Settings</Text>
                <View style={styles.wrapDiff}>
                    <Button onPress={() => { setting.onChangeDifficulty(1) }} title="easy" style={[styles.button, setting.difficulty === 1 && styles.active]} />
                    <Button onPress={() => { setting.onChangeDifficulty(2) }} title="normal" style={[styles.button, setting.difficulty === 2 && styles.active]} />
                    <Button onPress={() => { setting.onChangeDifficulty(3) }} title="hard" style={[styles.button, setting.difficulty === 3 && styles.active]} />
                </View>
                <View style={styles.setting}>
                    <Text style={{ color: '#fff', fontSize: 20 }} weight="700">Sound</Text>
                    <Switch onChange={() => setting.toggleSound()} value={setting.sound} />
                </View>
            </SafeAreaView>
        </GradientBackground>
    )
}

export default observer(Setting);
