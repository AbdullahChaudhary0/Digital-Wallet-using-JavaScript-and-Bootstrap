// Fetch the logged-in user's data from localStorage
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (!loggedInUser) {
    alert('You are not logged in! Redirecting to login page...');
    window.location.href = 'home.html'; // Redirect to login page if not logged in
}

// Retrieve the user's data (wallet balance) from localStorage
const storedUser = JSON.parse(localStorage.getItem('user'));
const userEmail = loggedInUser.email;

// Display Wallet Balance
const walletBalanceElement = document.getElementById('balanceAmount');
let userBalance = storedUser ? storedUser.balance : 0; // Default to 0 if storedUser is null

if (userBalance !== undefined) {
    walletBalanceElement.textContent = `Rs. ${userBalance}`; // Show balance formatted

    // Show notification if balance is below Rs. 1000
    if (userBalance < 1000) {
        const purchaseMessage = document.getElementById('purchaseMessage');
        purchaseMessage.textContent = 'Your balance is below Rs. 1000. Please add more funds to your wallet.';
        purchaseMessage.style.display = 'block';
        purchaseMessage.style.color = 'red'; // Set notification color
    }

    // Function to handle purchase
    function handlePurchase(price) {
        if (userBalance >= price) {
            userBalance -= price; // Deduct the price from the wallet balance
            storedUser.balance = userBalance; // Update balance in user object
            localStorage.setItem('user', JSON.stringify(storedUser)); // Update user data in localStorage
            walletBalanceElement.textContent = `Rs. ${userBalance}`; // Update the displayed balance
            showMessage("Purchase successful!", "success");
        } else {
            showMessage("Insufficient balance. Please add more funds.", "error");
        }
    }

    // Show message
    function showMessage(message, type) {
        const purchaseMessage = document.getElementById('purchaseMessage');
        purchaseMessage.innerText = message;
        purchaseMessage.style.display = 'block';
        purchaseMessage.style.color = type === "error" ? 'red' : 'green';
    }

    // Event listeners for buy buttons
    document.querySelectorAll('.buyBtn').forEach(button => {
        button.addEventListener('click', function () {
            const price = parseFloat(this.getAttribute('data-price'));
            handlePurchase(price);
        });
    });
} else {
    console.error('User balance is not defined.');
}


if (!loggedInUser) {
    alert('You are not logged in! Redirecting to login page...');
    window.location.href = 'home.html'; // Redirect to login page if not logged in
}


// Event listener for buy buttons
document.querySelectorAll('.buyBtn').forEach(button => {
    button.addEventListener('click', function () {
        const price = parseInt(this.getAttribute('data-price'));

        // Check if the user has enough balance
        if (userBalance >= price) {
            // Deduct the price from the user's balance
            userBalance -= price;
            balanceAmount.textContent = `$${userBalance}`;

            // Save purchase to local storage
            savePurchase(userEmail, this.parentElement.querySelector('h6').textContent, price);

            // Show success message
            purchaseMessage.style.display = 'block';
            purchaseMessage.textContent = 'Purchase successful!';
        } else {
            // Show insufficient funds message
            purchaseMessage.style.display = 'block';
            purchaseMessage.textContent = 'Insufficient funds.';
        }
    });
});

// Function to save purchase details in local storage
function savePurchase(email, productName, price) {
    // Get existing purchases from local storage
    let purchases = JSON.parse(localStorage.getItem(email)) || [];

    // Create a new purchase record
    const newPurchase = {
        product: productName,
        price: price,
        date: new Date().toISOString() // Store the date of purchase
    };

    // Add the new purchase to the array
    purchases.push(newPurchase);

    // Save the updated purchases back to local storage
    localStorage.setItem(email, JSON.stringify(purchases));
}


// Signout button functionality
document.getElementById('signoutBtn').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser'); // Clear logged-in user data
    alert('You have been signed out!');
    window.location.href = 'home.html'; // Redirect to the login page
});

