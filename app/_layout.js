import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default RootLayout=()=>{
   

    return(
        <GestureHandlerRootView>
        <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="(tabs)"/>
        <Stack.Screen name="loginscreen" />
        <Stack.Screen name="registerscreen" />
        <Stack.Screen name="services"/>
        <Stack.Screen name="jobdetails"/>
        <Stack.Screen name="workorder"/>
        <Stack.Screen name="clientdash" options={{
            headerShown:true,
            title:'Client Dashboard',
            headerStyle: {
                backgroundColor: '#E9E4f0',
              },
              headerTintColor: '#7851A9',
              headerTitleAlign:'center',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            
            
            }}/>
              <Stack.Screen name="clientgallery" options={{
            headerShown:true,
            title:'Gallery',
            headerStyle: {
                backgroundColor: '#E9E4f0',
              },
              headerTintColor: '#7851A9',
              headerTitleAlign:'center',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            
            
            }}/>
       
       
    </Stack>
        </GestureHandlerRootView>
  )

}