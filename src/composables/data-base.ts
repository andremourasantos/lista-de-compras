import { ref } from 'vue';
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator, collection, query, orderBy, getDocs, getDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";

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

const db = getFirestore();
if(window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'){
  console.log('Conenctando no banco de dados local...')
  try {
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    console.log('Conexão bem-sucedida.');
  } catch (error) {
    console.log('Conexão mal-sucedida.', error);
  }
} else {
  console.log('Conectando no banco de dados da produção.')
}

//Stores
import userInfo from '@/store/user-info';

const userData = ref<userInfo>(userInfo);

export const createUserDoc = async (userInfo:userInfo):Promise<void> => {
  const userAlreadyExists:boolean = (await getDoc(doc(db,`usuarios/${userInfo.uid}`))).exists();

  return new Promise<void>((resolve, reject) => {
    if(userAlreadyExists){return resolve();}

    try {
      setDoc(doc(db, `usuarios/${userInfo.uid}`), {
        name: userInfo.fullName,
        email: userInfo.email,
        createAt: serverTimestamp()
      })

      resolve();
    } catch (error) {
      reject(`Ocorreu um erro: ${error}`);
    }
  })
}

export const getUserGroceriesList = ():Promise<void> => {
  const q = query(collection(db, `usuarios/${userData.value.uid}/lista-de-compras`), orderBy('creationDate', 'asc'));

  return new Promise(async (resolve, reject) => {
    if(userData.value.uid === null){return reject('O ID do usuário é null')};

    await getDocs(q)
      .then((list) => {
        list.forEach(item => {
          console.log(item.id, item.data())
        });
        resolve();
      })
      .catch((error) => {throw new Error(error);})
  })
};