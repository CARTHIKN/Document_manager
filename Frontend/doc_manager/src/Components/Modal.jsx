import React from 'react';

const Modal = ({ isOpen, onClose, file }) => {
    if (!isOpen || !file || !file.file_url) return null;

    const handleClose = () => {
        onClose();
    };

    const renderContent = () => {
        const fileExtension = file.file_url.split('.').pop().toLowerCase();

        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
            return <img src={file.file_url} alt={file.file_name} className="w-full h-full object-cover" />;
        }

        if (['mp4', 'avi', 'mov'].includes(fileExtension)) {
            return (
                <video controls className="w-full h-full">
                    <source src={file.file_url} type={`video/${fileExtension}`} />
                    Your browser does not support the video tag.
                </video>
            );
        }

        return (
            <div>
                <a href={file.file_url} download>
                    Download {file.file_name}
                </a>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-4 rounded-lg w-2/4   h-2/3 relative">
            <button
    onClick={handleClose}
    className="absolute top-1 right-1 h-8 w-8 text-dark-700 hover:text-gray-900 flex items-center justify-center"
>
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
    >
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M6 18L18 6M6 6l12 12" 
        />
    </svg>
</button>

                {renderContent()}
            </div>
        </div>
    );
};

export default Modal;
