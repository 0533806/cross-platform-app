import React from "react";
import { PixelRatio, StyleSheet, Text, View, Pressable, FlatList, Alert } from "react-native";
import { connect } from "react-redux";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Bottombar from "./bottombar";
import SayingText from "./components/sayingText";


function mycollect({ }) {
  let uid = getAuth().currentUser.uid;
  const ref = collection(db, "post");
  const postRef = query(ref, where("likeBy", "array-contains", uid));
  const [userPost, setUserPost] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    return onSnapshot(postRef, (querySnapshot) => {
      let list = [];
      querySnapshot.forEach(doc => {
        const { comments, like, likeby, saying, unlike, who } = doc.data();
        list.push({
          id: doc.id,
          comments,
          saying,
          like,
          unlike,

        });
      });
      setUserPost(list);
      if (loading) {
        setLoading(false);
      }
    });
  }, []);
  if (loading) return null;

  const _pressSaying = (inhalt) => {
    if (inhalt.length) Alert.alert("", inhalt);
  };
  const _renderItemList = ({ item, index }) => {
    return (
      <SayingText
        onPress={() => _pressSaying(item.comments)}
        like={item.like}
        unlike={item.unlike}
      >
        {item.saying}
      </SayingText>
    )
  }
  return (
    <View style={[styles.container, { backgroundColor: "white", }]}>
      <FlatList data={userPost}
        renderItem={_renderItemList}
        keyExtractor={item => item.id.toString()} />
      <Bottombar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
)(mycollect);
