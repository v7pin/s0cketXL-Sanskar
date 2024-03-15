import React from "react";
import { IoIosPerson, IoIosArrowDown } from "react-icons/io";
import { IoLockClosed } from "react-icons/io5";

import {IoIosMail} from "react-icons/io";
import { Link } from "react-router-dom";
import SignupSVG from "../assets/signupwave.svg";
import icon1 from "../assets/signupLogo.svg";
import { useState } from "react";
const SignupPage = () => {
  // State for user input
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the form from causing a page reload
    const user = { email, username, password };

    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Signup successful!');
        // Redirect the user or clear form
        window.location.href = '/dashboard';
      } else {
        alert(`Signup failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again later.');
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div className="cred  flex-1 flex justify-center items-center">
        <div className="flex flex-col gap-6 justify-center items-center ">
          <form onSubmit={handleSignup} className="text-center ">
            <h1 className="mb-8 text-4xl font-bold">Sign Up</h1>
            <div className="mb-6 relative m-3">
              <IoIosMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" size={24} />
              <input
                className="shadow appearance-none border rounded-3xl w-full text-base py-3 pl-10 pr-20 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 font-semibold"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6 relative m-3">
              <IoIosPerson className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" size={24} />
              <input
                className="shadow appearance-none border rounded-3xl w-full text-base py-3 pl-10 pr-20 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 font-semibold"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6 relative m-3">
              <IoLockClosed className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" size={24} />
              <input
                className="shadow appearance-none border rounded-3xl w-full text-base py-3 pl-10 pr-20 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 font-semibold"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-full focus:outline-none focus:shadow-outline mb-4"
                type="submit"
              >
                Sign Up
              </button>
              <Link to={"/"} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Already have an account? Log in here
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="img flex-1 relative">
        <img src={SignupSVG} alt="Wave Background" className="absolute inset-0 w-full h-full object-cover" />
        <img src={icon1} alt="Icon" className="absolute bottom-0 right-0 mb-4 mr-0 w-96 h-72 " />
      </div>
    </div>
  );
};

export default SignupPage;