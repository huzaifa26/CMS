import React, { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';
import { collection, doc, deleteDoc } from "firebase/firestore";
import { db } from '../Utils/firebase';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

export default function PatientRow({ patient, index }) {
  const navigate = useNavigate();
  const [showContextMenu, setContextMenu] = useState(false);
  const queryClient = useQueryClient()
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = () => {
    setContextMenu(false);
  }

  async function deletePatient() {
    try {
      // Get a reference to the patient document to delete
      const patientRef = doc(collection(db, "patients"), patient.id);

      // Delete the patient document
      await deleteDoc(patientRef);
      queryClient.invalidateQueries(['patients']);
      toast.success("Patient Deleted")
      console.log("Patient deleted successfully!");
    } catch (error) {
      console.error("Error deleting patient:", error);
      toast.success("Error deleting patient")
    }
  }

  return (
    <tr className="h-12 hover:!bg-[rgba(0,0,0,0.030)] cursor-pointer" onClick={() => { navigate("/patients-information", { state: { ...patient } }); }} key={patient?.id} style={index % 2 !== 0 ? { backgroundColor: "#EEEEEE" } : { backgroundColor: "#ffffff" }}>
      <td className='p-2 font-[500]'>{index + 1}</td>
      <td className='p-2'>{patient?.firstName}</td>
      <td className='p-2'>{patient?.lastName}</td>
      <td className='p-2'>{patient?.gender}</td>
      <td className='p-2'>{patient?.refferingDoctor?.firstName}</td>
      <td className='p-2'>{patient?.medicalAidName?.name}</td>
      <td className='p-2'>{patient?.hospital?.name}</td>
      <td className='p-2 flex justify-center relative'>
        <div onClick={(e) => { setContextMenu(!showContextMenu); e.stopPropagation(); }} className='relative flex flex-col gap-[5px] w-[40px] h-[40px] hover:bg-[rgba(0,0,0,0.05)] rounded-full justify-center items-center cursor-pointer'>
          <div className='w-[3px] h-[3px] bg-gradient-to-r from-[#6C526F] to-[#AE89A5] rounded-full'></div>
          <div className='w-[3px] h-[3px] bg-gradient-to-r from-[#6C526F] to-[#AE89A5] rounded-full'></div>
          <div className='w-[3px] h-[3px] bg-gradient-to-r from-[#6C526F] to-[#AE89A5] rounded-full'></div>
        </div>
        <ul style={showContextMenu === true ? { transform: "scale(1)", opacity: "1" } : { transform: "scale(0)", opacity: "0" }} className='transition-all absolute z-10 right-[10%] top-[50px] bg-[white] shadow-md flex flex-col divide-y-2'>
          {/* <li onClick={(e) => { }} className='py-2 px-6 flex-1 flex justify-center select-none items-center hover:bg-[rgba(0,0,0,0.05)] transition-colors'>Edit</li> */}
          <li onClick={(e) => { deletePatient(); e.stopPropagation(); }} className='py-2 px-6 flex-1 flex justify-center items-center hover:bg-[rgba(0,0,0,0.05)] transition-colors select-none cursor-pointer'>Delete</li>
        </ul>
      </td>
    </tr>
  )
}