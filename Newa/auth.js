import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCZyRLn4_lGtbXinkRiMxgJRCzLg4jsu9k",
  authDomain: "king-kingdom.firebaseapp.com",
  projectId: "king-kingdom",
  storageBucket: "king-kingdom.firebasestorage.app",
  messagingSenderId: "464000013975",
  appId: "1:464000013975:web:ccf382b95f8fcbaee6fbd2",
  measurementId: "G-KRV6JZYQBW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Only allow admin login
const ADMIN_EMAILS = [
  "mohamadanime012@gmail.com",
  "abanobh53@gmail.com",
  "admin3@example.com"
];

// login submit
document.getElementById("authForm").addEventListener("submit", async e => {
  e.preventDefault();

  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // Only allow login if email is in the admin list
  if (!ADMIN_EMAILS.includes(email)) {
    alert("فقط المشرفين الذين يمكنهم تسجيل الدخول.");
    return;
  }

  // See if there any errors in login
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "index.html";
  } catch (error) {
    console.error("فشل التسجيل:", error.message);
    alert("خطأ في البريد أو كلمة المرور الخاصة بك.");
  }
});
