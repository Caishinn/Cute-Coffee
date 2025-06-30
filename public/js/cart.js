document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".fa-shopping-cart");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  const closeCartBtn = document.getElementById("closeCart");
  const addToCartBtn = document.querySelector(".confirm-btn");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const clearBtn = document.getElementById("clearCartBtn");

  const modal = document.getElementById("menuModal");
  const overlay = document.getElementById("modalOverlay");

  let selectedPrice = 0;
  let selectedPromo = "None";

  document.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const menuItem = e.target.closest(".menu-item");
      selectedPrice = parseFloat(menuItem.dataset.price);
      selectedPromo = menuItem.dataset.promo || "None";
    });
  });

  function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("show");
    document.body.classList.add("no-scroll");
    updateCartTotal();
  }

  function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
  }

  function updateCartCount() {
    const items = cartItemsContainer.querySelectorAll(".cart-item");
    let total = 0;
    items.forEach((item) => {
      total += parseInt(item.querySelector(".qty-display").textContent);
    });
    cartCount.textContent = total;
  }

  function updateCartTotal() {
    const items = cartItemsContainer.querySelectorAll(".cart-item");
    let total = 0;
    items.forEach((item) => {
      const priceText = item.querySelector(".total-display").textContent;
      const match = priceText.match(/\$([0-9.]+)/);
      total += match ? parseFloat(match[1]) : 0;
    });
    document.getElementById("cartTotal").textContent = `Total: $${total.toFixed(
      2
    )}`;
  }

  function showEmptyMessageIfNeeded() {
    if (cartItemsContainer.children.length === 0) {
      const msg = document.createElement("p");
      msg.classList.add("empty-msg");
      msg.textContent = "Your cart is empty.";
      cartItemsContainer.appendChild(msg);
    }
  }

  addToCartBtn.addEventListener("click", () => {
    const itemName = document.getElementById("modalTitle").textContent;
    const itemImage = document.getElementById("modalImage").src;
    const sugar = document.querySelector('input[name="sugar"]:checked').value;
    const size = document.querySelector('input[name="size"]:checked').value;
    const quantity = parseInt(document.getElementById("qtyValue").textContent);

    let itemPrice = selectedPrice;
    if (size === "M") itemPrice += 1.0;

    let subtotal = itemPrice * quantity;

    if (selectedPromo.includes("%")) {
      const percent = parseInt(selectedPromo);
      subtotal = subtotal * ((100 - percent) / 100);
    }

    const existingItem = Array.from(
      cartItemsContainer.querySelectorAll(".cart-item")
    ).find((item) => {
      return (
        item.querySelector("h4").textContent === itemName &&
        item.querySelector("p").textContent.includes(`Size: ${size}`) &&
        item.querySelector("p").textContent.includes(`Sugar: ${sugar}`) &&
        item.querySelector("p").textContent.includes(`Promo: ${selectedPromo}`)
      );
    });

    if (existingItem) {
      const qtyElem = existingItem.querySelector(".qty-display");
      const priceElem = existingItem.querySelector(".total-display");
      const currentQty = parseInt(qtyElem.textContent);
      const newQty = currentQty + quantity;

      let newSubtotal = itemPrice * newQty;
      if (selectedPromo.includes("%")) {
        const percent = parseInt(selectedPromo);
        newSubtotal = newSubtotal * ((100 - percent) / 100);
      }

      qtyElem.textContent = newQty;
      priceElem.textContent = `Total: $${newSubtotal.toFixed(2)}`;
    } else {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <div class="cart-item-img">
          <img src="${itemImage}" alt="${itemName}" />
        </div>
        <div class="cart-item-details">
          <h4>${itemName}</h4>
          <p>Size: ${size} | Sugar: ${sugar} | Promo: ${selectedPromo}</p>
          <p class="total-display">Total: $${subtotal.toFixed(2)}</p>
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

      // Quantity Buttons
      const qtyDisplay = cartItem.querySelector(".qty-display");
      const increaseBtn = cartItem.querySelector(".increase-btn");
      const decreaseBtn = cartItem.querySelector(".decrease-btn");
      const totalElem = cartItem.querySelector(".total-display");

      increaseBtn.addEventListener("click", () => {
        let qty = parseInt(qtyDisplay.textContent);
        qty++;
        qtyDisplay.textContent = qty;
        let newSubtotal = itemPrice * qty;
        if (selectedPromo.includes("%")) {
          const percent = parseInt(selectedPromo);
          newSubtotal = newSubtotal * ((100 - percent) / 100);
        }
        totalElem.textContent = `Total: $${newSubtotal.toFixed(2)}`;
        updateCartCount();
        updateCartTotal();
      });

      decreaseBtn.addEventListener("click", () => {
        let qty = parseInt(qtyDisplay.textContent);
        if (qty > 1) {
          qty--;
          qtyDisplay.textContent = qty;
          let newSubtotal = itemPrice * qty;
          if (selectedPromo.includes("%")) {
            const percent = parseInt(selectedPromo);
            newSubtotal = newSubtotal * ((100 - percent) / 100);
          }
          totalElem.textContent = `Total: $${newSubtotal.toFixed(2)}`;
          updateCartCount();
          updateCartTotal();
        }
      });

      cartItem.querySelector(".remove-btn").addEventListener("click", () => {
        cartItem.remove();
        updateCartCount();
        updateCartTotal();
        showEmptyMessageIfNeeded();
      });
    }

    updateCartCount();
    updateCartTotal();
    modal.style.display = "none";
    overlay.style.display = "none";
    document.body.classList.remove("no-scroll");
  });

  clearBtn.addEventListener("click", () => {
    cartItemsContainer.innerHTML = "";
    updateCartCount();
    updateCartTotal();
    localStorage.removeItem("cartSummary");
    showEmptyMessageIfNeeded();
  });

  cartIcon.addEventListener("click", openCart);
  closeCartBtn.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  document.getElementById("checkoutBtn").addEventListener("click", () => {
    const cartItems = [];
    document.querySelectorAll(".cart-item").forEach((item) => {
      const name = item.querySelector("h4").textContent;
      const desc = item.querySelector("p").textContent;
      const qty = parseInt(item.querySelector(".qty-display").textContent);
      const totalText = item.querySelector(".total-display").textContent;
      const total = parseFloat(totalText.replace("Total: $", ""));

      let size = "Unknown",
        sugar = "Unknown",
        promo = "None";
      const match = desc.match(/Size: (.*?) \| Sugar: (.*?) \| Promo: (.*)/);
      if (match) {
        size = match[1];
        sugar = match[2];
        promo = match[3];
      }

      const unitPrice = total / qty;

      cartItems.push({
        name,
        qty,
        size,
        sugar,
        promo,
        price: unitPrice,
        subtotal: total,
      });
    });

    localStorage.setItem("cartSummary", JSON.stringify(cartItems));
    window.location.href = "summary.html";
  });
});
