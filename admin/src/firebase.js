import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAfR2ccsdEaFMRA7MNpKaGeZV_lu70v_dk",
    authDomain: "netflix-1d95b.firebaseapp.com",
    projectId: "netflix-1d95b",
    storageBucket: "netflix-1d95b.appspot.com",
    messagingSenderId: "763877340204",
    appId: "1:763877340204:web:95e9c2a530dbcece328d89",
    measurementId: "G-7PDT577PK9"
  };

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  export default storage;