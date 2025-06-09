const cart = [];

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("menuModal");
  const overlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("closeModal");
  const cancelBtn = document.getElementById("cancelModal");
  const addButtons = document.querySelectorAll(".add-btn");
  const modalTitle = document.getElementById("modalTitle");
  const modalImage = document.getElementById("modalImage");
  const addToCartBtn = document.querySelector(".confirm-btn");

  const qtyValue = document.getElementById("qtyValue");
  const increaseBtn = document.getElementById("increaseQty");
  const decreaseBtn = document.getElementById("decreaseQty");

  function openModal() {
    modal.style.display = "block";
    overlay.style.display = "block";
    document.body.classList.add("no-scroll");
    qtyValue.textContent = "1";
    qtyValue.setAttribute("contenteditable", "false");
  }

  function closeModal() {
    modal.style.display = "none";
    overlay.style.display = "none";
    document.body.classList.remove("no-scroll");
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

  // Quantity controls
  increaseBtn.addEventListener("click", () => {
    let current = parseInt(qtyValue.textContent);
    qtyValue.textContent = current + 1;
  });

  decreaseBtn.addEventListener("click", () => {
    let current = parseInt(qtyValue.textContent);
    if (current > 1) {
      qtyValue.textContent = current - 1;
    }
  });

  // Enable manual typing
  qtyValue.addEventListener("click", () => {
    qtyValue.setAttribute("contenteditable", "true");
    qtyValue.focus();
  });

  qtyValue.addEventListener("blur", () => {
    let val = parseInt(qtyValue.textContent);
    if (isNaN(val) || val < 1) val = 1;
    qtyValue.textContent = val;
    qtyValue.removeAttribute("contenteditable");
  });

  qtyValue.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      qtyValue.blur();
    }
  });

  // Add to cart
  addToCartBtn.addEventListener("click", () => {
    const itemName = modalTitle.textContent;
    const itemImage = modalImage.src;
    const sugar =
      document.querySelector('input[name="sugar"]:checked')?.value || "normal";
    const size =
      document.querySelector('input[name="size"]:checked')?.value || "M";
    const quantity = parseInt(qtyValue.textContent);

    const cartItem = {
      name: itemName,
      image: itemImage,
      sugar,
      size,
      quantity,
    };

    cart.push(cartItem);
    console.log("✅ Item added to cart:", cartItem);
    console.log("🛒 Cart contents:", cart);

    closeModal();
  });
});
