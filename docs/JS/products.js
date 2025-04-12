
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

document.addEventListener("DOMContentLoaded", () => {
    loadProductsFromArray(currentPage);
});

const productsPerPage = 20;
let currentPage = 1;

function loadProductsFromArray(page = 1) {
    const productGrid = document.querySelector(".product-grid");
    const pagination = document.querySelector(".pagination");

    if (!productGrid || !pagination) {
        console.error("Product grid or pagination container not found!");
        return;
    }

    productGrid.innerHTML = ""; // Clear previous products

    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-preview");

        productCard.innerHTML = `
            <div class="product-item">
                <img class="product-display" src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <p class="product-name">${product.name}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;

        productGrid.appendChild(productCard);
    });

    // Generate pagination
    createPagination();
}

function createPagination() {
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(products.length / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = (i === currentPage) ? "active-page" : "";
        btn.onclick = () => {
            currentPage = i;
            loadProductsFromArray(currentPage);
        };
        pagination.appendChild(btn);
    }
}




// Toggle the side navigation menu
function toggleMenu() {
    const sidenav = document.getElementById("mySidenav");
    if (sidenav) {
        sidenav.style.width = sidenav.style.width === "250px" ? "0" : "250px";
    } else {
        console.error("Side navigation menu not found!");
    }
}

// Close the side navigation menu
function closeNav() {
    const sidenav = document.getElementById("mySidenav");
    if (sidenav) {
        sidenav.style.width = "0";
    } else {
        console.error("Side navigation menu not found!");
    }
}

// Handle login/logout functionality
document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const sideLoginLogoutLink = document.getElementById("sideLoginLogoutLink");

    if (isLoggedIn) {
        sideLoginLogoutLink.textContent = "Logout";
        sideLoginLogoutLink.href = "#";
        sideLoginLogoutLink.onclick = logout;
    } else {
        sideLoginLogoutLink.textContent = "Login";
        sideLoginLogoutLink.href = "login.html";
    }
});

// Logout function
function logout() {
    localStorage.setItem("isLoggedIn", "false");
    window.location.href = "index.html";
}

// Login function
function login() {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html";
}