document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuItems = document.querySelectorAll(".menu-item");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from previously active button
      document.querySelector(".filter-btn.active")?.classList.remove("active");
      btn.classList.add("active");

      const category = btn.dataset.category;

      menuItems.forEach((item) => {
        const categories = item.dataset.category.split(" ");

        if (category === "all" || categories.includes(category)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
  const searchInput = document.getElementById("menuSearchInput");
  const clearSearch = document.getElementById("clearSearch");

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.trim();
    clearSearch.style.display = value ? "inline" : "none";

    document.querySelectorAll(".menu-item").forEach((item) => {
      const name = item.querySelector("h3").textContent.toLowerCase();
      item.style.display = name.includes(value.toLowerCase())
        ? "block"
        : "none";
    });
  });

  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    clearSearch.style.display = "none";

    document.querySelectorAll(".menu-item").forEach((item) => {
      item.style.display = "block";
    });

    searchInput.focus();
  });
});
