import { Board, GradientBackground } from '@components'
import { BoardState, getAvailableMoves, isEmpty, isFull, isTerminal, printFormattedBoard } from '@utils';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import styles from './single-player-game.styles';


export default function SinglePlayerGame() {

    const [state, setState] = useState<BoardState>([
        null, null, null,
        null, null, null,
        null, null, null,
    ])
    // printFormattedBoard(b);
    // console.log(isFull(b));
    // console.log(isEmpty(b)); 
    // console.log(getAvailableMoves(b));
    // console.log(isTerminal(b));

    const handleOnCellPressed = (cell: number): void => {
        const stateCopy: BoardState = [...state];
        stateCopy[cell] = "x";
        setState(stateCopy);
    }

    return (
        <GradientBackground>
            <SafeAreaView style={styles.container}>
                <Board
                    disable={Boolean(isTerminal(state))}
                    onCellPressed={(cell) => handleOnCellPressed(cell)}
                    state={state}
                    size={300} />
            </SafeAreaView>
        </GradientBackground>
    )
}