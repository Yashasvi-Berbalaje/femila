"use client"

import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger)

function OnlineSection() {
  useGSAP(() => {

    let mm = gsap.matchMedia();
    mm.add("(min-width: 1180px)", () => {
      gsap.to(".online-right-first", {
        transform: "translateY(-130%)",
        duration: 0.5, // Duration of the animation after the trigger point is reached
        scrollTrigger: {
          trigger: ".online-wrapper",
          start: "50% 50%", // Trigger when .online-wrapper has scrolled halfway
          //   markers: true,
          end: "bottom 50%", // Optional: pin release point if needed
          pin: true, // Pins the element until the animation is triggered
          toggleActions: "play play play reverse", // Allows reverse on scroll back up
        },
      });
      gsap.to(".custom-scroll", {
        transform: "translateY(150%)", // Move the .custom-scroll element 150% on the Y-axis
        scrollTrigger: {
          trigger: ".online-wrapper", // Trigger the animation when scrolling through .online-wrapper
          start: "top 50%", // Start the animation when .online-wrapper hits the top of the viewport
          end: "bottom 80%", // End the animation when .online-wrapper reaches the bottom of the viewport
          //   markers:true,
          scrub: true, // Links the animation to the scroll progress for a smooth effect
          //   pin: true, // Pins the .custom-scroll element in place during the scroll
        },
      });
    });
  });
  return (
    <>
      <div className="online-wrapper py-[100px] px-[120px]">
        <div className="online-headin-wrapper mb-[60px] text-center">
          <div className="online-heading text-[34px] leading-[46px] font-size-24 line-h-36">En ligne ou par téléphone,</div>
          <div className="online-heading text-[34px] leading-[46px] font-size-24 line-h-36">nous sommes là pour vous</div>
        </div>
        <div className="online-center h-[290px] flex w-[100%]">
          <div className="w-[50%] online-center-left scrollbar2  h-[100%] pt-[10px] overflow-hidden online-left">
            <div className=" card-1 online-right-first translate-card-x-30   flex justify-center items-center">
              <img className=' card-1 h-[280px] w-[220px] object-contain' src="https://tbccard.ge/files/img/img-06-04-02601223.png" alt="" />
            </div>
            <div className="card-2 online-right-first flex  justify-center items-center">
              <img className='card-2 h-[280px] w-[220px] object-contain translate-card translate-y-[30%]' src="https://tbccard.ge/files/img/img-06-04-02601223.png" alt="" />
            </div>
          </div>
          <div className='h-[100%] display-none-118 w-[7px] flex justify-center relative'>
            <hr className='h-[100%] w-[1px] rotate-[180deg] bg-[#d8d8d8]' />
            <div className='h-[40%] custom-scroll rounded-[4px] min-w-[7px] bg-[#ff5841] top-[0px] absolute'></div>
          </div>
          <div className="w-[50%] online-center-right h-[100%] overflow-hidden pl-[80px] pt-[50px] online-right">
            <div className="online-right-first online-right-first-second w-[80%]">
              <p className='text-[24px] font-size-18 line-h-28 online-text-center online-center-right-text-center font-[500] mb-[20px] leading-[36px]'>Le meilleur du digital, toujours avec vous.</p>
              <p className='text-[16px] font-size-14 online-text-center online-center-right-text-center'>Déposez vos dossiers locataires, signez et gérez votre contrat, déclarez vos impayés, le tout depuis votre espace en ligne</p>
            </div>
            <div className="online-right-first display-none-1180 w-[80%] translate-y-[30%]">
              <p className='text-[24px] font-size-18 line-h-28 font-[500] mb-[20px] leading-[36px]'>Un conseiller disponible, au moindre besoin</p>
              <p className='text-[16px] font-size-14'>Un conseiller dédié en France se charge de trouver des solutions pour vous… <br />Une question, un doute ? Contactez-nous !</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnlineSection;
