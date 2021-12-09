import React from "react";
import { PixelRatio, StyleSheet, Text, View, Pressable, FlatList, Alert } from "react-native";
import { connect } from "react-redux";
import { db } from "../firebase";
import { collection, query, where, doc, onSnapshot, getDocs, getDoc } from "firebase/firestore";
import { OKPost, postChecked } from "../firebase";


  function manager ({ navigation }) {
   
    const ref = collection(db, "temp");
    const postRef = query(ref, where("checked", "==", false));
    const arrayRef = doc(db, "boss", "inhalt");

    const [ userPost, setUserPost ] = React.useState([]);
    const [ loading, setLoading ] =  React.useState(true);
   
    

       
        
        React.useEffect(() => {
          return onSnapshot( postRef, (querySnapshot) => {
            let list = [];
            querySnapshot.forEach(doc => {
              const { comments, saying, email, who} = doc.data();
              list.push({
                id: doc.id,
                comments,
                saying,
                email,
                who,
              });
            });
            setUserPost(list);
            if (loading) setLoading(false);
            
          });
        }, []);
        if (loading) return null; 
        
    
        
      
        const _renderItemList = ({item, index}) => {
          return (
             <View style={styles.saying }>
             <Text style={ styles.mainText }>{item.saying}</Text>
             <Text style={ styles.mainText }>{item.comments}</Text>
             <Text style={ styles.mainText }>{item.email}</Text>  
             <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
             <Pressable onPress={ () => _verifyPost(item.id, item, true)}>
             <Text>YES</Text> 
             </Pressable>
             <Pressable onPress={ () => _verifyPost(item.id, item, false)}>
             <Text>LEIDER NICHT</Text> 
             </Pressable>
             </View>
             </View>
          )}

        const _verifyPost = async ( id, item, b ) => {
            postChecked(id);
            const docSnap = await getDoc(arrayRef);
            if(docSnap.data().item.includes(item.saying)){
              Alert.alert("已經重複");
              return;
            }
            if(b===true) OKPost(item.saying, item.comments, item.who);
        };
      const _listEmptyComponent = () => {
        return (
          <View>
          <Text>
          內容空白。  
          </Text>  
          </View>
        )
      }
      
    return(
        
        <View style={[styles.container, { backgroundColor: "white",}]}>
        
 
      <FlatList data={userPost}   
                renderItem={_renderItemList}
                ListEmptyComponent={_listEmptyComponent}
                keyExtractor={item => item.id.toString()} />
                
      
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",   
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
  

    }
  }
  
  const mapDispatchToProps = {};
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(manager);
  