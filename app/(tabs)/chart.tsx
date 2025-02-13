
import { faCaretDown, faCaretLeft, faCaretRight, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { ButtonGroup } from '@rneui/themed'
import { AccountingType } from "../model/accounting";
import YearlyChart from "../components/charts/yearlyChart";
import { getMonthName, getWeekDateRange } from "../utils/utilFunctions";
import MonthlyChart from "../components/charts/monthlyChart";
import WeeklyChart from "../components/charts/weeklyChart";

export default function Charts() {
    const today = new Date();

    const buttonTexts = ['Week', 'Month', 'Year'];
    const [selectedAccountingType, setSelectedAccountingType] = useState(AccountingType.Expense);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(today);
    const [selectedWeek, setSelectedWeek] = useState(today);


    const getUserSelectedWeek = (toAdd: boolean) => {
        if (toAdd) {
            return new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate() + 7);
        } else {
            return new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate() - 7);
        }
    }

    const getUserSelectedMonth = (toAdd: boolean) => {
        if (toAdd) {
            return new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, selectedMonth.getDate());
        } else {
            return new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, selectedMonth.getDate());
        }
    }

    const toggleSelectedAccountingType = () => {
        if (selectedAccountingType === AccountingType.Expense) {
            setSelectedAccountingType(AccountingType.Income);
        } else {
            setSelectedAccountingType(AccountingType.Expense);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerBox}>
                <Pressable onPress={toggleSelectedAccountingType}>
                    {selectedAccountingType === AccountingType.Expense
                        ?
                        <View style={styles.header}>
                            <Text style={styles.title}>Expenses</Text>
                            <FontAwesomeIcon icon={faCaretDown} size={30} />
                        </View>
                        :
                        <View style={styles.header}>
                            <Text style={styles.title}>Income</Text>
                            <FontAwesomeIcon icon={faCaretUp} size={30} />
                        </View>
                    }
                </Pressable>
                <View style={styles.buttonGroup}>
                    <ButtonGroup
                        buttons={buttonTexts}
                        selectedIndex={selectedIndex}
                        onPress={(value) => {
                            setSelectedIndex(value);
                            setSelectedMonth(today);
                            setSelectedWeek(today);
                            setSelectedYear(today.getFullYear());
                        }}
                        containerStyle={{ marginBottom: 20, borderRadius: 10 }}
                        buttonStyle={styles.buttonStyle}
                        selectedButtonStyle={styles.selectedButtonStyle}
                        textStyle={styles.buttonText}
                    />
                </View>
            </View>
            {selectedIndex === 0 && <View style={styles.chartBox}>
                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    <Pressable onPress={() => setSelectedWeek(getUserSelectedWeek(false))}>
                        <FontAwesomeIcon icon={faCaretLeft} size={24} color="#95c623" />
                    </Pressable>
                    <Text style={styles.yearText}>{getWeekDateRange(selectedWeek)}</Text>
                    <Pressable onPress={() => setSelectedWeek(getUserSelectedWeek(true))}>
                        <FontAwesomeIcon icon={faCaretRight} size={24} color="#95c623" />
                    </Pressable>
                </View>
                <WeeklyChart selectedWeek={selectedWeek} accountingType={selectedAccountingType} />
            </View>}


            {selectedIndex === 1 && <View style={styles.chartBox}>
                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    <Pressable onPress={() => setSelectedMonth(getUserSelectedMonth(false))}>
                        <FontAwesomeIcon icon={faCaretLeft} size={24} color="#95c623" />
                    </Pressable>
                    <Text style={styles.yearText}>{
                        (selectedMonth.getFullYear() === today.getFullYear() &&
                            today.getMonth() == selectedMonth.getMonth()) ? "This month" : getMonthName(selectedMonth.getMonth()) + " " + selectedMonth.getFullYear()}</Text>
                    <Pressable onPress={() => setSelectedMonth(getUserSelectedMonth(true))}>
                        <FontAwesomeIcon icon={faCaretRight} size={24} color="#95c623" />
                    </Pressable>
                </View>
                <MonthlyChart selectedMonth={selectedMonth} accountingType={selectedAccountingType} />
            </View>}


            {selectedIndex === 2 && <View style={styles.chartBox}>
                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    <Pressable onPress={() => setSelectedYear(selectedYear - 1)}>
                        <FontAwesomeIcon icon={faCaretLeft} size={24} color="green" />
                    </Pressable>
                    <Text style={styles.yearText}>{selectedYear === today.getFullYear() ? "This year" : "Year of " + selectedYear}</Text>
                    <Pressable onPress={() => setSelectedYear(selectedYear + 1)}>
                        <FontAwesomeIcon icon={faCaretRight} size={24} color="green" />
                    </Pressable>
                </View>
                <YearlyChart selectedYear={selectedYear} accountingType={selectedAccountingType} />
            </View>}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
    },
    headerBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'orange',
    },
    header: {
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20,
        paddingTop: 10,
        paddingRight: 10,
    },
    menuBox: {
        fontSize: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    buttonGroup: {
        width: '100%',
    },
    buttonStyle: {
        color: 'black',
        backgroundColor: 'orange',
    },
    selectedButtonStyle: {
        backgroundColor: '#95c623',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    chartBox: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    yearText: {
        color: '#0e4749 ',
        fontSize: 20,
        paddingBottom: 5
    }
});
