import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import { FiUpload, FiPlus, FiX, FiGithub, FiCalendar, FiUsers } from 'react-icons/fi';

const AddWork = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [url, setUrl] = useState('');
  const [technologies, setTechnologies] = useState([]);
  const [techInput, setTechInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [status, setStatus] = useState('completed');
  const [duration, setDuration] = useState('');
  const [teamSize, setTeamSize] = useState(1);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const { BACKEND_URL } = useContext(AdminContext);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file: file,
      preview: URL.createObjectURL(file),
      url: '',
      publicId: '',
      alt: '',
      caption: ''
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const removeTechnology = (tech) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  const addWorkHandler = async (e) => {
    e.preventDefault();

    // Validation
    if (!title || !description || !category || !url) {
      toast.warn('Please fill all required fields!');
      return;
    }

    if (images.length === 0) {
      toast.warn('Please upload at least one image!');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('url', url);
      formData.append('githubUrl', githubUrl);
      formData.append('status', status);
      formData.append('duration', duration);
      formData.append('teamSize', teamSize);
      
      // Append technologies as JSON string
      formData.append('technologies', JSON.stringify(technologies));
      
      // Append images
      images.forEach((image, index) => {
        if (image.file) {
          formData.append('images', image.file);
        }
      });

      const response = await axios.post(`${BACKEND_URL}/api/work/addWork`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setImages([]);
        setTitle('');
        setDescription('');
        setCategory('');
        setUrl('');
        setTechnologies([]);
        setGithubUrl('');
        setStatus('completed');
        setDuration('');
        setTeamSize(1);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding work:', error);
      toast.error('Failed to add work. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 ml-64">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Add New Work</h1>
          <p className="text-gray-600 mt-2">Showcase your latest project to the world</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={addWorkHandler} className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Image Upload */}
              <div className="space-y-6">
                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Project Images <span className="text-red-500">*</span>
                  </label>
                  <div
                    onClick={() => fileInputRef.current.click()}
                    className="relative group cursor-pointer"
                  >
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition-all duration-200">
                      <div className="text-center py-8">
                        <FiUpload className="mx-auto text-4xl text-gray-400 mb-3" />
                        <p className="text-gray-600 font-medium">Click to upload images</p>
                        <p className="text-sm text-gray-400 mt-1">PNG, JPG, GIF up to 10MB each</p>
                        <p className="text-sm text-gray-400">You can upload multiple images</p>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                    />
                  </div>

                  {/* Image Preview Grid */}
                  {images.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Uploaded Images ({images.length})</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image.preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <FiX size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Technologies Section */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Technologies Used
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
                      type="text"
                      placeholder="e.g., React, Node.js, MongoDB"
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={addTechnology}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  {technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTechnology(tech)}
                            className="hover:text-blue-900"
                          >
                            <FiX size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status & Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="planned">Planned</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      type="text"
                      placeholder="e.g., 3 months"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Team Size */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Team Size
                  </label>
                  <input
                    value={teamSize}
                    onChange={(e) => setTeamSize(parseInt(e.target.value) || 1)}
                    type="number"
                    min="1"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Right Column - Form Fields */}
              <div className="space-y-6">
                {/* Title Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="e.g., E-commerce Website"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    placeholder="Describe your project..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Category Select */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="fullstack">Full Stack</option>
                    <option value="mobile">Mobile</option>
                    <option value="devops">DevOps</option>
                    <option value="database">Database</option>
                  </select>
                </div>

                {/* Project URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    type="url"
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* GitHub URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    GitHub URL
                  </label>
                  <div className="relative">
                    <FiGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      type="url"
                      placeholder="https://github.com/username/project"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-200 ${
                      loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02]'
                    }`}
                  >
                    {loading ? 'Adding Project...' : 'Add Project'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddWork;