import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'


const  config = {
    apiKey: "AIzaSyCQHONIA-DHtMX35xVMO-ZE7BAj7nm7Nq4",
    authDomain: "daily-status-tracker.firebaseapp.com",
    databaseURL: "https://daily-status-tracker.firebaseio.com",
    projectId: "daily-status-tracker",
    storageBucket: "daily-status-tracker.appspot.com",
    messagingSenderId: "999057855922",
    appId: "1:999057855922:web:ef6708c47262bee5f3c0ab"
  };


 

  class Firebase{
      constructor(){
            // Initialize Firebase
        app.initializeApp(firebaseConfig);
        this.auth =app.auth()
        this.db =app.firestore()
      }
  }