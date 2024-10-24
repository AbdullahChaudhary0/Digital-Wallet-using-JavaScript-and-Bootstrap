// Fetch the logged-in user's email from localStorage
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (!loggedInUser) {
    alert('You are not logged in! Redirecting to login page...');
    window.location.href = 'home.html'; // Redirect to login page if not logged in
}

// Retrieve the user's data (wallet balance) from localStorage
const storedUser = JSON.parse(localStorage.getItem('user'));
const userEmail = loggedInUser.email;

// Display current balance
const currentBalanceElement = document.getElementById('currentBalance');
currentBalanceElement.textContent = `$${storedUser.balance || 0}`;

// Function to update balance in local storage
function updateBalance(amount) {
    storedUser.balance = (storedUser.balance || 0) + amount;
    localStorage.setItem('user', JSON.stringify(storedUser));
    currentBalanceElement.textContent = `$${storedUser.balance}`;
}

// Add Funds button functionality
document.getElementById('addFundsBtn').addEventListener('click', function () {
    const addFundsAmount = document.getElementById('addFundsAmount').value;
    const amount = parseInt(addFundsAmount);

    if (amount > 0) {
        // Update balance
        updateBalance(amount);

        // Log the transaction
        logTransaction(`Added $${amount}`, amount);

        // Clear the input field
        document.getElementById('addFundsAmount').value = '';
    } else {
        alert('Please enter a valid amount.');
    }
});

// Function to log transaction in local storage
function logTransaction(description, amount) {
    let transactions = JSON.parse(localStorage.getItem(`${userEmail}_transactions`)) || [];

    const transaction = {
        description: description,
        amount: amount,
        date: new Date().toISOString()
    };

    transactions.push(transaction);
    localStorage.setItem(`${userEmail}_transactions`, JSON.stringify(transactions));

    // Display the updated transactions list
    displayTransactions();
}

// Function to display recent transactions and purchases
function displayTransactions() {
    const transactionsList = document.getElementById('transactionsList');
    const purchasesList = document.getElementById('purchasesList');
    
    transactionsList.innerHTML = ''; 
    purchasesList.innerHTML = ''; 

    const transactions = JSON.parse(localStorage.getItem(`${userEmail}_transactions`)) || [];
    const purchases = JSON.parse(localStorage.getItem(userEmail)) || [];

    // Display recent transactions
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${transaction.description} - ${transaction.amount} (Date: ${new Date(transaction.date).toLocaleString()})`;
        transactionsList.appendChild(li);
    });

    // Display recent purchases
    purchases.forEach(purchase => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${purchase.product} - $${purchase.price} (Date: ${new Date(purchase.date).toLocaleString()})`;
        purchasesList.appendChild(li);
    });
}

// Initial display of transactions and purchases
displayTransactions();

// Signout button functionality
document.getElementById('signoutBtn').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser'); // Clear logged-in user data
    alert('You have been signed out!');
    window.location.href = 'home.html'; // Redirect to the login page
});
