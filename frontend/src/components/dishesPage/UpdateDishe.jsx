import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://127.0.0.1:3000/dishes';

function UpdateDishe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dishItem = location.state?.dishesDetails || {};
  console.log(dishItem);

  const [dish, setDish] = useState({
    name: dishItem.name || '',
    price: dishItem.price || '',
    time: dishItem.time || '',
    image: dishItem.image || '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {}, [dishItem]);

  const handleChange = (e) => {
    setDish({ ...dish, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API_URL}/updateDishesById/${id}`, dish)
      .then(() => {
        alert('✅ Dish updated successfully!');
        navigate('/dishes');
      })
      .catch((err) => console.error('Error updating dish:', err));
  };

  return (
    <div className="container mt-4">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate('/dishes')}
      >
        🔙 Back to Dishes
      </button>

      <div className="card shadow p-4">
        <h2 className="mb-3">🍽️ Edit Dish</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Dish Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={dish.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price (₪):</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={dish.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Preparation Time (min):</label>
            <input
              type="number"
              className="form-control"
              name="time"
              value={dish.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL:</label>
            <input
              type="text"
              className="form-control"
              name="image"
              value={dish.image}
              onChange={handleChange}
            />
          </div>
          {dish.image && (
            <div className="text-center mb-3">
              <img
                src={dish.image}
                alt="Preview"
                className="img-thumbnail"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            💾 Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateDishe;
