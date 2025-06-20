import React, { useEffect, useRef, useState } from 'react'
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
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Form, Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../Spinner';
export default function DefaultDashboardPage() {
  const [internship_preferences,setInternship_preferences]=useState()
  const [specialty,setSpecialty]=useState()
  const [city,setCity]=useState();
  const [internProfile,setInternProfile]=useState();
  const [applicationsCount,setApplicationsCount]=useState();
  const [selectedCv,setSelectedcv]=useState(null);
  const [Loading,setLoading]=useState(false)
  const [notification,setNotification]=useState(false)

  const inputFileRef=useRef();
  const formRef=useRef();

  const [formData,setFormData]=useState({
    intern_id:null,
    cv:''
  });

  const token=sessionStorage.getItem('token')
  useEffect(()=>{
      axios.get('http://127.0.0.1:8000/api/intern_profile/index',{
    headers:{
      Authorization:`bearer ${token}`
    }
  }).then(res=>{
    setInternship_preferences(res.data.internship_preference);
    setSpecialty(res.data.specialty);
    setCity(res.data.internship_preference_city);
    setApplicationsCount(res.data.applications_count);
    setInternProfile(res.data.intern_profile);
    setFormData({ ...formData,intern_id:res.data.intern_profile.id})
  }).catch(err=>console.log(err))

  }
  
  ,[])
  console.log(internship_preferences)

 useEffect(() => {
  if (selectedCv) {
    setFormData(prev => ({ ...prev, cv: selectedCv }));
  }
}, [selectedCv]);

useEffect(() => {
  if (formData.cv) {
    handleSubmit({ preventDefault: () => {} }); 
  }
}, [formData.cv]);
  const handleSubmit=(e)=>{
     e.preventDefault();
     setLoading(true)
     console.log('form submitted here is the data',formData)
    const form=new FormData();
    form.append('id',formData.intern_id);
    form.append('cv_path',formData.cv);
  
    axios.post('http://127.0.0.1:8000/api/intern_profile/update_cv',form,{
        headers:{
          Authorization:`bearer ${token}`,
          "Content-Type": "multipart/form-data"       
        }
      } )
    .then(res=>{
      console.log(res.data)
      setInternProfile({...internProfile,cv_path:res.data.cv})
      setLoading(false)
      setNotification(true)
    })
    .catch(err=>console.log(err))


}

  const handleFileChange=(e)=>{
    const selected_cv =e.target.files[0]
    if(selected_cv){
      setSelectedcv(e.target.files[0])
     console.log('file selected');
     
   
    }
  }
  //notification
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
  
  
  return (
    <>
     {/* Main Dashboard Cards */}
          <div className='flex w-full gap-x-3.5 '>
              {/* notification */}
        <div className={`fixed z-40 right-0 top-0 w-[30%] h-auto flex justify-end transition-all duration-500 ease-in-out
          ${notification ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
            <div className={ 'bg-white  w-[80%] h-[75px] border-1 border-gray-200 rounded-lg relative right-4 top-4 shadow-md flex items-center justify-between !p-3 gap-x-2 transition-opacity duration-300 '}>
                
                <div className='flex items-center gap-x-2 '>

                <CheckCircleIcon className='w-7 h-7 text-green-400 relative bottom-2'/>
                <div className='flex flex-col gapy-y-2'>
                    <div className='first-letter:capitalize font-bold text-sm'>le cv est mis à jour</div>
                    <div className='text-[12px] first-letter:capitalize text-slate-500'>le cv a été mis à jour avec succès</div>
                </div>
                </div>
                
                <div className='flex items-center gap-x-2 '>

                <XMarkIcon onClick={()=>CloseNotification()} className='w-6 h-6 text-slate-500 relative bottom-2 font-bold'/>
                
                </div>

            </div>
        </div>
            {/* Profile Score Card */}
            <div className='bg-white h-[200px] border-b-4 border-blue-500 shadow-blue-300 shadow-[0px_45px_45px_-50px] w-1/3 flex flex-col justify-center items-center rounded-lg gap-y-2.5'>
              <div>
                <span className='text-5xl'>{internProfile?.profile_score}</span>
                <span className='text-md'>/10</span>
              </div>
              <p className='capitalize text-md !mb-8'>mon score profil</p>
              <div className='bg-blue-500 !p-1.5 !px-2 rounded-2xl flex items-center justify-center gap-x-1.5'>
                <IdentificationIcon className='h-5 w-5 text-white' />
                <Link className='text-white text-sm font-semibold first-letter:capitalize'>modefier mon profil</Link>
              </div>
            </div>

            {/* Applications Card */}
            <div className='bg-white h-[200px] border-b-4 border-orange-500 shadow-orange-300 shadow-[0px_45px_45px_-50px] w-1/3 flex flex-col justify-center items-center rounded-lg gap-y-2.5'>
              <div>
                <span className='text-5xl'>{applicationsCount}</span>
              </div>
              <p className='capitalize text-md !mb-8'>candidature envoyes</p>
              <div className='bg-orange-500 !p-1.5 !px-2 rounded-2xl flex items-center justify-center gap-x-1.5'>
                <IdentificationIcon className='h-5 w-5 text-white' />
                <Link className='text-white text-sm font-semibold first-letter:capitalize'>suivi candidatures</Link>
              </div>
            </div>

            {/* Interviews Card */}
            <div className='bg-white h-[200px] border-b-4 border-green-500 shadow-green-300 shadow-[0px_45px_45px_-50px] w-1/3 flex flex-col justify-center items-center rounded-lg gap-y-2.5'>
              <div>
                <span className='text-5xl'>0</span>
              </div>
              <p className='capitalize text-md !mb-8'>entretien decroché</p>
              <div className='bg-green-500 !p-1.5 !px-2 rounded-2xl flex items-center justify-center gap-x-1.5'>
                <IdentificationIcon className='h-5 w-5 text-white' />
                <Link className='text-white text-sm font-semibold first-letter:capitalize'>voir les entretiens</Link>
              </div>
            </div>
          </div>
          

          {/* Internship Details Section */}
          <div className='bg-white  h-[180px] flex flex-col w-full border-1 border-white rounded-lg '>
            <div className='w-full h-[22%] flex justify-center'>
              <div className='w-[90%] flex justify-start items-center'>
                <p className='uppercase font-medium'>mon stag en besoin</p>
              </div>
            </div>

            <div className='w-full h-[78%] flex justify-center'>
              <div className='w-[90%] flex flex-col items-center justify-center'>
                <div className='flex gap-x-10 w-full justify-evenly'>
                  {/* Type de stage */}
                  <div className='flex gap-x-2'>
                    <BriefcaseIcon className='h-8 w-8 text-slate-400' />
                    <div className='flex flex-col'>
                      <div className='text-sm capitalize text-slate-600'>type de stage</div>
                      <div className='text-sm capitalize font-bold'>{internship_preferences?.contract}</div>
                    </div>
                  </div>

                  {/* Date début stage */}
                  <div className='flex gap-x-2'>
                    <CalendarIcon className='h-8 w-8 text-slate-400' />
                    <div className='flex flex-col'>
                      <div className='text-sm capitalize text-slate-600'>Stage à partir du</div>
                      <div className='text-sm capitalize font-bold'>{internship_preferences?.duration}</div>
                    </div>
                  </div>

                  {/* Spécialité */}
                  <div className='flex gap-x-2'>
                    <BookOpenIcon className='h-8 w-8 text-slate-400' />
                    <div className='flex flex-col'>
                      <div className='text-sm capitalize text-slate-600'>spécialité</div>
                      <div className='text-sm capitalize font-bold'>{specialty}</div>
                    </div>
                  </div>

                  {/* Ville */}
                  <div className='flex gap-x-2'>
                    <MapPinIcon className='h-8 w-8 text-slate-400' />
                    <div className='flex flex-col'>
                      <div className='text-sm capitalize text-slate-600'>Ville</div>
                      <div className='text-sm capitalize font-bold'>{city}</div>
                    </div>
                  </div>

                  {/* Durée */}
                  <div className='flex gap-x-2'>
                    <ClockIcon className='h-8 w-8 text-slate-400' />
                    <div className='flex flex-col'>
                      <div className='text-sm capitalize text-slate-600'>Durée</div>
                      <div className='text-sm capitalize font-bold'>{internship_preferences?.duration}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
           {/* Internship Details Section */}
          <div className='bg-white  h-[300px] flex justify-center items-center  w-full border-1 border-white rounded-lg '>
            {/* container */}
           <div className='w-[90%]  h-[250px] bg-red- flex gap-x-3'>           
             {/* who seen ur profile section */}
              <div className='flex flex-col w-[70%]  h-[250px] bg-blue'> 
                <div className='bg-yellow h-[30px] flex justify-between'>
                  <p className='text-sm text-slate-500 uppercase'>voir Qui a consulté mon profil</p>
                  <Link to="" className='text-sm capitalize text-blue-500'>affier tout</Link>
                  </div>      
                <div className='bg-yellow w-full h-[220px] grid grid-cols-6 '>
                  <div className='bg-slate-100 w-[170px] rounded-lg h-[220px] col-start-1 col-end-2 flex flex-col justify-center !px-5 gap-y-3'>
                    <div className='bg-red  h-[80px]'>
                      <img src={'/download.png'} className='h-[80px] w-full rounded-lg'/>
                    </div>
                    <div className='bg-red h-[80px]'>
                      <p className='text-sm capitalize text-slate-900 text-center'>sanlam maroc</p>
                    </div>
                  </div>
                  <div className='bg-slate-100 w-[170px] rounded-lg h-[220px] col-start-3 col-end-4 flex flex-col justify-center !px-5 gap-y-3'>
                      <div className='bg-red  h-[80px]'>
                      <img src={'/alten.png'} className='h-[80px] w-full rounded-lg'/>
                    </div>
                    <div className='bg-red h-[80px]'>
                      <p className='text-sm capitalize text-slate-900 text-center'>alten</p>
                    </div>
                  </div>
                  <div className='bg-slate-100 w-[170px] rounded-lg h-[220px] col-start-5 col-end-6 flex flex-col justify-center !px-5 gap-y-3'>
                      <div className='bg-red  h-[80px]'>
                      <BuildingOfficeIcon  className='h-[80px] text-slate-300 w-full rounded-lg'/>
                    </div>
                    <div className='bg-red h-[80px]'>
                      <p className='text-sm capitalize text-slate-900 text-center'>sanlam maroc</p>
                    </div>
                  </div>
             
        
               
                </div>      
          
              </div>  
             {/* CV section */}
            
              <div className='w-[30%]  h-[250px] bg-red !pl-5'>
                <div className='bg-purple h-[30px] flex justify-start'>
                  <p className='text-sm text-slate-500 uppercase'>mon cv</p>
                </div>
                <div className='bg-yellow w-full h-[220px] flex justify-center items-center '>
                  <div className='[200px] w-full flex flex-col items-center justify-center gap-y-5'>
                    <div className=' bg-blue-300 h-[100px] w-[100px] flex justify-center items-center rounded-full'>
                      <DocumentIcon className='w-12 h-12 font-bold text-blue-500'/> 

                    </div>
                    <div className='flex flex-col w-full gap-y-1'>
                      {
                          !internProfile?.cv_path?
                      <div className='bg-white w-full !py-2.5 text-black !px-10 rounded-md flex justify-center items-center gap-x-2 border-gray-200 border-2 cursor-pointer'>
                        <XMarkIcon className='w-6 h-6 font-bold'/> 
                        <p className='text-sm font-semibold capitalize'>aucun CV trouvé</p>
                        </div>
                        :
                         <Link to={`http://127.0.0.1:8000/storage/${internProfile?.cv_path}`} className='bg-white w-full !py-2.5 text-black !px-10 rounded-md flex justify-center items-center gap-x-2 border-gray-200 border-2 cursor-pointer'>
                        <EyeIcon className='w-6 h-6 font-bold'/> 
                        <p className='text-sm font-semibold capitalize'>voir mon <span className='uppercase'> cv</span></p>
                        </Link>

                      }
                      <form ref={formRef} onSubmit={(e)=>handleSubmit(e)} onClick={()=>inputFileRef.current.click()} className='bg-blue-500 w-full !py-2.5 text-white !px-10 rounded-md flex justify-center items-center gap-x-2 border-gray-200 border-2 cursor-pointer'>
                        
                         {
                          Loading?(
                            <>
                            <p className='text-sm font-semibold capitalize'>téléchargement...</p>
                             <Spinner/>
                            </>
                          )
                          :
                          <>
                          <ArrowUpTrayIcon className='w-6 h-6 font-bold'/> 
                          <p className='text-sm font-semibold capitalize'>nouveau <span className='uppercase'> cv</span></p>


                          <input ref={inputFileRef} type="file" hidden  onChange={handleFileChange} />
                          </>
                         }
                           
                        
                      </form>
                     </div>
                  </div>
            
        
               
                </div>                    

              
              </div>              
            </div>  
          
          </div>
    </>
  )
}
