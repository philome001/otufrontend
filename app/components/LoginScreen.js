import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons';



const LoginScreen = () => {
  return (
    <SafeAreaView>
    <View styles={styles.container}>
    <View><Text style={styles.loginText}>Login</Text></View>
   
   
    <View style={styles.email}>
    <MaterialIcons name="email" size={20} color="#666" />
    <TextInput placeholder='Email' keyboardType='email-address' style={styles.textinput}/>
    </View>
    <View style={styles.password}>
    <Entypo name="lock" size={20} color="black" />
    <TextInput placeholder='Password' secureTextEntry='true' style={styles.textinput}/>
    <TouchableOpacity onPress={()=>{''}}><Text style={{color:'#AD40AF', fontWeight:'700'}}>Forgot</Text></TouchableOpacity>
    </View>
    <TouchableOpacity onPress={()=>{}} style={styles.loginButton}><Text style={styles.loginText}>Login</Text></TouchableOpacity>
    </View>
    <Text>Or Login with...</Text>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <TouchableOpacity onPress={()=>{}} style={styles.google}><AntDesign name="googleplus" size={20} color="black" /></TouchableOpacity>
    <TouchableOpacity onPress={()=>{}} style={styles.google}><Entypo name="facebook-with-circle" size={20} color="black" /></TouchableOpacity>
    </View>
    <View style={{flexDirection:'row', justifyContent:'center'}}>
        <Text>New to the app?</Text>
        <TouchableOpacity onPress={()=>{}}><Text style={{color:'#AD40AF', fontWeight:'700'}}>Register</Text></TouchableOpacity>
    
    </View>
    </SafeAreaView>
  )
}

export default LoginScreen

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