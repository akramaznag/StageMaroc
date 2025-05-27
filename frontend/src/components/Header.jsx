import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';


export default function Header() {
  const [popup,setPopup]=useState(false);
  return (
    <div className='fixed flex justify-center shadow-amber-50 border-b-0 h-[70px] w-full col-start-1 col-end-11 row-start-1 row-end-2 gap-x-14 bg-white'>
<div className='flex justify-center w-[85%]'>

      <div className='flex w-1/3 justify-center items-center'>
        <div className=' cursor-pointer text-2xl font-semibold'>Maroc Stage</div>
      </div>

      {/* Navigation Menu */}
      <ul className='flex list-none w-full justify-center items-center gap-x-14 text-sm capitalize'>
      <li className=' cursor-pointer border-b-2 border-gray-50 hover:border-b-blue-400 transition-all duration-300'>
       <Link to={'/stages'}>offres de stages</Link>
        </li>
        <li className=' cursor-pointer border-b-2 border-gray-50 hover:border-b-blue-400 transition-all duration-300'>
         <Link to={'/stagaire/inscription'}> espace stagaire </Link>
        </li>
      <li className=' cursor-pointer border-b-2 border-gray-50 hover:border-b-blue-400 transition-all duration-300'>espace recruteur</li>
      </ul>

      {/* Auth Menu */}
      <ul className='flex list-none w-1/3 justify-center items-center  gap-x-8 capitalize text-sm'>

      <li className='flex justify-center'>
        <div onClick={()=>setPopup(!popup)} className='cursor-pointer outline-none h-8 w-8 border-2 border-gray-100 rounded-full !p-5 uppercase bg-blue-100 flex justify-center items-center'>
          <div className='text-sm text-gray-500'>AA</div>
        </div>
        

      </li>
      <li className={`${popup? 'transition-all duration-300  absolute right-45 top-19 bg-white text-black h-auto w-44 rounded-2xl !pt-2 !pb-1 border-2 border-gray-200':'hidden'    } `}>
        <ul className='flex flex-col gap-y-1'>
           <li className='text-[12px] !p-2 text-gray-400'>espace stagaire</li>
<li className='hover:bg-gray-200 transition-all duration-300 !p-2'>
  <Link to={'/stagaire/dashboard/'} className='text-[13px] first-letter:capitalize' onClick={()=>setPopup(false)}>tableau de bord</Link>
</li>

<li className='hover:bg-gray-200 transition-all duration-300 !p-2'>
  <Link to={'/utilisateur/profil/'} className='text-[13px] first-letter:capitalize' onClick={()=>setPopup(false)}>parametres</Link>
</li>

<li className='hover:bg-gray-200 border-t-1 border-gray-300 transition-all duration-300 !p-2 flex justify-start gap-x-1 items-center'>
  <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-600" />

  <Link className='text-[13px] first-letter:uppercase' onClick={()=>setPopup(false)}> se deconnecter</Link>
</li>


          </ul>
    
      </li>
      {/* <li className='rounded-sm !py-2 !px-4 cursor-pointer transition-all duration-300  hover:bg-blue-400 hover:text-white'>connexion</li>
      <li className='rounded-sm !py-2 !px-4 cursor-pointer transition-all duration-300  hover:border-blue-400 hover:border-[1px] '>inscription</li> */}
      </ul>
</div>
      
    </div>
  );
}
