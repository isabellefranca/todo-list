import { useEffect, useState } from "react"

export default function App() {
  const [newItem, setNewItem] = useState('');
  const [todos, setTodos] = useState(() => {
    const lovalValue = localStorage.getItem('ITEMS')
    if (lovalValue == null) return []
    return JSON.parse(lovalValue)
  });

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todos))
  }, [todos])

  function handleSubmit (e) {
    e.preventDefault();

    if(newItem.trim() !== '') {
      setTodos([...todos, { text: newItem, completed: false }]);
      setNewItem('');
    }
  }

  function deleteTodos (id) {
    const updatedTodo = todos.filter((_, i) => i !== id);
    setTodos(updatedTodo);
  }

  function toggleCompleted(id) {
    const updatedTodo = todos.map((todo, i) => 
    i === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodo);
  }

  return (
    <>
      <div className="max-w-md mx-auto mt-6 bg-stone-50 rounded p-3 shadow-md">
        <form onSubmit={handleSubmit} className="mb-4 flex flex-row justify-between">
          <div className="flex items-center py-2">
            <input type="text" id="item" placeholder="Novo item" value={newItem} onChange={e => setNewItem(e.target.value)} className="border-none w-full text-gray-700 mr-3 p-2 leading-tight focus:outline-none rounded bg-transparent" />
          </div>
          <button className="flex-shrink-0 bg-pink-500 hover:bg-pink-700 text-sm  text-white p-2 rounded" type="submit">Add</button>
        </form>

        <div>
          <h1 className="font-bold text-xl mb-4 px-2">Todo List</h1>
          <ul className="list-none">
            {todos.map((todo, id) => (
              <li key={id} className='flex items-center justify-between border-b border-pink-500 p-2'>
                <label className={todo.completed ? 'line-through' : ''}>
                  <input type="checkbox" className="mr-2 form-checkbox h-4 2-4 text-pink-500" checked={todo.completed} onChange={() => toggleCompleted(id)}/>
                  <span>{todo.text}</span>
                </label>
                <button onClick={() => deleteTodos(id)} className="bg-pink-500 text-white text-sm rounded py-1 px-2 hover:bg-pink-700">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}