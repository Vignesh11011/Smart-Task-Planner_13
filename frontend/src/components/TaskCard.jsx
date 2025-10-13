import React from 'react';

export default function TaskCard({ task, onEdit, onDelete }){
  return (
    <div className={`border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800 ${task.completed ? 'opacity-70' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
        </div>
        <div className="text-sm text-gray-500">
          <div>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</div>
          <div className="mt-2 space-x-2">
            <button onClick={()=>onEdit(task)} className="px-2 py-1 bg-green-500 text-white rounded">Edit</button>
            <button onClick={()=>onDelete(task)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
