import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './component/Welcomepage';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import RewardPage from './component/RewardPage';
import ErrorPage from './component/ErrorPage';
import VerificationPage from './component/VerificationPage';

// Uncomment and import these when ready
// import AboutPage from './component/AboutPage';
// import ServicePage from './component/ServicePage';
// import ContactPage from './component/ContactPage';
// import LoginPage from './component/LoginPage';
// import CarsPage from './component/CarsPage';
// import FeaturesPage from './component/FeaturesPage';

export default function App() {
  return (
    
    <BrowserRouter>
     
    <Navbar/>
    {/* <div className="app-wrapper"> */}
      <Routes>
        <Route path='/' element={<WelcomePage/>} />
        <Route path="/reward" element={<RewardPage/>} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/verify" element={<VerificationPage/>} />
        {/* <Route path='/about' element={<AboutPage />} /> */}
        {/* <Route path='/service' element={<ServicePage />} /> */}
        {/* <Route path='/contact' element={<ContactPage />} /> */}
        {/* <Route path='/login' element={<LoginPage />} /> */}
        {/* <Route path='/cars' element={<CarsPage />} /> */}
        {/* <Route path='/features' element={<FeaturesPage />} /> */}
      </Routes>
      {/* </div> */}
      <Footer/>
    </BrowserRouter>
  );
}
