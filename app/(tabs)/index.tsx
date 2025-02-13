
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import MonthlyPieChart from "../components/charts/pieChart";
import { useMiaoDatabase } from "../service/miaoDatabaseProvider";
import React, { useEffect, useState } from "react";
import { Accounting, AccountingType, Statistics } from "../model/accounting";
import { convertRecordToPieChartData, filterExpensesRecords, filterIncomesRecords, getExpenseTotal, getIncomeTotal, getMonthName } from "../utils/utilFunctions";
import { text } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Button } from '@rneui/themed';
import MonthSummary from "../components/summary";

import PickYearAndMonth from "../components/pickYearAndMonth";
import { useRecords } from "../service/recordContext";

import { useDb } from "../database/dbContext";
import { AccountingDB, convertToAccounting, queryByMonth } from "../database/sqliteQuerries";
import GoalProgress from "../components/charts/progressChart";


const today = new Date();

export default function Detail() {
    const db = useDb();
    const { fetchRecords, setFetchRecords } = useRecords();

    const [dateOfMonth, setDateOfMonth] = useState(today);
    const [incomeRecords, setIncomeRecords] = useState<Accounting[]>([]);
    const [expenseRecords, setExpenseRecords] = useState<Accounting[]>([]);
    const [records, setRecords] = useState<Accounting[]>([]);
    const [buttonIndex, setButtonIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await queryByMonth(db, dateOfMonth, AccountingType.All);
            const accountingData = convertToAccounting(data as AccountingDB[]);
            console.log('Accounting data:', accountingData);

            setRecords(accountingData);
            const expenseData = filterExpensesRecords(accountingData);
            console.log('Expense data:', expenseData);

            setExpenseRecords(expenseData);
            const incomeData = filterIncomesRecords(accountingData)
            setIncomeRecords(incomeData);
            setFetchRecords(false);
        }
        fetchData();

    }, [fetchRecords])


    const toggleButtons = (index: number) => {
        setButtonIndex(index);
    }


    return (
        <View style={styles.container}>
            <View style={styles.headerBox}>
                <Text style={styles.title}>Miao Miao money tracer</Text>
                <View style={styles.menuBox}>
                    <Text
                        style={[styles.textMini, { flex: 1, textAlign: 'left', fontWeight: 'bold' }]}
                    >{dateOfMonth.getFullYear()}</Text>
                    <Text
                        style={[styles.textMini, { flex: 2, textAlign: 'center', fontWeight: 'bold' }]}
                    >Income</Text>
                    <Text
                        style={[styles.textMini, { flex: 2, textAlign: 'center', fontWeight: 'bold' }]}
                    >Expense</Text>
                </View>
                <View style={styles.menuBox}>
                    <Pressable onPress={() => setModalVisible(true)}>
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', paddingLeft: 5 }}
                        // onTouchEnd={() => setDateOfMonth(subDays(dateOfMonth, 30))}
                        >
                            <Text style={styles.textMini}>{getMonthName(dateOfMonth.getMonth())}</Text>
                            <FontAwesomeIcon icon={faCaretDown} size={20} />
                        </View>
                    </Pressable>
                    <Text
                        style={[styles.textMini, { flex: 2, textAlign: 'center', paddingLeft: 15 }]}
                    >{getIncomeTotal(records)}</Text>
                    <Text
                        style={[styles.textMini, { flex: 2, textAlign: 'center', paddingLeft: 5 }]}
                    >{getExpenseTotal(records)}</Text>
                </View>
            </View>


            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Button style={[styles.button]}
                    buttonStyle={{
                        backgroundColor: 'rgb(211,211,211)',
                        borderRadius: 20,
                        margin: 10,
                    }}
                    titleStyle={{ color: 'black', fontSize: 20 }}
                    color="#c5d86d"
                    disabled={buttonIndex === 0}
                    disabledTitleStyle={{ color: 'green' }}
                    disabledStyle={{ backgroundColor: 'rgba(197, 216, 109, 1)', }}
                    onPress={() => toggleButtons(0)}
                >Achievement</Button>
                <Button style={[styles.button]}
                    buttonStyle={{
                        backgroundColor: 'rgb(211,211,211)',
                        borderRadius: 20,
                        margin: 10,
                    }}
                    titleStyle={{ color: 'black', fontSize: 20 }}
                    color="#c5d86d"
                    disabled={buttonIndex === 1}
                    disabledTitleStyle={{ color: 'green' }}
                    disabledStyle={{ backgroundColor: 'rgba(197, 216, 109, 1)', }}
                    onPress={() => toggleButtons(1)}
                >Detail</Button>
                <Button style={[styles.button]}
                    buttonStyle={{
                        backgroundColor: 'rgb(211,211,211)',
                        borderRadius: 20,
                        margin: 10,
                    }}
                    titleStyle={{ color: 'black', fontSize: 20 }}
                    color="#c5d86d"
                    disabled={buttonIndex === 2}
                    disabledTitleStyle={{ color: 'green' }}
                    disabledStyle={{ backgroundColor: 'rgba(197, 216, 109, 1)', }}
                    onPress={() => toggleButtons(2)}
                >Graphic</Button>
            </View>
            {buttonIndex === 0 && <GoalProgress income={getIncomeTotal(records)} expenses={getExpenseTotal(records)} />}
            {buttonIndex === 1 && <MonthSummary data={records} />}
            {buttonIndex === 2 && <MonthlyPieChart data={expenseRecords} />}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <PickYearAndMonth date={dateOfMonth} setDate={setDateOfMonth} close={() => setModalVisible(false)} />
                    </View>
                </View>

            </Modal>
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
        paddingBottom: 10,
    },
    title: {
        backgroundColor: 'orange',
        padding: 10,
        color: 'black',
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 20,
    },
    menuBox: {
        fontSize: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    textMini: {
        fontSize: 20,
    },
    button: {
        width: 100,
        height: 50,
        padding: 10,
        marginTop: 10,
    },
    centeredView: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },


});
