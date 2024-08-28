// SendMail.js
import React, { useState } from 'react';
import axios from 'axios';

const SendMail = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendMail = async () => {
    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setStatus('Invalid email address');
      return;
    }

    // Send the email
    try {
      const response = await axios.post('http://localhost:5000/send-mail', { email });
      setStatus(response.data.message);
    } catch (error) {
      setStatus('Failed to send email');
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter recipient's email"
      />
      <button onClick={handleSendMail}>Send Email</button>
      <p>Status: {status}</p>
    </div>
  );
};

export default SendMail;
