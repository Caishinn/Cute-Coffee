document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".fa-shopping-cart");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  const closeCartBtn = document.getElementById("closeCart");
  const addToCartBtn = document.querySelector(".confirm-btn");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");

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
      const qtyElem = existingItem.querySelector(".qty-display");
      const priceElem = existingItem.querySelector(".total-display");
      const currentQty = parseInt(qtyElem.textContent);
      const newQty = currentQty + quantity;
      qtyElem.textContent = newQty;
      priceElem.textContent = `Total: $${(itemPrice * newQty).toFixed(2)}`;
    } else {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <div class="cart-item-img">
          <img src="${itemImage}" alt="${itemName}" />
        </div>
        <div class="cart-item-details">
          <h4>${itemName}</h4>
          <p>Size: ${size} | Sugar: ${sugar}</p>
        
          <p class="total-display">Total: $${totalPrice}</p>
            <div class="qty-control">
            <button class="decrease-btn">−</button>
            <span class="qty-display">${quantity}</span>
            <button class="increase-btn">+</button>
            <button class="remove-btn">Remove</button>
          </div>
          
        </div>
      `;

      const emptyMsg = cartItemsContainer.querySelector(".empty-msg");
      if (emptyMsg) emptyMsg.remove();
      cartItemsContainer.appendChild(cartItem);

      // Remove functionality
      cartItem.querySelector(".remove-btn").addEventListener("click", () => {
        cartItem.remove();
        updateCartCount();
        updateCartTotal();
        showEmptyMessageIfNeeded();
      });

      // Quantity buttons
      const qtyDisplay = cartItem.querySelector(".qty-display");
      const increaseBtn = cartItem.querySelector(".increase-btn");
      const decreaseBtn = cartItem.querySelector(".decrease-btn");
      const totalElem = cartItem.querySelector(".total-display");

      increaseBtn.addEventListener("click", () => {
        let qty = parseInt(qtyDisplay.textContent);
        qty++;
        qtyDisplay.textContent = qty;
        totalElem.textContent = `Total: $${(itemPrice * qty).toFixed(2)}`;
        updateCartCount();
        updateCartTotal();
      });

      decreaseBtn.addEventListener("click", () => {
        let qty = parseInt(qtyDisplay.textContent);
        if (qty > 1) {
          qty--;
          qtyDisplay.textContent = qty;
          totalElem.textContent = `Total: $${(itemPrice * qty).toFixed(2)}`;
          updateCartCount();
          updateCartTotal();
        }
      });
    }

    updateCartCount();
    updateCartTotal();

    modal.style.display = "none";
    overlay.style.display = "none";
    document.body.classList.remove("no-scroll");
  });

  cartIcon.addEventListener("click", openCart);
  closeCartBtn.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  // Update cart count
  function updateCartCount() {
    const items = cartItemsContainer.querySelectorAll(".cart-item");
    let total = 0;
    items.forEach((item) => {
      const qtyText = item.querySelector(".qty-display")?.textContent || "0";
      const qty = parseInt(qtyText, 10);
      total += qty;
    });
    cartCount.textContent = total;
  }

  // Update total price
  function updateCartTotal() {
    const items = cartItemsContainer.querySelectorAll(".cart-item");
    let total = 0;
    items.forEach((item) => {
      const priceText = item.querySelector(".total-display")?.textContent || "";
      const match = priceText.match(/\$([0-9.]+)/);
      const price = match ? parseFloat(match[1]) : 0;
      total += price;
    });
    const cartTotal = document.getElementById("cartTotal");
    if (cartTotal) cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Show empty message
  function showEmptyMessageIfNeeded() {
    if (cartItemsContainer.children.length === 0) {
      const msg = document.createElement("p");
      msg.classList.add("empty-msg");
      msg.textContent = "Your cart is empty.";
      cartItemsContainer.appendChild(msg);
    }
  }

  // Clear all button
  const clearBtn = document.getElementById("clearCartBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      cartItemsContainer.innerHTML = "";
      updateCartCount();
      updateCartTotal();
      showEmptyMessageIfNeeded();
    });
  }
});

// Checkout handler
document.getElementById("checkoutBtn").addEventListener("click", () => {
  const cartItems = [];
  document.querySelectorAll(".cart-item").forEach((item) => {
    const name = item.querySelector("h4").textContent;
    const details = item.querySelector("p").textContent;
    const qty = parseInt(item.querySelector(".qty-display").textContent);
    const totalText = item.querySelector(".total-display").textContent;
    const total = parseFloat(totalText.replace("Total: $", ""));

    // Safe size/sugar parse
    let size = "Unknown";
    let sugar = "Unknown";

    const matches = details.match(/Size:\s*(.*?)\s*\|\s*Sugar:\s*(.*)/);
    if (matches) {
      size = matches[1];
      sugar = matches[2];
    }

    cartItems.push({
      name,
      qty,
      size,
      sugar,
      price: total / qty,
      total: `$${total.toFixed(2)}`,
    });
  });

  localStorage.setItem("cartSummary", JSON.stringify(cartItems));
  window.location.href = "summary.html";
});
