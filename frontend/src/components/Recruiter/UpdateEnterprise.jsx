import React, { useState,useEffect, useRef } from 'react'

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
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import axios, { Axios } from 'axios';
import DataLoadingSpinner from '../DataLoadingSpinner';
import Spinner from "../../Spinner"
export default function UpdateEnterprise() {
    const [isVisible,setIsVisible]=useState(false);
    const [isOpen,setIsOpen]=useState(false)
    const [notification,setNotification]=useState(false);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = sessionStorage.getItem('token');
    const [DataLoading,setDataLoading]=useState(true);
    const [Loading,SetLoading]=useState(false);
    const [cities,setCities]=useState([])
    const [sectors,setSectors]=useState([])
    const fileInputRef = useRef()
    const navigate=useNavigate()
    const [formData, setFormdata] = useState({
      user_id:'',
      enterprise_name: '---',
      foundation_year: '--',      // e.g., '2020'
      country: '-',
      office_city:'',
      office_city_id: '---',
      sector:'',       // ID for city
      sector_id: '---',            // ID for sector
      enterprise_type: '---',          // 'private', 'half_public', or 'public'
      description: '---',
      website: '---',
      linkedin: '---',
      facebook: '--',
      photo:''
    });
    const HandleChange=(e)=>{
      const {name,value}=e.target;
      setFormdata({
        ...formData,[name]:value
      })
    }
    useEffect(()=>{
       axios.get("http://127.0.0.1:8000/api/enterprise/",{
            headers:{
                Authorization:`bearer ${token}`,
            }}).
      then(res=>{ 
        setDataLoading(false)
        setFormdata({
          user_id: res.data.enterprise.user_id || '',
          enterprise_name: res.data.enterprise.enterprise_name || '',
          foundation_year: res.data.enterprise.foundation_year || '',
          country: res.data.enterprise.country || '',
          office_city_id: res.data.enterprise.office_city_id || '',
          office_city:res.data.enterprise.office_city,
          sector_id: res.data.enterprise.sector_id || '',
          sector: res.data.enterprise.sector || '',
          enterprise_type: res.data.enterprise.type || '',
          description: res.data.enterprise.description || '',
          website: res.data.enterprise.website || '',
          linkedin: res.data.enterprise.linkedin || '',
          facebook: res.data.enterprise.facebook || '',
          photo:res.data.enterprise?.photo
        });

     

        }).catch(err=>console.log(err))
    },
    [])
   
    //cities api
     useEffect(()=>{
       axios.get("http://127.0.0.1:8000/api/cities/",{
            headers:{
                Authorization:`bearer ${token}`,
            }}).
      then(res=>{ 
        setDataLoading(false)
        setCities(res.data)

      

     

        }).catch(err=>console.log(err))
    },
    [])

    //sectors api
       useEffect(()=>{
       axios.get("http://127.0.0.1:8000/api/sectors/",{
            headers:{
                Authorization:`bearer ${token}`,
            }}).
      then(res=>{ 
        setDataLoading(false)
        setSectors(res.data)

      

     

        }).catch(err=>console.log(err))
    },
    [])




    
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


 const handleFileChange = (e) => {
        setFormdata(prev => ({ ...prev, photo: e.target.files[0] }));
    };
const handleRemovePhoto=()=>{
    setFormdata({ ...formData, photo: '' });
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the file input
        }
}

 const HandleSubmit=(e)=>{
    e.preventDefault();
    SetLoading(true)
    console.log(formData)
    const form=new FormData();
    form.append("_method","PATCH")
     // Append all formData fields to FormData object
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    
      axios.post(`http://127.0.0.1:8000/api/enterprise/update`,form,
        {
            headers:{
                Authorization:`bearer ${token}`,
                "Content-Type": "multipart/form-data"       

            }
        }).then(res=>{
            SetLoading(false)
            setNotification(true)
            setIsOpen(false)
            console.log(res.data)
             setFormdata({
       
          enterprise_name: res.data.enterprise.enterprise_name || '---',
          foundation_year: res.data.enterprise.foundation_year || '---',
          country: res.data.enterprise.country || '---',
          office_city_id: res.data.enterprise.office_city_id || '---',
          office_city: res.data.enterprise.office_city || '---',
          sector_id: res.data.enterprise.sector_id || '---',
          sector: res.data.enterprise.sector || '---',
          enterprise_type: res.data.enterprise.type || '---',
          description: res.data.enterprise.description || '---',
          website: res.data.enterprise.website || '---',
          linkedin: res.data.enterprise.linkedin || '---',
          facebook: res.data.enterprise.facebook || '---',
          photo:res.data.enterprise?.photo
        });
        }).catch(err=>console.log(err))
    
  }
  const ViewPhoto=(e)=>{
    const path=e.target.src
    window.location=path
  }
    
  let text_input_style='text-sm  !p-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none'
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
                                <div className='first-letter:capitalize font-bold text-sm text-black'>l'Enterprise a été modifiée</div>
                                <div className='text-[12px] first-letter:capitalize text-slate-500'>l'Enterprise a été modifiéeuccess</div>
                            </div>
                          </div>
                            
                          <div className='flex items-center gap-x-2 '>
        
                            <XMarkIcon onClick={()=>CloseNotification()} className='w-6 h-6 text-slate-500 relative bottom-2 font-bold'/>
                           
                          </div>
        
                        </div>
            </div>
        <div className='bg-gray-200 rounded-lg w-full h-auto !py-2 flex justify-between items-center !px-5 gap-x-1'>
            <div className={`text-2xl text-blue-500 font-semibold uppercase w-1/3 bg-blue h-[100%] flex justify-start items-center ${DataLoading && 'gap-x-3'}`}>
           <span> Mon entreprise</span>
           {DataLoading && <DataLoadingSpinner/>}
            </div>
            <div className='w-1/3 h-[100%] flex justify-end items-center'>
            <div className='flex justify-end items-center gap-x-2 border-slate-400 border-1 outline-none !p-2  rounded-lg bg-blue-500 hover:bg-blue-600 cursor-pointer' onClick={()=>OpenPopUp()}> 
                <PencilIcon className='w-5 h-5 text-white'/>
               <div className='text-white text-sm capitalize'>modefier l'entreprise</div>
            </div>
        </div>
           
        </div>
        <div className='bg-yellow h-auto min-h-[80%] w-full flex flex-col shadow-md'>
            <div className='w-full h-[30%] bg-gray-200 '>
                {/* enterprise picture */}
                <div className='w-full h-[100%] flex items-end justify-center'>

                <div className='bg-white  h-[130px] w-[130px] rounded-full shadow-md relative top-[50px] flex justify-center items-center'>
                    {formData.photo ? (
                          formData.photo instanceof File ? (
                            
                            <img
                            onClick={ViewPhoto}
                            
                              src={URL.createObjectURL(formData.photo)}
                              alt="Preview"
                              className='w-[85%] h-[85%] rounded-full object-cover'
                            />
                          ) : (
                            <img
                            onClick={ViewPhoto}
                              src={`http://127.0.0.1:8000/storage/${formData.photo}`}
                              alt="From DB"
                              className='w-[85%] h-[85%] rounded-full object-cover'
                            />
                          )
                        ) : (
                          <div className='bg-slate-200 shadow-lg flex justify-center items-center w-[90px] h-[90px] rounded-full'>
                            <BuildingOfficeIcon className='text-slate-500 w-[80%] h-[40%]' />
                          </div>
                        )}

                </div>
                </div>
            </div>
            <div className='w-full  h-auto bg-white'>
                <div className='flex  bg-green w-full  h-auto '>
                    <div className='bg-red w-1/2 !p-10 flex flex-col gap-y-7'>
                       <div>
                          <div  className='font-bold text-sm first-letter:capitalize text-slate-500'>nom de l'entreprise</div>
                          <div className='uppercase text-blue-500 text-xl font-bold'>{formData.enterprise_name}</div>
                       </div>
                       <div className='flex gap-5'>
                         <div className='flex flex-col gap-y-1'>
                            <div className='font-bold text-sm first-letter:capitalize text-slate-500'>Pays d'origine</div>
                            <div className='flex gap-x-1 items-center'>
                                <FlagIcon className='w-5 h-5 text-slate-800'/>
                                <div className='capitalize'>{formData.country}</div>
                            </div>
                         </div>
                          <div className='flex flex-col gap-y-1'>
                            <div className='font-bold text-sm first-letter:capitalize text-slate-500'>fondé en</div>
                            <div className='flex gap-x-1 items-center'>
                                <CalendarIcon className='w-5 h-5 text-slate-800'/>
                                <div className=''>{formData.foundation_year}</div>
                            </div>
                         </div>
                       </div>
                        <div className='flex gap-5'>
                      
                          <div className='flex flex-col gap-y-1'>
                            <div className='font-bold text-sm first-letter:capitalize text-slate-500'>Bureau au Maroc</div>
                            <div className='flex gap-x-1 items-center'>
                                <MapPinIcon className='w-5 h-5 text-slate-800'/>
                                <div className='capitalize'>{formData.office_city}</div>
                            </div>
                         </div>
                       </div>
                        <div className='flex gap-5'>
                      
                          <div className='flex flex-col gap-y-1'>
                            <div className='font-bold text-sm first-letter:capitalize text-slate-500'>description</div>
                            <p className='first-letter:capitalize w-[90%] text-justify'>{formData.description}</p>
                         </div>
                       </div>
                      
                    </div>
                    <div className='bg-red w-1/2 !py-10 !pl-12 flex flex-col gap-y-7'>
                       <div>
                          <div  className='font-bold text-sm first-letter:capitalize text-slate-500'>secteur</div>
                           <div className='flex gap-x-1 items-center'>
                                <BriefcaseIcon className='w-5 h-5 text-slate-800'/>
                                <div className='capitalize'>{formData.sector}</div>
                            </div>
                       </div>
                       <div className='flex gap-5'>
                         <div className='flex flex-col gap-y-1'>
                            <div className='font-bold text-sm first-letter:capitalize text-slate-500'>type</div>
                            <div className='flex gap-x-1 items-center'>
                                <BuildingOfficeIcon className='w-5 h-5 text-slate-800'/>
                                <div className='first-letter:capitalize'>{
                                formData.enterprise_type==='private'?'prive':
                                formData.enterprise_type==='half_public'?'semi public':'public'
                                }</div>
                            </div>
                         </div>
                        
                       </div>
                        <div className='flex gap-5'>
                      
                          <div className='flex flex-col gap-y-1'>
                            <div className='font-bold text-sm first-letter:capitalize text-slate-500'>Site internet</div>
                            <div className='flex gap-x-1 items-center'>
                                <GlobeAltIcon className='w-5 h-5 text-slate-800'/>
                                <Link className='lowercase text-sm' to={formData.website}>{formData.website}</Link>
                            </div>
                         </div>
                       </div>
                         <div className='flex flex-col gap-5'>
                         <div className='flex flex-col gap-y-1'>
                            <div className='font-bold text-sm first-letter:capitalize text-slate-500'>linkedin</div>                        
                               <div className='capitalize'>{formData.linkedin}</div>                          
                         </div>
                          <div className='flex flex-col gap-y-1'>
                            <div className='font-bold text-sm first-letter:capitalize text-slate-500'>facebook</div>                      
                                <Link className='text-blue underline' to={formData.facebook}>{formData.facebook}</Link>                           
                         </div>
                       </div>
                      
                    </div>

                </div>
            </div>

        </div>
        {/* popup */}
          {/* apply popup */}
             {isOpen && (
          <div className={`fixed inset-0 z-[60] flex justify-center items-center bg-black/50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} >
            {/* Popup Container */}
            <div className="bg-white w-[50%]  min-h-[97%] h-auto rounded-xl shadow-lg !p-5 relative z-[70] flex flex-col">
                <h3 className='text-lg capitalize font-semibold !mb-3'>Modifier l'Entreprise</h3>
                <form onSubmit={HandleSubmit} className='w-full '>
                   <div className='grid grid-cols-8 w-full h-auto gap-4'>
                     {/*  type */}
                      <div className='col-span-3 flex flex-col gap-y-1  bg-purple '>
                        <label className='text-sm capitalize'>nom entreprise <span className='text-red-500'>*</span> </label>
                        <input name='enterprise_name' value={formData.enterprise_name} onChange={HandleChange} type='text' className={text_input_style}/>
                      </div>
                      <div className='col-span-1 flex  flex-col gap-y-1 bg-purple   '>
                        <label className='text-sm capitalize'>Fondé en <span className='text-red-500'>*</span> </label>
                        <input name='foundation_year' value={formData.foundation_year} onChange={HandleChange} type='text' className={text_input_style}/>
                      </div>
                      <div className='col-span-2 flex flex-col gap-y-1  bg-purple '>
                        <label className='text-sm capitalize'>Pays d'origine <span className='text-red-500'>*</span> </label>
                        <select name='country' value={formData.country} onChange={HandleChange} className={select_input_style}>
                       
                          <option value="maroc">maroc</option>
                        </select>
                      </div>
                      <div className='col-span-2 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>Bureau au Maroc <span className='text-red-500'>*</span> </label>
                        <select name='office_city_id' value={formData.office_city_id} onChange={HandleChange} type='text' className={select_input_style}>
                          <option value=""></option>
                           {cities.map(city=>{
                            return(
                              <option key={city.id} value={city.id}>{city.name}</option>
                            )
                           })}
                        </select>
                      </div>
                      <div className='col-span-8 flex gap-x-3'>
                        <label className='text-sm capitalize'>type <span className='text-red-500'>*</span> </label>
                        <div className='flex gap-x-3'>
                            <div className="flex items-center gap-x-2">
                                     <input   type="radio" name="enterprise_type"  id="private"  value="private" checked={formData.enterprise_type==="private"} onChange={HandleChange} className="peer hidden"  />
                                     <label  htmlFor="private"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >
                                     </label>
                                     <span className="text-sm font-medium">prive</span>
                            </div>
                             <div className="flex items-center gap-x-2">
                                     <input   type="radio" name="enterprise_type"  id="public" value="public" checked={formData.enterprise_type==="public"} onChange={HandleChange} className="peer hidden"  />
                                     <label  htmlFor="public"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >

                                     </label>
                                     <span className="text-sm font-medium">public</span>
                             </div> 
                             <div className="flex items-center gap-x-2">
                                     <input   type="radio" name="enterprise_type"  id="halfpublic" value="half_public" checked={formData.enterprise_type==="half_public"} onChange={HandleChange} className="peer hidden"  />
                                     <label  htmlFor="halfpublic"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >

                                     </label>
                                     <span className="text-sm font-medium">semi-public</span>
                             </div>
                        </div>
                      </div>
                      <div className='col-span-8 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>Description <span className='text-red-500'>*</span> </label>
                        <textarea  name='description' onChange={HandleChange} value={formData.description} rows='6'  className={text_input_style} />                        
                        
                      </div>
                      <div className='col-span-4 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>secteur <span className='text-red-500'>*</span> </label>
                        <select onChange={HandleChange} name='sector_id' value={formData.sector_id} type='text' className={select_input_style}>
                          {
                            sectors.map(sector=>{
                              return(
                                <option key={sector.id} value={sector.id}>{sector.sector_name}</option>
                              )
                            })
                          }
                        </select>
                      </div>
                      <div className='col-span-4 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>site internet </label>
                        <input name='website' value={formData.website} onChange={HandleChange} type='text' className={text_input_style}/>

                      </div>
                      <div className='col-span-4 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>linkedin  </label>
                        <input name='linkedin' value={formData.linkedin} onChange={HandleChange} type='text' className={text_input_style}/>

                      </div>
                      <div className='col-span-4 flex flex-col gap-y-1 bg-purple  '>
                        <label className='text-sm capitalize'>facebook</label>
                        <input name='facebook' value={formData.facebook} onChange={HandleChange} type='text' className={text_input_style}/>

                      </div>
                      <div className='col-span-4 flex flex-col gap-y-1 bg-purple'>
                      <label className='text-sm capitalize'>photo</label>
                      
                      {/* Hidden File Input */}
                      <input
                        ref={fileInputRef}
                        type='file'
                        name='photo'
                        accept='image/*'
                        onChange={handleFileChange}
                        className='hidden'
                      />

                      {/* Conditional Display */}
                      {formData.photo ? (
                        formData.photo instanceof File ? (
                          <div className="flex justify-between items-center w-full">
                            <span className="text-blue-500 text-sm">
                              {formData.photo.name}
                            </span>
                            <XMarkIcon
                              className="w-6 h-6 text-gray-600 cursor-pointer"
                              onClick={handleRemovePhoto}
                            />
                          </div>
                        ) : (
                          <div className="!p-2 rounded-lg border-2 border-gray-300  focus:outline-none flex justify-between items-center w-full ">
                            <a
                              href={`http://127.0.0.1:8000/storage/${formData.photo}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline text-sm"
                            >
                              Voir la photo
                            </a>
                            <XMarkIcon
                              className="w-6 h-6 text-gray-600 cursor-pointer"
                              onClick={handleRemovePhoto}
                            />
                          </div>
                        )
                      ) : (
                        <div className={text_input_style}>
                          Aucune photo.{" "}
                          <span
                            className="underline cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Cliquez pour en ajouter une
                          </span>
                        </div>
                      )}
                                          </div>

                      {/* IMAGE PREVIEW */}
                      <div className='col-span-4 flex justify-center bg-purple'>
                        {formData.photo ? (
                          formData.photo instanceof File ? (
                            <img
                              src={URL.createObjectURL(formData.photo)}
                              alt="Preview"
                              className='w-[90px] h-[90px] rounded-full object-cover'
                            />
                          ) : (
                            <img
                              src={`http://127.0.0.1:8000/storage/${formData.photo}`}
                              alt="From DB"
                              className='w-[90px] h-[90px] rounded-full object-cover'
                            />
                          )
                        ) : (
                          <div className='bg-slate-200 shadow-lg flex justify-center items-center w-[90px] h-[90px] rounded-full'>
                            <BuildingOfficeIcon className='text-slate-500 w-[50px] h-[50px]' />
                          </div>
                        )}
                      </div>

                   </div>
                    <div className='flex justify-end w-full gap-x-3 absolute bottom-0 !px-5 !py-4 right-0 h-auto bg-slate-200 rounded-b-xl'>
                         <button type='reset'  className='text-black text-sm bg-white flex justify-center items-center capitalize !py-3 !px-4 rounded-lg  transition-all duration-100  hover:bg-gray-100 ' onClick={()=>ClosePopUp()}>annuler</button>
                         <button type='submit' className={`text-sm bg-blue-500 flex justify-center items-center capitalize !py-3 !px-4 rounded-lg text-white hover:bg-blue-400 transition-all duration-100 ${Loading && 'flex gap-x-2'}`}>
                         {Loading && <Spinner/> }
                         <span>enregistrer </span>
                          </button>
                    </div>
               </form>
             </div>
         </div>
         )}

    </div>
  )
}
