"use client"

import React from 'react';
import ProtectCard from '../components/protectCard';
import Button from '../components/button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger)

function ProtectRent() {
    useGSAP(() => {

        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".protectrent-wrapper",
                start: "top 70%", // Start animation when .home-hero-wrapper enters 80% from the top
                toggleActions: "play none none none", // Plays the animation once when triggered
            },
        });

        tl2.from(".tl2", {
            y: 40,
            opacity: 0,
            stagger: 0.3,
            duration: 1,
        });
    });
    return (
        <>
            <div className="protectrent-wrapper px-[120px] pb-[100px] bg-[#FFFAFA] pt-[20px]">
                <div className='flex justify-center items-center gap-[20px] mt-[20px]'>
                    <p className='text-[14px] cursor-pointer display-none'>Nos clients témoignent</p>
                    <p className='font-[500] text-[18px]'>Excellent</p>
                    <div className="star-wrapper flex gap-[3px]">
                        <div className='star-container bg-[#dcdce6] h-[25px] w-[23px]'>
                            <div className="star-inner-container relative cursor-pointer h-[100%] w-[100%] bg-[#00b67a] ">
                                <i class="fa-solid fa-star" style={{ fontSize: "12px" }}></i>
                            </div>
                        </div>
                        <div className='star-container bg-[#dcdce6] h-[25px] w-[23px]'>
                            <div className="star-inner-container relative cursor-pointer h-[100%] w-[100%] bg-[#00b67a] ">
                                <i class="fa-solid fa-star" style={{ fontSize: "12px" }}></i>
                            </div>
                        </div>
                        <div className='star-container bg-[#dcdce6] h-[25px] w-[23px]'>
                            <div className="star-inner-container relative cursor-pointer h-[100%] w-[100%] bg-[#00b67a] ">
                                <i class="fa-solid fa-star" style={{ fontSize: "12px" }}></i>
                            </div>
                        </div>
                        <div className='star-container bg-[#dcdce6] h-[25px] w-[23px]'>
                            <div className="star-inner-container relative cursor-pointer h-[100%] w-[100%] bg-[#00b67a] ">
                                <i class="fa-solid fa-star" style={{ fontSize: "12px" }}></i>
                            </div>
                        </div>
                        <div className='star-container bg-[#dcdce6] h-[25px] relative w-[23px]'>
                            <div className="star-inner-container cursor-pointer h-[100%] w-[50%] bg-[#00b67a] ">
                                <i class="fa-solid fa-star" style={{ fontSize: "12px" }}></i>
                            </div>
                        </div>
                    </div>
                    <p className='display-none'>4.7 sur 5 basé sur 555 avis</p>
                    <span className='flex items-center gap-[3px]'>
                        <i class="fa-solid fa-star" style={{ color: "#00b67a" }}></i>
                        <p className='font-[14px] font-[500]'>Trustpilot</p>
                    </span>
                </div>
                <div className="protectrent-header text-center mt-[100px]">
                    <p className=' tl2 text-[20px] mb-[10px] font-size-16'>Assurance Loyer Impayé</p>
                    <p className=' tl2 text-[34px] leading-[44px] font-size-20'>Protégez vos loyers avec Mila</p>
                </div>
                <div className="cards-wrapper grid grid-cols-1 gap-40 lg:grid-cols-3 mt-[50px] px-[50px]">
                    <span className='tl2'>
                        <ProtectCard subHeadingWidth={"90%"} src={"/assets/cardimg.png"} heading={"Validation gratuite en moins de 6h"} subheading={"de votre locataire, sans engagement de votre part"} />
                    </span>
                    <span className='tl2'>
                        <ProtectCard subHeadingWidth={"90%"} headingWidth={"70%"} src={"/assets/cardimg.png"} heading={"Remboursement en 48h"} subheading={"dès que vous nous signalez un premier mois de loyer impayé"} />
                    </span>
                    <span className='tl2'>
                        <ProtectCard subHeadingWidth={"90%"} src={"/assets/cardimg.png"} heading={"Pas de plafond de remboursement"} subheading={"et Mila se charge des démarches contentieuses et de leurs frais"} />
                    </span>
                </div>
                <div className=' tl2 flex justify-center mt-[50px]'>
                    <Button text={"Calculer mon tarif"} />
                </div>
            </div>
        </>
    );
}

export default ProtectRent;
