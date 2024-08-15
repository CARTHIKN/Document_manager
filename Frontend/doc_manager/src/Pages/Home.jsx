import React, { useState } from 'react';
import { FaFile } from 'react-icons/fa'; // Import a file icon from react-icons
import Header from './Header';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import { useSelector } from 'react-redux';

function Home() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage spinner visibility
  const baseUrl = "http://127.0.0.1:8000";
  const username = useSelector((state) => state.authentication_user.username);
  const token = localStorage.getItem("access");


  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleFileRemove = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file); 
    });
    formData.append('username', username);  
    setLoading(true); 

    try {
      const response = await axios.post(baseUrl + '/documents/upload/', formData, {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
        },});

      if (response.status === 201) {
        toast.success('Files uploaded successfully!');
        setFiles([]); 
      } else {
        toast.error('Failed to upload files');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('An error occurred while uploading files');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="relative bg-blend-multiply  min-h-screen pt-40 ">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center mt-56 bg-opacity-50 z-50">
          {/* Loading spinner */}
          <div class="flex-col gap-4 w-full flex items-center h-screen justify-center">
  <div
    class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
  >
    <div
      class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
    ></div>
  </div>
</div>
        </div>
      )}
      

      <Header />
      <div className="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto ">
        <div className="bg-gray-100 py-2 px-4">
          <h2 className="text-xl font-semibold text-gray-800">Selected Files</h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {files.map((file, index) => (
            <li key={index} className="flex items-center py-4 px-6">
              <span className="text-gray-700 text-lg font-medium mr-4">{index + 1}.</span>
              <FaFile className="w-12 h-12 text-gray-500 mr-4" /> {/* File icon */}
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800">{file.name}</h3>
                <p className="text-gray-600 text-base">{file.size} bytes</p>
              </div>
              <button
                onClick={() => handleFileRemove(file.name)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="input_field flex flex-col w-max mx-auto text-center mt-4 mb-4">
          <label>
            <input
              className="text-sm cursor-pointer w-36 hidden"
              type="file"
              multiple
              onChange={handleFileChange}
            />
            <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
              Select Files
            </div>
          </label>
          {files.length > 0 && (
            <button
              onClick={handleUpload}
              className="mt-4 bg-green-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-2 hover:bg-green-500"
            >
              Upload
            </button>
          )}
        </div>
      </div>
      <ToastContainer /> 
    </div>
  );
}

export default Home;
