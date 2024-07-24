import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity,Pressable } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'

const ClientDash = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
      <LinearGradient colors={['#7f7fD5', '#E9E4f0']} style={styles.linearGradient}>
        <View>
          
           <TouchableOpacity onPress={()=>{router.push(href='/services')}} style={styles.itemcard}><View style={styles.cardcontent}><Text style={styles.textcontent}>Request Service</Text></View></TouchableOpacity>
          
           <TouchableOpacity onPress={()=>{router.push(href='/clientgallery')}}style={styles.itemcard}><View style={styles.cardcontent}><Text style={styles.textcontent}>View Gallery</Text></View></TouchableOpacity>
          
           <TouchableOpacity onPress={()=>alert('Review')} style={styles.itemcard}><View style={styles.cardcontent}><Text style={styles.textcontent}>Post a Review</Text></View></TouchableOpacity>
          
           <TouchableOpacity onPress={()=>alert('Account Settings')} style={styles.itemcard}><View style={styles.cardcontent}><Text style={styles.textcontent}>My Account</Text></View></TouchableOpacity>
          
           
        </View>
        
     
      </LinearGradient>
      </View>
      </SafeAreaView>
   
  )
}

export default ClientDash

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
      
     
  },
  linearGradient: {
       
    flex: 1,
    paddingLeft: 5,
    width:320,
    paddingRight: 5,
    borderRadius: 5,
  
  },
  cardcontent:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'

  },
  textcontent:{
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 32,
    color: 'white'
  },

    itemcard:{
        padding:20,
        backgroundColor:'#AD40AF',
        borderRadius: 15,
        justifyContent: 'space-between',
        alignItems:'center',
        shadowColor: 'grey',
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        
        margin:10,
        width:285,
        height:130

},
})