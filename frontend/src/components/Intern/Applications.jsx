import React from 'react'
import { IdentificationIcon,PaperAirplaneIcon ,DocumentDuplicateIcon} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import Spinner from '../../Spinner';
import axios from 'axios';
import DataLoadingSpinner from '../DataLoadingSpinner';
export default function Applications() {
  const [DataLoading,setDataLoading]=useState(true);
  const [application,setApplications]=useState([]);
  const token = sessionStorage.getItem('token');
   useEffect(()=>{
       
        axios.get('http://127.0.0.1:8000/api/internship_application/get_intern_applications',{ headers:{ Authorization:`bearer ${token}`}}).then(res=>{
          console.log(res.data)
          setApplications(res.data.applications)
          setDataLoading(false)
          
         }).
         catch(err=>{
          console.log('error caught',err)
          setDataLoading(false)
   })
      },[])
  return (
      <div className='flex flex-col h-[600px] gap-y-3  border-blue rounded-lg'>
       
             <div className='bg-gray-200 rounded-lg w-full h-[10%]  flex justify-center items-center !px-5 gap-x-1'>
                 <div className='text-2xl font-bold uppercase w-full bg-blue h-[100%] flex justify-start items-center gap-x-3'>
                  <span className=' text-slate-500'>{application.length}</span>
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
             {
             application.length > 0 ?
             
             // application 
             <div className='bg-gray-200 h-auto w-full flex flex-col gap-y-3 !p-5 rounded-lg border-1 border-gray-300 min-h-[200px]'>
                    {
                      application.map(e=>{
                        return(

                            <div className='bg-white h-[200px] w-full !p-4 flex gap-5 shadow-lg rounded-lg '>
                                    <img src={`http://127.0.0.1:8000/storage/${e.enterprise_photo}`} alt="" className='w-15 h-15 rounded-md' />
                                    <div className='w-full flex flex-col '>
                                        <div className='w-full flex justify-between !mb-1'>
                                          <div className={`${e.status==='accepted' ? 'bg-green-200 text-green-800 ':e.status==='declined'?'bg-red-200 text-red-800 ':'bg-blue-200 text-blue-800 '}  text-[12px] capitalize font-bold w-fit flex !py-1 !px-1.5 justify-center items-center rounded-md border-none`}>candidature {e.status==='accepted' ? 'accepté':e.status==='declined'?'refusée':'en cours'} </div>
                                          <Link to={`details/`} className='first-letter:capitalize font-bold text-md hover:underline'>afficher le details</Link>
                                        </div>
                                        <Link  to={`/stage/${e.internship_title}/${e.internship_id}`} className='text-lg font-bold capitalize hover:underline'>{e.internship_title}</Link>
                                        <div className='text-md font-light capitalize'>{e.enterprise_name}</div>
                                        <div className='text-md font-light capitalize'>{e.internship_city}</div>
                                        <div className='capitalize text-md font-light'>postulé le {e.intern_applied_at}</div>
                                    </div>

                            </div>
                        )
                      })
                    }
                    
                  
             </div>
             :
            //   no applications 
              <div className='bg-gray-200 h-auto w-full flex justify-center items-center !p-5 rounded-lg border-1 border-gray-300 min-h-[200px]'>
                    <div className='bg-red w-[50%] h-[200px] flex flex-col items-center gap-y-2'>
                        <div className='bg-blue-200 h-[70px] w-[70px] rounded-full flex justify-center items-center'><PaperAirplaneIcon className='w-6 h-6 rotate-270 text-blue-600'/> </div>
                        <div className='text-lg capitalize font-bold'>Aucune candidature trouvée</div>
                        <p className='text-sm text-center text-slate-700 first-letter:capitalize'>Essayez d'obtenir un entretien de Stage en envoyant des candidatures à des offres de Stage</p>
                        <Link className=' w-[45%] h-[25%] !py-1 !px-2 flex gap-x-3 justify-center items-center bg-blue-600 text-white rounded-lg'>
                           <DocumentDuplicateIcon className='w-7 h-7 '/> <div className='font-bold text-md capitalize'>touver mon stage</div>
                        </Link>
                    </div>                 
             
              </div> 
             }
     
         </div>
  )
}
