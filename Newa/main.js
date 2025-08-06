import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, onSnapshot, query, orderBy, deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import {
  getAuth, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase config (replace with yours)
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
const db = getFirestore(app);
const auth = getAuth(app);

const newsForm = document.getElementById("newsForm");
const newsGrid = document.getElementById("newsGrid");
const adminPanel = document.getElementById("adminPanel");
const logoutBtn = document.getElementById("logoutBtn");
const loginLink = document.getElementById("loginLink");
const searchInput = document.getElementById("searchInput");

let currentUser = null;

// Check auth state
onAuthStateChanged(auth, user => {
  currentUser = user;
  if (user) {
    loginLink.style.display = "none";
    logoutBtn.classList.remove("hidden");
    adminPanel.classList.remove("hidden");
  } else {
    loginLink.style.display = "inline-block";
    logoutBtn.classList.add("hidden");
    adminPanel.classList.add("hidden");
  }
});

logoutBtn.addEventListener("click", () => {
  signOut(auth);
});

// Post news
if (newsForm) {
  newsForm.addEventListener("submit", async e => {
    e.preventDefault();
    const title = document.getElementById("newsTitle").value;
    const content = document.getElementById("newsContent").value;
    const image = document.getElementById("newsImage").value;
    await addDoc(collection(db, "news"), {
      title,
      content,
      image,
      date: Date.now(),
      uid: currentUser.uid
    });
    newsForm.reset();
  });
}

// Load news and render
function renderNews(data) {
  const search = searchInput.value.toLowerCase();
  newsGrid.innerHTML = "";
  data.forEach(docSnap => {
    const news = docSnap.data();
    const id = docSnap.id;
    if (!news.title.toLowerCase().includes(search)) return;

    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <img src="${news.image}" alt="News Image" />
      <h3>${news.title}</h3>
      <p>${news.content}</p>
      <small>${new Date(news.date).toLocaleString()}</small>
    `;

    if (currentUser && currentUser.uid === news.uid) {
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.onclick = async () => {
        await deleteDoc(doc(db, "news", id));
      };
      card.appendChild(delBtn);
    }

    newsGrid.appendChild(card);
  });
}

onSnapshot(query(collection(db, "news"), orderBy("date", "desc")), renderNews);
searchInput.addEventListener("input", () => {
  getDocs(query(collection(db, "news"), orderBy("date", "desc"))).then(renderNews);
});
