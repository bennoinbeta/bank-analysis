import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { onDrop } from './controller';

const Home: React.FC = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container>
      <DropContainer {...getRootProps()}>
        <DropField {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </DropContainer>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const DropContainer = styled.div`
  height: 100px;
  width: 400px;

  align-items: center;
  justify-content: center;

  border: 6px dashed #1c6ea4;

  cursor: pointer;
`;

const DropField = styled.input`
  display: flex;
  flex: 1;
`;
