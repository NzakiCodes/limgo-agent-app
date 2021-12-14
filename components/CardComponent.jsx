import _ from 'lodash';
import React, { Component, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Colors, View, Card, CardProps, Button, Text } from 'react-native-ui-lib';
const cardImage = require('../assets/card-example.jpg');

export default function CardComponent() {
    const [selected1, setSelected1] = useState(true);

    return (
        <View row marginV-10>
            <Card
                height={140}
                flex
                selected={selected1}
                onPress={() => setSelected1(!selected1)}
                activeOpacity={1}
                marginR-20
            >
                <Card.Section imageSource={cardImage} imageStyle={{ height: '100%' }} />
            </Card>
        </View>
    )
}