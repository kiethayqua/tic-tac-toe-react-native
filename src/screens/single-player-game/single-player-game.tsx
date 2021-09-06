import { Board, GradientBackground } from '@components'
import { BoardState, Cell, getBestMove, isEmpty, isTerminal, useSounds } from '@utils';
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import styles from './single-player-game.styles';

export default function SinglePlayerGame() {

    const playSound = useSounds();

    const [state, setState] = useState<BoardState>([
        null, null, null,
        null, null, null,
        null, null, null,
    ]);

    // random ai danh truoc
    const [turn, setTurn] = useState<"HUMAN" | "BOT">(Math.random() < 0.5 ? "HUMAN" : "BOT");

    const [isHumanMaximizing, setIsHumanMaximazing] = useState<boolean>(true);

    // kiem tra xem game ket thuc chua
    const gameResult = isTerminal(state);

    useEffect(() => {
        if (gameResult) {
            // game over => xu li game over
            const status = getWinner(gameResult.winner);
            switch (status) {
                case 'BOT': {
                    playSound("lose");
                } break;
                case 'HUMAN': {
                    playSound("win");
                } break;
                case 'DRAW': {
                    playSound("draw");
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

    return (
        <GradientBackground>
            <SafeAreaView style={styles.container}>
                <Board
                    disable={Boolean(isTerminal(state)) || turn !== "HUMAN"}
                    onCellPressed={(cell) => handleOnCellPressed(cell)}
                    state={state}
                    size={300} />
            </SafeAreaView>
        </GradientBackground>
    )
}