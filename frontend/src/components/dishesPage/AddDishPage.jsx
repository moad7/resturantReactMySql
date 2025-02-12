import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const url = 'http://127.0.0.1:3000/dishes/addNewDishes';

function AddDishPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !time) {
      alert('⚠️ Please fill in all required fields!');
      return;
    }

    setLoading(true);
    const newDish = { name, price, time, image: image || null };

    axios
      .post(url, newDish, { headers: { 'Content-Type': 'application/json' } })
      .then(() => {
        alert('✅ Dish added successfully!');
        navigate('/dishes');
      })
      .catch((err) => console.error('Error adding dish:', err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-4">🍽️ Add New Dish</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Dish Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Margherita Pizza"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price (₪):</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g., 50"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Preparation Time (minutes):</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g., 15"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL (Optional):</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          {image && (
            <div className="text-center mb-3">
              <img
                src={image}
                alt="Preview"
                className="img-thumbnail"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? 'Adding...' : '➕ Add Dish'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDishPage;
