import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://127.0.0.1:3000/waiters/addNewWaiters';

function AddWaiterPage() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(
        API_URL,
        { name },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(() => {
        alert('Waiter added successfully!✅');
        navigate('/waiters');
      })
      .catch((err) => {
        console.error('Error adding waiter:❌', err);
        alert('An error occurred while adding the waiter.❌');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container mt-4">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate('/waiters')}
      >
        🔙 Back to waiters list
      </button>

      <div className="card shadow p-4">
        <h2 className="mb-3">Add a new waiter➕</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Waiter's name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Adding...⏳' : 'Add ➕'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddWaiterPage;
