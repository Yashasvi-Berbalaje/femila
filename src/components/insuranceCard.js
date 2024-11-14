"use client"

import React from 'react';

function InsuranceCard(props) {
    return (
        <>
            <div className="insurance-card-wrapper flex h-[380px] flex-col items-center bg-[#C53678] py-[100px] px-[20px] rounded-[20px]">
                <i class="fa-solid fa-house" style={{ color: "white", marginBottom: "20px", fontSize: "25px" }}></i>
                <p className='text-[16px] text-[white] font-size-14'>{props.heading}</p>
                <p className='text-[22px] text-[white] text-center font-size-18 font-[600]'>{props.mainHeading}</p>
                <div className={`relative insurance-card-learn inline-block flex justify-center `} style={{ marginTop: `${props.mt}` }}>
                    <div className='hover-underline-animation-card relative font-size-14 cursor-pointer text-[white] text-[16px]'>
                        {props.learnMore}
                        <span className="absolute bottom-0 left-1/2 w-1/2 h-[2px] bg-current transform -translate-x-1/2" ></span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InsuranceCard; 
