import React, { useEffect } from 'react'
import { useState } from 'react'
import { transactionPending, transactionSuccess } from '../api/api'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

function Pendakian() {
  const [data, setData] = useState([])
  const token = localStorage.getItem('token')
  const navigation = useNavigate()

  const getTransactionPending = async (t) => {
    const res = await transactionPending(t)
    setData(res.data)
    console.log(res.data);
  }

  console.log(data);

  const getTransactionSuccess = async (t) => {
    const res = await transactionSuccess(t)
    setData(res.data)
    console.log(res.data);
  }

  const handleNavigation = (id) => {
    navigation(`${id}`)
  }

  return (
    <div className="flex flex-row h-screen w-full">
      <Sidebar />
      <section className="px-16 flex-1 pt-14 h-screen overflow-y-auto">
          <Navbar/>

          <div className="mt-10">
              <h1 className='font-bold text-2xl text-neutral-600 font-nw'>Pendakian</h1>              
          </div>

            <div className="mt-5">
                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">Pilih Transaksi <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>

                <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                    <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <button onClick={() => getTransactionPending(token)} class="block px-4 py-2 hover:bg-gray-100 w-full text-left">Pending</button>
                    </li>
                    <li>
                        <button onClick={() => getTransactionSuccess(token)} class="block px-4 py-2 hover:bg-gray-100 w-full text-left">Sukses</button>
                    </li>
                    </ul>
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                              <th scope="col" className="px-6 py-3">
                                  No
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Ketua
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Metode Pembayaran
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Status Pembayaran
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Total
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Check-In
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Check-Out
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
                                      {items.ketua}
                                  </td>
                                  <td className="px-6 py-4">
                                      {items.metode_pembayaran}
                                  </td>
                                  <td className="px-6 py-4 flex items-center">
                                    <p className={`${items.status_pembayaran === 'success' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'} py-1 px-4 rounded-full text-sm font-bold`}>{items.status_pembayaran}</p>
                                  </td>
                                  <td className="px-6 py-4">
                                      {
                                        new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                            minimumFractionDigits: 0,
                                        }).format(items.total)
                                      }
                                  </td>
                                  <td className="px-6 py-4">
                                      {items.check_in === '-' ? items.check_in : moment(items.check_in).format('LLL')}
                                  </td>
                                  <td className="px-6 py-4">
                                      {items.check_out === '-' ? items.check_out : moment(items.check_out).format('LLL')}
                                  </td>
                                  <td className="px-6 py-4 flex gap-3 w-40">
                                      <buton onClick={() => handleNavigation(items._id)} className="font-medium text-blue-600 hover:underline hover:cursor-pointer">show detail</buton>
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


      </section>
    </div>
  )
}

export default Pendakian