import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import CardBg from '../assets/images/cardBg.jpg';
import { Link } from 'react-router-dom';

const UserCard = ({ user, userDetail = false }) => {
  return (
    <Card
      className={`${userDetail ? 'border-0 shadow-none' : 'border shadow-sm'}`}
    >
      <div
        className={
          userDetail ? 'grid grid-cols-1 md:grid-cols-2' : 'grid md:grid-cols-1'
        }
      >
        <div
          className={`${
            !user.image ? ' min-h-72' : 'null'
          } flex place-content-center border-4 border-[#CCFF00] p-4 group bg-CardBg overflow-hidden relative`}
          style={{
            backgroundImage: `url(${CardBg})`,
          }}
        >
          <img
            src={user?.image}
            title={`${user?.firstName} ${user?.lastName}`}
            alt={`${user?.firstName} ${user?.lastName}`}
            className='rounded-sm object-cover duration-500 group-hover:scale-110 group-hover:drop-shadow-[5px_0px_10px_#CCFF00] p-2'
          />
          {!userDetail ? (
            <div className='absolute bottom-0 left-0 right-0 min-h-6 bg-black/60'>
              <p className='text-white p-2 text-xl'>
                <span className='font-bold'>Username : </span>
                <Link
                  to={`/${user?.id}`}
                  className='text-blue-400 duration-200 hover:text-[#0FF0FC]'
                >
                  {user?.username}
                </Link>
              </p>
            </div>
          ) : null}
        </div>
        <div>
          <CardHeader>
            <CardTitle className='text-lg sm:text-xl'>
              First Name : {user?.firstName}
            </CardTitle>
            <CardTitle className='text-lg sm:text-xl'>
              Last Name : {user?.lastName}
            </CardTitle>
            <CardDescription>
              Email :&nbsp;
              <Link to={`mailto:${user?.email}`} className='text-blue-600'>
                {user?.email}
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`py-2 ${userDetail ? '' : 'border-y-2 border-dashed'}`}
            >
              <h2 className='text-xl font-bold'>Address :</h2>
              <p>
                <span className='font-semibold'>Street :</span>{' '}
                {user?.address?.address}
              </p>
              <p>
                <span className='font-semibold'>Suite : </span>
                {user?.address?.suite ? user?.address?.suite : 'N/A'}
              </p>
              <p>
                <span className='font-semibold'>City : </span>
                {user?.address?.city}
              </p>
            </div>
            <p className='py-1 mt-2'>
              <span className='font-semibold'>Company : </span>
              {user?.company?.name}
            </p>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
