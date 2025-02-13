import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBuilding, faTint, faBolt, faCar, faBowlFood, faCreditCard, faJ, faUtensils, faMusic, faShirt, faSkiingNordic, faPlane, faGift, faHammer, faKitMedical, faWineBottle, faDroplet, faChampagneGlasses, faShoppingCart, faBaby, faCat, faMoneyBillWave, faWallet, faMoneyBillTrendUp, faSackDollar, faDollarSign, faCoins, faStar } from '@fortawesome/free-solid-svg-icons';

export type IconInfo = {
    name: string;
    icon: IconProp;
    color: string;
}

// generate dark color
const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const iconsColors = [
    "#75dbcd", "#faa381", "#FFB7C3", "#6b2d5c", "#f0386b", "#ff5376", "#f8c0c8", "#e2c290", "#a4af69", "#4c2719", "#d35269", "#ef2d56", "#ed7d3a", "#8cd867", "#2fbf71", "#65b891", "#4e878c", "#00241b", "#f49e4c", "#ab3428", "#6b0504", "#a3320b", "#e6af2e", "#104547", "#4b5358", "#727072", "#af929d", "#d2d6ef", "#6a5837", "#988f2a", "#fe5f00", "#f9c80e", "#f86624", "#ea3546", "#662e9b", "#43bccd", "#f6511d", "#ffb400", "#00a6ed", "#7fb800", "#0d2c54", "#993955", "#ae76a6", "#a3c3d9", "#241023", "#6b0504", "#a3320b", "#d5e68d", "#47a025", "#b19994", "#937666", "#3d3a4b", "#c2a83e", "#7ca982", "#3b3355", "#5d5d81", "#e54b4b", "#ffa987", "#62b6cb", "#1b4965", "#5fa8d3", "#03b5aa", "#037971", "#023436", "#6baa75", "#84dd63", "#cbff4d", "#f3b700", "#faa300", "#e57c04", "#ff6201", "#f63e02", "#e0ca3c", "#a799b7", "#048a81"
]

export const expensesIconList: IconInfo[] = [
    { name: 'Rent', icon: faBuilding, color: iconsColors[0] },
    { name: 'Water', icon: faTint, color: iconsColors[1] },
    { name: 'Electricity', icon: faBolt, color: iconsColors[2] },
    { name: 'Transportation', icon: faCar, color: iconsColors[3] },
    { name: 'Food', icon: faBowlFood, color: iconsColors[4] },
    { name: 'Credit card', icon: faCreditCard, color: iconsColors[5] },
    { name: 'Daily necessities', icon: faJ, color: iconsColors[6] },
    { name: 'Restaurants', icon: faUtensils, color: iconsColors[7] },
    { name: 'Entertainment', icon: faMusic, color: iconsColors[8] },
    { name: 'Clothing', icon: faShirt, color: iconsColors[9] },
    { name: 'Sports', icon: faSkiingNordic, color: iconsColors[10] },
    { name: 'Travel', icon: faPlane, color: iconsColors[11] },
    { name: 'Gifts', icon: faGift, color: iconsColors[12] },
    { name: 'Maintenance', icon: faHammer, color: iconsColors[13] },
    { name: 'Medical care', icon: faKitMedical, color: iconsColors[14] },
    { name: 'Wine', icon: faWineBottle, color: iconsColors[15] },
    { name: 'Beauty', icon: faDroplet, color: iconsColors[16] },
    { name: 'Party', icon: faChampagneGlasses, color: iconsColors[17] },
    { name: 'Online shopping', icon: faShoppingCart, color: iconsColors[18] },
    { name: 'Children', icon: faBaby, color: iconsColors[19] },
    { name: 'Animal', icon: faCat, color: iconsColors[20] },
    { name: 'Lotteries', icon: faMoneyBillWave, color: iconsColors[21] },
    { name: 'Others', icon: faStar, color: "grey" },
];

export const incomeIconList: IconInfo[] = [
    { name: 'Salary', icon: faWallet, color: iconsColors[22] },
    { name: 'Bonus', icon: faCoins, color: iconsColors[23] },
    { name: 'Investment', icon: faMoneyBillTrendUp, color: iconsColors[24] },
    { name: 'Lotteries', icon: faSackDollar, color: iconsColors[25] },
    { name: 'Others', icon: faDollarSign, color: iconsColors[26] },
];

// export const expensesIconList: IconInfo[] = [
//     { name: 'Rent', icon: faBuilding, color: generateRandomColor() },
//     { name: 'Water', icon: faTint, color: generateRandomColor() },
//     { name: 'Electricity', icon: faBolt, color: generateRandomColor() },
//     { name: 'Transportation', icon: faCar, color: generateRandomColor() },
//     { name: 'Food', icon: faBowlFood, color: generateRandomColor() },
//     { name: 'Credit_card', icon: faCreditCard, color: generateRandomColor() },
//     { name: 'Daily necessities', icon: faJ, color: generateRandomColor() },
//     { name: 'Restaurants', icon: faUtensils, color: generateRandomColor() },
//     { name: 'Entertainment', icon: faMusic, color: generateRandomColor() },
//     { name: 'Clothing', icon: faShirt, color: generateRandomColor() },
//     { name: 'Sports', icon: faSkiingNordic, color: generateRandomColor() },
//     { name: 'Travel', icon: faPlane, color: generateRandomColor() },
//     { name: 'Gifts', icon: faGift, color: generateRandomColor() },
//     { name: 'Maintenance', icon: faHammer, color: generateRandomColor() },
//     { name: 'Medical_care', icon: faKitMedical, color: generateRandomColor() },
//     { name: 'Wine', icon: faWineBottle, color: generateRandomColor() },
//     { name: 'Beauty', icon: faDroplet, color: generateRandomColor() },
//     { name: 'Party', icon: faChampagneGlasses, color: generateRandomColor() },
//     { name: 'Online_shopping', icon: faShoppingCart, color: generateRandomColor() },
//     { name: 'Children', icon: faBaby, color: generateRandomColor() },
//     { name: 'Animal', icon: faCat, color: generateRandomColor() },
//     { name: 'Lotteries', icon: faMoneyBillWave, color: generateRandomColor() },
//     { name: 'Others', icon: faStar, color: "grey" },
// ];

// export const incomeIconList: IconInfo[] = [
//     { name: 'Salary', icon: faWallet, color: generateRandomColor() },
//     { name: 'Bonus', icon: faCoins, color: generateRandomColor() },
//     { name: 'Investment', icon: faMoneyBillTrendUp, color: generateRandomColor() },
//     { name: 'Lotteries', icon: faSackDollar, color: generateRandomColor() },
//     { name: 'Others', icon: faDollarSign, color: generateRandomColor() },
// ];



