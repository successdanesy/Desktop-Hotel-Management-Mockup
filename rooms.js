document.addEventListener('DOMContentLoaded', function() {
  // Define room data
  const rooms = {
    "regular": [
      { roomNumber: 101, status: 'available' },
      { roomNumber: 102, status: 'booked', guestName: 'John Doe', duration: '2 days' }
    ],
    "suite": [
      { roomNumber: 201, status: 'booked', guestName: 'Jane Doe', duration: '1 day' },
      { roomNumber: 202, status: 'available' }
    ],
    "family": [
      { roomNumber: 301, status: 'available' },
      { roomNumber: 302, status: 'booked', guestName: 'Mark Smith', duration: '3 days' }
    ]
  };

  // Function to render rooms
  function renderRooms() {
    Object.keys(rooms).forEach(category => {
      const categoryElement = document.getElementById(`${category}-rooms`);
      rooms[category].forEach(room => {
        const roomElement = document.createElement('div');
        roomElement.classList.add('room-card');
        roomElement.classList.add(room.status);
        roomElement.innerHTML = `
          <h3>Room ${room.roomNumber}</h3>
          <p>Status: <span class="status ${room.status}">${capitalizeFirstLetter(room.status)}</span></p>
          ${room.status === 'booked' ? `
            <p>Guest: ${room.guestName}</p>
            <p>Duration: ${room.duration}</p>
            <button class="action-button">Mark as Cleaned</button>
          ` : `<button class="action-button"><a href="guest.html?roomNumber=${room.roomNumber}">Book Room</a></button>`}
        `;
        categoryElement.appendChild(roomElement);
      });
    });
  }

  // Function to capitalize the first letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Check if there are bookings in localStorage and update room status
  function updateRoomStatuses() {
    Object.keys(rooms).forEach(category => {
      rooms[category].forEach(room => {
        const storedGuestDetails = localStorage.getItem(`room_${room.roomNumber}`);
        if (storedGuestDetails) {
          const guestDetails = JSON.parse(storedGuestDetails);
          room.status = 'booked';
          room.guestName = guestDetails.name;
          room.duration = `${calculateDuration(guestDetails.checkin, guestDetails.checkout)} days`;
        }
      });
    });
    renderRooms();
  }

  // Calculate stay duration
  function calculateDuration(checkin, checkout) {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const duration = (checkoutDate - checkinDate) / (1000 * 3600 * 24); // In days
    return duration;
  }

  // Initial render and update of room statuses
  updateRoomStatuses();
});
