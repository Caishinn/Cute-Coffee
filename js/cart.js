document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const cartIcon = document.querySelector(".fa-shopping-cart");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  const closeCartBtn = document.getElementById("closeCart");
  const addToCartBtn = document.querySelector(".confirm-btn");
  const cartItemsContainer = document.getElementById("cartItems");

  const modal = document.getElementById("menuModal");
  const overlay = document.getElementById("modalOverlay");

  // Open cart drawer
  function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("show");
    document.body.classList.add("no-scroll");
  }

  // Close cart drawer
  function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
  }

  // Handle Add to Cart from Modal
  addToCartBtn.addEventListener("click", () => {
    const itemName = document.getElementById("modalTitle").textContent;
    const itemImage = document.getElementById("modalImage").src;
    const sugar = document.querySelector('input[name="sugar"]:checked').value;
    const size = document.querySelector('input[name="size"]:checked').value;
    const quantity = parseInt(document.getElementById("qtyValue").textContent);

    // Remove empty message if present
    const emptyMsg = cartItemsContainer.querySelector(".empty-msg");
    if (emptyMsg) emptyMsg.remove();

    // Check if same item already exists
    const existingItems = cartItemsContainer.querySelectorAll(".cart-item");
    let itemFound = false;

    existingItems.forEach((item) => {
      const name = item.querySelector("h4").textContent;
      const options = item.querySelector("p").textContent;

      if (
        name === itemName &&
        options.includes(`Size: ${size}`) &&
        options.includes(`Sugar: ${sugar}`)
      ) {
        const qtyElement = item.querySelectorAll("p")[1];
        const currentQty = parseInt(
          qtyElement.textContent.replace("Qty: ", "")
        );
        qtyElement.textContent = `Qty: ${currentQty + quantity}`;
        itemFound = true;
      }
    });

    if (!itemFound) {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <div class="cart-item-img">
          <img src="${itemImage}" alt="${itemName}" />
        </div>
        <div class="cart-item-details">
          <h4>${itemName}</h4>
          <p>Size: ${size} | Sugar: ${sugar}</p>
          <p>Qty: ${quantity}</p>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    }

    // Close modal
    modal.style.display = "none";
    overlay.style.display = "none";
    document.body.classList.remove("no-scroll");

    // Open cart drawer
    openCart();
  });

  // Events
  cartIcon.addEventListener("click", openCart);
  closeCartBtn.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);
});
