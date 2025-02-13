import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Pressable } from "react-native";
import { Accounting } from "../model/accounting";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { useRecords } from "../service/recordContext";
import { useMiaoDatabase } from "../service/miaoDatabaseProvider";
import { useDb } from "../database/dbContext";
import { deleteRecord } from "../database/sqliteQuerries";

export default function MonthSummaryDetail({ item }: { item: Accounting }) {
    const { setFetchRecords } = useRecords();
    const db = useDb();


    const deleteFromDB = async (id: number) => {
        await deleteRecord(db, id)
        setFetchRecords(true);
    }

    return (
        <View style={styles.container}>

            <Text style={styles.dateText}>{item.date.getUTCMonth() + 1}-{item.date.getUTCDate()} </Text>
            <Text style={styles.categoryText}>{item.title} </Text>
            <Text style={[styles.itemText, { color: 'red' }]}>{item.amount < 0 && item.amount.toFixed(1)}</Text>
            <Text style={[styles.itemText, { color: 'green' }]}>{item.amount >= 0 && item.amount.toFixed(1)}</Text>
            <Pressable onPress={async () => await deleteFromDB(item.id)}>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', paddingHorizontal: 5 }}
                >
                    <FontAwesomeIcon icon={faTrash} size={16} color="orange" />
                </View>
            </Pressable>
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
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateText: {
        padding: 5,
        flex: 1,
        fontWeight: 'bold'
    },
    categoryText: {
        padding: 5,
        flex: 3,
        color: '#324376'
    },
    itemText: {
        padding: 5,
        flex: 2
    }
})

