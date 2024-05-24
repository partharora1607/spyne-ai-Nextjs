import React from 'react';

const UploadModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity z-50">
      <div className="bg-white p-6 rounded shadow-md w-4/12">
        <div className="top-0 right-0 flex flex-row-reverse w-full">
            <button onClick={onClose}>
                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default UploadModal;
