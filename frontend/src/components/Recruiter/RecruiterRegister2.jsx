import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IdentificationIcon } from '@heroicons/react/24/outline';
import { Navigate } from 'react-router-dom';
import Spinner from '../../Spinner';
import axios from 'axios';
export default function RecruiterRegister2() {
  const navigate=useNavigate();
  const [enterprise_name,setEnterprisename]=useState('');

  const [errors, setErrors] = useState([])
  const [Loading, setLoading] = useState(false)
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = sessionStorage.getItem('token');




  // Handle form submission
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    const form =new FormData();
    form.append("enterprise_name",enterprise_name)
     axios.post("http://127.0.0.1:8000/api/enterprise/create",form,{
            headers:{
                Authorization:`bearer ${token}`,
            }}).
      then(res=>{ 
        setLoading(false)
        console.log(res.data)
        sessionStorage.setItem('user',JSON.stringify(res.data.user))
        navigate('/recruteur/dashboard')

        }).catch(err=>console.log(err))

   
  }



  return (
     <div className='flex justify-center'>
      {/* Container wrapper */}
      <div className='!my-[130px]  w-[85%] '>
        <div className='bg-red h-auto  w-full flex flex-col gap-y-5 '>  
          {/* enterprise section info */}
          <div className='bg-green h-auto w-full flex gap-x-5 !pb-5   border-b-1 border-b-gray-200'>
            <div className='bg-blue   w-[40%] h-auto !p-5'>
              <div className='first-letter:capitalize text-lg '>détails de l'entreprise</div>
              <p className='text-slate-500 first-letter:capitalize text-sm'>Créer une nouvel entreprise pour collaborer avec d'autres sur des recrutements en Stage.</p>
             </div>
            <div className='bg-blue bg-white shadow-lg rounded-lg w-[60%] h-auto !p-5 '>
              <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col w-full h-[100%] gap-y-5">
                <div className='bg-yellow  h-[45%] flex flex-col w-1/2 !p-1 gap-y-2'>
                  <div className='capitalize font-semibold text-sm '>adminstrateur de l'entreprise</div>
                  <div className='flex items-center gap-x-5'> 
                     <div className='cursor-pointer outline-none h-[60px] w-[60px]  border-2 border-gray-100 rounded-full !p-5 uppercase bg-blue-100 flex justify-center items-center'>
                       <div className='text-xl text-blue-400 tracking-wide'>
                            <span>{user.first_name.charAt(0)}</span><span>{user.last_name.charAt(0)}</span>

                       </div>
                      </div>
                      <div>
                        <div className='capitalize text-md'>{user.full_name}</div>
                        <div className='text-[13px] text-slate-600'>{user.email}</div>
                      </div>

                  </div>
                
                 
                </div>
             <div className="bg-yellow w-[60%] h-auto ">
              <div className='flex flex-col w-[100%] h-auto gap-y-2'>
               <label className='text-sm capitalize font-semibold'>nom de l'entreprise</label>
               <input required onChange={(e)=>setEnterprisename(e.target.value)} type="text" minLength='5' className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none'/>
              </div>
              
              </div>
                <div className='bg-yellow w-full h-auto flex justify-end'>
                      <button type='submit' className={`rounded-sm !py-2 !px-4 cursor-pointer transition-all duration-300 bg-black text-white text-sm hover:bg-gray-700 uppercase ${Loading && 'flex gap-x-2'}`}>
                        {Loading && <Spinner/>}
                        <span>enregistrer</span>
                        </button>
                </div>
                
                

              </form>
            </div>

          </div>
       
       
         
        </div>
       
       </div>
  </div>
  )
}
