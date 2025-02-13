import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { DB_NAME } from './dbConfig';
import { initializeDb } from './sqliteQuerries';

const DbContext = createContext<any>(null);

export const useDb = () => {
    return useContext(DbContext);
};

export const DbProvider = ({ children }: { children: ReactNode }) => {
    const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

    useEffect(() => {
        const openDb = async () => {
            const db = await SQLite.openDatabaseAsync(DB_NAME);
            console.log(`Database ${DB_NAME} initialized`);
            setDb(db);
            await initializeDb(db)
        };
        openDb();
    }, []);

    if (!db) {
        return <Text>Loading database...</Text>;
    }


    return (
        <DbContext.Provider value={db}>
            {children}
        </DbContext.Provider>
    );
};
