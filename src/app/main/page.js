"sue client"

// import logo from './logo.svg';
// import './App.css';
// import Navbar from '';
// import HomeHero from './sections/homeHero';
// import ProtectRent from './sections/protectRent';
// import CustomerReviews from './sections/customerReviews';
// import Insurance from './sections/insurance';
// import Broker from './sections/broker';
// import Footer from './sections/footer';
// import FooterBottom from './sections/footerBottom';
// import OnlineSection from './sections/onlineSection';

import Navbar from "@/components/navbar";
import Broker from "@/sections/broker";
import CustomerReviews from "@/sections/customerReviews";
import Footer from "@/sections/footer";
import FooterBottom from "@/sections/footerBottom";
import HomeHero from "@/sections/homeHero";
import Insurance from "@/sections/insurance";
import OnlineSection from "@/sections/onlineSection";
import ProtectRent from "@/sections/protectRent";


function page() {
  return (
    <>
      <div className='max-w-[1600px] m-auto'>
        {/* <Navbar /> */}
        <Navbar/>
        <HomeHero />
        <ProtectRent />
        <OnlineSection />
        <CustomerReviews />
        <Insurance />
        <Broker />
        <Footer />
        <FooterBottom />
      </div>
    </>
  );
}

export default page;
