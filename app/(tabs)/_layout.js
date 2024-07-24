import { Tabs } from 'expo-router';
import  FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';


export default function DashboardLayout() {

 



  return (
    <Tabs screenOptions={{
      
      title:'Dashboard',
      headerStyle: {
        backgroundColor: '#E9E4f0',
      },
      headerTintColor: '#7851A9',
      headerTitleAlign:'center',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      
      tabBarActiveTintColor:'blue',
      tabBarStyle: {
      height: 70,
      marginLeft:25,
      marginRight:25,
      
      borderRadius: 10,
   
      },
      tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 10,
      },

      }}   
    >
      <Tabs.Screen name='dashboard' options={{ tabBarLabel: 'New' ,tabBarIcon: () => (
        <FontAwesome name="home" size={24} color="#AD40AF"  />
)}} />
      <Tabs.Screen name="completed" options={{ tabBarLabel: 'Completed',title:'Completed',tabBarIcon:()=>(<MaterialIcons name="work-off" size={24} color="#AD40AF" />)}} />
      <Tabs.Screen name="ongoing" options={{ tabBarLabel: 'Ongoing',title:'Ongoing',tabBarIcon: ()=>(<MaterialIcons name="construction" size={24} color="#AD40AF" />)}} />
    </Tabs>
  );
}