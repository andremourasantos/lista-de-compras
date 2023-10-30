import { ref } from 'vue';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, signInAnonymously, signOut, connectAuthEmulator, User } from 'firebase/auth';

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

export const getUserObject = ():Promise<User | null> => {
  return new Promise((resolve, reject) => {
    if(auth.currentUser === null){reject} else{resolve(auth.currentUser)}
  })
}

//Login & create account methods
//Composables
import { createUserDoc, setCustomInfoOnUserCollection, getCustomInfoOnUserCollection } from './data-base';
import { Timestamp } from 'firebase/firestore';

export const loginWithGoogle = ():Promise<void> => {
  const provider = new GoogleAuthProvider();
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
    .then(async (res) => {
      await createUserDoc({
        fullName: res.user.displayName,
        email: res.user.email,
        imageURL: res.user.photoURL,
        isAnonymous: res.user.isAnonymous,
        isEmailVerified: res.user.emailVerified,
        uid: res.user.uid,
        userList: null
      });
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
      .then(async (res) => {
        await createUserDoc({
          fullName: res.user.displayName,
          email: res.user.email,
          imageURL: res.user.photoURL,
          isAnonymous: res.user.isAnonymous,
          isEmailVerified: res.user.emailVerified,
          uid: res.user.uid,
          userList: null
        });
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
            userData.value.fullName = name;

            await createUserDoc({
              fullName: res.user.displayName,
              email: res.user.email,
              imageURL: res.user.photoURL,
              isAnonymous: res.user.isAnonymous,
              isEmailVerified: res.user.emailVerified,
              uid: res.user.uid,
              userList: null
            });

            sendEmailVerification(res.user);
            setCustomInfoOnUserCollection(res.user.uid, 'lastEmailVerificationSent', new Date());
            resolve();
          })
          .catch((error) => {reject(error)})
      })
      .catch((error) => {
        reject(error.code);
      })
  })
};

export const sendEmailToVerifyAccount = async ():Promise<'wait-timeout' | 'already-verified' | 'sended-successfully' | Error> => {
  const currentUser = auth.currentUser as NonNullable<User>;
  const lastEmailSent = await getCustomInfoOnUserCollection(userData.value.uid as NonNullable<null>, 'lastEmailVerificationSent') as Timestamp;

  //Timeout of 5 minutes
  if((new Date().getTime() - lastEmailSent.toMillis()) / (1000 * 60) < 5){
    return ('wait-timeout');
  }

  return new Promise((resolve, reject) => {
    if(currentUser.emailVerified === true){return resolve('already-verified')};

    sendEmailVerification(currentUser)
      .then(() => {
        setCustomInfoOnUserCollection(currentUser.uid, 'lastEmailVerificationSent', new Date());
        resolve('sended-successfully');
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      })
  })
};

export const loginAnonymously = ():Promise<void> => {
  return new Promise((resolve, reject) => {
    signInAnonymously(auth)
      .then(async (res) => {
        await createUserDoc({
          fullName: res.user.displayName,
          email: res.user.email,
          imageURL: res.user.photoURL,
          isAnonymous: res.user.isAnonymous,
          isEmailVerified: res.user.emailVerified,
          uid: res.user.uid,
          userList: null
        });
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      })
  })
};

//SingOut
export const singUserOut = ():void => {
  userData.value = {
    fullName:null,
    email:null,
    imageURL:null,
    isAnonymous:false,
    isEmailVerified:null,
    uid:null,
    userList:null
  };
  
  signOut(auth);
}

//Get user info
export const isUserEmailVerified = ():boolean | undefined => {
  return auth.currentUser?.emailVerified;
};

export const isUserAnonymous = ():boolean | undefined => {
  return auth.currentUser?.isAnonymous;
};