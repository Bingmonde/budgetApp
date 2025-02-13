
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import { AccountingType } from "../model/accounting";
import DisplayExpensesIcons from "../components/icons/expensesIconsComponent";
import DisplayIncomesIcons from "../components/icons/incomeIconsComponent";
import AddOneRecord from "../components/addOneRecord";
import AddRecordScreen from "../components/addRecordScreen";
import { IconInfo } from "../model/icon";
import InfoBox from "../components/infoBox";

export default function AddRecord() {
    const [selectedAccountingType, setSelectedAccountingType] = useState(AccountingType.Expense);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [successSaved, setSuccessSaved] = useState(false);
    const [failedSaved, setFailedSaved] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState<IconInfo | null>(null);

    useEffect(() => {
        if (selectedIcon !== null) {
            setModalVisible(true)
        }
    }, [selectedIcon])

    return (
        <View style={styles.container}>
            <View style={styles.headerBox}>
                <Pressable onPress={() => setSelectedAccountingType(AccountingType.Expense)}>
                    <Text style={selectedAccountingType == AccountingType.Expense
                        ? styles.titleSelected
                        : styles.title
                    }>Expenses</Text>
                </Pressable>
                <Pressable onPress={() => setSelectedAccountingType(AccountingType.Income)}>
                    <Text style={selectedAccountingType == AccountingType.Income
                        ? styles.titleSelected
                        : styles.title
                    }>Income</Text>
                </Pressable>
            </View>

            {selectedAccountingType == AccountingType.Expense &&
                <DisplayExpensesIcons
                    setSelectedIcon={setSelectedIcon}
                />
            }
            {selectedAccountingType == AccountingType.Income &&
                <DisplayIncomesIcons
                    setSelectedIcon={setSelectedIcon}
                />
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <AddRecordScreen
                            close={() => setModalVisible(false)}
                            accountingType={selectedAccountingType}
                            icon={selectedIcon}
                            setSuccessSaved={setSuccessSaved}
                            setFailedSaved={setFailedSaved}
                        />
                    </View>
                </View>
            </Modal>


            <Modal
                animationType="slide"
                transparent={true}
                visible={successSaved}
                onRequestClose={() => {
                    setSuccessSaved(!successSaved);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <InfoBox message="Record saved successfully"
                            type="success"
                            close={() => setSuccessSaved(!successSaved)}
                        />
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
        flexDirection: 'row',
        backgroundColor: 'orange',
        justifyContent: "center",
    },
    title: {

        fontSize: 24,
        marginBottom: 20,
        padding: 10,
    },
    titleSelected: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        padding: 10,
        fontSize: 24,
        marginBottom: 20,
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
