// import { useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import Popup from './components/common/Popup'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import OnlineOfflineButton from './components/common/OnlineOfflineButton'; 

function App() {

  const popupVisible = useSelector((state:any)=>state.ui.popupVisible);

  return (
    <>
      {/* used link inside to signup page and make it conditionally render on every refresh*/}
      {
        popupVisible &&
        <Popup text="Sign up and get 20% off on your first order. " linkText="Sign Up Now"></Popup> 
      }

      <Navbar></Navbar>
      <OnlineOfflineButton/>

      <Outlet/>

      <Footer></Footer>
    </>
  )
}

export default App

