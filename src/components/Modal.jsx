import React from 'react'
 import{createPortal} from "react-dom";
 import{AiOutlineClose} from "react-icons/ai";

export const Modal = ({isOpen, onClose, children}) => {
 return createPortal(
    <>
         { isOpen && (
            <>
            <div className='absolute top-0 z-40 h-screen w-screen place-items-center grid bg-black bg-opacity-30 backdrop-blur'>
                <div className='relative z-50 m-auto min-h-[200px] min-w-[80%] bg-white p-4'>  
                      <div className='flex justify-end'>
                        <AiOutlineClose onClick={onClose} className='self-end text-2xl'/>
                      </div> 
                      
                {children}
                </div>
            </div>  
            </>

         )}
    </>,
    document.getElementById("modal-root")
  );
};

