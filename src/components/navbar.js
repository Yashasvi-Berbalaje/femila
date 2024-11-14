"use client"

import React, { useEffect, useState } from 'react';
import Button from './button';
import UnderlineLeft from './underlineLeft';
import FooterUnderlineText from './footerUnderlineText';
import MobileMenuText from './mobileMenuText';
import Dropdownlinks from './dropdownlinks';
import InsuranceCard from './insuranceCard';
function Navbar() {
  const [drop1, setDrop1] = useState("0");
  const [drop2, setDrop2] = useState("0");
  const [drop3, setDrop3] = useState("0");

  let timeout;

  const handleMouseEnterLink1 = () => {
    clearTimeout(timeout); // Clear timeout to prevent flicker
    setDrop1("1"); // Show first dropdown
    setDrop2("0"); // Hide second dropdown
    setDrop3("0"); // Hide third dropdown
  };

  const handleMouseEnterLink2 = () => {
    clearTimeout(timeout); // Clear timeout to prevent flicker
    setDrop1("0"); // Hide first dropdown
    setDrop2("1"); // Show second dropdown
    setDrop3("0"); // Hide third dropdown
  };

  const handleMouseEnterLink3 = () => {
    clearTimeout(timeout); // Clear timeout to prevent flicker
    setDrop1("0"); // Hide first dropdown
    setDrop2("0"); // Hide second dropdown
    setDrop3("1"); // Show third dropdown
  };

  const handleMouseLeave = () => {
    timeout = setTimeout(() => {
      setDrop1("0"); // Hide first dropdown
      setDrop2("0"); // Hide second dropdown
      setDrop3("0"); // Hide third dropdown
    }, 150); // Adjust delay as needed
  };
  const [active, setActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);  // Keep track of the last scroll position
  const [isHidden, setIsHidden] = useState(false);  // Control navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsHidden(true);  // Hide the navbar
      } else {
        // Scrolling up
        setIsHidden(false);  // Show the navbar
      }

      setLastScrollY(currentScrollY);  // Update lastScrollY to the current scroll position
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);  // Cleanup the event listener on unmount
    };
  }, [lastScrollY]);
  return (
    <>
      <div className={`nav-wrapper zindex-50 web-nav w-[100%] h-[180px] navbar flex justify-between items-center px-[120px] ${isHidden ? 'hiddenn' : ''} `}>
        <div className="nav-left flex gap-[30px]">
          {/* -------------------link 1 comp ----------------- */}
          <span
            className="relative"
            onMouseEnter={handleMouseEnterLink1}
            onMouseLeave={handleMouseLeave}
          >
            <UnderlineLeft text={"Particuliers"} />
            <div
              className={`${drop1 === "1" ? "block" : "hidden"
                } dropdown-container h-[350px] px-[25px] pt-[40px] pb-[30px] flex overflow-hidden w-[800px] mt-[5px] absolute bg-[white] rounded-[20px] dropdown-div`}
            >
              <div className="dropdown-left h-[100%] w-[70%]">
                <div className="d-left-top h-[80%] w-[100%]">
                  <p className="text-[14px] font-[500]">Propriétaires bailleurs</p>
                  <Dropdownlinks text={"Assurance loyer impayé"} icon={<i className="fa-solid fa-house text-[black] text-[15px]"></i>} />
                </div>
                <div className="d-left-bottom h-[20%] w-[100%] flex gap-[20px] items-end">
                  <p className="text-[14px] font-[500]">Besoin d’aide ?</p>
                  <p className="text-[12px] display-none text-nowrap text-[#000000b3] hover-underline-animation left">Contactez-nous</p>
                  <p className="text-[12px] display-none text-nowrap text-[#000000b3] hover-underline-animation left">Avis clients</p>
                </div>
              </div>
              <div className="dropdown-right h-[100%] pt-[60px] pb-[20px] px-[30px] w-[30%] bg-[#FFFAFA] rounded-[20px]">
                <p className="text-[14px] text-center">Vous êtes courtier ?</p>
                <p className="text-[20px] font-[500] text-center mt-[12px]">Devenez</p>
                <p className="text-[20px] font-[500] text-center">partenaire</p>
                <p className="relative font-size-14 cursor-pointer flex flex-col gap-[10px] mt-[50px] text-[#C53678] text-center text-[14px]">
                  Contactez-nous
                  <div className="absolute bottom-0 left-1/2 w-1/2 h-[2px] bg-current transform -translate-x-1/2"></div>
                </p>
              </div>
            </div>
          </span>
          {/* ------------------link 2 ------------------ */}
          <span
            className="relative"
            onMouseEnter={handleMouseEnterLink2}
            onMouseLeave={handleMouseLeave}
          >
            <UnderlineLeft text={"Professionnels"} />
            <div
              className={`${drop2 === "1" ? "block" : "hidden"
                } dropdown-container h-[350px] px-[25px] pt-[40px] pb-[30px] flex overflow-hidden w-[1000px] mt-[5px] absolute bg-[white] rounded-[20px] dropdown-div`}
            >
              <div className="dropdown-left h-[100%] w-[70%]">
                <div className="d-left-top h-[80%] w-[100%] flex gap-[40px]">
                  <div>
                    <p className="text-[14px] font-[500]">Administrateurs de biens</p>
                    <Dropdownlinks text={"Garantie Loyers Impayés"} icon={<i className="fa-solid fa-house text-[black] text-[15px]"></i>} />
                    <Dropdownlinks text={"Propriétaire non occupant"} icon={<i className="fa-solid fa-house text-[black] text-[15px]"></i>} />
                    <Dropdownlinks text={"Assurance habitation locataire"} icon={<i className="fa-solid fa-house text-[black] text-[15px]"></i>} />
                  </div>
                  <div>
                    <p className="text-[14px] font-[500]">Marchands de biens</p>
                    <Dropdownlinks text={"Propriétaire non occupant"} icon={<i class="fa-regular fa-building"></i>} />
                  </div>
                  <div>
                    <p className="text-[14px] font-[500]">Syndics</p>
                    <Dropdownlinks text={"Copropriété et immeuble"} icon={<i class="fa-regular fa-building"></i>} />
                  </div>
                </div>
                <div className="d-left-bottom h-[20%] w-[100%] flex gap-[20px] items-end">
                  <p className="text-[14px] font-[500]">Besoin d’aide ?</p>
                  <p className="text-[12px] display-none text-nowrap text-[#000000b3] hover-underline-animation left">Contactez-nous</p>
                  <p className="text-[12px] display-none text-nowrap text-[#000000b3] hover-underline-animation left">Avis clients</p>
                </div>
              </div>
              <div className="dropdown-right h-[100%] pt-[60px] pb-[20px] px-[30px] w-[30%] bg-[#FFFAFA] rounded-[20px]">
                <p className="text-[14px] text-center">Vous êtes courtier ?</p>
                <p className="text-[20px] font-[500] text-center mt-[12px]">Devenez</p>
                <p className="text-[20px] font-[500] text-center">partenaire</p>
                <p className="relative font-size-14 cursor-pointer flex flex-col gap-[10px] mt-[50px] text-[#C53678] text-center text-[14px]">
                  Contactez-nous
                  <div className="absolute bottom-0 left-1/2 w-1/2 h-[2px] bg-current transform -translate-x-1/2"></div>
                </p>
              </div>
            </div>
          </span>
          {/* -------------------link 2 ----------------- */}
        </div>
        <div className="nav-center">logo</div>
        <div className="nav-right flex gap-[30px] items-center">
          {/* ------------- link 3 -------------- */}
          <span
            className="relative"
            onMouseEnter={handleMouseEnterLink3}
            onMouseLeave={handleMouseLeave}
          >
            <UnderlineLeft text={"Votre espace personnel"} />
            <div className={` ${drop3 === "1" ? "block" : "hidden"} bg-[white] w-[160px] absolute px-[10px] link-3-shadow rounded-[15px]`}>
              <div className=' hover:translate-x-[10px] duration-300 cursor-pointer flex justify-between pr-[10px] items-center py-[10px]'>
                <p className='text-[14px]'>Espace particuliers</p>
                <i className="fa-solid fa-angle-right text-[15px]"></i>
              </div>
              <div className=' hover:translate-x-[10px] duration-300 cursor-pointer flex justify-between pr-[10px] items-center py-[10px]'>
                <p className='text-[14px]'>Espace professionnels</p>
                <i className="fa-solid fa-angle-right text-[15px]"></i>
              </div>
              <div className=' hover:translate-x-[10px] duration-300 cursor-pointer flex justify-between pr-[10px] items-center py-[10px]'>
                <p className='text-[14px]'>Extranet dédié courtiers</p>
                <i className="fa-solid fa-angle-right text-[15px]"></i>
              </div>
            </div>
          </span>
          {/* ------------- link 3 -------------- */}
          <Button text={"Contactez-nous"} />
        </div>
      </div>
      <div className={`mbl-nav bg-[white] zindex-50 h-[75px] bg-[black] px-[120px] navbar flex justify-between items-center  ${isHidden ? 'hiddenn' : ''} `}>
        <i onClick={() => { setActive(!active) }} className="fa-solid fa-bars text-[black] text-[30px]"></i>
        <p>Logo</p>
      </div>

      {/* ---------------------- mobile menu --------------- */}

      <div className={`w-[310px] h-[100vh] scrollnone duration-1000 overflow-scroll px-[20px] bg-[white] fixed top-[0px] z-[60] ${active ? 'left-[-0%]' : 'left-[-100%]'} `}>
        <i onClick={() => { setActive(!active) }} className="fa-regular fa-circle-xmark  absolute left-[20px] top-[20px] text-[45px] cursor-pointer "></i>
        <div className='border-b pb-[12px] mt-[100px]'>
          <p className='text-[14px]'>Vous êtes</p>
        </div>
        <div className=' hover:translate-x-[10px] duration-300 cursor-pointer flex justify-between pr-[10px] items-center border-b py-[20px]'>
          <p className='text-[20px]'>Particuliers</p>
          <i className="fa-solid fa-angle-right text-[12px]"></i>
        </div>
        <div className=' hover:translate-x-[10px] duration-300 cursor-pointer flex justify-between pr-[10px] items-center border-b py-[20px]'>
          <p className='text-[20px]'>Professionnels</p>
          <i className="fa-solid fa-angle-right text-[12px]"></i>
        </div>
        <div className='mt-[100px]'>
          <Button text={"Espace particuliers"} />
        </div>
        <div className=" display-none hover:scale-[1.2] linkedin-circle h-[50px] mt-[25px] w-[50px] duration-500 border-black border-[1px] rounded-full flex items-center justify-center cursor-pointer hover:bg-black group">
          <i className="fa-brands fa-linkedin-in text-black text-[20px] group-hover:text-white duration-500"></i>
        </div>
        <MobileMenuText text={"Politique de confidentialité"} />
        <MobileMenuText text={"Conditions Générales d’Utilisation"} />
        <MobileMenuText text={"Mentions légales Télécharger le rapport SFCR"} />
      </div>
      <div className={`h-[100vh] w-[100%] top-[0px] left-[0px] bg-[black] duration-500 menu-layer ${active ? 'opacity-[0.5]' : 'opacity-[0]'} fixed z-[50]`}></div>
    </>
  );
}

export default Navbar;
