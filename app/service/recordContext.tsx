import React, { createContext, ReactNode, useContext, useState } from 'react';


interface RecordsContextType {
    fetchRecords: boolean;
    setFetchRecords: (value: boolean) => void;
}


const RecordsContext = createContext<RecordsContextType | undefined>(undefined);

export function RecordsProvider({ children }: { children: ReactNode }) {
    const [fetchRecords, setFetchRecords] = useState(true);

    return (
        <RecordsContext.Provider value={{ fetchRecords, setFetchRecords }}>
            {children}
        </RecordsContext.Provider>
    );
}

export function useRecords() {
    const context = useContext(RecordsContext);

    if (!context) {
        throw new Error('useRecords must be used within a RecordsProvider');
    }
    return context;
}
