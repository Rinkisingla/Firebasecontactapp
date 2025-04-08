import React from 'react';
import { Modal } from './Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
});

export const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "Contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "Contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? { name: contact.name, email: contact.email }
              : { name: "", email: "" }
          }
          onSubmit={(values) => {
            isUpdate
              ? updateContact(values, contact.id)
              : addContact(values);
          }}
        >
          <Form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <label htmlFor='name'>Name</label>
              <Field name="name" className="h-10 border px-2" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='email'>Email</label>
              <Field name="email" className="h-10 border px-2" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <button type='submit' className='self-end border bg-orange px-3 py-1'>
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};
