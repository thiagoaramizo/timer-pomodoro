import { createContext, ReactNode, useEffect, useReducer } from 'react'

import { TaskType } from '../@types/TaskType'

interface TaskContextType {
  tasks: TaskType[]
  activeTask: TaskType | undefined
  activeTaskId: string | undefined
  finishActiveTask: () => void
  stopActiveTask: () => void
  addNewTask: (newTask: TaskType) => void
}

export const TaskContext = createContext({} as TaskContextType)

interface TaskContextProviderProps {
  children: ReactNode
}

interface TasksStateType {
  tasks: TaskType[]
  activeTaskId: string | undefined
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  // const [tasks, setTasks] = useState<TaskType[]>([])
  // const [activeTaskId, setActiveTaskId] = useState<string>()

  const [tasksState, dispatchTasksState] = useReducer(
    (state: TasksStateType, action: any) => {
      if (action.type === 'add') {
        return {
          tasks: [action.payload.task, ...state.tasks],
          activeTaskId: action.payload.task.id,
        }
      } else if (action.type === 'stop') {
        return {
          tasks: state.tasks.map((t) => {
            if (t.id === action.payload.activeTaskId) {
              t = { ...t, interruptedDate: new Date(), status: 'red' }
            }
            return t
          }),
          activeTaskId: undefined,
        }
      } else if (action.type === 'finish') {
        return {
          tasks: state.tasks.map((t) => {
            if (t.id === action.payload.activeTaskId) {
              t = { ...t, finishedDate: new Date(), status: 'green' }
            }
            return t
          }),
          activeTaskId: undefined,
        }
      } else return state
    },
    {
      tasks: [],
      activeTaskId: undefined,
    },
    (initialState) => {
      const storedJSON = localStorage.getItem(
        '@timer-pomodoro-aramizo:tasks-1.0.0',
      )
      if (storedJSON) {
        const storedJSONParsed = JSON.parse(storedJSON)
        const TaskStateFromJSON: TasksStateType = {
          tasks: storedJSONParsed.tasks as TaskType[],
          activeTaskId: storedJSONParsed.activeTaskId,
        }
        return TaskStateFromJSON
      }
      return initialState
    },
  )

  const { tasks, activeTaskId } = tasksState
  const activeTask = tasks.find((task) => task.id === activeTaskId)

  useEffect(() => {
    const stateJSON = JSON.stringify(tasksState)
    console.log('Salvando local: ' + stateJSON)
    localStorage.setItem('@timer-pomodoro-aramizo:tasks-1.0.0', stateJSON)
  }, [tasksState])

  const addNewTask = (newTask: TaskType) => {
    dispatchTasksState({
      type: 'add',
      payload: {
        task: newTask,
      },
    })
  }

  const stopActiveTask = () => {
    dispatchTasksState({
      type: 'stop',
      payload: {
        activeTaskId,
      },
    })
  }

  const finishActiveTask = () => {
    dispatchTasksState({
      type: 'finish',
      payload: {
        activeTaskId,
      },
    })
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        activeTask,
        activeTaskId,
        finishActiveTask,
        stopActiveTask,
        addNewTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
