/** @format */

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: "AIzaSyBL5Xy1zXDB3UocYb955Wy3XS75AEp6dvM",
	authDomain: "atlp-7-capstone-project.firebaseapp.com",
	projectId: "atlp-7-capstone-project",
	storageBucket: "atlp-7-capstone-project.appspot.com",
	messagingSenderId: "990979498717",
	appId: "1:990979498717:web:e1b2f4ded60f6f64ca3134",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//make aut and firestore references
// enable firebase auth service
const auth = firebase.auth();
// enable firebase firestore service
const db = firebase.firestore();
//   db.settings({timeStampInShots: true});
