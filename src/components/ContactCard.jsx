import React from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { IoMdTrash } from 'react-icons/io'
import { RiEditCircleLine } from 'react-icons/ri'
import { addDoc, doc,  collection, deleteDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';
import { AddAndUpdateContact } from './AddAndUpdateContact';
import useDisclosure from '../hooks/useDisclouse';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';


export const ContactCard = ({contact}) => {
  const{isOpen, onOpen, onClose}= useDisclosure();

  const contactdelete = async(id)=>{
          try {
              await deleteDoc(doc(db,"Contacts",id));
               toast.success("Deleted Sucessfully");
              
          } catch (error) {
              console.log(error);
          }
      };

  return (
    <>
    <div key={contact.id}  className='flex items-center justify-around rounded-lg bg-yellow p-2 '>
    <div className='flex gap-1'>
      <HiOutlineUserCircle className='text-4xl text-orange' />
      <div className='text-white'>
        <h2 className=' font-medium'>{contact.name}</h2>
        <p className='text-sm'>{contact.email}</p>
      </div>
    </div>
    <div className='flex text-3xl'>
    <RiEditCircleLine  onClick={onOpen} className='cursor-pointer'/>
    <IoMdTrash onClick={() => contactdelete(contact.id)} className='text-orange cursor-pointer' />

    </div>
  </div>
      <AddAndUpdateContact contact={contact  } isUpdate onClose={onClose} isOpen={isOpen}/>
      </>
  )
}
