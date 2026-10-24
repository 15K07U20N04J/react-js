import React from 'react'

const Card = ({name, children}) => {
    return (
        <div>
            <h2>{name}</h2>
            {children}
        </div>
    )
}

export default Card
