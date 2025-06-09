// Cart array to hold items
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

  let quantity = 1;

  function openModal() {
    modal.style.display = "block";
    overlay.style.display = "block";
    document.body.classList.add("no-scroll");
    quantity = 1;
    qtyValue.textContent = quantity;
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
    quantity++;
    qtyValue.textContent = quantity;
  });

  decreaseBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      qtyValue.textContent = quantity;
    }
  });

  // ✅ Add to Cart Button
  addToCartBtn.addEventListener("click", () => {
    const itemName = modalTitle.textContent;
    const itemImage = modalImage.src;
    const sugar = document.querySelector('input[name="sugar"]:checked').value;
    const size = document.querySelector('input[name="size"]:checked').value;

    const cartItem = {
      name: itemName,
      image: itemImage,
      sugar: sugar,
      size: size,
      quantity: quantity,
    };

    // Store in array (can change to localStorage later)
    cart.push(cartItem);
    console.log("✅ Item added to cart:", cartItem);
    console.log("🛒 Current cart:", cart);

    closeModal();
  });
});
