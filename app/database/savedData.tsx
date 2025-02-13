import { Accounting, AccountingType } from "../model/accounting";



class MiaoDatabase {

    db: Accounting[] = []
    availableId = 0

    insertPredefinedRecords() {
        const now = new Date();
        const predefinedData: Accounting[] = [
            { id: 1, title: 'Salary', amount: 5000, date: new Date(now.getFullYear(), now.getMonth(), 1) },
            { id: 2, title: 'Rent', amount: -1000, date: new Date(now.getFullYear(), now.getMonth(), 1) },
            { id: 3, title: 'Food', amount: -300, date: new Date(now.getFullYear(), now.getMonth(), 15) },
            { id: 4, title: 'Gifts', amount: -50, date: new Date(now.getFullYear(), now.getMonth(), 15) },
            { id: 5, title: 'Transportation', amount: -150, date: new Date(now.getFullYear(), now.getMonth(), 30) },
            { id: 6, title: 'Animal', amount: -100, date: new Date(now.getFullYear(), now.getMonth(), 30) },
        ];
        this.availableId = predefinedData.length + 1
        this.db = predefinedData
    }

    insertRecord(record: Accounting) {
        const newRecord = { ...record, id: this.availableId }
        console.log('insertRecord', newRecord);
        console.log('db', this.db);
        this.db.push(newRecord)
        this.incrementAvailableId()
    }

    deleteRecord(id: number) {
        this.db = this.db.filter(record => record.id !== id)
    }

    updateRecord(record: Accounting) {
        this.db = this.db.map(r => r.id === record.id ? record : r)
    }

    getExpensesRecords(firstDateOfMonth: Date) {
        return this.db.filter(record => {
            const recordDate = new Date(record.date)
            return recordDate.getFullYear() === firstDateOfMonth.getFullYear() &&
                recordDate.getMonth() === firstDateOfMonth.getMonth() && record.amount < 0
        })
    }

    getIncomeRecords(firstDateOfMonth: Date) {
        return this.db.filter(record => {
            const recordDate = new Date(record.date)
            return recordDate.getFullYear() === firstDateOfMonth.getFullYear() &&
                recordDate.getMonth() === firstDateOfMonth.getMonth() && record.amount >= 0
        })
    }

    getIncomeExpensesRecords(firstDateOfMonth: Date) {
        return this.db.filter(record => {
            const recordDate = new Date(record.date)
            return recordDate.getFullYear() === firstDateOfMonth.getFullYear() &&
                recordDate.getMonth() === firstDateOfMonth.getMonth()
        })
    }


    // get year data
    getYearData(year: number, type: AccountingType) {
        return this.db.filter(record => {
            const recordDate = new Date(record.date)
            return recordDate.getFullYear() === year && (type === AccountingType.Expense ? record.amount < 0 : record.amount >= 0)
        })
    }

    // get month data

    getMonthData(date: Date, type: AccountingType) {
        const year = date.getFullYear()
        const month = date.getMonth()

        return this.db.filter(record => {
            const recordDate = new Date(record.date)
            return recordDate.getFullYear() === year && recordDate.getMonth() === month && (type === AccountingType.Expense ? record.amount < 0 : record.amount >= 0)
        })
    }

    // get week data

    getWeekData(date: Date, type: AccountingType) {
        const firstDayOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay())
        const lastDayOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (6 - date.getDay()))
        return this.db.filter(record => {
            const recordDate = new Date(record.date)
            return recordDate >= firstDayOfWeek && recordDate <= lastDayOfWeek && (type === AccountingType.Expense ? record.amount < 0 : record.amount >= 0)
        })
    }


    private incrementAvailableId() {
        this.availableId++
    }
}

export default MiaoDatabase;