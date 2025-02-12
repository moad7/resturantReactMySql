import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const url = 'http://127.0.0.1:3000/waiters';

function WaitersPage() {
  const [waiters, setWaiters] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setWaiters(response.data))
      .catch((err) => console.error('Error fetching waiters:', err));
  }, []);

  const deleteWaiter = (id) => {
    if (!window.confirm('Are you sure you want to delete this waiter?')) return;

    axios
      .delete(`${url}/deleteWaitersById/${id}`)
      .then(() => setWaiters(waiters.filter((w) => w.idWaiters !== id)))
      .catch((err) => console.error('Error deleting waiter:', err));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>👨‍🍳 Waiters List</h2>
        <Link to="/waiters/new" className="btn btn-success">
          ➕ Add New Waiter
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover shadow">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {waiters.length > 0 ? (
              waiters.map((waiter, index) => (
                <tr key={waiter.idWaiters}>
                  <td>{index + 1}</td>
                  <td>{waiter.name}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => deleteWaiter(waiter.idWaiters)}
                    >
                      🗑 Delete
                    </button>
                    <Link
                      to={`/waiters/update/${waiter.idWaiters}`}
                      className="btn btn-info btn-sm"
                    >
                      ✏️ Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No waiters found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WaitersPage;
