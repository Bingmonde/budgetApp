import { ScrollView, View, Text, StyleSheet } from "react-native";
import AddOneRecord from "./addOneRecord";
import { IconInfo } from "../model/icon";
import { AccountingType } from "../model/accounting";

export default function AddRecordScreen({ accountingType, icon, close, setSuccessSaved, setFailedSaved }: { accountingType: AccountingType, icon: IconInfo | null, close: Function, setSuccessSaved: Function, setFailedSaved: Function }) {
    return (

        <View style={styles.container}>
            {icon && <Text style={styles.title}>Add {icon!.name}</Text>}
            <AddOneRecord
                accountingType={accountingType}
                icon={icon}
                close={close}
                setSuccessSaved={setSuccessSaved}
                setFailedSaved={setFailedSaved}
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
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
        padding: 10,
        color: 'black',
        fontSize: 20,
    },


});