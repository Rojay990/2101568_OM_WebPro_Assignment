document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const summaryContainer = document.querySelector(".summary");
    const placeOrderButton = document.querySelector(".place-order");

    let subtotal = 0;

    if (cart.length === 0) {
    summaryContainer.innerHTML = "<p>Your cart is empty.</p>";
    placeOrderButton.disabled = true;
    return;
    }

    summaryContainer.innerHTML = ""; // Clear placeholder

    cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const p = document.createElement("p");
    p.innerHTML = `${item.name} x ${item.quantity} <span>$${itemTotal.toFixed(2)}</span>`;
    summaryContainer.appendChild(p);
    });

    const shipping = 5.00; // fixed for now
    const total = subtotal + shipping;

    summaryContainer.innerHTML += `
    <hr>
    <p>Subtotal: <span>$${subtotal.toFixed(2)}</span></p>
    <p>Shipping: <span>$${shipping.toFixed(2)}</span></p>
    <p><strong>Total: <span>$${total.toFixed(2)}</span></strong></p>
    `;

    //  Basic form validation
    placeOrderButton.addEventListener("click", (e) => {
    const requiredInputs = document.querySelectorAll(".checkout-form input[required]");
    let allFilled = true;

    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
        input.style.borderColor = "red";
        allFilled = false;
        } else {
        input.style.borderColor = "#ccc";
        }
    });

    if (!allFilled) {
        e.preventDefault();
        alert("Please fill in all required fields.");
    } else {
        alert("Order placed successfully!");
        localStorage.removeItem("cart"); // clear cart after order
    }
    });
});