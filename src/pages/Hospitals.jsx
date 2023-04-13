import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { MdManageAccounts } from 'react-icons/md'
import { NavLink, Outlet } from 'react-router-dom'

export default function Hospitals() {
  console.log(location.pathname);
  return (
    <div className='w-[100%] !max-h-[100%] bg-[white] rounded-xl overflow-auto'>
      {location.pathname !== "/doctors/edit" &&
        <ul className='flex items-center h-12 pt-2'>
          <NavLink end to={"/hospitals"} className={({ isActive }) => isActive ? "border-b-[3px] border-[#AE89A5] text-[#AE89A5]" : "text-[#595659] border-b-[3px] border-[rgba(0,0,0,0.0)] transition-all duration-500"}>
            <li className='w-56 px-6 py-2 font-bold flex items-center justify-center gap-[5px]'><MdManageAccounts className='text-2xl' />Manage Hospitals</li>
          </NavLink>
          <NavLink end to={"/hospitals/add"} className={({ isActive }) => isActive || location.pathname.includes("/patients/add-patient") ? "border-b-[3px] border-[#AE89A5] text-[#AE89A5]" : "text-[#595659] border-b-[3px] border-[rgba(0,0,0,0.0)] transition-all duration-500"}>
            <li className='w-56 px-6 py-2 font-bold flex items-center justify-center gap-[5px]'><FaUserPlus className='text-2xl' />Add Hospitals</li>
          </NavLink>
        </ul>
      }
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  )
}