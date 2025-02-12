import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const API_URL = 'http://127.0.0.1:3000';

function AddOrderPage() {
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [waiterId, setWaiterId] = useState('');
  const [waiters, setWaiters] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // 🔹 Store total price
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/waiters`)
      .then((response) => setWaiters(response.data))
      .catch((err) => console.error('Error fetching waiters:', err));

    axios
      .get(`${API_URL}/dishes`)
      .then((response) => setDishes(response.data))
      .catch((err) => console.error('Error fetching dishes:', err));
  }, []);

  const handleDishSelection = (e) => {
    const selectedOptions = [...e.target.selectedOptions].map(
      (opt) => opt.value
    );
    setSelectedDishes(selectedOptions);

    // 🔹 Calculate the total price based on selected dishes
    const total = selectedOptions.reduce((sum, dishId) => {
      const dish = dishes.find((d) => d.idDishes.toString() === dishId);
      return dish ? sum + dish.price : sum;
    }, 0);

    setTotalPrice(total);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!waiterId || selectedDishes.length === 0) {
      alert('⚠️ Please select a waiter and at least one dish!');
      return;
    }

    setLoading(true);

    axios
      .post(
        `${API_URL}/order/addOrder`,
        { idDishes: selectedDishes, idWaiters: waiterId, count: totalPrice },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(() => {
        alert('✅ Order added successfully!');
        navigate('/orders');
      })
      .catch((err) => console.error('Error adding order:', err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-header bg-primary text-white">Add New Order🛒</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Select Waiter:</label>
              <select
                className="form-select"
                onChange={(e) => setWaiterId(e.target.value)}
                required
              >
                <option value="">Choose a waiter</option>
                {waiters.map((w) => (
                  <option key={w.idWaiters} value={w.idWaiters}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Select Dishes (Hold Ctrl to select multiple):
              </label>
              <select
                className="form-select"
                multiple
                onChange={handleDishSelection}
                required
              >
                {dishes.map((dish) => (
                  <option key={dish.idDishes} value={dish.idDishes}>
                    {dish.name} - {dish.price}₪
                  </option>
                ))}
              </select>
            </div>

            {/* 🔹 Show Total Price */}
            <div className="mb-3">
              <h5>
                Total Price:{' '}
                <span className="badge bg-warning">{totalPrice}₪</span>
              </h5>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? 'Adding...' : ' Place Order ➕'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddOrderPage;
