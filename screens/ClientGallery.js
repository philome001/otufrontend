import { Text, StyleSheet, View } from 'react-native'
import React, { useEffect,useState } from 'react'
import { conn } from '../conn/conn'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export default ClientGallery=()=> {
    const [data,setdata]=useState()
    const [clientid,setClientid]=useState()


    useEffect(()=>{
        AsyncStorage.getItem('user').then((item) => {
            const val=JSON.parse(item)
          
           setClientid(val._id)
           console.log(val._id)
        const url = ''+conn+'/getjob/'+val._id
        axios.get(url)
        .then(res=>{
            console.log(res.data)
        }).catch(err=>console.log(err))

    })
    },[])
 

    

    return (
      <View>
        <Text>ClientGallery</Text>
      </View>
    )
  
}

const styles = StyleSheet.create({

})