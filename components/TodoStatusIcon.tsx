import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react'

interface Props {
    isCompleted: boolean;
}

const TodoStatusIcon: React.FC<Props> = ({ isCompleted }) => {
    return (
        isCompleted ?
            <Ionicons
                name="checkmark-circle-outline"
                color="#2ec4b6"
                size={24}
            /> :
            <Feather
                name='circle'
                color="#dd2d4a"
                size={24}
            />
    )
}

export default TodoStatusIcon;