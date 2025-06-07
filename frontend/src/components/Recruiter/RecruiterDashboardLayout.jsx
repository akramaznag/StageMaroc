import React from 'react'
import { Outlet } from 'react-router-dom'

export default function RecruiterDashboardLayout() {
  return (
    <div className='col-start-2 col-end-5 h-auto flex flex-col gap-y-5'>
      <Outlet/>
    </div>
  )
}
