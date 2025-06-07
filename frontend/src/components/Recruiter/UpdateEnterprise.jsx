import React, { useState,useEffect } from 'react'
import {
  HomeIcon,
  IdentificationIcon,
  CalendarIcon,
  BriefcaseIcon,
  ClockIcon,
  BookOpenIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  ArrowUpTrayIcon,
  EyeIcon,
  DocumentIcon,
  BuildingOfficeIcon,
  PencilIcon,
  FlagIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
export default function UpdateEnterprise() {
    const [isVisible,setIsVisible]=useState(false);
    const [isOpen,setIsOpen]=useState(false)
    const [notification,setNotification]=useState(false)
    
      const IfNotification=()=>{
         
            setNotification(true)
        }
        useEffect(() => {
        if (notification) {
          const timer = setTimeout(() => {
            setNotification(false);
          }, 5000);
          return () => clearTimeout(timer);
        }
      }, [notification]);
        const CloseNotification=()=>{
            setNotification(false)
        }
      const OpenPopUp=()=>{
        setIsOpen(true)
        setTimeout(() => {
            setIsVisible(true)
        }, 20);
    }
     const ClosePopUp=()=>{
        setIsOpen(false)
        setTimeout(() => {
            setIsVisible(false)
        }, 300);
    }
     useEffect(() => {
  document.body.style.overflow = isOpen ? 'hidden' : 'auto';
}, [isOpen]);
    
  const text_input_style='text-sm  !p-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none'
  const select_input_style='!p-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-sm capitalize'

  return (
    <div className='flex flex-col min-h-[600px] h-auto gap-y-3  border-blue rounded-lg'>
         {/* notification */}
          <div className={`fixed right-0 top-0 w-[30%] h-auto flex justify-end transition-all duration-500 ease-in-out
            ${notification ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
                        <div className={ 'bg-white  w-[80%] h-[75px] border-1 border-gray-200 rounded-lg relative right-4 top-4 shadow-md flex items-center justify-between !p-3 gap-x-2 transition-opacity duration-300 '}>
                          
                          <div className='flex items-center gap-x-2 '>
        
                            <CheckCircleIcon className='w-7 h-7 text-green-400 relative bottom-2'/>
                            <div className='flex flex-col gapy-y-2'>
                                <div className='first-letter:capitalize font-bold text-sm'>candidature envoyé</div>
                                <div className='text-[12px] first-letter:capitalize text-slate-500'>candidature envoyé avec success</div>
                            </div>
                          </div>
                            
                          <div className='flex items-center gap-x-2 '>
        
                            <XMarkIcon onClick={()=>CloseNotification()} className='w-6 h-6 text-slate-500 relative bottom-2 font-bold'/>
                           
                          </div>
        
                        </div>
            </div>
        <div className='bg-gray-200 rounded-lg w-full h-auto !py-2 flex justify-between items-center !px-5 gap-x-1'>
            <div className='text-2xl text-blue-500 font-semibold uppercase w-1/3 bg-blue h-[100%] flex justify-start items-center'>Mon entreprise</div>
            <div className='w-1/3 h-[100%] flex justify-end items-center'>
            <div className='flex justify-end items-center gap-x-2 border-slate-400 border-1 outline-none !p-2  rounded-lg bg-blue-500 hover:bg-blue-600 cursor-pointer' onClick={()=>OpenPopUp()}> 
                <PencilIcon className='w-5 h-5 text-white'/>
               <div className='text-white text-sm capitalize'>modefier l'entreprise</div>
            </div>
        </div>
           
        </div>
        <div className='bg-yellow h-auto min-h-[80%] w-full flex flex-col shadow-md'>
            <div className='w-full h-[30%] bg-gray-200 '>
                {/* enterprise picture */}
                <div className='w-full h-[100%] flex items-end justify-center'>

                <div className='bg-white shadow-md h-[130px] w-[130px] rounded-full shadow-md relative top-[50px] flex justify-center items-center'>
                    <img src='/download.png' className='w-[80%] h-[40%] rounded-lg'/>

                </div>
                </div>
            </div>
            <div className='w-full  h-auto bg-white'>
                <div className='flex  bg-green w-full  h-auto '>
                    <div className='bg-red w-1/2 !p-10 flex flex-col gap-y-7'>
                       <div>
                          <div  className='font-bold text-sm first-letter:capitalize text-slate-500'>nom de l'entreprise</div>
                          <div className='uppercase text-blue-500 text-xl font-bold'>sanlam</div>
                       </div>
                       <div className='flex gap-5'>
                         <div className='flex flex-col gap-y-1'>
                            <div className='font-bold text-sm first-letter:capitalize text-slate-500'>Pays d'origine</div>
                            <div className='flex gap-x-1 items-center'>
                                <FlagIcon className='w-5 h-5 text-slate-800'/>
                                <div className='capitalize'>maroc</div>
                            </div>
                         </div>
                          <div className='flex flex-col gap-y-1'>
                            <div className='font-bold text-sm first-letter:capitalize text-slate-500'>fondé en</div>
                            <div className='flex gap-x-1 items-center'>
                                <CalendarIcon className='w-5 h-5 text-slate-800'/>
                                <div className=''>2004</div>
                            </div>
                         </div>
                       </div>
                        <div className='flex gap-5'>
                      
                          <div className='flex flex-col gap-y-1'>
                            <div className='font-bold text-sm first-letter:capitalize text-slate-500'>Bureau au Maroc</div>
                            <div className='flex gap-x-1 items-center'>
                                <MapPinIcon className='w-5 h-5 text-slate-800'/>
                                <div className='capitalize'>casablanca</div>
                            </div>
                         </div>
                       </div>
                        <div className='flex gap-5'>
                      
                          <div className='flex flex-col gap-y-1'>
                            <div className='font-bold text-sm first-letter:capitalize text-slate-500'>description</div>
                            <p className='first-letter:capitalize w-[90%] text-justify'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam corrupti nihil distinctio cupiditate vero sequi veritatis laborum dolorem. Labore enim quaerat vel accusamus ipsam debitis ducimus corrupti nulla architecto molestias!</p>
                         </div>
                       </div>
                      
                    </div>
                    <div className='bg-red w-1/2 !py-10 !pl-12 flex flex-col gap-y-7'>
                       <div>
                          <div  className='font-bold text-sm first-letter:capitalize text-slate-500'>secteur</div>
                           <div className='flex gap-x-1 items-center'>
                                <BriefcaseIcon className='w-5 h-5 text-slate-800'/>
                                <div className='capitalize'>Marketing/Communication</div>
                            </div>
                       </div>
                       <div className='flex gap-5'>
                         <div className='flex flex-col gap-y-1'>
                            <div className='font-bold text-sm first-letter:capitalize text-slate-500'>type</div>
                            <div className='flex gap-x-1 items-center'>
                                <BuildingOfficeIcon className='w-5 h-5 text-slate-800'/>
                                <div className='capitalize'>privé</div>
                            </div>
                         </div>
                        
                       </div>
                        <div className='flex gap-5'>
                      
                          <div className='flex flex-col gap-y-1'>
                            <div className='font-bold text-sm first-letter:capitalize text-slate-500'>Site internet</div>
                            <div className='flex gap-x-1 items-center'>
                                <GlobeAltIcon className='w-5 h-5 text-slate-800'/>
                                <div className='lowercase'>www.market.com</div>
                            </div>
                         </div>
                       </div>
                      
                    </div>

                </div>
            </div>

        </div>
        {/* popup */}
          {/* apply popup */}
             {isOpen && (
          <div className={`fixed inset-0 z-[60] flex justify-center items-center bg-black/50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} >
            {/* Popup Container */}
            <div className="bg-white w-[50%]  h-[90%] rounded-xl shadow-lg !p-5 relative z-[70] flex flex-col">
                <h3 className='text-lg capitalize font-semibold !mb-3'>Modifier l'Entreprise</h3>
                <form className='w-full'>
                   <div className='grid grid-cols-8 w-full h-auto gap-4 '>
                     {/*  type */}
                      <div className='col-span-3 flex flex-col gap-y-1  bg-purple '>
                        <label className='text-sm capitalize'>nom entreprise <span className='text-red-500'>*</span> </label>
                        <input type='text' className={text_input_style}/>
                      </div>
                      <div className='col-span-1 flex  flex-col gap-y-1 bg-purple   '>
                        <label className='text-sm capitalize'>Fondé en <span className='text-red-500'>*</span> </label>
                        <input type='text' className={text_input_style}/>
                      </div>
                      <div className='col-span-2 flex flex-col gap-y-1  bg-purple '>
                        <label className='text-sm capitalize'>Pays d'origine <span className='text-red-500'>*</span> </label>
                        <select  className={select_input_style}>
                          <option value="">france</option>
                          <option value="">usa</option>
                          <option value="">maroc</option>
                        </select>
                      </div>
                      <div className='col-span-2 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>Bureau au Maroc <span className='text-red-500'>*</span> </label>
                        <select type='text' className={select_input_style}>
                          <option value="">casablanca</option>
                          <option value="">rabat</option>
                        </select>
                      </div>
                      <div className='col-span-8 flex gap-x-3'>
                        <label className='text-sm capitalize'>type <span className='text-red-500'>*</span> </label>
                        <div className='flex gap-x-3'>
                            <div className="flex items-center gap-x-2">
                                     <input   type="radio" name="type"  id="private"  className="peer hidden"  />
                                     <label  htmlFor="private"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >
                                     </label>
                                     <span className="text-sm font-medium">prive</span>
                            </div>
                             <div className="flex items-center gap-x-2">
                                     <input   type="radio" name="type"  id="public"  className="peer hidden"  />
                                     <label  htmlFor="public"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >

                                     </label>
                                     <span className="text-sm font-medium">public</span>
                             </div> 
                             <div className="flex items-center gap-x-2">
                                     <input   type="radio" name="type"  id="halfpublic"  className="peer hidden"  />
                                     <label  htmlFor="halfpublic"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >

                                     </label>
                                     <span className="text-sm font-medium">semi-public</span>
                             </div>
                        </div>
                      </div>
                      <div className='col-span-8 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>Description <span className='text-red-500'>*</span> </label>
                        <textarea  rows='6'  className={text_input_style} />                        
                        
                      </div>
                      <div className='col-span-4 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>Bureau au Maroc <span className='text-red-500'>*</span> </label>
                        <select type='text' className={select_input_style}>
                          <option value="">casablanca</option>
                          <option value="">rabat</option>
                        </select>
                      </div>
                      <div className='col-span-4 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>Bureau au Maroc <span className='text-red-500'>*</span> </label>
                        <select type='text' className={select_input_style}>
                          <option value="">casablanca</option>
                          <option value="">rabat</option>
                        </select>
                      </div>
                      <div className='col-span-4 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>Bureau au Maroc <span className='text-red-500'>*</span> </label>
                        <select type='text' className={select_input_style}>
                          <option value="">casablanca</option>
                          <option value="">rabat</option>
                        </select>
                      </div>
                      <div className='col-span-4 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>Bureau au Maroc <span className='text-red-500'>*</span> </label>
                        <select type='text' className={select_input_style}>
                          <option value="">casablanca</option>
                          <option value="">rabat</option>
                        </select>
                      </div>
                   </div>
                    <div className='flex justify-end w-full gap-x-3 absolute bottom-0 !px-5 !py-4 right-0 h-auto bg-slate-200'>
                         <button type='reset'  className='text-black text-sm bg-white flex justify-center items-center capitalize !py-3 !px-4 rounded-lg  transition-all duration-100  hover:bg-gray-100 ' onClick={()=>ClosePopUp()}>annuler</button>
                         <button type='submit' className='text-sm bg-blue-500 flex justify-center items-center capitalize !py-3 !px-4 rounded-lg text-white hover:bg-blue-400 transition-all duration-100'>enregistrer</button>
                    </div>
               </form>
             </div>
         </div>
         )}

    </div>
  )
}
