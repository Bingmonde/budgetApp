
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, Platform } from "react-native";
import { Button } from '@rneui/themed';
import { getBudgetGoal, getSavingGoal, setBudgetGoal, setSavingGoal } from "../utils/goals";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { cancelNotification, scheduleNotification, weeklyNotification } from "../components/notifications";

import { Divider } from "react-native-elements";
import { useDb } from "../database/dbContext";
import { getGoalFromDB, GoalDB, updateGoalInDB } from "../database/sqliteQuerries";
import { useRecords } from "../service/recordContext";

export default function Setting() {
    const db = useDb();
    const { setFetchRecords } = useRecords();

    const [budgetNumber, setBudgetNumber] = useState(0);
    const [savingNumber, setSavingNumber] = useState(0);
    const [toFetchGoal, setToFetchGoal] = useState(true);

    useEffect(() => {
        if (!toFetchGoal)
            return;

        const fetchGoal = async () => {
            const goal = await getGoalFromDB(db) as GoalDB;
            setBudgetNumber(goal.budget);
            setSavingNumber(goal.savings);
            setToFetchGoal(false);
        }
        fetchGoal();
    }, [toFetchGoal])

    const updateGoal = async () => {
        await updateGoalInDB(db, budgetNumber, savingNumber);
        setToFetchGoal(true);
        setFetchRecords(true);
    }


    return (
        <View style={styles.container}>
            <View style={styles.headerBox}>
                <Text style={styles.title}>Set my goal of month</Text>
            </View>
            <View style={styles.layoutBox}>
                <View style={styles.setting}>
                    <Pressable onPress={async () => setBudgetNumber(budgetNumber + 100)}>
                        <FontAwesomeIcon icon={faCaretUp} size={24} color="green" />
                    </Pressable>
                    <Text>{budgetNumber}</Text>
                    <Pressable onPress={() => {
                        if (budgetNumber <= 0) {
                            return
                        }
                        setBudgetNumber(budgetNumber - 10)
                    }}>
                        <FontAwesomeIcon icon={faCaretDown} size={24} color="green" />
                    </Pressable>

                </View>
                <View style={styles.layoutBox}>
                    <Button buttonStyle={styles.buttonConfirm} onPress={updateGoal}>Set budget goal</Button>
                    <Button buttonStyle={styles.buttonCancel} onPress={
                        () => setToFetchGoal(true)
                    }>Cancel</Button>
                </View>
            </View>

            <View style={styles.layoutBox}>
                <View style={styles.setting}>
                    <Pressable onPress={() => setSavingNumber(savingNumber + 100)}>
                        <FontAwesomeIcon icon={faCaretUp} size={24} color="green" />
                    </Pressable>
                    <Text>{savingNumber}</Text>
                    <Pressable onPress={() => {
                        if (savingNumber <= 0) {
                            return
                        }
                        setSavingNumber(savingNumber - 10)
                    }
                    }>
                        <FontAwesomeIcon icon={faCaretDown} size={24} color="green" />
                    </Pressable>

                </View>
                <View style={styles.layoutBox}>
                    <Button buttonStyle={styles.buttonConfirm} onPress={updateGoal}>Set saving goal</Button>

                    <Button buttonStyle={styles.buttonCancel} onPress={
                        () => setToFetchGoal(true)
                    }>Cancel</Button>
                </View>
            </View>


            <View style={styles.headerBox}>
                <Text style={styles.title}>Set notification</Text>
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}>
                <Text style={styles.terms}>By pressing the button you agree to receive weekly notifications on budget usage and savings goal achievement.</Text>
                <Button
                    title="Receive weekly notifications"
                    buttonStyle={styles.buttonConfirm}
                    onPress={async () => {
                        await weeklyNotification(db);
                    }}
                />
                <Divider style={{ height: 20 }} />
                <Text style={styles.terms}>By pressing the button you will no longer receive weekly notifications.</Text>
                <Button
                    title="Cancel weekly notification"
                    buttonStyle={styles.buttonCancel}
                    onPress={async () => {
                        await cancelNotification();
                    }}
                />
            </View>
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
        backgroundColor: '#95c623',
    },
    terms: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20,
        paddingTop: 10,
        paddingRight: 10,
        textAlign: 'center',
    },
    settingsBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center"
    },
    layoutBox: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    setting: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
        padding: 20,
    },
    buttonConfirm: {
        borderRadius: 10,
        height: 50,
        padding: 10,
        margin: 10,
        backgroundColor: '#0e4749',
        color: 'white',
    },
    buttonCancel: {
        borderRadius: 10,
        height: 50,
        padding: 10,
        margin: 10,
        backgroundColor: '#e55812',
        color: 'white',
    },


});
