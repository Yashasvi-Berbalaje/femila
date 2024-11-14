"use client"

import React from 'react';

function ReviewsCard(props) {
    return (
        <>
            <div className=' mx-[5px] rating-mains'>
                <div className="rating-headerd  flex flex-col justify-center">
                    <div className='flex items-center gap-[10px]'>
                        <div className="star-wrapper flex gap-[3px]">
                            <div className='star-container bg-[#dcdce6] h-[19px] w-[22px]'>
                                <div className="star-inner-container relative flex justify-center items-center cursor-pointer h-[100%] w-[100%] bg-[#00b67a] ">
                                    <i class="fa-solid fa-star" style={{ fontSize: "10px" }}></i>
                                </div>
                            </div>
                            <div className='star-container bg-[#dcdce6] h-[19px] w-[22px]'>
                                <div className="star-inner-container relative flex justify-center items-center cursor-pointer h-[100%] w-[100%] bg-[#00b67a] ">
                                    <i class="fa-solid fa-star" style={{ fontSize: "10px" }}></i>
                                </div>
                            </div>
                            <div className='star-container bg-[#dcdce6] h-[19px] w-[22px]'>
                                <div className="star-inner-container relative flex justify-center items-center cursor-pointer h-[100%] w-[100%] bg-[#00b67a] ">
                                    <i class="fa-solid fa-star" style={{ fontSize: "10px" }}></i>
                                </div>
                            </div>
                            <div className='star-container bg-[#dcdce6] h-[19px] w-[22px]'>
                                <div className="star-inner-container relative flex justify-center items-center cursor-pointer h-[100%] w-[100%] bg-[#00b67a] ">
                                    <i class="fa-solid fa-star" style={{ fontSize: "10px" }}></i>
                                </div>
                            </div>
                            <div className='star-container bg-[#dcdce6] h-[19px] relative w-[23px]'>
                                <div className="star-inner-container cursor-pointer flex justify-center items-center h-[100%] w-[50%] bg-[#00b67a] ">
                                    <i class="fa-solid fa-star" style={{ fontSize: "10px" }}></i>
                                </div>
                            </div>
                        </div>
                        <span className='flex items-center gap-[3px]'>
                            <i class="fa-solid fa-circle-check" style={{ color: "#6c6c85", fontSize: "14px" }}></i>
                            <p className='text-[#6c6c85] text-[13px]'>Verifie</p>
                        </span>
                    </div>
                    <p className='text-[13px] font-[500] w-[90%] mt-[12px] mb-[5px] truncate'>{props.heading}</p>
                    <p className='text-[13px] mb-[8px] w-[80%]'>{props.subheading}</p>
                    <span className='flex gap-[5px]'>
                        <p className='font-[700] text-[#787676] text-[13px]'>{props.name}</p>
                        <p className=' text-[#787676] text-[12px]'>{props.time}</p>
                    </span>
                    <p className='font-[400] text-[13px] mt-[8px]'>{props.latestReview}</p>
                </div>
            </div>
        </>
    );
}

export default ReviewsCard;
