import firebase from 'firebase/app';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyByW1_IQFC6xZPMdGbcUVbs4HJo17Labdk',
  authDomain: 'my-team-hasan.firebaseapp.com',
  projectId: 'my-team-hasan',
  storageBucket: 'my-team-hasan.appspot.com',
  messagingSenderId: '873103561190',
  appId: '1:873103561190:web:26a60049b01be2ceb74627',
  measurementId: 'G-0MESMY397V',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
