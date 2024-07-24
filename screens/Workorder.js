import { StyleSheet, Text, TextInput, TouchableOpacity,ScrollView, View,FlatList,Pressable,Image,ActivityIndicator } from 'react-native'
import React,{ useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams,router } from 'expo-router'
import {Picker} from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import {conn} from '../conn/conn'


const Workorder = () => {
  const {id}= useLocalSearchParams()
  const [priority, setSelectedItem] = useState(2);
  const [images,setImages]=useState([])
  const [jobtitle,setJobtitle]=useState()
  const [clientid,setClientid]=useState()
  const[joblocation,setLocation]=useState()
  const [jobtype,setType]=useState()
  const [description,setDescription]=useState()
  const [useLibrary,setUseLibrary]=useState(true)
  const [loading,setLoading]=useState(false)
  const [clientname,setClient]=useState()
  const [clientaddress,setAddress]=useState()
  const [phone,setPhone]=useState()
  const []=useState()
  

  const selectImage =async()=>{

        
    let result
    if(useLibrary){

        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            aspect:[4,3],
            quality:0.75,
            allowsEditing:true
        })

    }else{
        await ImagePicker.requestCameraPermissionsAsync()
        result = await ImagePicker.launchCameraAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            aspect:[4,3],
            quality:0.75,
            allowsEditing:true
        })
        
    }


    if(!result.canceled){
        
       // saveImage(result.assets[0].uri)
       
        setImages([...images,result.assets[0].uri])

      
        

    }

}



const deleteImage=async(uri)=>{
  await FileSystem.deleteAsync(uri)
  setImages(images.filter(i=>i!==uri))

}
const renderItem=({item})=>{

  return(
      <View style={{flex:1,margin:5}}>
          <TouchableOpacity onPress={()=>{deleteImage(item)}}><Image source={{uri:item}} style={{width:70,height:70}}/></TouchableOpacity>
      </View>
  )
}
const saveData=async(e)=>{
  e.preventDefault()

  if(!validateInputs()) return

  setLoading(true)

  const formdata = new FormData()
  images.forEach(image=>{formdata.append('beforeImage',{
    uri:image,
    name: 'beforeImage',
    type: ' image/jpeg',
  })})
  
  formdata.append('jobtitle',jobtitle)
  formdata.append('clientid',clientid)
  formdata.append('jobtype',jobtype)
  formdata.append('address',clientaddress)
  formdata.append('clientname',clientname)
  formdata.append('phone',phone)
  formdata.append('description',description)
  formdata.append('joblocation',joblocation)
  formdata.append('priority',parseInt(priority))
 

const url=''+conn+'/job';


axios.post(url,formdata,{
  headers:{
    Accept:'application/json',
    'Content-Type':'multipart/form-data',
   
  }
}).then(res=>{
  alert('Work order saved')
  setLoading(false)
  router.push(href='/services')
  
}).catch(err=>{
  console.log('Error occured'+err)
})


}
const validateInputs = () => {
  if (!jobtitle) {
      alert('Please provide a job title');
      return false;
    }
  if (!description) {
    alert('Please write a short description');
    return false;
  }


  if (!joblocation) {
      alert('Please provide job location');
      return false;
    }


  return true;
};



useEffect(() => {
      
  AsyncStorage.getItem('user').then((item) => {
  const val=JSON.parse(item)
 setClient(val.username)
 setClientid(val._id)
 setAddress(val.address)
 setPhone(val.phone)
 setType(id)

  })
  
  
},[])


  return (
    <SafeAreaView style={{flex:1}}>
    
    <View style={styles.container}>
    <LinearGradient colors={['#7f7fD5', '#E9E4f0']} style={styles.linearGradient}>
    <View style={{marginTop:5,padding:5,alignItems:'center'}}><Text style={styles.loginText}>{id} work</Text></View>

    <View>
      <TextInput placeholder='Title'   style={styles.input} onChangeText={setJobtitle}/>
      <TextInput  multiline={true}  numberOfLines={10} style={styles.textarea} placeholder='Write a description' onChangeText={setDescription}/>
    <TextInput placeholder='Location'   style={styles.input} onChangeText={setLocation}/>
    </View>
    <View><Text style={styles.textdata}>Upload images of the work area:</Text></View>
    
    <View style={{height:180}}>
    
        <FlatList data={images} renderItem={renderItem} numColumns={3} style={{margin:7}} contentContainerStyle={{borderColor:'#ccc',borderWidth:1,borderRadius:5}}/>
        <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
         <Pressable style={styles.ImageButton} onPress={()=>selectImage()}>
             
        <Text style={styles.ImageButtonText}>From Gallery</Text>
         </Pressable>
         <Pressable style={styles.ImageButton}onPress={()=>{setUseLibrary(false);selectImage()}}>
             
              <Text style={styles.ImageButtonText}>From Camera</Text>
         </Pressable>
        </View>
        {loading&&(<View style={[StyleSheet.absoluteFill,{backgroundColor:'rgba(0,0,0,0.4)',alignItems:'center',justifyContent:'center'}]}><ActivityIndicator color={'#fff'} animating size={'large'}/></View>)}
        
      
    </View>
    <View style={{paddingLeft:10,marginBottom:5}}><Text  style={{fontSize:16,fontWeight:'700',color:'black'}}>Priority:</Text></View>
    
    <View style={{paddingLeft:5,marginBottom:10,borderWidth: 1,
      borderColor:'#EEECE6',borderRadius: 10}}><Picker
    selectedValue={priority}
       
    fontSize={12}
    color={'#ccc'}
    onValueChange={(itemValue, itemIndex) =>
    setSelectedItem(itemValue)
    }>
  < Picker.Item label="Very Urgent" value="2" />
  < Picker.Item label="Urgent" value="1" />
    <Picker.Item label="Not Urgent" value='0'/>
    </Picker></View>
    <View style={{alignItems:'center'}}><TouchableOpacity style={styles.loginButton} onPress={saveData}><Text style={styles.loginText}>Save</Text></TouchableOpacity></View>

    </LinearGradient>
    </View>
    
    </SafeAreaView>
 
  )
}

export default Workorder

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:10,
    

},
linearGradient: {
       
  flex: 1,
  width:320,
  paddingLeft: 15,
  paddingRight: 15,
  borderRadius: 5
},
 
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius:5,
    padding: 10,
    borderColor:'#ccc'
  },
  textarea:{
    height:100,
    margin: 12,
    borderWidth: 1,
    borderRadius:5,
    padding: 10,
    textAlignVertical: 'top',
    borderColor:'#ccc'

  },
  textdata:{
    fontSize:16,
    fontWeight:'700',
    paddingLeft:5,
    margin:5,
    color:'black'


  },
  loginButton:{
    backgroundColor:'#AD40AF',
    padding:20,
    borderRadius:10,
    marginBottom:30,
    width:250
},
loginText:{
    textAlign:'center',
    fontWeight:'700',
    fontSize:16,
    color:'white'
},
ImageButton:{
  backgroundColor:'#AD40AF',
  padding:10,
  width:120,
  borderRadius:10

},
ImageButtonText:{
  textAlign:'center',
  fontWeight:'600',
  fontSize:14,
  color:'white'

},
})