import { ref } from 'vue';
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator, collection, query, orderBy, getDocs, getDoc, addDoc, setDoc, doc, serverTimestamp, deleteDoc, updateDoc, DocumentData } from "firebase/firestore";

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
//↑↑ Firesbase configuration

//Composables
import { getUserObject } from './auth';

//Stores
import userInfo from '@/store/user-info';

//User information
const userData = ref<userInfo>(userInfo);

export const createUserDoc = (userInfo:userInfo):Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const userAlreadyExists:boolean = (await getDoc(doc(db,`usuarios/${userInfo.uid}`))).exists();
      const userCreationDate = await getUserObject().then(res => {return res?.metadata.creationTime});

      if(userAlreadyExists){return resolve();}
      if(userInfo.uid === null){return reject(`The user uid is null in: ${userInfo}`)}
      setDoc(doc(db, `usuarios/${userInfo.uid}`), {
        name: userInfo.fullName,
        email: userInfo.email,
        isEmailVerified: userInfo.isEmailVerified,
        isAnonymous: userInfo.isAnonymous,
        createAt: userCreationDate
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
        userData.value.userList = [];
        
        list.forEach(item => {
          saveItemOnClient(item.data() as itemInfo, item.id)
        });

        resolve();
      })
      .catch((error) => {reject(error)})
  })
}

export const addDocToList = (itemInfo:itemInfo):Promise<void> => {
  const uid = userData.value.uid;

  return new Promise((resolve, reject) => {
    const docToAdd:addDocToCloud = {
      name: itemInfo.name,
      tags: {
        quantity: itemInfo.tags.quantity,
        quantityMetric: itemInfo.tags.quantityMetric,
        price: itemInfo.tags.price
      },
      createAt: serverTimestamp()
    }

    addDoc(collection(db, `usuarios/${uid}/lista-de-compras`), docToAdd)
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

const deleteItemFromClient = (itemId:string) => {
  if(userData.value.userList === null){return console.warn('A propriedade "userList" do usuário é "null".')};

  userData.value.userList = userData.value.userList.filter(obj => {return obj.id !== itemId})
}

export const editDocFromList = (docId:string, changesObj:updateDocOnCloud):Promise<void> => {
  const uid = userData.value.uid;
  
  return new Promise(async (resolve, reject) => {
    const docToUpdate:updateDocOnCloud = changesObj;
    
    await updateDoc(doc(db,`usuarios/${uid}/lista-de-compras`, docId), docToUpdate as any)
      .then(() => {resolve(); editDocFromCliente(docId, changesObj)})
      .catch((error) => {reject(error)})
  })
}

const editDocFromCliente = (itemId:string, changesObj:updateDocOnCloud) => {
  if(userData.value.userList === null){return}

  const itemIndex = userData.value.userList.findIndex(obj => {return obj.id === itemId});
  userData.value.userList[itemIndex].name = changesObj.name;
  userData.value.userList[itemIndex].tags.quantity = changesObj.tags.quantity;
  userData.value.userList[itemIndex].tags.quantityMetric = changesObj.tags.quantityMetric;
  userData.value.userList[itemIndex].tags.price = changesObj.tags.price;
}

export const setCustomInfoOnUserCollection = (userId:string, infoName:string, infoValue:any):Promise<void> => {
  return new Promise((resolve, reject) => {
    updateDoc(doc(db, `usuarios`, userId), {
      [infoName]: infoValue
    })
      .then(() => {
        console.log('Infomação personalizada adicionada com sucesso!')
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(error)
      })
  })
}

export const getCustomInfoOnUserCollection = (userId:string, infoName:string):Promise<any> => {
  return new Promise((resolve, reject) => {
    getDoc(doc(db, 'usuarios', userId))
      .then((res) => {
        const data = res.data() as DocumentData;
        resolve(data[infoName]);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      })
  })
}

export const deleteUserCollection = (userId:string):Promise<void> => {
  const q = query(collection(db, `usuarios/${userData.value.uid}/lista-de-compras`), orderBy('createAt', 'asc'));

  return new Promise(async (resolve, reject) => {
    getDocs(q)
      .then(async (res) => {
        if(!res.empty){reject('delete-user-list'); return;}

        await deleteDoc(doc(db, `usuarios`, userId))
          .then(() => resolve())
          .catch((error) => reject(error))
        })
      .catch((error) => {
        reject(error);
      })
  })
}