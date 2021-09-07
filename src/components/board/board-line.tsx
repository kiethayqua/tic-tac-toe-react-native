import { BoardResult, colors } from '@utils'
import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, Animated } from 'react-native'

interface BoardLineProps {
    size: number;
    gameResult: BoardResult | false;
}

const style = StyleSheet.create({
    line: {
        position: 'absolute',
        backgroundColor: colors.lightPurple,
    },
    vLine: {
        width: 4,
        // height: '100%',
    },
    hLine: {
        height: 4,
        // width: '100%',
    },
    dLine: {
        width: 4,
        // height: '100%',
        top: 0,
        left: '50%',
    }
})

export default function BoardLine({ size, gameResult }: BoardLineProps) {
    const animationRef = useRef<Animated.Value>(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animationRef.current, {
            toValue: 1,
            duration: 700,
            useNativeDriver: false,
        }).start();
    }, [])

    return (
        <>
            {gameResult && gameResult.column && gameResult.direction === "V" && <Animated.View
                style={[style.line, style.vLine, {
                    left: `${33.3333 * gameResult.column - 16.6666}%`,
                    height: animationRef.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                    })
                }]}></Animated.View>}
            {gameResult && gameResult.row && gameResult.direction === "H" && <Animated.View
                style={[style.line, style.hLine, {
                    top: `${33.3333 * gameResult.row - 16.6666}%`,
                    width: animationRef.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                    })
                }]}
            ></Animated.View>}
            {gameResult && gameResult.diagonal && gameResult.direction === "D" && <Animated.View
                style={[style.line, style.dLine, {
                    transform: [
                        {
                            translateY: animationRef.current.interpolate({
                                inputRange: [0, 1],
                                outputRange: [size / 2, 0]
                            })
                        },
                        {
                            rotateZ: gameResult.diagonal === "MAIN" ? "-45deg" : "45deg",
                        },
                    ],
                    height: animationRef.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                    })
                }]}
            ></Animated.View>}
        </>
    )
}
