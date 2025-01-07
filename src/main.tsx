// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.tsx'
import './index.css'
import App from './App.tsx'
import Home from './pages/Home/Home.tsx'
import Product from './pages/Product/Product.tsx'
import Cart from './pages/Cart/Cart.tsx'
import Signup from './pages/Signup/Signup.tsx'
import Shop from './pages/Shop/Shop.tsx'

import { createBrowserRouter, createRoutesFromElements,Route, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}> 
      <Route index element={<Home/>} />
      <Route path="/Product/:id" element={<Product/>} />
      <Route path="/Cart" element={<Cart/>} />
      <Route path="/Profile" element={<Signup/>} />
      <Route path="/Shop" element={<Shop/>} />
    </Route>
))

// later keep product page as per specific product
// and make home page at /

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,

  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
)
