import React from 'react'
import './UserCard.css'

const UserCard = ({name, desc}) => {
    return (
        <div className="user-container">
            <p>{name}</p>
            <img src="https://images.unsplash.com/photo-1682685790910-1f3c5e7b6d8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt={name} />
            <p>{desc}</p>
        </div>
    )
}

export default UserCard;
