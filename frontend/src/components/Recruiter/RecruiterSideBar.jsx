import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, IdentificationIcon, PaperAirplaneIcon, CalendarIcon, BuildingOfficeIcon,MegaphoneIcon } from '@heroicons/react/24/outline';

export default function RecruiterSideBar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navLinkClasses = (path) =>
    `rounded-lg !px-1 !py-2 flex justify-center items-center h-[20%] w-[70%] cursor-pointer ${
      isActive(path) ? 'bg-blue-500' : 'group hover:bg-white'
    }`;

  const iconClasses = (path) =>
    `h-5 w-5 ${isActive(path) ? 'text-white' : 'text-gray-900 group-hover:text-blue-500'}`;

  const textClasses = (path) =>
    `text-sm font-semibold capitalize ${
      isActive(path) ? 'text-white' : 'text-gray-900 group-hover:text-blue-500'
    }`;

  return (
    <div className='bg-green col-start-1 col-end-2 fixed h-1/3 w-[20%] flex flex-col justify-center items-center gap-y-2'>
      {/* ENSA logo box */}
      <div className='bg-gray-200 rounded-lg grid grid-rows-2 grid-cols-3 w-[70%] h-[25%] !p-1'>
        <div className='col-span-1 bg-gray-100 flex flex-col justify-center items-center w-[80%] !py-1 row-start-1 row-end-3'>EN</div>
        <div className='col-start-2 col-end-3 font-semibold w-full'>Dynamic...</div>
        <div className='col-start-2 col-end-4 text-[12px] capitalize'>enterprise</div>
      </div>

      {/* Dashboard */}
      <Link to="/recruteur/dashboard" className={navLinkClasses('/recruteur/dashboard')}>
        <div className='text-sm flex justify-start w-full items-center !px-3 gap-x-2.5'>
          <HomeIcon className={iconClasses('/recruteur/dashboard')} />
          <span className={textClasses('/recruteur/dashboard')}>tableau de bord</span>
        </div>
      </Link>

      {/* entreprise */}
      <Link to="/recruteur/dashboard/entreprise/" className={navLinkClasses('/recruteur/dashboard/entreprise/')}>
        <div className='text-sm flex justify-start w-full items-center !px-3 gap-x-2.5'>
          <BuildingOfficeIcon className={iconClasses('/recruteur/dashboard/entreprise/')} />
          <span className={textClasses('/recruteur/dashboard/entreprise/')}>entreprise</span>
        </div>
      </Link>

      {/* Internship offers */}
      <Link to="/recruteur/dashboard/offres-stage/" className={navLinkClasses('/recruteur/dashboard/offres-stage/')}>
        <div className='text-sm flex justify-start w-full items-center !px-3 gap-x-2.5'>
          <MegaphoneIcon className={iconClasses("/recruteur/dashboard/offres-stage/")} />
          <span className={textClasses("/recruteur/dashboard/offres-stage/")}>offre de stage</span>
        </div>
      </Link>

      {/* Entretiens */}
      <Link to="/stagaire/dashboard/entretiens" className={navLinkClasses('/stagaire/dashboard/entretiens')}>
        <div className='text-sm flex justify-start w-full items-center !px-3 gap-x-2.5'>
          <CalendarIcon className={iconClasses('/stagaire/dashboard/entretiens')} />
          <span className={textClasses('/stagaire/dashboard/entretiens')}>entretiens</span>
        </div>
      </Link>
    </div>
  );
}
