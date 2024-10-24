// Fetch the logged-in user's email from localStorage
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (!loggedInUser) {
    alert('You are not logged in! Redirecting to login page...');
    window.location.href = 'home.html'; // Redirect to login page if not logged in
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log(loggedInUser);  // Check if the user is logged in

    if (!loggedInUser) {
        alert('You are not logged in! Redirecting to login page...');
        window.location.href = 'home.html'; // Redirect to login page if not logged in
    }

    // Handle form submission
    document.getElementById('addItemForm').addEventListener('submit', handleAddItem);

    function handleAddItem(event) {
        event.preventDefault();
        console.log('Form submitted');  // Check if the form submission is working

        const itemType = document.getElementById('itemType').value;
        let item = { type: itemType }; // Keep the same variable name

        console.log('Selected item type: ', itemType);  // Check selected item type

        if (itemType === 'card') {
            item.number = document.getElementById('cardNumber').value;
            item.expiry = document.getElementById('expiryDate').value;
            item.cvv = document.getElementById('cvv').value;
        } else if (itemType === 'ticket') {
            item.ticketType = document.getElementById('ticketType').value;
            item.date = document.getElementById('ticketDate').value;
            item.time = document.getElementById('ticketTime').value;
            item.place = document.getElementById('ticketPlace').value;
        } else if (itemType === 'password') {
            item.website = document.getElementById('website').value;
            item.username = document.getElementById('username').value;
            item.password = document.getElementById('password').value;
        }

        console.log('Item to store: ', item);  // Check the item object

        // Get the email of the logged-in user
        const userEmail = loggedInUser.email;

        // Retrieve existing items for this user from localStorage
        let userItems = JSON.parse(localStorage.getItem(userEmail)) || [];
        userItems.push(item);

        // Store updated items for the logged-in user in localStorage
        localStorage.setItem(userEmail, JSON.stringify(userItems));
        alert('Item added to your wallet!');
        document.getElementById('addItemForm').reset(); // Reset the form
    }
});


// Toggle visibility of form fields based on item type
document.getElementById('itemType').addEventListener('change', function() {
    const selectedType = this.value;

    // Get all item fields
    const cardFields = document.getElementById('cardFields');
    const ticketFields = document.getElementById('ticketFields');
    const passwordFields = document.getElementById('passwordFields');

    // Hide and disable all item fields
    cardFields.style.display = 'none';
    ticketFields.style.display = 'none';
    passwordFields.style.display = 'none';

    // Disable all fields in the other sections
    document.querySelectorAll('.item-fields input').forEach(input => {
        input.disabled = true;
    });

    // Show and enable the selected item type fields
    if (selectedType === 'card') {
        cardFields.style.display = 'block';
        document.querySelectorAll('#cardFields input').forEach(input => {
            input.disabled = false; // Enable only card fields
        });
    } else if (selectedType === 'ticket') {
        ticketFields.style.display = 'block';
        document.querySelectorAll('#ticketFields input').forEach(input => {
            input.disabled = false; // Enable only ticket fields
        });
    } else if (selectedType === 'password') {
        passwordFields.style.display = 'block';
        document.querySelectorAll('#passwordFields input').forEach(input => {
            input.disabled = false; // Enable only password fields
        });
    }
});


// Signout button functionality
document.getElementById('signoutBtn').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser'); // Clear logged-in user data
    alert('You have been signed out!');
    window.location.href = 'home.html'; // Redirect to the login page
});
