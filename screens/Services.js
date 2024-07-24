import { StyleSheet, Text, View,ScrollView, Pressable,TouchableOpacity } from 'react-native'
import React from 'react'
import{LinearGradient} from 'expo-linear-gradient'
import { MaterialIcons,Entypo,MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Services = () => {
  const router= useRouter()
  
  return (
    <SafeAreaView style={{flex:1}}>
    
      <View style={styles.container}>
      
        <LinearGradient colors={['#7f7fD5', '#E9E4f0']} style={styles.linearGradient}>
        <View></View>
        <View style={{padding:6}}>
             <Text style={styles.title}>   
                Choose a Service..
            </Text>
    
          </View>
          <View style={styles.card}>
            <Pressable style={styles.serviceButton} onPress={()=>router.push(href=`workorder?id=${"Electrical"}`)}>
              <View style={styles.icon}><MaterialIcons name="electrical-services" size={24} color="black" />

              </View>
              <Text style={styles.ServiceButtonText}>Electrical Services</Text>
              <View style={styles.chevronright}><Entypo name="chevron-right" size={24} color="black" /></View>

            </Pressable>
            <Pressable style={styles.serviceButton} onPress={()=>router.push(href=`workorder?id=${"Flooring"}`)}>
              <View style={styles.icon}><MaterialCommunityIcons name="floor-plan" size={24} color="black" />

              </View>
              <Text style={styles.ServiceButtonText}>Flooring</Text>
              <View style={styles.chevronright}><Entypo name="chevron-right" size={24} color="black" /></View>

            </Pressable>
            <Pressable style={styles.serviceButton} onPress={()=>router.push(href=`workorder?id=${"Dry Wall"}`)}>
              <View style={styles.icon}><MaterialCommunityIcons name="wall" size={24} color="black" />

              </View>
              <Text style={styles.ServiceButtonText}>Dry Wall</Text>
              <View style={styles.chevronright}><Entypo name="chevron-right" size={24} color="black" /></View>

            </Pressable>
            <Pressable style={styles.serviceButton} onPress={()=>router.push(href=`workorder?id=${"Kitchen and Bath"}`)}>
              <View style={styles.icon}><MaterialIcons name="kitchen" size={24} color="black" />
              </View>
              <Text style={styles.ServiceButtonText}>Kitchen and Bath</Text>
              <View style={styles.chevronright}><Entypo name="chevron-right" size={24} color="black" /></View>

            </Pressable>
            <Pressable style={styles.serviceButton} onPress={()=>router.push(href=`workorder?id=${"HVAC"}`)}>
              <View style={styles.icon}><MaterialIcons name="hvac" size={24} color="black" /> 

              </View>
              <Text style={styles.ServiceButtonText}>HVAC</Text>
              <View style={styles.chevronright}><Entypo name="chevron-right" size={24} color="black" /></View>

            </Pressable>
            <Pressable style={styles.serviceButton} onPress={()=>router.push(href=`workorder?id=${"Painting"}`)}>
              <View style={styles.icon}><FontAwesome5 name="paint-roller" size={24} color="black" />

              </View>
              <Text style={styles.ServiceButtonText}>Painting</Text>
              <View style={styles.chevronright}><Entypo name="chevron-right" size={24} color="black" /></View>

            </Pressable>
            <Pressable style={styles.serviceButton} onPress={()=>router.push(href=`workorder?id=${"Plumbing"}`)}>
              <View style={styles.icon}><MaterialIcons name="plumbing" size={24} color="black" />

              </View>
              <Text style={styles.ServiceButtonText}>Plumbing</Text>
              <View style={styles.chevronright}><Entypo name="chevron-right" size={24} color="black" /></View>

            </Pressable>
            <Pressable style={styles.serviceButton} onPress={()=>router.push(href=`workorder?id=${"Framing"}`)}>
              <View style={styles.icon}><MaterialIcons name="carpenter" size={24} color="black" />

              </View>
              <Text style={styles.ServiceButtonText}>Framing</Text>
              <View style={styles.chevronright}><Entypo name="chevron-right" size={24} color="black" /></View>

            </Pressable>
            <Pressable style={styles.serviceButton} onPress={()=>router.push(href=`workorder?id=${"Landscaping"}`)}>
              <View style={styles.icon}><MaterialIcons name="landscape" size={24} color="black" />

              </View>
              <Text style={styles.ServiceButtonText}>Landscaping</Text>
              <View style={styles.chevronright}><Entypo name="chevron-right" size={24} color="black" /></View>

            </Pressable>
            <Pressable style={styles.serviceButton} onPress={()=>router.push(href=`workorder?id=${"Other"}`)}>
              <View style={styles.icon}><MaterialIcons name="miscellaneous-services" size={24} color="black" />

              </View>
              <Text style={styles.ServiceButtonText}>Other</Text>
              <View style={styles.chevronright}><Entypo name="chevron-right" size={24} color="black" /></View>

            </Pressable>
         
                      
          </View>
                 
        </LinearGradient>
    

      </View>
      
    </SafeAreaView>
  )
}

export default Services

const styles = StyleSheet.create({
    container:{
    flex:1,
    padding:10,
  

    },
    linearGradient: {
       
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },
      title: {
        marginTop:10,
        fontSize: 20,
        textAlign: 'center',
        fontWeight:"600",
        color:'white'
      },
      serviceButton:{
        //backgroundColor:'#BE93C5',
        backgroundColor:'#AD40AF',
        borderRadius:6,
        padding:5,
        flexDirection:"row",
        alignItems:'center',

        marginVertical:5,

      },
      icon:{
        padding:7,
        width:40,
        height:40,
        borderRadius:8,
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"center"


      },
      ServiceButtonText:{
        flex:1,
        marginLeft:10,
        fontSize:16,
        fontWeight:"600",
        color:'white'


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
        marginTop:10,
        backgroundColor:"white",
        paddingHorizontal:5,
        paddingVertical:5,
        borderRadius:7

      },
      loginButton:{
       
        backgroundColor:'#AD40AF',
        marginTop:50,
        marginBottom:30,
        padding:20,
        width:250,
        borderRadius:10
        
       
    },
    loginText:{
        textAlign:'center',
        fontWeight:'700',
        fontSize:16,
        color:'white'
    },

})