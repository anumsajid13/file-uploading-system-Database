import React, { useState, useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import Navbar from './Navbar'

const UserFiles = () => {
  const [files, setFiles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5000/files', {
          headers: {
            'Authorization': token,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error('Failed to fetch files:', error);
      }
    };

    fetchFiles();
  }, []);

  const getFileUrl = (filePath) => {
    return `http://localhost:5000/${filePath}`;
  };

  const openFileInNewTab = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  const renderFilePreview = (file) => {
    const fileUrl = getFileUrl(file.filePath);
    const fileType = file.originalName.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
      return <img src={fileUrl} alt={file.originalName} className="w-full h-auto rounded-lg" />;
    } else if (['pdf'].includes(fileType)) {
      return <embed src={fileUrl} type="application/pdf" className="w-full h-64" />;
    } else if (['txt'].includes(fileType)) {
      return <iframe title={file.originalName} src={fileUrl} className="w-full h-64" />;
    } else if (['docx'].includes(fileType)) {
      return (
        <DocViewer
          documents={[{ uri: fileUrl, fileType: 'docx' }]}
          pluginRenderers={DocViewerRenderers}
          className="w-full h-64"
          config={{
            header: {
              disableHeader: true,
            },
          }}
          onError={(error) => console.error('DocViewer error:', error)}
        />
      );
    } else {
      return <p className="text-white">Preview not available</p>;
    }
  };

  return (
    <>

<Navbar isLoggedIn={isLoggedIn} />
    <div className="flex flex-col items-center justify-center min-h-screen bg-darkBlue">
      <div className="bg-darkPanel p-8 rounded-lg shadow-lg w-full max-w-7xl text-center">
        <h1 className="text-white text-2xl mb-4">My Files</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {files.map((file) => (
            <div key={file._id} className="border-dashed border-2 border-lightBlue p-4 rounded-lg bg-white relative">
              <div className="w-full h-100 overflow-hidden rounded-lg">
                {renderFilePreview(file)}
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => openFileInNewTab(getFileUrl(file.filePath))}
                  className="py-2 px-4 bg-lightBlue text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Preview
                </button>
              </div>
              <p className="text-darkPanel mt-2 text-center">{file.originalName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
    
  );
};

export default UserFiles;
