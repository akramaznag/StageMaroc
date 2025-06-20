import React from 'react'
import {
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowUpRightIcon,
  MapPinIcon,
  BuildingOfficeIcon

} from '@heroicons/react/24/outline';
import { Icon } from '@iconify/react';

import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import DataLoadingSpinner from "../../src/components/DataLoadingSpinner"
export default function Internships() {
    const [educationlevel,setEducationLevel]=useState([]);
    const [specialties,setSpecialties]=useState([]);
    const [schools,setSchools]=useState([]);
    const [cities,setCities]=useState([]);
    const [internships,setInternships]=useState([])
    const [DataLoading,setDataLoading]=useState(true);
    
    useEffect(()=>{
          axios.get('http://127.0.0.1:8000/api/public_internships').then(res=>{
            console.log(res.data)
            const data = res.data;
            setEducationLevel(data.education_levels);
            setSpecialties(data.specialties);
            setCities(data.cities);
            setInternships(data.internships);
            setDataLoading(false)

        }).catch(err=>console.log(err))
    },[])
    const [formData, setFormData] = useState({
        statut: 'etudiant', // corresponds to radio selection
        school_id: '',
        education_level_id: '',
        specialty_id: '',
        presentation: '',
        telephone: '', // not included in the list, but logically needed
        cv_path: null, // will hold the File object
        contract: '',
        city_id: '',
        start_date: new Date().toISOString().split("T")[0],
        duration: '',
        intern_profile_id: '' // you’ll set this once profile is fetched
    });
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
                            <div className={`bg-green uppercase text-2xl font-bold ${DataLoading && 'flex gap-x-3'}`}>
                                <span className='text-slate-400 !mr-3 '>{internships.length}</span>
                                <span className='text-blue-500'>offres de stage</span>
                                {DataLoading && <DataLoadingSpinner/>}
                            </div>
                            <div className='bg-green w-[25%] h-[100%] flex items-center justify-end'>
                                <input placeholder='Rechercher' className='bg-white rounded-lg text-sm !px-3 !py-4 h-[100%] w-[80%] border-2 border-gray-300 focus:border-blue-500 transition-all duration-50 focus:outline-none  focus:border-3'/>
                                 <MagnifyingGlassIcon className=' text-slate-400 w-5 h-5 absolute right-[10%]'/> 
                            </div>

                        </div>
                        {/* internships offers */}
                        {
                            internships.map(e=>{
                                return(
                                    <div key={e.id} className='bg-yellow w-full h-auto flex flex-col transition-all border-1 shadow-lg border-gray-200 rounded-lg  hover:border-blue-500 hover:outline-none'>
                                        <div className='h-[120px] border-1 border-gray-200 rounded-md w-full bg-white flex justify-between !px-3 items-center'>
                                            {/* enterprise infos */}
                                        <div className='bg-green w-[60%] h-[110px]  gap-x-3 !px-3 flex items-center'>
                                            {/* enterprise logo */}
                                            {
                                                e.enterprise_photo ?(
                                               <img src={`http://127.0.0.1:8000/storage/${e.enterprise_photo}`} className='h-[100px] w-[100px] rounded-md'/>

                                                ):
                                                <BuildingOfficeIcon className='h-[100px] w-[100px] rounded-md'/>
                                            }
                                            <div className='flex flex-col gap-y-2 h-[100px]  w-[370px]'>
                                                <div className=''>
                                                    <Link className='text-blue-500 capitalize underline font-bold text-lg ' to={`/stage/${e.title}/${e.id}`}>{e.title}</Link> 
                                                    </div>
                                                <div className='flex justify-between w-[90%] '>
                                                    <Link className='text-slate-600 uppercase text-sm flex gap-x-1 '> <ArrowUpRightIcon className='w-5 h-5 '/>  <span>{e.enterprise}</span>   </Link>
                                                    <div className='text-slate-600 capitalize flex text-sm gap-x-1 w-1/2'>
                                                        <Icon icon="twemoji:flag-morocco" width="24" />
                                                        <span className=''>{e.city}</span>
                                                    </div>
                                                </div>
                                                <div className='flex gap-x-2   w-[450px]'>
                                                    <div className='bg-emerald-100  !p-2  h-[30px] flex justify-center items-center  capitalize text-[12px] w-full rounded-lg'>{e.specialty}</div>
                                                    <div className='bg-indigo-100  !p-2 h-[30px] flex justify-center items-center capitalize text-[12px] w-full rounded-lg'>{e.contract}</div>
                                                    <div className='bg-amber-100  !p-2 h-[30px] flex justify-center items-center capitalize text-[12px] w-full rounded-lg'>{e.remuneration !=='0 dh' ? 'stage non rémunéré':'stage rémunéré'}</div>
                                                </div>
                                            </div>

                                        </div>    
                                        <div className='bg-green w-[40%] h-[110px] flex justify-center'>
                                            <div className='bg-red w-1/2 flex flex-col justify-center items-center'>
                                                <div>
                                                    <span className='font-bold'>{e.duration}</span>
                                                </div>
                                                <div className='first-letter:capitalize text-slate-400 text-sm'>
                                                    <span>a partir du </span>
                                                    <span>{e.start_date}</span>
                                                </div>
                                            </div>
                                            <div className='bg-red w-1/2 flex justify-center items-center'>
                                                <MapPinIcon className='w-8 h-8'/>
                                                <div className='capitalize font-bold'>{e.city}</div>
                                            </div>

                                        </div>  
                                        
                                        
                                        </div>
                                    

                                    </div>
                                )
                            })
                        }
                        
                     
                    </div>
                </div>
            </div>
              

        </div>
      </div>
    </div> 
     )
}
