"use client"

import React from 'react';

function MobileMenuText(props) {
    return (
        <>
            <div>
                <a className='hover-underline-animation-m-menu  left-m-menu mt-[15px] hover:text-[black] text-[black] text-[14px]' href="">{props.text}</a>
            </div>
        </>
    );
}

export default MobileMenuText;
