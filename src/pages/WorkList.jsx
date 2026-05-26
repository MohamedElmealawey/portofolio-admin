import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { FaTrashAlt, FaExternalLinkAlt, FaFolder } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const WorkList = () => {
  const { work, BACKEND_URL } = useContext(AdminContext);

  const removeWorkHandler = async (itemID) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await axios.delete(`${BACKEND_URL}/api/work/removeWork/${itemID}`);
        if (response.data.success) {
          toast.success('Project deleted successfully');
          window.location.reload();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error deleting project');
      }
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'fullstack':
        return 'bg-purple-100 text-purple-700';
      case 'frontend':
        return 'bg-blue-100 text-blue-700';
      case 'backend':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 ml-64">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Work List</h1>
            <p className="text-gray-600 mt-2">Manage your portfolio projects</p>
            <p className="text-gray-600 mt-2">Total Projects <span>{work.length}</span></p> 
        </div>

        {/* Projects Grid */}
        {work && work.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {work.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0].url || item.images[0]}
                    alt={item.images[0].alt || item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : item.image ? (
                  // Fallback to single image if available
                  <img
                    src={typeof item.image === 'object' ? item.image.url : item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  // Placeholder if no image
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
                      {item.title}
                    </h3>
                    <button
                      onClick={() => removeWorkHandler(item._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)}`}>
                      <FaFolder className="mr-1 text-xs" />
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                  </div>

                  {/* View Project Link */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    <span className="mr-2">View Project</span>
                    <FaExternalLinkAlt className="text-sm" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="inline-flex bg-gray-100 p-4 rounded-full mb-4">
              <FaFolder className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Projects Yet</h3>
            <p className="text-gray-500">Start by adding your first project.</p>
            <button
              onClick={() => window.location.href = '/addWork'}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Add Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkList;