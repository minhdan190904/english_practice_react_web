import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD4blPZwNNQxRQqnRK6vjm1ydwLKnPy-n8',
  authDomain: 'englishpractice-7fac0.firebaseapp.com',
  projectId: 'englishpractice-7fac0',
  storageBucket: 'englishpractice-7fac0.firebasestorage.app',
  messagingSenderId: '200027552536',
  appId: '1:200027552536:web:vgenglish',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  const idToken = await result.user.getIdToken();
  return {
    idToken,
    email: result.user.email,
    displayName: result.user.displayName,
    photoURL: result.user.photoURL,
    uid: result.user.uid,
  };
}

export async function firebaseSignOut() {
  await signOut(auth);
}

export { auth };
