import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey:             process.env.REACT_APP_API_KEY,
  authDomain:         process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL:        process.env.REACT_APP_DATABASE_URL,
  projectId:          process.env.REACT_APP_PROJECT_ID,
  storageBucket:      process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:  process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId:              process.env.REACT_APP_APP_ID,
  measurementId:      process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  signUpWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut = () => {
    return this.auth.signOut();
  }

  passwordReset = email => {
    return this.auth.sendPasswordResetEmail(email);
  }

  passwordUpdate = password => {
    return this.auth.currentUser.updatePassword(password);
  }

  userContactInfo = uid => {
    return this.db.ref(`users/${uid}/contactInfo`);
  }

  users = () => {
    return this.db.ref('users');
  }

}

export default Firebase;