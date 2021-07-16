/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

//npx react-native run-android
import React, { Component } from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
export default class App extends Component{
  constructor(){
    super();
    this.state={
      text:'',
      data:[],
    }
  }
  componentDidMount(){
    this.getTodo();
  }
  getTodo= async()=>{
    let arr=[];
    try {
      await axios.get('https://rntodo-cf144-default-rtdb.firebaseio.com/list.json')
      .then(res=>{
        for (const item in res.data) {
          arr.push({id:item,...res.data[item]})
        }
        this.setState({data:arr.reverse()})
      })
    } catch (error) {
      alert(error);
    }
  }
  editTodo(item){
    axios.put('https://rntodo-cf144-default-rtdb.firebaseio.com/list/'+item.id+'.json',{isDone:!item.isDone,text:item.text})
    .then(async(res)=>{
      await this.getTodo();
      this.setState({text:''})
    })
  }
  deleteTodo(id){
    axios.delete('https://rntodo-cf144-default-rtdb.firebaseio.com/list/'+id+'.json')
    .then(res=>{
      this.getTodo();
    })
    console.log('https://rntodo-cf144-default-rtdb.firebaseio.com/list/'+id+'.json')

  }
  handleSave=async ()=>{
    const {text}=this.state
    await axios.post('https://rntodo-cf144-default-rtdb.firebaseio.com/list.json', { text,isDone:false })
    .then(res=>{
      //console.log(res)
      this.getTodo()
      this.setState({text:''})   
    })
 
    const params= new URLSearchParams()
    params.append('title',text)
    const config={
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }

    axios.post('https://furkan.pigasoft.com/api/v1/addTodo', params,config)
    .then(response => console.log(response));
   }
  isDone=function(isDone){
    if(isDone){
      return({
        backgroundColor:'green',
      })
    }
    else{
      return null
    }
  }
  render(){
    const {text}=this.state;
    return(
      <SafeAreaView style={style.container}>
        <ScrollView >
        <View style={style.header}>
          <Text style={style.headerText} numberOfLines={1}>ToDo Application | {today}</Text>
        </View>
        <View style={style.newTodo}>
          <TextInput placeholderTextColor={'white'} placeholderStyle={style.place} placeholder={'Type here'} value={text} onChangeText={(val)=>{this.setState({text:val})}} style={style.newInput} />
            <TouchableOpacity onPress={()=>this.handleSave()}  style={style.newBtn} >
              <Text style={style.btnText} numberOfLines={1}>Add New</Text>
            </TouchableOpacity>
        </View>
          </ScrollView>
        <View style={style.listContainer}>
          <FlatList
          contentContainerStyle={{}}
          data={this.state.data}
          keyExtractor={(item) => item.id}
              renderItem={({ item }) => 
              <View style={{...style.itemBox,...this.isDone(item.isDone)}}>
              <View style={style.txtBox}>
                <Text style={style.listItem}>{item.text}</Text>
              </View>
              <View style={style.icons}>
                <TouchableOpacity onPress={() => this.deleteTodo(item.id)}  style={style.delBtn} >
                    <Icon size={20} color={'red'} name={'trash-alt'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.editTodo(item)}  style={style.delBtn} >
                  <Icon size={20} color={item.isDone?'red':'green'} name={item.isDone?'times':'check-circle'} />
                </TouchableOpacity>
              </View>
            </View>
              }/>
        </View>
      </SafeAreaView>
    )
  }
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
  itemBox:{
    marginTop:20,
    backgroundColor:'#4044c9',
    paddingVertical:20,
    marginRight:20,
    borderRadius:25,
    paddingLeft:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight:25
  },
  listItem:{
    color:'white',
    flex:5
  },
  delBtn:{
    flex:1,
    backgroundColor:'white',
    borderRadius:10,
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center',
    paddingVertical:5,
    marginRight:5
  },
  icons:{
    flex:1,
    flexDirection:'row',
  },
  txtBox:{
    flex:4
  }

})