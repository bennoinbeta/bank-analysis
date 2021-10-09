import React from 'react';
import { useDropzone } from 'react-dropzone';
import { onDrop } from './core';
import './App.css';

const App: React.FC = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
  return (
    <div className="App">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};

export default App;
