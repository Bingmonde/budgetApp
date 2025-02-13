import { AccountingType } from "@/app/model/accounting";
import { expensesIconList, IconInfo, incomeIconList } from "@/app/model/icon";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { FlatList, ScrollView, View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";


export default function DisplayExpensesIcons({ setSelectedIcon }: { setSelectedIcon: Function }) {

    const expensesIcons =
    {
        title: "Expenses",
        data: expensesIconList
    }

    const GridSection = ({ icons }: { icons: IconInfo[] }) => (
        <FlatList
            data={icons}
            numColumns={3}
            keyExtractor={(item, index) => item.name + index}
            renderItem={({ item }) => (
                <Pressable onPress={() => {
                    setSelectedIcon(item);
                }}>
                    <View style={styles.item}>
                        <FontAwesomeIcon icon={item.icon} size={30} color={item.color} />
                        {item.name.indexOf(' ') === -1 ? <Text style={styles.itemName}>{item.name}</Text> : <Text style={styles.itemName}>{item.name.split(' ')[0]} {'\n'} {item.name.split(' ')[1]}</Text>}
                    </View>
                </Pressable>
            )}
        />
    );

    return (
        <View style={styles.container}>
            <View>
                <GridSection icons={expensesIcons.data} />
            </View>
        </View >

    );

}




const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 10,
    },
    container: {
        padding: 10,
        marginBottom: 40,
    },
    item: {
        width: 100,
        height: 100,
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
        marginTop: 5,
        color: 'black',
        fontSize: 12,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

})