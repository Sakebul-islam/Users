import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { ModeToggle } from '@/components/mode-toggle';

const Layout = () => {
  return (
    <>
      <div className='fixed top-2 right-2 z-40'>
        <ModeToggle />
      </div>
      <div className='min-h-[calc(100vh-173px)]'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
