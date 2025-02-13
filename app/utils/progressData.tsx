import { SQLiteDatabase } from "expo-sqlite";
import { AccountingType } from "../model/accounting";
import { AccountingDB, convertToAccounting, getGoalFromDB, GoalDB, queryByMonth } from "../database/sqliteQuerries";
import { getExpenseTotal, getIncomeTotal } from "./utilFunctions";




export const getProgress = async (db: SQLiteDatabase) => {
    const today = new Date();
    const data = await queryByMonth(db, today, AccountingType.All);
    const accountingData = convertToAccounting(data as AccountingDB[]);

    const incomeTotal = getIncomeTotal(accountingData);
    const expenseTotal = getExpenseTotal(accountingData);

    const goal = await getGoalFromDB(db) as GoalDB;

    const savingProgress = getSavingsProgress(incomeTotal, expenseTotal, goal.savings);
    const budgetProgress = getBudgetProgress(expenseTotal, goal.budget);

    return { savingProgress, budgetProgress };

}


export const getSavingsProgress = (income: number, expenses: number, goal: number): number => {

    const total = income + expenses;
    const savingProgress = Math.abs(total) * 100 / goal;
    return savingProgress;
}

export const getBudgetProgress = (expenses: number, goal: number): number => {
    const budgetProgress = Math.abs(expenses) * 100 / goal;
    return budgetProgress;
}