"use client"

import React from 'react';
import Button from '../components/button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger)

function HomeHero() {
    useGSAP(() => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".home-hero-wrapper",
                start: "top 80%", // Start animation when .home-hero-wrapper enters 80% from the top
                toggleActions: "play none none none", // Plays the animation once when triggered
            },
        });

        tl.from(".tl1", {
            y: 40,
            opacity: 0,
            stagger: 0.3,
            duration: 1,
        });
    });
    return (
        <>
            <div className="home-hero-wrapper mt-[180px] px-[120px] text-center pt-[15px] pb-[1vw]">
                <p className=' text-[20px] leading-[60px] font-[400] font-size-16'>Propriétaires Particuliers</p>
                <p className='tl1 text-[80px] leading-[80px] font-[500] font-size-48 line-h-48'>Soufflez,</p>
                {/* <img src="" alt="Logo" /> */}
                <p className=' tl1 text-[80px] leading-[80px] font-[500] font-size-48 line-h-48'> <i className='text-[80px] font-size-48 leading-[70px] text-[#FF5841] font-[700]'>Mila </i>assure</p>
                <p className=' tl1 text-[80px] leading-[80px] font-[500] font-size-48 line-h-48'>vos loyers</p>
                <div className=" tl1 button-container mt-[55px]">
                    <Button text={"Calculer mon tarif"} />
                </div>
                <div className="hero-bottom mt-[100px]">
                    <p className='text-[#7F7F7F] font-[500] text-center font-size-12'>Mila est un assureur français spécialisé dans l’immobilier.</p>
                </div>
            </div>
        </>
    );
}

export default HomeHero;
