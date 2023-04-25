import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addDoc, collection } from 'firebase/firestore';
import React, { useRef } from 'react'
import { CgDetailsMore } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../Utils/firebase';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Medical Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  contactNumber: Yup.string().required('Contact Number is required'),
  address: Yup.string().required('Address is required'),
  option: Yup.string().required('Option is required'),
});

export default function AddMedicalAid() {

  const formRef = useRef();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const signupMutation = useMutation({
    mutationFn: async (data) => {
      return await addDoc(collection(db, "medicalAid"), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['medicalAid'])
      toast.success("Medical Aid created successfully");
      navigate('/medical-aids');
    },
    onError: () => {
      toast.error("Error creating medical aid");
    }
  });

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    let time=new Date();
    time=time.getTime()
    let data = {
      name: formRef.current.name.value,
      email: formRef.current.email.value,
      contactNumber: formRef.current.contactNumber.value,
      address: formRef.current.address.value,
      option: formRef.current.option.value,
      createdAt:time
    }
    try {
      await validationSchema.validate(data, { abortEarly: false });
      signupMutation.mutate(data);
    } catch (errors) {
      console.error(errors.inner[0]);
      toast.error(errors.inner[0].message + "");
    }
  }

  return (
    <div className='pt-4 px-4 h-full'>
      <div className='flex gap-4'>
        <div className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] w-16 h-14 flex justify-center items-center shadow-md rounded-sm'>
          <CgDetailsMore className='text-white text-2xl' />
        </div>
        <h1 className='self-end mb-2 font-bold text-xl text-[#595659]'>MEDICAL AID’S DETAILS</h1>
      </div>
      <form onSubmit={formSubmitHandler} ref={formRef} className='py-8 flex flex-col gap-4 w-[60%] text-[#595659]'>
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Medical Aid Name' name='name' />
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Email' name='email' />
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Contact Number' name='contactNumber' type='number' />
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Address' name='address' />
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Option' name='option' />
        {signupMutation.isLoading ?
          <button type='button' className='w-32 h-12 mt-4 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white'><img className='w-[30px] m-auto' src='/WhiteLoading.svg' /></button>
          :
          <button type='submit' className='w-32 h-12 mt-4 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white'>Submit</button>
        }
      </form>
    </div>
  )
}
