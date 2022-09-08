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
  try {
    const q = query(collection(db, "users"), where("uid", "==", userUID));
    const docs = await getDocs(q);
    const data = docs.docs.map((doc) => doc.data());
    return data;
  } catch (err) {
    console.log(err)
  }
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

const addNewClimb = async (country, area, crag, climb, grade, type) => {
  try {
    await addDoc(collection(db, 'climbs'), {
      country: country,
      area: area,
      crag: crag,
      climb: climb,
      grade: grade,
      type: type,
    })
    alert('New climb successfully added!');
  } catch (err) {
    console.log(err)
    alert(err);
  }
}

const fetchCountry = async (country) => {
  try {
    const q = query(collection(db, "climbs"), where("country", "==", country));
    const docs = await getDocs(q);
    const data = docs.docs.map((doc) => doc.data());
    const countriesList = [];
    data.map((eachData) => {
      countriesList.push(eachData.country);
    });
    return countriesList;
  } catch (err) {
    console.log(err)
  }
}

const fetchArea = async (area) => {
  try {
    const q = query(collection(db, "climbs"), where("area", "==", area));
    const docs = await getDocs(q);
    const data = docs.docs.map((doc) => doc.data());
    const areasList = [];
    data.map((eachData) => {
      areasList.push(eachData.area);
    });
    return areasList;
  } catch (err) {
    console.log(err)
  }
}

const fetchCrag = async (crag) => {
  try {
    const q = query(collection(db, "climbs"), where("crag", "==", crag));
    const docs = await getDocs(q);
    const data = docs.docs.map((doc) => doc.data());
    const cragsList = [];
    data.map((eachData) => {
      cragsList.push(eachData.crag);
    });
    return cragsList;
  } catch (err) {
    console.log(err)
  }
}

const fetchClimb = async (climb) => {
  try {
    const q = query(collection(db, "climbs"), where("climb", "==", climb));
    const docs = await getDocs(q);
    const data = docs.docs.map((doc) => doc.data());
    const climbsList = [];
    data.map((eachData) => {
      climbsList.push(eachData.climb);
    });
    return climbsList;
  } catch (err) {
    console.log(err)
  }
}

export {
  auth,
  db,
  signIn,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  getUserInfo,
  addNewClimb,
  fetchCountry,
  fetchArea,
  fetchCrag,
  fetchClimb,
};


  