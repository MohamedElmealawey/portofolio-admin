import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { FaTrashAlt, FaEnvelope, FaUser, FaTag } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactList = () => {
  const { contactList, BACKEND_URL } = useContext(AdminContext);

  const removeMessageHandler = async (itemID) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const response = await axios.delete(`${BACKEND_URL}/api/contact/removeMessage/${itemID}`);
        if (response.data.success) {
          toast.success('Message deleted successfully');
          window.location.reload();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error deleting message');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 ml-64">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Contact Messages</h1>
          <p className="text-gray-600 mt-2">Manage your incoming messages</p>
        </div>

        {/* Messages Grid */}
        {contactList && contactList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactList.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  {/* Header with Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <FaEnvelope className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeMessageHandler(item._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>

                  {/* Subject */}
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      <FaTag className="mr-1 text-xs" />
                      {item.subject}
                    </span>
                  </div>

                  {/* Message */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {item.message}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 text-xs text-gray-400">
                    {/* Add timestamp if available */}
                    {item.createdAt && new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="inline-flex bg-gray-100 p-4 rounded-full mb-4">
              <FaEnvelope className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Messages Yet</h3>
            <p className="text-gray-500">Your inbox is empty. Messages will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;