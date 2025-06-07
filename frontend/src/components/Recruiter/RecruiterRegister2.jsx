import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IdentificationIcon } from '@heroicons/react/24/outline';
import { Navigate } from 'react-router-dom';


export default function RecruiterRegister2() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    telephone: '',
  })

  const [errors, setErrors] = useState([])

  // Validation function
  const validateForm = () => {
    const newErrors = []

    // Validate nom
    if (!formData.nom) newErrors.push("Le nom est requis.")

    // Validate prenom
    if (!formData.prenom) newErrors.push("Le prénom est requis.")

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!formData.email) {
      newErrors.push("L'email est requis.")
    } else if (!emailRegex.test(formData.email)) {
      newErrors.push("L'email est invalide.")
    }

    // Validate mot de passe
    if (!formData.motDePasse) {
      newErrors.push("Le mot de passe est requis.")
    } else if (formData.motDePasse.length < 8) {
      newErrors.push("Le mot de passe doit contenir au moins 8 caractères.")
    }

    // Validate telephone
    const phoneRegex = /^[0-9]{10}$/
    if (!formData.telephone) {
      newErrors.push("Le téléphone est requis.")
    } else if (!phoneRegex.test(formData.telephone)) {
      newErrors.push("Le numéro de téléphone est invalide.")
    }

    setErrors(newErrors)

    return newErrors.length === 0
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/recruteur/dashboard/')
    if (validateForm()) {
      // Proceed with form submission (e.g., API call)
      console.log('Form submitted successfully', formData)
      
    }
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
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
                       <div className='text-xl text-blue-400 tracking-wide'>AA</div>
                      </div>
                      <div>
                        <div className='capitalize text-md'>ahlam anadour</div>
                        <div className='text-[13px] text-slate-600'>ahlam@gmail.com</div>
                      </div>

                  </div>
                
                 
                </div>
             <div className="bg-yellow w-[60%] h-auto ">
              <div className='flex flex-col w-[100%] h-auto gap-y-2'>
               <label className='text-sm capitalize font-semibold'>nom de l'entreprise</label>
               <input type="text" className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none'/>
              </div>
              
              </div>
                <div className='bg-yellow w-full h-auto flex justify-end'>
                      <button type='submit' className='rounded-sm !py-2 !px-4 cursor-pointer transition-all duration-300 bg-black text-white text-sm hover:bg-gray-700 uppercase'>enregistrer</button>
                </div>
                
                

              </form>
            </div>

          </div>
       
       
         
        </div>
       
       </div>
  </div>
  )
}
