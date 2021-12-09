import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, doc, updateDoc, arrayUnion, arrayRemove, setDoc, increment, getDoc } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";


const firebaseConfig = {
 
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app);

  export const createAccount = (account, password) => {
    createUserWithEmailAndPassword(getAuth(), account, password)
      .then((userCredential) => {
        const user = userCredential.user;
        _addUserData(getAuth().currentUser.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      }); 
  } 
    
  async function _addUserData ( id ) {
     const docData = { seen: [] };
    await setDoc(doc(db, "user",  id), docData);
  };
  //
  
    
  
  //
  export const createPost = async (saying, comments) => {
    await addDoc(collection(db, "temp"), {
        saying : saying,
        comments: comments,
        who: getAuth().currentUser.uid,
        email: getAuth().currentUser.email,
        checked: false,
      });
  }
  //
  export const OKPost = async (saying, comments, who) => {
    await addDoc(collection(db, "post"), {
          saying,
          comments,
          who,
          like: 0,
          unlike: 0,
          likeBy: [],
      });
      const targetRef = doc(db, "boss", "inhalt");
      await updateDoc(targetRef, {
        item: arrayUnion(saying),
     });
  }
  //
  export const postChecked = async (id) => {
    const targetRef = doc(db, "temp", id);
    await updateDoc(targetRef, {
      checked: true,
  });
  }
  //
  export const likePost = async (id) => {
    const uid = getAuth().currentUser.uid;
    const targetRef = doc(db, "post", id);
    const userRef = doc(db, "user", uid);
    await updateDoc(targetRef, {
      like: increment(1),
      likeBy: arrayUnion(uid),
  });
    await updateDoc(userRef, {
      seen: arrayUnion(id)
  });
  }
  //
  export const unlikePost = async (id) => {
    const uid = getAuth().currentUser.uid;
    const targetRef = doc(db, "post", id);
    const userRef = doc(db, "user", uid);
    await updateDoc(targetRef, {
      unlike: increment(1)
  });
    await updateDoc(userRef, {
    seen: arrayUnion(id)
});
}
//
export const sosoPost = async (id) => {
  const userRef = doc(db, "user", uid);
  await updateDoc(userRef, {
  seen: arrayUnion(id)
});
}

