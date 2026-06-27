import React from 'react'

const Card = ({ name, setName }) => {
    return (
        <>
            <div>Value in child : {name}</div>
            <input type="text" placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} />
        </>
    ) 
}

export default Card
