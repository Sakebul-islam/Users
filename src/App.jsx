import { useEffect, useState } from 'react';
import UserCard from './components/UserCard';
import Loader from './components/Loader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-dropdown-menu';
import { imageUploader } from './components/api/imageUploader';
import { DialogClose, DialogFooter } from './components/ui/dialog';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searched, setSearched] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [refatch, setRefatch] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  const nextId =
    existingUsers.length > 0
      ? existingUsers[existingUsers.length - 1].id + 1
      : 1;

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const imageData = await imageUploader(file);
    setSelectedImage(imageData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      image: selectedImage,
      email: e.target.email.value,
      username: Array.from(
        { length: 8 },
        () => 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]
      ).join(''),
      address: {
        address: e.target.street.value,
        suite: e.target.suite.value,
        city: e.target.city.value,
      },
      company: {
        name: e.target.name.value,
      },
    };
    const newUser = { ...updatedFormData, id: nextId };
    console.log(newUser);

    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    setRefatch(!refatch);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        } else {
          const response = await fetch('https://dummyjson.com/users');
          const data = await response.json();
          setUsers(data?.users || []);

          // Store fetched user data in local storage
          localStorage.setItem('users', JSON.stringify(data?.users));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [refatch]);

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

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchedUsers([]);
      setSearched(false);
    } else {
      const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedUsers(filteredUsers);
      setSearched(true);
    }
  }, [searchTerm, users]);

  const sortedUsers = [...(searched ? searchedUsers : users)].sort((a, b) => {
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
                className='grid md:grid-cols-1 lg:grid-cols-5 gap-2 w-full'
                onSubmit={handleSearch}
              >
                <select
                  placeholder='Sort'
                  onChange={handleSort}
                  value={sortBy}
                  className='p-2 border rounded-sm cursor-pointer focus-visible:ring-0 focus-visible:outline focus-visible:outline-[#CCFF00] dark:bg-[#020817] overflow-x-hidden md:col-span-1'
                >
                  <option value=''>All</option>
                  <option value='name'>Sort by Name</option>
                  <option value='email'>Sort by Email</option>
                  <option value='company'>Sort by Company Name</option>
                </select>
                <div className='grid gap-2 lg:grid-cols-4 lg:col-span-4'>
                  <div className='grid gap-2 grid-cols-2 lg:grid-cols-3 lg:col-span-3'>
                    <Input
                      type='search'
                      placeholder='Search here...'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className='focus-visible:ring-0 focus-visible:outline focus-visible:outline-[#CCFF00] lg:col-span-2'
                    />
                    <Button type='submit' className='lg:col-span-1'>
                      Search
                    </Button>
                  </div>
                  <div className='lg:col-span-1'>
                    <Dialog className=''>
                      <DialogTrigger
                        className='w-full inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 lg:col-span-1'
                        type='button'
                      >
                        {/* <Button className='w-full'>Add User</Button> */}
                        Add User
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className='text-center'>
                            Add New User
                          </DialogTitle>
                          <form
                            onSubmit={handleSubmit}
                            className='w-full space-y-6 max-h-[70vh] overflow-y-scroll'
                          >
                            <div className='grid w-full items-center gap-1.5'>
                              <Label>First Name</Label>
                              <Input required type='text' name='firstName' />
                            </div>
                            <div className='grid w-full items-center gap-1.5'>
                              <Label>Last Name</Label>
                              <Input required type='text' name='lastName' />
                            </div>
                            <div className='grid w-full items-center gap-1.5'>
                              <Label>Image</Label>
                              <Input
                                required
                                name='image'
                                type='file'
                                onChange={handleFileChange}
                              />
                            </div>
                            <div className='grid w-full items-center gap-1.5'>
                              <Label>Email</Label>
                              <Input required type='email' name='email' />
                            </div>
                            <div className='grid w-full items-center gap-1.5'>
                              <Label>Address (Street)</Label>
                              <Input required name='street' type='text' />
                            </div>
                            <div className='grid w-full items-center gap-1.5'>
                              <Label>Address (Suite)</Label>
                              <Input required name='suite' type='text' />
                            </div>
                            <div className='grid w-full items-center gap-1.5'>
                              <Label>Address (City)</Label>
                              <Input required name='city' type='text' />
                            </div>
                            <div className='grid w-full items-center gap-1.5'>
                              <Label>Company Name</Label>
                              <Input required name='name' type='text' />
                            </div>

                            <DialogFooter className='sm:justify-start'>
                              <DialogClose asChild>
                                <Button
                                  type='submit'
                                  variant='secondary'
                                  onClick={() => setRefatch(!refatch)}
                                >
                                  Submit
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </form>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
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
