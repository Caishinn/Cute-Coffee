document.addEventListener("DOMContentLoaded", () => {
  const summaryItemsContainer = document.getElementById("summaryItems");
  const grandTotalEl = document.getElementById("grandTotal");
  const nameInput = document.getElementById("nameInput");
  const confirmBtn = document.getElementById("confirmBtn");

  const cartItems = JSON.parse(localStorage.getItem("cartSummary")) || [];
  console.log("Loaded cart items:", cartItems); // Debug for mobile issue
  let total = 0;

  if (cartItems.length === 0) {
    summaryItemsContainer.innerHTML = `
      <div class="text-center text-red-500">
        <p>Your cart is empty.</p>
        <p>Note: If you added items on another device or tab, they won't appear here.</p>
      </div>
    `;
    grandTotalEl.textContent = "Total: $0.00";
    confirmBtn.disabled = true;
    confirmBtn.style.opacity = "0.5";
    return;
  }

  // Render each cart item
  cartItems.forEach((item) => {
    const itemEl = document.createElement("div");
    itemEl.classList.add("summary-item");

    const { name, qty, details, price } = item;
    const subtotal = price * qty;
    total += subtotal;

    itemEl.innerHTML = `
      <h1><strong>${name}</strong></h1>
      <p>${details}</p>
      <p>Qty: ${qty}</p>
      <p>$${subtotal.toFixed(2)}</p>
    `;

    summaryItemsContainer.appendChild(itemEl);
  });

  // Show total
  grandTotalEl.textContent = `Total: $${total.toFixed(2)}`;

  // Confirm button event
  confirmBtn.addEventListener("click", () => {
    const customerName = nameInput.value.trim();
    if (!customerName) {
      alert("Please enter your name before confirming.");
      return;
    }

    const now = new Date();
    const orderId = `${customerName.slice(0, 3).toUpperCase()}-${now
      .getTime()
      .toString()
      .slice(-4)}`;
    const orderDate = now.toISOString();

    // 🧾 Telegram message format
    let message =
      `*━━━━━━━━━━━━━━━━━━━━━*\n` +
      `               *🐾 MeowCoffee Receipt 🐾*\n` +
      `*━━━━━━━━━━━━━━━━━━━━━*\n\n` +
      `🆔 *Order ID:* ${orderId}\n` +
      `👤 *Name:* ${customerName}\n` +
      `📅 *Date:* ${now.toLocaleString()}\n\n` +
      `*--------------------------*\n` +
      `🛒 *Items Ordered:*\n\n`;

    cartItems.forEach((item) => {
      const { name, qty, size, sugar, price } = item;
      const subtotal = price * qty;
      message += `• ${name} ☕\n  📏 Size: ${size || "-"} | 🍬 Sugar: ${
        sugar || "-"
      }\n  🔢 Qty: ${qty} | 💵 $${subtotal.toFixed(2)}\n\n`;
    });

    message +=
      `*--------------------------*\n` +
      `🧾 *Total:* $${total.toFixed(2)}\n\n` +
      `🎉 Thank you for choosing MeowCoffee!\n🐈 May your day be as cozy as your drink!\n`;

    // ✅ Send to Telegram
    fetch("https://cute-coffee.onrender.com/send-telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const previousOrders =
            JSON.parse(localStorage.getItem("orderHistory")) || [];
          previousOrders.push({
            orderId,
            customerName,
            date: orderDate,
            items: cartItems,
            total: total.toFixed(2),
          });
          localStorage.setItem("orderHistory", JSON.stringify(previousOrders));

          alert(`Thank you, ${customerName}! Your payment is being processed.`);
          localStorage.removeItem("cartSummary");
          window.location.href = "index.html";
        } else {
          alert("Failed to send order.");
        }
      })
      .catch((err) => {
        console.error("Error sending order:", err);
        alert("Something went wrong.");
      });
  });
});
