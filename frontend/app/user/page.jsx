"use client"
import React, { useEffect, useState } from 'react'

const User = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = async () => {
        try {
            const res = await fetch('http://127.0.0.1:5000/api/users')
            const data = await res.json()
            setUsers(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">User List</h2>
            <ul className="list-disc pl-6">
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <li key={index} className="text-lg text-gray-700 py-2 flex flex-col">
                            <span className="font-semibold">{user.name}</span>
                            <span className="text-sm text-gray-600">{user.email}</span>
                            <span className="text-sm text-gray-500 capitalize">{user.role}</span>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No users found.</p>
                )}
            </ul>
        </div>

    )
}

export default User