
const nextButton = document.getElementById('nextButton');
let newPassword = document.getElementById('new-Password');
let confirmPassword = document.getElementById('confirm-Password');
let resetButton = document.getElementById('resetButton');
const allUser = JSON.parse(localStorage.getItem('RegistrationData')) || {};
let errorMessage = document.getElementById('errorMessage');

// Add an event listener to the "Next" button
nextButton.addEventListener('click', () => {
    // Retrieve data from localStorage
    

    const trn = document.getElementById('trn').value;

    // Validate the TRN format
    const trnPattern = /^\d{3}-\d{3}-\d{3}$/;
    if (!trnPattern.test(trn)) {
        alert('Invalid TRN format. Please enter in the format 000-000-000.');
        return;
    }

    // Loop through allUser to find the matching TRN
    let userFound = false;
    for (const user of allUser) {
        if (user.trn === trn) {
            userFound = true;
            nextButton.style.display = 'none';
            newPassword.style.display = 'block';
            confirmPassword.style.display = 'block';
            resetButton.style.display = 'block';
            break;
        }
    }

    if (!userFound) {
        alert('No user found with the provided TRN.');
    }
});

// Add an event listener to the "Reset" button
resetButton.addEventListener('click', () => {
    const newPasswordValue = newPassword.value;
    const confirmPasswordValue = confirmPassword.value;

    // Validate that both password fields match
    if (newPasswordValue !== confirmPasswordValue) {
        errorMessage.textContent ='Passwords do not match. Please try again.';
        return;
    }

    // Validate password strength (example: at least 8 characters)
    if (newPasswordValue.length < 8) {
        errorMessage.textContent ='Password must be at least 8 characters long.';
        return;
    }

    const trn = document.getElementById('trn').value;

    // Update the user's password
    for (const user of allUser) {
        if (user.trn === trn) {
            user.password = newPasswordValue;
            break;
        }
    }

    // Save the updated data back to localStorage
    localStorage.setItem('RegistrationData', JSON.stringify(allUser));

    alert('Password has been successfully reset.');
    window.location.href = '../index.html'; // Redirect to login page
});