import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzXTAqs9yVQb8z_r84vOnFUmmt_Ws6voo",
  authDomain: "phone-login-f52c2.firebaseapp.com",
  projectId: "phone-login-f52c2",
  storageBucket: "phone-login-f52c2.appspot.com",
  messagingSenderId: "1005300743055",
  appId: "1:1005300743055:web:e663ec35578255f8a929fa",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
