import styled from 'styled-components'
import { BaseButton } from './BaseButton'

export const StopButton = styled(BaseButton)`
  background-color: ${(props) => props.theme.color['gray-700']};
  &:hover {
    background-color: ${(props) => props.theme.color['primary-700']};
  }
`
