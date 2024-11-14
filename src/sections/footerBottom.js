"use client"

import React from 'react';

function FooterBottom() {
    return (
        <>
            <div className="footer-bottom-wrapper pb-[80px] px-[120px] flex gap-[30px]">
                <p className='text-[12px] footer-bottom-copy text-nowrap'>© 2024 Mila</p>
                <p className='text-[12px] display-none text-nowrap text-[#000000b3] hover-underline-animation left'>Politique de confidentialité</p>
                <p className='text-[12px] display-none text-nowrap text-[#000000b3] hover-underline-animation left'>Conditions Générales d’Utilisation</p>
                <p className='text-[12px] display-none text-nowrap text-[#000000b3] hover-underline-animation left'>Mentions légales</p>
                <p className='text-[12px] display-none text-nowrap text-[#000000b3] hover-underline-animation left'>Télécharger le rapport SFCR</p>
            </div>
        </>
    );
}

export default FooterBottom;
