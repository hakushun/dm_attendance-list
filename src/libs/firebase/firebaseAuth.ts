import firebase from 'firebase/app';
import { AuthPayload } from '../../redux/modules/app/sign';
import { Userdata } from '../../redux/modules/app/user';
import { mapUserData } from '../utils/mapUserData';

export const signUpWithFirebase = async ({ email, password }: AuthPayload): Promise<Userdata> => {
  const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
  if (!user) return null;
  return mapUserData(user);
};

export const signInWithFirebase = async ({ email, password }: AuthPayload): Promise<Userdata> => {
  const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
  if (!user) return null;
  return mapUserData(user);
};

export const signOutWithFirebase = async (): Promise<void> => {
  await firebase.auth().signOut();
};

export const resetUserPassword = async (email: string): Promise<void> => {
  await firebase.auth().sendPasswordResetEmail(email);
};
