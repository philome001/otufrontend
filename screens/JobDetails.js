import { StyleSheet, Text, View,TextInput,Image, Platform, TouchableOpacity ,Animated,Pressable, Modal,FlatList} from 'react-native'
import{LinearGradient} from 'expo-linear-gradient'
import React,{useEffect,useState,useRef} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router';
import {PinchGestureHandler,State} from 'react-native-gesture-handler';
import {conn} from '../conn/conn'
import axios from 'axios'


const JobDetails = () => {
    const {id}= useLocalSearchParams()
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false)
    const [status,setStatus]=useState('Ongoing')
    const [dialog,setDialog]=useState(null)
    const [data,setData]=useState()
    const[idx,setIndex]=useState()
    const [images,setImages]=useState([])
    const [useLibrary,setUseLibrary]=useState(true)
    const[notes,setNotes]=useState()
  const [loading,setLoading]=useState(false)

    const scale = useRef(new Animated.Value(1)).current

   const onZoomEventFunction = Animated.event([{

    nativeEvent:{
     scale
    },
    
   },
  
  ], {
    useNativeDriver:true
   })

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
  

    const handleConfirm = ({type},selectedDate) => {
      setOpen(false);

      if(type==='set'){
        const currentDate=selectedDate
                setDate(currentDate)
                if (Platform.OS === 'android') {
                   toggleDatepicker();
                    setDate(currentDate.toDateString())
                  
                  
                  }
      }else{
        toggleDatepicker()
      }
      

    };
   
    const renderItem=({item,index})=>{
      

      return(
          <View style={{flex:1,margin:5}}>
               <TouchableOpacity onPress={()=>{setDialog(1);setIndex(index)}}><Image source={{uri:item}}  style={{
          flex:1,
          transform:[{scale:1}],
          width:100,
          height:120}}/>
         </TouchableOpacity>
          </View>
      )
    }


  const saveData=(e)=>{
      e.preventDefault()
    
    if(data.status==='Ongoing'){
        
    const formdata = new FormData()
           
      images.forEach(image=>{formdata.append('afterImage',{
        uri:image,
        name: 'afterImage',
        type: ' image/jpeg',
      })})
      
      formdata.append('jobid',data._id)
      formdata.append('date_comp',date)
      formdata.append('status',status)
      formdata.append('notes',notes)
      
   
     
    const url=''+conn+'/updatecompletejob'

    axios.put(url,formdata,{
      headers:{
        Accept:'application/json',
        'Content-Type':'multipart/form-data',
       
      }
    })
    .then(res=>{
      if(res.data)
      alert('Job updated')

    }).catch(err=>console.log('Problem'+err))

    router.push(href='/dashboard')
    
    }else{
        const info={
        jobid:data._id,
        start_date:date,
        status:status
      }
       const url=''+conn+'/updatejob'

     
    axios.put(url,info)
    .then(res=>{
      console.log(res.data)
    }).catch(err=>console.log(err))

     router.push(href='/dashboard')
    

      }
  }
     

   

    useEffect(()=>{
    //pull data from db with the given ID

   
    const url= ''+conn+'/getjob/'+id

    axios.get(url).
    then(res=>{
     setData(res.data)
  
    }).catch(err=>console.log('Error happened'+err))

   },[])



  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
    <View style={{backgroundColor:'#E9E4f0',width:360,height:50,borderRadius:5,alignItems:'center',padding:10,}}><Text style={styles.title}>Job Details</Text></View>
    <LinearGradient colors={['#7f7fD5', '#E9E4f0']} style={styles.linearGradient}>
      {data&&<View style={{gap:1,marginBottom:5}}>
        <Text style={styles.textstyle}>Title:     {data.jobtitle}</Text>
        <Text style={styles.textstyle}>Client:  {data.clientname}</Text>
        <Text style={styles.textstyle}>Tel:        {data.phone}</Text>
        <Text style={styles.textstyle}>Status: {data.status}</Text>

      </View>}
      {data&&<View>
        <Text style={{color:'black',fontSize:18,fontWeight:600}}>{data&&data.status==='Ongoing'?'Notes:':'Description:'}</Text>
        <TextInput  multiline={true}  numberOfLines={10} style={styles.textarea}   scrollEnabled={true}   defaultValue={data.status==='Ongoing'?'':data.description} onChangeText={setNotes}/></View>}
      <View>
        <Text style={{color:'black',fontSize:18,fontWeight:600}}>{data&&data.status==='Ongoing'?"After Images":"Images"}</Text>
      </View>
     
     {data&&data.status!=='Ongoing'&&<FlatList data={data.beforeImage} renderItem={renderItem} numColumns={3} style={{margin:7}} contentContainerStyle={{borderColor:'#ccc',borderWidth:1,borderRadius:5}}/>}

     {data&&data.status==='Ongoing'&& <View style={{height:180}}>
    
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
    
  
    </View>}
      <View style={{alignItems:'center',justifyContent:'center'}}>
        <Modal visible={dialog!==null} animationType='slide'onRequestClose={() => {
         
          setDialog(null);
        }} style={{alignItems:'center',justifyContent:'center'}}>
        
      <PinchGestureHandler onGestureEvent={onZoomEventFunction} >

      <Animated.Image source={dialog!==null?{uri:data.beforeImage[idx]}:null}  resizeMode="contain" style={{
        flex:1,
        marginLeft:30,
        transform:[{scale}],
        width:300, height:420}}/>

      </PinchGestureHandler>

      </Modal></View>
      <View style={{marginBottom:10}}>
      <Text style={styles.textstyle}>{data&&data.status==='Ongoing'?'Completion date:':'Start Date'}</Text>
      <TouchableOpacity onPress={()=>setOpen(true)}><TextInput style={styles.input}  editable={false} value={date.toDateString()}></TextInput></TouchableOpacity>
      {open&&<DateTimePicker value={new Date()} minimumDate={new Date()} onChange={handleConfirm}/>}
      
      </View>
      <View><Text style={styles.textstyle}>Update Status:</Text></View>
      <View style={{paddingLeft:5,marginBottom:10,borderWidth: 1,
      borderColor:'#EEECE6',borderRadius: 10,height:50,justifyContent:'center'}}>
        <Picker    style={{height:30}}selectedValue={status}  fontSize={12} color={'#ccc'} onValueChange={(itemValue) =>
        setStatus(itemValue)
   
    }>
    <Picker.Item label="Ongoing" value="Ongoing" />
    <Picker.Item label="Complete" value="Complete" />
    
    </Picker></View>
    <View style={{ alignItems:'center',width:300}}><TouchableOpacity onPress={saveData} style={styles.loginButton}><Text style={styles.loginText}>Save</Text>
    </TouchableOpacity>
    </View>        

      </LinearGradient>
    </View>
    
    </SafeAreaView>
    
  )
}

export default JobDetails

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        
    
    },
    title:{
      color: '#7851A9',
      
      fontSize:20,
      fontWeight:'700'
      
            
    },
    linearGradient: {
           
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
    input: {
        height: 40,
        
        borderWidth: 1,
        borderRadius:5,
        padding: 10,
        borderColor:'#EEECE6',
        color:'black',
        borderRadius: 5,
        pointerEvents:"none"

      },
      textarea:{
        height:100,
        width:300,
        marginTop:10,
        borderWidth: 1,
        borderRadius:5,
        padding: 10,
        textAlignVertical: 'top',
        borderColor:'#ccc'
    
      },
      textstyle:{
        color:'black',
        fontSize:17,
        fontWeight:'600'
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