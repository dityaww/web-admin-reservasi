import React, { useEffect, useState } from 'react'
import { addRules, deleteRegulation, getRegulation, editRules } from '../api/api'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json'; // Ganti dengan path file JSON Lottie Anda
import Modal from 'react-modal';

function Regulation() {
  const [ data, setData ] = useState([])
  const token = localStorage.getItem('token')
  const [rules, setRules] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [editDatas, setEditDatas] = useState()
  const [id, setId] = useState()

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const openEditModal = async (id, data) => {
    setIsModalEditOpen(true);
    const res = editRules(id, data, token)
    res.then((res) => {
      console.log(res);
      setEditDatas(res.data)
    })
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeEditModal = () => {
    setIsModalEditOpen(false);
  };

  const handleInputChange = (event) => {
    setRules(event.target.value);
    console.log("data in textarea:", rules);
  };

  const handleInputEditChange = (event) => {
    setEditDatas(event.target.value);
  };

  const handleAddData = async (token) => {
    // Lakukan aksi penambahan data sesuai kebutuhan
    const data = {
      rule: rules
    }
    
    const res = await addRules(data, token)
    console.log(res.data);

    // Setelah menambahkan data, tutup modal
    closeModal();
  };

  const handleEditData = async (id, token) => {
    // Lakukan aksi penambahan data sesuai kebutuhan
    const data = {
      rule: editDatas
    }
    
    const res = await editRules(id, data, token)
    console.log(res.data);

    // Setelah menambahkan data, tutup modal
    closeEditModal();
  };

  const modalStyle = {
    content: {
      width: '50%', // Atur lebar modal
      height: '50%', // Atur tinggi modal
      top: '50%', // Posisi vertikal modal di tengah
      left: '50%', // Posisi horizontal modal di tengah
      transform: 'translate(-50%, -50%)', // Pusatkan modal
      borderRadius: 20
    },
  };

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
              
              <button className='py-2 px-6 bg-neutral-200 hover:bg-neutral-300 font-semibold text-neutral-500 mt-5 rounded-md' onClick={openModal}>Tambah Data</button>

              <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Modal Tambah Data"
                style={modalStyle}
                ariaHideApp={false}
              >
                <div className="m-3">
                  <h2 className='text-2xl font-bold text-neutral-600'>Tambah Data</h2>
                  <hr className='my-4' />
                  <div className="flex flex-col gap-3">
                    <label className='font-semibold text-lg text-neutral-600'>Regulasi</label>
                    <textarea className='border border-neutral-200 text-neutral-600 outline-blue-400 rounded-md px-4 py-2' name="" id="" cols="4" rows="4" onChange={handleInputChange}/>
                    {/* <input className='border border-neutral-400 px-4 py-2' type="text" value={newData} onChange={handleInputChange} /> */}
                  </div>
                  <div className="flex flex-row gap-2 mt-5">
                    <button className='bg-neutral-200 text-neutral-500 px-6 py-2 rounded-md hover:bg-neutral-300' onClick={closeModal}>Batal</button>
                    <button className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600' onClick={() => handleAddData(token)}>Tambah</button>
                  </div>
                </div>
              </Modal>
              
              <Modal
                isOpen={isModalEditOpen}
                onRequestClose={closeEditModal}
                contentLabel="Modal Edit Data"
                style={modalStyle}
                ariaHideApp={false}
              >
                <div className="m-3">
                  <h2 className='text-2xl font-bold text-neutral-600'>Edit Data</h2>
                  <hr className='my-4' />
                  <div className="flex flex-col gap-3">
                    <label className='font-semibold text-lg text-neutral-600'>Regulasi</label>
                    <textarea className='border border-neutral-200 text-neutral-600 outline-blue-400 rounded-md px-4 py-2' name="" id="" cols="4" rows="4" value={editDatas?.rule} onChange={handleInputEditChange}/>
                    {/* <input className='border border-neutral-400 px-4 py-2' type="text" value={newData} onChange={handleInputChange} /> */}
                  </div>
                  <div className="flex flex-row gap-2 mt-5">
                    <button className='bg-neutral-200 text-neutral-500 px-6 py-2 rounded-md hover:bg-neutral-300' onClick={closeEditModal}>Batal</button>
                    <button className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600' onClick={() => handleEditData(id, token)}>Simpan</button>
                  </div>
                </div>
              </Modal>
      
              {/* <button data-modal-target="default-modal" data-modal-toggle="default-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
                Toggle modal
              </button> */}

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
                                      <buton onClick={() => {
                                        openEditModal(items.id, token)
                                        setId(items.id)
                                        }} className="font-medium text-blue-600 hover:underline hover:cursor-pointer ">Edit</buton>
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