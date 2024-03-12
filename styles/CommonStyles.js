import { StyleSheet, Text, View } from 'react-native'

const CommonStyles = StyleSheet.create({
    //color
    fontPurple: "rgb(60,61,132)",
    purpleLightColor: "rgb(154,150,221)",
    
    //background color
    purpleDark: {
        backgroundColor: "rgb(60,61,132)",
    },

    purpleMedium: {
        backgroundColor: "rgb(127,123,189)",
    },

    purpleLight: {
        backgroundColor: "rgb(154,150,221)",
    },

    fontGrey: {
        color:'dimgrey',
    },

    container: {
        flex:1,
        backgroundColor:"rgb(127,123,189)",
        alignItems:'center',
        justifyContent:'center',
    },

    //container used in add an activity, 
    //all and special activities screen
    container2: {
        flex: 1,
        flexDirection:'row',
        backgroundColor:"rgb(127,123,189)",
        justifyItem:'start',
        justifyContent:'center',
    },

    contentContainer: {
        width: '90%'
    },

    startMargin: {
        width: '98%',
    },

    buttonsContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-evenly',
    },

    inputBox: {
        width:'100%',
        height: 35,
        backgroundColor:"rgb(154,150,221)",
        borderColor:"rgb(60,61,132)",
        borderWidth:1,
        borderRadius:4,
        marginBottom:'2%',
    },

    inputHeader:{
        fontSize:15,
        alignSelf:'flex-start',
        color:"rgb(60,61,132)",
        fontWeight:'bold',
        marginBottom:'2%'
    },

    regularFont:{
        fontSize:18,
        alignSelf:'flex-start',
        color:"rgb(60,61,132)",
    },

    buttonFont:{
        color: 'white',
        fontSize:15,
        fontWeight:'bold',
        alignSelf:'center',
    },

    cancelButton:{
        backgroundColor:'maroon',
        width: 125,
        height: 35,
        borderRadius:5,
        justifyContent:'center',
    },

    confirmButton:{
        backgroundColor:"rgb(60,61,132)",
        width: 125,
        height: 35,
        borderRadius:5,
        justifyContent:'center',
    },


    boxFont:{
        fontSize:13,
        alignSelf:'flex-start',
        color:"white",
        fontWeight:'bold',
    },

    boxFont2:{
        fontSize:13,
        color:"rgb(60,61,132)",
        backgroundColor:'white',
        fontWeight:'bold',
    },

    card: {
        backgroundColor: "rgb(60,61,132)",
        width:'100%',
        height: 40,
        borderRadius:5,
        justifyContent: 'center',
        shadowRadius:3,
        shadowOpacity: 0.2,
        marginTop:'5%',
    },

    directionRow: {
        flexDirection: "row",
      },

})

export default CommonStyles;