const users = {
  "aritendry@orion.com": "1234",
  "jonah@orion.com": "1234",
  "eliace@orion.com": "1234",
  "sitraka@orion.com": "1234",
  "romeo@orion.com": "1234",
  "administration@orion.com": "admin-admin"
};
const roles = {
  "aritendry@orion.com": "user",
  "jonah@orion.com": "prof",
  "eliace@orion.com": "user",
  "sitraka@orion.com": "prof",
  "romeo@orion.com": "user",
  "administration@orion.com": "admin"
};

function login() {
  const email = document.getElementById("email")?.value;
  const pass = document.getElementById("password")?.value;
  const error = document.getElementById("error");

  if (users[email] && users[email] === pass) {
    localStorage.setItem("user", email);
    window.location.href = "dashboard.html";
  } else {
    if (error) error.innerText = "Prière de demander une validation de votre adresse e-mail à l'administrateur de ce site. Merci pour votre compréhension!";
  }
}
function checkAuth() {
  if (!localStorage.getItem("user")) {
    window.location.href = "index.html";
  }
}

document.getElementById("email")?.addEventListener("keydown", function(e){
  if(e.key === "Enter") login();
});
document.getElementById("password")?.addEventListener("keydown", function(e){
  if(e.key === "Enter") login();
});
document.getElementById("messageInput")?.addEventListener("keydown", function(e){
  if(e.key === "Enter" && !e.shiftKey) { 
    e.preventDefault(); 
    envoyerMessage();
  }
});

function showPopup(message) {
  const popup = document.getElementById("popupNotif");
  popup.innerText = message;
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 2000); 
}
function envoyerMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if(!text) return alert("Le message est vide !");

  const notifs = getNotifications();
  notifs.push({ text, date: new Date().toLocaleString() });
  saveNotifications(notifs);
  input.value = "";
  displayNotifications();
  showPopup("Message envoyé ");
}
function editNotification(index) {
  const notifs = getNotifications();
  const newText = prompt("Modifier le message :", notifs[index].text);
  if(newText !== null) {
    notifs[index].text = newText;
    saveNotifications(notifs);
    displayNotifications();
    showPopup("Message modifié ");
  }
}

function deleteNotification(index) {
  if(confirm("Voulez-vous vraiment supprimer ce message ?")) {
    const notifs = getNotifications();
    notifs.splice(index, 1);
    saveNotifications(notifs);
    displayNotifications();
    showPopup("Message supprimé ");
  }
}
function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}
function showNotifForm() {
  const user = localStorage.getItem("user");
  const role = roles[user];
  const adminSection = document.getElementById("adminSection");
  if(role === "admin" || role === "prof") adminSection.classList.remove("hidden");
}
function getNotifications() {
  return JSON.parse(localStorage.getItem("notifications") || "[]");
}

function saveNotifications(notifs) {
  localStorage.setItem("notifications", JSON.stringify(notifs));
}

function displayNotifications() {
  const messagesList = document.getElementById("messagesList");
  const user = localStorage.getItem("user");
  const role = roles[user];
  const notifs = getNotifications();

  messagesList.innerHTML = "";
  notifs.forEach((notif, index) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <p>${notif.text}</p>
      <small>${notif.date}</small>
      ${role === "admin" || role === "prof" ? `
        <button class="btn" onclick="editNotification(${index})">Modifier</button>
        <button class="btn" onclick="deleteNotification(${index})">Supprimer</button>
      ` : ""}
    `;
    messagesList.appendChild(div);
  });
}

function envoyerMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if(!text) return alert("Le message est vide !");
  const notifs = getNotifications();
  notifs.push({ text, date: new Date().toLocaleString() });
  saveNotifications(notifs);
  input.value = "";
  displayNotifications();
}

function editNotification(index) {
  const notifs = getNotifications();
  const newText = prompt("Modifier le message :", notifs[index].text);
  if(newText !== null) {
    notifs[index].text = newText;
    saveNotifications(notifs);
    displayNotifications();
  }
}

function deleteNotification(index) {
  if(confirm("Voulez-vous vraiment supprimer ce message ?")) {
    const notifs = getNotifications();
    notifs.splice(index, 1);
    saveNotifications(notifs);
    displayNotifications();
  }
}

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  const el = document.getElementById(id);
  if(el) el.classList.add("active");
}

function loadChart() {
  const ctx = document.getElementById('progressChart');
  if(!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Développement web', 'IA & Robotique', 'Réseaux', 'Cybersécurité'],
      datasets: [{
        label: 'Progression %',
        data: [80, 60, 90, 75],
        backgroundColor: ['#1877f2', '#ffcc00', '#4caf50', '#e91e63']
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById('loginForm');
  if(loginForm) {
    loginForm.addEventListener('submit', e => { e.preventDefault(); login(); });
  }

  if(window.location.pathname.includes("dashboard.html")) {
    checkAuth();
    loadChart();
    showSection("publications");
    showNotifForm();
    displayNotifications();
  }
});
