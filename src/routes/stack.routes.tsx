import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { Login } from '../pages/Login';
import { UserAddress } from '../pages/UserAddress';
import { Questionnaire } from '../pages/Questionnaire';
import { Home } from '../pages/Home';
import { AskRecommendation } from '../pages/AskRecommendation';
import { Recommendation } from '../pages/Recommendation';
import { TourHistory } from '../pages/TourHistory';

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

        <stackRoutes.Screen
            name='Questionnaire'
            component={Questionnaire}
        />

        <stackRoutes.Screen
            name='Home'
            component={Home}
        />

        <stackRoutes.Screen
            name='AskRecommendation'
            component={AskRecommendation}
        />

        <stackRoutes.Screen
            name='Recommendation'
            component={Recommendation}
        />

        <stackRoutes.Screen
            name='TourHistory'
            component={TourHistory}
        />
    </stackRoutes.Navigator>
)

export default AppRoutes;