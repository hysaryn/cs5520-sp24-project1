import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId} from '@env';

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId
  };

const myApp = initializeApp(firebaseConfig);
export const database = getFirestore(myApp);