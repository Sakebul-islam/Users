import { useEffect, useState } from 'react';
import UserCard from './components/UserCard';
import Loader from './components/Loader';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searched, setSearched] = useState(false);
  const [sortBy, setSortBy] = useState('');

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

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredUsers = users.filter((user) =>
      user?.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedUsers(filteredUsers);
    setSearched(true);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const sortedAndFilteredUsers = searched ? searchedUsers : users;

  const sortedUsers = [...sortedAndFilteredUsers].sort((a, b) => {
    if (sortBy === 'name') {
      return a.firstName.localeCompare(b.firstName);
    } else if (sortBy === 'email') {
      return a.email.localeCompare(b.email);
    } else if (sortBy === 'company') {
      return a.company.name.localeCompare(b.company.name);
    }
    return 0;
  });

  const isEmpty = Array.isArray(users) && users.length === 0;

  return (
    <>
      {isEmpty ? (
        <Loader />
      ) : (
        <div className='py-12'>
          <div className='container px-2 md:px-8'>
            <div className='pb-12'>
              <form
                className='grid md:grid-cols-3 lg:grid-cols-5 gap-2 w-full'
                onSubmit={handleSearch}
              >
                <select
                  placeholder='Sort'
                  onChange={handleSort}
                  value={sortBy}
                  className='p-2 border rounded-sm cursor-pointer focus-visible:ring-0 focus-visible:outline focus-visible:outline-[#CCFF00] dark:bg-[#020817] overflow-x-hidden md:col-span-1'
                >
                  <option value='' disabled>
                    Select Sorting Option
                  </option>
                  <option value='name'>Sort by Name</option>
                  <option value='email'>Sort by Email</option>
                  <option value='company'>Sort by Company Name</option>
                </select>
                <div className='flex md:col-span-2 lg:col-span-4'>
                  <Input
                    type='search'
                    placeholder='Search here...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='focus-visible:ring-0 focus-visible:outline focus-visible:outline-[#CCFF00] mr-2'
                  />
                  <Button type='submit'>Search</Button>
                </div>
              </form>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {sortedUsers.map((user) => (
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
