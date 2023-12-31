import React, { useState, useRef, useContext } from 'react'
import { signInWithEmail } from '../modules/auth';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AppContexts';

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setIsAuthenticated } = useContext(AuthContext)

    const handleLogin = async (e) => {
        e.preventDefault();

        email = emailRef.current.value
        password = passwordRef.current.value

        try {
            console.log(email, password)
            await signInWithEmail(email, password).then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user)
                // You can access various properties of the user object
                console.log(user.uid, user.email, user.displayName);
            })

            toast.success('Sign In successful', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log('success')
            setIsAuthenticated(true)

            // Handle successful login
        } catch (error) {
            // Handle login error
            setIsAuthenticated(false)
            console.log(error)
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div className="w-full bg-gray-200 flex flex-col justify-center items-center h-[100vh] gap-20">
            <img src="/logo.png" alt="" />
            <div className="bg-brown rounded-md w-11/12 md:w-3/4 desktop:w-1/2 h-fit py-4 flex flex-col px-3 items-center">
                <h4 className='text-3xl text-white font-bold p-5 w-full text-center border-gray-400 border-opacity-10 border-b-2'>Login</h4>

                <form onSubmit={handleLogin} className='w-3/4 py-4 md:shadow-desktop'>

                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email address</label>
                        <input type="email" ref={emailRef} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                        <input type="password" ref={passwordRef} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    </div>

                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-300">Remember me</label>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>

            </div>
        </div>
    )
}

export default Login