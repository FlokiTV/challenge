import { useEffect, useState } from "react";
import type { Task, TaskStatus } from "./lib/db";
import * as db from "./lib/db";
import Card from "./components/card";

function App() {
  const [keys, setKeys] = useState<TaskStatus>({});
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(title: string, description: string) {
    db.add({
      title,
      description,
      status: "PENDING",
    });
    setTasks([...db.getAll()]);
  }

  function rmTask(id: number) {
    console.log("remove " + id);
    db.remove(id);
    setTasks([...db.getAll()]);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    addTask(String(values.title), String(values.description));
  }

  useEffect(() => {
    setKeys(db.getKeys());
    setTasks([...db.getAll()]);
  }, []);

  return (
    <div className="fixed inset-0 flex md:items-center md:justify-center bg-zinc-50">
      <div className="max-w-[1200px] flex flex-col min-h-[100vh] md:min-h-[80vh] w-full p-6 px-8 bg-white rounded-xl shadow">
        <div className="text-3xl font-bold uppercase">Tarefas</div>
        <form onSubmit={onSubmit}>
          <label>
            <span>Título:</span>
            <input type="text" name="title" required />
          </label>
          <label>
            <span>Descrição:</span>
            <textarea name="description" required></textarea>
          </label>
          <button>Adicionar</button>
        </form>
        <div className="flex grow gap-2 mt-4 p-2 flex-col md:flex-row">
          {Object.keys(keys)?.map((key, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col bg-zinc-100 rounded"
            >
              <div className="text-lg font-semibold p-2 px-4">{keys[key]}</div>
              <div className="grow relative">
                <div className="absolute p-4 inset-0 overflow-auto flex flex-col gap-2">
                  {tasks
                    .filter((task) => task.status === key)
                    .map((task, index) => (
                      <Card
                        task={task}
                        key={index}
                        onDelete={rmTask}
                        onEdit={() => {}}
                      />
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
