import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FiSearch } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
 import { collection, getDocs, onSnapshot} from "firebase/firestore";
 import{db} from "./config/Firebase";
 import { HiOutlineUserCircle } from "react-icons/hi";
 import { IoMdTrash } from "react-icons/io";
 import { RiEditCircleLine } from "react-icons/ri";
import { ContactCard } from './components/ContactCard';
import { Modal } from './components/Modal';
import { AddAndUpdateContact } from './components/AddAndUpdateContact';
import useDisclosure from './hooks/useDisclouse';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import NoContactFound from './components/NoContactFound';


function App() {
   const[contacts, setContacts]= useState([]);
   const{isOpen, onOpen, onClose}= useDisclosure();
    
    useEffect(()=>{
      const getContacts= async()=>{
        try {
           const contactsRef= collection(db,"Contacts");
            onSnapshot(contactsRef,(snapshot)=>{
             // const contactSnapshot = await getDocs(contactsRef);
              const contactLists = snapshot.docs.map((doc)=>{
                 return{
                   id:doc.id,
                   ...doc.data(),
                 };
            })
            setContacts(contactLists);
            return contactLists;
             
           });
          
         //  console.log(contactLists);
           
        } catch (error) {
          console.log(error);
          
        }
      };
       getContacts();
    },[]);
    const FilterContact=(e)=>{
      const value = e.target.value;
      const contactsRef= collection(db,"Contacts");
      onSnapshot(contactsRef,(snapshot)=>{
       // const contactSnapshot = await getDocs(contactsRef);
        const contactLists = snapshot.docs.map((doc)=>{
           return{
             id:doc.id,
             ...doc.data(),
           };
      })
       const filteredContacts= contactLists.filter((contact)=>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
      setContacts(filteredContacts);
       return FilterContacts;
    }); 
    };
  return (
    <>
    <div className='mx-auto max-w-[370px] px-4'>
      <Navbar/>
      <div className='flex gap-2'>
        <div  className='  relative flex  flex-grow items-center'>
          <FiSearch className='absolute ml-1 text-3xl text-white'/>
          <input onChange={FilterContact} type="text" className="h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"/>
        </div>
        <FaPlusCircle onClick={onOpen}  className='cursor-pointer text-5xl text-white'/>
      </div>
    
        <div className='mt-4 flex flex-col gap-3'>
          {
            contacts.length<=0 ? <NoContactFound/>:
            contacts.map((contact)=>(
              <ContactCard key={contact.id}contact={contact}/>
            ))}
          </div>
        </div>
         <AddAndUpdateContact isOpen={isOpen} onClose={onClose} /> 
         <ToastContainer position='bottom-center'/>
    </>
  )
}

export default App