import { Text } from '@components';
import { BoardState } from '@utils';
import React, { ReactElement } from 'react'
import { TouchableOpacity, View } from 'react-native'

interface BoardProps {
    state: BoardState;
    size: number;
    disable?: boolean;
    onCellPressed?: (index: number) => void
}

export default function Board({ state, size, disable, onCellPressed }: BoardProps): ReactElement {
    return (
        <View style={{
            flexDirection: 'row',
            width: size,
            height: size,
            backgroundColor: '#fff',
            flexWrap: 'wrap',
        }}>
            {state.map((cell, index) => {
                return (
                    <TouchableOpacity
                        disabled={disable}
                        style={{
                            width: '33.33333%',
                            height: '33.33333%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                        }}
                        key={index}
                        onPress={() => onCellPressed && onCellPressed(index)}
                    >
                        <Text style={{ fontSize: size / 8 }} weight="700">{cell}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}
