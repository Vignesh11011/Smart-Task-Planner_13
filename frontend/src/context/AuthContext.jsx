// AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
// 1. 🚨 NECESSARY ADDITION: Import setAuthToken
import { setAuthToken } from '../lib/api'; 

const AuthContext = createContext();

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const t = localStorage.getItem('token');
        const u = localStorage.getItem('user');
        
        if(t && u){
            setToken(t);
            setUser(JSON.parse(u));
            
            // 2. 🚨 THE CRITICAL FIX: Set the token on the global API utility 
            //    This ensures authentication after a page reload.
            setAuthToken(t); 
        }
    }, []);

    function save(auth){
        localStorage.setItem('token', auth.token);
        localStorage.setItem('user', JSON.stringify(auth.user));
        setToken(auth.token);
        setUser(auth.user);
        
        // 3. FIX: Ensure token is set on the API object immediately after successful auth
        setAuthToken(auth.token);
    }
    
    function logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        
        // 4. FIX: Clear the token from the global API utility on logout
        setAuthToken(null);
    }

    return <AuthContext.Provider value={{ user, token, save, logout }}>{children}</AuthContext.Provider>
}

export function useAuth(){ return useContext(AuthContext); }