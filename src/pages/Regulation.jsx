import React, { useEffect, useState } from 'react'
import { deleteRegulation, getRegulation } from '../api/api'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json'; // Ganti dengan path file JSON Lottie Anda

function Regulation() {
  const [ data, setData ] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetch = async () => {
      const response = await getRegulation()
      return response.data
    }

    fetch().then((res) => {
      setData(res)
      // console.log(res);
    }).catch((err) => {
      console.log(err);
    })

  }, [data])

  const animations = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const deleteRules = async (id, tokens) => {
    const response = await deleteRegulation(id, tokens)
    console.log(response);
  }

  return (
    <div className="flex flex-row h-screen w-full">
      <Sidebar />
      <section className="px-16 flex-1 pt-14 h-screen overflow-y-auto">
          <Navbar/>

          <div className="mt-10">
              <h1 className='font-bold text-2xl text-neutral-600 font-nw'>Regulation</h1>
      
              <button data-modal-target="default-modal" data-modal-toggle="default-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
                Toggle modal
              </button>

              <div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div class="relative p-4 w-full max-w-2xl max-h-full">
                    
                      <div class="relative bg-white rounded-lg shadow">
                        
                          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                              <h3 class="text-xl font-semibold text-gray-900">
                                  Terms of Service
                              </h3>
                              <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                  </svg>
                                  <span class="sr-only">Close modal</span>
                              </button>
                          </div>
                          
                          <div class="p-4 md:p-5 space-y-4">
                              <p class="text-base leading-relaxed text-gray-500">
                                  With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                              </p>
                              <p class="text-base leading-relaxed text-gray-500">
                                  The European General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                              </p>
                          </div>
                          
                          <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                              <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">I accept</button>
                              <button data-modal-hide="default-modal" type="button" class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Decline</button>
                          </div>
                      </div>
                  </div>
              </div>


              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                              <th scope="col" className="px-6 py-3">
                                  No
                              </th>
                              <th scope="col" className="px-6 py-3 w-[80%]">
                                  Regulasi
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Aksi
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          {data.length !== 0 ? (
                            data.map((items, id) => (
                              <tr className="bg-white border-b hover:bg-gray-50">
                                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                      {id+1}
                                  </th>
                                  <td className="px-6 py-4">
                                      {items.rule}
                                  </td>
                                  <td className="px-6 py-4 flex gap-3">
                                      <buton className="font-medium text-blue-600 hover:underline hover:cursor-pointer ">Edit</buton>
                                      <buton onClick={() => deleteRules(items.id, token)} className="font-medium text-red-600 hover:underline hover:cursor-pointer">Delete</buton>
                                  </td>
                              </tr>
                            ))
                          ) : (
                            <p className='italic p-6 w-full'>loading...</p>
                          )
                          }
                      </tbody>
                  </table>
              </div>
          </div>
      </section>
    </div>
  )
}

export default Regulation