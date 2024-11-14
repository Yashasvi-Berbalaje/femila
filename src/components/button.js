"use client"

import React from 'react';

function Button(props) {
  return (
    <>
        <button className='px-[30px] duration-700 hover:bg-[white] hover:text-[#C53678] py-[18px] border-[2px] border-[#C53678] text-[14px] text-[white] bg-[#C53678] cursor-pointer rounded-[40px]'>{props.text}</button>
    </>
  );
}

export default Button;
