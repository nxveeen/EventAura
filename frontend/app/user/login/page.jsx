"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppStore, useAppSelector } from '@/lib/hooks';
import { increment, decrement } from '@/lib/features/counter/counterSilce';

const Login = () => {
    // const dispatch = useAppDispatch() //dispatch actions
    // const countStore = useAppSelector(state => state.counter.value) //store
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const router = useRouter();  // Initialize useRouter

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(response);
            if (response.status === 200) {
                setMessage('Login successful!');
                router.push('/dashboard');  // Redirect to dashboard or another page
            }
        } catch (error) {
            setMessage('Login failed: ' + error.response);
        }
    };


    return (
        <div className="login p-6 max-w-sm mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-semibold">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
            </form>
            {/* <button type="button" onClick={() => { dispatch(increment()) }} className="w-full my-3 bg-blue-500 text-white p-2 rounded">add</button>
            <button type="button" onClick={() => { dispatch(decrement()) }} className="w-full my-3 bg-blue-500 text-white p-2 rounded">subtract</button> */}
            {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
    );
};

export default Login;
