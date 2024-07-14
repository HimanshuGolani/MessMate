import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfMYK-F0t9Ae3Zwlq-XcUwtxoLOxeziVw",
  authDomain: "messmate-images.firebaseapp.com",
  projectId: "messmate-images",
  storageBucket: "messmate-images.appspot.com",
  messagingSenderId: "1034295181577",
  appId: "1:1034295181577:web:315e6b172afbe90e9053d8",
  measurementId: "G-3N7CXHX769",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
