import React, { useState,useEffect } from 'react'
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
  PencilIcon,
  FlagIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowLeftIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Link, useParams } from 'react-router-dom';
import axios from "axios"
import { internshi_durations, remuneration, targeted_internship } from '../constants';
import DataLoadingSpinner from '../DataLoadingSpinner';
import Spinner from "../../Spinner"
export default function UpdateInternshipOffer() {
   const {id}=useParams();
   //get the internship details
    const [isVisible,setIsVisible]=useState(false);
    const [isOpen,setIsOpen]=useState(false);
    const [notification,setNotification]=useState(false);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = sessionStorage.getItem('token');
    const [DataLoading,setDataLoading]=useState(true)
    const [Loading,setLoading]=useState(false)
    const [educationlevel,setEducationLevel]=useState([]);
    const [specialties,setSpecialties]=useState([]);
    const [cities,setCities]=useState([]);
    const [originalStatus, setOriginalStatus] = useState('');

     const [formData, setFormData] = useState({
     status:'', 
     title: '',
     type: '',
     contract: 'stage fin étude',
     start_date: '', // format 'YYYY-MM-DD'
     duration: '1 mois',
     remuneration: '0 dh',
     availability: 'temps_plein',
     profile_count: 1,
     description: '',
     specialty_id: '', // à remplir avec les options disponibles dans un <select>
     specialty: '', // à remplir avec les options disponibles dans un <select>
     city_id: '',      // idem
     city: '',      // idem
         });
    //retrieve the internship by id
    useEffect(()=>{
      axios.get(`http://127.0.0.1:8000/api/internship/details/${id}`,{ headers:{ Authorization:`bearer ${token}`}}).then(res=>{
      const internship = res.data.internship;
      console.log(internship)
      setOriginalStatus(internship.status)

      setFormData({
        id:internship.id,
        title: internship.title ,
        type: internship.type ,
        contract: internship.contract ,
        start_date: internship.start_date ,
        duration: internship.duration ,
        remuneration: internship.remuneration ,
        availability: internship.availability ,
        profile_count: internship.profile_count,
        description: internship.description ,
        specialty_id: internship.specialty_id ,
        specialty: internship.specialty?.name , // if loaded with relationship
        city_id: internship.city_id ,
        city: internship.city?.name ,           // if loaded with relationship
        enterprise_id: internship.enterprise_id ,
        user_id: user.id ,
        status:internship.status
      } )
        setDataLoading(false)
      })

    .catch(err=>console.log(err))
    },[])
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/education_level',{ headers:{ Authorization:`bearer ${token}`}}).then(res=>setEducationLevel(res.data)).catch(err=>console.log(err))
        axios.get('http://127.0.0.1:8000/api/specialties',{ headers:{ Authorization:`bearer ${token}`}}).then(res=>setSpecialties(res.data)).catch(err=>console.log(err))
        axios.get('http://127.0.0.1:8000/api/cities',{ headers:{ Authorization:`bearer ${token}`}}).then(res=>setCities(res.data)).catch(err=>console.log(err))
      },[])

   
    const HandleChange=(e)=>{
      const {name,value}=e.target;
      setFormData({
        ...formData,[name]:value
      })
    }

      const IfNotification=()=>{
         
            setNotification(true)
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
      const OpenPopUp=()=>{
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData.status)
    const form = new FormData();
    form.append('_method','patch')
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    axios.post('http://127.0.0.1:8000/api/internship/update', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('Success:', res.data);
        setNotification(true)
        setLoading(false)
        
      })
      .catch((err) => {
        console.error('Error:', err.response?.data || err.message);
        setLoading(false)
      });
  };

    
  const text_input_style='text-sm  !p-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none'
  const select_input_style='!p-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-sm capitalize'


  return (
    <div className='flex flex-col min-h-[600px] h-auto gap-y-3  border-blue rounded-lg'>
         {/* notification */}
          <div className={`fixed right-0 top-0 w-[30%] z-50 h-auto flex justify-end transition-all duration-500 ease-in-out
            ${notification ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
                        <div className={ 'bg-white  w-[80%] h-[75px] border-1 border-gray-200 rounded-lg relative right-4 top-4 shadow-md flex items-center justify-between !p-3 gap-x-2 transition-opacity duration-300 '}>
                          
                          <div className='flex items-center gap-x-2 '>
        
                            <CheckCircleIcon className='w-7 h-7 text-green-400 relative bottom-2'/>
                            <div className='flex flex-col gapy-y-2'>
                                <div className='first-letter:capitalize font-bold text-sm text-black'>Le stage est mis à jour</div>
                                <div className='text-[12px] first-letter:capitalize text-slate-500'>Les données du stage ont été mises à jour avec succès</div>
                            </div>
                          </div>
                            
                          <div className='flex items-center gap-x-2 '>
        
                            <XMarkIcon onClick={()=>CloseNotification()} className='w-6 h-6 text-slate-500 relative bottom-2 font-bold'/>
                            
                          </div>
        
                        </div>
          </div>
        <div className='bg-gray-200 rounded-lg w-full h-auto !py-2 flex justify-between items-center !px-5 gap-x-1'>
            <div className='flex justify-start items-center gap-x-3'>
                <Link to={'/recruteur/dashboard/offres-stage/'}>
              <div className='bg-white h-[40px] w-[55px] border-1 border-gray-300 rounded-lg flex justify-center items-center transition-all duration-100 hover:bg-gray-100'>
                 <ArrowLeftIcon className='w-5 h-5 text-slate-500'/>

              </div>
                </Link>
               <div className={`text-2xl text-blue-500 font-semibold uppercase w-full bg-blue h-[100%] ${DataLoading && 'flex gap-x-2'}`}><span>mettre à jour le stage</span> 

                {DataLoading ? <DataLoadingSpinner/>: <span> {formData.title}</span>}
                </div>
            </div>
            
           
        </div>
        <div className='bg-white border-1 rounded-lg  border-gray-300 h-auto min-h-[80%] w-full flex flex-col shadow-md'>
            <form onSubmit={handleSubmit} className=''>
                <div className='grid grid-cols-6 w-full h-auto gap-4 !p-5'>
                    <div className='col-span-3 flex gap-x-3'>
                        <label className='text-sm capitalize'>type <span className='text-red-500'>*</span> </label>
                        <div className='flex gap-x-3'>
                            <div className="flex items-center gap-x-2">
                                     <input onChange={HandleChange}  type="radio" name="type"  id="onsite" value='onsite'  className="peer hidden" checked={formData.type==='onsite'}  />
                                     <label  htmlFor="onsite"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >
                                     </label>
                                     <span className="text-sm font-medium">Sur Site (En société)</span>
                            </div>
                             <div className="flex items-center gap-x-2">
                                     <input onChange={HandleChange}   type="radio" name="type"  id="remote" value='remote'  className="peer hidden"  checked={formData.type==='remote'} />
                                     <label  htmlFor="remote"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >

                                     </label>
                                     <span className="text-sm font-medium">À distance</span>
                             </div> 
                             <div className="flex items-center gap-x-2">
                                     <input onChange={HandleChange}   type="radio" name="type"  id="hybrid" value='hybrid'  className="peer hidden"   checked={formData.type==='hybrid'}/>
                                     <label  htmlFor="hybrid"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >

                                     </label>
                                     <span className="text-sm font-medium">hybrid</span>
                             </div>
                        </div>
                    </div>
                    <div className='col-span-4 flex flex-col gap-y-1  bg-purple '>
                        <label  className='text-sm capitalize'>Titre <span className='text-red-500'>*</span> </label>
                        <input required onChange={HandleChange}  value={formData.title} name='title' type='text' className={text_input_style}/>
                    </div>
                    <div className='col-span-2 flex  flex-col gap-y-1 bg-purple   '>
                        <label className='text-sm capitalize'>Profils <span className='text-red-500'>*</span> </label>
                        <div className='w-full flex items-center gap-x-3'>
                           <input required onChange={HandleChange}  value={formData.profile_count} name='profile_count' type="number" className={text_input_style}/>
                           <UserIcon className='w-6 h-6 text-blue-500'/>
                        </div>
                    </div>
                    <div className='col-span-2 flex flex-col gap-y-1  bg-purple '>
                        <label className='text-sm capitalize'>Spécialit <span className='text-red-500'>*</span> </label>
                        <select required value={formData.specialty_id} name='specialty_id' onChange={HandleChange} className={select_input_style}>
                          <option value="">sélectionnez une option</option>
                          {
                            specialties.map(e=>{
                              return (
                                <option key={e.id} value={e.id}>{e.specialite}</option>
                              )
                            })
                          }
                          
                        </select>
                    </div>
                    <div className='col-span-2 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>ville <span className='text-red-500'>*</span> </label>
                        <select required  onChange={HandleChange}  value={formData.city_id} name='city_id' className={select_input_style}>
                          <option value="">sélectionnez une option</option>
                           {
                            cities.map(e=>{
                              return (
                                <option key={e.id} value={e.id}>{e.name}</option>
                              )
                            })
                          }
                        </select>
                    </div>
                    <div className='col-span-2 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>contrat <span className='text-red-500'>*</span> </label>
                        <select required onChange={HandleChange}  value={formData.contract}  name='contract'  className={select_input_style}>
                          <option  value="">sélectionnez une option</option>
                           {
                            targeted_internship.map((e,index)=>{
                              return (
                                <option key={index} value={e.value}>{e.internship}</option>
                              )
                            })
                          }
                          
                        </select>
                    </div>
                    <div className='col-span-2 flex flex-col gap-y-1 bg-purple  '>
                      
                        <label className='text-sm capitalize'>Démarrage<span className='text-red-500'>*</span> </label>
                        <input required  onChange={HandleChange}  value={formData.start_date} name='start_date' type='date' className={text_input_style}/>
                         
                    </div>
                    <div className='col-span-2 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>Durée <span className='text-red-500'>*</span> </label>
                        <select required onChange={HandleChange}  value={formData.duration} name='duration' className={select_input_style}>
                          <option value="">sélectionnez une option</option>
                           {
                            internshi_durations.map((e,index)=>{
                              return (
                                <option key={index} value={e.value}>{e.duration}</option>
                              )
                            })
                          }
                      
                        </select>
                    </div>
                    <div className='col-span-2 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>Rémunération <span className='text-red-500'>*</span> </label>
                        <select required onChange={HandleChange}  value={formData.remuneration} name='remuneration' type='text' className={select_input_style}>
                          <option value="">sélectionnez une option</option>
                           {
                            remuneration.map((e,index)=>{
                              return (
                                <option key={index} value={e.value}>{e.remuneration}</option>
                              )
                            })
                          }
                          
                        </select>
                    </div>
                    <div className='col-span-6 flex flex-col gap-y-3'>
                        <label className='text-sm capitalize'>type <span className='text-red-500'>*</span> </label>
                        <div className='flex flex-col gap-y-3'>
                            <div className="flex items-center gap-x-2">
                                     <input   type="radio" name="availability" value="fulltime" onChange={HandleChange} checked={formData.availability==='fulltime'}   id="fulltime"  className="peer hidden"  />
                                     <label  htmlFor="fulltime"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >
                                     </label>
                                     <span className="text-sm font-medium capitalize">Temps plein</span>
                            </div>
                             <div className="flex items-center gap-x-2">
                                     <input   type="radio" name="availability"  id="parttime" value='parttime'  onChange={HandleChange} checked={formData.availability==='parttime'}   className="peer hidden"  />
                                     <label  htmlFor="parttime"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >

                                     </label>
                                     <span className="text-sm font-medium">Temps partiel</span>
                             </div> 
                          
                        </div>
                    </div>
                    <div className='col-span-6 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>offre de stage <span className='text-red-500'>*</span> </label>
                        <textarea required  value={formData.description} onChange={HandleChange} name='description' rows='6'  className={text_input_style} />                        
                        
                    </div>
                       <div className='col-span-3 flex flex-col gap-y-3'>
                          <div className="text-sm font-medium first-letter:capitalize">Le stage est-il expiré ?</div>

                            <div className="flex items-center gap-x-2">
                              {
                                originalStatus!=='declined' &&(
<>

                                  <div className="flex items-center gap-x-2">
                                     <input   type="radio" name="status" value="expired" onChange={HandleChange} checked={formData.status==='expired'}   id="expired"  className="peer hidden"  />
                                     <label  htmlFor="expired"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >
                                     </label>
                                     <span className="text-sm font-medium capitalize">oui</span>
                                   </div>
                                      <div className="flex items-center gap-x-2">
                                     <input   type="radio" name="status" value="published" onChange={HandleChange} checked={formData.status==="published"}   id="published"  className="peer hidden"  />
                                     <label  htmlFor="published"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >
                                     </label>
                                     <span className="text-sm font-medium capitalize">non</span>
                                   </div>
                                    </>
                                )
                              }
                             </div>                                                
                           </div>
                       </div>
                 <div className={`col-span-6 flex justify-end w-full gap-x-3  bottom-0 !px-5 !py-4 right-0 h-auto bg-slate-200 `}>
                   <button type='reset'  className='text-black text-sm bg-white flex justify-center items-center capitalize !py-3 !px-4 rounded-lg  transition-all duration-100  hover:bg-gray-100 ' onClick={()=>ClosePopUp()}>annuler</button>
                   <button type='submit' className={`text-sm bg-blue-500 flex justify-center items-center capitalize !py-3 !px-4 rounded-lg text-white hover:bg-blue-400 transition-all duration-100 ${Loading && 'flex gap-x-2'}`}>
                    {Loading && <Spinner/>}
                    
                    <span>enregistrer</span>  
                    </button>
                  </div>
                
            </form>

         

        </div>
       
    </div>
  )
}
