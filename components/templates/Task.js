import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Task = ({closeTask}) => {
    const closeTaskList = (e) => {
        e.preventDefault();
        closeTask();
    }
    return (
        <View style={styles.container} onTouchStart={(event)=>closeTaskList(event)}>
            <TouchableOpacity style={styles.closeTaskList}>

            </TouchableOpacity>
            <View style={styles.taskContainer}>
                <Text></Text>
            </View>
        </View>
    );
};

export default Task;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'rgba(46, 56, 77, 0.8)',
        width: Dimensions.get('screen').width,
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 70,
    },
    taskContainer: {
        height: (Dimensions.get('screen').height - 104),
        backgroundColor: '#ffffff',
        width: Dimensions.get('screen').width,
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 70,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    closeTaskList: {
        width: Dimensions.get('screen').width,
        height: 134,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'red',
        zIndex: 80
    }
});
