import {initializeApp} from 'firebase/app';



import{getAuth, signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged
       } from 'firebase/auth';

import {getFirestore, doc,
        getDoc,setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDtI1V9hgx2L-GfBIrJdkfWsK2XvFbePYA",
    authDomain: "crwn-clothing-db-61d30.firebaseapp.com",
    projectId: "crwn-clothing-db-61d30",
    storageBucket: "crwn-clothing-db-61d30.appspot.com",
    messagingSenderId: "908920877536",
    appId: "1:908920877536:web:4351a9108a1542dee2fb85"
  };
  
  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider;

  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth=getAuth();
  export const signInWithGooglePopup = ()=> signInWithPopup(auth,provider);
  export const signInWithGoogleRedirect=()=> signInWithRedirect(auth, provider);
export const db =getFirestore();

export const createUserDocumentFromAuth =async (
    userAuth, 
    additionalInformation={}
    ) =>{


    if(!userAuth) return;
    const userDocRef =doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());

    if (!userSnapshot.exists()){
        const{displayname , email}= userAuth;
        const createdAt = new Date();
       
        try{
          await setDoc(userDocRef, 
            {displayname ,email, createdAt,
            ...additionalInformation,});  
        }catch(error)
        {
            console.log(error.message);
        }
        
    }

    return userDocRef;



};

export const createAuthUserWithEmailAndPassword = async(email, password)=>{
    if (!email|| !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async(email, password)=>{
    if (!email|| !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser=async ()=>await signOut(auth);

export const onAuthStateChangedListener =(callback)=> 
onAuthStateChanged(auth, callback )