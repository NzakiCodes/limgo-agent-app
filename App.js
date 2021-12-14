import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Card, Button } from 'react-native-ui-lib';

export default function App() {
  return (
    <View flex padding-page>
      <Text heading marginB-s4>My Screen</Text>
      <Card height={100} center padding-card marginB-s4>
        <Text body>This is an example card </Text>
      </Card>
      <Button label="Button" body bg-primaryColor square></Button>
      <StatusBar style="auto" />
    </View>
  );
}