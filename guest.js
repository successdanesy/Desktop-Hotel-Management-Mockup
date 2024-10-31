document.getElementById('generateReceipt').addEventListener('click', function() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const roomNumber = document.getElementById('roomNumber').value;
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;

  // Styled receipt content
  const receiptContent = `
    <style>
      body { font-family: 'Segoe UI', sans-serif; color: #333; }
      .receipt-container { max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
      .receipt-container h2 { text-align: center; color: #007bff; margin-bottom: 10px; }
      .receipt-item { margin: 8px 0; font-size: 16px; }
      .receipt-item strong { color: #444; }
      .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #999; }
    </style>

    <div class="receipt-container">
      <h2>Antilla Apartments & Suites - Receipt</h2>
      <div class="receipt-item"><strong>Guest Name:</strong> ${name}</div>
      <div class="receipt-item"><strong>Email:</strong> ${email}</div>
      <div class="receipt-item"><strong>Phone:</strong> ${phone}</div>
      <div class="receipt-item"><strong>Room Number:</strong> ${roomNumber}</div>
      <div class="receipt-item"><strong>Check-in Date:</strong> ${checkin}</div>
      <div class="receipt-item"><strong>Check-out Date:</strong> ${checkout}</div>
      <div class="footer">Thank you for choosing Antilla Apartments & Suites! We hope you enjoy your stay.</div>
    </div>
  `;

  const receiptWindow = window.open('', '_blank');
  receiptWindow.document.write(receiptContent);
  receiptWindow.document.close();
});
