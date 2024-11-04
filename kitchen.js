// kitchen.js
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const roomNumber = document.getElementById('roomNumber').value;
    const dishName = document.getElementById('dishSelector').value;
    const quantity = document.getElementById('quantity').value;
    const specialInstructions = document.getElementById('specialInstructions').value;
    
    const orderList = document.getElementById('orderList');
    
    const orderItem = document.createElement('div');
    orderItem.innerHTML = `
      <strong>Room ${roomNumber}</strong><br>
      Dish: ${dishName} (x${quantity})<br>
      Instructions: ${specialInstructions || "None"}
    `;
    
    orderList.appendChild(orderItem);
    document.getElementById('orderForm').reset();
    document.getElementById('selectedDish').innerHTML = '';
  });
  
  const dishSelector = document.getElementById('dishSelector');
  dishSelector.addEventListener('change', function() {
    const selectedOption = dishSelector.options[dishSelector.selectedIndex];
    const imgSrc = selectedOption.getAttribute('data-img');
    const price = selectedOption.getAttribute('data-price');
    
    document.getElementById('dishImg').src = imgSrc;
    document.getElementById('dishDetails').innerText = `${selectedOption.text} - $${price}`;
  });
  