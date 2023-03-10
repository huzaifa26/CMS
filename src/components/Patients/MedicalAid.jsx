import React, { useRef } from 'react'
import { AiFillMedicineBox } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export default function MedicalAid() {
  const formRef = useRef();
  const navigate = useNavigate();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    navigate("/home/patients/add-patient/contact")
  }

  return (
    <div className='pt-8 px-4 h-[87vh]'>
      <div className='flex gap-4'>
        <div className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] w-16 h-14 flex justify-center items-center shadow-md rounded-sm'>
          <AiFillMedicineBox className='text-white text-2xl' />
        </div>
        <h1 className='self-end mb-2 font-bold text-xl text-[#595659]'>MEDICAL AID DETAILS</h1>
      </div>
      <form onSubmit={formSubmitHandler} ref={formRef} className='py-8 flex flex-col gap-4 w-[60%] text-[#595659]'>
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Medical Aid' />
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Medical Aid No' type={"number"} />
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Group No' type={"number"} />
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Effective Date' type={"number"} onFocus={(e) => { e.target.type = "date"; }} onBlur={(e) => { if (e.target.value === "") { e.target.type = "text" }; }} />
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Account Holder' />
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Birthdate' type={"number"} onFocus={(e) => { e.target.type = "date"; }} onBlur={(e) => { if (e.target.value === "") { e.target.type = "text" }; }} />
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='ID No' />
        <select className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]'>
          <option selected disabled value={null}>Relationship to Patient</option>
          <option value={"Self"}>Self</option>
          <option value={"Spouse"}>Spouse</option>
          <option value={"Parent/Guardian"}>Parent/Guardian</option>
          <option value={"Other"}>Other</option>
        </select>
        <div className='flex gap-4 mt-2'>
          <button onClick={()=> navigate(-1)} className='w-32 h-12 border-2 border-[#AE89A5] text-xl text-[#AE89A5] hover:bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:text-white'>Back</button>
          <button className='w-32 h-12 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white'>Next</button>
        </div>
      </form>
    </div>
  )
}
