const summaryContainer = document.getElementById("summaryItems");
const summaryTotal = document.getElementById("summaryTotal");

const cartData = JSON.parse(localStorage.getItem("cartSummary")) || [];

let total = 0;
cartData.forEach((item) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <h4>${item.name}</h4>
  <p>${item.details}</p>
  <p>${item.qty}</p>
  <p>${item.total}</p>
  <hr>
`;
  summaryContainer.appendChild(div);

  const itemTotal = parseFloat(item.total.replace("$", ""));
  total += itemTotal;
});

summaryTotal.textContent = `Total: $${total.toFixed(2)}`;

document.mentById("confirmOrder").addEventListener("click", () => {
  alert("Order confirmed!");
  localStorage.removeItem("cartSummary");
  window.location.href = "index.html"; // or a "thank you" page
});
