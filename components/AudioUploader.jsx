import { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

const AudioUploader = ({ onFileSelect }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    onFileSelect(selectedFile);
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <label className="flex items-center space-x-2 cursor-pointer bg-green-500 text-white px-4 py-2 rounded-full">
        <FaUpload />
        <span>Choose Audio File</span>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      {file && (
        <p className="text-sm text-gray-600">Selected file: {file.name}</p>
      )}
    </div>
  );
};

export default AudioUploader;