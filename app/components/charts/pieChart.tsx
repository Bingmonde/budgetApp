import { Dimensions, View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import React, { useEffect, useState } from "react";
import Svg, { Rect } from "react-native-svg";
import { Accounting, convertToStatsCompatible, Statistics, StatsCompatible } from "@/app/model/accounting";
import { convertRecordToPieChartData } from "@/app/utils/utilFunctions";
import { set } from "date-fns";
import { Divider } from "@rneui/base";
import GoalProgress from "./progressChart";

const screenWidth = Dimensions.get("window").width;


export default function MonthlyPieChart({ data }: { data: Accounting[] }) {
    const [stats, setStats] = useState<Statistics[]>([]);
    const [pieData, setPieData] = useState<StatsCompatible[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const statsData = convertRecordToPieChartData(data);
        setStats(statsData);
        setPieData(convertToStatsCompatible(statsData));
        setIsLoading(false);
    }, [data])

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {data.length > 0 &&
                <View>
                    <Text
                        style={{
                            marginTop: 10,
                            fontSize: 20,
                            marginBottom: 20,
                            color: '#324376',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}
                    >Expense of this month</Text>
                    <PieChart
                        data={pieData}
                        width={screenWidth - 16}
                        height={220}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="-10"
                        center={[20, 10]}
                    />


                </View>
            }
            {data.length === 0 &&
                <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 16, margin: 20 }}>No data for this period</Text>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    bodyContainer: {
        flexDirection: 'row',
    },
    chartContainer: {
        flex: 1,
    },
    legendContainer: {
        flex: 1,
        marginTop: 20,
    },
    detailChart: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        margin: 5,
    },
    detailBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        margin: 1,
    },
    detailText: {
        marginTop: 15,
        marginLeft: 10,
        fontSize: 18,
        alignSelf: "center",
    }
});


