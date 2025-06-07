import React from 'react'
import { IdentificationIcon,PaperAirplaneIcon ,DocumentDuplicateIcon,DocumentIcon} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function RecruiterApplicationDetails() {
  return (
      <div className='flex flex-col h-auto gap-y-3  border-blue rounded-lg'>
            
             <div className='bg-gray-200 rounded-lg w-full h-[60px]  flex justify-center items-center !px-5 gap-x-1'>
                 <div className='text-2xl font-bold uppercase w-full bg-blue h-[100%] flex justify-start items-center gap-x-3'>
                  <span className='text-blue-500'>Afficher et gérer les détails</span>
                </div>
             </div>
             {/* application container */}
             <div className='bg-gray-200 h-auto w-full flex flex-col gap-y-3 !p-5 rounded-lg border-1 border-gray-300'>
                   {/* //application */}
                    <div className='bg-white h-[200px] w-full !p-4 flex gap-5 shadow-lg rounded-lg '>
                            <div className='w-full flex flex-col '>
                                <div className='w-full flex justify-between !mb-1'>
                                  <div className='bg-blue-200 text-blue-800 text-[12px] capitalize font-bold w-[7%] flex justify-center items-center rounded-md border-none'>postulé</div>
                                </div>
                                <Link to={'/stage/titre-de-stage/'} className='text-lg font-bold capitalize hover:underline '> Financial Sales Representative</Link>
                                <div className='text-md font-light capitalize'>sanlam</div>
                                <div className='text-md font-light capitalize'>casablanca</div>
                                <div className='capitalize text-md font-light'>envoye le 11-11-2025</div>
                            </div>

                    </div>
                   {/* //application infos */}
                   <div className='bg-white h-auto w-full !p-4 flex flex-col gap-5 shadow-lg rounded-lg '>
                            <div className='w-full flex flex-col gap-y-1'>
                                <Link className='text-lg font-bold capitalize'>Détails de la candidature</Link>
                                <div className='text-sm font-bold capitalize text-slate-500'>Coordonnées</div>
                            </div>
                            <div className='flex flex-col items-start justify-start  h-auto w-full border-1 border-gray-200 rounded-lg'>
                                <div className='bg-red w-full !p-5 border-b-1 border-gray-200  flex flex-col gap-y-1 '>
                                    <div className='text-sm text-slate-500 capitalize'>le nom complet</div>
                                    <div className='text-md font-bold capitalize'>ilam amir</div>
                                </div>
                                <div className='bg-red w-full !p-5 border-b-1 border-gray-200  flex flex-col gap-y-1 '>
                                    <div className='text-sm text-slate-500 capitalize'>Email</div>
                                    <div className='text-md font-bold capitalize'>amir@gmail.com</div>
                                </div>
                                <div className='bg-red w-full !p-5 border-b-1 border-gray-200  flex flex-col gap-y-1 '>
                                    <div className='text-sm text-slate-500 capitalize'>Ville</div>
                                    <div className='text-md font-bold capitalize'>Casablanca</div>
                                </div>
                                  <div className='bg-red w-full !p-5 b   flex flex-col gap-y-1 '>
                                    <div className='text-sm text-slate-500 capitalize'>téléphone</div>
                                    <div className='text-md font-bold capitalize'>0654339871</div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className='uppercase text-md text-slate-500 font-bold !mb-2'>cv</div>
                                <div className='flex items-center gap-x-5'>
                                        <div className='w-[100%] !px-2 !py-3 rounded-lg border-1 border-gray-200 flex items-center gap-x-5 shadow-md '>
                                            <DocumentIcon className='w-6 h-6 text-blue-500' />
                                            <a href="/download.png" download="cv.png" className="text-blue-500">cv.pdf</a>
                                                                            
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
