import { useEffect, useRef } from 'react'
import { Audio } from 'expo-av';

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
                    soundOneRef.current?.replayAsync();
                } catch (err) {
                    console.log(err);
                }
            } break;
            case 'sound2': {
                try {
                    soundTwoRef.current?.replayAsync();
                } catch (err) {
                    console.log(err);
                }
            } break;
            case 'win': {
                try {
                    winSoundRef.current?.replayAsync();
                } catch (err) {
                    console.log(err);
                }
            } break;
            case 'lose': {
                try {
                    loseSoundRef.current?.replayAsync();
                } catch (err) {
                    console.log(err);
                }
            } break;
            case 'draw': {
                try {
                    drawSoundRef.current?.replayAsync();
                } catch (err) {
                    console.log(err);
                }
            } break;
        }
    }
}