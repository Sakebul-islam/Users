import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import CardBg from '../assets/images/cardBg.jpg';

const UserCard = ({ user }) => {
  return (
    <Card>
      <div
        className='flex place-content-center p-4 min-h-72 hover:[transform:rotateY(180deg)] duration-300 bg-CardBg'
        style={{
          backgroundImage: `url(${CardBg})`,
        }}
      >
        <img
          src={user?.image}
          alt='Image'
          className='rounded-sm object-cover'
        />
      </div>
      <CardHeader>
        <CardTitle>First Name : {user?.firstName}</CardTitle>
        <CardTitle>Last Name : {user?.lastName}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
