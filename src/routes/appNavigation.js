import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingScreen from "../app/screen/listingScreen";
import DetailScreen from "../app/screen/detailScreen";

const Stack = createStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Listing" component={ListingScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
)

export default AppNavigator;