document.addEventListener("DOMContentLoaded", () => {
  const summaryItemsContainer = document.getElementById("summaryItems");
  const grandTotalEl = document.getElementById("grandTotal");
  const nameInput = document.getElementById("nameInput");
  const confirmBtn = document.getElementById("confirmBtn");

  const cartItems = JSON.parse(localStorage.getItem("cartSummary")) || [];
  let total = 0;

  if (cartItems.length === 0) {
    summaryItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    grandTotalEl.textContent = "Total: $0.00";
    confirmBtn.disabled = true;
    confirmBtn.style.opacity = "0.5";
    return;
  }

  cartItems.forEach((item) => {
    const itemEl = document.createElement("div");
    itemEl.classList.add("summary-item");

    const { name, qty, size, sugar, price, subtotal, promo = "None" } = item;

    total += subtotal;

    itemEl.innerHTML = `
      <h1><strong>${name}</strong> <small style="font-size: 14px;">(${promo})</small></h1>
      <p>Size: ${size || "-"} | Sugar: ${sugar || "-"}</p>
      <p>Qty: ${qty}</p>
      <p><strong>$${subtotal.toFixed(2)}</strong></p>
    `;

    summaryItemsContainer.appendChild(itemEl);
  });

  grandTotalEl.textContent = `Total: $${total.toFixed(2)}`;

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

    let message =
      `*━━━━━━━━━━━━━━━━━━━━━*\n` +
      `               *🐾 CC-Coffee Receipt 🐾*\n` +
      `*━━━━━━━━━━━━━━━━━━━━━*\n\n` +
      `🆔 *Order ID:* ${orderId}\n` +
      `👤 *Name:* ${customerName}\n` +
      `📅 *Date:* ${now.toLocaleString()}\n\n` +
      `*--------------------------*\n` +
      `🛒 *Items Ordered:*\n\n`;

    cartItems.forEach((item) => {
      const { name, qty, size, sugar, promo = "None", subtotal } = item;

      message += `• ${name} ☕\n`;
      message += `  📏 Size: ${size || "-"} | 🍬 Sugar: ${sugar || "-"}\n`;
      message += `  🔢 Qty: ${qty} | 💸 Promo: ${promo}\n`;
      message += `  💵 Subtotal: $${subtotal.toFixed(2)}\n\n`;
    });

    message += `*--------------------------*\n`;
    message += `🧾 *Total:* $${total.toFixed(
      2
    )}\n\n🎉 You Have New Order *CC-Coffee!*\n`;
    //🐈 May your day be as cozy as your drink!\n`;

    // ✅ Send to Telegram
    fetch("/send-telegram", {
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
