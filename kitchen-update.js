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
  
    // Update the total order count
    document.getElementById("totalOrders").textContent = document.querySelectorAll(".order-card").length;
  
    // Mark an order as in progress
    window.markInProgress = function(orderId) {
      const orderElement = document.getElementById(orderId);
      orderElement.classList.add('in-progress');
      alert("Order marked as In Progress.");
    };
  
    // Mark an order as completed
    window.markCompleted = function(orderId) {
      const orderElement = document.getElementById(orderId);
      orderElement.classList.add('completed');
      alert("Order marked as Completed.");
    };
  
    // Load updates on page load
    loadUpdates();
  });
  