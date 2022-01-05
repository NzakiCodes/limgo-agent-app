import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';

const avatar = require('../../assets/icons/avatar.png');
const editIcon = require('../../assets/icons/edit.png');

const Avatar = ({ source, style, edit, onEdit }) => {
    return (
        <View style={styles.container}>
            {
                edit &&
                <TouchableOpacity onPress={onEdit} style={styles.edit}>
                    <Image 
                        source={editIcon}
                    />
                </TouchableOpacity>
            }
            <Image
                style={style ? style : styles.img}
                source={source ? source : avatar}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 89,
        height: 89
    },
    img: {
        width: 89,
        height: 89
    },
    edit: {
        width: 30,
        height: 30,
        position: 'absolute',
        zIndex: 10,
        right: 0 - 5,
        top: -10
    }
})

export default Avatar
