import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { TaskContext } from '../contexts/TaskContext'

export function Countdown() {
  const { activeTask, activeTaskId, finishActiveTask } = useContext(TaskContext)
  const [secondsPassed, setSecondsPassed] = useState(() => {
    if (activeTask) {
      return differenceInSeconds(new Date(), new Date(activeTask.startDate))
    } else {
      return 0
    }
  })
  const totalSeconds = activeTask ? activeTask.minutesAmount * 60 : 0
  const seconds = activeTask ? totalSeconds - secondsPassed : 0
  const minutesAmount = Math.floor(seconds / 60)
  const secondAmount = Math.floor(seconds % 60)
  const minutesString = String(minutesAmount).padStart(2, '0')
  const secondsString = String(secondAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeTask) {
      interval = setInterval(() => {
        const timeDifference = differenceInSeconds(
          new Date(),
          new Date(activeTask.startDate),
        )
        if (timeDifference >= totalSeconds) {
          finishActiveTask()
          clearInterval(interval)
        } else {
          setSecondsPassed(timeDifference)
        }
      }, 1000)
    }
    return () => {
      setSecondsPassed(0)
      clearInterval(interval)
    }
  }, [activeTask, totalSeconds, activeTaskId, finishActiveTask])

  return (
    <CountdownWrapper>
      <span>{minutesString[0]}</span>
      <span>{minutesString[1]}</span>
      <Separator>:</Separator>
      <span>{secondsString[0]}</span>
      <span>{secondsString[1]}</span>
    </CountdownWrapper>
  )
}

const CountdownWrapper = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  font-weight: bold;
  line-height: 8rem;
  color: ${(props) => props.theme.color['gray-100']};
  display: flex;
  gap: 1rem;

  & span {
    background-color: ${(props) => props.theme.color['gray-700']};
    padding: 2rem 1rem;
    border-radius: 1rem;
  }
`
const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme.color['primary-500']};
  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`
