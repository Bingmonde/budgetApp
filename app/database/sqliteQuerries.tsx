import * as SQLite from 'expo-sqlite';
import { Accounting, AccountingType } from '../model/accounting';


// initialize db
export const initializeDb = async (db: SQLite.SQLiteDatabase) => {
    try {
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS accounting (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          amount REAL NOT NULL,
          date TEXT NOT NULL
        );
      `);
        console.log('Table accounting created or already exists.');

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS goal (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              budget REAL NOT NULL,
              savings REAL NOT NULL
            );
          `);
        console.log('Table goal created or already exists');


        const firstRow = await db.getFirstAsync('SELECT * FROM accounting');
        if (!firstRow) {
            await insertPredefinedData(db);
        }
        const firstRowGoal = await db.getFirstAsync('SELECT * FROM goal');
        if (!firstRowGoal) {
            await db.runAsync(`
                INSERT INTO goal (budget, savings)
                VALUES (0, 0);
              `);
        }

    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

// insert predefined data
const insertPredefinedData = async (db: SQLite.SQLiteDatabase) => {
    const now = new Date();
    const predefinedData: Accounting[] = [
        { id: 1, title: 'Salary', amount: 5000, date: new Date(now.getFullYear(), now.getMonth(), 1) },
        { id: 2, title: 'Rent', amount: -1000, date: new Date(now.getFullYear(), now.getMonth(), 1) },
        { id: 3, title: 'Food', amount: -300, date: new Date(now.getFullYear(), now.getMonth(), 3) },
        { id: 4, title: 'Gifts', amount: -50, date: new Date(now.getFullYear(), now.getMonth(), 3) },
        { id: 5, title: 'Transportation', amount: -150, date: new Date(now.getFullYear(), now.getMonth(), 2) },
        { id: 6, title: 'Animal', amount: -100, date: new Date(now.getFullYear(), now.getMonth(), 2) },
    ];

    for (const record of predefinedData) {
        await insertRecord(db, record);
    }

};

export const insertRecord = async (db: SQLite.SQLiteDatabase, record: Accounting) => {
    const formattedDate = record.date.toISOString().split('T')[0];
    const result = await db.runAsync(`
        INSERT INTO accounting (title, amount, date)
        VALUES ('${record.title}', ${record.amount}, '${formattedDate}');
      `);
    console.log('Record inserted:', result);
}



export const queryBetweenDatesWithType = async (db: SQLite.SQLiteDatabase, startDate: Date, endDate: Date, type: AccountingType) => {
    try {
        const startDateString = startDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
        const endDateString = endDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'

        if (type === AccountingType.All) {
            const result = await db.getAllAsync(
                `SELECT * FROM accounting WHERE date BETWEEN ? AND ?`,
                [startDateString, endDateString]
            );
            return result;
        }
        else if (type === AccountingType.Income) {
            const result = await db.getAllAsync(
                `SELECT * FROM accounting WHERE date BETWEEN ? AND ? AND amount >= 0`,
                [startDateString, endDateString]
            );
            return result;
        } else {
            const result = await db.getAllAsync(
                `SELECT * FROM accounting WHERE date BETWEEN ? AND ? AND amount < 0`,
                [startDateString, endDateString]
            );
            return result;
        }
    } catch (error) {
        console.error('Error fetching records between dates:', error);
        return [];
    }
};

export const queryByMonth = async (db: SQLite.SQLiteDatabase, firstDayOfMonth: Date, type: AccountingType) => {
    console.log('db:', db);
    try {
        const from = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), 1);
        const to = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0);
        const result = await queryBetweenDatesWithType(db, from, to, type);
        console.log('Records fetched:', result);
        return result;
    } catch (error) {
        console.error('Error fetching records between dates:', error);
        return [];
    }
};

export const queryByWeek = async (db: SQLite.SQLiteDatabase, date: Date, type: AccountingType) => {
    const firstDayOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
    const lastDayOfWeek = new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate() + 6);
    const result = await queryBetweenDatesWithType(db, firstDayOfWeek, lastDayOfWeek, type);
    console.log('Records fetched:', result);
    return result;
};

export const queryByYear = async (db: SQLite.SQLiteDatabase, year: number, type: AccountingType) => {
    try {
        const from = new Date(year, 0, 1);
        const to = new Date(year, 11, 31);
        const result = await queryBetweenDatesWithType(db, from, to, type);
        console.log('Records fetched:', result);
        return result;
    } catch (error) {
        console.error('Error fetching records between dates:', error);
        return [];
    }
}

export const deleteRecord = async (db: SQLite.SQLiteDatabase, id: number) => {
    const result = await db.runAsync(`
        DELETE FROM accounting WHERE id = ${id};
      `);
    console.log('Record deleted:', result);
}


export const getGoalFromDB = async (db: SQLite.SQLiteDatabase) => {
    const result = await db.getFirstAsync('SELECT * FROM goal');
    return result;
}

export const updateGoalInDB = async (db: SQLite.SQLiteDatabase, budget: number, savings: number) => {
    try {
        const result = await db.runAsync(`
            UPDATE goal
            SET budget = ${budget}, savings = ${savings}
            WHERE id = 1; 
        `);
        console.log('Goal updated:', result);
        return result;
    } catch (error) {
        console.error('Error updating goal:', error);
    }
}

export type GoalDB = {
    id: number;
    budget: number;
    savings: number;
}

export type AccountingDB = {
    id: number;
    title: string;
    amount: number;
    date: string;
}


export const convertToAccounting = (record: AccountingDB[]): Accounting[] => {
    return record.map((item) => {
        return {
            id: item.id,
            title: item.title,
            amount: item.amount,
            date: new Date(item.date)
        }
    })
}
