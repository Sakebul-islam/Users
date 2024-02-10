import { createBrowserRouter } from 'react-router-dom';
import UserDetails from '@/components/UserDetails';
import Layout from '../Layout/Layout';
import App from '../App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/:id',
        element: <UserDetails />,
      },
    ],
  },
]);

export default router;
