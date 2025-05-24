import React from 'react'
import {
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowUpRightIcon,
  MapPinIcon

} from '@heroicons/react/24/outline';
import { Icon } from '@iconify/react';

import { Link } from 'react-router-dom';
export default function Internships() {
  return (
   <div className='flex justify-center'>
      {/* Container wrapper */}
      <div className='!my-[130px]  w-[85%] '>
        <div className='bg-red h-auto  w-full'>
            <div className='bg-green h-auto w-full flex justify-center !mb-15'>
                <div className='w-[80%] flex flex-col items-center gap-y-3'>
                    <h1 className='text-5xl uppercase text-center w-[90%] font-bold'>+13000 Offres de stage au Maroc pour lancer ta carrière</h1>
                    <p> Trouvez des offres de stage au Maroc pour démarrer votre carrière</p>
                </div>
            </div>
            <div className='bg-purple w-full flex '>
                <div className='bg-blue w-[20%]'>
                    <form className='flex flex-col justify-center items-center gap-y-5'>
                        <button type='reset' className='bg-white  border-1 border-red-500 outline-none !py-4 !px-10 text-sm capitalize flex justify-center items-center gap-x-2 rounded-md'>
                            <XMarkIcon className='text-red-500 w-5 h-5 font-semibold' />  
                            <span className='text-red-500 font-semibold'>effacer le filltre</span>
                        </button>
                        <div className='flex flex-col gap-y-4'>
                            {/* internship paycheck */}
                            <div className='flex gap-x-3 items-center bg-green'>
                                <input id='paycheck' className='h-[15px] w-[15px] rounded-xl border-1 border-gray-200' type='checkbox'/>
                                <label htmlFor='paycheck' className='text-sm capitalize font-semibold'>Stage rémunéré</label>
                            </div>
                            {/* internship presence */}
                            <div className=' bg-green flex flex-col gap-y-3 capitalize'>
                                <div className='capitalize text-sm font-semibold'>présence</div>
                                <div className='flex flex-col gap-y-1'>
                                   <div className='flex gap-x-3 items-center bg-green'>
                                        <input id='paycheck' className='h-[15px] w-[15px] rounded-xl border-1 border-gray-200' type='checkbox'/>
                                        <label htmlFor='paycheck' className='capitalize text-sm font-semibold'>sur site </label>
                                    </div>
                                  <div className='flex gap-x-3 items-center bg-green'>
                                    <input id='paycheck' className='h-[15px] w-[15px] rounded-xl border-1 border-gray-200' type='checkbox'/>
                                    <label htmlFor='paycheck' className='capitalize text-sm font-semibold'>À distance</label>
                                   </div>
                                   <div className='flex gap-x-3 items-center bg-green'>
                                    <input id='paycheck' className='h-[15px] w-[15px] rounded-xl border-1 border-gray-200' type='checkbox'/>
                                    <label htmlFor='paycheck' className='capitalize text-sm font-semibold'>Hybride</label>
                                   </div>
                                </div>
                            </div>
                            <div className='flex flex-col w-full  gap-y-2'>
                                <label className='text-sm capitalize font-semibold'>Spécialité </label>
                                <select className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none' >
                                    <option value="" disabled selected hidden>Sélectionnez une option</option>
                                    <option value="">bac </option>
                                    <option value="">bac </option>
                                    <option value="">bac </option>
                                    <option value="">bac </option>
                                </select>
                            </div>
                            <div className='flex flex-col w-full  gap-y-2'>
                                <label className='text-sm capitalize font-semibold'>Ville </label>
                                <select className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none' >
                                    <option value="" disabled selected hidden>Sélectionnez une option</option>
                                    <option value="">bac </option>
                                    <option value="">bac </option>
                                    <option value="">bac </option>
                                    <option value="">bac </option>
                                </select>
                            </div>
                            <div className='flex flex-col w-full  gap-y-2'>
                                <label className='text-sm capitalize font-semibold'>Durée</label>
                                <select className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none' >
                                    <option value="" disabled selected hidden>Sélectionnez une option</option>
                                    <option value="">bac </option>
                                    <option value="">bac </option>
                                    <option value="">bac </option>
                                    <option value="">bac </option>
                                </select>
                            </div>
                            <div className='flex flex-col w-full  gap-y-2'>
                                <label className='text-sm capitalize font-semibold'>Contrat </label>
                                <select className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none' >
                                    <option value="" disabled selected hidden>Sélectionnez une option</option>
                                    <option value="">bac </option>
                                    <option value="">bac </option>
                                    <option value="">bac </option>
                                    <option value="">bac </option>
                                </select>
                            </div>
                             {/* internship presence */}
                             <div className=' bg-green flex flex-col gap-y-3 capitalize'>
                                <div className='text-sm capitalize font-semibold'>Disponibilité</div>
                                <div className='flex flex-col gap-y-1'>
                                   <div className='flex gap-x-3 items-center bg-green'>
                                        <input id='paycheck' className='h-[15px] w-[15px] rounded-xl border-1 border-gray-200' type='checkbox'/>
                                        <label htmlFor='paycheck' className='capitalize text-sm font-semibold'>Temp plein </label>
                                    </div>
                                     <div className='flex gap-x-3 items-center bg-green'>
                                <input id='paycheck' className='h-[15px] w-[15px] rounded-xl border-1 border-gray-200' type='checkbox'/>
                                <label htmlFor='paycheck' className='capitalize text-sm font-semibold'>Temps partiel</label>
                            </div>
                                </div>
                            </div>
                        </div>
                        
                    </form>
                </div>
                <div className='bg-red w-[80%]'>
                    <div className='flex flex-col w-full  gap-y-5 '>
                        {/* search bar */}
                        <div className='bg-gray-200 w-full h-[50px] !p-3 flex  justify-between items-center rounded-lg'>
                            <div className='bg-green uppercase text-2xl font-bold'><span className='text-slate-400 !mr-3'>1</span><span className='text-blue-500'>offres de stage</span></div>
                            <div className='bg-green w-[25%] h-[100%] flex items-center justify-end'>
                                <input placeholder='Rechercher' className='bg-white rounded-lg text-sm !px-3 !py-4 h-[100%] w-[80%] border-2 border-gray-300 focus:border-blue-500 transition-all duration-50 focus:outline-none  focus:border-3'/>
                                 <MagnifyingGlassIcon className=' text-slate-400 w-5 h-5 absolute right-[10%]'/> 
                            </div>

                        </div>
                        {/* internships offers */}
                        <div className='bg-yellow w-full h-auto flex flex-col transition-all border-1 shadow-lg border-gray-200 rounded-lg  hover:border-blue-500 hover:outline-none'>
                            <div className='h-[120px] border-1 border-gray-200 rounded-md w-full bg-white flex justify-between !px-3 items-center'>
                                {/* enterprise infos */}
                            <div className='bg-green w-[47%] h-[110px]  gap-x-3 !px-3 flex items-center'>
                                {/* enterprise logo */}
                                <img src='/download.png' className='h-[100px] w-[100px] rounded-md'/>
                                <div className='flex flex-col gap-y-2 h-[100px]'>
                                    <div className=''><Link className='text-blue-500 capitalize underline font-bold text-lg ' to={'/stage/titre-de-stage/'}>stage assitante administratif</Link> </div>
                                    <div className='flex justify-between w-[90%]'>
                                        <Link className='text-slate-600 uppercase text-sm flex gap-x-1 '> <ArrowUpRightIcon className='w-5 h-5 '/>  <span>sanlam</span>   </Link>
                                        <div className='text-slate-600 capitalize flex text-sm gap-x-1'>
                                             <Icon icon="twemoji:flag-morocco" width="24" />
                                             <span className=''>maroc</span>
                                        </div>
                                    </div>
                                    <div className='flex gap-x-2 w-full'>
                                        <div className='bg-emerald-100  !p-2  h-[30px] min-w-[70px] capitalize text-[12px] flex justify-center items-center rounded-lg'>finance</div>
                                        <div className='bg-indigo-100  !p-2 h-[30px] min-w-[70px] capitalize text-[12px] flex justify-center items-center rounded-lg'>stage operationel</div>
                                        <div className='bg-amber-100  !p-2 h-[30px] min-w-[70px] capitalize text-[12px] flex justify-center items-center rounded-lg'>stage remunere</div>
                                    </div>
                                </div>

                            </div>    
                               {/* internship duration */}
                            <div className='bg-green w-[40%] h-[110px] flex justify-center'>
                                <div className='bg-red w-1/2 flex flex-col justify-center items-center'>
                                    <div>
                                        <span className='font-bold'>3 - 6 mois</span>
                                    </div>
                                    <div className='first-letter:capitalize text-slate-400 text-sm'>
                                        <span>a partir du </span>
                                        <span>15/03/2025</span>
                                    </div>
                                </div>
                                <div className='bg-red w-1/2 flex justify-center items-center'>
                                    <MapPinIcon className='w-8 h-8'/>
                                    <div className='capitalize font-bold'>casablanca</div>
                                </div>

                            </div>  
                             
                            </div>
                         

                        </div>
                     
                    </div>
                </div>
            </div>
              

        </div>
      </div>
    </div> 
     )
}
