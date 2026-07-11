import React from 'react'
import { useParams } from 'react-router-dom';

const StudentDetails = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Student Details</h1>
            <p>Student ID: {id}</p>
        </div>
    )
}

export default StudentDetails
