const toggleSignup = document.getElementById("toggleLogin");
document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const trn = document.getElementById('trn').value.trim();
    const password = document.getElementById('password').value;

    const errorMsg = document.getElementById('error');
    errorMsg.textContent = '';

    // Validate all fields
    if (!firstName || !lastName || !dob || !gender || !phone || !email || !trn || !password) {
    errorMsg.textContent = "All fields are required.";
    return;
    }

    // Validate password length
    if (password.length < 8) {
    errorMsg.textContent = "Password must be at least 8 characters long.";
    return;
    }

    // Validate age
    const age = calculateAge(new Date(dob));
    if (age < 18) {
    errorMsg.textContent = "You must be at least 18 years old to register.";
    return;
    }

    // Validate TRN format
    const trnPattern = /^\d{3}-\d{3}-\d{3}$/;
    if (!trnPattern.test(trn)) {
    errorMsg.textContent = "TRN must be in the format 000-000-000.";
    return;
    }

    // Check TRN uniqueness
    const existingData = JSON.parse(localStorage.getItem('RegistrationData')) || [];
    if (existingData.some(user => user.trn === trn)) {
    errorMsg.textContent = "TRN already registered.";
    return;
    }

    // Save registration info
    const userData = {
    firstName,
    lastName,
    dob,
    gender,
    phone,
    email,
    trn,
    password,
    registrationDate: new Date().toISOString(),
    cart: {},
    invoices: []
    };

    existingData.push(userData);
    localStorage.setItem('RegistrationData', JSON.stringify(existingData));
    alert("Registration successful!");
    resetForm();
    console.log("User data saved:", userData);
    window.location.href = "login.html"; // Redirect to login page after registration
});

function calculateAge(dob) {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
    }
    return age;
}

function resetForm() {
    document.getElementById('registrationForm').reset();
    document.getElementById('error').textContent = '';
}

toggleLogin.addEventListener("click", (event) => {
        window.location.href = "login.html";
});

