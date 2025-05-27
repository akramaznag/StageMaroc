import React from 'react'
import {CheckIcon,MapPinIcon,CloudIcon,BriefcaseIcon,DocumentIcon, ClockIcon,PencilSquareIcon,CheckCircleIcon,XMarkIcon} from '@heroicons/react/24/outline';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useState,useEffect ,useRef} from 'react';
export default function InternshipDetails() {
    const [isEditingFullName, setIsEditingFullName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingCity, setIsEditingCity] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [fullName, setFullName] = useState("user one");
    const [Email, setEmail] = useState("intern@gmail.com");
    const [City, setCity] = useState("casablanca");
    const [Phone, SetPhone] = useState("0674556521");



    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleIconClick = () => {
    fileInputRef.current.click(); // trigger hidden file input
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const defaultFileName = 'download.png';

    const [isOpen, setIsOpen] = useState(false);
    const [isVisible,setIsVisible]=useState(false);
    const [notification,setNotification]=useState(false)

    const [cvFile, setCvFile] = useState(null);
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


    const profile=[
        'Étudiant(e) en Finance ou tout autre domaine connexe',
        'Étudiant(e) en Finance ou tout autre domaine connexe',
        'Étudiant(e) en Finance ou tout autre domaine connexe',
    ]
    const OnSubmit=(e)=>{
        e.preventDefault()
        ClosePopUp()
        IfNotification()
    }

  return (
<div className='flex justify-center'>
      {/* Container wrapper */}
      <div className='!my-[130px]  w-[85%] '>
        <div className='bg-red h-auto  w-full flex gap-x-3 '>
            {/* notification */}
             <div className={`fixed right-0 top-0 w-[30%] h-auto flex justify-end transition-all duration-500 ease-in-out
    ${notification ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
                <div className={ 'bg-white  w-[80%] h-[75px] border-1 border-gray-200 rounded-lg relative right-4 top-4 shadow-md flex items-center justify-between !p-3 gap-x-2 transition-opacity duration-300 '}>
                  
                  <div className='flex items-center gap-x-2 '>

                    <CheckCircleIcon className='w-7 h-7 text-green-400 relative bottom-2'/>
                    <div className='flex flex-col gapy-y-2'>
                        <div className='first-letter:capitalize font-bold text-sm'>candidature envoyé</div>
                        <div className='text-[12px] first-letter:capitalize text-slate-500'>candidature envoyé avec success</div>
                    </div>
                  </div>
                    
                  <div className='flex items-center gap-x-2 '>

                    <XMarkIcon onClick={()=>CloseNotification()} className='w-6 h-6 text-slate-500 relative bottom-2 font-bold'/>
                   
                  </div>

                </div>
            </div>
            {/* apply popup */}
             {isOpen && (
                  <div    className={`fixed inset-0 z-[60] flex justify-center items-center bg-black/50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} >
                    {/* Popup Container */}
                    <div className="bg-white w-[40%]  h-[95%] rounded-xl shadow-lg px-6 py-8 relative z-[70] !p-5">
                        <div className='flex flex-col justify-between gap-y-2  items-start  !p-5 border-1 border-slate-300 rounded-lg !mb-3'>
                          <h3 className='font-semibold'> Stage Assitant(e) administratif(ive)</h3>
                          <div className='text-slate-400 text-sm '>
                           <span className='uppercase'> Sanlam</span> <span>-</span><span className='capitalize'>casablanca</span>
                            </div>

                        </div>
                        <div className='bg-red !p-5 h-auto w-full border-1 border-slate-300 rounded-lg' > 
                            <h1 className='text-lg capitalize font-semibold'>merci de verifier votre candidature</h1>
                            <form className='w-full flex flex-col gap-y-2' onSubmit={(e)=>OnSubmit(e)}>
                                <div className='flex flex-col gap-y-2 w-full'>
                                     <label className='text-sm capitalize text-slate-500'>le nom complet</label>
                                     <div className='w-full flex items-center gap-x-5'>

                                     <input onChange={(e)=>setFullName(e.target.value)} disabled={!isEditingFullName} value={fullName} type='text' className=' w-[100%] !p-2 rounded-sm border-2 border-gray-300 focus:border-blue-500 focus:outline-none' />

                                     <PencilSquareIcon onClick={()=>setIsEditingFullName(prev=>!prev)} className={`w-9 h-9 ${ isEditingFullName?'text-blue-500' :'text-black'}`}/> 
                                     </div>
                                </div>
                                <div className='flex flex-col gap-y-2 w-full'>
                                     <label className='text-sm capitalize text-slate-500'>email</label>
                                     <div className='w-full flex items-center gap-x-5'>

                                      <input  onChange={(e)=>setEmail(e.target.value)} disabled={!isEditingEmail} value={Email} type='email' className=' w-[100%] !p-2 rounded-sm border-2 border-gray-300 focus:border-blue-500 focus:outline-none' />

                                     <PencilSquareIcon onClick={()=>setIsEditingEmail(prev=>!prev)} className={`w-9 h-9 ${ isEditingEmail?'text-blue-500' :'text-black'}`}/> 
                                     </div>
                                </div>
                                  <div className='flex flex-col gap-y-2 w-full'>
                                     <label className='text-sm capitalize text-slate-500'>ville</label>
                                     <div className='w-full flex items-center gap-x-5'>

                                     <select  value={City} onChange={(e)=>setCity(e.target.value)} disabled={!isEditingCity} className=' w-[100%] !p-2 rounded-sm border-2 border-gray-300 focus:border-blue-500 focus:outline-none' >
                                        <option value="casablanca" >casablanca</option>
                                        <option value="rabat" >rabat</option>
                                        <option value="tanger" >tanger</option>
                                     </select>

                                     <PencilSquareIcon onClick={()=>setIsEditingCity(prev=>!prev)} className={`w-9 h-9 ${ isEditingCity?'text-blue-500' :'text-black'}`}/> 
                                     </div>
                                </div>
                                 <div className='flex flex-col gap-y-2 w-full'>
                                     <label className='text-sm capitalize text-slate-500'>téléphone</label>
                                     <div className='w-full flex items-center gap-x-5'>

                                     <input minLength="10" maxLength="10" disabled={!isEditingPhone} onChange={(e)=>SetPhone(e.target.value)} value={Phone} type='text' className=' w-[100%] !p-2 rounded-sm border-2 border-gray-300 focus:border-blue-500 focus:outline-none' />

                                     <PencilSquareIcon onClick={()=>setIsEditingPhone(prev=>!prev)} className={`w-9 h-9 ${ isEditingPhone?'text-blue-500' :'text-black'}`}/> 
                                     </div>
                                </div>
                              <div className='flex flex-col gap-y-2 w-full'>
                                     <label className='text-sm capitalize text-slate-500'>cv</label>
                                      <div className='flex items-center gap-x-5'>
                                        <div className='w-[100%] !px-2 !py-3 rounded-sm border-2 border-gray-300 flex items-center gap-x-5'>
                                            <DocumentIcon className='w-6 h-6 text-gray-600' />
                                            {
                                            file ?   (<a href={URL.createObjectURL(file)} download={file.name} className='text-blue-500'>{file.name}</a>): 
                                            (<a href={`/${defaultFileName}`} download className='text-blue-500'>{defaultFileName}</a>)
                                            }
                                        </div>
                                        <PencilSquareIcon    onClick={handleIconClick}  className='w-9 h-9 text-blue-500 cursor-pointer hover:text-blue-700'/>

                                         {/* Hidden file input */}
                                          <input type='file'  className='hidden'  ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.png,.jpg"/>
                                    </div>

                                </div>
                                <div className='flex justify-between w-full  h-auto !my-2'>
                                    <button type='reset'  className='bg-gray-400 flex justify-center items-center capitalize !py-3 !px-5 rounded-lg text-white transition-all duration-100' onClick={()=>ClosePopUp()}>annuler</button>
                                    <button type='submit' className='bg-blue-500 flex justify-center items-center capitalize !py-3 !px-5 rounded-lg text-white hover:bg-blue-400 transition-all duration-100'>envoyer</button>
                                </div>
                            </form>
                        </div>

                    
                    </div>
                 </div>
)}
            
            <div className='bg-white h-auto w-[70%] !px-3 flex flex-col gap-y-5 !py-5 rounded-xl shadow-md'>
                <div className='bg-blue h-[30%] flex justify-center items-start'>
                    <img src='/download.png' className='h-[80%] w-[30%] rounded-lg'/>
                 
                </div>

                <div className='bg-purple h-auto w-full flex flex-col gap-y-6'>
                    <h1 className='text-center text-2xl capitalize'>Stage Assitant(e) administratif(ive)</h1>
                    {/* internship details */}
                    <div className='flex flex-col items-center justify-center w-full gap-y-8'>
                        <div className='bg-gray w-[85%] flex justify-around '>
                            <div className='flex flex-col gap-y-2'>
                                <div className='text-sm flex items-center gap-x-1'><MapPinIcon className='w-6 h-6 text-slate-500'/> <span className='capitalize text-slate-500'>ville</span></div>
                                <div>casablanca</div>
                            </div>
                             <div  className='flex flex-col gap-y-2'>
                                <div className='text-sm flex items-center gap-x-1'><CloudIcon className='w-6 h-6 text-slate-500'/> <span className='capitalize text-slate-500'>Présence</span></div>
                                <div>sur site</div>
                            </div>
                             <div  className='flex flex-col gap-y-2'>
                                <div className='text-sm flex items-center gap-x-1'><BriefcaseIcon className='w-6 h-6 text-slate-500'/> <span className='capitalize text-slate-500'>Spécialité</span></div>
                                <div>finance</div>
                            </div>
                             <div  className='flex flex-col gap-y-2'>
                                <div className='text-sm flex items-center gap-x-1'><DocumentIcon className='w-6 h-6 text-slate-500'/> <span className='capitalize text-slate-500'>type</span></div>
                                <div>Stage Opérationnel</div>
                            </div>
                              <div  className='flex flex-col gap-y-2'>
                                <div className='text-sm flex items-center gap-x-1'><ClockIcon className='w-6 h-6 text-slate-500'/> <span className='capitalize text-slate-500'>Disponibilité</span></div>
                                <div>Temps plein</div>
                            </div>

                        </div>
                          <div className='bg-gray w-[80%] flex justify-around !px-15 '>
                           
                            
                             <div  className='flex flex-col gap-y-2'>
                                <div className='text-sm flex items-center gap-x-1'><BriefcaseIcon className='w-6 h-6 text-slate-400'/> <span className='capitalize text-slate-400'>Spécialité</span></div>
                                <div>finance</div>
                            </div>
                             <div  className='flex flex-col gap-y-2'>
                                <div className='text-sm flex items-center gap-x-1'><DocumentIcon className='w-6 h-6 text-slate-400'/> <span className='capitalize text-slate-400'>type</span></div>
                                <div>Stage Opérationnel</div>
                            </div>
                              <div  className='flex flex-col gap-y-2'>
                                <div className='text-sm flex items-center gap-x-1'><ClockIcon className='w-6 h-6 text-slate-400'/> <span className='capitalize text-slate-400'>Disponibilité</span></div>
                                <div>Temps plein</div>
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
                            <div className='w-full h-auto flex flex-col gap-y-5'>
                                {/* enterprise internship brief description */}
                                <div>
                                    <p className='w-full h-auto bg-amber capitalize'>
                                    E-CH, organisme privé spécialisé dans le secteur du Consulting/Management basé à Casablanca, est à la recherche d'un(e) stagiaire en Finance pour un stage opérationnel d'une durée de 3 à 6 mois.
                                    </p>
                                </div>
                                  {/* missions  */}
                                <div>
                                    <div className='!mb-5 capitalize'>missions :</div>
                                    <p className='w-full h-auto bg-amber-9 capitalize'>En tant qu'assistant(e) administratif(ive), vous serez amené(e) à assister l'équipe dans la gestion administrative quotidienne, la coordination des tâches et la réalisation de diverses missions liées au domaine de la finance.
                                    </p>
                                </div>
                                {/* profile  */}
                                <div>
                                    <div className='!mb-5 capitalize'>Profil recherché :</div>
                                    <ul className='w-full h-auto bg-amber-9 capitalize'>
                                        {
                                            profile.map((p,index)=>{
                                                return (
                                                    <li key={index} >{p}</li>
                                                )
                                            })
                                        }
                                        <li></li>
                                    </ul>
                                </div>
                                {/* call to action  */}
                                <div className='!mt-5'>
                                    <p className='w-full h-auto bg-amber-9'>Si vous êtes motivé(e), dynamique et que vous souhaitez acquérir une expérience enrichissante dans le domaine de la finance au sein d'une entreprise en pleine croissance, n'hésitez pas à postuler directement sur cette plateforme en envoyant votre CV et votre lettre de motivation.
                                    </p>
                                </div>
                                
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
            <div className='bg-green h-auto  w-[30%] flex items-center flex-col gap-y-5'>
                <div className='bg-white shadow-md w-[80%] h-[100%]  rounded-md flex flex-col gap-y-5 !p-8'>
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
                        <button onClick={() => OpenPopUp()}  className=' bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-600 w-full h-[70px] rounded-lg flex justify-center items-center uppercase font-bold text-white'>
                            <CheckIcon className='w-6 h-6'/>
                            <span className='!ml-1'>postuler</span>
                        </button>
                    </div>

                </div>
                <div className='bg-white  shadow-md w-[80%] h-[100%]  rounded-md flex flex-col gap-y-5 !p-8'>
                    <div className='w-full flex items-center gap-x-3'>
                        <img className='h-16 w-16 rounded-lg border-1 border-gray-400' src="/download.png" alt="" />
                        <div className='font-bold uppercase'>Sanlam</div>
                    </div>
                    <hr className="border-slate-200" />
                    <div className='w-full flex flex-col gap-y-2'>
                      <h3 className='uppercase text-md'> entreprise</h3>
                      <p className='first-letter:capitalize text-sm text-slate-800 w-full'>E-CH est une ESN qui accompagne ses clients ( Banques, télécoms, grands comptes) dans la digitalisat...</p>
                    </div>
                    <hr className="border-slate-200" />
                    <div className='flex flex-col gap-y-1'>
                            <div className='text-slate-400 capitalize text-sm'>Fondé en</div>
                            <div className='flex gap-x-1'> 
                                <span className='text-sm capitalize'>2016</span>
                            </div>
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <div className='text-slate-400 capitalize text-sm'>Pays</div>
                        <div className='flex gap-x-1'> 
                            <Icon icon="twemoji:flag-morocco" width="19" />
                            <span className='text-sm capitalize'>casablanca</span>
                         </div>
                    </div>

                    <div className='flex flex-col gap-y-1'>
                        <div className='text-slate-400 capitalize text-sm'>secteur</div>
                        <div className='flex gap-x-1'> 
                            <span className='text-sm capitalize'>Conseil/Stratégie/Management</span>
                         </div>
                    </div>

                     <div className='flex flex-col gap-y-1'>
                        <div className='text-slate-400 capitalize text-sm'>Bureau</div>
                        <div className='flex gap-x-1'> 
                            <MapPinIcon className='w-4 h-4 text-slate-400'/>
                            <span className='text-sm capitalize'>casablanca</span>
                         </div>
                    </div>


                </div>
            </div>
          
              

        </div>
      </div>
    </div>   )
}
