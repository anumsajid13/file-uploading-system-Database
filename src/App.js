import React, { useState, useEffect } from 'react';

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || 'Failure occurred uploading file.');
      }
    } catch (error) {
      setMessage('Error occurred uploading file.');
    }
  };

  useEffect(() => {}, [message]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-darkBlue">
      <div className="bg-darkPanel p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <div className="border-dashed border-2 border-white p-6 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-lightBlue"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16V4m4 12V4m4 12V4m0 4l-4-4-4 4m0 4l-4 4 4-4m4 4l4-4-4 4"
            />
          </svg>
          <p className="text-white mt-4">
            Attached File: {file ? file.name : 'None'}
          </p>
        </div>
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer mt-4 bg-lightBlue text-white py-2 px-4 rounded-lg hover:bg-blue-500"
        >
          Browse Computer
        </label>
        <button
          onClick={handleUpload}
          className="mt-4 bg-lightBlue text-white py-2 px-4 rounded-lg hover:bg-blue-500"
        >
          Upload
        </button>
        {message && <p className="mt-4 text-white">{message}</p>}
      </div>
    </div>
  );
};

export default UploadFile;
