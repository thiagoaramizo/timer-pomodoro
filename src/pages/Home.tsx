import { HandPalm, Play } from '@phosphor-icons/react'
import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { Countdown } from '../components/Countdown'
import { TaskType } from '../@types/TaskType'
import { StartButton } from '../components/StartButton'
import { StopButton } from '../components/StopButton'
import { NewTaskForm } from '../components/NewTaskForm'
import { TaskContext } from '../contexts/TaskContext'

const newTaskFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'A atividade deve ser de no mínimo 05 minutos')
    .max(60, 'A atividade deve ser de no máximo 60 minutos'),
})

type newTaskForm = zod.infer<typeof newTaskFormValidationSchema>

export function Home() {
  const { activeTask, stopActiveTask, addNewTask } = useContext(TaskContext)
  const newTaskForm = useForm<newTaskForm>({
    resolver: zodResolver(newTaskFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newTaskForm

  const watchTask = watch('task')
  const isSubmitButtomDisable = !watchTask

  const handleAddNewTask = (data: newTaskForm) => {
    const newTask: TaskType = {
      id: uuidv4(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      status: 'yellow',
      startDate: new Date(),
    }
    addNewTask(newTask)
    reset()
  }

  return (
    <HomeWrapper>
      <form action="" onSubmit={handleSubmit(handleAddNewTask)}>
        <FormProvider {...newTaskForm}>
          <NewTaskForm />
        </FormProvider>

        <Countdown />

        {activeTask ? (
          <StopButton type="button" onClick={stopActiveTask}>
            <HandPalm size={24} />
            Parar
          </StopButton>
        ) : (
          <StartButton type="submit" disabled={isSubmitButtomDisable}>
            <Play size={24} />
            Começar
          </StartButton>
        )}
      </form>
    </HomeWrapper>
  )
}

const HomeWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`
