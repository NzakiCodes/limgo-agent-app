import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
const backIcon = require("../assets/icons/backIcon.png");

const CalendarScreen = ({ navigation }) => {

    const showMonth = () => {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date();
        let name = month[d.getMonth()];
        return name
    };
    const showYear = (date) => {
        const d = new Date(date ? date : Date());
        let year = d.getFullYear();
        return year
    }
    const [month, setMonth] = useState();
    const [year, setYear] = useState();

    useEffect(() => {
        setYear(showYear());
        setMonth(showMonth());
    })
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navigatorContainer}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Image source={backIcon} style={styles.backButton} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.heading}>{month}, {year}</Text>
                </View>
                <View>
                    <Text style={{ opacity: 0 }}>Calendar</Text>
                </View>
            </View>
            <View style={styles.main}>
                <Calendar
                    // Initially visible month. Default = now
                    // current={'2012-03-01'}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={'2022-01-10'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    // maxDate={'2023-12-30'}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={day => {
                        // console.log('selected day', day);
                    }}
                    displayLoadingIndicator={true}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={day => {
                        // console.log('selected day', day);
                    }}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'yyyy MM'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={month => {
                        // console.log('month changed', month);
                    }}
                    style={styles.calendar}
                    // Hide month navigation arrows. Default = false
                    // hideArrows={true}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    // renderArrow={direction => <Arrow />}
                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={true}
                    // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    // disableMonthChange={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                    firstDay={0}
                    // Hide day names. Default = false
                    // hideDayNames={true}
                    // month={'February'}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={false}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                    onPressArrowRight={addMonth => addMonth()}
                    // Disable left arrow. Default = false
                    disableArrowLeft={true}
                    // Disable right arrow. Default = false
                    disableArrowRight={true}
                    // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                    disableAllTouchEventsForDisabledDays={true}
                    // Replace default month and year title with custom one. the function receive a date as parameter
                    renderHeader={date => {
                        /*Return JSX*/
                        setTimeout(() => {
                            const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                            const d = new Date(date);
                            let name = month[d.getMonth()];
                            setMonth(name)
                            setYear(showYear(date))
                        }, 2000)
                        // return <Text>{name}</Text>
                    }}
                    // Enable the option to swipe between months. Default = false
                    enableSwipeMonths={true}
                    markedDates={{
                        '2022-02-06': { marked: true, dotColor: '#00923F', },
                        '2022-02-07': { marked: true, dotColor: '#00923F', },
                        '2022-02-08': { marked: true, dotColor: '#00923F', activeOpacity: 0 },
                        '2022-02-09': { dotColor: '#00923F', marked: true }
                    }}
                />
            </View>
            <View style={{ borderTopColor: '#0000000F', borderTopWidth: 1, marginVertical: 28, flexDirection: 'row' }} >
                <View style={{ marginVertical: 28, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: '#D6D6D6', marginHorizontal: 10 }} />
                    <Text>0 Pending</Text>
                </View>
                <View style={{ marginVertical: 28, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: '#00923F', marginHorizontal: 10 }} />
                    <Text>4 Completed</Text>
                </View>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={0.6} style={styles.button}>
                    <Text style={styles.buttonText}>Travel Summary</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={styles.button}>
                    <Text style={styles.buttonText}>View Task(s)</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
const HR = (color, width) => (
    <View style={{ borderTopColor: color ? color : 'gray', borderTopWidth: width ? width : 1 }} />
)

export default CalendarScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#ffffff',
        height: '100%'

    },
    navigatorContainer: {
        // flex: 2,
        // justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 5,
        height: 40,
        alignItems: 'center'
    },
    backButton: {
        width: 38,
        height: 36,
        marginRight: 10
    },
    heading: {
        color: '#4B4D5A',
        fontSize: 18,
        flex: 1,
        fontWeight: 'bold',
        alignContent: 'center',
        flexDirection: 'row',
        marginTop: 5,
        textAlign: 'center'
    },
    avatar: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 25,
        height: 89,
        width: '100%'
    },
    main: {
        // height: '100%'

    },
    calendar: {
        backgroundColor: '#ffffff',
        color: '#000000'
    },
    button: {
        backgroundColor: '#00923F',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 8
    },
    buttonText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold'
    }
})