import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const url = 'http://127.0.0.1:3000/dishes';

function DishesPage() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setDishes(response.data))
      .catch((err) => console.error('Error fetching dishes:', err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Dishes</h2>
        <Link to="/dishes/new" className="btn btn-success">
          ➕ Add New Dishe
        </Link>
      </div>

      <div
        style={{
          padding: 20,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 20,
          maxWidth: '1200px',
          margin: 'auto',
        }}
      >
        {dishes.map((dish) => (
          <div
            key={dish.idDishes}
            className="card"
            style={{
              width: 230,
              height: 320,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#fcefec',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            {dish.image ? (
              <img
                src={dish.image}
                alt={dish.name}
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginTop: 10,
                }}
              />
            ) : (
              <div
                style={{
                  width: '150px',
                  height: '150px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#ddd',
                  borderRadius: '10px',
                }}
              >
                No image ❌
              </div>
            )}
            <div
              className="card-body"
              style={{
                textAlign: 'center',
                width: '100%',
                padding: '10px',
              }}
            >
              <h4 className="card-title">{dish.name}</h4>
              <h5>{dish.price}₪💰</h5>
              <p className="card-text"> {dish.time} min⏳</p>
              <div
                style={{ display: 'flex', justifyContent: 'center', gap: 10 }}
              >
                <button className="btn btn-danger"> delete 🗑</button>
                <button className="btn btn-info"> edit ✏️</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DishesPage;
