'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import cookieCutter from 'cookie-cutter';

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      let res = await response.json();
      if(res.message === "Login Successful") {
        console.log(cookieCutter.get('userID'));
        router.push("/profile/1");
      }
      setMessage(res.message)
    } catch (e) {
      console.log(e);
      setMessage("That login combo could not be found");
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

    return (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap" rel="stylesheet" />
        <main className="flex min-h-screen flex-col items-center">
          
        <div className="relative flex place-items-center" style={{height : '35vh'}}>
          <p2 style={{fontSize : '4rem'}}> Log In </p2>
        </div>
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                <p> Username </p>
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name="username" onChange={handleInputChange} type="text" placeholder="Username"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                <p> Password </p>
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name="password" onChange={handleInputChange} type="password" placeholder="*****"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                <p> {message} </p>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button 
                className="bg-Moonstone hover:bg-Moonstone-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
                Log In
              </button>
            </div>
          </form>
        </div>
      </main>
      </>
    )
  }