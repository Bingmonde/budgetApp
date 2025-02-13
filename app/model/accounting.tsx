import { IconInfo } from "./icon";

export type Accounting = {
    id: number;
    title: string
    amount: number;
    date: Date
}

export enum AccountingType {
    Expense,
    Income,
    All
}


export type StatsCompatible = {
    name: string;
    population: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
}

export const convertToStatsCompatible = (statistics: Statistics[]): StatsCompatible[] => {
    return statistics.map((item) => {
        return {
            name: item.iconInfo.name,
            population: item.value,
            color: item.iconInfo.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        }

    })
}

export type Statistics = {
    iconInfo: IconInfo;
    value: number;
}


