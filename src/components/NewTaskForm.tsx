import styled from 'styled-components'
import { useFormContext } from 'react-hook-form'

export function NewTaskForm() {
  const { register } = useFormContext()

  return (
    <FormWrapper>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        placeholder="Informe a tarefa"
        list="taskSugestions"
        {...register('task')}
      />
      <datalist id="taskSugestions">
        <option value={'projeto 1'} />
        <option value={'projeto 2'} />
        <option value={'projeto 3'} />
        <option value={'projeto 4'} />
      </datalist>

      <label htmlFor="minutesAmount"> durante </label>
      <MinutesInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={1}
        min={0}
        max={60}
        required
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos</span>
    </FormWrapper>
  )
}

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.color['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme.color['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme.color['gray-100']};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme.color['primary-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme.color['gray-500']};
  }
`

const TaskInput = styled(BaseInput)`
  flex: 1;
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

const MinutesInput = styled(BaseInput)`
  width: 4rem;
`
