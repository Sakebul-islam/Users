import { useEffect, useState } from 'react';
import UserCard from './components/UserCard';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        setUsers(data?.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
        {users.map((user) => (
          <UserCard key={user?.id} user={user} />
        ))}
      </div>
    </>
  );
}

export default App;
