
import { useDb } from "@/app/database/dbContext";
import { AccountingDB, convertToAccounting, queryByMonth } from "@/app/database/sqliteQuerries";
import { AccountingType } from "@/app/model/accounting";
import { useMiaoDatabase } from "@/app/service/miaoDatabaseProvider";
import { getDataInfo, getMonthStatistics } from "@/app/utils/utilFunctions";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import {
    LineChart,
} from "react-native-chart-kit";


export default function MonthlyChart({ selectedMonth, accountingType }: { selectedMonth: Date, accountingType: AccountingType }) {
    const screenWidth = Dimensions.get("window").width;
    const db = useDb();
    const [monthData, setMonthData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [average, setAverage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const generateDateLabels = () => {
        const daysInMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate();
        const labels = [];
        for (let i = 1; i <= daysInMonth; i++) {
            if (i % 3 === 0) {
                labels.push(i.toString());
            } else {
                labels.push("");
            }
        }
        return labels;
    }

    useEffect(() => {
        const getMonthData = async () => {
            const data = await queryByMonth(db, selectedMonth, accountingType);
            const dataAccounting = convertToAccounting(data as AccountingDB[]);
            const monthStatistics = getMonthStatistics(selectedMonth, dataAccounting);
            const dataInfo = getDataInfo(monthStatistics);
            setAverage(dataInfo.average);
            setTotal(dataInfo.total);
            setMonthData(monthStatistics);
            setIsLoading(false);
            setLabels(generateDateLabels());
        }
        getMonthData();
    }, [selectedMonth, accountingType]);



    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.chartBox}>
                <Text style={{ fontSize: 16 }}>Total expenses : {total} </Text>
                <Text style={{ fontSize: 16 }}>Average: {average.toFixed(1)} </Text>
            </View>
            <LineChart
                data={{
                    labels: labels,
                    datasets: [{
                        data: monthData
                    }]
                }}
                width={screenWidth}
                height={220}
                yAxisLabel="$"
                yAxisSuffix=""
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: "#95c623",
                    backgroundGradientFrom: "#a1db1a",
                    backgroundGradientTo: "#7ce6d2",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(14, 71, 73, ${opacity})`,
                    style: {
                        padding: 20,
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "4",
                        strokeWidth: "0",
                        stroke: "#efe7da"
                    }
                }}
                bezier
                style={{
                    paddingTop: 20,
                    marginVertical: 8,
                }}
            />
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
    },
    title: {
        marginTop: 10,
        fontSize: 20,
        marginBottom: 20,
    },
    chartBox: {
        width: '100%',
        paddingLeft: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },


});
