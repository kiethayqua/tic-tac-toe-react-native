import { Board, Button, GradientBackground, Text } from '@components'
import { BoardState, Cell, getBestMove, isEmpty, isTerminal, useSounds } from '@utils';
import React, { useState, useEffect } from 'react'
import { Dimensions, SafeAreaView, View } from 'react-native'
import styles from './single-player-game.styles';

const SCREEN_WIDTH = Dimensions.get("screen").width;

type countGame = {
    wins: number;
    draws: number;
    losses: number;
}

export default function SinglePlayerGame() {

    const playSound = useSounds();

    const initState: BoardState = [
        null, null, null,
        null, null, null,
        null, null, null,
    ];

    const [state, setState] = useState<BoardState>(initState);

    // random ai danh truoc
    const [turn, setTurn] = useState<"HUMAN" | "BOT">(Math.random() < 0.5 ? "HUMAN" : "BOT");

    const [isHumanMaximizing, setIsHumanMaximazing] = useState<boolean>(true);

    const [countGameResults, setCountGameResults] = useState<countGame>({ wins: 0, draws: 0, losses: 0 });
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [textResult, setTextResult] = useState<string>('');

    // kiem tra xem game ket thuc chua
    const gameResult = isTerminal(state);

    useEffect(() => {
        if (gameResult) {
            // game over => xu li game over
            const status = getWinner(gameResult.winner);
            switch (status) {
                case 'BOT': {
                    playSound("lose");
                    setCountGameResults(prevState => ({ ...prevState, losses: prevState.losses + 1 }));
                    setShowPopup(true);
                    setTextResult('YOU LOSE');
                } break;
                case 'HUMAN': {
                    playSound("win");
                    setCountGameResults(prevState => ({ ...prevState, wins: prevState.wins + 1 }));
                    setShowPopup(true);
                    setTextResult('YOU WIN')
                } break;
                case 'DRAW': {
                    playSound("draw");
                    setCountGameResults(prevState => ({ ...prevState, draws: prevState.draws + 1 }));
                    setShowPopup(true);
                    setTextResult('DRAW!')
                } break;
            }
        } else {
            if (turn === "BOT") {
                if (isEmpty(state)) {
                    const centerAndCorners = [0, 2, 6, 8, 4];
                    const firstMove = centerAndCorners[Math.floor(Math.random() * centerAndCorners.length)];
                    insertCell(firstMove, "x");
                    setIsHumanMaximazing(false);
                    setTurn("HUMAN");
                } else {
                    const best = getBestMove(state, !isHumanMaximizing, 0, -1);
                    insertCell(best, isHumanMaximizing ? "o" : "x");
                    setTurn("HUMAN");
                }
            }
        }

    }, [turn, state]);

    const getWinner = (symbol: Cell): "HUMAN" | "BOT" | "DRAW" => {
        if (symbol === 'x') {
            return isHumanMaximizing ? "HUMAN" : "BOT";
        }
        if (symbol === 'o') {
            return isHumanMaximizing ? "BOT" : "HUMAN";
        }
        return "DRAW";
    }

    const insertCell = (cell: number, symbol: "x" | "o"): boolean => {
        const stateCopy: BoardState = [...state];
        if (stateCopy[cell] || isTerminal(stateCopy)) return false;
        stateCopy[cell] = symbol;
        setState(stateCopy);
        try {
            symbol === "x" ? playSound("sound1") : playSound("sound2");
        } catch (err) {
            console.log(err);
        }
        return true;
    }

    const handleOnCellPressed = (cell: number): void => {
        if (turn !== "HUMAN") return;
        const inserted = insertCell(cell, isHumanMaximizing ? "x" : "o");
        if (!inserted) return;
        setTurn("BOT");
    }

    const handlePlayAgain = () => {
        setState(initState);
        setShowPopup(false);
    }

    return (
        <GradientBackground>
            <SafeAreaView style={styles.container}>
                <View style={styles.head}>
                    <Text style={styles.settingText} weight="700">{`DIFFICULTY: HARD`}</Text>
                    <View style={styles.wrapResults}>
                        <View style={styles.resultBox}>
                            <Text style={styles.normalText} weight="700">WINS</Text>
                            <Text style={styles.normalText} weight="700">{countGameResults['wins']}</Text>
                        </View>
                        <View style={styles.resultBox}>
                            <Text style={styles.normalText} weight="700">DRAWS</Text>
                            <Text style={styles.normalText} weight="700">{countGameResults['draws']}</Text>
                        </View>
                        <View style={styles.resultBox}>
                            <Text style={styles.normalText} weight="700">LOSSES</Text>
                            <Text style={styles.normalText} weight="700">{countGameResults['losses']}</Text>
                        </View>
                    </View>
                </View>
                <Board
                    disable={Boolean(isTerminal(state)) || turn !== "HUMAN"}
                    onCellPressed={(cell) => handleOnCellPressed(cell)}
                    state={state}
                    gameResult={gameResult}
                    size={SCREEN_WIDTH - 60} />
                {showPopup && <View style={[styles.popup, { width: SCREEN_WIDTH - 60 }]}>
                    <Text style={[styles.settingText, styles.bottomText]} weight="700">{textResult}</Text>
                    <Button onPress={handlePlayAgain} title={"play again"} />
                </View>}
            </SafeAreaView>
        </GradientBackground>
    )
}