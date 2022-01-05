import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Switch } from 'react-native-ui-lib';
import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RidersMap from '../components/organisms/Maps/RidersMap';
import Menu from '../components/organisms/Menu';

const menuButton = require('../assets/images/menu.png')
const filterButton = require('../assets/images/filter.png')


export default function HomeScreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const coordinates = {
    latitude: 5.034611,
    longitude: 7.928292
  }
  const [dutyState, setDutyState] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        {
          isMenuOpen &&
          <View style={styles.menu}>
            <Menu
              onClose={() => setIsMenuOpen(!isMenuOpen)}
              isNavOpen={isMenuOpen}
            />
          </View>
        }
        <View style={styles.navigationBar}>
          <View style={styles.navContainer}>
            <View>
              <TouchableOpacity style={styles.navMenuButton} onPress={() => setIsMenuOpen(true)}>
                <Image source={menuButton} style={styles.navMenuButton} />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.dateButton}>
                <Text style={styles.heading}>February, 19</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.navMenuButton}>
                <Image source={filterButton} style={styles.filterButton} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.slideOutBottomContainer}>
          <View style={styles.slideOutBottom}>
            <View>
              <Text style={styles.greetingText}>
                Hello Mark,
              </Text>
              <Text style={styles.welcomeText}>Welcome Back to Limgo Logistics</Text>
            </View>
            <View>

            </View>
          </View>

          <View style={[styles.switchContainer, { backgroundColor: dutyState ? '#00923F' : '#475675', }]}>
            <View>
              <Text style={[styles.switchText, { opacity: dutyState ? 0.7 : 0.5 }]}>{dutyState ? 'on' : 'Off'} Duty</Text>
            </View>
            <View style={styles.switchButton}>
              <Switch
                onColor={'#66be8c'}
                offColor={'#a1a1a1'}
                // style={{backgroundColor:'#00923F7D'}}
                value={dutyState}
                onValueChange={() => setDutyState(!dutyState)}
                style={{ marginBottom: 20 }}
              />
            </View>
          </View>
        </View>
        <View>
          <RidersMap coordinates={coordinates} title={"Rider"} />
        </View>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#2E384D',
    color: '#ffffff',
  },
  navigationBar: {
    width: '100%',
    height: 50,
    backgroundColor: '#2E384D',
    color: '#ffffff',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  mapContainer: {
    position: 'relative'
  },
  map: {
    zIndex: 1
  },
  heading: {
    color: '#ffffff',
    fontSize: 16,
    flex: 1,
    alignContent: 'space-between',
    flexDirection: 'row'
  },
  navContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 'auto',
    paddingVertical: 5,
    height: 24
  },
  navMenuButton: {
    width: 18,
    height: 14
  },
  dateButton: {
    width: 87,
    height: 21
  },
  filterButton: {
    width: 22,
    height: 14
  },
  slideOutBottomContainer: {
    backgroundColor: '#2E384D',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 251,
    zIndex: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 1,
    paddingVertical: 34
  },
  slideOutBottom: {
    paddingHorizontal: 22,
  },
  greetingText: {
    fontSize: 22,
    lineHeight: 32,
    fontWeight: 'bold',
    color: '#ffff'
  },
  welcomeText: {
    color: '#ffff',
    opacity: 0.5,
    fontSize: 14,
    lineHeight: 32
  },
  switchContainer: {
    height: 60,
    width: '100%',
    marginVertical: 29,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 22,
    paddingVertical: 20,

  },
  switchText: {
    color: '#ffff',
    opacity: 0.5,
    fontSize: 18,
    lineHeight: 32,
    textTransform: 'uppercase'
  },
  switchButton: {
    // width: '100%'
  },
  menu: {
    position: 'absolute',
    zIndex: 20,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }
})