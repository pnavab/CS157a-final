'use client'

import React, { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData)
    if(formData.password != formData.confirmPassword) setMessage("Passwords do not match")
    else{
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        let res = await response.json();
        console.log(res)
        if(res.error.errno == 19) setMessage("The UserName already Exists")
        else setMessage("Succesfully Signed up")
      } catch (e) {
        console.error(e)
        setMessage("Error")
      }
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
          <p2 style={{fontSize : '4rem'}}> Sign Up </p2>
        </div>
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
                <p> Full Name </p>
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullname" name="fullname" onChange={handleInputChange} type="text" placeholder="Johnny Sins"/>
            </div>
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
                <p> Confirm Password </p>
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirmpassword" name="confirmPassword" onChange={handleInputChange} type="password" placeholder="*****"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                <p> {message} </p>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button 
                className="bg-Moonstone hover:bg-Moonstone-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </main>
      </>
    )
  }