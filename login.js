document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check credentials
    if (email === "admin@example.com" && password === "admin") {
        // Redirect to home.html for admin
        window.location.href = "home.html";
    } else if (email === "kitchen@example.com" && password === "kitchen") {
        // Redirect to kitchen-update.html for kitchen staff
        window.location.href = "kitchen.html";
    } else if (email === "bar@example.com" && password === "bar") {
        window.location.href = "bar.html"; // Redirect to bar update page
    } else {
        alert('Incorrect email or password. Please try again.');
    }
});
