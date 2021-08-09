import React from 'react'
import { View,TouchableOpacity,Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import style from './flatstyle'
function flatitem({item,deleteTodo,editTodo}){
  const isDone=function(isDone){
    if(isDone==1){
      return({
        backgroundColor:'green',
      })
    }
    else{
      return null
    }
  }
    return(
        <View style={{...style.itemBox,...isDone(item.isDone)}}>
              <View style={style.txtBox}>
                <Text style={style.listItem}>{item.id}|{item.title}</Text>
              </View>
              <View style={style.icons}>
                <TouchableOpacity onPress={() => deleteTodo(item.id)}  style={style.delBtn} >
                    <Icon size={20} color={'red'} name={'trash-alt'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editTodo(item)}  style={style.delBtn} >
                  <Icon size={20} color={item.isDone==1?'red':'green'} name={item.isDone==1?'times':'check-circle'} />
                </TouchableOpacity>
              </View>
            </View>
    )
}
export default flatitem;