import { Button } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { FaFile, FaMoon, FaSun } from 'react-icons/fa';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');

  const fileSizeLimit = 200 * 1024 * 1024;
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      handleFileValidation(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      handleFileValidation(selectedFile);
    }
  };

  const handleFileValidation = (selectedFile) => {
    if (selectedFile.size > fileSizeLimit) {
      setFileError('File size exceeds the 200MB limit.');
      setFile(null);
    } else {
      setFile(selectedFile);
      setFileError('');
    }
  };

  useEffect(() => {
    document.body.className = theme === 'light' ? '' : 'dark';
  }, [theme]);

  const handleFile = () => {
    setFile(null);
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'} flex flex-col align-top pt-10`}>
     

      <div className="box grid grid-cols-1 ">
        
        <div
          className="grid grid-cols-1 rounded-lg panel  p-6 mt-2 min-w-[65%] mx-auto"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
           <div className="grid grid-cols-2">
        <p>Upload your XL/CSV/pdf</p>
        <p className="justify-self-end pr-6">
          Theme &nbsp;
          <Button
            color="gray"
            onClick={toggleTheme}
            className="bg-slate-600 dark:bg-slate-200 text-white dark:text-black inline"
            pill
           
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </Button>
        </p>
      </div>
         <div className="grid grid-cols-2 pt-6">
         <div>
            <p className="text-gray-600 dark:text-gray-50">
              <MdOutlineCloudUpload className="text-2xl inline-flex" /> Drag and drop file here
            </p>
            <small className="text-gray-400 dark:text-gray-300 ml-6">Limit 200MB per file</small>
          </div>
          <Button
            color="gray"
            className="flex items-center justify-center m-4 cursor-pointer justify-self-end"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('fileInput').click()}
            outline
          >
            Browse Files
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </Button>

         </div>
        </div>

        {fileError && (
          <div className="file-error text-red-500 text-center mt-4">
            <p>{fileError}</p>
          </div>
        )}

        {file && !fileError && (
          <div className="file-info grid grid-cols-2 mt-1 p-8 min-w-[65%] mx-auto">
            <p className="text-gray-600 dark:text-gray-200">
              <FaFile className="inline text-2xl" /> {file.name} <small className="text-gray-400 dark:text-gray-300">{Math.round(file.size / 1024)} KB</small>
            </p>
            <RxCross2 className="justify-self-end cursor-pointer" onClick={handleFile} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
