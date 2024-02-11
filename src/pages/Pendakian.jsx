import React, { useEffect } from 'react'
import { useState } from 'react'
import { approveCheckIn, transactionPending, transactionSuccess, approveCheckOut, getPendakianToday, getPendakianStartFromToday, getAllDataPendakian } from '../api/api'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

function Pendakian() {
  const [data, setData] = useState([])
  const [status, setStatus] = useState("")
  const token = localStorage.getItem('token')
  const navigation = useNavigate()

  console.log("status", status);

//   const getTransactionPending = async (t) => {
//     const res = await transactionPending(t)
//     setData(res.data)
//     console.log(res.data);
//   }

//   const getTransactionSuccess = async (t) => {
//     const res = await transactionSuccess(t)
//     setData(res.data)
//     console.log(res.data);
//   }

  // get pendakian hari ini
  const getDataPendakianToday = async(sts, tokens) => {
    const res = await getPendakianToday(sts, tokens)
    setData(res.data)
    console.log(res);
  }

  // get pendakian hari ini dan selanjutnya
  const getDataPendakianStartFromToday = async(sts, tokens) => {
    const res = await getPendakianStartFromToday(sts, tokens)
    setData(res.data)
    console.log(res);
  }

  // all datas
  const getAllDatabyStatus = async (sts, tokens) => {
    const res = await getAllDataPendakian(sts, tokens)
    setData(res.data)
    console.log("all-datas", res);
  }

  const handleStatus = (e) => {
    setStatus(e.target.value)
    console.log("status", e.target.value);
    console.log("status", e.target.checked);
  }

  const handleNavigation = (id) => {
    navigation(`${id}`)
  }

  const postCheckIn = async (id, data, tokens) => {
    try {
        const res = await approveCheckIn(id, data, tokens)
        console.log(res);
        alert('sukses cek-in')
    } catch (error) {
        alert('gagal cek-in')        
    }
  }
  
  const postCheckOut = async (id, data, tokens) => {
    try {
        const res = await approveCheckOut(id, data, tokens)
        console.log(res);
        alert('sukses cek-out')
    } catch (error) {
        alert('gagal cek-out') 
        console.log(error);       
    }
  }

  useEffect(() => {
    if(data.length !== null){
        console.log('data ada');
    }
  }, [data])
  

  return (
    <div className="flex flex-row h-screen w-full">
      <Sidebar />
      <section className="px-10 flex-1 pt-14 h-screen overflow-y-auto overflow-x-hidden">
          <Navbar/>

          <div className="mt-10">
              <h1 className='font-bold text-2xl text-neutral-600 font-nw'>Pendakian</h1>              
          </div>

            {/* <div className="mt-5">
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

                <div className="flex flex-row gap-3">
                    <button onClick={() => getTransactionPending(token)} class="block px-4 py-2 hover:bg-gray-100 w-full text-left">Pending</button>
                    <button onClick={() => getTransactionSuccess(token)} class="block px-4 py-2 hover:bg-gray-100 w-full text-left">Sukses</button>
                </div>
            </div> */}
            <div className="mt-5 flex flex-row justify-between items-center">
                <div className="flex flex-row gap-3">
                    <div className="">
                        <button onClick={() => {
                            if (status !== '') {
                                getAllDatabyStatus(status, token)
                            } else{
                                alert("pilih status pembayaran")
                            }
                        }} className='border-2 px-5 py-1.5 rounded-full bg-neutral-200 text-neutral-700 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white'>
                            All data
                        </button>
                    </div>
                    <div className="">
                        <button onClick={() => {
                            getDataPendakianToday(status, token)
                        }} className='border-2 px-5 py-1.5 rounded-full bg-neutral-200 text-neutral-700 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white'>
                            only today
                        </button>
                    </div>
                    <div className="">
                        <button onClick={() => {
                            getDataPendakianStartFromToday(status, token)
                        }} className='border-2 px-5 py-1.5 rounded-full bg-neutral-200 text-neutral-700 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white'>
                            start from today
                        </button>
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex items-center">
                        <input type="checkbox" name="pending" value={"pending"} id="1" onChange={handleStatus} checked={status === 'pending' ? true : false}/>
                        <label className='pl-1'>Pending</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="completed" value={"completed"} id="2" onChange={handleStatus} checked={status === 'completed' ? true : false}/>
                        <label className='pl-1'>Completed</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="success" value={"success"} id="3" onChange={handleStatus} checked={status === 'success' ? true : false}/>
                        <label className='pl-1'>success</label>
                    </div>
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10">
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
                                  Tanggal Pendakian
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
                                  Detail
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Opsi
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
                                  <td className="px-6 py-4 w-40">
                                      {/* {moment(items.tanggal_pendakian).format("DD-MM-YYYY")} */}
                                      {items.tanggal_pendakian}
                                  </td>
                                  <td className="px-6 py-4">
                                    <p className={`${items.status_pembayaran === 'completed' ? 'bg-emerald-500 text-white' : items.status_pembayaran === 'success' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'} py-1 px-4 rounded-full text-sm font-bold text-center`}>{items.status_pembayaran}</p>
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
                                  <td className="px-6 py-4 w-40">
                                      {items.check_in === '-' ? items.check_in : moment(items.check_in).format('LLL')}
                                  </td>
                                  <td className="px-6 py-4 w-40">
                                      {items.check_out === '-' ? items.check_out : moment(items.check_out).format('LLL')}
                                  </td>
                                  <td className="px-6 py-4">
                                      <buton onClick={() => handleNavigation(items._id)} className="font-medium text-blue-600 hover:underline hover:cursor-pointer">show</buton>
                                  </td>
                                  <td className='px-6 py-4 flex flex-col gap-2 w-36'>
                                    {/* <input type="text" disabled={true} value={'halo'} /> */}
                                    <input disabled={items.check_in !== '-' && true} value={'check-in'} onClick={() => postCheckIn(items._id, '', token)} className={`font-medium ${items.check_in !== '-' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer'} text-center py-1 w-24 rounded-md mr-2`} />
                                    <input disabled={items.check_out !== '-' && true} value={'check-out'} onClick={() => {
                                        if(items.check_in === '-'){
                                            alert('cek-in dulu baru cek-out')
                                        } else{
                                            postCheckOut(items._id, '', token)
                                        }
                                    
                                    }} className={`font-medium ${items.check_out !== '-' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white hover:cursor-pointer'} text-center py-1 w-24 rounded-md`} />
                                  </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                                <td scope="col" colSpan={12} className="px-6 py-5 bg-neutral-200 text-center text-neutral-500 font-mono text-lg capitalize">
                                    Data tidak ada
                                </td>
                            </tr>
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