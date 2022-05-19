import axios from 'axios';
import { useEffect, useState } from 'react'

function App() {
  const [todo, setTodo] = useState([])
  const [complete, setComplete] = useState(false)


  const handleTask = async (e) => {
    e.preventDefault();
    const task = e.target.task.value;
    const description = e.target.description.value;

    const { data } = await axios.post('http://localhost:5000/todo', { task, description })
    console.log(data);
  }

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then((response) => {
        setTodo(response.data);
      })
  }, [todo])

  const handleDeleteTodo = async (id) => {
    const { data } = await axios.delete(`http://localhost:5000/todoDelete/${id}`)
    console.log(data);
  }
  return (
    <div className="text-center">
      <h1 className='text-5xl font-bold mt-10'>Fancy Todo</h1>
      <div className="mt-8">
        <form onSubmit={handleTask}>
          <div className="flex flex-col items-center">
            <input type="text" name="task" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs mb-2" />
            <textarea name="description" className="textarea textarea-primary w-full max-w-xs mb-3" placeholder="Bio"></textarea>
            <input type='submit' value='Add Task' className="btn btn-primary" />
          </div>
        </form>
      </div>

      <div className=''>
        {
          todo.map((tasks) => {
            const { task, description, _id } = tasks;
            return (
              <div key={tasks._id} className="rounded-lg bg-slate-50 shadow-xl w-6/12 mx-auto mt-3 p-3">
                <div className=" flex items-center justify-between">
                  <div className='flex'>
                    <h2 className="card-title mx-auto text-2xl">{task}</h2>
                    <p className={`ml-6 ${complete ? 'line-through text-gray-600' : ''}`}>{description}</p>
                  </div>
                  <div className="card-actions justify-center mt-2">
                    <button onClick={() => handleDeleteTodo(_id)} className="btn btn-error">Delete</button>
                    <button onClick={() => setComplete(true)} className="btn btn-success">Complete</button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;

