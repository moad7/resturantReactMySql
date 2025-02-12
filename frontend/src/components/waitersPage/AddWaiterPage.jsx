import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const url = 'http://127.0.0.1:3000/waiters/addNewWaiters';

function AddWaiterPage() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(url, { name }, { headers: { 'Content-Type': 'application/json' } })
      .then(() => {
        alert('✅ تم إضافة النادل بنجاح!');
        navigate('/waiters');
      })
      .catch((err) => console.error('Error adding waiter:', err));
  };

  return (
    <div>
      <h2>إضافة نادل جديد</h2>
      <form onSubmit={handleSubmit}>
        <label>اسم النادل:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button type="submit">إضافة</button>
      </form>
    </div>
  );
}

export default AddWaiterPage;
