document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const switchHotels = document.getElementById('switch-hotels').checked;

    // Validate form inputs (simple validation)
    if (email && password) {
        alert(`Logging in with Email: ${email}, Password: ${password}, Switch Hotels: ${switchHotels}`);
        
        // Perform the login process (authentication logic here)
    } else {
        alert('Please fill in all fields.');
    }
});
