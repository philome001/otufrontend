import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons';



const RegisterScreen = () => {
  return (
    <SafeAreaView>
    <View styles={styles.container}>
    <View><Text style={styles.loginText}>Register</Text></View>
   
   
    <View style={styles.email}>
    <MaterialIcons name="email" size={20} color="#666" />
    <TextInput placeholder='Email' keyboardType='email-address' style={styles.textinput}/>
    </View>
    <View style={styles.password}>
    <Entypo name="lock" size={20} color="black" />
    <TextInput placeholder='Password' secureTextEntry='true' style={styles.textinput}/>
    </View>
    <View style={styles.email}><TextInput placeholder='Phone number' style={styles.textinput}/></View>
    <View style={styles.email}><TextInput placeholder='Location address' style={styles.textinput}/></View>
    <View style={{flexDirection:'row',justifyContent:'center'}}>
    <Text>Already Registered?</Text>
    <TouchableOpacity onPress={()=>{}} style={styles.loginButton}><Text style={{color:'#AD40AF', fontWeight:'700'}}>Login</Text></TouchableOpacity>

    </View>

  
    </View>
    
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'

    },
    google:{
       borderBlockColor:'#ddd',
       width:2,
       borderRadius:10,
       paddingHorizontal:30,
       paddingVertical:10


    },
    loginText:{
        fontFamily:'',
        fontWeight:'500',
        color:'#333',
        marginBottom:30
    },
    email:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        paddingBottom:8,
        marginBottom:25


    },
    textinput:{
        flex:1,
        paddingVertical:0
    },
    password:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        paddingBottom:8,
        marginBottom:25


    },
    loginButton:{
        backgroundColor:'#AD40AF',
        padding:20,
        borderRadius:10,
        marginBottom:30
    },
    loginText:{
        textAlign:'center',
        fontWeight:'700',
        fontSize:16,
        color:'white'
    },
    orLogin:{
        textAlign:'center',
        color:'#666',
        marginBottom:30

    }
       
        


})