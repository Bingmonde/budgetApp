import { useDb } from "@/app/database/dbContext";
import { getGoalFromDB, GoalDB } from "@/app/database/sqliteQuerries";
import { getBudgetProgress, getSavingsProgress } from "@/app/utils/progressData";
import { useEffect, useState } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { ProgressChart } from "react-native-chart-kit";


export default function GoalProgress({ income, expenses }: { income: number, expenses: number }) {
    const db = useDb();

    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;

    const [budgetNumber, setBudgetNumber] = useState(0);
    const [savingNumber, setSavingNumber] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    console.log("GoalProgress, income: ", income, "expenses: ", expenses);
    useEffect(() => {
        const fetchGoal = async () => {
            const goal = await getGoalFromDB(db) as GoalDB;
            setBudgetNumber(goal.budget);
            setSavingNumber(goal.savings);
            setIsLoading(false);

        }
        fetchGoal();
    }, [income, expenses])

    const chartConfigBudget = {
        backgroundGradientFrom: "#95c623",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(229, 88, 18, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(58, 64, 90, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
    };

    const chartConfigSaving = {
        backgroundGradientFrom: "#95c623",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(14, 71, 73, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(58, 64, 90, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Achievement of goal today</Text>
            {budgetNumber === 0 && <Text style={{ fontSize: 16 }}>Please set your budget in setting</Text>}
            {savingNumber === 0 && <Text style={{ fontSize: 16 }}>Please set your goal of saving in setting</Text>}
            {savingNumber !== 0 &&
                <>
                    <View style={styles.chartBox}>
                        <Text style={{ fontSize: 16 }}>Your budget: {budgetNumber}$</Text>
                        <Text style={{ fontSize: 16 }}>Already used: {(Math.abs(expenses) * 100 / budgetNumber).toFixed(0)} % </Text>
                    </View>
                    <ProgressChart
                        data={{
                            labels: ["Budget"],
                            data: [Math.abs(expenses) > budgetNumber ? 1 : Math.abs(expenses) / budgetNumber]

                        }}
                        width={screenWidth - 40}
                        height={180}
                        chartConfig={chartConfigBudget}
                        strokeWidth={32}
                        radius={64}
                        hideLegend={true}
                    />
                </>}
            {savingNumber !== 0 &&
                <>
                    <View style={styles.chartBox}>
                        <Text style={{ fontSize: 16 }}>Goal of Savings: {savingNumber} $ </Text>
                        <Text style={{ fontSize: 16 }}>Goal achieved: {((income + expenses) * 100 / savingNumber).toFixed(0)}% </Text>

                    </View>
                    <ProgressChart
                        data={{
                            labels: ["Savings"],
                            data: [(income + expenses) / savingNumber > 1 ? 1 : (income + expenses) / savingNumber]
                        }}
                        width={screenWidth - 40}
                        height={180}
                        chartConfig={chartConfigSaving}
                        strokeWidth={32}
                        radius={64}
                        hideLegend={true}
                    />
                </>
            }
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    title: {
        marginTop: 10,
        fontSize: 20,
        marginBottom: 20,
        color: '#324376',
        fontWeight: 'bold',
    },
    chartBox: {
        width: '100%',
        paddingLeft: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },


});
