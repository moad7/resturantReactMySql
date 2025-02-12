import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const url = 'http://127.0.0.1:3000/order';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${url}/getAllOrdersWithDetails`)
      .then((response) => {
        // Group dishes under the same order ID
        const groupedOrders = response.data.reduce((acc, order) => {
          const existingOrder = acc.find((o) => o.idOrder === order.idOrder);
          if (existingOrder) {
            existingOrder.dishes.push({
              idDishes: order.idDishes,
              dishName: order.dishName,
              dishImage: order.dishImage,
              dishTime: order.dishTime,
              dishPrice: order.dishPrice,
            });
          } else {
            acc.push({
              idOrder: order.idOrder,
              waiterName: order.waiterName,
              dishes: [
                {
                  idDishes: order.idDishes,
                  dishName: order.dishName,
                  dishImage: order.dishImage,
                  dishTime: order.dishTime,
                  dishPrice: order.dishPrice,
                },
              ],
              totalPrice: order.count,
              date: order.date,
            });
          }
          return acc;
        }, []);
        setOrders(groupedOrders);
      })
      .catch((err) => console.error('Error fetching orders:', err));
  }, []);

  const deleteOrder = (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;

    axios
      .delete(`${url}/deleteOrder/${id}`)
      .then(() => setOrders(orders.filter((o) => o.idOrder !== id)))
      .catch((err) => console.error('Error deleting order:', err));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2> Orders List 📦</h2>
        <Link to="/orders/new" className="btn btn-success">
          Add New Order➕
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover shadow">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Waiter Name</th>
              <th>Dishes</th>
              <th>Total Price</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order.idOrder}
                  onClick={() =>
                    navigate(`/orders/details/${order.idOrder}`, {
                      state: { orderDetails: order },
                    })
                  }
                  style={{ cursor: 'pointer' }}
                >
                  <td>{index + 1}</td>
                  <td>{order.idOrder}</td>
                  <td>{order.waiterName}</td>
                  <td>
                    {order.dishes.map((dish) => dish.dishName).join(', ')}
                  </td>
                  <td>{order.totalPrice}₪</td>
                  <td>{new Date(order.date).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent navigating when clicking delete
                        deleteOrder(order.idOrder);
                      }}
                    >
                      Delete 🗑
                    </button>
                    <Link
                      to={`/orders/update/${order.idOrder}`}
                      className="btn btn-info btn-sm"
                      onClick={(e) => e.stopPropagation()} // Prevent row click when editing
                    >
                      Edit ✏️
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersPage;
