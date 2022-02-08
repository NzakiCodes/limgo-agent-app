import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context"
import React from 'react';
import { Image } from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextField from '../atoms/TextField';
const cancelButton = require("../../assets/images/cancelButton.png");
const expandButtonBlack = require("../../assets/images/icons-chevron-light.png");

const FilterTask = ({ onClose }) => {

  const onCloseHandler = () => {
    onClose();
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.mainHeader}>
          <Text style={styles.filterHeading}>filter task by</Text>
          <TouchableOpacity onPress={() => onCloseHandler()}>
            <Image source={cancelButton} />
          </TouchableOpacity>
        </View>
        <View>
          <TextField placeholder="Search..." placeholderTextColor="#4B4D5A" inputStyle={{color:'#4B4D5A', fontSize:14, backgroundColor:'#F7F7F7'}} controlBoder={true} />
          <Accordion heading={"Status"}/>
          <Accordion heading={"Status"}/>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.9} style={styles.transparent} onPress={() => onCloseHandler()}></TouchableOpacity>
    </SafeAreaView>
  );
};

const Accordion = ({ heading, content }) => {
  const expanAccordion = ()=>{

  }
  return (
    <View style={accordionStyle.container}>
      <TouchableOpacity style={accordionStyle.button} activeOpacity={0.5} onPress={expanAccordion}>
        <Text style={accordionStyle.buttonText}>{heading}</Text>
        <Image source={expandButtonBlack}/>
      </TouchableOpacity>
      <View>
        {content}
      </View>
    </View>
  );
}

export default FilterTask;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: -30,
    left: 0,
    flexDirection: 'column',
    zIndex: 60

  },
  main: {
    minHeight: '50%',
    width: '100%',
    backgroundColor: '#ffffff',
    paddingTop: 45,
    paddingHorizontal: 16
  },
  transparent: {
    backgroundColor: "rgba(46, 56, 77, 0.9)",
    height: 400,
    zIndex: 40
  },
  filterHeading: {
    textTransform: 'uppercase',
    fontSize: 14
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

const accordionStyle = StyleSheet.create({
  container:{
    marginVertical:15
  },
  button: {
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:10
  },
  buttonText:{
    color:'#4B4D5A',
    fontSize:18,
    fontWeight:'bold',
  }
})