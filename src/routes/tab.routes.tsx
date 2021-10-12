import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/core';
import { MaterialIcons } from '@expo/vector-icons';

import { TourHistory } from '../pages/TourHistory';
import { NextTours } from '../pages/NextTours';

import colors from '../styles/colors';
import { User } from '../types/user';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    const routes = useRoute();
    const user = routes.params as User;
    
    return(
        <AppTab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.background_blue,
                tabBarInactiveTintColor: colors.gray,
                tabBarLabelPosition: 'beside-icon',
                headerShown: false,
                headerStyle: {
                    backgroundColor: colors.white
                },
                tabBarStyle: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 88,
                }
            }}   
        >
            <AppTab.Screen 
                name='Próximos passeios'
                component={NextTours}
                initialParams={user}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name='add-circle-outline'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />

            <AppTab.Screen 
                name='Visitados'
                component={TourHistory}
                initialParams={user}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name='format-list-bulleted'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
        </AppTab.Navigator>
    )
}

export default AuthRoutes;