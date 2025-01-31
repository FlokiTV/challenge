const TasksEnum = {
  PENDING: "Pendente",
  PROGRESS: "Em andamento",
  COMPLETED: "Feito",
} as const;

interface Task {
  id: number;
  title: string;
  description: string;
  status: keyof typeof TasksEnum;
}

const Tasks: Task[] = [];

export function getKeys() {
  return TasksEnum;
}

export function getAll() {
  return Tasks;
}

export function add(task: Task) {
  task.id = Date.now();
  Tasks.push(task);
  return task;
}

export function update(task: Task) {
  const index = Tasks.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    Tasks[index] = task;
  }
  return task;
}

export function move(id: number, status: keyof typeof TasksEnum) {
  const task = Tasks.find((t) => t.id === id);
  if (task) {
    task.status = status;
  }
  return task;
}

export function remove(id: number) {
  const index = Tasks.findIndex((t) => t.id === id);
  if (index !== -1) {
    Tasks.splice(index, 1);
  }
  return id;
}
