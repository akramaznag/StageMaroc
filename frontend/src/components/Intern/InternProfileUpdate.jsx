import React, { useRef } from 'react'
import {
  HomeIcon,
  IdentificationIcon,
  CalendarIcon,
  BriefcaseIcon,
  ClockIcon,
  BookOpenIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  ArrowUpTrayIcon,
  EyeIcon,
  DocumentIcon,
  BuildingOfficeIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon

} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import {targeted_internship,internshi_durations} from "../constants";
import axios from 'axios';
import Spinner from '../../Spinner';

export default function InternProfileUpdate() {
    const [educationlevel,setEducationLevel]=useState([]);
    const [specialties,setSpecialties]=useState([]);
    const [schools,setSchools]=useState([]);
    const [cities,setCities]=useState([]);
    const user =JSON.parse(sessionStorage.getItem('user'));
    const [profileScore,setProfileScore]=useState(3);
    const [profileScoreColor,setProfileScoreColor]=useState('text-red-500')
    const fileInputRef =useRef();
    const [Loading,setLoading]=useState(false);
    const [notification,setNotification]=useState(false);
    const [infoNotification,setInfoNotification]=useState(false);
    const message=JSON.parse(sessionStorage.getItem('message'))
    useEffect(()=>{
        if(message){
          setInfoNotification(true)
        }
      },[])
    

    

    // handle inputs values
    const [formData, setFormData] = useState({
        statut: 'Student', // corresponds to radio selection
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
        intern_profile_id: '' ,// you’ll set this once profile is fetched
        profile_score:profileScore
});

    // 
    
      
    const token=sessionStorage.getItem('token');
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/intern_profile/getInternProfileAndMetadata',{ headers:{ Authorization:`bearer ${token}`}})
        .then(res=>{
            setEducationLevel(res.data.data.education_levels);
            setSpecialties(res.data.data.specialties);
            setCities(res.data.data.cities);
            setSchools(res.data.data.schools)
            setFormData(prev => ({
                ...prev,
                intern_profile_id: res.data.data.intern_profile?.id ?? '',
                statut: res.data.data.intern_profile?.statut ?? 'Student',
                school_id: res.data.data.intern_profile?.school_id ?? '',
                education_level_id: res.data.data.intern_profile?.education_level_id ?? '',
                specialty_id: res.data.data.intern_profile?.specialty_id ?? '',
                presentation: res.data.data.intern_profile?.presentation ?? '',
                telephone: user?.phone ?? '', // nested in intern_profile if not in root
                contract: res.data.data.intern_ship_preferences?.contract ?? '',
                city_id: res.data.data.intern_ship_preferences?.city_id ?? '',
                start_date: res.data.data.intern_ship_preferences?.start_date ?? new Date().toISOString().split("T")[0],
                duration: res.data.data.intern_ship_preferences?.duration ?? '',
                cv_path:res.data.data.intern_profile?.cv_path ?? '',
                profile_score:res.data.data.intern_profile?.profile_score ?? 3,

                }));
        })
        .catch(err=>console.log(err))
       
      },[])
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));
};

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, cv_path: e.target.files[0] }));
    };
    const handleRemoveCV = () => {
        setFormData({ ...formData, cv_path: '' });
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the file input
        }
    };
  const calculateProfileScore = (formData) => {
    const hasSchool = formData?.school_id;
    const hasPresentation = formData.presentation?.trim();
    const hasCV = formData.cv_path;

    return hasSchool && hasPresentation && hasCV ? 10 : 3;
    };

useEffect(() => {
    const score = calculateProfileScore(formData);
    setProfileScore(score);

    const scoreProfileColor = score === 10 ? "text-green-500" : "text-red-500";
    setProfileScoreColor(scoreProfileColor);
}, [formData]);

  const HandleSubmit=(e)=>{
    e.preventDefault();
    setLoading(true);
     const form = new FormData();
    form.append("_method", "PATCH"); // tells Laravel to treat it as PATCH
    form.append("statut", formData.statut);
    form.append("school_id", formData.school_id);
    form.append("education_level_id", formData.education_level_id);
    form.append("specialty_id", formData.specialty_id);
    form.append("presentation", formData.presentation);
    form.append("telephone", formData.telephone);
    form.append("contract", formData.contract);
    form.append("city_id", formData.city_id);
    form.append("start_date", formData.start_date);
    form.append("duration", formData.duration);
    form.append("profile_score", profileScore);


  // Only append the file if it's a File instance
  if (formData.cv_path instanceof File) {
    form.append("cv_path", formData.cv_path);
  }

    if (formData){
        axios.post(`http://127.0.0.1:8000/api/intern_profile/update/${formData.intern_profile_id}`,form,
        {
            headers:{
                Authorization:`bearer ${token}`,
                "Content-Type": "multipart/form-data"       
            }
        }).then(res=>{
            setLoading(false)
            setNotification(true)
       
            



        }).catch(err=>console.log(err))
    }

  }
    useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);
    const CloseNotification=()=>{
       setNotification(false)
    }
    //info notification
     useEffect(() => {
    if (infoNotification) {
      const timer = setTimeout(() => {
        setInfoNotification(false);
        sessionStorage.removeItem('message')
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [infoNotification]);
    const CloseInfoNotification=()=>{
       setInfoNotification(false);
      sessionStorage.removeItem('message');  

    }

  return (
    <div className='flex flex-col h-[600px] gap-y-3  border-blue rounded-lg'>
          {/* notification */}
        <div className={`fixed z-40 right-0 top-0 w-[30%] h-auto flex justify-end transition-all duration-500 ease-in-out
          ${    (notification || infoNotification) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
            <div className={ `bg-white  w-[80%] h-[75px] border-1  border-l-2 ${notification? 'border-l-green-400':infoNotification && 'border-l-orange-400'} border-gray-200 rounded-lg relative right-4 top-4 shadow-md flex items-center justify-between !p-3 gap-x-2 transition-opacity duration-300 `}>
               {
                notification?

                    <>
                    <div className='flex items-center gap-x-2 '>
                        <CheckCircleIcon className='w-7 h-7 text-green-400 relative bottom-2'/>
                          <div className='flex flex-col gapy-y-2'>
                              <div className='first-letter:capitalize font-bold text-sm'>le profil est mis à jour</div>
                              <div className='text-[12px] first-letter:capitalize text-slate-500'>le profil a été mis à jour avec succès</div>
                          </div>
                    </div>
                    
                    <div className='flex items-center gap-x-2 '>

                    <XMarkIcon onClick={()=>CloseNotification()} className='w-6 h-6 text-slate-500 relative bottom-2 font-bold'/>
                    
                    </div>
                    </>
                  :
                  infoNotification &&
                    (
                      <>
                        <div className='flex items-center gap-x-2 '>
                            <ExclamationCircleIcon className='w-7 h-7 text-orange-400 relative bottom-2'/>
                              <div className='flex flex-col gapy-y-2'>
                                  <div className='first-letter:capitalize font-bold text-sm'>{message.title}</div>
                                  <div className='text-[12px] first-letter:capitalize text-slate-500'>{message.message}</div>
                              </div>
                        </div>
                        
                        <div className='flex items-center gap-x-2 '>

                        <XMarkIcon onClick={()=>CloseInfoNotification()} className='w-6 h-6 text-slate-500 relative bottom-2 font-bold'/>
                        
                        </div>
                    </>

                  )
               }

            </div>
        </div>

        <div className='bg-gray-200 rounded-lg w-full h-[10%]  flex justify-center items-center !px-5 gap-x-1'>
            <div className='text-2xl text-blue-500 font-semibold uppercase w-1/3 bg-blue h-[100%] flex justify-start items-center'>modefier de profil</div>
            <div className='text-2xl text-slate-400 uppercase font-semibold  w-1/3 bg-blue h-[100%] flex justify-end items-center'>score de profil:  <span className={`text-2xl font-semibold !mr-1 ${profileScoreColor}`}> {formData.profile_score}</span > <span className='text-2xl font-semibold '>/10</span></div>
            <div className='w-1/3 h-[100%] flex justify-end items-center'>
            <div className='flex justify-center items-center gap-x-2 border-slate-400 border-1 outline-none !p-2 rounded-lg bg-amber'> 

            <IdentificationIcon className='w-5 h-5 text-blue-500'/>
            <Link to='' className='text-slate-400 text-sm capitalize '> voir mon profil</Link>
            </div>
        </div>
           
        </div>
        <form onSubmit={HandleSubmit} className='bg-red h-[100%] w-full flex flex-col gap-y-3'>
            <div className='flex  h-[100%] w-full gap-x-5'>
                {/* acedamique section */}
                <div className='bg-green  border-gray-100 w-[30%] h-[100%]  flex flex-col'>
                    <div className='bg-gray-200 h-[12%] w-full !px-5 !py-3 flex flex-col  rounded-t-lg'>
                        <div className='bg-blue h-[100%] flex flex-col justify-between'>
                            <div className='text-md font-semibold capitalize'>Mon Ecole</div>
                            <div className='text-sm text-slate-700 font-medium first-letter:capitalize'>Formation academique</div>
                        </div>
                    </div>
                    <div className='bg-white h-[100%] w-full !p-5 rounded-b-lg'>
                        <div className='bg-blue h-[100%]  gap-y-6 flex flex-col'>
                            <div className='bg-green h-auto w-full flex items-start gap-x-2 !pl-1 !py-1'>
                                 <div className="flex items-center gap-x-2">
                                     <input defaultChecked  type="radio" name="statut" value="Student" id="Student"   checked={formData.statut === 'Student'} className="peer hidden" onChange={handleChange} />
                                     <label  htmlFor="Student"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >

                                     </label>
                                     <span className="text-sm font-medium">Étudiant</span>
                                 </div>
                                   <div className="flex items-center gap-x-2">
                                     <input   type="radio" name="statut" value="Graduate" id="Graduate" checked={formData.statut === 'Graduate'}  className="peer hidden"  onChange={handleChange}/>
                                     <label  htmlFor="Graduate"    className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >

                                     </label>
                                     <span className="text-sm font-medium">Laureat</span>
                                 </div>
                             
                             

                            </div>
                           <div className='bg-green h-auto w-full'>
                                 <div className="flex flex-col gap-y-2 ">
                                      <label className='text-sm capitalize'>ecole <span className='text-red-500'>*</span> </label>
                                      <select  required name='school_id' value={formData.school_id} onChange={handleChange} className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' >
                                        <option value="" disabled hidden>Sélectionnez une option</option>
                                        {schools.map((e)=>{
                                            return(
                                                <option key={e.id} value={e.id} className='flex flex-col'>
                                                        {e.short_name} - {e.full_name}

                                                </option>
                                            )
                                        })}
                                       </select>
                                                                        
                                 </div>
                            </div>
                             <div className='bg-green h-auto w-full'>
                                <div className="flex flex-col gap-y-2 ">
                                    <label className='text-sm capitalize'>niveau <span className='text-red-500'>*</span> </label>      
                                    <select required  name='education_level_id' value={formData.education_level_id} onChange={handleChange} className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' >
                                        <option value="" disabled hidden>Sélectionnez une option</option>
                                        {educationlevel.map((e)=>{
                                            return(
                                                <option key={e.id} value={e.id}>{e.level}</option>
                                            )
                                        })}
                                    </select>
                                    
                                </div>
                             </div>
                             <div className='bg-green h-auto w-full'>
                                 <div className="flex flex-col gap-y-2 ">
                                      <label className='text-sm capitalize'>Spécialité <span className='text-red-500'>*</span> </label>
                                      <select required name='specialty_id' value={formData.specialty_id} onChange={handleChange} className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' >
                                        <option value="" disabled hidden>Sélectionnez une option</option>
                                         {specialties.map((e)=>{
                                            return(
                                                <option key={e.id} value={e.id}>{e.specialite}</option>
                                            )
                                        })}
                                        </select> 
                                 </div>
                            </div>                            
                        </div>

                    </div>

                </div>
                <div className='bg-green w-[45%] h-[100%]  flex flex-col'>
                       <div className='bg-gray-200 h-[12%] w-full !px-5 !py-3 flex flex-col rounded-t-lg  '>
                        <div className='bg-blue h-[100%] flex flex-col justify-between'>
                            <div className='text-md font-semibold capitalize'>mon profil</div>
                            <div className='text-sm text-slate-700 font-medium first-letter:capitalize'>Tout à propos de vous</div>
                        </div>
                    </div>
                    <div className='bg-white h-[100%] w-full !p-5 rounded-b-lg '>
                        <div className='bg-blue h-[100%]  gap-y-6 flex flex-col'>
                           
                           <div className='bg-green h-auto w-full'>
                                 <div className="flex flex-col gap-y-2 ">
                                      <label className='text-sm capitalize'>présentation du stagiaire <span className='text-red-500'>*</span> </label>
                                      <textarea required name='presentation' type='text' onChange={handleChange} value={formData.presentation} rows='5' className='!p-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none'/>
                                    
                                 </div>
                                  
                             
                             

                            </div>
                             <div className='bg-green h-auto w-full'>
                                <div className="flex flex-col gap-y-2 ">
                                    <label className='text-sm capitalize'>téléphone <span className='text-red-500'>*</span> </label>      
                                    <input required name='telephone' type='text' onChange={handleChange} value={formData.telephone} className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' />
                                       
                                    
                                    
                                </div>
                             </div>
                             <div className='bg-green h-auto w-full'>
                                 <div className="flex flex-col gap-y-2 ">
                                      <label className='text-sm capitalize'>cv <span className='text-red-500'>*</span> </label>
                                    <div className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none flex gap-x-3 items-center'>
                                        <DocumentIcon className='w-6 h-6 text-gray-600' />
                                        {
  formData.cv_path ? (
    formData.cv_path instanceof File ? (
      <div className="flex justify-between items-center w-full">
        <a
          href={URL.createObjectURL(formData.cv_path)}
          download={formData.cv_path.name}
          className="text-blue-500"
        >
          {formData.cv_path.name}
        </a>
        <XMarkIcon
          className="w-6 h-6 text-gray-600 cursor-pointer"
          onClick={handleRemoveCV}
        />
      </div>
    ) : (
      <div className="flex justify-between items-center w-full">
        <a
          href={`http://127.0.0.1:8000/storage/${formData.cv_path}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
          
        >
          View uploaded CV
        </a>
        <XMarkIcon
          className="w-6 h-6 text-gray-600 cursor-pointer"
          onClick={handleRemoveCV}
        />
      </div>
    )
  ) : (
    <div className="text-blue-500 text-sm first-letter:capitalize">
      <span>no cv is uploaded,</span>
      <span
        className="underline cursor-pointer"
        onClick={() => fileInputRef.current.click()}
      >
        upload cv
      </span>
    </div>
  )
}

                                        </div>

                                         {/* Hidden file input */}
                                          <input name='cv_path'  type='file'  className='hidden'  ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.png,.jpg"/>
                                 </div>
                            </div>                            
                        </div>

                    </div>
                    
                </div>
                 <div className='bg-green w-[30%] h-[100%]  flex flex-col'>
                    <div className='bg-gray-200 h-[12%] w-full !px-5 !py-3 flex flex-col rounded-t-lg '>
                        <div className='bg-blue h-[100%] flex flex-col justify-between'>
                            <div className='text-md font-semibold capitalize'>mon stage recherche</div>
                            <div className='text-sm text-slate-700 font-medium first-letter:capitalize'>Détails sur votre Stage</div>
                        </div>
                    </div>
                    <div className='bg-white h-[100%] w-full !p-5 rounded-b-lg'>
                        <div className='bg-blue h-[100%]  gap-y-6 flex flex-col'>
                        
                           <div className='bg-green h-auto w-full'>
                                 <div className="flex flex-col gap-y-2 ">
                                      <label className='text-sm capitalize'>stage recherche <span className='text-red-500'>*</span> </label>
                                      <select required name='contract' onChange={handleChange} value={formData.contract}  className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' >
                                        <option  disabled selected hidden>Sélectionnez une option</option>
                                        {targeted_internship.map((e,index)=>{
                                          return <option key={index} value={e.value}>{e.internship}</option>
                                        })}
                                      </select>                                    
                                 </div>

                            </div>
                             <div className='bg-green h-auto w-full'>
                                <div className="flex flex-col gap-y-2 ">
                                    <label className='text-sm capitalize'>ville <span className='text-red-500'>*</span> </label>      
                                    <select required name='city_id' value={formData.city_id} onChange={handleChange} className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' >
                                        <option value="" disabled hidden>Sélectionnez une option</option>
                                             {cities.map((e)=>{
                                          return <option key={e.id} value={e.id}>{e.name}</option>
                                        })}
                                    </select>
                                    
                                </div>
                             </div>
                             <div className='bg-green h-auto w-full'>
                                 <div className="flex flex-col gap-y-2 ">
                                      <label className='text-sm capitalize'>Disponible à partir du <span className='text-red-500'>*</span> </label>
                                      <input required name='start_date'   value={formData.start_date} onChange={handleChange} type='date' className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' />
                                      
                                 </div>
                            </div>       
                             <div className='bg-green h-auto w-full'>
                                 <div className="flex flex-col gap-y-2 ">
                                      <label className='text-sm capitalize'>Durée  <span className='text-red-500'>*</span> </label>
                                      <select required name='duration' value={formData.duration} onChange={handleChange} className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' >
                                        <option value="" disabled hidden>Sélectionnez une option</option>
                                      {internshi_durations.map((e,index)=>{
                                          return <option key={index} value={e.value}>{e.duration}</option>
                                        })}
                                        </select> 
                                 </div>
                            </div>                            
                        </div>

                    </div>

                </div>
                
            </div>
            <div className={`bg-purple flex justify-end h-auto w-full `}>

              <button type='submit' className={`bg-blue-500  capitalize font-medium text-white text-sm !p-3  rounded-sm  flex justify-center items-center ${Loading &&'gap-x-2'}`}>
                   { Loading && <Spinner/> }

               <span>enregistrer</span>
                </button>
            </div>
        </form>

    </div>
  )
}
