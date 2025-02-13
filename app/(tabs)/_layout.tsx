import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChartSimple, faFlag, faGears, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#002626', //  black
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#002626',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Detail',
          // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faFlag} size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chart"
        options={{
          title: 'Chart',
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faChartSimple} size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faPlus} size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faGears} size={30} color={color} />,
          // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
    </Tabs>

  );
}