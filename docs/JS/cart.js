const userData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

let cartData = [];

if (currentUser) {
  const user = userData.find(user => user.trn === currentUser.trn);
  if (user) {
    cartData = Object.values(user.cart || {}); // Convert cart object to array
  } else {
    console.log("User not found in RegistrationData.");
  }
} else {
  console.log("No user is currently logged in.");
}

function renderCart() {
  const tbody = document.getElementById("cart-body");
  const itemCount = document.getElementById("item-count");
  const subtotalEl = document.getElementById("subtotal");
  const taxEl = document.getElementById("tax");
  const grandTotalEl = document.getElementById("grand-total");

  let subtotal = 0;
  tbody.innerHTML = "";

  cartData.forEach((item) => {
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

  itemCount.textContent = cartData.length;
  subtotalEl.textContent = subtotal.toFixed(2);
  taxEl.textContent = tax.toFixed(2);
  grandTotalEl.textContent = grandTotal.toFixed(2);

  freeShipping(grandTotal);
  addQtyListeners();
}

function addQtyListeners() {
  document.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const action = btn.dataset.action;

      const item = cartData.find(i => i.id === id);
      if (!item) return;

      if (action === "increase") {
        item.quantity++;
      } else if (action === "decrease") {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          cartData = cartData.filter(i => i.id !== id);
        }
      }

      // Update user cart in localStorage
      const userIndex = userData.findIndex(user => user.trn === currentUser.trn);
      if (userIndex !== -1) {
        const updatedCart = {};
        cartData.forEach(i => {
          updatedCart[i.id] = i;
        });

        userData[userIndex].cart = updatedCart;
        localStorage.setItem("RegistrationData", JSON.stringify(userData));

        currentUser.cart = updatedCart;
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
      }

      renderCart();
    });
  });
}

function freeShipping(grandTotal){
  const freeShippingMessage = document.querySelector(".free-shipping");
  if (grandTotal < 100) {
    freeShippingMessage.style.display = "none";
  } else {
    freeShippingMessage.style.display = "block";
  }
}
renderCart();
