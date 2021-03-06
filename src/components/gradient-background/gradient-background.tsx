import React, { ReactNode } from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

interface GradientBackgroundProps {
    children: ReactNode;
}

export default function GradientBackground({ children }: GradientBackgroundProps) {
    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}
                colors={['#120318', '#221a36']}
            />
            {children}
        </View>
    )
}
