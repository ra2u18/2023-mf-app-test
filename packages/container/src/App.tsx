import React, {
  createContext,
  lazy,
  ReactNode,
  Suspense,
  useContext,
  useState,
} from 'react';

import Dropdown from './components/Dropdown';
import MyListbox from './components/MyListbox';
import MyCombobox from './components/MyCombobox';

const DashboardLazy = lazy(() => import('./components/DashboardApp'));

import './global.css';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

interface AuthData {
  user?: {
    name?: string;
  };
  roles: number[];
}

const useAuth = (): AuthData => ({
  roles: [],
});

const RequireAuth = ({ allowedRoles }: { allowedRoles: number[] }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role: number) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

const Login = () => {
  return <div>LOGIN</div>;
};

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path='/login' element={<Login />} />

      <Route element={<RequireAuth allowedRoles={[2001]} />}>
        <Route path='/dashboard' element={<DashboardLazy />} />
      </Route>

      <Route path='/*' element={<div>Missing...</div>} />
    </Routes>
  );
};

export default App;

// <div className='flex justify-center items-center h-screen'>
//   <div className='flex flex-col gap-4'>
//     <MyCombobox />
//     <Suspense fallback={<div>Loading..</div>}>
//       <DashboardLazy />
//     </Suspense>
//   </div>
// </div>
