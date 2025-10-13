import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import api, { setAuthToken } from '../lib/api';
import { useAuth } from '../context/AuthContext';

function TaskForm({ onSave, initial }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [dueDate, setDueDate] = useState(initial?.dueDate ? initial.dueDate.slice(0,10) : '');

  async function submit(e){
    e.preventDefault();
    await onSave({ title, description, dueDate });
    setTitle(''); setDescription(''); setDueDate('');
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <input className="w-full px-3 py-2 border rounded" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <input className="w-full px-3 py-2 border rounded" type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
      <button className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
    </form>
  );
}

export default function Dashboard(){
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [plans, setPlans] = useState({});  // 🔥 store taskId → plan data
  const [loadingPlans, setLoadingPlans] = useState({}); // track loading states

  useEffect(()=>{
    if(token) setAuthToken(token);
    fetchTasks();
  }, [token]);

  async function fetchTasks(){
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch(err){ console.error(err); }
  }

  async function createTask(data){
    await api.post('/tasks', data);
    fetchTasks();
  }

  async function updateTask(id, data){
    await api.put(`/tasks/${id}`, data);
    fetchTasks();
  }

  async function deleteTask(id){
    if(!confirm('Delete task?')) return;
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  }

  // 🔥 Generate Plan for a specific task
  async function generatePlan(task){
    try {
      setLoadingPlans(prev => ({ ...prev, [task._id]: true }));
      const prompt = `Create a detailed action plan to complete the task "${task.title}" described as "${task.description}" before the deadline ${task.dueDate}.`;
      const res = await api.post('/plan', { goal: prompt });
      setPlans(prev => ({ ...prev, [task._id]: res.data }));
    } catch (err) {
      alert(err.response?.data?.message || "Error generating plan");
    } finally {
      setLoadingPlans(prev => ({ ...prev, [task._id]: false }));
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Your Tasks</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar form */}
          <div className="md:col-span-1 bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-3">{editing ? 'Edit Task' : 'Add Task'}</h2>
            <TaskForm initial={editing} onSave={async (data)=>{
              if(editing) { await updateTask(editing._id, data); setEditing(null); }
              else await createTask(data);
              fetchTasks();
            }} />
          </div>

          {/* Task list */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-4">
              {tasks.length === 0 ? (
                <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">No tasks yet.</div>
              ) : (
                tasks.map(t => (
                  <div key={t._id} className="p-4 bg-white dark:bg-gray-800 rounded shadow space-y-2">
                    <TaskCard task={t} onEdit={()=>setEditing(t)} onDelete={()=>deleteTask(t._id)} />
                    
                    {/* Generate Plan button */}
                    <button
                      onClick={()=>generatePlan(t)}
                      className="px-3 py-1 bg-amber-500 text-white rounded text-sm"
                      disabled={loadingPlans[t._id]}
                    >
                      {loadingPlans[t._id] ? 'Generating...' : 'Generate Plan'}
                    </button>

                    {/* Plan display */}
                    {plans[t._id] && (
                      <div className="mt-3 bg-gray-50 dark:bg-gray-700 p-3 rounded">
                        <h4 className="font-semibold mb-2 text-indigo-600">Smart Plan</h4>
                        {plans[t._id].tasks ? (
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {plans[t._id].tasks.map((step, i) => (
                              <li key={i}>
                                <span className="font-medium">{step.title}:</span> {step.description}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(plans[t._id], null, 2)}</pre>
                        )}
                        {plans[t._id].suggestions && (
                          <div className="mt-2 italic text-xs text-gray-500">
                            {plans[t._id].suggestions}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
