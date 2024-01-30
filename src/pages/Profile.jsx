import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function Profile() {
  return (
    <div className="flex flex-row h-screen w-full">
    <Sidebar />
      <section className="px-16 flex-1 pt-14 h-screen overflow-y-auto">
          <Navbar/>

          <div className="mt-10">
              <h1 className='font-bold text-2xl text-neutral-600 font-nw'>Profile</h1>

          </div>

      </section>
    </div>
  )
}

export default Profile