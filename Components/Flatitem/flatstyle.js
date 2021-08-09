import { StyleSheet } from 'react-native'
const style=StyleSheet.create({
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
export default style;