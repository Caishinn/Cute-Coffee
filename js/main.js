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

// zoom disable

let lastTouch = 0;
document.addEventListener(
  "touchstart",
  (e) => {
    const now = Date.now();
    if (now - lastTouch <= 300) {
      e.preventDefault(); // prevent double-tap zoom
    }
    lastTouch = now;
  },
  { passive: false }
);

// Optional: Add shadow effect if scrollable
const summaryWrapper = document.querySelector(".summary-list-wrapper");
summaryWrapper.addEventListener("scroll", () => {
  summaryWrapper.style.boxShadow =
    summaryWrapper.scrollTop > 0
      ? "inset 0 8px 8px -8px rgba(0,0,0,0.1)"
      : "none";
});
