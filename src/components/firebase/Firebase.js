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
  doc, 
  updateDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { capitalizeFirstLetter, trimSentence } from '../operations/Operations';

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
    return user;
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
    await setDoc(doc(db, "users", email), {
      uid: user.uid,
      name: name,
      email: email,
      otherinfo: {
        country:'',
        age:'',
        startedclimbing:'',
        favoriteareas:'',
        otherinterests:'',
        },
      following: {
        names:[],
        totalnumber:'',
      },
      followers: {
        names:[],
        totalnumber:'',
      },
      logbook:[],
      todolist:[],
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

const updateProfile = async (newname, newage, newcountry, newstartedclimb, newfavareas, newotherint, email) => {
  try {
    const usersRef = doc(db, "users", email );
    await updateDoc(usersRef, {
      name: newname,
      otherinfo: {
        age: newage,
        country: newcountry,
        startedclimbing: newstartedclimb,
        favoriteareas: newfavareas,
        otherinterests: newotherint,
      }
    });
    alert('Profile updated!');
  } catch (err){
    alert(err)
    console.log(err)
  }
}

const addAscentToLogbook = async (climb, grade, feel, rp, rating, recommendation, comment, date, email) => {
  try {
    const usersRef = doc(db, "users", email );
    const ascent = {
      climb: climb.climb,
      crag: climb.crag,
      area: climb.area,
      country: climb.country,
      type: climb.type,
      grade: grade,
      feel: feel,
      rp: rp,
      rating: rating,
      recommendation: recommendation,
      comment: comment,
      date: date,
    };

    await updateDoc(usersRef, {
      logbook: arrayUnion(ascent)
    });
    alert(`${ascent.climb} was added to your logbook!`)
  } catch (err){
    alert(err)
    console.log(err)
  }
};

const addClimbToTodoList = async (climb, email) => {
  try { 
    const usersRef = doc(db, "users", email );

    await updateDoc(usersRef, {
      todolist: arrayUnion(climb)
    });
    alert(`${climb.climb} was added to your to-do list!`)
  } catch (err) {
    alert(err)
  }
};

const addNewClimb = async (country, area, crag, climb, grade, type) => {
  
  const trimCountry = trimSentence(country)
  const trimAndCapCountry = capitalizeFirstLetter(trimCountry);

  const trimArea = trimSentence(area)
  const trimAndCapArea = capitalizeFirstLetter(trimArea);

  const trimCrag = trimSentence(crag)
  const trimAndCapCrag = capitalizeFirstLetter(trimCrag);

  const trimClimb = trimSentence(climb)
  const trimAndCapClimb = capitalizeFirstLetter(trimClimb);

  try {
    await addDoc(collection(db, 'climbs'), {
      country: trimAndCapCountry,
      area: trimAndCapArea,
      crag: trimAndCapCrag,
      climb: trimAndCapClimb,
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
    return data;
  } catch (err) {
    console.log(err)
  }
}

const processCountry = async (country) => {
  const countryInfo = await fetchCountry(country);
  const countriesList = [];
  const countriesDataList = [];
  countryInfo.map((eachData) => {
    if (!countriesList.includes(eachData.country)) {
      countriesList.push(eachData.country);
      countriesDataList.push(eachData);
    }
  });
  return countriesDataList;
}

const fetchArea = async (area) => {
  try {
    const q = query(collection(db, "climbs"), where("area", "==", area));
    const docs = await getDocs(q);
    const data = docs.docs.map((doc) => doc.data());
    return data;
  } catch (err) {
    console.log(err)
  }
}

const processArea = async (area) => {
  const areaInfo = await fetchArea(area);
  const areasList = [];
    const areasDataList = [];
    areaInfo.map((eachData) => {
      if (!areasList.includes(eachData.area)) {
        areasList.push(eachData.area);
        areasDataList.push(eachData);
      }
    });
    return areasDataList;
}

const fetchCrag = async (crag) => {
  try {
    const q = query(collection(db, "climbs"), where("crag", "==", crag));
    const docs = await getDocs(q);
    const data = docs.docs.map((doc) => doc.data());
    return data;
  } catch (err) {
    console.log(err)
  }
}

const processCrag = async (crag) => {
  const cragInfo = await fetchCrag(crag);
  const cragsList = [];
    const cragsDataList = [];
    cragInfo.map((eachData) => {
      if (!cragsList.includes(eachData.crag)) {
        cragsList.push(eachData.crag);
        cragsDataList.push(eachData);
      }
    });
    return cragsDataList;
}

const fetchClimb = async (climb) => {
  try {
    const q = query(collection(db, "climbs"), where("climb", "==", climb));
    const docs = await getDocs(q);
    const data = docs.docs.map((doc) => doc.data());
    return data;
  } catch (err) {
    console.log(err)
  }
}

const processClimb = async (climb) => {
  const climbInfo = await fetchClimb(climb);
  const climbsList = [];
  const climbsDataList = [];
  climbInfo.map((eachData) => {
    if (!climbsList.includes(eachData.climb)) {
      climbsList.push(eachData.climb);
      climbsDataList.push(eachData);
    }
  });
  return climbsDataList;
}

const fetchClimbCragAreaCountry = async (input) => {
  const allDataList = [];

  const allClimbs = await fetchClimb(input);
  const allCrags = await fetchCrag(input);
  const allAreas = await fetchArea(input);
  const allCountries = await fetchCountry(input);

  allClimbs.map((eachData) => {
    allDataList.push(eachData);
  });
  allCrags.map((eachData) => {
    allDataList.push(eachData);
  });
  allAreas.map((eachData) => {
    allDataList.push(eachData);
  });
  allCountries.map((eachData) => {
    allDataList.push(eachData);
  });
  
  return allDataList;
  
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
  processCountry,
  processArea,
  processCrag,
  processClimb,
  fetchClimbCragAreaCountry,
  addAscentToLogbook,
  addClimbToTodoList,
  updateProfile,
};


  