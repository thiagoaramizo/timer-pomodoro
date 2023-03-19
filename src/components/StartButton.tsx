import styled from 'styled-components'
import { BaseButton } from './BaseButton'

export const StartButton = styled(BaseButton)`
  background-color: ${(props) => props.theme.color['primary-500']};
  &:hover {
    background-color: ${(props) => props.theme.color['primary-700']};
  }
`
