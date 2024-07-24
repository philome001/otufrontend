import { StyleSheet, Text, View ,Pressable, ScrollView,Image, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native'
import { useState,useEffect } from 'react'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'

const imgDir= FileSystem.documentDirectory+'images/'

const ensureDirExists=async()=>{
    const dirInfo = await FileSystem.getInfoAsync(imgDir)

    if(!dirInfo.exists){
        await FileSystem.makeDirectoryAsync(imgDir,{intermediates:true})
    }

}

const UploadImage = () => {
    
    const [images,setImages]=useState([])
    const [useLibrary,setUseLibrary]=useState(true)
    const [loading,setLoading]=useState(false)
    
    
    
    
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
            
            saveImage(result.assets[0].uri)

        }

    }
    const saveImage = async(uri)=>{
        await ensureDirExists()
        if(images.length<3){
            const filename= new Date().getTime()+'.jpg'
        const dest= imgDir+filename
        await FileSystem.copyAsync({from: uri, to:dest})
        setImages([...images,dest])

        }else{
            alert('Max has been reached!')
        }

        


    }
    const loadImages=async()=>{
        await ensureDirExists();
        const files= await FileSystem.readDirectoryAsync(imgDir)
        if(files.length>0){
            setImages(files.map(f=>imgDir+f))
        }
    }
    const deleteImage=async(uri)=>{
        await FileSystem.deleteAsync(uri)
        setImages(images.filter(i=>i!==uri))

    }
    const renderItem=({item})=>{
    
        return(
            <View style={{flex:1,margin:5}}>
                <TouchableOpacity onPress={()=>{deleteImage(item)}}><Image source={{uri:item}} style={{width:100,height:100}}/></TouchableOpacity>
            </View>
        )
    }

    useEffect(()=>{
        loadImages()

    },[])
  return (
    
    <View>
        <FlatList data={images} renderItem={renderItem} numColumns={3} style={{margin:7}}/>
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
  )
}

export default UploadImage

const styles = StyleSheet.create({
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