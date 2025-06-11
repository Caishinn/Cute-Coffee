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

    itemEl.innerHTML = `
      <h1><strong>${item.name}</strong></h1>
      <p>${item.details}</p>
      <p>${item.qty}</p>
      <p>${item.total}</p>
    `;

    const price = parseFloat(item.total.replace("Total: $", ""));
    total += isNaN(price) ? 0 : price;

    summaryItemsContainer.appendChild(itemEl);
  });

  grandTotalEl.textContent = `Total: $${total.toFixed(2)}`;

  confirmBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (!name) {
      alert("Please enter your name.");
      return;
    }

    alert(`Thank you, ${name}! Your payment is being processed.`);
    localStorage.removeItem("cartSummary");
    window.location.href = "index.html";
  });
});
