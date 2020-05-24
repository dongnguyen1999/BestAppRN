import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDKhHCHcw8Xa9uWceOzrMduoCs664cHfJg',
  authDomain: 'fir-rn-24f52.firebaseapp.com',
  databaseURL: 'https://fir-rn-24f52.firebaseio.com',
  projectId: 'fir-rn-24f52',
  storageBucket: 'fir-rn-24f52.appspot.com',
  messagingSenderId: '187630649113',
  appId: '1:187630649113:web:72f5fb7311ffa919ce0f88',
  measurementId: 'G-176FXX1308',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
