import React from 'react'

export default function Footer() {
  const sections = [
    {
      title: 'Qui sommes nous',
      links: ['Presse', 'CGU/CGV', 'Support']
    },
    {
      title: 'Nos services',
      links: ['Formations', 'Partenaires', 'Certifications']
    },
    {
      title: 'Informations',
      links: ['Contact', 'FAQ', 'Mentions légales']
    },
    {
      title: 'Réseaux sociaux',
      links: ['Facebook', 'Twitter', 'LinkedIn']
    }
  ];
  return (
    <div className=' text-white border-t-2 border-t-white col-start-1 col-end-11 row-start-3 row-end-4 bg-gray-200 h-[350px]  flex  justify-center  gap-x-[250px] w-full !py-[48px]'>
      {sections.map((section, index) => (
        <div key={index} className='flex flex-col gap-y-3.5 h-auto'>
          <div className='text-md text-gray-600 font-semibold capitalize mb-2'>
            {section.title}
          </div>
          {section.links.map((link, linkIndex) => (
            <div key={linkIndex} className="text-gray-500 cursor-pointer capitalize hover:underline hover:text-black text-lg">
              {link}
            </div>
          ))}
        </div>
      ))}
      
    
        

    

       
    </div>
  )
}
