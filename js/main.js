const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");
const overlay = document.getElementById("overlay");

// Open sidebar
hamburger.addEventListener("click", () => {
  mobileMenu.classList.add("open");
  overlay.classList.add("active");
});

// Close with × button
closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
  overlay.classList.remove("active");
});

// Close when clicking overlay
overlay.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
  overlay.classList.remove("active");
});
