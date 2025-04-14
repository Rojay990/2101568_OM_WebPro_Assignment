document.addEventListener("DOMContentLoaded", () => {
    const summaryContainer = document.querySelector(".summary");
    const placeOrderButton = document.querySelector(".place-order");

    let subtotal = 0;

    const cart = Object.values(currentUser.cart || {}); // Convert cart object to array

    // Convert object cart to array if needed

    if (!cart.length) {
        summaryContainer.innerHTML = "<p>Your cart is empty.</p>";
        placeOrderButton.disabled = true;
        return; // exit early if cart is empty
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
    const tax = subtotal * 0.10; // 10% tax
    const grandTotal = subtotal + tax;
    const total = grandTotal + shipping;

    summaryContainer.innerHTML += `
        <hr>
        <p>Subtotal: <span>$${subtotal.toFixed(2)}</span></p>
        <p>Tax: <span>$${tax.toFixed(2)}</span></p>
        <p>Grand Total: <span>$${grandTotal.toFixed(2)}</span></p>
        <p>Shipping: <span>$${shipping.toFixed(2)}</span></p>
        <p><strong>Total: <span>$${total.toFixed(2)}</span></strong></p>
    `;

    // Basic form validation
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
            window.location.href = "dashboard.html"; // redirect to homepage
        }
    });
});
