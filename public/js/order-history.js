document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("orderHistoryContainer");
  const allOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];

  // Cleanup: keep only orders from the last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentOrders = allOrders.filter((order) => {
    const orderDate = new Date(order.date);
    return orderDate >= sevenDaysAgo;
  });

  // Save only recent orders back
  localStorage.setItem("orderHistory", JSON.stringify(recentOrders));

  if (recentOrders.length === 0) {
    container.innerHTML =
      "<p class='text-center text-gray-500'>No order history found.</p>";
    return;
  }

  // Reverse to show newest first
  recentOrders.reverse();

  recentOrders.forEach((order) => {
    const orderEl = document.createElement("div");
    orderEl.className = "bg-white shadow-sm rounded-xl p-6 mb-4";

    const itemsList = order.items
      .map(
        (item) => `
          <li class="ml-4 list-disc">
            ${item.name} (Size: ${item.size || "-"}, Sugar: ${
          item.sugar || "-"
        }) × ${item.qty} - $${(item.price * item.qty).toFixed(2)}
          </li>
        `
      )
      .join("");

    orderEl.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <h2 class="text-lg font-bold text-gray-800">Order ID: ${
          order.orderId
        }</h2>
      </div>
    
      <div class="flex items-center gap-2 text-sm text-gray-500">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p>Date: ${new Date(order.date).toLocaleString()}</p>
      </div>
    
      <div class="flex items-center gap-2 text-sm text-gray-700">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.29.53 6.121 1.469M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <p>Name: ${order.customerName}</p>
      </div>
    
      <ul class="my-3">${itemsList}</ul>
      <p class="text-right font-semibold text-green-600">Total: $${
        order.total
      }</p>
    `;

    container.appendChild(orderEl);
  });
});
