import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import Spinner from '../../Spinner';
export default function InternLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate=useNavigate();
  const [Loading,setLoading]=useState(false);

  const OnSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    const validationErrors = [];

    if (!email.trim()) {
      validationErrors.push("L'email est requis.");
    }

    if (!password.trim()) {
      validationErrors.push("Le mot de passe est requis.");
    }

    setErrors(validationErrors);

    if (validationErrors.length === 0) {
        axios.post('http://127.0.0.1:8000/api/login',{email:email,password:password}).then(res=>{
        
          sessionStorage.setItem('token',res.data.authorization.token)
          sessionStorage.setItem('user',JSON.stringify(res.data.user))
          setLoading(false)
          if (res.data.user.role==="intern"){
            navigate("/stagaire/dashboard")
          }
          if (res.data.user.role==="recruiter"){
            navigate("/recruteur/dashboard");
          }
          
      }).catch(err=>{
        const errors=[]
        setLoading(false)

        if (err.response) {
          errors.push(err.response.data.message || 'Login failed')
          setErrors(errors);
        } else {
          errors.push('Network error')
          setErrors(errors);
        }
      }
      )
      // You can proceed with API call or authentication here
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='min-h-screen !mt-[250px] w-[470px]'>
        <div className='text-gray-500 text-2xl text-center uppercase !mb-5'>espace stagaire</div>

        {/* register container */}
        <div className={`border-black bg-white rounded-3xl !p-8 ${errors.length > 0 ? 'max-h-[430px]' : 'h-[350px]'}`}>
        <div className='flex justify-center gap-x-[150px] !mb-7'>
            <div className='uppercase'>
              <Link to="/stagaire/inscription">inscription</Link>
            </div>
            <div className='uppercase border-b-2 border-blue-400'>
              <Link to="/stagaire/connexion">connexion</Link>
            </div>
          </div>

          {/* Error messages */}
          {errors.length > 0 && (
            <div className='col-span-2 flex flex-col gap-2 !mb-2'>
              <div className='text-md text-red-500'>Oups ! Quelque chose s'est mal passé.</div>
              <div className='text-red-500'>
                {errors.map((err, index) => (
                  <li key={index} className='text-sm capitalize'>{err}</li>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={OnSubmit} className='grid grid-cols-2 grid-rows-5 gap-x-6 gap-y-3'>
            <div className='col-span-2 flex flex-col'>
              <label className='text-sm capitalize !mb-1'>email</label>
              <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='!p-2 rounded-sm border-2 border-gray-300 focus:border-blue-700 focus:outline-none'
              />
            </div>

            <div className='col-span-2 flex flex-col'>
              <label className='text-sm capitalize !mb-1'>mot de passe</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='!p-2 rounded-sm border-2 border-gray-300 focus:border-blue-700 focus:outline-none'
              />
            </div>

            <div className='col-span-2 flex justify-start gap-x-2.5'>
              <input type='checkbox' className='relative bottom-6' />
              <label className='text-sm capitalize'>se souvenire de moi</label>
            </div>

            <div className='col-span-2 flex justify-end items-start gap-x-9 relative bottom-10'>
              <Link className='!py-2 !px-4 cursor-pointer transition-all duration-300 text-black text-sm capitalize underline font-extralight'>
                mot de passe oublié ?
              </Link>
              <button
                type='submit'
                className={`rounded-sm !py-2 !px-4 cursor-pointer transition-all duration-300 bg-black text-white text-sm hover:bg-gray-700
                ${Loading && 'flex gap-x-2'}`}>
              { Loading && <Spinner/> }
                 <span>se connecter</span>
              </button>
            </div>
          </form>
        </div>
        {/* end register container */}
      </div>
    </div>
  );
}
