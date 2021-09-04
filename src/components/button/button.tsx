import React, { ReactElement } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Text } from '@components';
import styles from './button.styles';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export default function Button({ title, style, ...props }: ButtonProps): ReactElement {
    return (
        <TouchableOpacity {...props} style={[styles.button, style]}>
            <Text weight={"700"} style={styles.textButton}>{title}</Text>
        </TouchableOpacity>
    )
}
