import React from 'react'
import {CheckIcon,MapPinIcon,CloudIcon,BriefcaseIcon,DocumentIcon, ClockIcon,PencilSquareIcon,CheckCircleIcon,XMarkIcon, BuildingOfficeIcon, UserIcon, CurrencyDollarIcon} from '@heroicons/react/24/outline';
import { Icon } from '@iconify/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState,useEffect ,useRef} from 'react';
import Spinner from "../Spinner"

import axios from 'axios';
export default function InternshipDetails() {
    const {id}=useParams();
    const [internship,setInternship]=useState()    
    const [isEditingFullName, setIsEditingFullName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingCity, setIsEditingCity] = useState(true);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const fileInputRef = useRef(null);
    const user=JSON.parse(sessionStorage.getItem('user'));
    const token=sessionStorage.getItem('token');
    const navigate=useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible,setIsVisible]=useState(false);
    const [notification,setNotification]=useState(false);
    const [ErrorNotification,setErrorNotification]=useState(false);
    const [cities,setCities]=useState([]);
    const [Loading,setLoading]=useState(false);
    const [hasApplied,setHasApplied]=useState(false)
    const [profileScore,setProfilescore]=useState()
    const [formData,setFormData]=useState({
        fullname:user?.full_name,
        email:user?.email,
        phone:user?.phone,
        city_id:null,
        cv:'',
        internship_id:parseInt(id),
        intern_id:user?.id
    })
    //retrieve current logged in intern infos
   useEffect(() => {
  axios.get(`http://127.0.0.1:8000/api/internship_application/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    if (res.status === 200) {
      const intern = res.data.intern;
      setFormData(prev => ({
        ...prev,
        cv: intern.cv,
      }));
      setProfilescore(intern.profile_score)
      console.log(intern)
    }
  })
  .catch(err => {
    console.log("Error caught here!", err.response);
    if (err.response) {
        if (err.response.status === 400 && err.response.data.has_applied) {
            setHasApplied(err.response.data.has_applied);
            setErrorNotification(true)
        } else {
            console.error("Other error:", err.response.data);
        }
    } else {
        console.error("Network or unknown error:", err);
    }
});

}, []);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/internship/details/${id}`).then(res=>{console.log(res.data.internship);setInternship(res.data.internship)}).catch(err=>console.log(err))
    },[])
    //get the cities
     useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/cities/`,{headers:{
            Authorization:`bearer ${token}`
        }})
        .then(res=>{
          setCities(res.data)
        }).catch(err=>console.log(err))
    },[])
    
    

    const handleIconClick = () => {
    fileInputRef.current.click(); // trigger hidden file input
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFormData({
        ...formData,cv:selectedFile
      });
    }
  };
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({
        ...formData,[name]:value
    })
  }


   

    //success notification closing
    useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
    }, [notification]);


   //error notification closing
    useEffect(() => {
    if (ErrorNotification) {
      const timer = setTimeout(() => {
        setErrorNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
    }, [ErrorNotification]);




    const CloseNotification=()=>{
        setNotification(false)
    }
     const CloseErrorNotification=()=>{
        setErrorNotification(false)
    }
    const OpenPopUp=()=>{
        if(!user){
            navigate('/stagaire/connexion')
        }
        if(profileScore !=10){
            navigate('/stagaire/dashboard/profile');
            const message={
                title:'profil requis',
                message:'complétez votre profil pour postuler' 
            }
            sessionStorage.setItem('message',JSON.stringify(message))
        }
        setIsOpen(true)
        setTimeout(() => {
            setIsVisible(true)
        }, 20);
    }
     const ClosePopUp=()=>{
        setIsOpen(false)
        setTimeout(() => {
            setIsVisible(false)
        }, 300);
    }
    useEffect(() => {
  document.body.style.overflow = isOpen ? 'hidden' : 'auto';
}, [isOpen]);


    const OnSubmit=(e)=>{
        e.preventDefault();
        setLoading(true)
        console.log(formData)
        const form=new FormData();
        Object.entries(formData).forEach(([key,value])=>{
            form.append(key,value)
        })
        axios.post('http://127.0.0.1:8000/api/internship_application/apply', form, {
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"

            }
        })
        .then(res => {
            console.log("Application submitted:", res.data);
            setLoading(false)
            setNotification(true); // or any success UI feedback
            ClosePopUp();
            setHasApplied(true)

            
        })
        .catch(err => {
            console.error(err);
            setErrorNotification(true)
            setLoading(false);

        });
    
    }

  return (
<div className='flex justify-center'>
      {/* Container wrapper */}
      <div className='!my-[130px]  w-[85%] '>
        <div className='bg-red h-auto  w-full flex gap-x-3 '>
            {/* notifications */}
             <div className={`fixed right-0 top-0 w-[30%] z-50 h-auto flex justify-end transition-all duration-500 ease-in-out ${notification || ErrorNotification ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
                <div className={ `bg-white  w-[80%] h-[75px] border-1 border-gray-200 border-l-2 ${ErrorNotification?'border-l-red-400' :'border-l-green-400'} rounded-lg relative right-4 top-4 shadow-md flex items-center justify-between !p-3 gap-x-2 transition-opacity duration-300   `}>
                  
                  <div className='flex items-center gap-x-2 '>
                       {
                        notification?(
                            <>
                                <CheckCircleIcon className='w-7 h-7 text-green-400 relative bottom-2'/>
                                <div className='flex flex-col gapy-y-2'>
                                    <div className='first-letter:capitalize font-bold text-sm'>candidature envoyé</div>
                                    <div className='text-[12px] first-letter:capitalize text-slate-500'>candidature envoyé avec success</div>
                                </div>
                            </>
                        )
                        
                        :
                        ErrorNotification && (
                             <>
                                <XMarkIcon className='w-7 h-7 text-red-400 relative bottom-2' />
                                <div className='flex flex-col gapy-y-2'>
                                    <div className='first-letter:capitalize font-bold text-sm'>error</div>
                                    <div className='text-[12px] first-letter:capitalize text-slate-500'>vous avez déjà postulé à ce stage</div>
                                </div>
                            </>

                        )
                    }
                  </div>
                    
                  <div className='flex items-center gap-x-2 '>
                    {
                        ErrorNotification?
                        
                        <XMarkIcon onClick={()=>CloseErrorNotification()} className='w-6 h-6 text-slate-500 relative bottom-2 font-bold'/>
                        :
                        <XMarkIcon onClick={()=>CloseNotification()} className='w-6 h-6 text-slate-500 relative bottom-2 font-bold'/>

                    }

                   
                  </div>

                </div>
            </div>
            {/* apply popup */}
             {isOpen && (
                  <div    className={`fixed inset-0 z-[60] flex justify-center items-center bg-black/50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} >
                    {/* Popup Container */}
                    <div className="bg-white w-[40%]  h-[95%] rounded-xl shadow-lg px-6 py-8 relative z-[70] !p-5">
                        <div className='flex flex-col justify-between gap-y-2  items-start  !p-5 border-1 border-slate-300 rounded-lg !mb-3'>
                          <h3 className='font-semibold'> Stage {internship?.title}</h3>
                          <div className='text-slate-400 text-sm '>
                           <span className='uppercase'> {internship?.enterprise}</span> <span>-</span><span className='capitalize'>{internship?.enterprise_city}</span>
                            </div>

                        </div>
                        <div className='bg-red !p-5 h-auto w-full border-1 border-slate-300 rounded-lg' > 
                            <h1 className='text-lg capitalize font-semibold'>merci de verifier votre candidature</h1>
                            <form className='w-full flex flex-col gap-y-2' onSubmit={(e)=>OnSubmit(e)}>
                                <div className='flex flex-col gap-y-2 w-full'>
                                     <label className='text-sm capitalize text-slate-500'>le nom complet <span className='text-red-500 text-sm'>*</span></label>
                                     <div className='w-full flex items-center gap-x-5'>

                                     <input onChange={handleChange} disabled={!isEditingFullName} name='fullName' value={formData.fullname} type='text' className=' w-[100%] !p-2 rounded-sm border-2 border-gray-300 focus:border-blue-500 focus:outline-none' />

                                     <PencilSquareIcon onClick={()=>setIsEditingFullName(prev=>!prev)} className={`w-9 h-9 ${ isEditingFullName?'text-blue-500' :'text-black'}`}/> 
                                     </div>
                                </div>
                                <div className='flex flex-col gap-y-2 w-full'>
                                     <label className='text-sm capitalize text-slate-500'>email <span className='text-red-500 text-sm'>*</span></label>
                                     <div className='w-full flex items-center gap-x-5'>

                                      <input  onChange={handleChange} disabled={!isEditingEmail} value={formData.email} name='email' type='email' className=' w-[100%] !p-2 rounded-sm border-2 border-gray-300 focus:border-blue-500 focus:outline-none' />

                                     <PencilSquareIcon onClick={()=>setIsEditingEmail(prev=>!prev)} className={`w-9 h-9 ${ isEditingEmail?'text-blue-500' :'text-black'}`}/> 
                                     </div>
                                </div>
                                  <div className='flex flex-col gap-y-2 w-full'>
                                     <label className='text-sm capitalize text-slate-500'>ville <span className='text-red-500 text-sm'>*</span></label>
                                     <div className='w-full flex items-center gap-x-5'>

                                     <select  value={formData.city_id} name='city_id' onChange={handleChange} disabled={!isEditingCity} className=' w-[100%] !p-2 rounded-sm border-2 border-gray-300 focus:border-blue-500 focus:outline-none' >
                                         <option value=""></option>
                                         {
                                            cities.map(e=>{
                                                return(
                                                    <option key={e.id} value={e.id}>{e.name}</option>
                                                )
                                            })
                                         }
                                     </select>

                                     <PencilSquareIcon onClick={()=>setIsEditingCity(prev=>!prev)} className={`w-9 h-9 ${ isEditingCity?'text-blue-500' :'text-black'}`}/> 
                                     </div>
                                </div>
                                 <div className='flex flex-col gap-y-2 w-full'>
                                     <label className='text-sm capitalize text-slate-500'>téléphone <span className='text-red-500 text-sm'>*</span></label>
                                     <div className='w-full flex items-center gap-x-5'>

                                     <input minLength="10" maxLength="10" disabled={!isEditingPhone} name='phone' onChange={handleChange} value={formData.phone} type='text' className=' w-[100%] !p-2 rounded-sm border-2 border-gray-300 focus:border-blue-500 focus:outline-none' />

                                     <PencilSquareIcon onClick={()=>setIsEditingPhone(prev=>!prev)} className={`w-9 h-9 ${ isEditingPhone?'text-blue-500' :'text-black'}`}/> 
                                     </div>
                                </div>
                              <div className='flex flex-col gap-y-2 w-full'>
                                     <label className='text-sm capitalize text-slate-500'>cv <span className='text-red-500 text-sm'>*</span></label>
                                      <div className='flex items-center gap-x-5'>
                                        <div className='w-[100%] !px-2 !py-3 rounded-sm border-2 border-gray-300 flex items-center gap-x-5'>
                                            <DocumentIcon className='w-6 h-6 text-gray-600' />
                                           {
                                                formData.cv ? (
                                                    formData.cv instanceof File ? (
                                                        <a
                                                            href={URL.createObjectURL(formData.cv)}
                                                            download={formData.cv.name}
                                                            className='text-blue-500'
                                                        >
                                                            {formData.cv.name}
                                                        </a>
                                                    ) : (
                                                        <a
                                                            href={`http://127.0.0.1:8000/storage/${formData.cv}`}
                                                            download
                                                            className='text-blue-500'
                                                        >
                                                            view uploaded cv
                                                        </a>
                                                    )
                                                ) : (
                                                    <p className='text-sm'>
                                                        no CV is uploaded, <span className='text-blue-500 underline'>upload CV</span>
                                                    </p>
                                                )
                                            }

        
                                            
                                           
                                            
                                        </div>
                                        <PencilSquareIcon    onClick={handleIconClick}  className='w-9 h-9 text-blue-500 cursor-pointer hover:text-blue-700'/>

                                         {/* Hidden file input */}
                                          <input type='file'  className='hidden' name='cv'  ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.png,.jpg"/>
                                    </div>

                                </div>
                                 <div className='flex justify-end w-full gap-x-3 absolute bottom-0 !px-5 !py-4 right-0 h-auto'>
                                   <button type='reset'  className='text-black text-sm bg-white flex justify-center items-center capitalize !py-3 !px-4 rounded-lg  transition-all duration-100  hover:bg-gray-100 ' onClick={()=>ClosePopUp()}>annuler</button>
                                   <button type='submit' className={`text-sm bg-blue-500 flex justify-center items-center capitalize !py-3 !px-4 rounded-lg text-white hover:bg-blue-400 transition-all duration-100 ${Loading && 'flex gap-x-2'}`}>
                                        {Loading && <Spinner/>}
                                        <span>postuler</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                    
                    </div>
                 </div>
            )}
            
            <div className='bg-white h-auto w-[70%] !px-3 flex flex-col gap-y-5 !py-5 rounded-xl shadow-md'>
                <div className='bg-blue h-[30%] flex justify-center items-start'>
                    {
                        internship?.photo ===''?   
                        <BuildingOfficeIcon className='h-[80%] w-[30%] rounded-lg'/>
                        :
                        <img src={`http://127.0.0.1:8000/storage/${internship?.enterprise_photo}`}  target="_blank" className='h-[80%] w-[30%] rounded-lg'/>
                    }
                 
                </div>

                <div className='bg-purple h-auto w-full flex flex-col gap-y-6'>
                    <h1 className='text-center text-2xl capitalize'>Stage {internship?.title}</h1>
                    {/* internship details */}
                    <div className='flex flex-col items-center justify-center w-full gap-y-8'>
                        <div className='bg-gray w-[85%] flex justify-around '>
                            <div className='flex flex-col gap-y-2'>
                                <div className='text-sm flex items-center gap-x-1'><MapPinIcon className='w-6 h-6 text-slate-500'/> <span className='capitalize text-slate-500'>ville</span></div>
                                <div>{internship?.city}</div>
                            </div>
                             <div  className='flex flex-col gap-y-2'>
                                <div className='text-sm flex items-center gap-x-1'><CloudIcon className='w-6 h-6 text-slate-500'/> <span className='capitalize text-slate-500'>Présence</span></div>
                                <div>{internship?.type==='onsite'?'sur site':internship?.type==='remote'?'à distance':'hybride'}</div>
                            </div>
                             <div  className='flex flex-col gap-y-2'>
                                <div className='text-sm flex items-center gap-x-1'><BriefcaseIcon className='w-6 h-6 text-slate-500'/> <span className='capitalize text-slate-500'>Spécialité</span></div>
                                <div>{internship?.specialty}</div>
                            </div>
                             <div  className='flex flex-col gap-y-2'>
                                <div className='text-sm flex items-center gap-x-1'><DocumentIcon className='w-6 h-6 text-slate-500'/> <span className='capitalize text-slate-500'>type</span></div>
                                <div>{internship?.contract}</div>
                            </div>
                              <div  className='flex flex-col gap-y-2'>
                                <div className='text-sm flex items-center gap-x-1'><ClockIcon className='w-6 h-6 text-slate-500'/> <span className='capitalize text-slate-500'>durée</span></div>
                                <div>{internship?.duration}</div>
                            </div>

                        </div>
                          <div className='bg-gray w-[80%] flex justify-around !px-15 '>
                           
                            
                             <div  className='flex flex-col gap-y-2'>
                                <div className='text-sm flex items-center gap-x-1'><UserIcon className='w-6 h-6 text-slate-400'/> <span className='capitalize text-slate-400'>profil</span></div>
                                <div>{internship?.profile_count}</div>
                            </div>
                             <div  className='flex flex-col gap-y-2'>
                                <div className='text-sm flex items-center gap-x-1'><DocumentIcon className='w-6 h-6 text-slate-400'/> <span className='capitalize text-slate-400'>date de début</span></div>
                                <div>{internship?.start_date}</div>
                            </div>
                              <div  className='flex flex-col gap-y-2'>
                                <div className='text-sm flex items-center gap-x-1'><CurrencyDollarIcon className='w-6 h-6 text-slate-400'/> <span className='capitalize text-slate-400'>rémunération</span></div>
                                <div>{internship?.remuneration}</div>
                            </div>

                        </div>
                    </div>
                    <div className='flex justify-center '>

                    <hr className='border-1 border-gray-100 w-[80%]'/>
                    </div>
                    {/* offre de stage */}
                    <div className='bg-orange h-auto w-full flex justify-center'>
                        <div className='w-[90%] bg-amber h-[100%] flex flex-col gap-y-8'>
                            <h2 className='uppercase text-xl'>offre de stage</h2>
                            {/* internship description */}
                            
                                {/* enterprise internship brief description */}
                                <div>
                                    <p className='whitespace-pre-line w-full h-auto bg-amber capitalize'>
                                        {internship?.description}
                                     </p>
                                </div>
                           
                            
                        </div>
                    </div>                    
                </div>
            </div>
            <div className='bg-green h-auto  w-[30%] flex items-center flex-col gap-y-5'>
                <div className='bg-white shadow-md w-[80%] h-auto  rounded-md flex flex-col gap-y-5 !p-8'>
                    <h3 className='uppercase text-lg'>a propos de stage</h3>
                    <div className='w-full flex flex-col gap-y-5'>
                        <div>
                            <div className='text-slate-400 capitalize text-sm'>Publiée le </div>
                            <div className='text-sm'>03/03/2025</div>
                        </div>
                        <div>
                            <div className='text-slate-400 capitalize text-sm'>a partir de</div>
                            <div className='text-sm'>03/03/2025</div>
                        </div>
                        <div>
                            <div className='bg-rose-50 border-1 border-rose-300 text-rose-500 rounded-lg w-full h-[70px] flex justify-center items-center'>expiree</div>
                        </div>
                    </div>
                    <div className='w-full'>
                       {
                        !user ? (
                                 <button onClick={() => OpenPopUp()}   className="bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-600 w-full h-[70px] rounded-lg flex justify-center items-center uppercase font-bold text-white"  >
                                        <CheckIcon className="w-6 h-6" />
                                        <span className="!ml-1">postuler</span>
                                </button>
                            ) : user.role === 'intern' && !hasApplied ? (
                                <button
                                onClick={() => OpenPopUp()}
                                className="bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-600 w-full h-[70px] rounded-lg flex justify-center items-center uppercase font-bold text-white"
                                >
                                <CheckIcon className="w-6 h-6" />
                                <span className="!ml-1">postuler</span>
                                </button>
                            )
                             : 
                            
                            hasApplied &&  (
                                <div className="bg-orange-300 w-full h-[70px] rounded-lg flex justify-center items-center uppercase font-bold text-white capitalize">
                                postulé
                                </div>
                            )
                        }

                    </div>

                </div>
                <div className='bg-white  shadow-md w-[80%] h-[100%]  rounded-md flex flex-col gap-y-5 !p-8'>
                    <div className='w-full flex items-center gap-x-3'>
                        <img className='h-16 w-16 rounded-lg border-1 border-gray-400' src={`http://127.0.0.1:8000/storage/${internship?.enterprise_photo}`} alt="" />
                        <div className='font-bold uppercase'>{internship?.enterprise}</div>
                    </div>
                    <hr className="border-slate-200" />
                    <div className='w-full flex flex-col gap-y-2'>
                      <h3 className='uppercase text-md'> entreprise</h3>
                      <p className='first-letter:capitalize text-sm text-slate-800 w-full'>{internship?.enterprise_description}</p>
                    </div>
                    <hr className="border-slate-200" />
                    <div className='flex flex-col gap-y-1'>
                            <div className='text-slate-400 capitalize text-sm'>Fondé en</div>
                            <div className='flex gap-x-1'> 
                                <span className='text-sm capitalize'>{internship?.enterprise_foundation_year}</span>
                            </div>
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <div className='text-slate-400 capitalize text-sm'>Pays</div>
                        <div className='flex gap-x-1'> 
                            <Icon icon="twemoji:flag-morocco" width="19" />
                            <span className='text-sm capitalize'>{internship?.enterprise_country}</span>
                         </div>
                    </div>

                    <div className='flex flex-col gap-y-1'>
                        <div className='text-slate-400 capitalize text-sm'>secteur</div>
                        <div className='flex gap-x-1'> 
                            <span className='text-sm capitalize'>{internship?.enterprise_sector}</span>
                         </div>
                    </div>

                     <div className='flex flex-col gap-y-1'>
                        <div className='text-slate-400 capitalize text-sm'>Bureau</div>
                        <div className='flex gap-x-1'> 
                            <MapPinIcon className='w-4 h-4 text-slate-400'/>
                            <span className='text-sm capitalize'>{internship?.enterprise_city}</span>
                         </div>
                    </div>


                </div>
            </div>
          
              

        </div>
      </div>
    </div>   )
}
