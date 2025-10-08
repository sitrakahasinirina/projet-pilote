document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const filiereModal = document.getElementById("filiereModal");
  const filiereBtns = document.querySelectorAll(".filiere-btn");
  const filiereCancel = document.getElementById("filiereCancel");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      let valid = false;

      if (email === "admin@orion.com" && password === "administration") {
        localStorage.setItem("user", email);
        localStorage.setItem("role", "admin");
        valid = true;
      }

      for (let i = 1; i <= 10; i++) {
        if (email === `prof${i}@orion.com` && password === "Professeur") {
          localStorage.setItem("user", email);
          localStorage.setItem("role", "prof");
          valid = true;
        }
      }

      if (
        (email === "aritendry@orion.com" && password === "utilisateur") ||
        (email === "eliace@orion.com" && password === "utilisateur")
      ) {
        localStorage.setItem("user", email);
        localStorage.setItem("role", "utilisateur");
        valid = true;
      }

      for (let i = 1; i <= 10; i++) {
        if (email === `utilisateur${i}@orion.com` && password === "utilisateur") {
          localStorage.setItem("user", email);
          localStorage.setItem("role", "utilisateur");
          valid = true;
        }
      }

      if (valid) {
        checkFiliere();
      } else {
        alert(
          "Veuillez vous renseigner auprès de l'administrateur pour obtenir une identifiant autorisé sur ce plateforme"
        );
      }
    });
  }

  if (filiereCancel) {
    filiereCancel.addEventListener("click", () => {
      filiereModal.style.display = "none";
    });
  }

  filiereBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filiere = btn.getAttribute("data-filiere");
      localStorage.setItem("filiere", filiere);
      window.location.href = "dashboard.html";
    });
  });

  function checkFiliere() {
    const filiere = localStorage.getItem("filiere");
    if (!filiere) {
      filiereModal.style.display = "block";
    } else {
      window.location.href = "dashboard.html";
    }
  }

  const header = document.getElementById("mainHeader");
  if (header) {
    const filiere = localStorage.getItem("filiere");
    if (filiere && filiere.includes("Informatique")) {
      header.textContent = "Orion University - Cours en Ligne";
    }
  }

  const dashboardFiliere = document.getElementById("dashboardFiliere");
  if (dashboardFiliere) {
    const filiere = localStorage.getItem("filiere");
    if (filiere) {
      dashboardFiliere.textContent = `Filière : ${filiere}`;
      if (filiere.includes("Informatique")) {
        document.getElementById("dashboardTitle").textContent =
          "Orion University - Cours en Ligne";
      }
    }
  }
});