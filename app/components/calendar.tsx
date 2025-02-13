
import { Button } from "@rneui/base";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarPickDate({ setDate }: { setDate: Function }) {
    let today = new Date();
    const [day, setDay] = useState(today.toISOString().split('T')[0]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pick a date</Text>
            <Calendar
                style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    height: 350
                }}
                current={today.toISOString().split('T')[0]}
                onDayPress={(day: any) => {
                    setDay(day.dateString);
                    setDate(new Date(day.dateString));
                }}
                markedDates={{
                    selectedDay: { selected: true, marked: true, selectedColor: '#95c623' },
                    [day]: { marked: true, selected: true, selectedColor: '#95c623' },
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        width: '100%',
        // marginBottom: 5,
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
    },

});
