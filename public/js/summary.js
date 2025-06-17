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

    const { name, qty, details, price } = item;
    const subtotal = price * qty;

    itemEl.innerHTML = `
      <h1><strong>${name}</strong></h1>
      <p>${details}</p>
      <p>Qty: ${qty}</p>
      <p>$${subtotal.toFixed(2)}</p>
    `;

    total += subtotal;
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
    const orderDate = now.toLocaleString();

    let message = `📦 *New Order from ${customerName}*\n\n🆔 Order ID: *${orderId}*\n🕒 ${orderDate}\n\n`;

    cartItems.forEach((item) => {
      const { name, qty, size, sugar, price } = item;
      const subtotal = price * qty;
      message += `- ${name} (Size: ${size}, Sugar: ${sugar}) x${qty} - $${subtotal.toFixed(
        2
      )}\n`;
    });

    message += `\n💰 Total: $${total.toFixed(2)}`;

    fetch("/send-telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
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
