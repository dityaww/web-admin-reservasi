import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authLogin } from '../api/api'
import login from '../assets/login.png'
import axios from "axios"

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()

  const onSubmit = async () => {
    const data = {
      email, password
    }

    try {
      const response = await authLogin(data)
      localStorage.setItem('token', response.data.token)

      const token = localStorage.getItem('token')

      if(token){
        axios.get(`https://api.gunungungaran.site/auth/whoami`, {
          headers: {
            "Authorization": token
          }
        }).then((res) => {
          console.log(res.data);
          if (res.data.data.user_type === 'admin') {
            navigate('/dashboard')
          }else{
            alert('anda bukan admin')
          }
        }).catch((err) => {
          console.log(err);
        })
      }
      setIsError(false)
    } catch (error) {
      setIsError(true)
      console.log(error);
    }

  }

  return (
    <section className='w-full min-h-screen'>
      <div className="grid grid-cols-2 min-h-screen divide-x-2 py-5">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className='flex flex-col items-center gap-8'>
            <p className='text-4xl font-bold'>Ungaran<span className='font-light'>Hike</span></p>
            <p className='text-gray-600 w-56 text-center text-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.</p>
          </div>
          <div className="w-[70%]">
            <img src={login} alt="no-img" loading='lazy' />
          </div>
        </div>
        <div className="p-20">
          <div className="flex flex-col justify-center gap-10">
            <div className="flex flex-col gap-4">
              <p>Lets start</p>
              <p className='font-bold text-4xl'>Sign In to Ungaran<span className='font-light'>Hike</span></p>
            </div>

            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-2">
              {isError === true && (
                  <div id="alert-2" class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50" role="alert">
                    <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span class="sr-only">Info</span>
                    <div class="ms-3 text-sm font-medium">
                      Email dan password salah
                    </div>
                    <button onClick={() => setIsError(false)} type="button" class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#alert-2" aria-label="Close">
                      <span class="sr-only">Close</span>
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                    </button>
                  </div>
              )}
                <label htmlFor="email">Email</label>
                <input 
                  id='email'
                  type="email" 
                  placeholder='Input your email'
                  className='border border-neutral-300 px-5 py-4 outline-blue-600 rounded-md'
                  value={email}
                  onChange={({target}) => setEmail(target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input 
                  id='password'
                  type="password" 
                  placeholder='Input your password'
                  className='border border-neutral-300 px-5 py-4 outline-blue-600 rounded-md'
                  value={password}
                  onChange={({target}) => setPassword(target.value)}
                />
              </div>
              <button onClick={onSubmit} className='bg-blue-700 text-white rounded-md py-5'>
                Sign In
              </button>

            </div>
          </div>
          
          {/* <Link to='/dashboard' className='border-2 border-blue-500 px-6 py-1 rounded-md text-blue-600 font-bold'>
            Dashboard
          </Link> */}
        </div>
      </div>
    </section>
  )
}

export default Login