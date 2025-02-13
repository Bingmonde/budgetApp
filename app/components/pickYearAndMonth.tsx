import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import { getMonthName } from "../utils/utilFunctions";
import { Button } from '@rneui/themed';
import { useRecords } from "../service/recordContext";

export default function PickYearAndMonth({ date, setDate, close }: { date: Date, setDate: Function, close: Function }) {
    // const today = new Date();
    const { setFetchRecords } = useRecords();

    const [selectedYear, setSelectedYear] = useState(date.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth());


    const getUserSelectedMonth = (toAdd: boolean) => {
        if (toAdd) {
            return selectedMonth === 11 ? 0 : selectedMonth + 1;
        } else {
            return selectedMonth === 0 ? 11 : selectedMonth - 1;
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pick year and month</Text>
            <View style={styles.layoutBox}>
                <View style={styles.yearMonthBox}>
                    <Pressable onPress={() => setSelectedYear(selectedYear - 1)}>
                        <FontAwesomeIcon icon={faCaretUp} size={30} color="green" />
                    </Pressable>
                    <Text style={styles.yearMonthText}>{selectedYear}</Text>
                    <Pressable onPress={() => setSelectedYear(selectedYear + 1)}>
                        <FontAwesomeIcon icon={faCaretDown} size={30} color="green" />
                    </Pressable>
                </View>
                <View style={styles.yearMonthBox}>
                    <Pressable onPress={() => setSelectedMonth(getUserSelectedMonth(false))}>
                        <FontAwesomeIcon icon={faCaretUp} size={30} color="green" />
                    </Pressable>
                    <Text style={styles.yearMonthText}>{getMonthName(selectedMonth)}</Text>
                    <Pressable onPress={() => setSelectedMonth(getUserSelectedMonth(true))}>
                        <FontAwesomeIcon icon={faCaretDown} size={30} color="green" />
                    </Pressable>
                </View>
            </View>

            <View style={styles.layoutBox}>
                <Button buttonStyle={styles.buttonConfirm} onPress={() => {
                    setDate(new Date(selectedYear, selectedMonth, 1))
                    setFetchRecords(true)
                    close()
                }}>OK</Button>
                <Button buttonStyle={styles.buttonCancel} onPress={() => close()}>Cancel</Button>
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
    },
    layoutBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
    },
    title: {
        padding: 10,
        width: '100%',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#002626 ',
    },
    yearMonthBox: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
        padding: 20,
    },
    buttonConfirm: {
        borderRadius: 10,
        width: 100,
        height: 50,
        padding: 10,
        margin: 10,
        backgroundColor: '#0e4749',
        color: 'white',
    },
    buttonCancel: {
        borderRadius: 10,
        width: 100,
        height: 50,
        padding: 10,
        margin: 10,
        backgroundColor: '#e55812',
        color: 'white',
    },
    yearMonthText: {
        fontSize: 20,
    }
})