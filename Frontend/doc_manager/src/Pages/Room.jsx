import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from './Header';
import Modal from '../Components/Modal'; // Import the Modal component
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


const FileIcon = () => (
    <span style={{ fontSize: '24px', color: 'gray' }}>📄</span>
);

const ImageIcon = () => (
    <span style={{ fontSize: '24px', color: 'gray' }}>🖼️</span>
);

const VideoIcon = () => (
    <span style={{ fontSize: '24px', color: 'gray' }}>🎥</span>
);

const Room = () => {
    const username = useSelector((state) => state.authentication_user.username);

    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null); // State to manage selected file
    const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
    const token = localStorage.getItem("access");
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                if (!username) {
                    throw new Error('Username is not available');
                }
                const response = await axios.get(`http://127.0.0.1:8000/documents/files/?username=${username}`, {
                    headers: {
                      authorization: `Bearer ${token}`,
                      Accept: "application/json",
                    },});
                setFiles(response.data);
                console.log(response.data);
                
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, [username]);

    const getFileType = (fileUrl) => {
        const fileExtension = fileUrl.split('.').pop().toLowerCase();

        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
            return 'image';
        }
        if (['mp4', 'avi', 'mov'].includes(fileExtension)) {
            return 'video';
        }
        return 'file';
    };

    const handleFileClick = (file) => {
        setSelectedFile(file);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedFile(null);
    };

    const handleDeleteFile = async (fileId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this file?');
        console.log(confirmDelete);
        
        
        if (confirmDelete) {
            setLoading(true)
            try {
                await axios.delete(`http://127.0.0.1:8000/documents/delete/${fileId}/`, {
                    headers: {
                      authorization: `Bearer ${token}`,
                      Accept: "application/json",
                    },});
                setFiles(files.filter((file) => file.id !== fileId));
                setLoading(false)
                toast.success('deleted successfully!');
            } catch (error) {
                console.error('Error deleting file:', error);
            }
        }
    };

    const downloadFile = (fileId) => {
        window.location.href = `http://127.0.0.1:8000/documents/download/${fileId}/`;
    };

    if (loading) return <div>


<div class="flex-col gap-4 w-full flex items-center h-screen justify-center">
  <div
    class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
  >
    <div
      class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
    ></div>
  </div>
</div>

    </div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='pb-20  bg-slate-200 mx-40 min-h-screen pt-40'>
            <Header />
            <div className={` relative flex flex-col text-gray-700 bg-blue-200 shadow-md w-full rounded-xl bg-clip-border ${files.length === 0 ? 'h-screen bg-blue-100' : ''}`}>
                <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                    {files.length === 0 ? (
                        <div className='flex items-center justify-center h-screen text-center text-lg  w-full'>No files were Uploaded</div>
                    ) : (
                        files.map((file, index) => {
                            const fileType = getFileType(file.file_url);

                            return (
                                <div
                                    key={index}
                                    className="flex items-center justify-between w-full bg-gray-100 p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-blue-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                                >
                                    <div className="flex items-center cursor-pointer" onClick={() => handleFileClick(file)}>
                                        <div className="grid mr-4 place-items-center">
                                            {fileType === 'image' && (
                                                <ImageIcon />
                                            )}
                                            {fileType === 'video' && (
                                                <VideoIcon />
                                            )}
                                            {fileType === 'file' && (
                                                <FileIcon />
                                            )}
                                        </div>
                                        <div>
                                            <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                                                {file.file_name}
                                            </h6>
                                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                                                {file.file_url}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => downloadFile(file.id)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Download
                                        </button>
                                        <button
                                            onClick={() => handleDeleteFile(file.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </nav>
            </div>
            {modalOpen && (
                <Modal
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                    file={selectedFile}
                />
            )}
            <ToastContainer />
        </div>
    );
};

export default Room;
