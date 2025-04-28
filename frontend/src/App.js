import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css'
import About from './Pages/AboutUs/About'
import Contact from './Pages/ContactUs/Contact'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import Cart from './Pages/Cart/Cart'
import Checkout from './Pages/Checkout/Checkout'
import Products from './Pages/Products/Products'
import Faq from './Pages/Faq/Faq'
import TermsConditions from './Pages/TermsConditions/TermsConditions'
import DeliveryInformation from './Pages/DeliveryInformation/DeliveryInformation'
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy'
import Profile from './Pages/Profile/Profile'
import ThankYouPage from './Pages/ThankYouPage/ThankYouPage'
import PageNotFound from './Pages/PageNotFound/PageNotFound'
import ReturnRefund from './Pages/ReturnRefund/ReturnRefund'
import ResetPasswordPage from './Pages/ResetPasswordPage/ResetPasswordPage'
import AllProduct from './Pages/AllProducts/AllProduct'
const App = () => {
  const[refs, setRef] = React.useState(false);
  return (
    <>
      <BrowserRouter>
        <Header refs={refs} setRef={setRef} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/contact-us' element={<Contact />} />
          <Route path='/all-categories' element={<Products />} />
          <Route path='/all-products' element={<AllProduct refs={refs} setRef={setRef}/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login/forget-password' element={<ForgetPassword />} />
          <Route path='/product/product-details/:id' element={<ProductDetails refs={refs} setRef={setRef}/>} />
          <Route path='/cart' element={<Cart  refs={refs} setRef={setRef} />} />
          <Route path='/product/product-details/cart/checkout' element={<Checkout />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/term-&-conditions' element={<TermsConditions />} />
          <Route path='/delivery-information' element={<DeliveryInformation />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/order-successfully' element={<ThankYouPage />} />
          <Route path='/*' element={<PageNotFound />} />
          <Route path="/return-refund" element={<ReturnRefund />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App