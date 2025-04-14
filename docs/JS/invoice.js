document.addEventListener("DOMContentLoaded", () => {
    const orderData = JSON.parse(localStorage.getItem("orderData"));

    console.log(orderData); // For debugging

    if (!orderData) {
        alert("No order data found.");
        window.location.href = "checkout.html";
        return;
    }

    // Fill customer details
    document.getElementById("customerName").textContent = orderData["Full Name"];
    document.getElementById("paymentMethod").textContent = orderData["Payment Method"];
    document.getElementById("TRN").textContent = currentUser["trn"]; 
    document.getElementById("shippingAddress").textContent = orderData["Street Address"] +" "+ 
    orderData["City"]+", "+ orderData["State/Province"] + ", "+ orderData["Postal Code"] + ", " + orderData["Country"];

const initials = getInitials();

    const invoiceNumber = "INV-" + (parseInt(localStorage.getItem("invoiceNumber"), 10)) + "-" + initials;
    const invoiceDate = new Date().toLocaleDateString();

    document.getElementById("invoiceNumber").textContent = invoiceNumber;
    document.getElementById("invoiceDate").textContent = invoiceDate;

    // Fill cart items into the invoice table
    const invoiceDetails = document.getElementById("invoiceDetails");
    orderData.cart.forEach(item => {
        const row = document.createElement("tr");
        const total = (item.price * item.quantity).toFixed(2);
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${total}</td>
        `;
        invoiceDetails.appendChild(row);
    });

    // Summary rows: Subtotal, Tax, Shipping, Total
    const summaryData = [
        { label: "Subtotal", value: orderData.subtotal },
        { label: "Tax", value: orderData.tax },
        { label: "Shipping", value: orderData.shipping },
        { label: "Grand Total", value: orderData.total }
    ];

    summaryData.forEach(({ label, value }) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="3" style="text-align: right;"><strong>${label}</strong></td>
            <td><strong>$${parseFloat(value).toFixed(2)}</strong></td>
        `;
        invoiceDetails.appendChild(row);
    });
});

// Cancel function
function cancel() {
    if (confirm("Are you sure you want to cancel this order?")) {
        localStorage.removeItem("orderData");
        window.location.href = "dashboard.html";
    }
}

// Exit function
function exitPage() {
    window.location.href = "dashboard.html";
}

function getInitials() {
    const fname = String(currentUser["firstName"]);
    const lname = String(currentUser["lastName"]);
    
    const firstInitial = fname[0].charAt(0).toUpperCase();
    const lastInitial = lname[0].charAt(0).toUpperCase();

    return firstInitial + lastInitial;
}
