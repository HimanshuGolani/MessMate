import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2UwOst2owt_YGvbG8jL2-7zIAqh6PC04",
  authDomain: "mess-mate-images.firebaseapp.com",
  projectId: "mess-mate-images",
  storageBucket: "mess-mate-images.appspot.com",
  messagingSenderId: "934387892874",
  appId: "1:934387892874:web:61d9656791172406d0e373",
  measurementId: "G-PR3Z9V2YHS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
