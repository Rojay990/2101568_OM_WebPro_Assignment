// Track login attempts
let loginAttempts = parseInt(localStorage.getItem('loginAttempts')) || 0;

// Retrieve stored cart or initialize an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Get username from localStorage (default: Guest)
const username = localStorage.getItem('username') || 'Guest';

document.addEventListener("DOMContentLoaded", function () {
    displayUser();
    setupShopNowButton();
    loadProductsIfNeeded();
});

// Display username and logout button
function displayUser() {
    const userDisplay = document.getElementById("userDisplay");
    if (userDisplay) {
        userDisplay.innerHTML = `Welcome, ${username} ` +
            (username !== 'Guest' ? '<button onclick="logout()">Logout</button>' : '');
    }

    // Show username with cart icon
    const nav = document.querySelector("nav");
    if (nav) {
        nav.innerHTML += `<a href="#" class="cart"><span>🛒</span> ${username}</a>`;
    }
}

// Handle "Shop Now" button click
function setupShopNowButton() {
    document.getElementById("shopNow")?.addEventListener("click", function (event) {
        event.preventDefault();
        if (!isLoggedIn()) {
            window.location.href = "login.html";
        } else {
            window.location.href = "products.html";
        }
    });
}

// Load products only if on the products page
function loadProductsIfNeeded() {
    if (window.location.pathname.includes("products.html")) {
        loadProducts();
    }
}

// Show Pop-up Login Form
document.getElementById("loginTab")?.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("loginPopup").style.display = "flex";
});

// Close Pop-up Login Form
function closeLoginPopup() {
    document.getElementById("loginPopup").style.display = "none";
}

// Handle Login Form Submission
document.getElementById("loginForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;

    const user = USERS.find(u => u.username === enteredUsername && u.password === enteredPassword);

    if (user) {
        successfulLogin(user);
    } else {
        failedLogin();
    }
});

// Successful login handling
function successfulLogin(user) {
    loginAttempts = 0; // Reset login attempts
    localStorage.setItem('loginAttempts', loginAttempts);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', user.username);
    localStorage.setItem('role', user.role);
    
    alert(user.role === "admin" ? "Admin logged in successfully!" : "Login successful!");
    window.location.href = "index.html";
}

// Failed login handling
function failedLogin() {
    loginAttempts++;
    localStorage.setItem('loginAttempts', loginAttempts);

    if (loginAttempts >= 3 && !isAdmin()) {
        window.location.href = "error.html";
    } else {
        document.getElementById("errorMessage").textContent = `Invalid credentials. Attempts left: ${3 - loginAttempts}`;
    }
}

// Check if user is logged in
function isLoggedIn() {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || null;
    sessionStorage.setItem("currentUser", JSON.stringify(user));
}

// Check if logged-in user is an admin
function isAdmin() {
    return localStorage.getItem('role') === "admin";
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    window.location.href = "index.html";
}

// Admin: Reset login attempts
function resetLoginAttempts() {
    if (isAdmin()) {
        loginAttempts = 0;
        localStorage.setItem('loginAttempts', loginAttempts);
        alert("Admin has reset login attempts.");
        document.getElementById("errorMessage").textContent = "";
        document.getElementById("loginButton").disabled = false;
    } else {
        alert("You do not have permission to reset login attempts.");
    }
}

// Load Products Function
function loadProducts() {
    const products = [
        { name: "Fresh Apples", price: 3.99, image: "../images/apples.jpg" },
        { name: "Organic Carrots", price: 2.50, image: "../images/carrots.jpg" },
        { name: "Chicken Breasts", price: 5.99, image: "../images/chicken.jpg" },
        { name: "Whole Milk", price: 1.99, image: "../images/milk.jpg" },
        { name: "Whole Grain Bread", price: 2.00, image: "../images/bread.jpg" },
        { name: "Fresh Strawberries", price: 4.50, image: "../images/strawberries.jpg" },
        { name: "Cage-Free Eggs", price: 3.00, image: "../images/eggs.jpg" },
        { name: "Organic Spinach", price: 2.99, image: "../images/spinach.jpg" },
        { name: "Ground Beef", price: 6.50, image: "../images/beef.jpg" },
        { name: "Fresh Broccoli", price: 1.99, image: "../images/broccoli.jpg" }
    ];
    const productGrid = document.querySelector(".product-grid");
    if (productGrid) {
        productGrid.innerHTML = "";
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.className = "product-card";
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: $${product.price.toFixed(2)}</p>
                <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        });
    }
}

// Add to Cart
function addToCart(name, price) {
    if (!isLoggedIn()) {
        window.location.href = "login.html";
        return;
    }
    const quantity = parseInt(prompt(`How many ${name} would you like to add?`, "1")) || 1;
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = "invoice.html";
}

// Cancel Order
function cancel() {
    cart = [];
    localStorage.removeItem('cart');
    window.location.href = "products.html";
}

// Generate Invoice
function generateInvoice() {
    const invoiceDetails = document.getElementById("invoiceDetails");
    if (invoiceDetails) {
        let subtotal = 0;
        invoiceDetails.innerHTML = "";
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            invoiceDetails.innerHTML += `<p>${index + 1}. ${item.name} (Qty: ${item.quantity}) - $${itemTotal.toFixed(2)}</p>`;
        });

        const tax = subtotal * 0.15;
        const total = subtotal + tax;
        invoiceDetails.innerHTML += `<p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p><p><strong>Tax (15%):</strong> $${tax.toFixed(2)}</p><p><strong>Total:</strong> $${total.toFixed(2)}</p>`;
    }
}

// Generate invoice if on the invoice page
if (window.location.pathname.includes("invoice.html")) {
    generateInvoice();
}
