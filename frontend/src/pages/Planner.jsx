// Planner.jsx (Corrected)

import React, { useState, useEffect } from 'react'; // 💡 Import useEffect
import Navbar from '../components/Navbar';
import api, { setAuthToken } from '../lib/api'; // 💡 Import setAuthToken
import { useAuth } from '../context/AuthContext'; // 💡 Import useAuth

export default function Planner(){
    const [goal, setGoal] = useState('');
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // 💡 GET THE TOKEN from the AuthContext
    const { token } = useAuth(); 

    // 🚨 THE FIX: Ensure the token is set on the API instance when the component loads
    useEffect(() => {
        if (token) {
            setAuthToken(token);
            console.log("Planner: Token successfully set for API calls.");
        } else {
            // This case should be handled by your PrivateRoute, but good for debugging.
            console.log("Planner: No token available."); 
        }
    }, [token]); 
    // This runs once when component mounts, and again if the token state changes.


    async function generate(e){
        e.preventDefault();
        setLoading(true);
        setPlan(null);
        try {
            // This API call will now use the token set above
            const res = await api.post('/plan', { goal });
            setPlan(res.data);
        } catch(err){
            // If the error is 401, the frontend redirection will happen here.
            alert(err.response?.data?.message || 'Error generating plan');
        } finally { setLoading(false); }
    }

    return (
        // ... rest of your return JSX ...
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="p-6 max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
                    <h2 className="text-2xl font-semibold mb-4">Smart Task Planner</h2>
                    <form onSubmit={generate} className="space-y-4">
                        <textarea className="w-full px-3 py-2 border rounded" rows={4} placeholder='Example: "Launch MVP in 2 weeks with initial marketing"' value={goal} onChange={e=>setGoal(e.target.value)} required />
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded" disabled={loading}>{loading ? 'Generating...' : 'Generate Plan'}</button>
                    </form>
                    {/* ... plan rendering ... */}
                    {plan && (
                         <div className="mt-6">
                            {plan.tasks ? (
                                <>
                                    <h3 className="text-xl font-semibold mb-2">Plan</h3>
                                    <ul className="space-y-3">
                                        {plan.tasks.map((t, i) => (
                                            <li key={i} className="p-3 border rounded bg-gray-50 dark:bg-gray-700">
                                                <div className="font-semibold">{t.title}</div>
                                                <div className="text-sm">{t.description}</div>
                                                <div className="text-xs text-gray-500">Due in days: {t.due_in_days ?? (t.due || '—')}</div>
                                                {t.depends_on && <div className="text-xs text-gray-500">Depends on: {Array.isArray(t.depends_on) ? t.depends_on.join(', ') : t.depends_on}</div>}
                                            </li>
                                        ))}
                                    </ul>
                                    {plan.suggestions && <div className="mt-4 italic text-sm">{plan.suggestions}</div>}
                                </>
                            ) : (
                                <pre className="whitespace-pre-wrap">{JSON.stringify(plan, null, 2)}</pre>
                            )}
                         </div>
                    )}
                </div>
            </main>
        </div>
    );
}