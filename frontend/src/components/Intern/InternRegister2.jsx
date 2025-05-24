import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IdentificationIcon } from '@heroicons/react/24/outline';


export default function InternRegister2() {
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
      <div className='!mt-[120px] w-[700px]'>
        <div className='text-gray-500 text-xl text- !mb-5 flex flex-col items-center justify-center  !p-1 gap-y-1'>
            <div className='flex justify-center bg-slate-200 items-center rounded-full h-24 w-24 '>
                 <IdentificationIcon className="h-16 w-16 " />
            </div>
            {/* description */}
            <div className='text-md text-slate-500 font-bold uppercase'>bonjour akram aznag</div>
            
                <p className='text-center text-sm text-slate-400'>Vous devez créer un profil pour commencer à utiliser MarocEmplois.ma</p>
            {/* end description */}


        </div>
        {/* form container */}
          <form className=' flex flex-col gap-y-4 '>
            {/* profile section */}
            <div className=' w-full flex justify-start gap-x-3.5  !px-6.5'>
              <div className='text-md capitalize font-semibold '>mon profil</div>
            </div>
            <div className='border-1 border-gray-300 rounded-md h-auto w-full flex justify-center gap-x-3.5 !p-5'>
              <div className='flex flex-col w-1/2 !p-2 gap-y-2'>
                <label className='text-sm capitalize'>niveau <span className='text-red-500'>*</span> </label>
                <select className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none' >
                <option value="" disabled selected hidden>Sélectionnez une option</option>
                <option value="">bac </option>
                  <option value="">bac </option>
                  <option value="">bac </option>
                  <option value="">bac </option>
                </select>
                <p className='text-sm capitalize text-red-500 font-medium'>the field is required</p>
              </div>
              <div className='flex flex-col w-1/2 !p-2 gap-y-2'>
                <label className='text-sm capitalize'>spécialités <span className='text-red-500'>*</span> </label>
                <select className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none' >
                <option  value="" disabled selected hidden>Sélectionnez une option</option>

                  <option value="">informatique </option>
                  <option value="">economie </option>
                  <option value="">comptabilite </option>
                  <option value="">autre </option>
                  <option value="">autre </option>
                </select>
                <p className='text-sm capitalize text-red-500 font-medium'>the field is required</p>

              </div>

            </div>
            <div className='w-full flex justify-start gap-x-3.5  !px-6.5'>
            <div className='text-md capitalize font-semibold '>mon profil</div>
            </div>
            
            <div className='border-1 border-gray-300 rounded-md h-auto w-full  gap-x-3.5 !p-5 grid grid-cols-4 grid-rows-2'>
              <div className='flex flex-col  !p-2 gap-y-2 col-span-2'>
                <label className='text-sm capitalize'>stage recherché <span className='text-red-500'>*</span> </label>
                <select className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none' >
                <option value="" disabled selected hidden>Sélectionnez une option</option>
                <option value="">bac </option>
                  <option value="">bac </option>
                  <option value="">bac </option>
                  <option value="">bac </option>
                </select>
                <p className='text-sm capitalize text-red-500 font-medium'>the field is required</p>

              </div>
              <div className='flex flex-col  !p-2 gap-y-2 col-span-2'>
                <label className='text-sm capitalize'>durée <span className='text-red-500'>*</span> </label>
                <select className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none' >
                <option  value="" disabled selected hidden>Sélectionnez une option</option>

                  <option value="">informatique </option>
                  <option value="">economie </option>
                  <option value="">comptabilite </option>
                  <option value="">autre </option>
                  <option value="">autre </option>
                </select>
                <p className='text-sm capitalize text-red-500 font-medium'>the field is required</p>

              </div>
              <div className='flex flex-col  !p-2 gap-y-2 col-span-2'>
                <label className='text-sm capitalize'>Disponible à partir du <span className='text-red-500'>*</span> </label>
                <select className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none' >
                <option  value="" disabled selected hidden>Sélectionnez une option</option>

                  <option value="">informatique </option>
                  <option value="">economie </option>
                  <option value="">comptabilite </option>
                  <option value="">autre </option>
                  <option value="">autre </option>
                </select>
                <p className='text-sm capitalize text-red-500 font-medium'>the field is required</p>

              </div>
               <div className='flex flex-col  !p-2 gap-y-2 col-span-2'>
                <label className='text-sm capitalize'>Ville <span className='text-red-500'>*</span> </label>
                <select className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-700 focus:outline-none' >
                <option  value="" disabled selected hidden>Sélectionnez une option</option>

                  <option value="">informatique </option>
                  <option value="">economie </option>
                  <option value="">comptabilite </option>
                  <option value="">autre </option>
                  <option value="">autre </option>
                </select>
                <p className='text-sm capitalize text-red-500 font-medium'>the field is required</p>

              </div>

            </div>
      
           <div className=' flex  justify-end i !pb-3 '>
            <button type='submit' className=' bg-blue-700 !p-3 text-white text-sm rounded-sm capitalize '> commencer </button>
           </div>
          </form>

        {/* end form container */}
        
        
      </div>
    </div>
  )
}
