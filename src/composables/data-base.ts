import { ref } from 'vue';
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator, collection, query, orderBy, getDocs, getDoc, addDoc, setDoc, doc, serverTimestamp, deleteDoc } from "firebase/firestore";

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
  console.log('Conectando no banco de dados da produção.');
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
  const q = query(collection(db, `usuarios/${userData.value.uid}/lista-de-compras`), orderBy('createAt', 'asc'));

  return new Promise(async (resolve, reject) => {
    if(userData.value.uid === null){return reject('O ID do usuário é null')};

    await getDocs(q)
      .then((list) => {
        list.forEach(item => {          
          saveItemOnClient(item.data() as itemInfo, item.id)
        });

        console.log(userData.value.userList)
        resolve();
      })
      .catch((error) => {throw new Error(error);})
  })
}

export const addDocToList = (itemInfo:itemInfo):Promise<void> => {
  const uid = userData.value.uid;

  return new Promise((resolve, reject) => {
    addDoc(collection(db, `usuarios/${uid}/lista-de-compras`), {
      name: itemInfo.name,
      tags: {
        quantity: itemInfo.tags.quantity,
        quantityMetric: itemInfo.tags.quantityMetric,
        price: itemInfo.tags.price
      },
      createAt: serverTimestamp()
    })
      .then((doc) => {resolve(); saveItemOnClient(itemInfo,doc.id);})
      .catch((error) => reject(error))
  })
}

const saveItemOnClient = (itemInfo:itemInfo, idString:string):void => {
  const newObj = {
    ...itemInfo,
    id:idString
  }

  if(userData.value.userList === null){userData.value.userList = []};
  
  userData.value.userList.push(newObj);
}

export const deleteDocFromList = (docId:string):Promise<void> => {
  const uid = userData.value.uid;

  return new Promise(async (resolve, reject) => {
    await deleteDoc(doc(db, `usuarios/${uid}/lista-de-compras`, docId))
      .then(() => {resolve(); deleteItemFromClient(docId);})
      .catch((error) => {reject(error)})
  })
}

const deleteItemFromClient = (itemID:string) => {
  if(userData.value.userList === null){return console.warn('A propriedade "userList" do usuário é "null".')};

  console.log(userData.value.userList)
  userData.value.userList = userData.value.userList.filter(obj => {return obj.id !== itemID})
  console.log(userData.value.userList)
}