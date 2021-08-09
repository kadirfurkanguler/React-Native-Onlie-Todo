/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

//npx react-native run-android
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Flatitem from './Components/Flatitem/Flatitem';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  useColorScheme,
  Button,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;
function App (){
  const [title, setTitle] = useState('')
  const [data, setData] = useState([])
  async function getTodo (){
    let arr=[];
    try {
      await axios.get('')
      .then(res=>{
        console.log(res)
        for (const item in res.data.data) {
        arr.push({...res.data.data[item]})
        }
        setData(arr.reverse())
        //this.setState({data:arr.reverse()})
      })
    } catch (error) {
      alert(error);
    }
  }
  function editTodo(item){
    const params= new URLSearchParams()
    params.append('id',item.id)
    params.append('isDone',item.isDone==0?1:0)
    const config={
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }
  
    axios.post('', params,config)
    .then(async(res)=>{
      await getTodo();
    })
  }
  function deleteTodo(id){
    const params= new URLSearchParams()
    params.append('id',id)
    const config={
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }
    axios.post('', params,config)
    .then(async(res)=>{
      //console.log(res)
      await getTodo();
    })
  }
  const handleSave=async ()=>{
      const params= new URLSearchParams()
      params.append('title',title)
      const config={
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }
      axios.post('', params,config)
      .then(async(res)=>{
        await getTodo()
        .then(res=>{
          setTitle('')
        })
      })
     }
  handleKeyDown= function(e) {
      //console.log(e.nativeEvent.key)
  }
  
  useEffect(() => {
    getTodo();
  }, [])
    return(
      <SafeAreaView style={style.container}>
        <ScrollView >
        <View style={style.header}>
          <Text style={style.headerText} numberOfLines={1}>ToDo Application | {today}</Text>
        </View>
        <View style={style.newTodo}>
          <TextInput onKeyPress={handleKeyDown} placeholderTextColor={'white'} placeholderStyle={style.place} placeholder={'Type here'} value={title} onChangeText={(val)=>{setTitle(val)}} style={style.newInput} />
            <TouchableOpacity onPress={()=>handleSave()}  style={style.newBtn} >
              <Text style={style.btnText} numberOfLines={1}>Add New</Text>
            </TouchableOpacity>
        </View>
          </ScrollView>
        <View style={style.listContainer}>
          <FlatList
          contentContainerStyle={{}}
          data={data}
          keyExtractor={(item) => item.id}
              renderItem={({ item }) =><Flatitem item={item} editTodo={editTodo} deleteTodo={deleteTodo} /> }/>
        </View>
      </SafeAreaView>
    )
}

const style=StyleSheet.create({
  container:{
    backgroundColor:'#4044c9',
    flex:1
  },
  header:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  headerText:{
    color:'white',
    fontSize:20,
    fontWeight:'bold'
  },
  newTodo:{
    flex:2,
    flexDirection:'row',
  },
  newInput:{
    marginLeft:15,
    marginRight:25,
    marginVertical:40,
    flex:1,
    borderRadius:25,
  },
  place:{
    color:'white',
    fontSize:25,
    fontWeight:'bold'
  },
  newBtn:{
    paddingHorizontal:15,
    marginRight:20,
    marginVertical:40,
    borderRadius:25,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center'
  },
  btnText:{
    color:'#4044c9',
    fontSize:25,
  },
  listContainer:{
    flex:8,
    backgroundColor:'white',
    borderTopLeftRadius:65,
    paddingTop:50,
    paddingLeft:25,
  },
})
export default App;