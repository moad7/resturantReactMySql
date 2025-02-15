import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://127.0.0.1:3000/waiters';

function UpdateWaiterPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const waiterItem = location.state.waiterItem || null;

  const [name, setName] = useState(waiterItem.name || '');

  console.log(waiterItem);

  useEffect(() => {}, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API_URL}/updateWaitersById/${id}`, { name })
      .then(() => {
        alert('Waiter updated successfully! ✅');
        navigate('/waiters');
      })
      .catch((err) => console.error('❌ Error updating waiter:', err));
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
        <h2 className="mb-3">Edit waiter data 👨‍🍳</h2>
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

          <button type="submit" className="btn btn-primary">
            Save changes💾
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateWaiterPage;
