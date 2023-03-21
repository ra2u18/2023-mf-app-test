import React from 'react';

import Dropdown from './components/Dropdown';
import './global.css';

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className='flex flex-col gap-4'>
        <Dropdown />
        <div className="select-none ...">
          The quick brown fox jumps over the lazy dog.
        </div>
      </div>
    </div>
  );
};

export default App;
