import React from 'react'
import Body from './Body'
import Header from './Header'
import Footer from './Footer'
export default function Container() {
  return (
    
<div className='min-h-screen  grid grid-rows-[auto_1fr_auto] grid-cols-10 overflow-y-scroll' >
    <Header/>
    <Body/>
    <Footer/>
  </div>  )
}
