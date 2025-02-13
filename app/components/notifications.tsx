import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Device from 'expo-device'
import Constants from 'expo-constants';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { SQLiteDatabase } from "expo-sqlite";
import { getProgress } from "../utils/progressData";

export async function sendPushNotification(expoPushToken: string) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}


export async function registerForPushNotificationsAsync() {

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            console.log('Permission not granted to get push token for push notification!');
            return;
        }
        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
            console.log('Project ID not found');
        }
        try {
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            console.log(pushTokenString);
            return pushTokenString;
        } catch (e: unknown) {
            console.log(`${e}`);
        }
    } else {
        console.log('Must use physical device for push notifications');
    }
}

export async function weeklyNotification(db: SQLiteDatabase) {
    const progress: { savingProgress: number, budgetProgress: number } = await getProgress(db);
    let title = "Your progress of this month!";
    if (progress.budgetProgress >= 100) {
        title = "Your budget of this month is surpassing!📬";
    }
    else if (progress.budgetProgress >= 80) {
        title = "80% of your budget of this month is used!📬";
    }


    let body = `Your saving progress is ${progress.savingProgress.toFixed(0)}% and budget progress is ${progress.budgetProgress.toFixed(0)}`;

    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
            weekday: 1, // MONDAY
            hour: 12,
            minute: 0,
        },
    });
}

export async function cancelNotification() {
    await Notifications.cancelAllScheduledNotificationsAsync();
}


// test a instant notification 
const trigger: Notifications.TimeIntervalTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 5,
    repeats: false,
};

const content: Notifications.NotificationContentInput = {
    title: "Reminder",
    body: "Receiving this notification means test is passed!",
};

export const scheduleNotification = async () => {
    try {
        await Notifications.scheduleNotificationAsync({
            content: content,
            trigger: trigger
        });
    } catch (error) {
        console.error("Error scheduling notification", error);
    }
};


