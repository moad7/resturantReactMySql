import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const url = 'http://127.0.0.1:3000/waiters';

function UpdateWaiterPage() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${url}/${id}`)
      .then((response) => setName(response.data.name))
      .catch((err) => console.error('Error fetching waiter details:', err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${url}/updateWaitersById/${id}`, { name })
      .then(() => {
        alert('✅ تم تحديث النادل بنجاح!');
        navigate('/waiters');
      })
      .catch((err) => console.error('Error updating waiter:', err));
  };

  return (
    <div>
      <h2>تعديل بيانات النادل</h2>
      <form onSubmit={handleSubmit}>
        <label>اسم النادل:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button type="submit">💾 حفظ التعديلات</button>
      </form>
    </div>
  );
}

export default UpdateWaiterPage;
