import React from "react";
import { PixelRatio, StyleSheet, Text, View, Pressable, FlatList, Alert } from "react-native";
import { connect } from "react-redux";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Bottombar from "./bottombar";

const iconSize = 26 * PixelRatio.getFontScale();  

  function mycollect ({ props_Colorful, props_ColorText, props_ShowFace }) {
    let uid = getAuth().currentUser.uid;
    const ref = collection(db, "post");
    const postRef = query(ref, where("likeBy", "array-contains", uid));
    const [ userPost, setUserPost ] = React.useState([]);
    const [ loading, setLoading ] =  React.useState(true);
        
        React.useEffect(() => {
          return onSnapshot( postRef, (querySnapshot) => {
            let list = [];
            querySnapshot.forEach(doc => {
              const { comments, like, likeby, saying  ,unlike, who } = doc.data();
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
           if(inhalt.length) Alert.alert("",inhalt);
        };
       
        
      
        const _renderItemList = ({item, index}) => {
          return (
            <Pressable onPress={() => _pressSaying(item.comments)}>
             <View style={[styles.saying, {backgroundColor: props_Colorful }]}>
             <Text style={[ styles.mainText, {color: props_ColorText} ]}>{item.saying}</Text>
             { props_ShowFace &&
             <View style={{flexDirection: "row", justifyContent: 'flex-end', alignItems: "center"}}>
             <MaterialIcons name="tag-faces" size={iconSize} color={props_ColorText}/>
             <Text style={[ styles.mainText, {color: props_ColorText} ]}>
             {item.like}
             </Text>
             <MaterialIcons name="mood-bad" size={iconSize} color={props_ColorText}/>
             <Text style={[ styles.mainText, {color: props_ColorText} ]}>
             {item.unlike}    
             </Text>
              </View>   
             }        
             </View>
            </Pressable>
          )}
    return(
        
        <View style={[styles.container, { backgroundColor: "white",}]}>
      <FlatList data={userPost}   
                  renderItem={_renderItemList}
                  keyExtractor={item => item.id.toString()} />

        <Bottombar/>
        </View>

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
    flex: 1,
    justifyContent: 'flex-end',
    },
    saying: {
        flexDirection: "column", 
        backgroundColor:"white", 
        margin: 5, 
        paddingTop: 8, 
        paddingBottom: 8, 
        paddingLeft: 15, 
        paddingRight: 15,
        borderRadius: 10,
      },
      mainText: {
        fontSize: 16 * PixelRatio.getFontScale(),
      }
  });

  const mapStateToProps = (state) => {
    return {
       props_Colorful : state.self.colorful, 
       props_ColorText : state.self.colorText, 
       props_ShowFace : state.self.showFace, 

    }
  }
  
  const mapDispatchToProps = {};
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(mycollect);
  