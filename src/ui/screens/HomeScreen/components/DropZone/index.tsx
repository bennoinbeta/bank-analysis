import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import PlusIcon from './components/PlusIcon';
import { useAgileTheme } from '../../../../../styles/theme';

type Props = {
  onDrop: (acceptedFiles: File[]) => void;
};

const DropZone: React.FC<Props> = (props) => {
  const { onDrop } = props;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container {...getRootProps()} isDragActive={isDragActive}>
      <DropField {...getInputProps()} />
      <ContentContainer>
        <PlusIcon />
        <Text>Add your bank CSV file to start analysing.</Text>
      </ContentContainer>
    </Container>
  );
};

export default DropZone;

const Container = styled.div<{ isDragActive: boolean }>`
  display: flex;
  align-items: center;

  padding: 25px;

  background: ${({ theme, isDragActive }) =>
    isDragActive ? theme.colors.layout.lc : theme.colors.layout.rHc};
  border: 2px solid
    ${({ theme, isDragActive }) =>
      isDragActive ? theme.colors.layout.p : theme.colors.layout.p};
  border-radius: 5px;

  cursor: pointer;

  filter: drop-shadow(
    0px ${({ isDragActive }) => (isDragActive ? '8px 14px' : '4px 10px')}
      rgba(0, 0, 0, 0.25)
  );

  transition: all 200ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.layout.p};
    background: ${({ theme }) => theme.colors.layout.p};

    filter: drop-shadow(0px 8px 14px rgba(0, 0, 0, 0.25));
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DropField = styled.input`
  display: flex;
  flex: 1;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.layout.hc};
  margin-left: 10px;
`;
