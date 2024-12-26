import React, { useEffect } from 'react';
import '../styles/HomePage.css';
import { useGlobalContext } from '../contexts/GlobalContext';

const HomePage = () => {
  useEffect(() => {
    
  }, [])
  
  const {mainUser} = useGlobalContext();
  return (
    <div>
      <header className='centerDiv'>
        hello {mainUser.username}
      </header>

    </div>
  )
}

export default HomePage