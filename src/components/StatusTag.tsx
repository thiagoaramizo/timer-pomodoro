import styled from 'styled-components'

const STATUS_COLORS = {
  green: 'green-500',
  yellow: 'yellow-500',
  red: 'red-500',
} as const

const STATUS_TEXT = {
  green: 'Concluído',
  yellow: 'Em andamento',
  red: 'Interrompido',
} as const

interface StatusProps {
  status: keyof typeof STATUS_COLORS
}

export function StatusTag(props: StatusProps) {
  return <StatusWrapper {...props}>{STATUS_TEXT[props.status]}</StatusWrapper>
}

const StatusWrapper = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${(props) =>
      props.theme.color[STATUS_COLORS[props.status]]};
  }
`
