import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const API_URL = 'http://127.0.0.1:3000';

function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [waiters, setWaiters] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [newDishId, setNewDishId] = useState('');
  const [newWaiterId, setNewWaiterId] = useState('');
  const location = useLocation();

  const [orderItem, setOrderItem] = useState(
    location.state?.orderDetails || null
  );
  const orders = location.state.orders;
  console.log(orderItem);

  useEffect(() => {
    axios
      .get(`${API_URL}/waiters`)
      .then((response) => setWaiters(response.data))
      .catch((err) => console.error('Error fetching waiters:', err));

    axios
      .get(`${API_URL}/dishes`)
      .then((response) => setDishes(response.data))
      .catch((err) => console.error('Error fetching dishes:', err));
  }, [id, orderItem]);

  const handleUpdateWaiter = async () => {
    await axios
      .put(`${API_URL}/waiters/updateWaitersOrder`, {
        idOrder: orderItem.idOrder,
        idWaiters: newWaiterId,
      })
      .then(() => {
        alert('✅ Waiter updated successfully!');
        setOrderItem({
          ...orderItem,
          waiterName: waiters.find((w) => w.idWaiters === parseInt(newWaiterId))
            .name,
        });
      })
      .catch((err) => console.error('Error updating waiter:', err));
  };

  // const handleAddDish = async () => {
  //   if (!newDishId) {
  //     alert('⚠️ Please select a dish first.');
  //     return;
  //   }

  //   await axios
  //     .post(`${API_URL}/dishes/addDishToOrder`, {
  //       idOrder: orderItem.idOrder,
  //       idDishes: newDishId,
  //     })
  //     .then(() => {
  //       alert('✅ Dish added successfully!');
  //       const addedDish = dishes.find(
  //         (d) => d.idDishes === parseInt(newDishId)
  //       );
  //       setOrderItem({
  //         ...orderItem,
  //         dishes: [...orderItem.dishes, addedDish],
  //       });
  //     })
  //     .catch((err) => console.error('Error adding dish:', err));
  // };

  const handleAddDish = async () => {
    if (!newDishId) {
      alert('⚠️ Please select a dish first.');
      return;
    }

    try {
      await axios.post(`${API_URL}/dishes/addDishToOrder`, {
        idOrder: orderItem.idOrder,
        idDishes: newDishId,
      });

      alert('✅ Dish added successfully!');

      const addedDish = orders?.length
        ? orders
            .flatMap((order) => order.dishes)
            .find((dish) => dish.idDishes === parseInt(newDishId))
        : null;

      if (!addedDish) {
        alert('⚠️ Dish not found in orders list!');
        return;
      }

      setOrderItem((prevOrder) => ({
        ...prevOrder,
        dishes: [...prevOrder.dishes, addedDish],
      }));
    } catch (err) {
      console.error('Error adding dish:', err);
      alert('❌ Failed to add dish.');
    }
  };

  const handleRemoveDish = async (dishId) => {
    await axios
      .delete(
        `${API_URL}/dishes/removeDishFromOrder/${orderItem.idOrder}/${dishId}`
      )
      .then(() => {
        alert('✅ Dish removed successfully!');
        setOrderItem({
          ...orderItem,
          dishes: orderItem.dishes.filter((dish) => dish.idDishes !== dishId),
        });
      })
      .catch((err) => console.error('Error removing dish:', err));
  };

  const handleDeleteOrder = async () => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;

    await axios
      .delete(`${API_URL}/order/deleteOrder/${orderItem.idOrder}`)
      .then(() => {
        alert('✅ Order deleted successfully!');
        navigate('/orders');
      })
      .catch((err) => console.error('Error deleting order:', err));
  };

  if (!orderItem) {
    return (
      <div className="container text-center mt-5">
        <h2>Loading order details...</h2>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate('/orders')}
      >
        🔙 Back to Orders
      </button>

      <div className="card shadow p-4">
        <h2 className="mb-3">🛒 Order #{orderItem.idOrder}</h2>
        <p>
          <strong>📅 Date:</strong> {new Date(orderItem.date).toLocaleString()}
        </p>
        <p>
          <strong>👨‍🍳 Waiter:</strong> {orderItem.waiterName}
        </p>
        <p>
          <strong>Total Price:</strong>{' '}
          {orderItem.dishes.reduce((sum, dish) => sum + dish.dishPrice, 0)}₪
        </p>
        <select
          className="form-select mb-3"
          value={newWaiterId}
          onChange={(e) => setNewWaiterId(e.target.value)}
        >
          {waiters.map((w) => (
            <option key={w.idWaiters} value={w.idWaiters}>
              {w.name}
            </option>
          ))}
        </select>
        <button className="btn btn-warning mb-3" onClick={handleUpdateWaiter}>
          ✏️ Update Waiter
        </button>

        <h4 className="mt-4">🍽️ Ordered Dishes</h4>
        <div className="row">
          {orderItem.dishes.length > 0 ? (
            orderItem.dishes.map((dish) => (
              <div key={dish.idDishes} className="col-md-4 mb-3">
                <div className="card">
                  <img
                    src={dish.dishImage || ''}
                    className="card-img-top"
                    alt={dish.dishName}
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{dish.dishName}</h5>
                    <p className="card-text">₪{dish.dishPrice}</p>
                    <p className="card-text">⏳ {dish.dishTime} min</p>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveDish(dish.idDishes)}
                    >
                      🗑 Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No dishes in this order.</p>
          )}
        </div>

        <div className="mt-3">
          <h5>➕ Add Dish to Order</h5>
          <select
            className="form-select mb-2"
            onChange={(e) => setNewDishId(e.target.value)}
          >
            <option value="">Select a Dish</option>
            {dishes.map((d) => (
              <option key={d.idDishes} value={d.idDishes}>
                {d.name} - {d.price}₪
              </option>
            ))}
          </select>
          <button className="btn btn-success" onClick={handleAddDish}>
            ➕ Add Dish
          </button>
        </div>

        <button className="btn btn-danger mt-4" onClick={handleDeleteOrder}>
          🗑 Delete Order
        </button>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
