let order = [];
let totalAmount = 0;

function filterCategory(category) {
  document.querySelectorAll('.dish-card').forEach(card => {
    card.style.display = card.getAttribute('data-category') === category ? 'block' : 'none';
  });
}

function addToOrder(dishName, price) {
  const item = { name: dishName, price: price };
  order.push(item);
  updateOrderSummary();
}

function updateOrderSummary() {
  const orderList = document.getElementById('orderList');
  orderList.innerHTML = '';
  totalAmount = order.reduce((sum, item) => sum + item.price, 0);

  order.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₦${item.price.toFixed(2)}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    deleteButton.classList.add('delete-btn');
    deleteButton.onclick = () => removeFromOrder(index);
    li.appendChild(deleteButton);

    orderList.appendChild(li);
  });

  document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
}

function removeFromOrder(index) {
  order.splice(index, 1); // Remove item at index
  updateOrderSummary(); // Refresh the summary
}

function clearOrder() {
  order = [];
  totalAmount = 0;
  updateOrderSummary();
  alert("All orders have been cleared.");
}

function confirmOrder() {
  const roomNumber = document.getElementById('roomNumber').value; // Get selected room number
  
  if (!roomNumber) {
    alert('Please select a room number.');
    return;
  }

  // Create the order summary
  const orderSummaryList = document.getElementById('orderSummaryList');
  orderSummaryList.innerHTML = ''; // Clear any previous summary

  order.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₦${item.price.toFixed(2)}`;
    orderSummaryList.appendChild(li);
  });

  // Set the total and room number in the popup
  document.getElementById('orderSummaryTotal').textContent = totalAmount.toFixed(2);
  document.getElementById('orderSummaryRoomNumber').textContent = roomNumber;

  // Show the temporary order summary
  document.getElementById('orderSummaryPopup').style.display = 'block';
}

function closeSummaryPopup() {
  // Hide the order summary popup
  document.getElementById('orderSummaryPopup').style.display = 'none';
}

function sendToKitchen() {
  const roomNumber = document.getElementById('roomNumber').value;
  const specialInstructions = document.getElementById('specialInstructions').value;

  // Send room number, order, and special instructions to the front desk
  const orderData = {
    room: roomNumber,
    items: order,
    total: totalAmount,
    instructions: specialInstructions
  };

  // For now, display the order data as an alert for demo purposes
  alert(`Order sent to front desk for room ${roomNumber}!\nDetails: ${JSON.stringify(orderData, null, 2)}`);

  // Clear the order and close the summary
  clearOrder();
  closeSummaryPopup();
}

// Initialize Clear All Orders button
document.addEventListener('DOMContentLoaded', () => {
  const clearAllOrdersButton = document.getElementById('clearAllOrdersButton');
  clearAllOrdersButton.addEventListener('click', clearOrder);
});

document.addEventListener('DOMContentLoaded', () => {
  const sendToFrontDeskButtons = document.getElementsByClassName('send-to-frontdesk');

  Array.from(sendToFrontDeskButtons).forEach(button => {
    button.addEventListener('click', confirmOrder);
  });
});

// Kitchen Updates
document.addEventListener('DOMContentLoaded', () => {
  const updateForm = document.getElementById('update-form');
  const updateInput = document.getElementById('update-input');
  const updatesSection = document.getElementById('kitchen-updates');

  // Load and display existing updates from localStorage
  const loadUpdates = () => {
    const updates = JSON.parse(localStorage.getItem('kitchenUpdates')) || [];
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
      updateInput.value = ''; // Clear input field after sending
    }
  });

  // Function to send updates to localStorage (mock server)
  function sendUpdate(updateText, time) {
    const updates = JSON.parse(localStorage.getItem('kitchenUpdates')) || [];
    updates.push({ text: updateText, time: time });
    localStorage.setItem('kitchenUpdates', JSON.stringify(updates));
    alert(`Update sent: "${updateText}"`);
  }

  // Load updates on page load
  loadUpdates();
});
