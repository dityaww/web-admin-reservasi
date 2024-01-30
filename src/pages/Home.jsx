import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function Home() {
  return (
    <div className="flex flex-row h-screen w-full">
      <Sidebar />
      <section className="flex-1 flex-row h-screen overflow-y-auto px-16 py-14">
        <Navbar />
        
        <div className="mt-10">
            <h1 className='font-bold text-2xl text-neutral-600'>Welcome to Dashboard Admin Gunung Ungaran</h1>
            <div className="grid grid-cols-4 gap-5">
                <div className="bg-blue-200 rounded-md h-56">1</div>
                <div className="bg-blue-200 rounded-md h-56">1</div>
                <div className="bg-blue-200 rounded-md h-56">1</div>
                <div className="bg-blue-200 rounded-md h-56">1</div>
                <div className="bg-blue-200 rounded-md h-56">1</div>
                <div className="bg-blue-200 rounded-md h-56">1</div>
                <div className="bg-blue-200 rounded-md h-56">1</div>
                <div className="bg-blue-200 rounded-md h-56">1</div>
                <div className="bg-blue-200 rounded-md h-56">1</div>
                <div className="bg-blue-200 rounded-md h-56">1</div>
                <div className="bg-blue-200 rounded-md h-56">1</div>
                <div className="bg-blue-200 rounded-md h-56">1</div>
                <div className="bg-blue-200 rounded-md h-56">1</div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Home