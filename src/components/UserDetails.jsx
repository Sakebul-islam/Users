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
              <Button variant='outline' size='icon'>
                <Link
                  to='/'
                  className={`${buttonVariants({
                    variant: 'link',
                    size: 'icon',
                  })} px-2`}
                >
                  <ChevronLeft className='w-7 inline-block mr-2' />
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
