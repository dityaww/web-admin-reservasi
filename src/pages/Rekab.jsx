import moment from 'moment/moment'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RekapPerBulan } from '../api/api'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function Rekab() {
    const [valBulan, setValBulan] = useState("")
    const [data, setData] = useState([])
    const [jumlah, setJumlah] = useState(0)
    const currentYear = new Date().getFullYear()
    const token = localStorage.getItem('token')

    const navigation = useNavigate()
    
    const getDataPerBulan = async (bln, thn, tokens) => {
        const res = await RekapPerBulan(bln, thn, tokens)
        setData(res.data.dataSummary)
        setJumlah(res.data.monthlyTotal)
        console.log(res.data);
    }

    const handleNavigation = (id) => {
        navigation(`${id}`)
    }

    useEffect(() => {
        if(valBulan !== ''){
            getDataPerBulan(valBulan, currentYear, token)
        }
    }, [valBulan])

    return (
        <div className="flex flex-row h-screen w-full">
        <Sidebar />
        <section className="px-10 flex-1 pt-14 h-screen overflow-y-auto overflow-x-hidden">
            <Navbar/>

            <div className="mt-10">
                <h1 className='font-bold text-2xl text-neutral-600 font-nw'>Rekap Pendakian</h1>              
            </div>

            <select name="" id="" value={valBulan} onChange={(e) => {
                setValBulan(e.target.value)
                }} className='border-2 border-neutral-300 px-4 py-3 outline-none mt-5 rounded-lg text-neutral-600'>
                <option value="">-- Pilih bulan --</option>
                <option value="01">Januari</option>
                <option value="02">Februari</option>
                <option value="03">Maret</option>
                <option value="04">April</option>
                <option value="05">Mei</option>
                <option value="06">Juni</option>
                <option value="07">Juli</option>
                <option value="08">Agustus</option>
                <option value="09">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
            </select>

            <div className="relative overflow-x-auto shadow-lg sm:rounded-lg mt-4 mb-20">
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
                                    {moment(items.tanggal_pendakian).format("DD-MM-YYYY")}
                                </td>
                                <td className="px-6 py-4">
                                    <p className={`${items.status_pembayaran === 'completed' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'} py-1 px-4 rounded-full text-sm font-bold text-center`}>{items.status_pembayaran}</p>
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
                                    <input disabled={items.check_in !== '-' && true} value={'check-in'} onClick={() => postCheckIn(items._id, '', token)} className={`font-medium ${items.check_in !== '-' ? 'bg-gray-300 text-gray-500' : 'bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer'} text-center py-1 w-24 rounded-md mr-2`} />
                                    <input disabled={items.check_out !== '-' && true} value={'check-out'} onClick={() => {
                                        if(items.check_in === '-'){
                                            alert('cek-in dulu baru cek-out')
                                        } else{
                                            postCheckOut(items._id, '', token)
                                        }
                                    
                                    }} className={`font-medium ${items.check_out !== '-' ? 'bg-gray-300 text-gray-500' : 'bg-red-600 hover:bg-red-700 text-white hover:cursor-pointer'} text-center py-1 w-24 rounded-md`} />
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
                        <tr>
                            <th scope="col" colSpan={1} className="px-6 py-5 bg-neutral-500 text-left text-white font-bold text-lg uppercase">
                                
                            </th>
                            <th scope="col" colSpan={7} className="px-6 py-5 bg-neutral-500 text-left text-white font-bold text-lg uppercase">
                                Subtotal
                            </th>
                            <th scope="col" colSpan={2} className="px-6 py-5 bg-neutral-500 text-center text-white font-bold text-lg capitalize">
                                {
                                    new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                        minimumFractionDigits: 0,
                                    }).format(jumlah)
                                }
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        </div>
    )
}

export default Rekab