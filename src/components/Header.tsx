import { Scroll, Timer } from '@phosphor-icons/react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/logo.svg'
import { TaskContext } from '../contexts/TaskContext'

export function Header() {
  const { activeTask } = useContext(TaskContext)
  return (
    <HeaderWrapper>
      <div>
        <img src={logo} className={activeTask && 'rotate'} alt="" />
        {activeTask ? <span>Trabalhando em {activeTask.task}</span> : ''}
      </div>

      <nav>
        <NavLink to="./" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="./history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 3rem;
      opacity: 0.9;
      transform: rotate(0);
      transition: transition 0.3s;
    }

    span {
      font-size: 1.1rem;
      font-weight: bold;
      color: ${(props) => props.theme.color['gray-600']};
    }
  }

  & .rotate {
    animation: loading 1s linear infinite;
    @keyframes loading {
      0% {
        transform: rotate(0);
      }

      100% {
        transform: rotate(-360deg);
      }
    }
  }

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: ${(props) => props.theme.color['gray-100']};
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      &.active {
        color: ${(props) => props.theme.color['primary-500']};
      }

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme.color['primary-500']};
      }

      &:focus {
        box-shadow: none;
        border-bottom: 3px solid ${(props) => props.theme.color['primary-500']};
      }
    }
  }
`
