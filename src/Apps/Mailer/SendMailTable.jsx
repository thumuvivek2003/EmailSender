// SendMailTable.js
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const SendMailTable = () => {
  const [status, setStatus] = useState({});
  const [sending, setSending] = useState(false);
  const ids = [
                'S190783', 
                'S190783', 
                'S190783', 
                'S190783', 
                'S190783', 
            ];

  const handleSend = async (id) => {
    setStatus((prevStatus) => ({ ...prevStatus, [id]: 'Sending...' }));
    try {
      const response = await axios.post('http://localhost:5000/send-mail', { email: `${id}@rguktsklm.ac.in` });
      setStatus((prevStatus) => ({ ...prevStatus, [id]: response.data.message }));
    } catch (error) {
      setStatus((prevStatus) => ({ ...prevStatus, [id]: 'Failed to send' }));
    }
  };

  const handleSendAll = async () => {
    setSending(true);
    for (const id of ids) {
      await handleSend(id);
    }
    setSending(false);
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-primary mb-3" onClick={handleSendAll} disabled={sending}>
        {sending ? 'Sending All...' : 'Send All'}
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ids.map((id) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{status[id] === 'Sent' ? <FontAwesomeIcon icon={faCheck} color="green" /> : status[id]}</td>
              <td>
                <button className="btn btn-secondary" onClick={() => handleSend(id)} disabled={status[id] === 'Sending...' || status[id] === 'Sent'}>
                  {status[id] === 'Sending...' ? 'Sending' : 'Send'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SendMailTable;
