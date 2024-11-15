let barOrder = [];
let barTotalAmount = 0;

function filterCategory(category) {
  document.querySelectorAll('.drinks-card').forEach(card => {
    card.style.display = card.getAttribute('data-category') === category ? 'block' : 'none';
  });
}

function addToOrder(drinksName, price) {
  const item = { name: drinksName, price: price };
  barOrder.push(item);
  updateOrderSummary();
}

function updateOrderSummary() {
  const orderList = document.getElementById('orderList');
  orderList.innerHTML = '';
  barTotalAmount = barOrder.reduce((sum, item) => sum + item.price, 0);

  barOrder.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₦${item.price.toFixed(2)}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    deleteButton.classList.add('delete-btn');
    deleteButton.onclick = () => removeFromOrder(index);
    li.appendChild(deleteButton);

    orderList.appendChild(li);
  });

  document.getElementById('totalAmount').textContent = barTotalAmount.toFixed(2);
}

function removeFromOrder(index) {
  barOrder.splice(index, 1); // Remove item at index
  updateOrderSummary(); // Refresh the summary
}

function clearOrder() {
  barOrder = [];
  barTotalAmount = 0;
  updateOrderSummary(); // Update the order summary section

  // Display the log message
  alert("All orders have been cleared.");

  // Optionally, reset the order summary UI
  const orderList = document.getElementById('orderList');
  orderList.innerHTML = ''; // Clear the order list
  document.getElementById('totalAmount').textContent = '0.00'; // Reset the total amount

  // Reset the special instructions field as well
  document.getElementById('specialInstructions').value = '';
}

function showOrderSummaryPopup() {
  const orderSummaryList = document.getElementById('orderSummaryList');
  orderSummaryList.innerHTML = ''; // Clear any previous summary

  barOrder.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₦${item.price.toFixed(2)}`;
    orderSummaryList.appendChild(li);
  });

  // Set the total and room number in the popup
  document.getElementById('orderSummaryTotal').textContent = barTotalAmount.toFixed(2);
  document.getElementById('orderSummaryRoomNumber').textContent = document.getElementById('roomNumber').value;

  // Show the temporary order summary
  document.getElementById('orderSummaryPopup').style.display = 'block';
}

function closeSummaryPopup() {
  // Hide the order summary popup
  document.getElementById('orderSummaryPopup').style.display = 'none';
}

function logOrderSummaryToConsole() {
  console.log("Order Summary (console):");
  barOrder.forEach(item => {
    console.log(`${item.name} - ₦${item.price.toFixed(2)}`);
  });
  console.log(`Total: ₦${barTotalAmount.toFixed(2)}`);
}

function sendToBar() {
  const roomNumber = document.getElementById('roomNumber').value;
  const specialInstructions = document.getElementById('specialInstructions').value;

  // Send room number, order, and special instructions to the front desk
  const orderData = {
    room: roomNumber,
    items: barOrder, // Use barOrder, not the undefined "order"
    total: barTotalAmount,
    instructions: specialInstructions
  };

  // For now, display the order data as an alert for demo purposes
  alert(`Order sent to front desk for room ${roomNumber}!\nDetails: ${JSON.stringify(orderData, null, 2)}`);

  // Clear the order and close the summary
  clearOrder(); // Call clearOrder() to clear the order and display the log
  closeSummaryPopup(); // Close the order summary popup
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
  const clearAllOrdersButton = document.getElementById('clearAllOrdersButton');
  clearAllOrdersButton.addEventListener('click', clearOrder);

  const sendToFrontDeskButtons = document.getElementsByClassName('send-to-frontdesk');
  
  Array.from(sendToFrontDeskButtons).forEach(button => {
    button.addEventListener('click', () => {
      // Show the order summary popup
      showOrderSummaryPopup();
      
      // Log the order details to the console
      logOrderSummaryToConsole();
      
      // Send the order to the front desk
      sendToBar();
    });
  });
});

// Bar Updates
document.addEventListener('DOMContentLoaded', () => {
  const updateForm = document.getElementById('update-form');
  const updateInput = document.getElementById('update-input');
  const updatesSection = document.getElementById('bar-updates');

  // Load and display existing updates from localStorage
  const loadUpdates = () => {
    const updates = JSON.parse(localStorage.getItem('barUpdates')) || [];
    updates.forEach(update => displayUpdate(update.text, update.time));
  };

  const displayUpdate = (text, time) => {
    const updateItem = document.createElement('p');
    updateItem.textContent = `${time} - ${text}`;
    updatesSection.appendChild(updateItem);
  };

  // Handle update submission
  updateForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const updateText = updateInput.value.trim();
    if (updateText) {
      const currentTime = new Date().toLocaleTimeString();
      sendUpdate(updateText, currentTime);
      displayUpdate(updateText, currentTime);
      updateInput.value = '';
    }
  });

  // Function to send updates to localStorage (mock server)
  function sendUpdate(updateText, time) {
    const updates = JSON.parse(localStorage.getItem('barUpdates')) || [];
    updates.push({ text: updateText, time: time });
    localStorage.setItem('barUpdates', JSON.stringify(updates));
    alert(`Update sent: "${updateText}"`);
  }

  // Load updates on page load
  loadUpdates();
});
