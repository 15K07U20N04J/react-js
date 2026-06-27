import React, { useState } from 'react'
import './counter.css'

const Counter = () => {
    const [count, setCount] = useState(0)

    return (
        <div className='counter-container'>
            <h1>You have clicked {count} times</h1>
            <button className='counter-button' onClick={() => setCount(count + 1)}>Increment</button>
            <button className='counter-button' onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    )
}

export default Counter
