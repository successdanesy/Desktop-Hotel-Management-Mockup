// Example: Display a message when a room card is clicked
document.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('click', () => {
      alert(`Viewing details for ${card.querySelector('h3').innerText}`);
    });
  });
  