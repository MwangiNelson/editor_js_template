import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login'
import { AuthContext } from '../contexts/AppContexts'
import Dashboard from '../pages/dashboard'

function NavigationRoutes() {

    const { isAuthenticated } = useContext(AuthContext)

    return (
        <Routes>
            <Route path='/' element={isAuthenticated ? <Dashboard /> : <Login />} />
            <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Login />} />
            
        </Routes>
    )
}

export default NavigationRoutes 