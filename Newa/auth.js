import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// ✅ Firebase config (use your actual Firebase config here)
const firebaseConfig = {
  apiKey: "AIzaSyCZyRLn4_lGtbXinkRiMxgJRCzLg4jsu9k",
  authDomain: "king-kingdom.firebaseapp.com",
  projectId: "king-kingdom",
  storageBucket: "king-kingdom.firebasestorage.app",
  messagingSenderId: "464000013975",
  appId: "1:464000013975:web:ccf382b95f8fcbaee6fbd2",
  measurementId: "G-KRV6JZYQBW"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Get the form
const form = document.getElementById("authForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // ✅ Fix: Use correct IDs from HTML
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    // ✅ Redirect if login successful
    window.location.href = "index.html";
  } catch (err) {
    // Optional: Try to register instead
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = "index.html";
    } catch (registerErr) {
      alert("Login failed: " + registerErr.message);
    }
  }
});
