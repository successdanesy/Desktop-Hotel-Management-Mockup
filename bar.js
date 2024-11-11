let order = [];
let totalAmount = 0;

function filterCategory(category) {
  document.querySelectorAll('.drinks-card').forEach(card => {
    card.style.display = card.getAttribute('data-category') === category ? 'block' : 'none';
  });
}

function addToOrder(drinksName, price) {
  const item = { name: drinksName, price: price };
  order.push(item);
  updateOrderSummary();
}

function updateOrderSummary() {
  const orderList = document.getElementById('orderList');
  orderList.innerHTML = '';
  totalAmount = order.reduce((sum, item) => sum + item.price, 0);

  order.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₦${item.price.toFixed(2)}`;
    orderList.appendChild(li);
  });

  document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
}

function confirmOrder() {
  document.getElementById('modalOrderList').innerHTML = order.map(item => `<li>${item.name} - ₦${item.price.toFixed(2)}</li>`).join('');
  document.getElementById('modalTotalAmount').textContent = totalAmount.toFixed(2);
  document.getElementById('orderModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('orderModal').style.display = 'none';
}

function sendToBar() {
  alert("Order sent to the bar!");
  closeModal();
}
