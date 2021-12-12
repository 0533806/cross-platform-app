import React, { Component } from 'react';
import { View, Text, Pressable, PixelRatio, StyleSheet} from 'react-native';
import { connect } from "react-redux";


  

   class SignButton extends Component {
       static displayName = "SignButton";
    render(){
        return (
            <Pressable onPress={ this.props.onPress }>
            <Text style={this.props.option ? styles.caseA : styles.caseB}>{this.props.children}</Text>
            </Pressable>
        )
    }
   
}
SignButton.defaultProps = {
    option: true,
  
  }

const styles = StyleSheet.create({
    caseA: {
        borderColor: '#0f4c81',
        borderWidth: 2,
        textAlign: 'center',
        fontSize: 20,
        margin: 10,
        backgroundColor: '#0f4c81',
        color: 'white',
    },
      caseB: {
        borderColor: '#0f4c81',
        borderWidth: 2,
        textAlign: 'center',
        fontSize: 20,
        margin: 10,
        backgroundColor: 'white',
        color: '#0f4c81',
  },
  });

  export default  SignButton 