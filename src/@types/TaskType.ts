export interface TaskType {
  id: string
  task: string
  minutesAmount: number
  status: 'green' | 'yellow' | 'red'
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}
