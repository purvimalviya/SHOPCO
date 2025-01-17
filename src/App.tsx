// import { useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import Popup from './components/common/Popup'
import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common//Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {

  const popupVisible = useSelector((state:any)=>state.ui.popupVisible);

  return (
    <>
      {/* Popup - use link inside to signup page and make it conditionally render on every refresh*/}
      {
        popupVisible &&
        <Popup text="Sign up and get 20% off on your first order. " linkText="Sign Up Now"></Popup> 
      }

      {/* Navbar */}
      <Navbar></Navbar>

      {/* Outlet */}
      <Outlet/>

      {/* Footer */}
      <Footer></Footer>
    </>
  )
}

export default App


// confusion : in pages folder, directly make tsx files or make different page folders?