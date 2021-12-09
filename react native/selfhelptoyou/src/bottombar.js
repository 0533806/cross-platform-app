import React from "react";
import { PixelRatio, StyleSheet, View, Pressable, TextInput, Button, Modal, Dimensions } from "react-native";
import { connect } from "react-redux";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createPost, db } from "../firebase";

  function bottombar ({ props_Colorful }) {
    const [ modal, setModal] = React.useState(false);
    const [ saying, setSaying ] = React.useState("");
    const [ comments, setComments ] = React.useState("");
    const [ showComments, setShowComments ] = React.useState(false);
    React.useEffect(() => {
      setComments("");
      setSaying("");
      setShowComments(false);
    }, [modal]);
        const _post = () => {
          
          if(saying.length && showComments){
            createPost(saying, comments);
            setModal(false);
            setComments("");
            setSaying("");
            setShowComments(false);
          }
             if(saying.length) setShowComments(true);
        };

    return(
        <View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}>
        <View style={[styles.modalView, {borderTopLeftRadius: 2, borderTopRightRadius: 2, borderWidth: 0.5, backgroundColor: props_Colorful}]}>
        <View style={styles.modalInnerView}>
        <TextInput
        style={styles.input}
        onChangeText={setSaying}
        value={saying}
        placeholder="一句影響你的話。"
         />
        { showComments &&
        <TextInput
        style={styles.input}
        onChangeText={setComments}
        value={comments}
        placeholder="可選填，意思或是譯義"
         />
        }
        <Button
        title="提交"
        onPress={ _post }
      />
        </View>
        </View>
      </Modal>  
       <View style={styles.bottomContainer}> 
        <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
       <Pressable onPress={ () => setModal(true) }>
      <MaterialIcons name='post-add' size={50}/>
      </Pressable>
      
      </View>
       </View>
       </View>

    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",   
    },
    input: {
        height: 12 * PixelRatio.getFontScale() + 40,
        borderWidth: 1,
        fontSize: 12 * PixelRatio.getFontScale(),
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        
      },
      modalView: {
        position: 'absolute',
        bottom : 0,
        
      },
      modalInnerView: {
        width: Dimensions.get('window').width,
      },
    bottomContainer: {
        justifyContent: 'flex-end',
    },
  });

  const mapStateToProps = (state) => {
    return {
       props_Colorful : state.self.colorful, 

    }
  }
  
  const mapDispatchToProps = {};
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(bottombar);
  