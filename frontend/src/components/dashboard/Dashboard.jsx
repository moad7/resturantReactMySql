// import React from 'react';

// function Dashboard() {
//   return <div style={{ backgroundColor: '' }}>Dashboard</div>;
// }

// export default Dashboard;
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const API_BASE_URL = 'http://127.0.0.1:3000';

function Dashboard() {
  const [topWaiters, setTopWaiters] = useState([]);
  const [topDishes, setTopDishes] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/waiters/mostSellingWaiters`)
      .then((response) => setTopWaiters(response.data))
      .catch((err) => console.error('Error fetching top waiters:', err));

    axios
      .get(`${API_BASE_URL}/order/mostOrderedDishes`)
      .then((response) => setTopDishes(response.data))
      .catch((err) => console.error('Error fetching top dishes:', err));
  }, []);

  console.log(topDishes);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📊 Dashboard</h2>

      <div className="row">
        {/* Top Selling Waiters */}
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              🏆 Top Selling Waiters
            </div>
            <div className="card-body">
              {topWaiters.length > 0 ? (
                <ul className="list-group">
                  {topWaiters.map((waiter, index) => (
                    <li
                      key={waiter.idWaiters}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {index + 1}. {waiter.name}
                      <span className="badge bg-success">
                        {waiter.order_count} Orders
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center">No data available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Most Ordered Dishes */}
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-danger text-white">
              🍽️ Most Ordered Dishes
            </div>
            <div className="card-body">
              {topDishes.length > 0 ? (
                <ul className="list-group">
                  {topDishes.map((dish, index) => (
                    <li
                      key={dish.idDishes}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {index + 1}. {dish.name}
                      <span className="badge bg-warning">
                        {dish.order_count} Orders
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center">No data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
