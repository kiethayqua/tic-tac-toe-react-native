import { makeAutoObservable } from "mobx";
import { AsyncStorage } from 'react-native';

const _storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(
            key,
            value
        );
    } catch (error) {
        // Error saving data
        console.log('error saving data', error);
    }
};


class Setting {
    sound: boolean = true;
    difficulty: number = 1;

    constructor() {
        makeAutoObservable(this);
    }

    _retrieveData = async () => {
        try {
            const sound = await AsyncStorage.getItem('sound');
            const difficulty = await AsyncStorage.getItem('diff');
            if (sound !== null) {
                this.sound = sound === "true" ? true : false;
            }
            if (difficulty !== null) {
                this.difficulty = parseInt(difficulty);
            }
        } catch (error) {
            // Error retrieving data
            console.log('error retrieving data');
        }
    };

    toggleSound() {
        this.sound = !this.sound;
        _storeData('sound', String(this.sound));
    }

    onChangeDifficulty(input: number) {
        this.difficulty = input;
        _storeData('diff', String(this.difficulty));
    }
}

const setting = new Setting();
export default setting;