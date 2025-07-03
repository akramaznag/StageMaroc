import React from 'react'
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
  PlusIcon,
  PlusCircleIcon,
  PaperClipIcon,
  XMarkIcon,
  CheckIcon,
  CheckCircleIcon,
  NoSymbolIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { MegaphoneIcon } from '@heroicons/react/24/solid';
import { useState,useEffect } from 'react';
import axios from 'axios';



export default function RecruiterDefaultDashboardPage() {
  const [applicationDetails,setApplicationDetails]=useState([])
  const [internships,setInternships]=useState([]);
  const [three_internships,setThree_internships]=useState([]);
  const [monthInternship,setMonthInternship]=useState(0);

  const token=sessionStorage.getItem("token");
  
  useEffect(() => {
  
        axios.get('http://127.0.0.1:8000/api/internship/list', {
          headers: { Authorization: `bearer ${token}` }
        }).then(res => {
          setInternships(res.data.internships);
        }).catch(err => console.log(err));
    }, []);

  useEffect(() => {
    
      axios.get('http://127.0.0.1:8000/api/internship_application/get_recruiter_applications', {
        headers: { Authorization: `bearer ${token}` }
      }).then(res => {
        setApplicationDetails(res.data.applications);
      }).catch(err => console.log('error caught', err));

  }, []);

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/internship/fetch_three',{ headers:{ Authorization:`bearer ${token}`}}).then(res=>{
          console.log(res.data)
           setThree_internships(res.data.internships);
           setMonthInternship(res.data.month_internship_count)
           setDataLoading(false)
        }).catch(err=>console.log(err))
      },[])

  return (
   <>
     {/* Main Dashboard Cards */}
       {/* Main Dashboard Cards */}
          <div className='flex w-full gap-x-3.5 '>
            {/* Internship Count Card */}
            <div className='bg-white h-[200px] border-b-4 border-blue-500 shadow-blue-300 shadow-[0px_45px_45px_-50px] w-1/3 flex flex-col !pt-8 justify-between  items-center gap-y-1 rounded-lg'>
              <div className='flex flex-col items-center justify-center gap-y-0.5'> 
                <span className='text-5xl'>{internships.length}</span>
                <div className='capitalize '>Offres de Stage</div>
                <p className='text-[12px] text-slate-400 w-[70%] text-center'>Publiez des offres de Stage pour recruter des stagiaires intéressés</p>

              </div>
              <div className='bg-blue-500   !p-1.5 rounded-4xl flex items-center justify-center gap-x-1.5'>
                <PlusIcon className='h-5 w-5 text-white' />
                <Link className='text-white text-sm font-semibold first-letter:capitalize w-[70%]'>nouvelle offre de stage</Link>
              </div>
            </div>

            {/* Applications Count Card */}
            <div className='bg-white h-[200px] border-b-4 border-orange-500 shadow-orange-300 shadow-[0px_45px_45px_-50px] w-1/3 flex flex-col !pt-8 !pb-1 justify-between  items-center gap-y-1 rounded-lg'>
              <div className='flex flex-col items-center justify-center gap-y-0.5'> 
                <span className='text-5xl'>{applicationDetails.length}</span>
                <div className='capitalize '>Candidatures Reçues</div>
                <p className='text-[12px] text-slate-400 w-[70%] text-center'>Toutes vos candidatures sont classées par Offre de Stage publiée</p>

              </div>
              <div className='bg-orange-500   !p-1.5 rounded-4xl flex items-center justify-center gap-x-1.5'>
                <IdentificationIcon className='h-5 w-5 text-white' />
                <Link className='text-white text-sm font-semibold first-letter:capitalize '>Voir les Candidats</Link>
              </div>
            </div>

            {/* Interviews Count  Card */}
              <div className='bg-white h-[200px] border-b-4 border-green-500 shadow-green-300 shadow-[0px_45px_45px_-50px] w-1/3 flex flex-col !pt-8 !pb-1 justify-between  items-center gap-y-1 rounded-lg'>
              <div className='flex flex-col items-center justify-center gap-y-0.5'> 
                <span className='text-5xl'>0</span>
                <div className='capitalize '>Entretien(s) à Venir</div>
                <p className='text-[12px] text-slate-400 w-[70%] text-center'>Planifiez des entretiens de Stage avec vos candidats en toute liberté</p>

              </div>
              <div className='bg-green-500   !p-1.5 rounded-4xl flex items-center justify-center gap-x-1.5'>
                <IdentificationIcon className='h-5 w-5 text-white' />
                <Link className='text-white text-sm font-semibold first-letter:capitalize '>Voir les entretiens</Link>
              </div>
            </div>
          </div>
          
           {/* dashboard overview */}
          <div className='bg-white h-[300px] flex justify-center items-center  w-full border-1 border-white rounded-lg '>
            {/* container */}
           <div className='w-[90%]  h-[250px] bg-red- flex gap-x-3'>           
             {/* who seen ur profile section */}
              <div className='flex flex-col w-[70%]  h-[250px] bg-blue'> 
                <div className='bg-yellow h-[30px] flex justify-between'>
                  <p className='text-sm text-slate-500 uppercase'>3 Dernières Offres de Stage  </p>
                  <Link to="/recruteur/dashboard/offres-stage/" className='text-sm capitalize text-blue-500 flex gap-x-1 underline'>
                   <EyeIcon className='w-5 h-5 text-blue-500'/>
                    <span>affier tout</span>
                  </Link>
                  </div>      
                  <div className='bg-yellow !py-2 w-full h-[270px]'>

                    {
                      three_internships.length>0 ?(
                        <>

                        <div className='flex flex-col gap-y-5 w-full'>
                          {
                            three_internships.map(e=>{
                              
                              return(

                                <div className={`flex bg-gray-50  rounded-lg !p-2 gap-x-3 w-full justify-center`}>
                                      <div className=' w-[11%] flex flex-col justify-between items-center'>
                                         <div >

                                            {
                                          e.status==='published'?  
                                            <CheckCircleIcon className='w-8 h-8 text-green-400 font-bold'/>
                                          :
                                          e.status==='expired'?
                                          <NoSymbolIcon className='w-8 h-8 text-red-400 font-bold'/>
                                          
                                          :
                                          <NoSymbolIcon className='w-8 h-8 text-blue-400 font-bold'/>
                                          }
                                          </div>
                                        <div className={`text-sm first-letter:capitalize font-bold  ${e.status==='published'?'text-green-500':e.status==='expired'?'text-red-500':'text-blue-500'}`}>
                                         
                                            {
                                            
                                          e.status==='published'?  
                                          <span>publié</span>
                                           :
                                          e.status==='expired'?
                                          <span>expirée</span>                                          
                                          :
                                          'no publié'

                                          }
                                          
                                        </div>
                                    </div>
                                    <div className='text-md capitalize bg-green font-bold text-center w-[59%]'>{e.title}</div>
                                    <div className='bg-green text-sm w-[30%] flex flex-col justify-between'>
                                      <div>
                                        <span className='font-bold capitalize'>Démarrage:</span> <span className='text-sm'>{e.start_date}</span>

                                      </div>
                                      <div>

                                        <span className='font-bold capitalize'>Durée:</span> <span>{e.duration}</span>
                                      </div>
                                      
                                    </div>
                                </div>
                              )
                            })
                          }
                    </div>
                        </>
                      )
                      :
                      <>
                     <div className='w-full flex flex-col items-center justify-center gap-y-3'>
                      <div className=' bg-blue-200 h-[80px] w-[80px] flex justify-center items-center rounded-full'>
                        <DocumentIcon className='w-8 h-8 font-bold text-blue-500'/> 
                      </div>   
                      <div className='flex flex-col justify-center items-center gap-y-1'>
                        <div className='text-sm text-slate-700 capitalize font-bold'>Aucune Offre de Stage publiée</div>
                        <div className='text-[13px] first-letter:capitalize'>Il n'y a pas encore d'Offre de Stage publiée</div>
                        <Link className='font-bold text-blue-500 border-1 border-blue-300 !py-1 !px-2  text-sm capitalize rounded-lg flex gap-x-1'>
                          <PlusCircleIcon className='w-6 h-6 text-blue-500'/>
                          <span>nouvelle offre de stage</span>
                           </Link>
                      </div>
                    </div> 
                      </>
                    }
                   
                </div>      
          
              </div>  
             {/* rapide statistics section */}
            
              <div className='w-[30%]  h-[250px] bg-red !pl-5 border-l-1 border-gray-200'>
                <div className='bg-purple h-[30px] flex justify-start'>
                  <p className='text-sm text-slate-500 uppercase'>Statistiques Rapide</p>
                </div>
                <div className='bg-yellow  h-[220px] w-full flex flex-col gap-y-4'>
                   <div className='flex bg-green gap-x-3 items-start'>
                    <EyeIcon className='w-8 h-8 text-slate-500'/>
                    <div className='flex flex-col '>
                       <div className='text-sm text-slate-500 first-letter:capitalize'>total de visites </div>
                       <div className='text-sm font-black'>0 </div>
                    </div>
                   </div>
                    <div className='flex bg-green gap-x-3 items-start'>
                      <MegaphoneIcon className='w-8 h-8 text-slate-500'/>
                      <div className='flex flex-col '>
                       <div className='text-sm text-slate-500 first-letter:capitalize'> offres publiées ce mois </div>
                       <div className='text-sm font-black'>{monthInternship} </div>
                      </div>
                    </div>
                     <div className='flex bg-green gap-x-3 items-start'>
                      <PaperAirplaneIcon className='w-8 h-8 font-light text-slate-500 rotate-270'/>
                      <div className='flex flex-col '>
                       <div className='text-sm text-slate-500 first-letter:capitalize'>Candidatures Reçues</div>
                       <div className='text-sm font-black'>{applicationDetails.length}</div>
                      </div>
                    </div>
              
                  </div>
            
        
               
                         

              
              </div>              
            </div>  
          
          </div>
    </>
  )
}
