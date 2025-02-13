import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Accounting, Statistics } from "../model/accounting";
import { expensesIconList, IconInfo, incomeIconList } from "../model/icon";


export const convertRecordToPieChartData = (records: Accounting[]): Statistics[] => {

    const mergedRecords = mergeDuplicated(records);
    let iconInfo: IconInfo | undefined;
    const accoutings = mergedRecords.map((record) => {

        if (record.amount >= 0) {
            iconInfo = incomeIconList.find(icon => icon.name === record.title);
        }
        else {
            iconInfo = expensesIconList.find(icon => icon.name === record.title);
        }
        return {
            iconInfo: iconInfo!,
            value: record.amount
        }
    })


    // if there are more than 10 categories, merge the rest to 'Others'

    if (accoutings.length > 10) {
        let defaultIcon: IconInfo = { name: 'Small portions', icon: faStar, color: "black" };

        const top10 = accoutings.slice(0, 10);
        const rest = accoutings.slice(10);
        const restValue = rest.reduce((acc, record) => acc + record.value, 0);
        top10.push({ iconInfo: defaultIcon, value: restValue });
        return top10;
    }
    return accoutings;

}

const mergeDuplicated = (arr: Accounting[]): Accounting[] => {
    const map = new Map<string, Accounting>();
    arr.forEach((item) => {
        const key = item.title;
        if (map.has(key)) {
            const origin = map.get(key)!;
            origin.amount += item.amount;
        } else {
            map.set(key, { ...item });
        }
    })
    return Array.from(map.values()).sort((a, b) => a.amount - b.amount);
}

export const filterExpensesRecords = (records: Accounting[]): Accounting[] => {
    return records.filter(record => {
        return record.amount < 0
    })
}

export const filterIncomesRecords = (records: Accounting[]): Accounting[] => {
    return records.filter(record => {
        return record.amount >= 0
    })
}

export const getIncomeTotal = (records: Accounting[]): number => {
    return records.filter(record => record.amount >= 0).reduce((acc, record) => acc + record.amount, 0);
}
export const getExpenseTotal = (records: Accounting[]): number => {
    return records.filter(record => record.amount < 0).reduce((acc, record) => acc + record.amount, 0);
}

export const getTotalAmount = (records: Accounting[]): number => {
    return records.reduce((acc, record) => acc + record.amount, 0);
}


export const getYearStatistics = (records: Accounting[]): number[] => {
    const yearStatistics = new Array(12).fill(0);
    records.forEach(record => {
        const month = record.date.getUTCMonth();
        yearStatistics[month] += record.amount;
    })
    return yearStatistics;
}

export const getMonthStatistics = (month: Date, records: Accounting[]): number[] => {

    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

    const monthStatistics = new Array(daysInMonth).fill(0);
    records.forEach(record => {
        const day = record.date.getUTCDate() - 1;
        console.log(record.date);
        console.log(day);
        monthStatistics[day] += record.amount;
    })
    return monthStatistics;
}

export const getWeekStatistics = (week: Date, records: Accounting[]): number[] => {
    const weekStatistics = new Array(7).fill(0);
    records.forEach(record => {
        const day = record.date.getUTCDay();
        weekStatistics[day] += record.amount;
    })
    return weekStatistics;
}

export const getDataInfo = (data: number[]): DataInfo => {
    const total = data.reduce((acc, value) => acc + value, 0)
    const average = total / data.length;
    return { total, average };
}

export const getMonthName = (month: number): string => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return monthNames[month];
}

export const getWeekDateRange = (date: Date): string => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
    const lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (6 - date.getDay()));
    // return `${formatDate(firstDay)} - ${formatDate(lastDay)}`;
    return `${formatDate(firstDay)}-${formatDate(lastDay)}  ${lastDay.getFullYear()}`;
}

export const formatDate = (date: Date): string => {
    // return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    return (date.getMonth() + 1) + '/' + date.getDate();
}

export type DataInfo = {
    total: number;
    average: number;
}
