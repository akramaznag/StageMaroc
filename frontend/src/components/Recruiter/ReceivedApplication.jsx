import React from 'react'
import { IdentificationIcon,PaperAirplaneIcon ,ArrowUpTrayIcon,BookOpenIcon,AcademicCapIcon,InboxIcon} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ArrowPathIcon, CalendarIcon, CheckIcon, ClockIcon, DocumentIcon, EyeIcon, MapPinIcon, PhoneIcon, UserIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function ReceivedApplication() {
  return (
      <div className='flex flex-col h-[600px] gap-y-3  border-blue rounded-lg'>
       
             <div className='bg-gray-200 rounded-lg w-full h-[10%]  flex justify-center items-center !px-5 gap-x-1'>
                 <div className='text-2xl font-bold uppercase w-full bg-blue h-[100%] flex justify-start items-center gap-x-3'>
                  <span className=' text-slate-500'>0</span> <span className='text-blue-500'>candidatures</span>
                </div>
                <div>
                    <select name="" id="" className='border-gray-400  border-1 !px-2 !py-1 rounded-lg focus:border-2 focus:border-blue-500 ' >
                        <option value="">filtrer</option>
                        <option value="">les 7 derniers jours </option>
                        <option value="">les 14 derniers jours</option>
                        <option value="">les 21 derniers jours</option>
                    </select>
                </div>
               
                
             </div>
             {/* application */}
             <div className='bg-gray-200 h-auto w-full flex flex-col gap-y-3 !p-5 rounded-lg border-1 border-gray-300 min-h-[200px]'>
             {/* //applications */}
                    <div className='bg-white min-h-[200px] h-auto w-full !p-4 flex gap-5 shadow-lg rounded-lg '>
                         <div className='bg-red w-[40%] h-auto flex flex-col gap-y-3'>
                          <h3 className='text-lg font-bold first-letter:capitalize'>informations de candidature</h3>
                           <div className='flex items-center gap-x-2'>     
                                 <span className='text-sm text-slate-500 first-letter:capitalize'>le nom complet</span>
                                 <span className='text-sm font-bold capitalize'>akram aznag</span>
                           </div>
                         
                           <div className='flex items-center gap-x-2'>     
                            <div className='flex items-center gap-x-1'>
                              <AcademicCapIcon className='w-5 h-5 text-slate-500 '/>
                              <span className='text-sm text-slate-500 first-letter:capitalize'>niveau:</span>
                            </div>
                             <span className='text-sm font-bold capitalize'>bac+5</span>
                           </div>
                            <div className='flex items-center gap-x-2'>     
                               <div className='flex items-center gap-x-1'>
                                 <BookOpenIcon className='w-5 h-5 text-slate-500 '/>
                                 <span className='text-sm text-slate-500 first-letter:capitalize'>spécialité:</span>
                               </div>
                             <span className='text-sm font-bold capitalize'>informatique</span>
                           </div>
                           <div className='flex items-center gap-x-2'>     
                               <div className='flex items-center gap-x-1'>
                                 <PaperAirplaneIcon className='w-5 h-5 text-slate-500 rotate-270'/>
                                 <span className='text-sm text-slate-500 first-letter:capitalize'>postulé le:</span>
                               </div>
                             <span className='text-sm font-bold capitalize'>2025/06/06</span>
                           </div>
                             <div className='flex items-center gap-x-2'>     
                                <div className='flex items-center gap-x-1'>
                                  <InboxIcon className='w-5 h-5 text-slate-500 '/>
                                  <span className='text-sm text-slate-500 first-letter:capitalize'>email:</span>
                                 </div>
                                 <span className='text-sm font-bold'>akram@gmail.com</span>
                           </div>
                            <div className='flex items-center gap-x-2'>     
                                <div className='flex items-center gap-x-1'>
                                  <MapPinIcon className='w-5 h-5 text-slate-500 '/>
                                  <span className='text-sm text-slate-500 first-letter:capitalize'>ville:</span>
                                 </div>
                                 <span className='text-sm font-bold first-letter:capitalize'>casablanca</span>
                           </div>
                             <div className='flex items-center gap-x-2'>     
                                <div className='flex items-center gap-x-1'>
                                  <PhoneIcon className='w-5 h-5 text-slate-500 '/>
                                  <span className='text-sm text-slate-500 first-letter:capitalize'>téléphone:</span>
                                 </div>
                                 <span className='text-sm font-bold first-letter:capitalize'>0654872356</span>
                           </div>
                            <div className='flex  items-center gap-x-2'>     
                             <span className='text-sm text-slate-500 uppercase'>cv:</span>
                              <a href='' className='bg-blue-500 w-[70%] !py-2.5 text-white !px-5 rounded-md flex justify-start items-center gap-x-2 border-gray-200 border-1 cursor-pointer'>
                              <DocumentIcon className='w-5 h-5'/> 
                             <p className='text-sm font-semibold uppercase'>cv</p>
                            </a>
                           </div>
                         </div>
                          <div className='bg-red w-[40%] h-auto flex flex-col gap-y-3'>
                          <h3 className='text-lg font-bold first-letter:capitalize'>Offre de Stage</h3>
                           <div className='flex items-center gap-x-2'>     
                                 <span className='text-sm text-slate-500 first-letter:capitalize'>titre:</span>
                                 <span className='text-sm font-bold capitalize'>developpeur web</span>
                           </div>
                         
                           <div className='flex items-center gap-x-2'>     
                            <div className='flex items-center gap-x-1'>
                              <ArrowPathIcon className='w-5 h-5 text-slate-500 '/>
                              <span className='text-sm text-slate-500 first-letter:capitalize'>status:</span>
                            </div>
                             <span className='text-sm font-bold capitalize'>publiee</span>
                           </div>
                            <div className='flex items-center gap-x-2'>     
                               <div className='flex items-center gap-x-1'>
                                 <CalendarIcon className='w-5 h-5 text-slate-500 '/>
                                 <span className='text-sm text-slate-500 first-letter:capitalize'>date de démarrage:</span>
                               </div>
                             <span className='text-sm font-bold capitalize'>2025/06/06</span>
                           </div>
                           <div className='flex items-center gap-x-2'>     
                               <div className='flex items-center gap-x-1'>
                                 <ClockIcon className='w-5 h-5 text-slate-500 rotate-270'/>
                                 <span className='text-sm text-slate-500 first-letter:capitalize'>durée</span>
                               </div>
                             <span className='text-sm font-bold capitalize'>1-3 mois</span>
                           </div>
                             <div className='flex items-center gap-x-2'>     
                                <div className='flex items-center gap-x-1'>
                                  <MapPinIcon className='w-5 h-5 text-slate-500 '/>
                                  <span className='text-sm text-slate-500 first-letter:capitalize'>ville:</span>
                                 </div>
                                 <span className='text-sm font-bold capitalize'>agadir</span>
                           </div>
                            <div className='flex items-center gap-x-2'>     
                                <div className='flex items-center gap-x-1'>
                                  <UserIcon className='w-5 h-5 text-slate-500 '/>
                                  <span className='text-sm text-slate-500 first-letter:capitalize'>profils:</span>
                                 </div>
                                 <span className='text-sm font-bold first-letter:capitalize'>1</span>
                           </div>
                             <div className='flex items-center gap-x-2'>     
                                <div className='flex items-center gap-x-1'>
                                  <MapPinIcon className='w-5 h-5 text-slate-500 '/>
                                  <span className='text-sm text-slate-500 first-letter:capitalize'>présence:</span>
                                 </div>
                                 <span className='text-sm font-bold first-letter:capitalize'>hybride</span>
                              </div>
                               <div className='flex items-center gap-x-2'>     
                                <div className='flex items-center gap-x-1'>
                                  <CalendarIcon className='w-5 h-5 text-slate-500 '/>
                                  <span className='text-sm text-slate-500 first-letter:capitalize'>creer le:</span>
                                 </div>
                                 <span className='text-sm font-bold first-letter:capitalize'>2025/06/06</span>
                              </div>
                           
                         </div>
                         <div className='bg-red w-[30%] h-auto flex flex-col gap-y-3'>
                             <h3 className='text-lg font-bold first-letter:capitalize'>Décision</h3>
                             <div className='flex gap-x-2 w-full'>
                                <div className='bg-emerald-500 hover:bg-emerald-600 rounded-lg w-1/2  flex !p-3 cursor-pointer'> 
                                  <CheckIcon className='w-5 h-5 text-white'/>
                                  <span className='uppercase text-white text-sm font-bold'>accepter</span>
                                </div>
                                <div className='bg-red-500 w-1/2 flex !p-3 rounded-lg transition-all duration-100 hover:bg-red-800 cursor-pointer'>
                                  <XMarkIcon className='w-5 h-5 text-white'/>
                                  <span className='uppercase text-white text-sm font-bold'>refuser</span>
                                 </div>
                             </div>
                             

                         </div>
                    </div>
                    
                  
             </div>
             {/* no applications */}
               {/* <div className='bg-gray-200 h-auto w-full flex justify-center items-center !p-5 rounded-lg border-1 border-gray-300 min-h-[200px]'>
                    <div className='bg-red w-[50%] h-[200px] flex flex-col items-center gap-y-2'>
                        <div className='bg-blue-200 h-[70px] w-[70px] rounded-full flex justify-center items-center'><PaperAirplaneIcon className='w-6 h-6 rotate-270 text-blue-600'/> </div>
                        <div className='text-lg capitalize font-bold'>Aucune candidature trouvée</div>
                        <p className='text-sm text-center text-slate-700 first-letter:capitalize'>Essayez d'obtenir un entretien de Stage en envoyant des candidatures à des offres de Stage</p>
                        <Link className=' w-[45%] h-[25%] !py-1 !px-2 flex gap-x-3 justify-center items-center bg-blue-600 text-white rounded-lg'>
                           <DocumentDuplicateIcon className='w-7 h-7 '/> <div className='font-bold text-md capitalize'>touver mon stage</div>
                        </Link>
                    </div>                 
             
                </div>  */}
     
         </div>
  )
}
