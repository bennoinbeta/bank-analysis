import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import PlusIcon from './components/PlusIcon';

type Props = {
  onDrop: (acceptedFiles: File[]) => void;
};

const DropZone: React.FC<Props> = (props) => {
  const { onDrop } = props;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container {...getRootProps()} isDragActive={isDragActive}>
      <DropField {...getInputProps()} />
      <PlusIcon/>
    </Container>
  );
};

export default DropZone;

const Container = styled.div<{ isDragActive: boolean }>`
  width: 400px;
  height: 100px;

  background: ${({ theme, isDragActive }) =>
    isDragActive ? theme.colors.surface_2 : theme.colors.surface};
  border: 2px solid
    ${({ theme, isDragActive }) =>
      isDragActive ? theme.colors.primary : theme.colors.surface_border};
  border-radius: 5px;

  cursor: pointer;
`;

const DropField = styled.input`
  display: flex;
  flex: 1;
`;
