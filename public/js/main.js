document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = document.getElementById("closeMenu");
  const overlay = document.getElementById("overlay");

  // Sidebar controls
  hamburger?.addEventListener("click", () => {
    mobileMenu?.classList.add("open");
    overlay?.classList.add("active");
  });

  closeMenu?.addEventListener("click", () => {
    mobileMenu?.classList.remove("open");
    overlay?.classList.remove("active");
  });

  overlay?.addEventListener("click", () => {
    mobileMenu?.classList.remove("open");
    overlay?.classList.remove("active");
  });

  // Disable zoom on double tap
  let lastTouch = 0;
  document.addEventListener(
    "touchstart",
    (e) => {
      const now = Date.now();
      if (now - lastTouch <= 300) e.preventDefault();
      lastTouch = now;
    },
    { passive: false }
  );

  // Shadow on scroll
  const summaryWrapper = document.querySelector(".summary-list-wrapper");
  summaryWrapper?.addEventListener("scroll", () => {
    summaryWrapper.style.boxShadow =
      summaryWrapper.scrollTop > 0
        ? "inset 0 8px 8px -8px rgba(0,0,0,0.1)"
        : "none";
  });
});

// Animation

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

document.querySelector(".logo").addEventListener("click", () => {
  window.location.href = "index.html";
});
