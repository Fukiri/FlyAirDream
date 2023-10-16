document.addEventListener('DOMContentLoaded', function () {
    const profileForm = document.getElementById('profile-form');

    profileForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Regular expression for a valid email format
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        // Password should be at least 8 characters long
        var isPasswordValid = password.length >= 8;

        // Check if username, email, and password inputs are not empty
        if (username === '' || email === '' || password === '') {
            alert("Please fill in all fields.");
            return;
        }

        // Check if the email input matches the email regex
        if (!email.match(emailRegex)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Check if the password input meets the minimum length requirement
        if (!isPasswordValid) {
            alert("Please enter a valid password. It should be at least 8 characters long.");
            return;
        }

        const profileSection = document.querySelector('.profile-form');
        profileSection.innerHTML = '<p class="success-message">Changes saved successfully!</p>';
    });
});

function goBack() {
    window.location.href = "FlyAirDream.html";
}
