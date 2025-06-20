import React, { useState,useEffect } from 'react';
import { Link ,useLocation,useNavigate} from 'react-router-dom';
import { ArrowRightOnRectangleIcon ,CheckCircleIcon,ChevronUpDownIcon } from '@heroicons/react/24/solid';
import axios from 'axios';


export default function Header() {
   const [Accountpopup, setAccountPopup] = useState(false); // 'account', 'company', or null
   const [Companypopup, setCompanyPopup] = useState(false); // 'account', 'company', or null  
   const token=sessionStorage.getItem("token");
   const user =JSON.parse(sessionStorage.getItem("user"));
   const location = useLocation();
   const basePath = location.pathname.startsWith('/recruteur') ? '/recruteur' : '/stagaire';
   const [applicationDetails,setApplicationDetails]=useState([])
   const [internships,setInternships]=useState([]);
   const [enterprise_name,setEnterprisename]=useState()
   const navigate=useNavigate()
   let role='';
   if(user){
     
     role=user.role==="intern"?"stagaire":"recruteur";
    }
    const Logout=()=>{
      axios.post('http://127.0.0.1:8000/api/logout',{},{
        headers:{
          Authorization:`bearer ${token}`
        }
      }).then(()=>{
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        navigate(`/${role}/connexion`);
      }).catch(err=>console.log(err))
    }

     useEffect(() => {
  if (user && user.role === 'recruiter') {
    axios.get('http://127.0.0.1:8000/api/internship/list', {
      headers: { Authorization: `bearer ${token}` }
    }).then(res => {
      setInternships(res.data.internships);
    }).catch(err => console.log(err));
  }
}, []);

useEffect(() => {
  if (user && user.role === 'recruiter') {
    axios.get('http://127.0.0.1:8000/api/internship_application/get_recruiter_applications', {
      headers: { Authorization: `bearer ${token}` }
    }).then(res => {
      setApplicationDetails(res.data.applications);
    }).catch(err => console.log('error caught', err));
  }
}, []);

useEffect(() => {
  if ( user && user.role === 'recruiter') {
    axios.get("http://127.0.0.1:8000/api/enterprise/", {
      headers: { Authorization: `bearer ${token}` }
    }).then(res => {
      setEnterprisename(res.data.enterprise.enterprise_name);
    }).catch(err => console.log(err));
  }
}, []);

    
    
   return (
    <div onClick={()=>{
      Accountpopup?setAccountPopup(false):''
      Companypopup?setCompanyPopup(false):''
    }} className='z-5 fixed flex justify-center shadow-amber-50 border-b-0 h-[70px] w-full col-start-1 col-end-11 row-start-1 row-end-2 gap-x-14 bg-white'>
       <div className='flex justify-center w-[85%]'>

      <div className='bg-green flex w-1/3 justify-center items-center'>
        <div className=' cursor-pointer text-2xl font-semibold'>Maroc Stage</div>
      </div>
      {
       token?
      //user menu
     <>
      {/* Navigation Menu */}
      <ul className='flex list-none bg-yellow w-1/2 justify-center items-center  text-sm  capitalize'>
      <li className=' cursor-pointer border-b-2 border-gray-50 hover:border-b-blue-400 transition-all duration-300  '>
       <Link to={'/stages'}>les offres de stages</Link>
        </li>
       
      </ul>
     
      {/* Auth Menu */}
      <ul className='bg-red flex list-none w-1/2 justify-end items-center   capitalize text-sm'>
        {
          user.role==='recruiter' ?
          //recruiter menu
          <>
          
      <li className='w-full flex justify-center gap-x-4'>
     
   
        <Link  to={'/recruteur/dashboard/candidatures/'} className='cursor-pointer bg-gray-50  rounded-lg !p-2 lowercase flex justify-center items-center gap-x-2'>
         <div className='flex justify-center items-center !p-1 bg-gray-200 text-slate-700 rounded-full text-sm'>{applicationDetails.length}</div>
         <div className='text-sm capitalize text-slate-500'>candidatures</div>
        </Link>
        <Link to={'/recruteur/dashboard/offres-stage/'} className='cursor-pointer bg-gray-50  rounded-lg !p-2 lowercase flex justify-center items-center gap-x-2'>
         <div className='flex justify-center items-center !p-1 bg-gray-200 text-slate-700 rounded-full text-sm'>{internships.length}</div>
         <div className='text-sm capitalize text-slate-500'>offres stages</div>
        </Link>
      
        <div onClick={()=>{
        setCompanyPopup(prev=>!prev)
          setAccountPopup(false)
          }} className='cursor-pointer   rounded-lg !p-2 lowercase  flex  items-center'>
          <div className='flex w-full items-center gap-x-3'>
           <div className='text-sm text-slate-900'>{enterprise_name}</div>
            <ChevronUpDownIcon className='w-4 h-4'/>


           </div>
        </div>
         <div onClick={()=>{

          setAccountPopup(prev=>!prev)
          setCompanyPopup(false)
          
          }} className='cursor-pointer outline-none h-8 w-8 border-2 border-gray-100 rounded-full !p-5 uppercase bg-blue-100 flex justify-center items-center'>
          <div className='text-sm text-gray-500'>AA</div>
        </div>
        

      </li>
      {
        Accountpopup &&
       <li className={`${Accountpopup? ' transition-all duration-300  absolute right-27 top-19 bg-white text-black h-auto w-44 rounded-2xl !pt-2 !pb-1 border-2 border-gray-200 shadow-md':'hidden'    } `}>
        <ul className='flex flex-col gap-y-1'>
           <li className='text-[12px] !p-2 text-gray-400'>espace recruteur</li>
           <li className='hover:bg-gray-200 transition-all duration-300 !p-2'>
            <Link to={'/stagaire/dashboard/'} className='text-[13px] first-letter:capitalize' onClick={()=>setAccountPopup(false)}>tableau de bord</Link>
           </li>
           <li className='hover:bg-gray-200 transition-all duration-300 !p-2'>
               <Link to={'/utilisateur/profil/'} className='text-[13px] first-letter:capitalize' onClick={()=>setAccountPopup(false)}>parametres</Link>
            </li>
            <li onClick={()=>{setPopup(false);Logout()}}className='hover:bg-gray-200 border-t-1 border-gray-300 transition-all duration-300 !p-2 flex justify-start gap-x-1 items-center'>
              <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-600" />
              <div  className='text-[13px] first-letter:uppercase cursor-pointer' onClick={()=>{setAccountPopup(false);Logout()}}> se deconnecter</div>
            </li>
         </ul>
       </li>
      }
      {
        Companypopup && 
        <li className={`${Companypopup? ' transition-all duration-300  absolute right-45 top-19 bg-white text-black h-auto w-55 rounded-2xl !pt-2 !pb-1 border-1 border-gray-200 shadow-md':'hidden'    } `}>
        <ul className='flex flex-col gap-y-1'>
           <li className='text-[12px] !p-2 text-gray-400'>gérer l'entreprise</li>
           <li className='hover:bg-gray-100 transition-all duration-300 !p-2'>
            <Link to={'/stagaire/dashboard/'} className='text-[13px] first-letter:capitalize text-slate-700' onClick={()=> setComapnyPopup(false)}>paremetres de l'entreprise</Link>
           </li>
         
            <li className=' border-t-1 border-gray-300  flex flex-col gap-x-1 justify-start '>
               <li className='text-[12px] !p-2 text-gray-400'>gérer l'entreprise</li>
              <Link className='flex !p-2 gap-x-2 hover:bg-gray-100 transition-all duration-300 ' onClick={()=>{
                setComapnyPopup(false)
              }}>
                <CheckCircleIcon className='w-4 h-5 text-green-400'/>
                <div className='text-sm first-letter:capitalize text-slate-700'>{enterprise_name}</div>
              </Link>
            </li>
         </ul>
       </li>
      }
     </>
     :
     //intern menu
      <>
          
      <li className='w-full flex justify-end gap-x-4'>
        {
          user.photo?
          <img src={`http://127.0.0.1:8000/storage/${user.photo}`} onClick={()=>{  setAccountPopup(prev=>!prev)}} className='cursor-pointer outline-none h-8 w-8 border-2 border-gray-100 rounded-full '/>
           :
        <div onClick={()=>{  setAccountPopup(prev=>!prev)}} className='cursor-pointer outline-none h-8 w-8 border-2 border-gray-100 rounded-full !p-5 uppercase bg-blue-100 flex justify-center items-center'>
          <div className='text-sm text-gray-500 uppercase'><span>{user.first_name.charAt(0)}</span><span>{user.last_name.charAt(0)}</span></div>
        </div>
        }
        

      </li>
      {
        Accountpopup &&
       <li className={`${Accountpopup? ' transition-all duration-300  absolute right-27 top-19 bg-white text-black h-auto w-44 rounded-2xl !pt-2 !pb-1 border-2 border-gray-200 shadow-md':'hidden'    } `}>
        <ul className='flex flex-col gap-y-1'>
           <li className='text-[12px] !p-2 text-gray-400'>espace stagaire</li>
            <Link to={'/stagaire/dashboard/'} className='hover:bg-gray-200 transition-all duration-300 !p-2' onClick={()=>setPopup(false)}>
               <li className='  text-[13px] first-letter:capitalize'>tableau de bord</li>
            </Link>
            <Link to={'/utilisateur/profil/'} className='hover:bg-gray-200 transition-all duration-300 ' onClick={()=>setPopup(false)}>
              <li className='!p-2 text-[13px] first-letter:capitalize'>
                  parametres
              </li>
            </Link>
            <button className='hover:bg-gray-200 border-t-1 border-gray-300 transition-all duration-300 !p-2 ' onClick={Logout }>
                  <div className='flex justify-start gap-x-1 items-center'>
                     <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-600" />
                     <span className='text-[13px] first-letter:uppercase'>se deconnecter</span>  
                  </div>
            </button>
         </ul>
       </li>
      }
    
     </>
        }

      </ul>
     </>
      :
      //visiter menu
       <>
      {/* Navigation Menu */}
      <ul className='flex list-none bg-yellow w-1/2 justify-center items-center gap-x-14 text-sm capitalize'>
      <li className=' cursor-pointer border-b-2 border-gray-50 hover:border-b-blue-400 transition-all duration-300'>
       <Link to={'/stages'}>offres de stages</Link>
        </li>
      <li  className={`cursor-pointer border-b-2 border-gray-50 transition-all duration-300 
           ${location.pathname.startsWith('/stagaire') ? 'border-b-blue-400' : 'hover:border-b-blue-400' }`}>
           <Link to="/stagaire/inscription">espace stagaire</Link>
      </li>
      <li className={`cursor-pointer border-b-2 border-gray-50 transition-all duration-300 
         ${location.pathname.startsWith('/recruteur') ? 'border-b-blue-400' : 'hover:border-b-blue-400'}`}>
         <Link to="/recruteur/inscription">espace recruteur</Link>
      </li>
      </ul>
     
      {/* Auth Menu */}
      <ul className='bg-red flex gap-x-7  list-none w-1/3 justify-end items-center  capitalize text-sm'>
        <Link to={`${basePath}/connexion`}>
            <li className='rounded-sm !py-2 !px-4 cursor-pointer transition-all duration-300  hover:bg-blue-400 hover:text-white'>
              connexion
            </li>
        </Link>
        <Link to={`${basePath}/inscription`}> 
          <li className='rounded-sm !py-2 !px-4 cursor-pointer transition-all duration-300  hover:border-blue-400 hover:border-[1px] '>inscription</li>
        </Link>
      </ul>
     </>
   }
</div>
      
    </div>
  
)}
