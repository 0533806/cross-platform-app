import React from "react";
import { PixelRatio, StyleSheet, Text, View, Pressable, FlatList, Alert, Animated, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getAuth } from "firebase/auth";
import { db, likePost, unlikePost, sosoPost } from "../firebase";
import { collection, query, where, doc, getDocs, getDoc } from "firebase/firestore";

const iconSize = 33 * PixelRatio.getFontScale();
function login({ props_Colorful, props_ColorText, navigation }) {
  const [loading, setLoading] = React.useState(true);
  const [book, setBook] = React.useState([]);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  let uid = getAuth().currentUser.uid;
  const ref = collection(db, "post");
  const userRef = doc(db, "user", uid);

  React.useEffect(() => {
    go();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true
    }).start();
  }, []);

  async function go() {
    const docSnap = await getDoc(userRef);
    let copy = docSnap.data().seen;
    const allRef = query(ref, where("who", "!=", uid));
    const querySnapshot = await getDocs(allRef);
    let items = [];
    querySnapshot.forEach(doc => {
      const { comments, like, likeby, saying, unlike, who } = doc.data();
      let temp = {
        id: doc.id,
        saying,
        comments,
      }
      if (!copy.includes(doc.id) && items.length < 20) items.push(temp);
    });
    setBook(items);
    if (loading) setLoading(false);
  };

  if (loading) return null;

  const _likePost = (id, index) => {
    likePost(id);
    bookSet(index);
  }
  const _unlikePost = (id, index) => {
    unlikePost(id);
    bookSet(index);
  }
  const _sosoPost = (id, index) => {
    sosoPost(id);
    bookSet(index);
  }

  const bookSet = index => {
    let newData = [...book];
    newData.splice(index, 1);
    setBook(newData);
  }

  const _listEmptyComponent = () => {
    return (
      <View style={{ alignSelf: 'center', padding: 20 }}>
        <Text>
          Oops!目前沒有新的語錄喔。
        </Text>
      </View>
    )
  }

  const _renderItemList = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={() => _pressWholePost(item.comments)}>
        <Animated.View style={[styles.saying, { opacity: fadeAnim, backgroundColor: props_Colorful }]}>
          <Text style={[styles.mainText, { color: props_ColorText }]}>-{item.saying}</Text>
          <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
            <Pressable onPress={() => _likePost(item.id, index)}>
              <MaterialIcons name="tag-faces" size={iconSize} color={'green'} />
            </Pressable>
            <Pressable onPress={() => _sosoPost(item.id, index)}>
              <MaterialIcons name="sentiment-neutral" size={iconSize} color={'#696969'} />
            </Pressable>
            <Pressable onPress={() => _unlikePost(item.id, index)}>
              <MaterialIcons name="mood-bad" size={iconSize} color={'red'} />
            </Pressable>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }

  const _pressWholePost = inhalt => {
    if (inhalt) Alert.alert("", inhalt);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.everyRow}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialIcons name='arrow-forward' size={33} />
        </Pressable>
      </View>
      <FlatList data={book}
        renderItem={_renderItemList}
        ListEmptyComponent={_listEmptyComponent}
        keyExtractor={item => item.id.toString()} />
      <View style={styles.bottomContainer}>
        <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
          <Pressable onPress={go}>
            <MaterialIcons name='loop' size={50} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  saying: {
    flexDirection: "column",
    margin: 5,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
  },
  mainText: {
    fontSize: 16 * PixelRatio.getFontScale(),
  },
  bottomContainer: {
    justifyContent: 'flex-end',
  },
  everyRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 14,
    alignItems: "center",
  },


});

const mapStateToProps = (state) => {
  return {
    props_Colorful: state.self.colorful,
    props_ColorText: state.self.colorText,
  }
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(login);
