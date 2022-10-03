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
  doc, 
  updateDoc,
  arrayUnion,
  increment,
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

const getUserInfoByEmail = async (userEmail) => {
  try {
    const q = query(collection(db, "users"), where("email", "==", userEmail));
    const docs = await getDocs(q);
    const data = docs.docs.map((doc) => doc.data());
    return data;
  } catch (err) {
    console.log(err)
  }
}

const fetchFollowingUsers = async (followingArray) => {
  const followingUsers = [];
  for (let followedUser of followingArray) {
    try {
      const q = query(collection(db, "users"), where("name", "==", followedUser));
      const docs = await getDocs(q);
      const data = docs.docs.map((doc) => doc.data());
      followingUsers.push(...data)
    } catch (err) {
      console.log(err)
    }
  }
  return followingUsers;
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
      following: [],
      totalfollowing: 0,
      followers: [],
      totalfollowers: 0,
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

const addAscentToLogbook = async (climb, grade, feel, rp, rating, recommendation, comment, date, userinfo) => {
  try {
    const usersRef = doc(db, "users", userinfo.email );
    const ascent = {
      climb: climb.climb || null,
      crag: climb.crag || null,
      area: climb.area || null,
      country: climb.country || null,
      type: climb.type || null,
      grade: grade || null,
      feel: feel || null,
      rp: rp || null,
      rating: rating || null,
      recommendation: recommendation || null,
      comment: comment || null,
      date: date || null,
      email: userinfo.email || null,
      name: userinfo.name || null,
    };
    await updateDoc(usersRef, {
      logbook: arrayUnion(ascent)
    });

    const climbRef = doc(db, "climbs", `${climb.climb}, ${climb.crag}, ${climb.area}`)
    await updateDoc(climbRef, {
      logs: arrayUnion(ascent)
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

  const climbID = `${trimAndCapClimb}, ${trimAndCapCrag}, ${trimAndCapArea}`;

  try {
    await setDoc(doc(db, 'climbs', climbID), {
      country: trimAndCapCountry,
      area: trimAndCapArea,
      crag: trimAndCapCrag,
      climb: trimAndCapClimb,
      grade: grade,
      type: type,
      logs: [],
    })
    alert('New climb successfully added!');
  } catch (err) {
    console.log(err)
    alert(err);
  }
}

const fetchCountry = async (country) => {
  if (country !== '') {
    const end = country.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
    try {
      const q = query(collection(db, "climbs"), where("country", ">=", country), where("country", "<=", end));
      const docs = await getDocs(q);
      const data = docs.docs.map((doc) => doc.data());
      return data;
    } catch (err) {
      console.log(err)
    }
  }
}

const processCountry = async (country) => {
  if (country !== '') {
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
}

const fetchArea = async (area) => {
  if (area !== '') {
    const end = area.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
    try {
      const q = query(collection(db, "climbs"), where("area", ">=", area), where("area", "<=", end));
      const docs = await getDocs(q);
      const data = docs.docs.map((doc) => doc.data());
      return data;
    } catch (err) {
      console.log(err)
    }
  }
}

const processArea = async (area) => {
  if (area !== '') {
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
}

const getAreaInfo = async (area) => {
  try {
    const q = query(collection(db, "climbs"), where("area", "==", area));
    const docs = await getDocs(q);
    const data = docs.docs.map((doc) => doc.data());
    return data;
  } catch (err) {
    console.log(err)
  }
}

const fetchCrag = async (crag) => {
  if (crag !== '') {
    const end = crag.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
    try {
      const q = query(collection(db, "climbs"), where("crag", ">=", crag), where("crag", "<=", end));
      const docs = await getDocs(q);
      const data = docs.docs.map((doc) => doc.data());
      return data;
    } catch (err) {
      console.log(err)
    }
  }
}

const processCrag = async (crag) => {
  if (crag !== '') {
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
}

const getCragInfo = async (crag) => {
  try {
    const q = query(collection(db, "climbs"), where("crag", "==", crag));
    const docs = await getDocs(q);
    const data = docs.docs.map((doc) => doc.data());
    return data;
  } catch (err) {
    console.log(err)
  }
}

const fetchClimb = async (climb) => {
  if (climb !== '') {
    const end = climb.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
    try {
      const q = query(collection(db, "climbs"), where("climb", ">=", climb), where("climb", "<=", end));
      const docs = await getDocs(q);
      const data = docs.docs.map((doc) => doc.data());
      return data;
    } catch (err) {
      console.log(err)
    }
  }
}

const processClimb = async (climb) => {
  if (climb !== '') {
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
}

const fetchExactClimb = async (climb) => {
  try {
    const q = query(collection(db, "climbs"), where("climb", "==", climb));
    const docs = await getDocs(q);
    const data = docs.docs.map((doc) => doc.data());
    const climbsList = [];
    const climbsDataList = [];
    data.map((eachData) => {
      if (!climbsList.includes(eachData.climb)) {
        climbsList.push(eachData.climb);
        climbsDataList.push(eachData);
      }
    });
    return climbsDataList;
  } catch (err) {
    console.log(err)
  }
}

const fetchClimbCragAreaCountry = async (input) => {
  if (input !== ''){
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
}

const fetchClimbInfo = async (input) => {
  const allInfo = [];
  
  const allClimbs = await fetchClimb(input);
  const allCrags = await fetchCrag(input);
  const allAreas = await fetchArea(input);

  const avoidAreaDuplicates = [];
  const avoidCragDuplicates = [];

  allClimbs.map((eachData) => {
    allInfo.push({data: eachData,
                  climb: eachData.climb})
  });
  allCrags.map((eachData) => {
    if (!avoidCragDuplicates.includes(eachData.crag)) {
      avoidCragDuplicates.push(eachData.crag)
      allInfo.push({data: eachData,
                    crag: eachData.crag})
    }
  });
  allAreas.map((eachData) => {
    if (!avoidAreaDuplicates.includes(eachData.area)) {
      avoidAreaDuplicates.push(eachData.area)
      allInfo.push({data: eachData,
                    area: eachData.area})
    }
  });
  return allInfo;
}

const addToFollowing = async (user, otherUser) => {
  try {
    const userInfo = await getUserInfoByEmail(user.email);
    const usersRef = doc(db, "users", user.email);
    if (!userInfo[0].following.includes(otherUser.name)) {
      await updateDoc(usersRef, {
          'following': arrayUnion(otherUser.name),
          'totalfollowing': increment(1),
          });
      } 
    } catch (err) {
      console.log(err)
    }
}

const addToFollower = async (user, otherUser) => {
  try {
    const userInfo = await getUserInfoByEmail(user.email);
    const usersRef = doc(db, "users", otherUser.email );
    if (!otherUser.followers.includes(userInfo[0].name)) {
      await updateDoc(usersRef, {
          'followers': arrayUnion(userInfo[0].name),
          'totalfollowers': increment(1),
          });
      }
    } catch (err) {
      console.log(err)
    }
}

const fetchAllClimbs = async () => {
  try {
    const q = query(collection(db, "climbs"));
    const docs = await getDocs(q);
    const data = docs.docs.map((doc) => doc.data());
    return data;
  } catch (err) {
    console.log(err);
  }
}

const fetchAllConcernedUsers = async (input) => {
  const end = input.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
  try {
    const q = query(collection(db, "users"), where("name", ">=", input), where("name", "<=", end));
    const docs = await getDocs(q);
    const data = docs.docs.map((doc) => doc.data());
    return data;
  } catch (err) {
    console.log(err);
  }
}

const fetchAllUsers = async () => {
  try {
    const q = query(collection(db, "users"));
    const docs = await getDocs(q);
    const data = docs.docs.map((doc) => doc.data());
    return data;
  } catch (err) {
    console.log(err);
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
  getUserInfoByEmail,
  addNewClimb,
  processCountry,
  processArea,
  processCrag,
  processClimb,
  fetchClimbCragAreaCountry,
  addAscentToLogbook,
  addClimbToTodoList,
  updateProfile,
  fetchAllConcernedUsers,
  addToFollowing,
  addToFollower,
  fetchFollowingUsers,
  fetchAllClimbs,
  fetchAllUsers,
  fetchClimbInfo,
  getAreaInfo,
  getCragInfo,
  fetchExactClimb, 
};


  