import React from 'react'
import Body from './Body'
import Header from './Header'
import Footer from './Footer'
import {  useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
export default function Container() {
  const navigate = useNavigate();
  const current_path=useLocation();


  useEffect(() => {
    if(current_path.pathname == '/'){

      navigate('/stages', { replace: true });
    }
  }, [navigate]);
  
  
  return (
    
<div className='min-h-screen  grid grid-rows-[auto_1fr_auto] grid-cols-10 overflow-y-scroll' >
    <Header/>
    <Body/>
    <Footer/>
  </div>  )
}
