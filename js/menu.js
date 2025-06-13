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
});
