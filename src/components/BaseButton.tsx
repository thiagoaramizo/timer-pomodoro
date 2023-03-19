import styled from 'styled-components'

export const BaseButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  background-color: ${(props) => props.theme.color['gray-500']};
  color: ${(props) => props.theme.color['gray-100']};
  transition: background-color 0.3s;

  &:not('disabled'):hover {
    background-color: ${(props) => props.theme.color['gray-700']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
