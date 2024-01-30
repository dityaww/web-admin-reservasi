import React from 'react'
import { Link } from 'react-router-dom'
import NoRoute from '../assets/no-route.png'

function NoRoutes() {
  return (
    <div className="px-16 flex-1 pt-14 h-screen overflow-y-auto">
        <div className="flex flex-col gap-5 justify-center items-center h-full">
            <img src={NoRoute} alt="" className='w-96'/>
            <p className='italic'>page not found!</p>
            <Link to='/dashboard' className='bg-blue-600 rounded-lg uppercase text-white font-nw font-bold px-4 py-1'>
              back to home
            </Link>
        </div>
    </div>
  )
}

export default NoRoutes