import firebase from 'firebase/app'
import 'firebase/firestore';   // for cloud firestore

const firebaseConfig = {
    apiKey: "AIzaSyBoHa_m-x6Tbv7v4z0HJi3Jx5jupidMKrg",
    authDomain: "barber-midia.firebaseapp.com",
    databaseURL: "https://barber-midia.firebaseio.com",
    projectId: "barber-midia",
    storageBucket: "barber-midia.appspot.com",
    messagingSenderId: "749683034621",
    appId: "1:749683034621:web:ffae9b1cb7d4c11b483194",
    measurementId: "G-9H5HHNWSH5",
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db
