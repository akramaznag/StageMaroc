import React, { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom';
import {
  DocumentDuplicateIcon,
  ArrowPathIcon,
  PaperAirplaneIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  DocumentIcon,
  EyeIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  XCircleIcon,
  XMarkIcon,
  IdentificationIcon,
  ArrowUpTrayIcon,
  BookOpenIcon,
  AcademicCapIcon,
  InboxIcon
} from '@heroicons/react/24/solid';
import axios from 'axios';
import DataLoadingSpinner from '../DataLoadingSpinner'
import Spinner from '../../Spinner';
export default function ReceivedApplication() {
  const token=sessionStorage.getItem('token');
  const [applicationDetails,setApplicationDetails]=useState([]);
  const [Loading,setLoading]=useState(true);
  const [DataLoading,setDataLoading]=useState(true);
 
  useEffect(()=>{
       
        axios.get('http://127.0.0.1:8000/api/internship_application/get_recruiter_applications',{ headers:{ Authorization:`bearer ${token}`}}).then(res=>{
          console.log(res.data)
          setApplicationDetails(res.data.applications)
          setDataLoading(false)
          
         }).
         catch(err=>console.log('error caught',err))
      },[])
  const update_status = (status, id) => {
      // Optimistically mark it as clicked
      setApplicationDetails(prev =>
        prev.map(app =>
          app.id === id
            ? { ...app, clicked: true, status }
            : app
        )
      );

      // Make the request
      axios.get(`http://127.0.0.1:8000/api/internship_application/update/${id}/${status}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        const updatedStatus = res.data.application.status;

        setApplicationDetails(prev =>
          prev.map(app =>
            app.id === id
              ? { ...app, status: updatedStatus }
              : app
          )
        );
      }).catch(err => console.log(err.response.data));
    };


  return (
      <div className='flex flex-col min-h-[600px] h-auto gap-y-3  border-blue rounded-lg'>
       
             <div className='bg-gray-200 rounded-lg w-full  !py-3 !px-5  flex justify-center items-center  gap-x-1'>
                 <div className='text-2xl font-bold uppercase w-full bg-blue h-[100%] flex justify-start items-center gap-x-3'>
                  <span className=' text-slate-500'>{applicationDetails.length}</span>
                   <span className='text-blue-500'>candidatures</span>
                   {DataLoading && <DataLoadingSpinner/>}
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
             <div className={`bg-gray-200  w-full flex flex-col gap-y-3 !p-5 rounded-lg border-1 border-gray-300  h-[800px] ${ applicationDetails.length===3 && 'overflow-y-scroll'}`}>
             {/* //applications */}
             {
              applicationDetails.map(e=>{
                return(

                    <div className={`bg-white  h-auto w-full !p-4 flex gap-5 shadow-lg rounded-lg `}>
                         <div className='bg-red w-[40%] h-auto flex flex-col gap-y-3'>
                          <h3 className='text-lg font-bold first-letter:capitalize'>informations de candidature</h3>
                           <div className='flex items-center gap-x-2'>     
                                 <span className='text-sm text-slate-500 first-letter:capitalize'>le nom complet</span>
                                 <span className='text-sm font-bold capitalize'>{e.intern_full_name}</span>
                           </div>
                         
                           <div className='flex items-center gap-x-2'>     
                            <div className='flex items-center gap-x-1'>
                              <AcademicCapIcon className='w-5 h-5 text-slate-500 '/>
                              <span className='text-sm text-slate-500 first-letter:capitalize'>niveau:</span>
                            </div>
                             <span className='text-sm font-bold capitalize'>{e.intern_education_level}</span>
                           </div>
                            <div className='flex items-center gap-x-2'>     
                               <div className='flex items-center gap-x-1'>
                                 <BookOpenIcon className='w-5 h-5 text-slate-500 '/>
                                 <span className='text-sm text-slate-500 first-letter:capitalize'>spécialité:</span>
                               </div>
                             <span className='text-sm font-bold capitalize'>{e.intern_specialty}</span>
                           </div>
                           <div className='flex items-center gap-x-2'>     
                               <div className='flex items-center gap-x-1'>
                                 <PaperAirplaneIcon className='w-5 h-5 text-slate-500 rotate-270'/>
                                 <span className='text-sm text-slate-500 first-letter:capitalize'>postulé le:</span>
                               </div>
                             <span className='text-sm font-bold capitalize'>{e.intern_applied_at}</span>
                           </div>
                             <div className='flex items-center gap-x-2'>     
                                <div className='flex items-center gap-x-1'>
                                  <InboxIcon className='w-5 h-5 text-slate-500 '/>
                                  <span className='text-sm text-slate-500 first-letter:capitalize'>email:</span>
                                 </div>
                                 <span className='text-sm font-bold'>{e.intern_email}</span>
                           </div>
                            <div className='flex items-center gap-x-2'>     
                                <div className='flex items-center gap-x-1'>
                                  <MapPinIcon className='w-5 h-5 text-slate-500 '/>
                                  <span className='text-sm text-slate-500 first-letter:capitalize'>ville:</span>
                                 </div>
                                 <span className='text-sm font-bold first-letter:capitalize'>{e.intern_city}</span>
                           </div>
                             <div className='flex items-center gap-x-2'>     
                                <div className='flex items-center gap-x-1'>
                                  <PhoneIcon className='w-5 h-5 text-slate-500 '/>
                                  <span className='text-sm text-slate-500 first-letter:capitalize'>téléphone:</span>
                                 </div>
                                 <span className='text-sm font-bold first-letter:capitalize'>{e.intern_phone}</span>
                           </div>
                            <div className='flex  items-center gap-x-2'>     
                             <span className='text-sm text-slate-500 uppercase'>cv:</span>
                              <a  href={`http://127.0.0.1:8000/storage/${e.intern_cv_path}`} target='_blank' className='bg-blue-500 w-[70%] !py-2.5 text-white !px-5 rounded-md flex justify-start items-center gap-x-2 border-gray-200 border-1 cursor-pointer'>
                              <DocumentIcon className='w-5 h-5'/> 
                               <span className='text-sm font-semibold uppercase'>voir le cv</span>
                            </a>
                           </div>
                         </div>
                          <div className='bg-red w-[40%] h-auto flex flex-col gap-y-3'>
                          <h3 className='text-lg font-bold first-letter:capitalize'>Offre de Stage</h3>
                           <div className='flex items-center gap-x-2'>     
                                 <span className='text-sm text-slate-500 first-letter:capitalize'>titre:</span>
                                 <span className='text-sm font-bold capitalize'>{e.internship_title}</span>
                           </div>
                         
                           <div className='flex items-center gap-x-2'>     
                            <div className='flex items-center gap-x-1'>
                              <ArrowPathIcon className='w-5 h-5 text-slate-500 '/>
                              <span className='text-sm text-slate-500 first-letter:capitalize'>status:</span>
                            </div>
                             <span className={`text-sm font-bold capitalize ${e.internship_status==='published'?'text-green-500':e.internship_status==='expired'?'text-red-500':e.internship_status==='declined'&&'text-blue-500'}`}>{e.internship_status==='published'?'publiée':e.internship_status==='expired'?'expirée':e.internship_status==='declined'&&'non publié'}</span>
                           </div>
                            <div className='flex items-center gap-x-2'>     
                               <div className='flex items-center gap-x-1'>
                                 <CalendarIcon className='w-5 h-5 text-slate-500 '/>
                                 <span className='text-sm text-slate-500 first-letter:capitalize'>date de démarrage:</span>
                               </div>
                             <span className='text-sm font-bold capitalize'>{e.internship_start_date}</span>
                           </div>
                           <div className='flex items-center gap-x-2'>     
                               <div className='flex items-center gap-x-1'>
                                 <ClockIcon className='w-5 h-5 text-slate-500 rotate-270'/>
                                 <span className='text-sm text-slate-500 first-letter:capitalize'>durée</span>
                               </div>
                             <span className='text-sm font-bold capitalize'>{e.internship_duration}</span>
                           </div>
                             <div className='flex items-center gap-x-2'>     
                                <div className='flex items-center gap-x-1'>
                                  <MapPinIcon className='w-5 h-5 text-slate-500 '/>
                                  <span className='text-sm text-slate-500 first-letter:capitalize'>ville:</span>
                                 </div>
                                 <span className='text-sm font-bold capitalize'>{e.internship_city}</span>
                           </div>
                            <div className='flex items-center gap-x-2'>     
                                <div className='flex items-center gap-x-1'>
                                  <UserIcon className='w-5 h-5 text-slate-500 '/>
                                  <span className='text-sm text-slate-500 first-letter:capitalize'>profils:</span>
                                 </div>
                                 <span className='text-sm font-bold first-letter:capitalize'>{e.internship_profile_count}</span>
                           </div>
                             <div className='flex items-center gap-x-2'>     
                                <div className='flex items-center gap-x-1'>
                                  <MapPinIcon className='w-5 h-5 text-slate-500 '/>
                                  <span className='text-sm text-slate-500 first-letter:capitalize'>présence:</span>
                                 </div>
                                 <span className='text-sm font-bold first-letter:capitalize'>{e.internship_presence_mode}</span>
                              </div>
                               <div className='flex items-center gap-x-2'>     
                                <div className='flex items-center gap-x-1'>
                                  <CalendarIcon className='w-5 h-5 text-slate-500 '/>
                                  <span className='text-sm text-slate-500 first-letter:capitalize'>creer le:</span>
                                 </div>
                                 <span className='text-sm font-bold first-letter:capitalize'>{e.internship_created_at}</span>
                              </div>
                           
                         </div>
                         <div className='bg-red w-[30%] h-auto flex flex-col gap-y-3'>
                              {
                                (e.clicked || e.status!=="in_progress") ?(
                                  <>
                                  <h3 className='text-lg font-bold first-letter:capitalize'>status</h3>
                                  <div className='flex gap-x-2 w-full'>
                                    {
                                       e.status==='accepted'?

                                      <div  className='w-full flex gap-x-2'> 
                                          <CheckIcon className='w-5 h-5 text-green-500'/>
                                          <span className='uppercase text-green-500 text-sm font-bold'>candidature accepté</span>
                                      </div>
                                      :
                                       e.status==='declined' &&
                                      <div   className='w-full flex gap-x-2'>
                                          <XMarkIcon className='w-5 h-5 text-red-500'/>
                                          <span className='uppercase text-red-500 text-sm font-bold'>candidature refusé</span>
                                      </div>
                                    }
                                    </div>
                                  </>
                                )

                                :
                               ( e.status==="in_progress" || !e.clicked )&& 
                                (
                                <>
                                <h3 className='text-lg font-bold first-letter:capitalize'>Décision</h3>
                                <div className='flex gap-x-2 w-full'>
                                    <button onClick={()=>update_status('accepted',e.id)} className='bg-emerald-500 hover:bg-emerald-600 rounded-lg w-1/2  flex !p-3 cursor-pointer'> 
                                      <CheckIcon className='w-5 h-5 text-white'/>
                                      <span className='uppercase text-white text-sm font-bold'>accepter</span>
                                    </button>
                                    <button onClick={()=>update_status('declined',e.id)} className='bg-red-500 w-1/2 flex !p-3 rounded-lg transition-all duration-100 hover:bg-red-800 cursor-pointer'>
                                      <XMarkIcon className='w-5 h-5 text-white'/>
                                      <span className='uppercase text-white text-sm font-bold'>refuser</span>
                                    </button>
                                  </div>
                                </>
                                )

                              }
                             

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
