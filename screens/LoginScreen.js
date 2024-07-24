import { StyleSheet, Text, TextInput, TouchableOpacity, View,Image,ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect,useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import google from '../assets/google.png'
import fb from '../assets/fb.png'
import otulogo from '../assets/logo1.png'
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {conn} from '../conn/conn'
import axios from 'axios'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google' 



WebBrowser.maybeCompleteAuthSession()



let bcrypt = require('bcryptjs');





const LoginScreen = () => {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isLoading,setIsLoading]=useState(false);
  const [userInfo,setUserInfo]=useState(null)
  const [request,response,promptAsync]= Google.useAuthRequest({
    androidClientId:"243269434188-nmitt22juscjan98ta2pgo75127tol38.apps.googleusercontent.com",
    iosClientId:"243269434188-45tc65afmbke17h8mnbvn3kt9a6g8jfc.apps.googleusercontent.com",
    webClientId:"243269434188-asv7quh4oomq9svv6mso49861t4mo6er.apps.googleusercontent.com",
 

  })

  const getUserInfo =async(token)=>{
    if(!token) return
    try{
      const response=await fetch("https://www.googleapis.com/userinfo/ve/me",{headers:{Authorization:`Bearer ${token}`}})
      const loggeduser=await response.json()
      await AsyncStorage.setItem("@loggeduser",JSON.stringify(loggeduser))
      setUserInfo(loggeduser)
    
    }catch(err){
      console.log(err)
  }
  }

  const handleSignInWithGoogle=async()=>{
    const loggeduser=await AsyncStorage.getItem("@loggeduser")
    if(!loggeduser){
      if(response?.type==='success'){
        await getUserInfo(response.authentication.accessToken)
      }
      await getUserInfo()

    }else{
      setUserInfo(JSON.parse(loggeduser))
    }
  }
   const onLoginPressed = async() => {
    
     if(!validateInputs()) {
        return
     }else{
      setIsLoading(true)
      let mail=email.value;
      let pwd = password.value;
      let userpwd='';
      let username='';
        
      const url=''+conn+'/getuser/'+mail.toLowerCase()
     
      await axios.get(url)
      .then(response=>{
            setIsLoading(false)
           
                     
            userpwd=response.data.password;
            username=response.data.email;
        
           if(!bcrypt.compareSync(pwd,userpwd))
            {
            alert('Incorrect Password');
            return

            }
            else if(username.toLowerCase()!==mail.toLowerCase()){
              alert("Incorrect email")

            }else{
            alert('Login Successful');
            
            try{
              AsyncStorage.setItem("user",JSON.stringify(response.data) )
              if(response.data.userType==='admin'){
                router.push(href='/dashboard')
              }else{
                router.push(href='/clientdash')
              }
              



            } catch(err){
              console.log('Kuna error'+err);
            }
         }
          
      
         
      }).catch(err=>{
          alert('Error'+err)
          setIsLoading(false)
                  
   }) 


     }
      

    
    
  
      
  
}
const validateInputs = () => {
  if (!email.value) {
    alert('Email is required');
    return false;
  }

  if (!password.value) {
    alert('Password is required');
    return false;
  }

  return true;
};
useEffect(()=>{
  handleSignInWithGoogle()
},[response])

useEffect(()=>{
  // url = 'https://otuworks.ca:5000/getalljobs'
  // axios.get(url)
  // .then(res=>console.log(res.data))
  // .catch(err=>alert('not connected'))
},[])


  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
    <LinearGradient colors={['#7f7fD5', '#E9E4f0']} style={styles.linearGradient}>
    <View style={{alignItems:'center',marginBottom:100,marginTop:50}}><Image source={otulogo} style={{ width: 180,
    height: 60,
    }}/>
    <Text style={styles.loginTitle}>Login</Text>
    </View>
   
   
    <View style={styles.email}>
    <MaterialIcons name="email" size={20} color="#666" />
    <TextInput placeholder='Email' keyboardType='email-address' style={styles.textinput}  value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={email.error}
        errorText={email.error}
        autoCapitalize="none"/>
    </View>
    <View style={styles.password}>
    <Entypo name="lock" size={20} color="#666"/>
    <TextInput placeholder='Password' secureTextEntry={true}  keyboardType={"default"} style={styles.textinput} value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={password.error}
        errorText={password.error}/>
    <TouchableOpacity onPress={()=>{''}}><Text style={{color:'#AD40AF', fontWeight:'700'}}>Forgot</Text></TouchableOpacity>
    </View>
    {isLoading===false?(<View style={{ alignItems:'center',width:300}}><TouchableOpacity onPress={onLoginPressed} style={styles.loginButton}><Text style={styles.loginText}>Login</Text>
    </TouchableOpacity>
    </View>):(<View style={styles.loading}><ActivityIndicator size='large'/></View>)}
  
   
    <View style={styles.orLogin}><Text>Or Login with...</Text></View>
    <View style={{flexDirection:'row',justifyContent:'center',width:300,marginTop:10,marginBottom:10,alignItems:'center'}}>
    <TouchableOpacity onPress={()=>promptAsync()} ><Image source={google}  style={{width: 30, height: 30,marginRight:22}}/></TouchableOpacity>
    <TouchableOpacity onPress={()=>{}} ><Image source={fb} style={{width: 35, height: 35}}/></TouchableOpacity>
    </View>
   
    <View style={{flexDirection:'row', justifyContent:'center'}}>
        <Text>New to the app?</Text>
        <TouchableOpacity onPress={()=>{router.push(href='/registerscreen')}}><Text style={{color:'#AD40AF', fontWeight:'700'}}>Register</Text></TouchableOpacity>
    
    </View> 
    </LinearGradient>
    </View>
    </SafeAreaView>
  )
}

export default LoginScreen


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        

    },
    google:{
       borderBlockColor:'#ddd',
      
       borderRadius:10,
       paddingHorizontal:30,
       paddingVertical:10


    },
    loginTitle:{
        fontFamily:'',
        fontWeight:'800',
        marginTop:20,
        fontSize:25,
        color:'#fff',
       
    },
    email:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        alignItems:'center',
        paddingBottom:8,
        marginBottom:25


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
        width:300,
        borderRadius:10
        
       
    },
    loginText:{
        textAlign:'center',
        fontWeight:'700',
        fontSize:16,
        color:'white'
    },
    orLogin:{
        marginTop:20,
        alignItems:'center',
        color:'#666',
      
    },
    linearGradient: {
       
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
       
        


})