console.log("dashboard Js is running");

const product1 = document.getElementById("product1");
const product2 = document.getElementById("product2");
const product3 = document.getElementById("product3");

const allProducts = JSON.parse(localStorage.getItem("AllProducts")) || [];

function updateProducts() {
let product1item, product2item, product3item;

// Ensure unique random IDs
do {
    product1item = Math.floor(Math.random() * allProducts.length);
    product2item = Math.floor(Math.random() * allProducts.length);
    product3item = Math.floor(Math.random() * allProducts.length);
} while (
    product1item === product2item ||
    product1item === product3item ||
    product2item === product3item
);

const selectedProduct1 = allProducts[product1item];
const selectedProduct2 = allProducts[product2item];
const selectedProduct3 = allProducts[product3item];

// Apply fade-out class
[product1, product2, product3].forEach(el => el.classList.add("fade"));

// Wait for fade to complete, then update content
setTimeout(() => {
    product1.innerHTML = `
    <img src="${selectedProduct1.image}" alt="${selectedProduct1.name}">
    <h3>${selectedProduct1.name}</h3>
    <h3>${selectedProduct1.description}</h3>
    <p>$${selectedProduct1.price.toFixed(2)}</p>`;

    product2.innerHTML = `
    <img src="${selectedProduct2.image}" alt="${selectedProduct2.name}">
    <h3>${selectedProduct2.name}</h3>
    <h3>${selectedProduct2.description}</h3>
    <p>$${selectedProduct2.price.toFixed(2)}</p>`;

    product3.innerHTML = `
    <img src="${selectedProduct3.image}" alt="${selectedProduct3.name}">
    <h3>${selectedProduct3.name}</h3>
    <h3>${selectedProduct3.description}</h3>
    <p>$${selectedProduct3.price.toFixed(2)}</p>`;

    // Trigger fade-in
    [product1, product2, product3].forEach(el => {
    el.classList.remove("fade");
    });
}, 500);
}

// Initial load
updateProducts();

// Repeat every 30 seconds
setInterval(updateProducts, 5000);

const registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
console.log("Registration Data:", registrationData);