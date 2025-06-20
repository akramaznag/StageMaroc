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
  BuildingOfficeIcon,
  PlusIcon,
  PlusCircleIcon,
  MegaphoneIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import RecruiterSideBar from '../src/components/Recruiter/RecruiterSideBar';

export default function Test() {
  return (
       <div className='flex justify-center'>
          {/* Container wrapper */}
          <div className='!my-[130px]  w-[85%] '>
            <div className='bg-red  grid grid-cols-4  auto-rows-min max-h-[800px]  gap-x-8 w-full  '>
    
              {/* Sidebar */}
             <RecruiterSideBar/>
              
              {/* content */}
                   {/* Main Dashboard Cards */}
                   <div class="col-start-2 col-end-5 h-auto flex flex-col gap-y-5">

                           <>
     
                          </>
               </div>
        
                  
    
            </div>
          </div>
        </div>
  );
}