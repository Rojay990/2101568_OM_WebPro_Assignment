
const products = [
    { id: 1, name: "Fresh Apples", price: 3.99, image: "../images/apples.jpg" },
    { id: 2, name: "Organic Carrots", price: 2.50, image: "../images/carrots.jpg" },
    { id: 3, name: "Chicken Breasts", price: 5.99, image: "../images/chicken.jpg" },
    { id: 4, name: "Whole Milk", price: 1.99, image: "../images/milk.jpg" },
    { id: 5, name: "Whole Grain Bread", price: 2.00, image: "../images/bread.jpg" },
    { id: 6, name: "Fresh Strawberries", price: 4.50, image: "../images/strawberries.jpg" },
    { id: 7, name: "Cage-Free Eggs", price: 3.00, image: "../images/eggs.jpg" },
    { id: 8, name: "Organic Spinach", price: 2.99, image: "../images/spinach.jpg" },
    { id: 9, name: "Ground Beef", price: 6.50, image: "../images/beef.jpg" },
    { id: 10, name: "Fresh Broccoli", price: 1.99, image: "../images/broccoli.jpg" },
    { id: 11, name: "Atlantic Salmon Fillet", price: 9.86, image: "../images/salmon.jpg" },
    { id: 12, name: "Fresh Blueberries", price: 6.94, image: "../images/blueberries.jpg" },
    { id: 13, name: "Quaker Instant Oatmeal, Apple", price: 1.08, image: "../images/oatmeal.jpg" },
    { id: 14, name: "Cream Cheese", price: 3.42, image: "../images/cream.jpg" },
    { id: 15, name: "Russet Potatoes", price: 5.91, image: "../images/potato.jpg" },
    { id: 16, name: "Smoked Thick Cut Sliced Bacon", price: 11.99, image: "../images/bacon.jpg" },
    { id: 17, name: "Breakfast Sausage", price: 4.99, image: "../images/sausage.jpg" },
    { id: 18, name: "Minute Maid", price: 2.08, image: "../images/minutemaid.jpg" },
    { id: 19, name: "Ocean Spray", price: 3.68, image: "../images/ocean-spray.jpg" },
    { id: 20, name: "Tropicana Classic Lemonade", price: 2.88, image: "../images/tropicana.jpg"}

];

function showAddToCartMessage(productName) {
    const message = document.getElementById("add-to-cart-message");
    message.textContent = `✅ "${productName}" added to cart!`;
    message.classList.add("show");

    // Hide the message after 3 seconds
    setTimeout(() => {
        message.classList.remove("show");
    }, 3000);
}


document.addEventListener("DOMContentLoaded", () => {
    loadProductsFromArray(currentPage);
});

const productsPerPage = 15;
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
                <p class="product-description"> ${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
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

// Add event listener to "Add to Cart" buttons
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart")) {
        const productId = e.target.getAttribute("data-id");
        console.log("Added product with ID:", productId);

        const selectedItem = [];
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
            selectedItem.push(product);
            showAddToCartMessage(product.name);
            console.log("Selected Item:", selectedItem);
        } else {
            console.error("Product not found!");
        }

const registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];

if (currentUser && currentUser.trn) {
    const matchingUserIndex = registrationData.findIndex(user => user.trn === currentUser.trn);

    if (matchingUserIndex !== -1) {
        const productId = parseInt(e.target.getAttribute("data-id"));
        const product = products.find(p => p.id === productId);

        if (product) {
            const userCart = registrationData[matchingUserIndex].cart || {};

            if (userCart[productId]) {
                userCart[productId].quantity += 1;
            } else {
                userCart[productId] = {
                    id: productId,
                    name: product.name,
                    price: product.price,
                    quantity: 1
                };
            }

            // Update cart in both places
            registrationData[matchingUserIndex].cart = userCart;
            localStorage.setItem("RegistrationData", JSON.stringify(registrationData));

            currentUser.cart = userCart;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            console.log("Cart updated for user:", currentUser.trn);
        } else {
            console.error("Product not found.");
        }
    } else {
        console.error("User with TRN not found in RegistrationData.");
    }
} else {
    console.log("No user is currently logged in.");
}
    }
});
