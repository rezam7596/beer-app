import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import Menu from '../components/Menu';
import Offline from '../views/Offline';
import Footer from '../components/Footer';

function Layout() {
  return (
    <Menu>
      <Offline />
      <Outlet />
      <Footer />
    </Menu>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index lazy={() => import('../views/Home')} />
      <Route path='beer'>
        <Route index lazy={() => import('../views/BeerList')} />
        <Route path=':id' lazy={() => import('../views/Beer')} />
      </Route>
      <Route path='*' lazy={() => import('../views/404')} />
    </Route>
  )
)

export default function Router() {
  return <RouterProvider router={router} />;
}
