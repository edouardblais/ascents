import { initializeApp } from "firebase/app";
import { getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc, 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHlIY3djJMXF6A3ehQCCUb_vDfMa7Sd4U",
  authDomain: "ascents-88d37.firebaseapp.com",
  projectId: "ascents-88d37",
  storageBucket: "ascents-88d37.appspot.com",
  messagingSenderId: "208814000577",
  appId: "1:208814000577:web:0a815ed90f8b9177498740"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();

const signIn = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const getUserInfo = async (userUID) => {
  const q = query(collection(db, "users"), where("uid", "==", userUID));
  const docs = await getDocs(q);
  return docs;
}

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      email: email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signIn,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  getUserInfo,
};


  