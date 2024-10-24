// Handle showing and hiding forms
document.getElementById('signupBtn').addEventListener('click', function() {
    document.getElementById('optionsCard').style.display = 'none';
    document.getElementById('signupCard').style.display = 'block';
});

document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('optionsCard').style.display = 'none';
    document.getElementById('loginCard').style.display = 'block';
});

document.getElementById('backToOptionsFromSignup').addEventListener('click', function() {
    document.getElementById('signupCard').style.display = 'none';
    document.getElementById('optionsCard').style.display = 'block';
});

document.getElementById('backToOptionsFromLogin').addEventListener('click', function() {
    document.getElementById('loginCard').style.display = 'none';
    document.getElementById('optionsCard').style.display = 'block';
});

// Function to handle Sign-up
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const balance = document.getElementById('balance').value;
    
    // Creating user object
    const user = {
        name: name,
        email: email,
        password: password,
        balance: balance
    };
    
    // Storing user in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    alert('Sign-up successful!');
    this.reset();
    document.getElementById('signupCard').style.display = 'none';
    document.getElementById('optionsCard').style.display = 'block';
});

// Function to handle Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;
    
    // Retrieving user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (storedUser && storedUser.email === loginEmail && storedUser.password === loginPassword) {
        alert(`Login successful! Your balance is Rs.${storedUser.balance}`);
    } else {
        alert('Invalid email or password!');
    }
});

// Function to handle Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;
    
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (storedUser && storedUser.email === loginEmail && storedUser.password === loginPassword) {
        alert(`Login successful! Your balance is Rs.${storedUser.balance}`);
        
        // Store logged-in user's email in localStorage
        localStorage.setItem('loggedInUser', JSON.stringify({ email: loginEmail }));
        
        // Redirect to dashboard or relevant page
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid email or password!');
    }
});

// Function to handle Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;
    
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (storedUser && storedUser.email === loginEmail && storedUser.password === loginPassword) {
        message(`Login successful! Your balance is Rs.${storedUser.balance}`);
        
        // Store logged-in user's email in localStorage
        localStorage.setItem('loggedInUser', JSON.stringify({ email: loginEmail }));
        
        // Redirect to dashboard after login
        window.location.href = 'dashboard.html';  // Redirect to the Dashboard page
    } else {
        alert('Invalid email or password!');
    }
});

