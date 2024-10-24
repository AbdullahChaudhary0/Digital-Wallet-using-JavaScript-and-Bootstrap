// Fetch the logged-in user's email from localStorage
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (!loggedInUser) {
    alert('You are not logged in! Redirecting to login page...');
    window.location.href = 'home.html'; // Redirect to login page if not logged in
}

// Retrieve the user's data (wallet balance, items) from localStorage
const storedUser = JSON.parse(localStorage.getItem('user'));
const userEmail = loggedInUser.email;

// Display Wallet Balance
const walletBalanceElement = document.getElementById('walletBalance');
const userBalance = storedUser.balance;

walletBalanceElement.textContent = `Rs. ${userBalance}`;

// Show notification if balance is below Rs.1000
if (userBalance < 1000) {
    const balanceNotification = document.getElementById('balanceNotification');
    balanceNotification.textContent = 'Your balance is below Rs.1000. Please add more funds to your wallet.';
    balanceNotification.style.display = 'block';
}

// Retrieve the user's wallet items from localStorage
let userItems = JSON.parse(localStorage.getItem(userEmail)) || [];

// Display Wallet Items by category
const cardsList = document.getElementById('cardsList');
const ticketsList = document.getElementById('ticketsList');
const passwordsList = document.getElementById('passwordsList');

// Function to create list items dynamically
function createListItem(content, dataAttribute) {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.textContent = content;

    // Set data attributes for sensitive information
    if (dataAttribute) {
        li.setAttribute('data-item', JSON.stringify(dataAttribute));
        li.classList.add('item-card'); // Add a class to identify the items that can be clicked
        li.style.cursor = 'pointer'; // Change cursor to pointer for better UX
    }

    return li;
}

// Sort items into categories and display them
function displayItems() {
    cardsList.innerHTML = '';
    ticketsList.innerHTML = '';
    passwordsList.innerHTML = '';

    userItems.forEach((item, index) => {
        const dataAttribute = { ...item, index }; // Include index for deletion and editing
        if (item.type === 'card') {
            cardsList.appendChild(createListItem(`Card Number: **********`, dataAttribute));
        } else if (item.type === 'ticket') {
            ticketsList.appendChild(createListItem(`Ticket: ${item.ticketType}, Date: ${item.date}, Time: ${item.time}, Place: ${item.place}`, dataAttribute));
        } else if (item.type === 'password') {
            passwordsList.appendChild(createListItem(`Website: ${item.website}`, dataAttribute));
        }
    });
}

// Call the function to initially display items
displayItems();

// Signout button functionality
document.getElementById('signoutBtn').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser'); // Clear logged-in user data
    alert('You have been signed out!');
    window.location.href = 'home.html'; // Redirect to the login page
});

// Function to show item details in a modal
function showItemDetails(item) {
    const itemDetailsContent = document.getElementById('itemDetailsContent');
    itemDetailsContent.innerHTML = ` 
        <p><strong>Type:</strong> ${item.type}</p>
        ${item.type === 'card' ? ` 
            <p><strong>Card Number:</strong> ${item.number}</p>
            <p><strong>Expiration Date:</strong> ${item.expiry}</p>
            <p><strong>CVV:</strong> ${item.cvv}</p>
        ` : item.type === 'ticket' ? `
            <p><strong>Ticket Type:</strong> ${item.ticketType}</p>
            <p><strong>Date:</strong> ${item.date}</p>
            <p><strong>Time:</strong> ${item.time}</p>
            <p><strong>Place:</strong> ${item.place}</p>
        ` : `
            <p><strong>Website:</strong> ${item.website}</p>
            <p><strong>Username:</strong> ${item.username}</p>
            <p><strong>Password:</strong> ${item.password}</p>
        `}
    `;
}

// Add event listeners to list items to show modal with details
let selectedItemIndex = null; // Store the index of the selected item
document.querySelectorAll('.item-card').forEach(item => {
    item.addEventListener('click', function() {
        const itemData = JSON.parse(item.getAttribute('data-item'));
        selectedItemIndex = itemData.index; // Store the index of the selected item
        showItemDetails(itemData);
        const itemDetailModal = new bootstrap.Modal(document.getElementById('itemDetailModal'));
        itemDetailModal.show();
    });
});

// Handle Delete action in the modal
document.getElementById('deleteItemBtn').addEventListener('click', function() {
    if (selectedItemIndex !== null) {
        userItems.splice(selectedItemIndex, 1); // Remove the item from the array
        localStorage.setItem(userEmail, JSON.stringify(userItems)); // Update localStorage
        displayItems(); // Refresh the displayed items
        const itemDetailModal = bootstrap.Modal.getInstance(document.getElementById('itemDetailModal'));
        itemDetailModal.hide(); // Close the modal
        alert('Item deleted successfully.');
    }
});

// Handle Edit action in the modal
document.getElementById('editItemBtn').addEventListener('click', function() {
    if (selectedItemIndex !== null) {
        const itemData = userItems[selectedItemIndex]; // Get the selected item directly from the userItems array
        let newValue;

        // Depending on the item type, prompt for the appropriate fields
        if (itemData.type === 'card') {
            newValue = prompt('Edit item:\nEnter new card number and expiry (comma separated):', `${itemData.number}, ${itemData.expiry}`);
            if (newValue) {
                const [newNumber, newExpiry] = newValue.split(',').map(value => value.trim());
                itemData.number = newNumber; // Update the card number
                itemData.expiry = newExpiry; // Update the expiry date
            }
        } else if (itemData.type === 'ticket') {
            newValue = prompt('Edit item:\nEnter new ticket type, date, time, and place (comma separated):', `${itemData.ticketType}, ${itemData.date}, ${itemData.time}, ${itemData.place}`);
            if (newValue) {
                const [newType, newDate, newTime, newPlace] = newValue.split(',').map(value => value.trim());
                itemData.ticketType = newType; // Update the ticket type
                itemData.date = newDate; // Update the date
                itemData.time = newTime; // Update the time
                itemData.place = newPlace; // Update the place
            }
        } else if (itemData.type === 'password') {
            newValue = prompt('Edit item:\nEnter new website, username, and password (comma separated):', `${itemData.website}, ${itemData.username}, ${itemData.password}`);
            if (newValue) {
                const [newWebsite, newUsername, newPassword] = newValue.split(',').map(value => value.trim());
                itemData.website = newWebsite; // Update the website
                itemData.username = newUsername; // Update the username
                itemData.password = newPassword; // Update the password
            }
        }

        // Save updated item back to userItems and localStorage
        if (newValue) {
            userItems[selectedItemIndex] = itemData; // Update the item in the array
            localStorage.setItem(userEmail, JSON.stringify(userItems)); // Update localStorage
            displayItems(); // Refresh the displayed items
            const itemDetailModal = bootstrap.Modal.getInstance(document.getElementById('itemDetailModal'));
            itemDetailModal.hide(); // Close the modal
            alert('Item edited successfully.');
        }
    }
});

