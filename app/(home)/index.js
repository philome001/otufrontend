import { StyleSheet, Text, View,ScrollView, Pressable } from 'react-native'
import React from 'react'
import{LinearGradient} from 'expo-linear-gradient'
import { MaterialIcons,Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const router= useRouter()
  return (
    <SafeAreaView>
    <View>
      
      <ScrollView>
        <LinearGradient colors={['#7f7fD5', '#E9E4f0']} style={styles.linearGradient}>
          <View style={{padding:6}}>
             <Text style={styles.title}>   
                Choose Service..
            </Text>
    
          </View>
          <View style={styles.card}>
            <Pressable style={styles.serviceButton} onPress={()=>router.push("../components/Detailspage")}>
              <View style={styles.icon}><MaterialIcons name="electrical-services" size={24} color="black" />

              </View>
              <Text style={styles.ServiceButtonText}>Electrical Services</Text>
              <View style={styles.chevronright}><Entypo name="chevron-right" size={24} color="black" /></View>

            </Pressable>
            <Pressable style={styles.serviceButton}>
              <View style={styles.icon}><MaterialIcons name="electrical-services" size={24} color="black" />

              </View>
              <Text style={styles.ServiceButtonText}>Electrical Services</Text>
              <View style={styles.chevronright}><Entypo name="chevron-right" size={24} color="black" /></View>

            </Pressable>
            <Pressable style={styles.serviceButton}>
              <View style={styles.icon}><MaterialIcons name="electrical-services" size={24} color="black" />

              </View>
              <Text style={styles.ServiceButtonText}>Electrical Services</Text>
              <View style={styles.chevronright}><Entypo name="chevron-right" size={24} color="black" /></View>

            </Pressable>
            <Pressable style={styles.serviceButton}>
              <View style={styles.icon}><MaterialIcons name="electrical-services" size={24} color="black" />

              </View>
              <Text style={styles.ServiceButtonText}>Electrical Services</Text>
              <View style={styles.chevronright}><Entypo name="chevron-right" size={24} color="black" /></View>

            </Pressable>
            <Pressable style={styles.serviceButton}>
              <View style={styles.icon}><MaterialIcons name="electrical-services" size={24} color="black" />

              </View>
              <Text style={styles.ServiceButtonText}>Electrical Services</Text>
              <View style={styles.chevronright}><Entypo name="chevron-right" size={24} color="black" /></View>

            </Pressable>
          </View>
         
           
        
        </LinearGradient>
     </ScrollView>
      
 
    </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    linearGradient: {
       
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },
      title: {
        paddingTop:5,
        fontSize: 20,
        textAlign: 'center',
        fontWeight:"600",
      },
      serviceButton:{
        backgroundColor:'#BE93C5',
        borderRadius:6,
        padding:10,
        flexDirection:"row",
        alignItems:'center',

        marginVertical:10,

      },icon:{
        padding:7,
        width:45,
        height:45,
        borderRadius:8,
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"center"


      },
      ServiceButtonText:{
        flex:1,
        marginLeft:10,
        fontSize:16,
        fontWeight:"600"


      },
      chevronright:{
     
        width:35,
        height:35,
        borderRadius:8,
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"center"
      },
      card:{
        marginTop:20,
        backgroundColor:"white",
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:7

      }

})