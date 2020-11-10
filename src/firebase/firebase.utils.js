import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyCDTXVh16I1HvI85cOL2tDwcxwuqJgLhZE",
        authDomain: "crwn-db-fffb5.firebaseapp.com",
        databaseURL: "https://crwn-db-fffb5.firebaseio.com",
        projectId: "crwn-db-fffb5",
        storageBucket: "crwn-db-fffb5.appspot.com",
        messagingSenderId: "485522104293",
        appId: "1:485522104293:web:9b67fd0244707fcd8cd90c",
        measurementId: "G-M24K4PREW3"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
