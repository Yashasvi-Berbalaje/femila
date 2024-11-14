import React from 'react';

function ProtectCard(props) {
  return (
    <>
      <div className="ProtectCard-wrapper flex flex-col text-center items-center">
        <img className='h-[120px]' src={props.src} alt="" />
        <p className=" text-[24px] line-h-28 protectCard-wrapper-text font-[500] leading-[36px] font-size-18-protect-card mt-[30px]" style={{ width: `${props.headingWidth}` }}>{props.heading}</p>
        <p className=" text-[16px]  protectCard-wrapper-text leading-[24px] mt-[10px] font-size-14" style={{ width: `${props.subHeadingWidth}` }} >{props.subheading}</p>
      </div>
    </>
  );
}

export default ProtectCard;
