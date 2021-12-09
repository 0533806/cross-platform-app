import React from "react";
import { PixelRatio, StyleSheet, Text, View, Pressable, Alert, Switch, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../firebase";
import { change_backgroudcolor, change_showimage, change_textcolor, change_showface, use_default } from "./actions/action"
import { getDoc, doc } from "firebase/firestore";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const textCollection = ["black", "white", "#0000cd", "#98D98E"];
const backGroundCollection = ["#E2C2DE", "#FFECEC", "#C4E1FF", "pink"];

function setting({ navigation, change_backgroudcolor, props_ShowImage, props_ShowFace, change_showimage, change_textcolor, change_showface, props_ColorText, use_default }) {
  const [showPage, setShowPage] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  let uid = getAuth().currentUser.uid;
  const ref = doc(db, "boss", "hoster");
  React.useEffect(() => {
    hostOrNot();

  }, []);

  const hostOrNot = async () => {
    const docSnap = await getDoc(ref);
    if (docSnap.data().item.includes(uid)) setShowPage(true);
    if (loading) setLoading(false);
  };

  const _quit = () => {
    const auth = getAuth()
    signOut(auth).then(() => {
    }).catch((error) => {

    });
  };
  if (loading) return null;

  return (
    <SafeAreaView>
      <View style={styles.everyRow}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialIcons name='arrow-back' size={33} />
        </Pressable>
      </View>
      <View style={{ backgroundColor: "#ADADAD", paddingLeft: 8 }}>
        <Text>
          色彩
        </Text>
      </View>
      <View style={styles.everyRow}>
        <Text style={styles.mainText}>字體</Text>
        <View style={{ flexDirection: 'row' }}>
          <Pressable onPress={() => change_textcolor(textCollection[0])}>
            <View style={[styles.colorBlock, { backgroundColor: textCollection[0] }]} />
          </Pressable>
          <Pressable onPress={() => change_textcolor(textCollection[1])}>
            <View style={[styles.colorBlock, { backgroundColor: textCollection[1] }]} />
          </Pressable>
          <Pressable onPress={() => change_textcolor(textCollection[2])}>
            <View style={[styles.colorBlock, { backgroundColor: textCollection[2] }]} />
          </Pressable>
          <Pressable onPress={() => change_textcolor(textCollection[3])}>
            <View style={[styles.colorBlock, { backgroundColor: textCollection[3] }]} />
          </Pressable>
        </View>
      </View>
      <View style={styles.everyRow}>
        <Text style={styles.mainText}>背景</Text>
        <View style={{ flexDirection: 'row' }}>
          <Pressable onPress={() => change_backgroudcolor(backGroundCollection[0])}>
            <View style={[styles.colorBlock, { backgroundColor: backGroundCollection[0] }]} />
          </Pressable>
          <Pressable onPress={() => change_backgroudcolor(backGroundCollection[1])}>
            <View style={[styles.colorBlock, { backgroundColor: backGroundCollection[1] }]} />
          </Pressable>
          <Pressable onPress={() => change_backgroudcolor(backGroundCollection[2])}>
            <View style={[styles.colorBlock, { backgroundColor: backGroundCollection[2] }]} />
          </Pressable>
          <Pressable onPress={() => change_backgroudcolor(backGroundCollection[3])}>
            <View style={[styles.colorBlock, { backgroundColor: backGroundCollection[3] }]} />
          </Pressable>
        </View>
      </View>
      <View style={{ backgroundColor: "#ADADAD", paddingLeft: 8 }}>
        <Text>
          顯示
        </Text>
      </View>
      <View style={styles.everyRow}>
        <Text style={styles.mainText}>照片</Text>
        <Switch
          trackColor={{ false: "#D0D0D0", true: '#00DB00' }}
          thumbColor={props_ColorText}
          onValueChange={() => change_showimage(!props_ShowImage)}
          value={props_ShowImage}
        />

      </View>
      <View style={styles.everyRow}>
        <Text style={styles.mainText}>評價</Text>
        <Switch
          trackColor={{ false: "#D0D0D0", true: '#00DB00' }}
          thumbColor={props_ColorText}
          onValueChange={() => change_showface(!props_ShowFace)}
          value={props_ShowFace}
        />
      </View>
      <View style={{ backgroundColor: "#ADADAD", paddingLeft: 8 }}>
        <Text>

        </Text>
      </View>
      <View style={styles.everyRow}>
        <Pressable onPress={() => Alert.alert("創作規範", "請正確使用標點符號，如果內容為外語或是文言文，請務必解釋清楚原意。")}>
          <Text style={styles.mainText}>創作規範</Text>
        </Pressable>
      </View>
      <View style={styles.everyRow}>
        <Pressable onPress={use_default}>
          <Text style={styles.mainText}>回復原始設定</Text>
        </Pressable>
      </View>
      <View style={styles.everyRow}>
        <Pressable onPress={_quit}>
          <Text style={styles.mainText}>登出</Text>
        </Pressable>
      </View>
      {showPage &&
        <View style={styles.everyRow}>
          <Pressable onPress={() => navigation.navigate("Manager")}>
            <Text style={styles.mainText}>前往管理者介面</Text>
          </Pressable>
        </View>
      }
    </SafeAreaView>
  )

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  everyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#999EA2',
    alignItems: "center",
  },
  mainText: {
    fontSize: 16 * PixelRatio.getFontScale(),
  },
  colorBlock: {
    height: 30 * PixelRatio.getFontScale(),
    width: 30 * PixelRatio.getFontScale(),
    borderRadius: 8,
    marginLeft: 4,
  }

});

const mapStateToProps = (state) => {
  return {
    props_Colorful: state.self.colorful,
    props_ShowImage: state.self.showImage,
    props_ShowFace: state.self.showFace,
    props_ColorText: state.self.colorText,

  }
}

const mapDispatchToProps = { change_backgroudcolor, change_showimage, change_textcolor, change_showface, use_default };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(setting);
