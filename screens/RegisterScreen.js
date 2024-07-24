import { StyleSheet, Text, TextInput, TouchableOpacity, View,Image,KeyboardAvoidingView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios'
import {conn} from '../conn/conn'
import otulogo from '../assets/logo1.png'
import { ScrollView } from 'react-native-gesture-handler';




const RegisterScreen = () => {
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const [phone,setPhone]=useState('')
    const [address,setAddress]=useState('')


    const saveData=(e)=>{
        e.preventDefault()

        if(!validateInputs()) return
        
        
        let data={
            username:username,
            email:email.toLowerCase(),
            password:password,
            phone:phone,
            address:address,
        }
        

    const url = ''+conn+'/user'

    axios.post(url,data)
    .then(res=>{
        console.log(res.data)
        alert('User Inserted')
    }).catch(err=>console.log('error occured'+err.message))
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
    const validateInputs = () => {
        if (!username) {
            alert('Name is required');
            return false;
          }
        if (!email) {
          alert('Email is required');
          return false;
        }
        if (!validateEmail(email)) {
            alert('Email is not valid');
            return false;
          }
      
        if (!password) {
          alert('Password is required');
          return false;
        }
      
        if (!phone) {
            alert('Phone required');
            return false;
        }
        if (!address) {
            alert('Password is required');
            return false;
          }

      
        return true;
      };



  return (
    
    <SafeAreaView style={{flex:1}}>
    <ScrollView showsVerticalScrollIndicator={false}>    
    <View style={styles.container}>
    
    <LinearGradient colors={['#7f7fD5', '#E9E4f0']} style={styles.linearGradient}>
    <View style={{alignItems:'center',marginBottom:30,marginTop:50}}><Image source={otulogo} style={{ width: 180,
    height: 60,}}/>
    <Text style={styles.registerTitle}>Register</Text>
    </View>
   
    <View style={styles.email}>
    <FontAwesome name="user" size={24} color="#666" />
    <TextInput placeholder='Name' keyboardType='text' style={styles.textinput} onChangeText={text=>setUsername(text)}/>
    </View>
    <View style={styles.email}>
    <MaterialIcons name="email" size={20} color="#666" />
    <TextInput placeholder='Email' keyboardType='email-address' style={styles.textinput} onChangeText={(text)=>setEmail(text)}/>
    </View>
    <View style={styles.password}>
    <Entypo name="lock" size={20} color="#666" />
    <TextInput placeholder='Password' secureTextEntry={true} style={styles.textinput} onChangeText={(text)=>setPassword(text)}/>
    </View>
    <View style={styles.email}><Entypo name="phone" size={24} color="#666" /><TextInput placeholder='Phone number' style={styles.textinput} onChangeText={(text)=>setPhone(text)}/></View>
    <View style={styles.email}><Entypo name="location-pin" size={24} color="#666" /><TextInput placeholder='Location address' style={styles.textinput} onChangeText={(text)=>setAddress(text)}/></View>
    <View><TouchableOpacity onPress={saveData} style={styles.loginButton}><Text style={styles.loginText}>Register</Text>
    </TouchableOpacity></View>
    <View style={{flexDirection:'row',justifyContent:'center',marginBottom:80}}>

    <Text>Already Registered?</Text>
    <TouchableOpacity onPress={()=>{router.push(href='/loginscreen')}}><Text style={{color:'#AD40AF', fontWeight:'700'}}>Login</Text></TouchableOpacity>

    </View>

    </LinearGradient>
   
    </View>
     </ScrollView >
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:10,

    },
    google:{
       borderBlockColor:'#ddd',
       width:2,
       borderRadius:10,
       paddingHorizontal:30,
       paddingVertical:10


    },
    registerTitle:{
        fontFamily:'',
        fontWeight:'500',
        color:'#fff',
        fontSize:20,
        marginTop:20,
       
    },
    email:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        paddingBottom:8,
        marginBottom:25,
        alignItems:'center',


    },
    textinput:{
        flex:1,
        paddingVertical:0,
        paddingHorizontal:5
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
        marginBottom:30,
        width:300
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

    },
    linearGradient: {
       
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },
       
        


})