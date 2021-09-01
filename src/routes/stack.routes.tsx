import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { Login } from '../pages/Login';
import { UserAddress } from '../pages/UserAddress';

import colors from '../styles/colors';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        initialRouteName='Welcome'
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            },
            headerShown: false
        }}
    >
        <stackRoutes.Screen
            name='Welcome'
            component={Welcome}
        />

        <stackRoutes.Screen
            name='Login'
            component={Login}
        />

        <stackRoutes.Screen
            name='UserAddress'
            component={UserAddress}
        />
    </stackRoutes.Navigator>
)

export default AppRoutes;