import { sendOrderToTelegram } from "./telegram.js";

document.addEventListener("DOMContentLoaded", () => {
  const summaryItemsContainer = document.getElementById("summaryItems");
  const grandTotalEl = document.getElementById("grandTotal");
  const nameInput = document.getElementById("nameInput");
  const confirmBtn = document.getElementById("confirmBtn");

  const cartItems = JSON.parse(localStorage.getItem("cartSummary")) || [];
  console.log("Cart loaded:", cartItems); // Optional: debug

  let total = 0; // ✅ Fixed: initialize total

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

    const name = item.name || "Unnamed";
    const size = item.size || "?";
    const sugar = item.sugar || "?";
    const details = item.details || `Size: ${size} | Sugar: ${sugar}`;
    const quantity = item.qty || item.quantity || 1;
    const price = item.price || 0;
    const subtotal = price * quantity;

    itemEl.innerHTML = `
      <h1><strong>${name}</strong></h1>
      <p>${details}</p>
      <p>Qty: ${quantity}</p>
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
    const timestampCode = now.getTime().toString().slice(-4);
    const nameCode = customerName.slice(0, 3).toUpperCase();
    const orderId = `${nameCode}-${timestampCode}`;
    const orderDate = now.toLocaleString();

    let message = `📦 *New Order from ${customerName}*\n\n🆔 Order ID: *${orderId}*\n🕒 ${orderDate}\n\n`;

    cartItems.forEach((item) => {
      const name = item.name || item.title || "Unnamed";
      const quantity = item.qty || item.quantity || 1;
      const price = parseFloat(item.price) || 0;
      const subtotal = price * quantity;
      const size = item.size || "N/A";
      const sugar = item.sugar || "N/A";

      message += `- ${name} (Size: ${size}, Sugar: ${sugar}) x${quantity} - $${subtotal.toFixed(
        2
      )}\n`;
    });

    message += `\n💰 Total: $${total.toFixed(2)}`;

    fetch("http://localhost:3000/send-telegram", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
