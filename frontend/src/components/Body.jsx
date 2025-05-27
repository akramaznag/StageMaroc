import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Body() {
  return (
    <div className='col-start-1 col-end-11 row-start-2 row-end-3 p-4 bg-gray-100 w-full  h-auto' >
      <Outlet/>
    </div>
  )
}
