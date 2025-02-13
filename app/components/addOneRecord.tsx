import { View, Text, StyleSheet, FlatList, Pressable, ScrollView } from "react-native";
import CalendarPickDate from "./calendar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import NumberKeys from "./numberKeys";
import { Accounting, AccountingType } from "../model/accounting";
import { useMiaoDatabase } from "../service/miaoDatabaseProvider";
import { useEffect, useState } from "react";
import { IconInfo } from "../model/icon";
import { Audio } from 'expo-av';
import { useRecords } from "../service/recordContext";
import { insertRecord } from "../database/sqliteQuerries";
import { useDb } from "../database/dbContext";

export default function AddOneRecord({ close, accountingType, icon, setSuccessSaved, setFailedSaved }: { close: Function, accountingType: AccountingType, icon: IconInfo | null, setSuccessSaved: Function, setFailedSaved: Function }) {
    const db = useDb();
    const { setFetchRecords } = useRecords();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [amount, setAmount] = useState('0');
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);


    const addRecord = async (amountText: string) => {
        const record: Accounting = {
            id: 0,
            title: icon!.name,
            amount: parseFloat(amountText),
            date: selectedDate,
        }
        insertRecord(db, record);
        if (accountingType === AccountingType.Expense) {
            await playExpenseSound();
        } else {
            await playIncomeSound();
        }
        setAmount('0');
        setSelectedDate(new Date());
        setSuccessSaved(true);
        setFetchRecords(true);
    }

    const playExpenseSound = async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                require('../../assets/sounds/coin-dropped-81172.mp3'),
                { shouldPlay: true, isLooping: false }
            );
            setSound(sound);

            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    setIsPlaying(false);
                }
            });
            setIsPlaying(true);
        } catch (error) {
            console.error('Error loading sound:', error);
        }
    };

    const playIncomeSound = async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                require('../../assets/sounds/coin-257878.mp3'),
                { shouldPlay: true, isLooping: false }
            );
            setSound(sound);


            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    setIsPlaying(false);
                }
            });

            setIsPlaying(true);
        } catch (error) {
            console.error('Error loading sound:', error);
        }
    };

    return (

        <View style={styles.container}>
            {/* <Text>{selectedDate.toISOString().split('T')[0]}</Text>
            <Text>Amount:{amount}</Text> */}
            <CalendarPickDate setDate={setSelectedDate} />
            <NumberKeys accountingType={accountingType}
                readInputAmount={setAmount}
                close={close}
                addRecord={addRecord}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 10,
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
    },
    item: {
        width: 120,
        height: 120,
        marginBottom: 10,
        backgroundColor: '#efe7da',
        borderRadius: 100,
        padding: 10,
        margin: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    itemName: {
        padding: 10,
        color: 'black',
        fontSize: 20,
    },

})