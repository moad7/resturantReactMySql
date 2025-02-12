import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const url = 'http://127.0.0.1:3000/order';

function UpdateOrderPage() {
  const { id } = useParams();
  const [count, setCount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${url}/${id}`)
      .then((response) => setCount(response.data.count))
      .catch((err) => console.error('Error fetching order details:', err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${url}/updateOrder/${id}`, { count })
      .then(() => {
        alert('✅ تم تحديث الطلب بنجاح!');
        navigate('/orders');
      })
      .catch((err) => console.error('Error updating order:', err));
  };

  return (
    <div>
      <h2>✏️ تعديل الطلب</h2>
      <form onSubmit={handleSubmit}>
        <label>عدد الطلبات:</label>
        <input
          className="form-control"
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          required
        />

        <button type="submit">💾 حفظ التعديلات</button>
      </form>
    </div>
  );
}

export default UpdateOrderPage;
