import { useEffect, useRef } from 'react'
import { Audio } from 'expo-av';
import { setting } from '@utils';

type soundTypes = "sound1" | "sound2" | "win" | "lose" | "draw";

export default function useSounds(): (sound: soundTypes) => void {
    const soundOneRef = useRef<Audio.Sound | null>(null);
    const soundTwoRef = useRef<Audio.Sound | null>(null);
    const winSoundRef = useRef<Audio.Sound | null>(null);
    const loseSoundRef = useRef<Audio.Sound | null>(null);
    const drawSoundRef = useRef<Audio.Sound | null>(null);

    useEffect(() => {
        const soundOne = new Audio.Sound();
        const soundTwo = new Audio.Sound();
        const winSound = new Audio.Sound();
        const loseSound = new Audio.Sound();
        const drawSound = new Audio.Sound();
        const loadSound = async () => {
            await soundOne.loadAsync(require('@assets/human_turn.wav'));
            await soundTwo.loadAsync(require('@assets/bot_turn.wav'));
            await winSound.loadAsync(require('@assets/win.wav'));
            await loseSound.loadAsync(require('@assets/lose.wav'));
            await drawSound.loadAsync(require('@assets/draw.wav'));

            soundOneRef.current = soundOne;
            soundTwoRef.current = soundTwo;
            winSoundRef.current = winSound;
            loseSoundRef.current = loseSound;
            drawSoundRef.current = drawSound;
        }
        loadSound();
        return () => {
            soundOne.unloadAsync();
            soundTwo.unloadAsync();
            loseSound.unloadAsync();
            drawSound.unloadAsync();
            winSound.unloadAsync();
        }
    }, []);

    return (sound: soundTypes): void => {
        switch (sound) {
            case 'sound1': {
                try {
                    setting.sound && soundOneRef.current?.replayAsync();
                } catch (err) {
                    console.log(err);
                }
            } break;
            case 'sound2': {
                try {
                    setting.sound && soundTwoRef.current?.replayAsync();
                } catch (err) {
                    console.log(err);
                }
            } break;
            case 'win': {
                try {
                    setting.sound && winSoundRef.current?.replayAsync();
                } catch (err) {
                    console.log(err);
                }
            } break;
            case 'lose': {
                try {
                    setting.sound && loseSoundRef.current?.replayAsync();
                } catch (err) {
                    console.log(err);
                }
            } break;
            case 'draw': {
                try {
                    setting.sound && drawSoundRef.current?.replayAsync();
                } catch (err) {
                    console.log(err);
                }
            } break;
        }
    }
}