import { createContext, useContext, useState } from "react";

import MiaoDatabase from "../database/savedData";

const MiaoDatabaseContext = createContext<MiaoDatabase | null>(null);


export const MiaoDatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // const [miaoDatabase] = useState(new MiaoDatabase());
    // miaoDatabase.insertPredefinedRecords();
    const [miaoDatabase] = useState(() => {
        const db = new MiaoDatabase();
        db.insertPredefinedRecords();
        return db;
    });
    return (
        <MiaoDatabaseContext.Provider value={miaoDatabase}>
            {children}
        </MiaoDatabaseContext.Provider>
    );
};

export const useMiaoDatabase = () => {
    const context = useContext(MiaoDatabaseContext);
    if (!context) {
        throw new Error('useMiaoDatabase must be used within a MiaoDatabaseProvider');
    }
    return context;
};


export default MiaoDatabaseContext;
