import React, { useContext } from 'react'
import { UserContext } from '../App'

const ChildC = () => {

    const { user, setUser } = useContext(UserContext)
    return (
        <div>
            <h1>Child C</h1>
            <h1>{user.name}</h1>
        </div>
    )
}

export default ChildC
