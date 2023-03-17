import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../components/Header'

export function DefaultLayout() {
  return (
    <LayoutWrapper>
      <Header />
      <Outlet />
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled.div`
  max-width: 74rem;
  height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2.5rem;
  background-color: ${(props) => props.theme.color['gray-800']};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`
