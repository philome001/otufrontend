import { Stack } from "expo-router";
import {LoginScreen}  from "./components/LoginScreen";



export default Layout=()=>{

    return(
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="LoginScreen" />
        <Stack.Screen name="index"/>
       
    </Stack>)

}