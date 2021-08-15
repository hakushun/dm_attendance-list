import firebase from 'firebase/app';
import initFirebase from '../firebase/initFirebase';

export const getInstance = (): firebase.firestore.Firestore => {
  initFirebase();
  const db = firebase.firestore();
  return db;
};
