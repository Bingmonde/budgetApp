
import { useDb } from "@/app/database/dbContext";
import { AccountingDB, convertToAccounting, queryByYear } from "@/app/database/sqliteQuerries";
import { AccountingType } from "@/app/model/accounting";
import { useMiaoDatabase } from "@/app/service/miaoDatabaseProvider";
import { getDataInfo, getYearStatistics } from "@/app/utils/utilFunctions";
import { set } from "date-fns";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import {
    LineChart,
} from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

export default function YearlyChart({ selectedYear, accountingType }: { selectedYear: number, accountingType: AccountingType }) {
    const db = useDb();
    const [yearData, setYearData] = useState<number[]>([]);
    const [average, setAverage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getYearData = async () => {
            const data = await queryByYear(db, selectedYear, accountingType);
            const dataAccounting = convertToAccounting(data as AccountingDB[]);
            const yearStatistics = getYearStatistics(dataAccounting);
            const dataInfo = getDataInfo(yearStatistics);
            setAverage(dataInfo.average);
            setTotal(dataInfo.total);
            setYearData(yearStatistics);
            setIsLoading(false);
        }

        getYearData();
    }, [selectedYear, accountingType]);


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
                    labels: months,
                    datasets: [
                        {
                            data: yearData
                        }
                    ]
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


const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];


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
