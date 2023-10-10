import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBihDMZ0a-o_B0RmvAIaXnbNlK8PMa0_Ys",
  authDomain: "lab06multi.firebaseapp.com",
  projectId: "lab06multi",
  storageBucket: "lab06multi.appspot.com",
  messagingSenderId: "133459768132",
  appId: "1:133459768132:web:5dc24297bee59988f6dd11"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
