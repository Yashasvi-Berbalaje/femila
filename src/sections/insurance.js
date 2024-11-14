"use client"

import React from 'react';
import InsuranceCard from '../components/insuranceCard';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger)

function Insurance() {
  useGSAP(() => {

    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".insurance-wrapper",
        start: "top 70%", // Start animation when .home-hero-wrapper enters 80% from the top
        toggleActions: "play none none none", // Plays the animation once when triggered
      },
    });

    tl3.from(".tl3", {
      y: 40,
      opacity: 0,
      stagger: 0.3,
      duration: 1,
    });
  });
  return (
    <>
      <div className="insurance-wrapper pt-[100px] px-[120px]">
        <p className=' tl3 text-[20px] text-center font-size-16'>Mila propose aussi des produits d'assurance pour les professionnels de l'immobilier</p>
        <div className="insurance-card-wrapper grid grid-cols-4 lg:grid-cols-3 gap-[30px] mt-[50px] w-full">
          <div className=' tl3 col-span-4 sm:col-span-4 lg:col-span-1'><InsuranceCard mt={"70px"} heading={"Assurance"} mainHeading={"Propriétaire non occupant"} learnMore={"En savoir plus"} /></div>
          <div className=' tl3 col-span-4 sm:col-span-2 lg:col-span-1'><InsuranceCard mt={"70px"} heading={"Assurance"} mainHeading={"Garantie loyers impayés"} learnMore={"En savoir plus"} /></div>
          <div className=' tl3 col-span-4 sm:col-span-2 lg:col-span-1'><InsuranceCard mt={"35px"} heading={"Assurance"} mainHeading={"Multirisques habitation locataire"} learnMore={"En savoir plus"} /></div>
        </div>
      </div>
    </>
  );
}

export default Insurance;
