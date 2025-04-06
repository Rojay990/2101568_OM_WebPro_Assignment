const cartItems = [
  {
    id: 1,
    name: "Pi Pizza Oven",
    note: "(Estimated Ship Date: June 6th)",
    price: 469.99,
    quantity: 1
  },
  {
    id: 2,
    name: "Grill Ultimate Bundle",
    price: 549.99,
    quantity: 4
  },
  {
    id: 3,
    name: "Starters (4 pack)",
    price: 0.00,
    quantity: 1
  },
  {
    id: 4,
    name: "Charcoal Grill Pack",
    price: 0.00,
    quantity: 1
  }
];


function renderCart() {
  const tbody = document.getElementById("cart-body");
  const itemCount = document.getElementById("item-count");
  const subtotalEl = document.getElementById("subtotal");
  const taxEl = document.getElementById("tax");
  const grandTotalEl = document.getElementById("grand-total");

  let subtotal = 0;
  tbody.innerHTML = "";

  cartItems.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        ${item.name} ${item.note ? `<br><small style="color: orange">${item.note}</small>` : ""}
      </td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <button class="qty-btn" data-id="${item.id}" data-action="decrease">−</button>
        <span class="qty-value">${item.quantity}</span>
        <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
      </td>
      <td>$${itemTotal.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });

  const tax = subtotal * 0.10;
  const grandTotal = subtotal + tax;

  itemCount.textContent = cartItems.length;
  subtotalEl.textContent = subtotal.toFixed(2);
  taxEl.textContent = tax.toFixed(2);
  grandTotalEl.textContent = grandTotal.toFixed(2);

  addQtyListeners();
}

function addQtyListeners() {
  document.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const action = btn.dataset.action;
    
      const item = cartItems.find(i => i.id === id);
      if (!item) return;
    
      if (action === "increase") {
        item.quantity++;
      } else if (action === "decrease" && item.quantity > 1) {
        item.quantity--;
      }
    
      renderCart();
    });
    
  });
}

renderCart();