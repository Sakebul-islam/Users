import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <>
      <div className='min-h-[calc(100vh-173px)]'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
