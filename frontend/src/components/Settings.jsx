import React, { useRef, useState } from 'react'
import {EyeIcon,EyeSlashIcon} from '@heroicons/react/24/outline';


export default function Settings() {
  const fileInput=useRef()
  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmPassword,setShowConfirmPassword]=useState(false)
  const [file,setFile]=useState('')
  const UploadImage=(e)=>{
    const image = e.target.files[0];
    if (image){
      setFile(URL.createObjectURL(image))
    }
    

  }
  
  return (
  <div className='flex justify-center'>
      {/* Container wrapper */}
      <div className='!my-[130px]  w-[85%] '>
        <div className='bg-red h-auto  w-full flex flex-col gap-y-5 '>  
          {/* profile section */}
          <div className='bg-green h-auto w-full flex gap-x-5 !pb-5   border-b-1 border-b-gray-200'>
            <div className='bg-blue   w-[40%] h-auto !p-5'>
              <div className='first-letter:capitalize text-lg '>Informations de profil</div>
              <p className='text-slate-500 first-letter:capitalize text-sm'>Mettre à jour les informations de votre profil et votre adresse e-mail.</p>
             </div>
            <div className='bg-blue bg-white shadow-lg rounded-lg w-[60%] h-auto !p-5 '>
              <form className="flex flex-col w-full h-[100%] gap-y-5">
                <div className='bg-yellow  h-[45%] flex flex-col w-1/2 !p-1 gap-y-2'>
                  <div className='capitalize font-semibold text-sm'>photo</div>
                   <a href={file}>
                    {file ?                   
                    <img src={file} className='h-[80px] w-[80px] rounded-full'/>
                    :
                     <div className='cursor-pointer outline-none h-[80px] w-[80px]  border-2 border-gray-100 rounded-full !p-5 uppercase bg-blue-100 flex justify-center items-center'>
                       <div className='text-3xl text-gray-500 tracking-wide'>AA</div>
                       </div>
                  }
                    </a>
                  <div onClick={()=>fileInput.current.click()} className='uppercase bg-white hover:bg-gray-50 border-1 !py-2 !px-3 cursor-pointer rounded-lg w-[80%] text-sm text-slate-500   border-gray-300 focus:border-blue-500 focus:outline-none flex justify-center items-center' >
                    Sélectionner une nouvelle photo
                  </div>
                  <input onChange={(e)=>UploadImage(e)} ref={fileInput} type='file'className='hidden'/>
                </div>
             <div className="bg-yellow w-full h-auto gap-5 g grid grid-cols-2">
              <div className='flex flex-col w-[100%] h-auto gap-y-2'>
               <label className='text-sm capitalize font-semibold'>Prénom</label>
               <input type="text" className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none'/>
              </div>
               <div className='flex flex-col w-[1-0%] gap-y-1'>
                 <label className='text-sm first-letter:capitalize font-semibold'>Nom de famille</label>
                <input type="text" className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none'/>
              </div>    
               <div className='flex flex-col w-[100%] gap-y-1'>
               <label className='text-sm capitalize font-semibold'>Email</label>
               <input type="text" className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none'/>
              </div>  
              <div className='flex flex-col w-[100%] gap-y-1'>
                 <label className='text-sm capitalize font-semibold'>téléphone</label>
               <input type="text" className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none'/>
              </div>
               
              </div>
                <div className='bg-yellow w-full h-auto flex justify-end'>
                      <button type='submit' className='rounded-sm !py-2 !px-4 cursor-pointer transition-all duration-300 bg-black text-white text-sm hover:bg-gray-700 uppercase'>enregistrer</button>
                </div>
                
                

              </form>
            </div>

          </div>
          {/* password section */}

          <div className='bg-green h-auto w-full flex gap-x-5 !pb-5 border-b-1 border-b-gray-200'>
            <div className='bg-blue w-[40%] h-auto !p-5'>
              <div className='first-letter:capitalize text-lg '>Mettre à jour le mot de passe</div>
              <p className='text-slate-500 first-letter:capitalize text-sm'>Assurez-vous que votre compte utilise un mot de passe long et aléatoire pour rester sécurisé.</p>
             </div>
            <div className='bg-blue  bg-white shadow-lg rounded-lg w-[60%] h-auto !p-5 border-lg'>
              <form className="flex flex-col w-full h-[100%] gap-y-5">
                
                 <div className="bg-yellow w-full h-auto flex gap-x-5 ">
                  <div className='flex flex-col w-[100%] gap-y-1'>
                    <label className='text-sm first-letter:capitalize font-semibold'>Mot de passe actuel</label>
                    <input type={showPassword? "text":"password"} className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none'/>
                    {
                      showPassword ?
                       <EyeSlashIcon onClick={()=>setShowPassword(false)} className='cursor-pointer absolute left-[63.5%] top-[92.5%] w-7 h-7 !p-1.5 bg-blue-200 rounded-full'/>
                                   :
                                   <EyeIcon onClick={()=>setShowPassword(true)} className='cursor-pointer absolute left-[63.5%] top-[92.5%] w-7 h-7 !p-1.5 bg-blue-200 rounded-full'/>
                      

                    }
                    

                  </div>  
                  <div className='flex flex-col w-[100%] gap-y-1'>
                    <label className='text-sm first-letter:capitalize font-semibold'>Nouveau mot de passe</label>
                    <input type={showConfirmPassword? "text": "password"} className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none'/>
                         {
                      showConfirmPassword ?
                       <EyeSlashIcon onClick={()=>setShowConfirmPassword(false)} className='cursor-pointer absolute left-[87.8%] top-[92.5%] w-7 h-7 !p-1.5 bg-blue-200 rounded-full'/>
                                   :
                        <EyeIcon onClick={()=>setShowConfirmPassword(true)} className='cursor-pointer absolute left-[87.8%] top-[92.5%] w-7 h-7 !p-1.5 bg-blue-200 rounded-full'/>
      
                    }
                  </div>
               
                 </div>
                <div className='bg-yellow w-full h-auto flex justify-end'>
                      <button type='submit' className='rounded-sm !py-2 !px-4 cursor-pointer transition-all duration-300 bg-black text-white text-sm hover:bg-gray-700 uppercase'>enregistrer</button>
                </div>
                
                

              </form>
            </div>

          </div>
          {/* account deletion section */}
           <div className='bg-green h-auto w-full flex  gap-x-5 !pb-5  border-b-1 border-b-gray-200'>
            <div className='bg-blue w-[40%] h-auto !p-5'>
              <div className='first-letter:capitalize text-lg '>Supprimer le compte</div>
              <p className='text-slate-500 first-letter:capitalize text-sm'>Supprimer définitivement votre compte.</p>
             </div>
            <div className='bg-blue  bg-white shadow-lg rounded-lg w-[60%] h-auto !p-5 border-lg'>
              <div className='flex flex-col gap-y-3 w-[70%]'>

             <p className='first-letter:capitalize text-slate-500 text-sm w-full'>Une fois votre compte supprimé, toutes ses ressources et données seront définitivement supprimées. Avant de supprimer votre compte, veuillez télécharger toutes les données ou informations que vous souhaitez conserver.</p>
             <button type='button' className='w-[40%] rounded-sm !py-2 !px-4 cursor-pointer transition-all duration-300 bg-red-600 text-white text-sm hover:bg-red-400 uppercase'>supprimer le compte</button>
              </div>

            </div>

          </div>
         
        </div>
       
       </div>
  </div>

            
)
}
