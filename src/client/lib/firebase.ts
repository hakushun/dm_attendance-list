import firebase from 'firebase/app';
import 'firebase/auth'; // for authentication
import 'firebase/database'; // for realtime database
import 'firebase/functions'; // for cloud functions

const config = {
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	databaseURL: process.env.databaseURL,
	projectId: process.env.projectId,
	appId: process.env.appId,
};
const app = firebase.initializeApp(config);
const auth = firebase.auth();
export default auth;

const db = app.database();
const ref = db.ref('/');
export const eventsRef = ref.child('events');
export const newEventsRef = ref.child('new_events');
export const newPartsRef = ref.child('new_parts');
export const partsRef = ref.child('parts');
export const covidsRef = ref.child('covids');
export const usersRef = ref.child('users');
