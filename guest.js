document.addEventListener('DOMContentLoaded', function() {
  // Handle form submission
  document.getElementById('guestForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const guestName = document.getElementById('name').value;
    const guestEmail = document.getElementById('email').value;
    const guestPhone = document.getElementById('phone').value;
    const roomNumber = document.getElementById('roomNumber').value;
    const checkinDate = document.getElementById('checkin').value;
    const checkoutDate = document.getElementById('checkout').value;

    // Create guest object
    const guestDetails = {
      name: guestName,
      email: guestEmail,
      phone: guestPhone,
      roomNumber: roomNumber,
      checkin: checkinDate,
      checkout: checkoutDate,
      status: 'Booked'
    };

    // Store the guest details in localStorage using room number as the key
    localStorage.setItem(`room_${roomNumber}`, JSON.stringify(guestDetails));

    // Redirect back to room management page (room.html)
    window.location.href = 'rooms.html';
  });
});
