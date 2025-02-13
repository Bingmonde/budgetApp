import { View, Text, StyleSheet } from "react-native"
import { Button } from '@rneui/themed';


export default function InfoBox({ message, type, close }: { message: string, type: string, close: Function }) {
    return (
        <View style={type === 'success' ? styles.successContainer : styles.failContainer}>
            <Text style={styles.text}>{message}</Text>
            <Button buttonStyle={styles.okButton} onPress={() => {
                close();
            }}>OK</Button>

        </View>
    )
}

const styles = StyleSheet.create({
    successContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'lightgreen',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    failContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightcoral',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#002626',
        textAlign: 'center',
        marginBottom: 10,
    },
    okButton: {
        width: '45%',
        paddingHorizontal: 50,
        marginBottom: 10,
        backgroundColor: '#0e4749',
        padding: 10,
        margin: 5,
        borderRadius: 100,
        textAlign: 'center',
        alignSelf: 'center'
    },
})


