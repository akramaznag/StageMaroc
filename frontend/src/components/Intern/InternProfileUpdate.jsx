import React from 'react'
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
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import {targeted_internship,internshi_durations} from "../constants";
import axios from 'axios';
export default function InternProfileUpdate() {
    const [educationlevel,setEducationLevel]=useState([]);
    const [specialties,setSpecialties]=useState([]);
    const [schools,setSchools]=useState([]);
    const [cities,setCities]=useState([]);
    const user =JSON.parse(sessionStorage.getItem('user'));
    const [profileScore,setProfileScore]=useState(3);
    const [profileScoreColor,setProfileScoreColor]=useState('text-red-500')
    // handle inputs values
    const [formData, setFormData] = useState({
        statut: 'etudiant', // corresponds to radio selection
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
        intern_profile_id: '' // you’ll set this once profile is fetched
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
                duration: res.data.data.intern_ship_preferences?.duration ?? ''
                }));
        })
        .catch(err=>console.log(err))
       
      },[])
    console.log(formData)
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
    const calculateProfileScore = (formData) => {
        let score=0;
        const full_scorep_rofile=formData.school?.trim() &&formData.presentation?.trim()&&formData.cv_path;
        full_scorep_rofile?score=10:score=3;
        return score;
    };
   useEffect(() => {
    const score = calculateProfileScore(formData);
    setProfileScore(score)
    let scoreprofilecolor=score===10?"text-green-500":"text-red-500";
    setProfileScoreColor(scoreprofilecolor)
 
}, [formData]);


  return (
    <div className='flex flex-col h-[600px] gap-y-3  border-blue rounded-lg'>
        <div className='bg-gray-200 rounded-lg w-full h-[10%]  flex justify-center items-center !px-5 gap-x-1'>
            <div className='text-2xl text-blue-500 font-semibold uppercase w-1/3 bg-blue h-[100%] flex justify-start items-center'>modefier de profil</div>
            <div className='text-2xl text-slate-400 uppercase font-semibold  w-1/3 bg-blue h-[100%] flex justify-end items-center'>score de profil:  <span className={`text-2xl font-semibold !mr-1 ${profileScoreColor}`}> {profileScore}</span > <span className='text-2xl font-semibold '>/10</span></div>
            <div className='w-1/3 h-[100%] flex justify-end items-center'>
            <div className='flex justify-center items-center gap-x-2 border-slate-400 border-1 outline-none !p-2 rounded-lg bg-amber'> 

            <IdentificationIcon className='w-5 h-5 text-blue-500'/>
            <Link to='' className='text-slate-400 text-sm capitalize '> voir mon profil</Link>
            </div>
        </div>
           
        </div>
        <form className='bg-red h-[100%] w-full flex flex-col gap-y-3'>
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
                                      <select  name='school_id' value={formData.school_id} onChange={handleChange} className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' >
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
                                    <select  name='education_level_id' value={formData.education_level_id} onChange={handleChange} className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' >
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
                                      <select  name='specialty_id' value={formData.specialty_id} onChange={handleChange} className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' >
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
                                      <textarea  name='presentation' type='text' onChange={handleChange} value={formData.presentation} rows='5' className='!p-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none'/>
                                    
                                 </div>
                                  
                             
                             

                            </div>
                             <div className='bg-green h-auto w-full'>
                                <div className="flex flex-col gap-y-2 ">
                                    <label className='text-sm capitalize'>téléphone <span className='text-red-500'>*</span> </label>      
                                    <input name='telephone' type='text' onChange={handleChange} value={formData.telephone} className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' />
                                       
                                    
                                    
                                </div>
                             </div>
                             <div className='bg-green h-auto w-full'>
                                 <div className="flex flex-col gap-y-2 ">
                                      <label className='text-sm capitalize'>cv <span className='text-red-500'>*</span> </label>
                                      <input n name="cv_path" type="file"  onChange={handleChange}className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' />

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
                                      <select name='contract' onChange={handleChange} value={formData.contract}  className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' >
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
                                    <select name='city_id' value={formData.city_id} onChange={handleChange} className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' >
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
                                      <input name='start_date'   value={formData.start_date} onChange={handleChange} type='date' className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' />
                                      
                                 </div>
                            </div>       
                             <div className='bg-green h-auto w-full'>
                                 <div className="flex flex-col gap-y-2 ">
                                      <label className='text-sm capitalize'>Durée  <span className='text-red-500'>*</span> </label>
                                      <select name='duration' value={formData.duration} onChange={handleChange} className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' >
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
            <div className='bg-purple flex justify-end h-auto'>

              <button type='submit' className='bg-blue-500  capitalize font-medium text-white text-sm !p-3  rounded-sm  flex justify-center items-center'>enregistrer</button>
            </div>
        </form>

    </div>
  )
}
