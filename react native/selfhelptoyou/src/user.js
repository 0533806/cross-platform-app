import React from "react";
import { PixelRatio, StyleSheet, Text, View, Pressable, FlatList, Alert, TextInput, Button, Modal, Dimensions, Image, StatusBar, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createPost, db, storage } from "../firebase";
import { getAuth } from "firebase/auth";
import { getDownloadURL } from "firebase/storage";
import { collection, query, where, doc, onSnapshot, getDocs } from "firebase/firestore";
import { ref, getMetadata } from "firebase/storage";
import Myword from "./myword";
import Mycollect from "./mycollect";

const size = 1.3;

function user({ navigation, props_Colorful, props_ShowImage, props_ColorText }) {
  const [mode, setMode] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [title, setTitle] = React.useState("創作");
  const [backgroundImage, setBackgroundImage] = React.useState('selfhelptoyou.appspot.com/2.JPG');

  React.useEffect(() => {
    let today = new Date().getDay();

    today = today.toString() + ".JPG"
    const imageRef = ref(storage, today);
    getDownloadURL(imageRef)
      .then((url) => {
        setBackgroundImage(url);
      })
      .catch((error) => {
        console.log(error);
      });
    if (loading) setLoading(false);
  }, [])


  if (loading) return null;

  const _changeMode = () => {
    setMode(!mode)
    if (mode) setTitle('收藏');
    else setTitle('創作');
  }

  return (

    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={props_Colorful} />
      {props_ShowImage &&
        <Image source={{ uri: backgroundImage }}
          style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 8 }} />
      }
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: "center", }}>
        <Pressable onPress={() => navigation.navigate('Visiter')}>
          <MaterialIcons name="explore" size={30 * size} />
        </Pressable>
        <Pressable onPress={_changeMode}>
          <Text style={{ fontSize: 22 * size }}>{title}</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Setting')}>
          <MaterialIcons name="settings" size={30 * size} />
        </Pressable>
      </View>
      {mode && <Myword />}
      {!mode && <Mycollect />}
    </SafeAreaView>

  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',

  },
  bottomContainer: {
    justifyContent: 'flex-end',
  },
});

const mapStateToProps = (state) => {
  return {
    props_Colorful: state.self.colorful,
    props_ShowImage: state.self.showImage,
    props_ColorText: state.self.colorText,
  }
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(user);

