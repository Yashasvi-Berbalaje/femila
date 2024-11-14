"use client"

import React from 'react';
import Button from '../components/button';
import FooterUnderlineText from '../components/footerUnderlineText';

function Footer() {
    return (
        <>
            <div className="footer-wrapper px-[120px]">
                <div className="footer-header gap-[40px] mt-[60px] mb-[20px] flex items-center">
                    <i className='text-[90px] leading-[70px] text-[#FF5841] font-[700]'>Mila </i>
                    <button className='px-[30px] duration-700 flex items-center gap-[10px] hover:bg-[white] hover:text-[#FF5841] py-[18px] border-[2px] border-[#FF5841] text-[14px] text-[white] bg-[#FF5841] cursor-pointer rounded-[40px]'>
                        <i class="fa-solid fa-phone-volume"></i>
                        05 19 88 08 88
                    </button>
                </div>
                <div className="footer-center flex w-[100%] ">
                    <div className="footer-center-left pb-[100px] w-[40%] h-[100%]">
                        <p className='text-[20px] footer-center-left-text text-align-center font-size-18'>Réinventons ensemble l'assurance de l'immobilier !</p>
                        <div className=" display-none hover:scale-[1.2] linkedin-circle h-[50px] mt-[25px] w-[50px] duration-500 border-black border-[1px] rounded-full flex items-center justify-center cursor-pointer hover:bg-black group">
                            <i className="fa-brands fa-linkedin-in text-black text-[20px] group-hover:text-white duration-500"></i>
                        </div>
                    </div>
                    <div className="footer-center-right display-none w-[60%] h-[100%] grid grid-cols-3 pl-[40px]">
                        <div>
                            <h3 className='font-[500] text-[16px] flex flex-col mb-[15px]'>Assurances</h3>
                            <FooterUnderlineText text={"Particuliers"} />
                            <FooterUnderlineText text={"Professionnels"} />
                        </div>
                        <div>
                            <h3 className='font-[500] text-[16px] mb-[15px]'>Mila & vous</h3>
                            <FooterUnderlineText text={"Qui sommes-nous ?"} />
                            <FooterUnderlineText text={"Devenir partenaire"} />
                            <FooterUnderlineText text={"Contactez-nous"} />
                        </div>
                        <div>
                            <h3 className='font-[500] text-[16px] mb-[15px]'>Ressources</h3>
                            <FooterUnderlineText text={"Avis clients"} />
                            <FooterUnderlineText text={"Presse"} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Footer;
