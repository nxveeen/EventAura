"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const Register = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'attendee', // default role set to attendee
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                router.push('/user/login')
                console.log(data);
                setMessage('Registration successful!');
            } else {
                // Capture error details returned by the server
                setMessage('Registration failed: ' + (data.message || 'Unknown error'));
                console.log('Server Response:', data);  // Log the entire response for debugging
            }
        } catch (error) {
            setMessage('Registration failed: ' + error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-semibold">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Role:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    >
                        <option value="attendee">Attendee</option>
                        <option value="organizer">Organizer</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Register
                </button>
            </form>
            {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
    );
};

export default Register;
