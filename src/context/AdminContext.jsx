import React from 'react'
import { useEffect } from 'react';
import { createContext } from 'react'
import axios from "axios"
import { useState } from 'react';
export const AdminContext=createContext();

const AdminContextProvider = (props) => {
  const [token,setToken]=useState(localStorage.getItem("token") ? localStorage.getItem("token"):"");
  const [work,setWork]=useState([]);
  const [contactList,setContactList]=useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [workCount, setWorkCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);

  const getAllWork = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/work/getall`);
      setWork(response.data.allWork);
      setWorkCount(response.data.allWork.length)
    } catch (error) {
      console.error('Error fetching work data:', error.message);
      toast.error('Failed to fetch work data. Please try again.');
    }
  };

  const getContactList = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/contact/allContacts`);
      setContactList(response.data.contacts);
      setContactCount(response.data.contacts.length)
    } catch (error) {
      console.error('Error fetching work data:', error.message);
      toast.error('Failed to fetch work data. Please try again.');
    }
  };

  useEffect(() => {
    getAllWork();
    getContactList();
  }, [BACKEND_URL]);

    const value={BACKEND_URL,token,setToken,work,contactList,workCount,contactCount};

  return (
    <AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider