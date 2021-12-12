import React, { Component } from 'react';
import { View, Text, Pressable, PixelRatio, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from "react-redux";


const iconSize = 26 * PixelRatio.getFontScale();  

   class SayingText extends Component {
       static displayName = "SayingText";
    render(){
        
        return (
        <Pressable onPress={ this.props.onPress }>
             <View style={[styles.saying, {backgroundColor: this.props.Colorful }]}>
             <Text style={[ styles.mainText, {color: this.props.ColorText} ]}>{this.props.children}</Text>
             { this.props.ShowFace &&
             <View style={{flexDirection: "row", justifyContent: 'flex-end', alignItems: "center"}}>
             <MaterialIcons name="tag-faces" size={iconSize} color={this.props.ColorText}/>
             <Text style={[ styles.mainText, {color: this.props.ColorText} ]}>
             {this.props.like}
             </Text>
             <MaterialIcons name="mood-bad" size={iconSize} color={this.props.ColorText}/>
             <Text style={[ styles.mainText, {color: this.props.ColorText} ]}>
             {this.props.unlike}    
             </Text>
              </View>   
             }        
             </View>
            </Pressable>

        )
    }
   


}


const styles = StyleSheet.create({
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
       Colorful : state.self.colorful, 
       ShowFace : state.self.showFace, 
       ColorText : state.self.colorText, 
    }
  }
  
  const mapDispatchToProps = {};
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SayingText);
  

 