import React, { lazy, Suspense } from 'react';

import Dropdown from './components/Dropdown';
import MyListbox from './components/MyListbox';
import MyCombobox from './components/MyCombobox';

const DashboardLazy = lazy(() => import('./components/DashboardApp'));

import './global.css';

const App = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col gap-4'>
        <MyCombobox />
        <Suspense fallback={<div>Loading..</div>}>
          <DashboardLazy />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
