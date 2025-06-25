import React from 'react'
import { IdentificationIcon,PaperAirplaneIcon ,MagnifyingGlassIcon,PlusCircleIcon, MapPinIcon, FlagIcon, ClockIcon, CalendarIcon,UserIcon,NoSymbolIcon, PencilIcon,CheckCircleIcon} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

export default function RecruiterInternships() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = sessionStorage.getItem('token');
  const [internships,setInternships]=useState([]);
      useEffect(()=>{
       
        axios.get('http://127.0.0.1:8000/api/internship/list',{ headers:{ Authorization:`bearer ${token}`}}).then(res=>{
          console.log(res.data)
           setInternships(res.data.internships)
        }).catch(err=>console.log(err))
      },[])
  //get recruiter received application from interns
  
  

  return (
      <div className='flex flex-col min-h-[600px] h-auto gap-y-3  border-blue rounded-lg'>
       
             <div className='bg-gray-200 rounded-lg w-full !py-2 flex items-center !px-5 gap-x-1'>
                 <div className='text-2xl font-bold uppercase w-1/2 bg-blue h-[100%] flex justify-start items-center gap-x-3'>
                  <span className=' text-slate-500'>{internships.length}</span> <span className='text-blue-500'>Offres de Stage</span>
                </div>
                <div className='flex w-full justify-end gap-x-3'>
                    <div className='w-1/3 h-full flex items-center relative'>
                       <input   placeholder='Rechercher...'  className='bg-white rounded-lg text-sm !p-2 w-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none' />
                       <MagnifyingGlassIcon className='text-slate-400 w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2' />
                    </div>
                     <select name="" id="" className='!p-2 w-1/6 bg-white border-gray-300 outline-0  border-1 rounded-lg  focus:border-blue-500 capitalize' >
                        <option value="">tous</option>
                        <option value="">publié</option>
                        <option value="">no publié</option>
                        <option value="">expiré</option>
                    </select>  

                     <Link to={'/recruteur/dashboard/offre-stage/'} className='w-fit !p-2   flex justify-center items-center border-slate-400 border-1 outline-none  rounded-lg bg-blue-500 hover:bg-blue-600 cursor-pointer gap-x-1'>
                         <PlusCircleIcon className='w-6 h-6 text-white'/>
                        <div className='text-white text-sm capitalize w-full'>nouvelle stage</div>
                     </Link>      
                </div>
               
               
                
             </div>
             {/* application */}
             <div className={`bg-gray-200  w-full flex flex-col gap-y-5 !p-5 rounded-lg border-1 border-gray-300 h-[700px] ${ internships.length>=3 && 'overflow-y-scroll'} `}>
                 {/* //offers */}
                    {
                      internships.map(e=>{
                        return(

                        <div key={e.id} className='bg-white h-[200px] w-full flex flex-col  shadow-lg rounded-lg'>
                          <div className=' w-full h-auto flex !py-5 !px-3'>
                            <div  className='w-[62%] flex flex-col gap-y-2 '>
                              <Link class="text-lg font-bold capitalize hover:underline hover:text-blue-500" to={''}>{e.title}</Link>
                              <div className='flex flex-col gap-y-3'>
                                {/*  */}
                                <div className='flex gap-x-4'>
                                  <div className='flex gap-x-1'>
                                    <MapPinIcon className='w-4 h-4 '/>
                                    <div className='capitalize font-bold text-sm'>{e.city}</div>
                                  </div>
                                  <div className='flex gap-x-1'>
                                    <div className='flex items-center  gap-x-1'>
                                      <FlagIcon className='w-4 h-4 text-slate-500'/>
                                      <div className='capitalize  text-sm'>Présence:</div>
                                    </div>
                                    <div className='first-letter:capitalize text-sm'>{e.type==='onsite' ? 'sur site':e.type==='remote'? 'a distance' :'hybrid'}</div>
                                  </div>
                                  <div className='flex gap-x-1'>
                                    <div className='flex items-center  gap-x-1'>
                                      <UserIcon className='w-4 h-4 text-slate-500'/>
                                      <div className='capitalize  text-sm'>Profils:</div>
                                    </div>
                                    <div className='flex items-center gap-x-1'><span className='first-letter:capitalize text-sm'>{e.profile_count}</span> <span className='first-letter:capitalize text-sm'>stagaires</span></div>
                                  </div>
                                </div>
                                {/*  */}
                                <div className='flex gap-x-2'>
                                  <div className='flex gap-x-1'>
                                    <div className='flex items-center  gap-x-1'>
                                      <CalendarIcon className='w-4 h-4 text-slate-500'/>
                                      <div className='capitalize  text-sm'>démarrage:</div>
                                    </div>
                                    <div className='first-letter:capitalize text-sm'>{e.start_date}</div>
                                  </div>
                                  <div className='flex gap-x-1'>
                                    <div className='flex items-center  gap-x-1'>
                                      <ClockIcon className='w-4 h-4 text-slate-500'/>
                                      <div className='capitalize  text-sm'>durée:</div>
                                    </div>
                                    <div className='first-letter:capitalize text-sm'>{e.duration}</div>
                                  </div>
                                  <div className='flex gap-x-1'>
                                    <div className='flex items-center  gap-x-1'>
                                      <MapPinIcon className='w-4 h-4 text-slate-500'/>
                                      <div className='capitalize  text-sm'>disponibilité:</div>
                                    </div>
                                    <div className='text-sm first-letter:capitalize'>{e.availability==="fulltime"?'temps plein':'temps partiel'}</div>
                                  </div>
                                </div>
                              
                                  {/*  */}
                                <div className='flex gap-x-4'>
                                
                                  <div className='flex !py-1 !px-2 rounded-md bg-indigo-200 text-sm capitalize text-indigo-500 justify-center items-center gap-x-1'>
                                    {e.specialty}
                                  
                                  </div>
                                  <div className='flex gap-x-1'>
                                    <div className='flex items-center gap-x-1'>
                                      <CalendarIcon className='w-4 h-4 text-slate-500'/>
                                      <div className='capitalize  text-sm'>Créée le:</div>
                                    </div>
                                    <div className='flex items-center gap-x-1'><span className='first-letter:capitalize text-sm'>{new Date(e.created_at).toLocaleDateString()}</span></div>
                                  </div>
                                  <div className='flex items-center gap-x-1'>
                                    <div className='flex items-center  gap-x-1'>
                                      <CalendarIcon className='w-4 h-4 text-slate-500'/>
                                      <div className='capitalize  text-sm'>Publiée:</div>
                                    </div>
                                    <div className='first-letter:capitalize text-sm'>--</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div  className='bg-red w-[8%] flex flex-col gap-y-2 justify-center items-center'>
                              <div className={`w-[30px] h-[30px] flex items-center justify-center rounded-full ${e.status==='published'?'bg-green-500':e.status==='expired'?'bg-red-500':'bg-blue-500'} `}>
                                {
                                 e.status==='published'?
                                    <CheckCircleIcon className='w-7 h-7 text-white font-bold'/>
                                   :
                                   e.status==='expired'?
                                   <NoSymbolIcon className='w-7 h-7 text-white font-bold'/>

                                  :
                                   <NoSymbolIcon className='w-7 h-7 text-white font-bold'/>
                                   } 
                              </div>
                              <div className={`first-letter:capitalize  text-sm ${e.status==='published'?'text-green-500':e.status==='expired'?'text-red-500':'text-blue-500'}`}> {e.status==='published'?'publié':e.status==='expired'?'expiré':'no publié'} </div>
                            </div>
                            <div  className='w-[30%]  flex flex-col items-center '>
                              <div className='w-[90%] '>
                                <div className='w-full grid grid-cols-4 gap-2 '>
                                  <Link to={`/recruteur/dashboard/offre-stage/update/${e.id}`} className='col-span-4 bg-white border-2 border-gray-200 flex justify-center items-center gap-x-1 !p-3 rounded-lg  cursor-pointer w-full transition-all duration-100 hover:bg-gray-200'>
                                    <PencilIcon className='w-4 h-4 text-black'/>
                                    <div className='capitalize text-sm text-black'>modefier</div>
                                  </Link>
                                  {/* <div className={`col-span-2 bg-green-500  ${e.status!=='published'? ' opacity-50 ':''} flex justify-center items-center gap-x-1 !p-3 rounded-lg  cursor-not-allowed w-full`}>
                                      {e.status==='published'&& <CheckCircleIcon className='w-5 h-5 text-white'/>}
                                      <div className={`capitalize text-sm text-white`}>{e.status!=='published'? 'publier':'publié'}</div>
                                  </div> */}
                                    <div className={`col-span-4  ${ e.status!== 'declined' ? 'bg-gray-500 cursor-pointer ': 'opacity-50 bg-gray-300 cursor-not-allowed'}  flex justify-center items-center gap-x-2 !p-3 rounded-lg  w-full`}>
                                    <div className='flex justify-center items-center !px-1 !py-0.5 bg-white rounded-4xl text-slate-500 font-bold'>{e.internship_application_count || 0}</div>
                                    <div className='capitalize text-sm text-white'>candidature</div>
                                  </div>
                                </div>
                              
                              </div>
                            
                            </div>
                          </div>
                          <div className={`${e.status==='published'?'bg-green-100':e.status==='expired'?'bg-red-100':'bg-blue-100'}   w-full min-h-[21%] h-auto flex items-center !px-5 !py-2`}>
                            <div className={`w-fit first-letter:capitalize text-sm ${e.status==='published'?'text-green-300':e.status==='expired'?'text-red-300':'text-blue-300'}  text-blue-300  bg-gray-100 rounded-lg flex gap-x-2 items-center !px-2 !py-1 `}>
                               {e.status==='published'?  <CheckCircleIcon className='w-4 h-4'/>:

                               e.status==='expired'?   <NoSymbolIcon className='w-4 h-4'/>:

                                <ClockIcon className='w-4 h-4'/>

                                } 
                                
                                {e.status==='published'?<p className='first-letter:capitalize'>l'offre de stage est acceptée par l'administrateur et publiée</p>
                                :
                                e.status==='expired'?<p>L'offre de stage est expirée et n'est plus disponible</p>:

                                <p>Offre de Stage en attente de validation par l'administrateur</p>
                                } 
                              </div>
                            
                          </div>
                            

                        </div>
                        )
                      })
                    }
           
                    
                  
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
