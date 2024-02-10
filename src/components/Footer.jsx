import { Link } from 'react-router-dom';
import { FaUserSecret } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='rounded-sm border-y-4  border-gray-600 bg-white dark:bg-gray-800 md:flex md:items-center md:justify-between w-full p-6'>
      <div className='w-full text-center'>
        <div className='w-full justify-between sm:flex sm:items-center sm:justify-between'>
          <div>
            <Link className='mb-4 flex items-center sm:mb-0'>
              <FaUserSecret className='mr-3 h-8' size={30} color='4fa94d' />
              <span className='self-center whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white'>
                Users
              </span>
            </Link>
          </div>
          <ul className='flex flex-wrap text-sm text-gray-500 dark:text-white'>
            <li className='last:mr-0 md:mr-6 me-4'>
              <Link className='hover:underline'>About</Link>
            </li>
            <li className='last:mr-0 md:mr-6 me-4'>
              <Link className='hover:underline'>Privacy Policy</Link>
            </li>
            <li className='last:mr-0 md:mr-6 me-4'>
              <Link className='hover:underline'>Licensing</Link>
            </li>
            <li className='last:mr-0 md:mr-6 me-4'>
              <Link className='hover:underline'>Contact</Link>
            </li>
          </ul>
        </div>
        <hr className='w-full my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8'></hr>
        <div className='text-sm text-gray-500 dark:text-gray-400 sm:text-center'>
          © {new Date().getFullYear()}
          <Link to='/' className='ml-1 hover:underline'>
            Users™
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
