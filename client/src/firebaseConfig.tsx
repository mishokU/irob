// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDTgkaw1jgwf8286h-bZ3ShedVjm4kuIG0",
    authDomain: "irob-d735a.firebaseapp.com",
    projectId: "irob-d735a",
    storageBucket: "irob-d735a.appspot.com",
    messagingSenderId: "447823274603",
    appId: "1:447823274603:web:2751786f90177e7f2b072e",
    measurementId: "G-5PR86XVBR6"
};

initializeApp(firebaseConfig);

const storage = getStorage();

export {
    storage
}