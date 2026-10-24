import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const navigate = useNavigate();

    return (
        <div>
            <h1>Dashboard</h1>
            <Outlet />
            <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
    )
}

export default Dashboard
