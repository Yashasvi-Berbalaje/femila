"use client"

import React, { useRef } from 'react';
import ReviewsCard from '../components/reviewsCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CustomerReviews() {
  const slider = useRef(null)
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
      <div className="customer-reviews-wrapper px-[120px] bg-[#FFFAFA] py-[100px]">
        <div className="customers-reviews-header text-center">
          <i className='text-[80px] leading-[70px] text-[#FF5841] font-[700]'>Mila </i>
          <p className='text-[34px] font-size-24'>Le plus proche de ses clients</p>
        </div>
        <div className="customer-reviews-sleder-section w-[100%] mt-[100px] flex">
          <div className="reviews-left w-[18%] h-[100%] flex flex-col items-center">
            <p className='text-[24px] mb-[8px]'>Excellent</p>
            <div className="star-wrapper flex gap-[3px]">
              <div className='star-container bg-[#dcdce6] h-[31px] w-[30px]'>
                <div className="star-inner-container relative cursor-pointer h-[100%] w-[100%] bg-[#00b67a] ">
                  <i class="fa-solid fa-star"></i>
                </div>
              </div>
              <div className='star-container bg-[#dcdce6] h-[31px] w-[30px]'>
                <div className="star-inner-container relative cursor-pointer h-[100%] w-[100%] bg-[#00b67a] ">
                  <i class="fa-solid fa-star"></i>
                </div>
              </div>
              <div className='star-container bg-[#dcdce6] h-[31px] w-[30px]'>
                <div className="star-inner-container relative cursor-pointer h-[100%] w-[100%] bg-[#00b67a] ">
                  <i class="fa-solid fa-star"></i>
                </div>
              </div>
              <div className='star-container bg-[#dcdce6] h-[31px] w-[30px]'>
                <div className="star-inner-container relative cursor-pointer h-[100%] w-[100%] bg-[#00b67a] ">
                  <i class="fa-solid fa-star"></i>
                </div>
              </div>
              <div className='star-container bg-[#dcdce6] h-[31px] relative w-[23px]'>
                <div className="star-inner-container cursor-pointer h-[100%] w-[50%] bg-[#00b67a] ">
                  <i class="fa-solid fa-star"></i>
                </div>
              </div>
            </div>
            <p className='text-[14px] mt-[10px] flex gap-[3px]'>Base sur <p className='text-[14px] underline'>555 avis</p></p>
            <span className='flex items-center gap-[3px] mt-[10px]'>
              <i class="fa-solid fa-star" style={{ color: "#00b67a", fontSize: "24px" }}></i>
              <p className='text-[18px] font-[500]'>Trustpilot</p>
            </span>

          </div>
          <div className=" reviews-right w-[75%] relative mx-[5%] h-[100%]">
            <img className='cursor-pointer absolute z-[10] top-[50%] left-[-35px] translate-y-[-50%] prev-arrow h-[24px]' onClick={() => slider.current.slickPrev()} src="/assets/project-previous-btn.svg" alt="" />
            <Slider className='' ref={slider} {...settings}>
              <ReviewsCard latestReview={"Nos derniers avis"} time={"Il y a 18 heures"} name={"Vincent,"} heading={"Informations claires et bon rapport qualité-prix"} subheading={"Informations claires, réactivité, prix raisonnables : je suis très satisfait !"} />
              <ReviewsCard time={"Il y a 2 jours"} name={"SCI MIGEON CHARIOT,"} heading={"Rien à redire"} subheading={"Rien à redire, traitement rapide et clair du dossier."} />
              <ReviewsCard time={"Il y a 3 jours"} name={"Theo K,"} heading={"Rapidité et Professionnel"} subheading={"J’ai récemment eu un sinistre dans mon appartement,je tiens à souligner l’excell..."} />
            </Slider>
            <img className='cursor-pointer next-arrow h-[24px] absolute z-[10] top-[50%] right-[-35px] translate-y-[-50%]' onClick={() => slider.current.slickNext()} src="/assets/project-next-btn.svg" alt="" />
          </div>
        </div>
        <p className="relative inline-block flex justify-center mt-[100px]">
          <p className='hover-underline-animation-center font-size-14 relative cursor-pointer text-[16px]'>
            Lire plus d'avis de nos clients
            <span className="absolute bottom-0 left-1/2 w-1/5 h-[2px] bg-current transform -translate-x-1/2" ></span>
          </p>
        </p>
      </div>
    </>
  );
}

export default CustomerReviews;
