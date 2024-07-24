import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import moment  from 'moment';
import {conn} from '../conn/conn'
import axios from 'axios'



const Ongoing = () => {
  const[data1,setData]=useState()
  const [username,setUsername]=useState()
 

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
 


      useEffect(() => {
      
        const url=''+conn+'/getalljobs';
         axios.get(url)
         .then(res=>{
          const sortedItems = res.data.sort((a, b) => {
          
            return b.date_started - a.date_started;
          });

          newitems=sortedItems.filter(item=>item.status==='Ongoing')
         
           
           setData(newitems)

          
          
          
          })
         .catch(error=>console.log("Error happened: " +error))


        
        }, [data1])
        

  return (
                  
    <View style={styles.container}>
    <LinearGradient colors={['#7f7fD5', '#E9E4f0']} style={styles.linearGradient}>
   
    <FlatList
      data={data1}
      keyExtractor={(item) => item._id}
      style={{
        flexGrow:0
      }}
   
      ItemSeparatorComponent={myItemSeparator}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) =>
      <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-evenly',padding:5,marginBottom:10}}>
      <View style={{width:200,height:120,padding:5}}>
      <Text style={{color:'black',fontSize:14,fontWeight:600}}>Client Name: {item.clientname}</Text>
      <Text style={{color:'black',fontSize:14,fontWeight:600}}>Address:{item.address}</Text>
      <Text style={{color:'black',fontSize:14,fontWeight:600}}>Job Title:{item.jobtitle}</Text>
      <Text style={{color:'black',fontSize:14,fontWeight:600}}>Phone:{item.phone}</Text>
      <Text style={{color:'black',fontSize:14,fontWeight:600}}>Start Date:{moment(item.date_started).format('YYYY-MM-DD')}</Text>
       <TouchableOpacity ><Text style={{color:'#AD40AF', fontWeight:'700'}} onPress={()=>router.push(href=`jobdetails?id=${item._id}`)}>Update Progress</Text></TouchableOpacity>
      </View>
      <View style={{width:100,height:120}}><Image source={{uri:item.beforeImage[0]}}  resizeMode="contain" style={{
          flex:1,
          width:100,
          height:120}}/></View>
      </View>
      
    
    }
    />
    </LinearGradient>
    </View>
   
   
   
    
  )
}

export default Ongoing

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
  
  },
   
})