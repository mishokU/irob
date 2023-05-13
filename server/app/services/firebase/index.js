// Import the functions you need from the SDKs you need
const {initializeApp} = require("firebase/app");
const {getStorage, deleteObject, ref, getMetadata} = require("firebase/storage");
const {admin} = require("firebase-admin")

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDTgkaw1jgwf8286h-bZ3ShedVjm4kuIG0",
    authDomain: "irob-d735a.firebaseapp.com",
    projectId: "irob-d735a",
    storageBucket: "irob-d735a.appspot.com",
    messagingSenderId: "447823274603",
    appId: "1:447823274603:web:2751786f90177e7f2b072e",
    measurementId: "G-5PR86XVBR6"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const storage = getStorage();

module.exports = {
    storage,
    admin,
    getMetadata,
    ref,
    deleteObject
}