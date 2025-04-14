document.addEventListener("DOMContentLoaded", () => {
    const summaryContainer = document.querySelector(".summary");
    const placeOrderButton = document.querySelector(".place-order");

    let subtotal = 0;
    const cart = Object.values(currentUser.cart || {});

    if (!cart.length) {
        summaryContainer.innerHTML = "<p>Your cart is empty.</p>";
        placeOrderButton.disabled = true;
        return;
    }

    summaryContainer.innerHTML = "";

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const p = document.createElement("p");
        p.innerHTML = `${item.name} x ${item.quantity} <span>$${itemTotal.toFixed(2)}</span>`;
        summaryContainer.appendChild(p);
    });



    const tax = subtotal * 0.10;
    const grandTotal = subtotal + tax;
    let shipping = 0;
    if(grandTotal >= 100) {
        shipping = 0;} else if (grandTotal >= 50) {
        shipping = 5.99;} else {
        shipping = 9.99;}
    const total = grandTotal + shipping;

    summaryContainer.innerHTML += `
        <hr>
        <p>Subtotal: <span>$${subtotal.toFixed(2)}</span></p>
        <p>Tax: <span>$${tax.toFixed(2)}</span></p>
        <p>Grand Total: <span>$${grandTotal.toFixed(2)}</span></p>
        <p>Shipping: <span>$${shipping.toFixed(2)}</span></p>
        <p><strong>Total: <span>$${total.toFixed(2)}</span></strong></p>
    `;

    placeOrderButton.addEventListener("click", (e) => {
        e.preventDefault();

        const inputs = document.querySelectorAll(".checkout-form input[required]");
        let isValid = true;
        const formData = {};

        // Collect and validate all required fields
        inputs.forEach((input, index) => {
            const label = input.closest("label");
            const labelText = label ? label.textContent.trim() : `Field ${index + 1}`;
            const value = input.value.trim();

            if (!value) {
                input.style.borderColor = "red";
                isValid = false;
            } else {
                input.style.borderColor = "#ccc";
                formData[labelText] = value;
            }
        });

        // Get selected payment method
        const paymentMethod = document.querySelector('input[name="payment"]:checked');
        formData["Payment Method"] = paymentMethod ? paymentMethod.parentElement.textContent.trim() : "Unknown";

        if (!isValid) {
            alert("Please fill in all required fields.");
            return;
        }

        // Append order details
        formData.cart = cart;
        formData.subtotal = subtotal.toFixed(2);
        formData.tax = tax.toFixed(2);
        formData.grandTotal = grandTotal.toFixed(2);
        formData.shipping = shipping.toFixed(2);
        formData.total = total.toFixed(2);

        // Store in localStorage
        localStorage.setItem("orderData", JSON.stringify(formData));

        // Redirect
        window.location.href = "invoice.html";
    });
});
