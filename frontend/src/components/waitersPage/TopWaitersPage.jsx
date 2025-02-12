import { useEffect, useState } from 'react';
import axios from 'axios';

const url = 'http://127.0.0.1:3000/waiters/mostSellingWaiters';

function TopWaitersPage() {
  const [topWaiters, setTopWaiters] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setTopWaiters(response.data))
      .catch((err) => console.error('Error fetching top waiters:', err));
  }, []);

  return (
    <div>
      <h2>أكثر النادلين مبيعًا</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>الاسم</th>
            <th>عدد الطلبات</th>
          </tr>
        </thead>
        <tbody>
          {topWaiters.map((waiter, index) => (
            <tr key={waiter.idWaiters}>
              <td>{index + 1}</td>
              <td>{waiter.name}</td>
              <td>{waiter.order_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopWaitersPage;
