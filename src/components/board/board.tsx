import { Text } from '@components';
import { BoardResult, BoardState, colors } from '@utils';
import React, { ReactElement } from 'react'
import { TouchableOpacity, View } from 'react-native'
import BoardLine from './board-line';
import styles from './board.styles';

interface BoardProps {
    state: BoardState;
    size: number;
    disable?: boolean;
    gameResult?: BoardResult | false;
    onCellPressed?: (index: number) => void
}

export default function Board({ state, size, disable, onCellPressed, gameResult }: BoardProps): ReactElement {
    return (
        <View style={{
            flexDirection: 'row',
            width: size,
            height: size,
            backgroundColor: 'transparent',
            flexWrap: 'wrap',
        }}>
            {state.map((cell, index) => {
                return (
                    <TouchableOpacity
                        disabled={disable}
                        style={[{
                            width: '33.33333%',
                            height: '33.33333%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: '#fff',
                            borderWidth: 1,
                        }, styles[`cell${index}` as "cell"]]}
                        key={index}
                        onPress={() => onCellPressed && onCellPressed(index)}
                    >
                        <Text style={{ fontSize: size / 7, color: '#fff' }} weight="700">{cell}</Text>
                    </TouchableOpacity>
                )
            })}
            {gameResult && <BoardLine size={size} gameResult={gameResult} />}
        </View>
    )
}
