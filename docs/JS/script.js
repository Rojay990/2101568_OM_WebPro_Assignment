const currentUser = JSON.parse(localStorage.getItem("currentUser"));
// Display the current user from localStorage
if (currentUser) {
    console.log("Current User:", currentUser);
} else {
    console.log("No user is currently logged in.");
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
    const isLoggedIn = JSON.parse(localStorage.getItem("currentUser"));

    const sideLoginLogoutLink = document.getElementById("sideLoginLogoutLink");

    if (isLoggedIn) {
        sideLoginLogoutLink.textContent = "Logout";
        sideLoginLogoutLink.onclick = function() {
            logout();
        };
        sideLoginLogoutLink.onclick = logout;
    } else {
        sideLoginLogoutLink.textContent = "Login";
        sideLoginLogoutLink.onclick = function() {
            login();
        };
    }
});

// Logout function
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "../index.html";
}

// Login function
function login() {
    window.location.href = "../index.html";
}