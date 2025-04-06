const authForm = document.getElementById("authForm");
const formTitle = document.getElementById("formTitle");
const toggleSignup = document.getElementById("toggleSignup");
const errorMessage = document.getElementById("errorMessage");
const lockoutMessage = document.getElementById("lockoutMessage");
const loginButton = document.getElementById("loginButton");

let isSignup = false;
const LOCKOUT_TIME = 1 * 60 * 1000; // 1 minutes in milliseconds

function checkLockout() {
    const lockoutData = JSON.parse(localStorage.getItem("lockout")) || {};
    const now = Date.now();

    if (lockoutData.time && now < lockoutData.time + LOCKOUT_TIME) {
        const remainingTime = Math.ceil((lockoutData.time + LOCKOUT_TIME - now) / 1000);
        disableLogin(remainingTime);
    } else {
        localStorage.removeItem("lockout");
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
    event.preventDefault();
    isSignup = !isSignup;
    formTitle.textContent = isSignup ? "Sign Up" : "Login";
    toggleSignup.textContent = isSignup ? "Already have an account? Login" : "Not a member? Sign up";

    if (isSignup) {
        const emailGroup = document.createElement("div");
        emailGroup.classList.add("input-group");
        emailGroup.innerHTML = `
            <label for="email">Email:</label>
            <input type="email" id="email" required>
        `;
        authForm.insertBefore(emailGroup, authForm.firstChild);
    } else {
        document.querySelector(".input-group").remove();
    }
});

authForm.addEventListener("submit", (event) => {
    event.preventDefault();
    errorMessage.textContent = "";

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let attempts = JSON.parse(localStorage.getItem("loginAttempts")) || { count: 0, time: null };

    if (attempts.count >= 3) {
        attempts.time = Date.now();
        localStorage.setItem("lockout", JSON.stringify(attempts));
        checkLockout();
        return;
    }

    if (isSignup) {
        const email = document.getElementById("email").value;

        if (!validateEmail(email)) {
            errorMessage.textContent = "Invalid email format!";
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(user => user.username === username || user.email === email)) {
            errorMessage.textContent = "Username or Email already exists!";
            return;
        }

        const hashedPassword = btoa(password);
        users.push({ username, email, password: hashedPassword });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Signup successful! You can now log in.");
        window.location.reload();
    } else {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.username === username);

        if (user && user.password === btoa(password)) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", username);
            localStorage.removeItem("loginAttempts");
            alert("Login successful!");
            window.location.href = "products.html";
        } else {
            attempts.count++;
            if (attempts.count >= 3) {
                attempts.time = Date.now();
                localStorage.setItem("lockout", JSON.stringify(attempts));
                checkLockout();
            } else {
                localStorage.setItem("loginAttempts", JSON.stringify(attempts));
                errorMessage.textContent = `Invalid login credentials! Attempts left: ${3 - attempts.count}`;
            }
        }
    }
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

window.onload = checkLockout;