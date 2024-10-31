document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check credentials
    if (email === "admin@example.com" && password === "admin") {
        // Redirect to home.html
        window.location.href = "home.html";
    } else {
        alert('Incorrect email or password. Please try again.');
    }
});
