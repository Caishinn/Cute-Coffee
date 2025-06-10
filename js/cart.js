document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".fa-shopping-cart");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  const closeCartBtn = document.getElementById("closeCart");
  const addToCartBtn = document.querySelector(".confirm-btn");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount"); // 🟡 Added

  const modal = document.getElementById("menuModal");
  const overlay = document.getElementById("modalOverlay");

  let selectedPrice = 0;

  document.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const menuItem = e.target.closest(".menu-item");
      const priceText = menuItem.querySelector(".menu-footer p").textContent;
      selectedPrice = parseFloat(priceText.replace("$", "")) || 0;
    });
  });

  function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("show");
    document.body.classList.add("no-scroll");
  }

  function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
  }

  addToCartBtn.addEventListener("click", () => {
    const itemName = document.getElementById("modalTitle").textContent;
    const itemImage = document.getElementById("modalImage").src;
    const sugar = document.querySelector('input[name="sugar"]:checked').value;

    const size = document.querySelector('input[name="size"]:checked').value;
    const quantity = parseInt(document.getElementById("qtyValue").textContent);

    let itemPrice = selectedPrice;
    if (size === "M") {
      itemPrice += 1.0;
    }

    const totalPrice = (itemPrice * quantity).toFixed(2);

    // 🟡 Check if item already exists
    const existingItem = Array.from(
      cartItemsContainer.querySelectorAll(".cart-item")
    ).find((item) => {
      const title = item.querySelector("h4").textContent;
      const desc = item.querySelector("p").textContent;
      return (
        title === itemName &&
        desc.includes(`Size: ${size}`) &&
        desc.includes(`Sugar: ${sugar}`)
      );
    });

    if (existingItem) {
      // 🟡 Update quantity and total price
      const qtyElem = existingItem.querySelector("p:nth-of-type(2)");
      const priceElem = existingItem.querySelector("p:nth-of-type(3)");
      const currentQty = parseInt(qtyElem.textContent.replace("Qty: ", ""));
      const newQty = currentQty + quantity;
      qtyElem.textContent = `Qty: ${newQty}`;
      priceElem.textContent = `Total: $${(itemPrice * newQty).toFixed(2)}`;
    } else {
      // 🟢 New item
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
          <p>Total: $${totalPrice}</p>
        </div>
      `;
      const emptyMsg = cartItemsContainer.querySelector(".empty-msg");
      if (emptyMsg) emptyMsg.remove();
      cartItemsContainer.appendChild(cartItem);
    }

    updateCartCount(); // ✅ make sure cart count updates

    // Close modal
    modal.style.display = "none";
    overlay.style.display = "none";
    document.body.classList.remove("no-scroll");
  });

  cartIcon.addEventListener("click", openCart);
  closeCartBtn.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  // 🟡 Function to update cart count
  function updateCartCount() {
    const items = cartItemsContainer.querySelectorAll(".cart-item");
    let total = 0;
    items.forEach((item) => {
      const qtyText = item.querySelector("p:nth-of-type(2)")?.textContent || "";
      const match = qtyText.match(/Qty:\s*(\d+)/);
      const qty = match ? parseInt(match[1], 10) : 0;
      total += qty;
    });
    cartCount.textContent = total;
  }
});
