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
  XMarkIcon,
  ArrowLeftIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
export default function CreateInternshipOffer() {
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
        
        <div className='bg-gray-200 rounded-lg w-full h-auto !py-2 flex justify-between items-center !px-5 gap-x-1'>
            <div className='flex justify-start items-center gap-x-3'>
                <Link to={'/recruteur/dashboard/offres-stage/'}>
              <div className='bg-white h-[40px] w-[55px] border-1 border-gray-300 rounded-lg flex justify-center items-center transition-all duration-100 hover:bg-gray-100'>
                 <ArrowLeftIcon className='w-5 h-5 text-slate-500'/>

              </div>
                </Link>
               <div className='text-2xl text-blue-500 font-semibold uppercase w-full bg-blue h-[100%] '>Nouvelle Offre de Stage</div>
            </div>
            
           
        </div>
        <div className='bg-white border-1 rounded-lg  border-gray-300 h-auto min-h-[80%] w-full flex flex-col shadow-md'>
            <form className=''>
                <div className='grid grid-cols-6 w-full h-auto gap-4 !p-5'>
                    <div className='col-span-3 flex gap-x-3'>
                        <label className='text-sm capitalize'>type <span className='text-red-500'>*</span> </label>
                        <div className='flex gap-x-3'>
                            <div className="flex items-center gap-x-2">
                                     <input   type="radio" name="type"  id="private"  className="peer hidden"  />
                                     <label  htmlFor="private"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >
                                     </label>
                                     <span className="text-sm font-medium">Sur Site (En société)</span>
                            </div>
                             <div className="flex items-center gap-x-2">
                                     <input   type="radio" name="type"  id="public"  className="peer hidden"  />
                                     <label  htmlFor="public"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >

                                     </label>
                                     <span className="text-sm font-medium">À distance</span>
                             </div> 
                             <div className="flex items-center gap-x-2">
                                     <input   type="radio" name="type"  id="halfpublic"  className="peer hidden"  />
                                     <label  htmlFor="halfpublic"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >

                                     </label>
                                     <span className="text-sm font-medium">Mixte</span>
                             </div>
                        </div>
                    </div>
                    <div className='col-span-4 flex flex-col gap-y-1  bg-purple '>
                        <label className='text-sm capitalize'>Titre <span className='text-red-500'>*</span> </label>
                        <input type='text' className={text_input_style}/>
                    </div>
                    <div className='col-span-2 flex  flex-col gap-y-1 bg-purple   '>
                        <label className='text-sm capitalize'>Profils <span className='text-red-500'>*</span> </label>
                        <div className='w-full flex items-center gap-x-3'>
                           <input type="number" className={text_input_style}/>
                           <UserIcon className='w-6 h-6 text-blue-500'/>
                        </div>
                    </div>
                    <div className='col-span-2 flex flex-col gap-y-1  bg-purple '>
                        <label className='text-sm capitalize'>Spécialit <span className='text-red-500'>*</span> </label>
                        <select  className={select_input_style}>
                          <option value="">sélectionnez une option</option>
                          <option value="">informatique</option>
                          <option value="">usa</option>
                          <option value="">maroc</option>
                        </select>
                    </div>
                    <div className='col-span-2 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>ville <span className='text-red-500'>*</span> </label>
                        <select type='text' className={select_input_style}>
                          <option value="">sélectionnez une option</option>
                          <option value="">casablanca</option>
                          <option value="">rabat</option>
                        </select>
                    </div>
                    <div className='col-span-2 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>contrat <span className='text-red-500'>*</span> </label>
                        <select type='text' className={select_input_style}>
                          <option value="">sélectionnez une option</option>
                          <option value="">stage pfe</option>
                          <option value="">rabat</option>
                        </select>
                    </div>
                    <div className='col-span-2 flex flex-col gap-y-1 bg-purple  '>
                      
                        <label className='text-sm capitalize'>Démarrage<span className='text-red-500'>*</span> </label>
                        <input type='date' className={text_input_style}/>
                         
                    </div>
                    <div className='col-span-2 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>Durée <span className='text-red-500'>*</span> </label>
                        <select type='text' className={select_input_style}>
                          <option value="">sélectionnez une option</option>
                          <option value="">1 mois</option>
                          <option value="">3 mois </option>
                        </select>
                    </div>
                    <div className='col-span-2 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>Rémunération <span className='text-red-500'>*</span> </label>
                        <select type='text' className={select_input_style}>
                          <option value="">sélectionnez une option</option>
                          <option value="">100dh</option>
                        </select>
                    </div>
                    <div className='col-span-6 flex flex-col gap-y-3'>
                        <label className='text-sm capitalize'>type <span className='text-red-500'>*</span> </label>
                        <div className='flex flex-col gap-y-3'>
                            <div className="flex items-center gap-x-2">
                                     <input   type="radio" name="availability"  id="fulltime"  className="peer hidden"  />
                                     <label  htmlFor="fulltime"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >
                                     </label>
                                     <span className="text-sm font-medium capitalize">Temps plein</span>
                            </div>
                             <div className="flex items-center gap-x-2">
                                     <input   type="radio" name="availability"  id="parttime"  className="peer hidden"  />
                                     <label  htmlFor="parttime"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >

                                     </label>
                                     <span className="text-sm font-medium">Temps partiel</span>
                             </div> 
                          
                        </div>
                    </div>
                    <div className='col-span-6 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>offre de stage <span className='text-red-500'>*</span> </label>
                        <textarea value={'Nous sommes à la recherche de ...'} rows='6'  className={text_input_style} />                        
                        
                    </div>
                </div>
                 <div className='col-span-6 flex justify-end w-full gap-x-3  bottom-0 !px-5 !py-4 right-0 h-auto bg-slate-200'>
                   <button type='reset'  className='text-black text-sm bg-white flex justify-center items-center capitalize !py-3 !px-4 rounded-lg  transition-all duration-100  hover:bg-gray-100 ' onClick={()=>ClosePopUp()}>annuler</button>
                   <button type='submit' className='text-sm bg-blue-500 flex justify-center items-center capitalize !py-3 !px-4 rounded-lg text-white hover:bg-blue-400 transition-all duration-100'>enregistrer</button>
                  </div>
                
            </form>

         

        </div>
       
    </div>
  )
}
