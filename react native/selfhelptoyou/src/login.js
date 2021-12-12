import React from "react";
import { StyleSheet, View, StatusBar, TextInput, Image, PixelRatio, Alert } from "react-native";
import { connect } from "react-redux";
import myIcon from "../assets/icon.png"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import SignButton from "./components/signButton";

function Login({ navigation }) {
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const login = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, account, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("錯誤", "帳號密碼錯誤");
      });
  }
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        translucent={false}
        backgroundColor={'#941925'}
        hidden={false} />
      <View style={styles.logo}>
        <Image source={myIcon} style={{ height: 150, width: 150, borderRadius: 75 }} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="帳號"
        onChangeText={setAccount}
        value={account}
      />
      <TextInput
        style={styles.input}
        placeholder="密碼"
        onChangeText={setPassword}
        secureTextEntry={true}
        value={password}
      />
      <SignButton onPress={login} >
        登入
      </SignButton>
      <SignButton onPress={() => navigation.navigate("Signup")} option={false}>
        註冊
      </SignButton>
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
  logo: {
    alignItems: 'center',
    padding: 30,
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
)(Login);
