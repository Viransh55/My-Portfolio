document.addEventListener("DOMContentLoaded", function () {
  // ===== Initialize AOS =====
  if (typeof AOS !== "undefined") AOS.init();

  // ===== Initialize Typed.js =====
  if (typeof Typed !== "undefined") {
    new Typed("#typed-text", {
      strings: ["Frontend Developer", "Embedded Systems Enthusiast", "Tech Explorer"],
      typeSpeed: 40,
      backSpeed: 20,
      loop: true
    });
  }

  // ===== Dark Mode Toggle =====
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
    darkModeToggle.textContent = "☀️";
  }

  darkModeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    darkModeToggle.textContent = isDark ? "☀️" : "🌙";
  });

  // ===== Sidebar Toggle =====
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");
  sidebarToggle?.addEventListener("click", () => sidebar.classList.toggle("active"));

  // ===== Auto-close Sidebar =====
  document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768 && sidebar.classList.contains("active")) {
        sidebar.classList.remove("active");
      }
    });
  });

  // ===== EmailJS Integration =====
  if (typeof emailjs !== "undefined") {
    emailjs.init("ryoL--ae-9h5n5cFu");

    const hireForm = document.getElementById("hireForm");
    const statusMessage = document.getElementById("statusMessage");

    hireForm?.addEventListener("submit", function (event) {
      event.preventDefault();

      emailjs.sendForm("service_ib1au58", "template_uusuwml", this)
        .then(() => {
          statusMessage.textContent = "✅ Message sent successfully!";
          hireForm.reset();
        })
        .catch((error) => {
          statusMessage.textContent = "❌ Failed to send message. Try again.";
          console.error("EmailJS Error:", error);
        });
    });
  }
});
