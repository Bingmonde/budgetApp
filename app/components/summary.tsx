import { View, Text, StyleSheet, FlatList } from "react-native";
import { Accounting } from "../model/accounting";

import MonthSummaryDetail from "./summaryDetail";


export default function MonthSummary({ data }: { data: Accounting[] }) {

    return (

        <View style={styles.container}>
            {data.length > 0 && <View>
                <Text style={{
                    marginTop: 10,
                    fontSize: 20,
                    marginBottom: 20,
                    color: '#324376',
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>Details of expenses and incomes</Text>
                <View style={styles.summaryTitle}>
                    <Text style={styles.dateText}>Date</Text>
                    <Text style={styles.categoryText}>Title</Text>
                    <Text style={styles.titleText}>Expenses</Text>
                    <Text style={styles.titleText}>Income</Text>
                    <Text style={styles.deleteText}>   </Text>
                </View>
                <FlatList
                    data={data}
                    renderItem={
                        ({ item }) => <MonthSummaryDetail item={item} />}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>}
            {data.length === 0 &&
                <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 16, margin: 20 }}>No data for this period</Text>
            }

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        // width: '100%',
        paddingHorizontal: 10,
    },
    summaryTitle: {
        color: 'white',
        marginTop: 10,
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        backgroundColor: '#95c623',
        borderRadius: 10,
    },
    dateText: {
        color: 'white',
        padding: 10,
        flex: 1,
        fontWeight: 'bold',
    },
    categoryText: {
        color: 'white',
        padding: 10,
        flex: 3,
        fontWeight: 'bold',
    },
    titleText: {
        color: 'white',
        padding: 10,
        flex: 2,
        fontWeight: 'bold',
    },
    deleteText: {
        color: 'white',
        padding: 10,
        flex: 1,
        fontWeight: 'bold',
    }

})