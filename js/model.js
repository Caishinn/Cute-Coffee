document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("menuModal");
  const overlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("closeModal");
  const cancelBtn = document.getElementById("cancelModal");
  const addButtons = document.querySelectorAll(".add-btn");
  const modalTitle = document.getElementById("modalTitle");
  const modalImage = document.getElementById("modalImage");

  function openModal() {
    modal.style.display = "block";
    overlay.style.display = "block";
    document.body.classList.add("no-scroll"); // 🚫 Disable scroll
  }

  function closeModal() {
    modal.style.display = "none";
    overlay.style.display = "none";
    document.body.classList.remove("no-scroll"); // ✅ Enable scroll
  }

  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".menu-item");
      const name = item.querySelector("h3").textContent;
      const imgSrc = item.querySelector("img").src;

      modalTitle.textContent = name;
      modalImage.src = imgSrc;

      openModal();
    });
  });

  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
});
