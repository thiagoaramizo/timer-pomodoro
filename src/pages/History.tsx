import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useContext } from 'react'
import styled from 'styled-components'
import { StatusTag } from '../components/StatusTag'
import { TaskContext } from '../contexts/TaskContext'

export function History() {
  const { tasks } = useContext(TaskContext)

  return (
    <HistoryWrapper>
      <h1>Meu histórico</h1>

      <Historylist>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              return (
                <tr key={task.id}>
                  <td>{task.task}</td>
                  <td>
                    {task.minutesAmount}{' '}
                    {task.minutesAmount > 1 ? 'minutos' : 'minuto'}
                  </td>
                  <td>
                    <time title={new Date(task.startDate).toISOString()}>
                      {formatDistanceToNow(new Date(task.startDate), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </time>
                  </td>
                  <td>
                    <StatusTag status={task.status} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Historylist>
    </HistoryWrapper>
  )
}

const HistoryWrapper = styled.div`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;

  & h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme.color['gray-100']};
  }
`

const Historylist = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  & table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    & th {
      background-color: ${(props) => props.theme.color['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme.color['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    & td {
      background-color: ${(props) => props.theme.color['gray-700']};
      border-top: 4px solid ${(props) => props.theme.color['gray-800']};
      padding: 1rem;
      text-align: left;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        padding-left: 1.5rem;
        width: 50%;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }

    & tr {
      &:last-child {
        & td {
          &:first-child {
            border-bottom-left-radius: 8px;
          }

          &:last-child {
            border-bottom-right-radius: 8px;
          }
        }
      }
    }
  }
`
