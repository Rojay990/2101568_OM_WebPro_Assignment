const orderData = JSON.parse(localStorage.getItem("orderData"));
document.addEventListener("DOMContentLoaded", () => {
    

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

    const businessName = document.getElementById("businessName").textContent;
    const businessAddress = document.getElementById("businessAddress").textContent;
    const businessPhone = document.getElementById("businessPhone").textContent;
    const businessEmail = document.getElementById("businessEmail").textContent;

    const customerName = document.getElementById("customerName").textContent;
    const paymentMethod = document.getElementById("paymentMethod").textContent;
    const trn = document.getElementById("TRN").textContent;
    const shippingAddress = document.getElementById("shippingAddress").textContent;
    const invoiceNum = document.getElementById("invoiceNumber").textContent;
    const invDate = document.getElementById("invoiceDate").textContent;

    const cusInvoice = {
        businessName: businessName,
        businessAddress: businessAddress,
        businessPhone: businessPhone,
        businessEmail: businessEmail,
        customerName: customerName,
        paymentMethod: paymentMethod,
        trn: trn,
        shippingAddress: shippingAddress,
        invoiceNumber: invoiceNum,
        invoiceDate: invDate,
        orderData: orderData,

    };

    console.log("Customer Invoice: ", currentUser);
    // Push cusInvoice to currentUser.invoice and update in localStorage
    if (!currentUser.invoice) {
        currentUser.invoices = [];
    }
    currentUser.invoices.push(cusInvoice);

    // Update the user data in RegistrationData in localStorage
    const registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    const userIndex = registrationData.findIndex(user => user.trn === currentUser.trn);

    // Retrieve AllInvoices from localStorage or initialize as an empty array
    const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];

    // Check if the invoice already exists in AllInvoices
    const existingInvoice = allInvoices.find(invoice => invoice.invoiceNumber === cusInvoice.invoiceNumber);
    if (!existingInvoice) {
        allInvoices.push(cusInvoice); // Add the new invoice to AllInvoices
        localStorage.setItem("AllInvoices", JSON.stringify(allInvoices)); // Update AllInvoices in localStorage
    } else {
        console.warn("Invoice with this number already exists in AllInvoices.");
    }

    if (userIndex !== -1) {
        const existingInvoice = registrationData[userIndex].invoices.find(invoice => invoice.invoiceNumber === cusInvoice.invoiceNumber);
        if (!existingInvoice) {
            registrationData[userIndex].invoices.push(cusInvoice);
        } else {
            console.warn("Invoice with this number already exists for the user.");
        }
        localStorage.setItem("RegistrationData", JSON.stringify(registrationData));
    } else {
        console.error("User not found in RegistrationData.");
    }

    return cusInvoice;
});

// Cancel function
function cancel() {
    if (confirm("Are you sure you want to cancel this order?")) {
        localStorage.removeItem("orderData");
        window.location.href = "home.html";
    }
}

// Exit function
function exitPage() {
    window.location.href = "home.html";
}

function getInitials() {
    const fname = String(currentUser["firstName"]);
    const lname = String(currentUser["lastName"]);
    
    const firstInitial = fname[0].charAt(0).toUpperCase();
    const lastInitial = lname[0].charAt(0).toUpperCase();

    return firstInitial + lastInitial;
}

function clearCart() {
    // Clear the cart for the current user
    if (currentUser && currentUser.cart) {
        currentUser.cart = {};
    }

    // Update the user data in RegistrationData in localStorage
    const registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    const userIndex = registrationData.findIndex(user => user.trn === currentUser.trn);

    if (userIndex !== -1) {
        registrationData[userIndex].cart = {};
        localStorage.setItem("RegistrationData", JSON.stringify(registrationData));
        console.log("Cart cleared for current user in RegistrationData.");
    } else {
        console.error("User not found in RegistrationData.");
    }
}

// Call clearCart when the user leaves the invoice.html page
window.addEventListener("beforeunload", () => {
    if (nav === false) {
        clearCart();
    }
});

let nav = false;

window.addEventListener('pageshow', function (event) {
    const navType = performance.getEntriesByType("navigation")[0].type;

    if (event.persisted || navType === "back_forward" || navType === "reload") {
        nav = true;
        console.log("User used back/forward button or reloaded. nav =", nav);
    } else {
        nav = false;
        console.log("User did a normal navigation. nav =", nav);
    }
});
