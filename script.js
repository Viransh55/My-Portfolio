document.addEventListener("DOMContentLoaded", function () {
  // ===== Initialize AOS =====
 if (typeof AOS !== "undefined") {
  AOS.init({
    once: true, // animation happens only once
    offset: 100, // starts animation before fully visible
    duration: 600, // smoother animation
    easing: "ease-out-cubic" // gentle motion
  });
}

  // ===== Initialize Typed.js =====
  if (typeof Typed !== "undefined") {
    new Typed("#typed-text", {
      strings: [
        "Frontend Developer",
        "Electrical & Computer Science Engineer",
        "IoT & Embedded Systems Enthusiast"
      ],
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

  // ===== Auto-close Sidebar on Link Click (Mobile) =====
  document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768 && sidebar.classList.contains("active")) {
        sidebar.classList.remove("active");
      }
    });
  });

  // ===== Active Link Highlight on Scroll =====
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".sidebar a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 60;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // ===== Back to Top Button =====
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });
  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ===== Smooth Scroll for Sidebar Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
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
