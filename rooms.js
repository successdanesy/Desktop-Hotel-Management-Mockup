document.getElementById('status-filter').addEventListener('change', filterRooms);
document.getElementById('room-type-filter').addEventListener('change', filterRooms);

function filterRooms() {
  const statusFilter = document.getElementById('status-filter').value;
  const typeFilter = document.getElementById('room-type-filter').value;

  document.querySelectorAll('.room-card').forEach(card => {
    const matchesStatus = statusFilter === 'all' || card.classList.contains(statusFilter);
    const matchesType = typeFilter === 'all' || card.closest('.room-category').querySelector('h2').innerText.includes(typeFilter);
    
    card.style.display = matchesStatus && matchesType ? '' : 'none';
  });
}
