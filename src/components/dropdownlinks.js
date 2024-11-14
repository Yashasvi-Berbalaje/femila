"use client"

import React from 'react';

function Dropdownlinks(props) {
  return (
    <>
        <div className='flex gap-[20px] items-center mt-[5px] pt-[20px]'>
        {props.icon}
        <p className=' text-nowrap text-[12px]'>{props.text}</p>
        </div>
    </>
  );
}

export default Dropdownlinks;
