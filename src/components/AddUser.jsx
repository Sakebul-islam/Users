import { useState } from 'react';
import { Button } from './ui/button';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from './ui/input';
import { imageUploader } from './api/imageUploader';
import { DialogClose } from './ui/dialog';

const AddUser = () => {
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
  };

  return (
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
        <Input required name='image' type='file' onChange={handleFileChange} />
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
      <Button type='submit'>Submit</Button>
      <DialogClose asChild onClick={window.close()}>
        Close
      </DialogClose>
    </form>
  );
};

export default AddUser;
