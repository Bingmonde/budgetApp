
import { useDb } from "@/app/database/dbContext";
import { AccountingDB, convertToAccounting, queryByMonth, queryByWeek } from "@/app/database/sqliteQuerries";
import { AccountingType } from "@/app/model/accounting";
import { useMiaoDatabase } from "@/app/service/miaoDatabaseProvider";
import { getDataInfo, getWeekStatistics } from "@/app/utils/utilFunctions";
import { set } from "date-fns";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import {
    LineChart,
} from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

export default function WeeklyChart({ selectedWeek, accountingType }: { selectedWeek: Date, accountingType: AccountingType }) {
    const db = useDb();
    const [weekData, setWeekData] = useState<number[]>([]);
    const [average, setAverage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const weeks = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    ]

    useEffect(() => {
        const getWeekData = async () => {
            const data = await queryByWeek(db, selectedWeek, accountingType);
            const dataAccounting = convertToAccounting(data as AccountingDB[]);
            const weekStatistics = getWeekStatistics(selectedWeek, dataAccounting);
            const dataInfo = getDataInfo(weekStatistics);
            setAverage(dataInfo.average);
            setTotal(dataInfo.total);
            setWeekData(weekStatistics);
            setIsLoading(false);
        }
        getWeekData();
    }, [selectedWeek, accountingType]);



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
                    labels: weeks,
                    datasets: [
                        {
                            data: weekData
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

const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
};