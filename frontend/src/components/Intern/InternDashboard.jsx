// Importing necessary React components and icons
import React from 'react';
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
import DashboardLayout from './DashboardLayout';
import InternSideBar from './InternSideBar';

export default function InternDashboard() {
  return (
    <div className='flex justify-center'>
      {/* Container wrapper */}
      <div className='!my-[130px]  w-[85%] '>
        <div className='bg-red  grid grid-cols-4  auto-rows-min max-h-[800px]  gap-x-8 w-full  '>

          {/* Sidebar */}
         <InternSideBar/>
          
          {/* content */}
          <DashboardLayout/>
              

        </div>
      </div>
    </div>
  );
}
