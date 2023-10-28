import { ref } from 'vue';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signInAnonymously, connectAuthEmulator, User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAAdgbV_X6cdkZWytuuUuA2-_XlvL_V4mo",
  authDomain: "groceries-app-451f5.firebaseapp.com",
  projectId: "groceries-app-451f5",
  storageBucket: "groceries-app-451f5.appspot.com",
  messagingSenderId: "1010463074472",
  appId: "1:1010463074472:web:7a51918a58c895cfaf7a9d",
  measurementId: "G-SQX4ZM8YST"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

// if(window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'){
//   console.log('Conenctando ao Auth local...')
//   try {
//     connectAuthEmulator(auth,'http://127.0.0.1:9090');
//     console.log('Conexão bem-sucedida (auth).');
//   } catch (error) {
//     console.log('Conexão mal-sucedida (auth).', error);
//   }
// } else {
//   console.log('Conectando ao Auth da produção.');
// }

//Stores
import userInfo from '@/store/user-info';

const userData = ref<userInfo>(userInfo);

//Login & create account methods
//Composables
import { createUserDoc } from './data-base';

export const loginWithGoogle = ():Promise<void> => {
  const provider = new GoogleAuthProvider();
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
    .then(async (res) => {
      await saveUserData();
      createUserDoc(userData.value);
      resolve();
    })
    .catch((error) => {
      reject(error);
    })
  })
};

export const loginWithEmail = (email:string, password:string):Promise<void> => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await saveUserData();
        createUserDoc(userData.value);
        resolve();
      })
      .catch((error) => {
        reject(error.code);
      })
  })
};

export const createAnAccount = (email:string, password:string, name:string):Promise<void> => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(res.user, {
          displayName: name
        })
          .then(async() => {
            await saveUserData();
            createUserDoc(userData.value);
            resolve();
          })
          .catch((error) => {reject(error)})
      })
      .catch((error) => {
        reject(error.code);
      })
  })
};

export const loginAnonymously = ():Promise<void> => {
  return new Promise((resolve, reject) => {
    signInAnonymously(auth)
      .then(async () => {
        await saveUserData();
        createUserDoc(userData.value);
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      })
  })
}

//Get user info
export const getUserObject = ():Promise<User> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();

      if(user){
        resolve(user);
      } else {
        reject();
      }
    })
  })
};

export const saveUserData = ():Promise<void> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user === null){return resolve()};

        unsubscribe();
        userData.value.fullName = user.displayName;
        userData.value.email = user.email;
        userData.value.imageURL = user.photoURL;
        userData.value.isAnonymous = user.isAnonymous;
        userData.value.isEmailVerified = user.emailVerified;
        userData.value.uid = user.uid;
        return resolve();
    })
  })
};

export const isUserEmailVerified = ():boolean | null => {
  return userData.value.isEmailVerified
};

export const isUserAnonymous = ():boolean => {
  return userData.value.isAnonymous;
};