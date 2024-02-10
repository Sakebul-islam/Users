import { useEffect, useState } from 'react';
import UserCard from './components/UserCard';
import Loader from './components/Loader';

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

  const isEmpty = Array.isArray(users) && users.length === 0;

  return (
    <>
      {isEmpty ? (
        <Loader />
      ) : (
        <div className='py-12'>
          <div className='container px-2 md:px-8'>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {users.map((user) => (
                <UserCard key={user?.id} user={user} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
