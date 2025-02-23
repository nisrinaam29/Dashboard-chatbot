// Import the functions you need from the SDKs you need
import "firebase/database";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, child } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const dbRef = ref(database);

//ini buat ngecek ada nggak data di firebasenya
export const getValue = (roomId: string) =>
  get(child(dbRef, `chatbot/${roomId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

    
export const chatRef = ref(database, "chatbot");

export const onGetValue = onValue(chatRef, (snapshot) => {
  const data = snapshot.val();
  return data;
});
