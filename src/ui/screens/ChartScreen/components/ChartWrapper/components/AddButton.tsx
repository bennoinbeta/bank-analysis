import React from 'react';
import styled from '@emotion/styled';
import { useAgileTheme } from '../../../../../../styles/theme';
import Icon from '../../../../../components/icons';
import { useDropzone } from 'react-dropzone';

const AddButton: React.FC<Props> = (props) => {
  const { onDrop } = props;
  const theme = useAgileTheme();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
  });

  return (
    <Container {...getRootProps()} isDragActive={isDragActive}>
      <DropField {...getInputProps()} />
      <Icon.Plus
        color={isDragActive ? theme.colors.layout.p : theme.colors.layout.rHc}
        width={24}
        height={24}
      />
    </Container>
  );
};

export default AddButton;

type Props = {
  onDrop: (acceptedFiles: File[]) => void;
};

const Container = styled.div<{ isDragActive: boolean }>`
  display: flex;

  align-items: center;
  justify-content: center;

  cursor: pointer;

  width: 50px;
  height: 50px;

  border: 2px solid
    ${({ theme, isDragActive }) =>
      isDragActive ? theme.colors.layout.p : theme.colors.layout.rHc};
  border-radius: 5px;

  transition: all 200ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.layout.p};
  }
`;

const DropField = styled.input`
  display: flex;
  flex: 1;
`;
