const authForm = document.getElementById("authForm");
const formTitle = document.getElementById("formTitle");
const toggleSignup = document.getElementById("toggleSignup");
const errorMessage = document.getElementById("errorMessage");
const lockoutMessage = document.getElementById("lockoutMessage");
const loginButton = document.getElementById("loginButton");

const LOCKOUT_TIME = 1 * 60 * 1000; // 1 minutes in milliseconds

function checkLockout() {
    const lockoutData = JSON.parse(sessionStorage.getItem("lockout")) || {};
    const now = Date.now();

    if (lockoutData.time && now < lockoutData.time + LOCKOUT_TIME) {
        const remainingTime = Math.ceil((lockoutData.time + LOCKOUT_TIME - now) / 1000);
        disableLogin(remainingTime);
    } else {
        sessionStorage.removeItem("lockout");
    }
}

function disableLogin(seconds) {
    lockoutMessage.style.display = "block";
    lockoutMessage.textContent = `Too many failed attempts. Try again in ${seconds} seconds.`;
    loginButton.disabled = true;

    const countdown = setInterval(() => {
        seconds--;
        if (seconds <= 0) {
            clearInterval(countdown);
            lockoutMessage.style.display = "none";
            loginButton.disabled = false;
        } else {
            lockoutMessage.textContent = `Too many failed attempts. Try again in ${seconds} seconds.`;
        }
    }, 1000);
}

toggleSignup.addEventListener("click", (event) => {
        window.location.href = "HTML/register.html";
});

authForm.addEventListener("submit", (event) => {
    event.preventDefault();
    errorMessage.textContent = "";

    const trn = document.getElementById("trn").value;
    const password = document.getElementById("password").value;
    let attempts = JSON.parse(sessionStorage.getItem("loginAttempts")) || { count: 0, time: null };


    const users = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    console.log(users);
    console.log("Theses are the users");
    const user = users.find(user => user.trn === trn && user.password === password);

    if (user) {
        alert("Login successful!");
        sessionStorage.removeItem("loginAttempts");
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "HTML/home.html"; // Redirect to home.html or homepage
    } else {
        attempts.count++;
        sessionStorage.setItem("loginAttempts", JSON.stringify(attempts));
        errorMessage.textContent = "Invalid TRN or password.";
        if (attempts.count >= 3) {
            attempts.time = Date.now();
            sessionStorage.setItem("lockout", JSON.stringify(attempts));
            checkLockout();
        }
    }
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

window.onload = checkLockout;

function logAllUsers() {
    const users = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    console.log("Registered Users:", users);
}

logAllUsers();
