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

  // 🔍 Search functionality
  const searchInput = document.getElementById("menuSearchInput");
  const menuItems = document.querySelectorAll(".menu-item");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const value = searchInput.value.toLowerCase().trim();
      menuItems.forEach((item) => {
        const name = item.querySelector("h3")?.textContent.toLowerCase();
        item.style.display = name.includes(value) ? "block" : "none";
      });
    });
  } else {
    console.warn("menuSearchInput not found");
  }
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("menuSearchInput");

    searchInput?.addEventListener("input", function () {
      const value = searchInput.value.toLowerCase().trim();

      const menuItems = document.querySelectorAll(".menu-item");

      menuItems.forEach((item) => {
        const name = item.querySelector("h3")?.textContent.toLowerCase();
        const matches = name?.includes(value);
        item.style.display = matches ? "block" : "none";
      });
    });
  });
});
