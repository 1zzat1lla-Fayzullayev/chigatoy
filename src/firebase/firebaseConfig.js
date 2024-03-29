import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAHBDkvffKxOO5xJp_LpEfRGjSeA5_fwp4',
	authDomain: 'chigatoy.firebaseapp.com',
	projectId: 'chigatoy',
	storageBucket: 'chigatoy.appspot.com',
	messagingSenderId: '342357967510',
	appId: '1:342357967510:web:66720afb2a0a93b19b78b7',
	measurementId: 'G-R65H4037VY',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db, app }
