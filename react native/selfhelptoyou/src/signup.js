import React from "react";
import { StyleSheet, Text, View, Pressable, TextInput, Alert, PixelRatio } from "react-native";
import { connect } from "react-redux";
import { createAccount } from "../firebase";



  function signup ({  }) {
    const [new_Account, setNew_Account] = React.useState("");
    const [new_Password, setNew_Password] = React.useState("");
    const [check_Password, setCheck_Password] = React.useState("");

    const _checkPassword = () => {
      if(new_Password.length<8) Alert.alert("密碼低於8字。");
      else if(new_Password===check_Password) createAccount(new_Account, new_Password);
      else Alert.alert("密碼不一致，請再次確認。");
    }

    return(
        
        <View style={styles.container}>
         <TextInput
        style={styles.input}
        onChangeText={setNew_Account}
        placeholder="信箱"
        value={new_Account}
        />
        <TextInput
        style={styles.input}
        onChangeText={setNew_Password}
        placeholder="密碼"
        secureTextEntry={true}
        value={new_Password}
        />
        <TextInput
        style={styles.input}
        onChangeText={setCheck_Password}
        placeholder="再次輸入密碼"
        secureTextEntry={true}
        value={check_Password}
        />
        <Pressable onPress={ _checkPassword } >
        <Text style={styles.buttom}>
        註冊 
        </Text>    
        </Pressable>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#F0F0F0",   
        justifyContent: 'center',
      },
    input: {
      height: 12 * PixelRatio.getFontScale() + 40,
      borderWidth: 1,
      fontSize: 12 * PixelRatio.getFontScale(),
      margin: 10,
      padding: 10,
        backgroundColor: 'white',
    },
    buttom: {
      borderColor: '#0f4c81',
      borderWidth: 2,
      textAlign: 'center',
      fontSize: 20,
      margin: 10,
      backgroundColor: '#0f4c81',
      color: 'white',
 },
    
  });

  const mapStateToProps = (state) => {
    return {
     

    }
  }
  
  const mapDispatchToProps = {};
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(signup);
  