import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image,Animated,Modal} from 'react-native'
import React,{useState,useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import moment  from 'moment';
import {conn} from '../conn/conn'

import axios from 'axios'



const Completed = () => {
  const[data1,setData]=useState()
  const [username,setUsername]=useState()
  const [dialog,setDialog]=useState(null)
  const [images,setImages]=useState()
 

    const myItemSeparator = () => {
        return (
          <View style={{flexDirection:'column'}}> 
         
          <View style={{ height: 1, backgroundColor: "gray", marginVertical:10,margin:5 }}></View>
         
          
          </View>
        );
      };

      const priorityMapping = {
        0: 'Not Urgent',
        1: 'Urgent',
        2: 'Very Urgent'
      };
      
      // Function to get priority text
      const getPriorityText = (priority) => {
        return priorityMapping[priority] || 'Unknown Priority';
      };
 
      const openDialog=()=>{
       
        setDialog(1)
       
      }
      const renderItem=({item})=>{
      

        return(
            <View style={{flex:1,margin:5}}>
            <Image source={{uri:item}}  style={{
            flex:1,
            transform:[{scale:1}],
            width:300,
            height:150}}/>
          
            </View>
        )
      }

      useEffect(() => {
      
        const url=''+conn+'/getalljobs';
       
         axios.get(url)
         .then(res=>{
          const sortedItems = res.data.sort((a, b) => {
          
            return b.date_completed - a.date_completed;
          });

          newitems=sortedItems.filter(item=>item.status==='Complete')
         
          if(Object.keys(newitems).length===0){
            alert('No complete jobs')
            //return
          }else{
              setData(newitems)
            
             newitems.forEach(i=>setImages(i.afterImage))
             
            
             

          }
         
          
          
          
          })
         .catch(error=>console.log("Error happened: " +error))


        
        }, [data1])
        

  return (
                  
    <View style={styles.container}>
    <LinearGradient colors={['#7f7fD5', '#E9E4f0']} style={styles.linearGradient}>
   
    <FlatList
      data={data1}
      //keyExtractor={(item) => item.afterImage}
      style={{
        flexGrow:0
      }}
   
      ItemSeparatorComponent={myItemSeparator}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) =>
      <View style={{flexDirection:'row', alignItems:'left',padding:5,marginBottom:10}}>
      <View style={{width:200,height:120,padding:5}}>
      <Text style={{color:'black',fontSize:14,fontWeight:600}}>Client Name: {item.clientname}</Text>
      <Text style={{color:'black',fontSize:14,fontWeight:600}}>Address:{item.address}</Text>
      <Text style={{color:'black',fontSize:14,fontWeight:600}}>Job Title:{item.jobtitle}</Text>
      <Text style={{color:'black',fontSize:14,fontWeight:600}}>Phone:{item.phone}</Text>
      <Text style={{color:'black',fontSize:14,fontWeight:600}}>Completion Date:{moment(item.date_comp).format('YYYY-MM-DD')}</Text>
       <TouchableOpacity ><Text style={{color:'#AD40AF', fontWeight:'700'}} onPress={openDialog}>View Gallery</Text></TouchableOpacity>
      </View>
     
      </View>
      
      
    
    }
    />
    </LinearGradient>
    <View style={{marginTop:10}}>
        <Modal visible={dialog!==null} animationType='slide'onRequestClose={() => {
         
         setDialog(null);
       }} style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      {data1&&<View><FlatList
        data={images}
        style={{
          flexGrow:0
        }}
     
        ItemSeparatorComponent={myItemSeparator}
        showsVerticalScrollIndicator={true}
        renderItem={renderItem}
      
      
      /></View>}


    
       
      </Modal></View>
    </View>
   
   
   
    
  )
}

export default Completed

const styles = StyleSheet.create({
  container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
      
        
        

  },
  linearGradient: {
       
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    width:320
  
  },
   
})