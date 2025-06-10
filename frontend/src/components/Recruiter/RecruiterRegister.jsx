import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function RecruiterRegister() {
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
      <div className='h-[500px] !mt-[250px] w-[470px]'>
        <div className='text-gray-500 text-2xl text-center uppercase !mb-2'>espace recruteur</div>
        <div className='text-blue-400 text-sm text-center first-letter:capitalize !mb-5'>(Organismes seulement)</div>

        {/* Register container */}
        <div className={`border-black bg-white rounded-3xl !p-8 ${errors.length > 0 ? 'max-h-[560px]' : 'h-[395px]'}`}>
          <div className='flex justify-center gap-x-[150px] !mb-7'>
            <div className='uppercase border-b-2 border-blue-400'>
              <Link to="">inscription</Link>
            </div>
            <div className='uppercase'>
              <Link to="/recruteur/connexion">connexion</Link>
            </div>
          </div>

          {errors.length > 0 && (
            <div className='col-span-2 flex flex-col gap-2 !mb-2'>
              <div className='text-md text-red-500'>Oups ! Quelque chose s'est mal passé.</div>
              <div className='text-red-500'>
                {errors.map((error, index) => (
                  <li key={index} className='text-sm capitalize'>{error}</li>
                ))}
              </div>
            </div>
          )}

          <form className='grid grid-cols-2 grid-rows-4 gap-x-6 gap-y-2 h-[300px]' onSubmit={handleSubmit}>
            <div className='col-span-1 flex flex-col'>
              <label className='text-sm capitalize !mb-1'>nom</label>
              <input
                type='text'
                name='nom'
                value={formData.nom}
                onChange={handleInputChange}
                className='!p-2 rounded-sm border-2 border-gray-300 focus:border-blue-700 focus:outline-none'
              />
            </div>

            <div className='col-span-1 flex flex-col'>
              <label className='text-sm capitalize !mb-1'>prenom</label>
              <input
                type='text'
                name='prenom'
                value={formData.prenom}
                onChange={handleInputChange}
                className='!p-2 rounded-sm border-2 border-gray-300 focus:border-blue-700 focus:outline-none'
              />
            </div>

            <div className='col-span-2 flex flex-col'>
              <label className='text-sm capitalize !mb-1'>email</label>
              <input
                type='text'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='!p-2 rounded-sm border-2 border-gray-300 focus:border-blue-700 focus:outline-none'
              />
            </div>

            <div className='col-span-1 flex flex-col'>
              <label className='text-sm capitalize !mb-1'>mot de passe</label>
              <input
                type='password'
                name='motDePasse'
                value={formData.motDePasse}
                onChange={handleInputChange}
                className='!p-2 rounded-sm border-2 border-gray-300 focus:border-blue-700 focus:outline-none'
              />
            </div>

            <div className='col-span-1 flex flex-col'>
              <label className='text-sm capitalize !mb-1'>telephone</label>
              <input
                type='text'
                name='telephone'
                value={formData.telephone}
                onChange={handleInputChange}
                className='!p-2 rounded-sm border-2 border-gray-300 focus:border-blue-700 focus:outline-none'
              />
            </div>

            <div className='col-start-2 flex flex-col items-end'>
              <button type='submit' className='rounded-sm !py-2 !px-4 cursor-pointer transition-all duration-300 bg-black text-white text-sm hover:bg-gray-700'>s'inscrire</button>
            </div>
          </form>
        </div>
        {/* End register container */}
      </div>
    </div>
  )
}
