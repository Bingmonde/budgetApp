import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { Button } from '@rneui/themed';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { AccountingType } from "../model/accounting";

export default function NumberKeys({ accountingType, readInputAmount, close, addRecord }: { accountingType: AccountingType, readInputAmount: Function, close: Function, addRecord: Function }) {
    const [amount, setAmount] = useState('0');

    const readInput = (input: number | string) => {
        if (input === 'C') {
            amount.length > 1 ? setAmount(amount.slice(0, -1)) : setAmount('0');
        } else if (input === 'OK') {
            // pass
        } else if (input === '.') {
            // check if there is already a dot
            if (amount.includes('.')) {
                return;
            } else {
                setAmount(amount + input);
            }
        } else {
            if (amount === '0') {
                setAmount(input.toString());
            } else {
                setAmount(amount + input);
            }
        }
    }

    const GridSection = () => (
        <FlatList contentContainerStyle={styles.flatListContent}
            data={numberKeys}
            numColumns={3}
            keyExtractor={(item, index) => item.toString() + index}
            renderItem={({ item }) => (
                item === 'OK' ? (
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            buttonStyle={styles.okButton} onPress={() => {
                                const amountText = accountingType === AccountingType.Expense ? "-" + amount : amount;
                                readInputAmount(amountText);
                                // const amountNumber = parseFloat(amount);
                                addRecord(amountText);
                                close();
                            }}
                            disabled={parseFloat(amount) == 0}
                        >
                            <Text style={styles.buttonText}>OK</Text>
                        </Button>
                        <Button buttonStyle={styles.cancelButton} onPress={() => close()}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </Button>
                    </View>

                ) : item === 'C' ? (
                    <Pressable onPress={() => readInput(item)}>
                        <View style={styles.item}>
                            <FontAwesomeIcon icon={faDeleteLeft} />
                        </View>
                    </Pressable>
                ) : (
                    <Pressable onPress={() => readInput(item)}>
                        <View style={styles.item}>
                            <Text style={styles.itemName}>{item}</Text>
                        </View>
                    </Pressable>
                )
            )}
        />
    );


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Amount:  {
                accountingType === AccountingType.Expense ? '- ' : '+ '
            }{amount} $</Text>
            <GridSection />
            {/* <Button buttonStyle={styles.okButton}
                onPress={() => { }}>OK</Button> */}

        </View>
    )
}

const numberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', 'C', 'OK'];

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        marginTop: 20,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
        height: '30%',
    },
    title: {
        fontSize: 16,
    },
    item: {
        width: 50,
        height: 50,
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
        padding: 5,
        color: 'black',
        fontSize: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    okButton: {
        width: 100,
        height: 50,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#0e4749',
        margin: 5,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        width: 100,
        height: 50,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#e55812',
        margin: 5,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListContent: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },

})