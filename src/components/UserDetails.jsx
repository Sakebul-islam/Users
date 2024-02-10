import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import UserCard from './UserCard';
import Loader from './Loader';

import { ChevronLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Button } from '@/components/ui/button';

const UserDetails = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState({});
  const userDetail = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUsers = JSON.parse(localStorage.getItem('users'));
        if (storedUsers) {
          const foundUser = storedUsers.find((u) => u.id === parseInt(userId));
          if (foundUser) {
            setUser(foundUser);
            return;
          }
        }

        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const isEmpty = Object.keys(user).length === 0 && user.constructor === Object;

  return (
    <>
      {isEmpty ? (
        <Loader />
      ) : (
        <div className='py-12'>
          <div className='container px-2 md:px-8'>
            <div className='mb-8'>
              <Button variant='outline' size='icon' className='w-28'>
                <Link
                  to='/'
                  className={`${buttonVariants({
                    variant: 'link',
                    size: 'icon',
                  })} px-2 block`}
                >
                  <ChevronLeft className='w-7 h-7 block mr-2' />
                  Go Home
                </Link>
              </Button>
            </div>
            <UserCard key={user?.id} user={user} userDetail={userDetail} />
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails;
