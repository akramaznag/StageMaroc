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
export default function InternProfileUpdate() {

  return (
    <div className='flex flex-col h-[600px] gap-y-3  border-blue rounded-lg'>
        <div className='bg-gray-200 rounded-lg w-full h-[10%]  flex justify-center items-center !px-5 gap-x-1'>
            <div className='text-2xl text-blue-500 font-semibold uppercase w-1/3 bg-blue h-[100%] flex justify-start items-center'>modefier de profil</div>
            <div className='text-2xl text-slate-400 uppercase font-semibold  w-1/3 bg-blue h-[100%] flex justify-end items-center'>score de profil:  <span className='text-2xl font-semibold !mr-1 text-green-500'> 7</span > <span className='text-2xl font-semibold '>/10</span></div>
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
                                     <input   type="radio" name="type"  id="etudiant"  className="peer hidden"  />
                                     <label  htmlFor="etudiant"   className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >

                                     </label>
                                     <span className="text-sm font-medium">Étudiant</span>
                                 </div>
                                   <div className="flex items-center gap-x-2">
                                     <input   type="radio" name="type"  id="laureat"  className="peer hidden"  />
                                     <label  htmlFor="laureat"    className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:ring-offset-1 cursor-pointer transition" >

                                     </label>
                                     <span className="text-sm font-medium">Laureat</span>
                                 </div>
                             
                             

                            </div>
                           <div className='bg-green h-auto w-full'>
                                 <div className="flex flex-col gap-y-2 ">
                                      <label className='text-sm capitalize'>ecole <span className='text-red-500'>*</span> </label>
                                      <input type='text' className='!p-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none'/>
                                    
                                 </div>
                                  
                             
                             

                            </div>
                             <div className='bg-green h-auto w-full'>
                                <div className="flex flex-col gap-y-2 ">
                                    <label className='text-sm capitalize'>niveau <span className='text-red-500'>*</span> </label>      
                                    <select className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' >
                                        <option value="" disabled selected hidden>Sélectionnez une option</option>
                                         <option value="">bac </option>
                                         <option value="">bac+2 </option>
                                         <option value="">bac+3</option>
                                         <option value="">bac+5</option>
                                    </select>
                                    
                                </div>
                             </div>
                             <div className='bg-green h-auto w-full'>
                                 <div className="flex flex-col gap-y-2 ">
                                      <label className='text-sm capitalize'>Spécialité <span className='text-red-500'>*</span> </label>
                                      <select className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' >
                                        <option value="" disabled selected hidden>Sélectionnez une option</option>
                                        <option value="">bac </option>
                                        <option value="">bac </option>
                                        <option value="">bac </option>
                                        <option value="">bac </option>
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
                                      <textarea type='text' rows='5' className='!p-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none'/>
                                    
                                 </div>
                                  
                             
                             

                            </div>
                             <div className='bg-green h-auto w-full'>
                                <div className="flex flex-col gap-y-2 ">
                                    <label className='text-sm capitalize'>téléphone <span className='text-red-500'>*</span> </label>      
                                    <input type='text' className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' />
                                       
                                    
                                    
                                </div>
                             </div>
                             <div className='bg-green h-auto w-full'>
                                 <div className="flex flex-col gap-y-2 ">
                                      <label className='text-sm capitalize'>cv <span className='text-red-500'>*</span> </label>
                                      <input type='file' className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' />

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
                                      <select className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' >
                                        <option value="" disabled selected hidden>Sélectionnez une option</option>
                                         <option value="">bac </option>
                                         <option value="">bac+2 </option>
                                         <option value="">bac+3</option>
                                         <option value="">bac+5</option>
                                      </select>                                    
                                 </div>

                            </div>
                             <div className='bg-green h-auto w-full'>
                                <div className="flex flex-col gap-y-2 ">
                                    <label className='text-sm capitalize'>ville <span className='text-red-500'>*</span> </label>      
                                    <select className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' >
                                        <option value="" disabled selected hidden>Sélectionnez une option</option>
                                         <option value="">bac </option>
                                         <option value="">bac+2 </option>
                                         <option value="">bac+3</option>
                                         <option value="">bac+5</option>
                                    </select>
                                    
                                </div>
                             </div>
                             <div className='bg-green h-auto w-full'>
                                 <div className="flex flex-col gap-y-2 ">
                                      <label className='text-sm capitalize'>Disponible à partir du <span className='text-red-500'>*</span> </label>
                                      <input   value={new Date().toISOString().split("T")[0]} type='date' className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' />
                                      
                                 </div>
                            </div>       
                             <div className='bg-green h-auto w-full'>
                                 <div className="flex flex-col gap-y-2 ">
                                      <label className='text-sm capitalize'>Durée  <span className='text-red-500'>*</span> </label>
                                      <select className='bg-white border-2 !py-2.5 !px-2 rounded-lg w-full text-sm   border-gray-300 focus:border-blue-500 focus:outline-none' >
                                        <option value="" disabled selected hidden>Sélectionnez une option</option>
                                        <option value="">bac </option>
                                        <option value="">bac </option>
                                        <option value="">bac </option>
                                        <option value="">bac </option>
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
