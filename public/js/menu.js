document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("menuSearchInput");
  const clearSearch = document.getElementById("clearSearch");
  const menuItems = document.querySelectorAll(".menu-item");

  let currentCategory = "all";

  // Function to update visible items based on search and category
  function updateMenuItems() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    menuItems.forEach((item) => {
      const title = item.querySelector("h3").textContent.toLowerCase();
      const categories = item.dataset.category.split(" ");
      const matchesCategory =
        currentCategory === "all" || categories.includes(currentCategory);
      const matchesSearch = title.includes(searchTerm);

      item.style.display = matchesCategory && matchesSearch ? "block" : "none";
    });

    // Toggle clear search button
    clearSearch.style.display = searchTerm ? "inline" : "none";
  }

  // Handle filter button clicks
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      currentCategory = button.dataset.category;
      updateMenuItems();
    });
  });

  // Handle search input typing
  searchInput.addEventListener("input", updateMenuItems);

  // Clear search button logic
  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    updateMenuItems();
    searchInput.focus();
  });

  // Initialize on page load
  updateMenuItems();
});
