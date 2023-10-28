import { ref } from 'vue';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, connectAuthEmulator } from 'firebase/auth';

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

export const getUserData = ():Promise<void> => {
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