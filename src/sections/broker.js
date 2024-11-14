"use client"

import React from 'react';
import Button from '../components/button';

function Broker() {
  return (
    <>
      <div className="broker-wrapper pt-[200px] pb-[300px] mt-[100px] px-[120px] flex flex-col items-center">
        <p className='text-[20px] font-size-16'>Courtiers</p>
        <p className='text-[34px] font-size-24 font-[600] broker-wrapper-text text-center'>Changez la donne avec Mila !</p>
        <p className='text-[16px] pb-[40px] font-size-14 pt-[20px] broker-wrapper-text text-center'>Vous souhaitez distribuer nos produits pour les particuliers ou professionnels ?</p>
        <Button text={"Contactez-nous !"} />
      </div>
    </>
  );
}

export default Broker;
