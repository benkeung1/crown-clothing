import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCtRJfgqCj5om5JQp2GYtBsxXN-pUEeYHs",
  authDomain: "crown-db-e2a19.firebaseapp.com",
  databaseURL: "https://crown-db-e2a19.firebaseio.com",
  projectId: "crown-db-e2a19",
  storageBucket: "crown-db-e2a19.appspot.com",
  messagingSenderId: "523808306340",
  appId: "1:523808306340:web:8835e1e6e5d7e626aea231"
};

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
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;