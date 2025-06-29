import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { IdentificationIcon } from '@heroicons/react/24/outline';
import axios from "axios";
import {targeted_internship,internshi_durations} from "../constants"
import Spinner from '../../Spinner';
export default function InternRegister2() {
  
  const [educationlevel,setEducationLevel]=useState([]);
  const [specialties,setSpecialties]=useState([]);
  const [cities,setCities]=useState([]);
  const navigate=useNavigate();
  const [Loading,setLoading]=useState(false);

  
  const token=sessionStorage.getItem('token');
  const user=JSON.parse(sessionStorage.getItem('user'));
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/education_level',{ headers:{ Authorization:`bearer ${token}`}}).then(res=>setEducationLevel(res.data)).catch(err=>console.log(err))
    axios.get('http://127.0.0.1:8000/api/specialties',{ headers:{ Authorization:`bearer ${token}`}}).then(res=>setSpecialties(res.data)).catch(err=>console.log(err))
    axios.get('http://127.0.0.1:8000/api/cities',{ headers:{ Authorization:`bearer ${token}`}}).then(res=>setCities(res.data)).catch(err=>console.log(err))
  },[])
  const [formData, setFormData] = useState({
    education_level_id: null,
    specialty_id: null,
    city_id: null,
    contract:'',
    start_date: '',
    duration: '',
  })

 

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(formData)
    if(formData){

      axios.post('http://127.0.0.1:8000/api/intern_profile/create',formData,{
        headers:{
          Authorization:`bearer ${token}`
        }
      }).then(res=>{
        
          sessionStorage.setItem('token',res.data.authorisation.token)
          sessionStorage.setItem('user',JSON.stringify(res.data.user))
          console.log(res.data)
          navigate('/stagaire/dashboard')
      }).catch(err=>console.log(err))
     
    }
  
  }

  // Handle education level value
  const handleEducationLevel=(e)=>{
    setFormData({...formData,education_level_id:e.target.value})
  }
    // Handle specialty level value
  const handleSpecialty=(e)=>{
    setFormData({...formData,specialty_id:e.target.value})
  }
    // Handle education level value
  const handlecity_id=(e)=>{
    setFormData({...formData,city_id:e.target.value})
  }
    // Handle education level value
  const handlecontract=(e)=>{
    setFormData({...formData,contract:e.target.value})
  }
    // Handle education level value
  const handlestart_date=(e)=>{
    setFormData({...formData,start_date:e.target.value})
  }
    // Handle education level value
  const handleduration=(e)=>{
    setFormData({...formData,duration:e.target.value})
  }
  

  return (
    <div className='flex justify-center'>
      <div className='!mt-[120px] w-[700px]'>
        <div className='text-gray-500 text-xl text- !mb-5 flex flex-col items-center justify-center  !p-1 gap-y-1'>
            <div className='flex justify-center bg-slate-200 items-center rounded-full h-24 w-24 '>
                 <IdentificationIcon className="h-16 w-16 " />
            </div>
            {/* description */}
            <div className='text-md text-slate-500 font-bold uppercase'>bonjour <span>{user.full_name}</span></div>
            
                <p className='text-center text-sm text-slate-400'>Vous devez créer un profil pour commencer à utiliser MarocEmplois.ma</p>
            {/* end description */}


        </div>
        {/* form container */}
          <form onSubmit={(e)=>handleSubmit(e)} className=' flex flex-col gap-y-4 '>
            {/* profile section */}
            <div className=' w-full flex justify-start gap-x-3.5  !px-6.5'>
              <div className='text-md capitalize font-semibold '>mon profil</div>
            </div>
            <div className='border-1 border-gray-300 rounded-md h-auto w-full flex justify-center gap-x-3.5 !p-5'>
              <div className='flex flex-col w-1/2 !p-2 gap-y-2'>
                <label className='text-sm capitalize'>niveau <span className='text-red-500'>*</span> </label>
                <select onChange={(e)=>handleEducationLevel(e)} required className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none' >
                <option value="" disabled selected hidden>Sélectionnez une option</option>
                    {
                      educationlevel.map((e,index)=>{
                        return(
                          <option value={e.id} key={index}>{e.level}</option>
                        )
                      })
                    }
                </select>
                {/* <p className='text-sm capitalize text-red-500 font-medium'>the field is required</p> */}
              </div>
              <div className='flex flex-col w-1/2 !p-2 gap-y-2 '>
                <label className='text-sm capitalize'>spécialités <span className='text-red-500'>*</span> </label>
                <select  onChange={(e)=>handleSpecialty(e)} required className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none overflow-y-auto ' >
                 <option value="" disabled selected hidden>Sélectionnez une option</option>
                    {
                      specialties.map((e,index)=>{
                        return(
                          <option value={e.id} key={index}>{e.specialite}</option>
                        )
                      })
                    }
                    
                </select>
                {/* <p className='text-sm capitalize text-red-500 font-medium'>the field is required</p> */}

              </div>

            </div>
            <div className='w-full flex justify-start gap-x-3.5  !px-6.5'>
            <div className='text-md capitalize font-semibold '>mon stage recherché</div>
            </div>
            
            <div className='border-1 border-gray-300 rounded-md h-auto w-full  gap-x-3.5 !p-5 grid grid-cols-4 grid-rows-2'>
              <div className='flex flex-col  !p-2 gap-y-2 col-span-2'>
                <label className='text-sm capitalize'>stage recherché <span className='text-red-500'>*</span> </label>
                <select  onChange={(e)=>handlecontract(e)} required className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none' >
                <option value="" disabled selected hidden>Sélectionnez une option</option>
                {
                      targeted_internship.map((e,index)=>{
                        return(
                          <option value={e.value} key={index}>{e.internship}</option>
                        )
                      })
                    }
                </select>
                {/* <p className='text-sm capitalize text-red-500 font-medium'>the field is required</p> */}

              </div>
              <div className='flex flex-col  !p-2 gap-y-2 col-span-2'>
                <label className='text-sm capitalize'>durée <span className='text-red-500'>*</span> </label>
                <select  onChange={(e)=>handleduration(e)} required className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none' >
                <option  value="" disabled selected hidden>Sélectionnez une option</option>

                 {
                      internshi_durations.map((e,index)=>{
                        return(
                          <option value={e.value} key={index}>{e.duration}</option>
                        )
                      })
                    }
                </select>
                {/* <p className='text-sm capitalize text-red-500 font-medium'>the field is required</p> */}

              </div>
              <div className='flex flex-col  !p-2 gap-y-2 col-span-2'>
                <label className='text-sm capitalize'>Disponible à partir du <span className='text-red-500'>*</span> </label>
                <input  onChange={(e)=>handlestart_date(e)} type='date' className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none' />
             
                {/* <p className='text-sm capitalize text-red-500 font-medium'>the field is required</p> */}

              </div>
               <div className='flex flex-col  !p-2 gap-y-2 col-span-2'>
                <label className='text-sm capitalize'>Ville <span className='text-red-500'>*</span> </label>
                <select  onChange={(e)=>handlecity_id(e)} required className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none' >
                <option  value="" disabled selected hidden>Sélectionnez une option</option>

                    {
                      cities.map((e,index)=>{
                        return(
                          <option value={e.id} key={index}>{e.name}</option>
                        )
                      })
                    }
                </select>
                {/* <p className='text-sm capitalize text-red-500 font-medium'>the field is required</p> */}

              </div>

            </div>
      
           <div className=' flex  justify-end i !pb-3 '>
            <button type='submit' className={`bg-blue-700 !p-3 text-white text-sm rounded-sm capitalize   ${Loading && 'flex gap-x-2'}`}> 
             { Loading && <Spinner/> }
             <span>commencer</span> 
            </button>
           </div>
          </form>

        {/* end form container */}
        
        
      </div>
    </div>
  )
}
