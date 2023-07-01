
import React from 'react'
import Login from './Login';
import Main from './Main'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getIsLoggedIn, setIsLoggedIn } from './redux/slices/UsersSlice';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import './App.css'
import Footer from './components/footer/Footer';

const App = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn)

  const handleLogin = () => {
    // Perform login logic
    dispatch(setIsLoggedIn(true))
  };

  const handleLogout = () => {
    // Perform logout logic
    dispatch(setIsLoggedIn(false))
  };
  return (
    <div>
      {isLoggedIn ? (
        <>
        <Main onLogout={handleLogout} />
        <Footer />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div> 
  )
}

export default App