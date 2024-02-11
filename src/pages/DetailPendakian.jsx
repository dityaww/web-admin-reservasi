import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { detailPendakian } from '../api/api'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import moment from 'moment';
import Lottie from 'react-lottie';
import animationData from '../assets/load-data.json';

function DetailPendakian() {
    const { id } = useParams()
    const token = localStorage.getItem('token')

    const [dataDetail, setDataDetail] = useState(null)
    const [dataPendaki, setDataPendaki] = useState([])

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      };

    useEffect(() => {
        const fetch = async (detailId, admToken) => {
            const response = await detailPendakian(detailId, admToken)
            return response.data
        }

        fetch(id, token).then((res) => {
            // console.log(res);
            setDataDetail(res)
            setDataPendaki(res.pendaki)
        }).catch((err) => {
            console.log(err);
        })

    }, [dataDetail, dataPendaki])

    return (
        <div className="flex flex-row h-screen w-full">
        <Sidebar />
        <section className="px-16 flex-1 pt-14 h-screen overflow-y-auto">
            <Navbar/>


            <div className="mt-10">
                <div className="flex flex-row justify-between">
                    <h1 className='font-regular text-2xl text-neutral-600 antialiased'>Detail</h1>
                    {/* <div className="flex flex-row">
                        <Link to='/dashboard/pendakian' className='text-gray-500 mr-1'>Reservasi</Link>
                        <p className='text-blue-500'>/ Detail Reservasi</p>
                    </div> */}
                </div>

                {dataDetail === null ? (
                    <div className='flex items-center justify-center'>
                        <Lottie options={defaultOptions} height={300} width={300} />
                    </div>
                ) : (
                    <div className="border border-gray-300 px-14 py-10 my-8 rounded-lg flex flex-col gap-4 relative">
                        <div className={`absolute top-0 right-0 ${dataDetail?.status_pembayaran === 'completed' ? 'bg-emerald-500' : dataDetail?.status_pembayaran === 'success' ? 'bg-blue-500' : 'bg-gray-300'} px-12 py-2 rounded-full m-8`}>
                            <p className={`text-lg font-semibold ${dataDetail?.status_pembayaran === 'completed' || dataDetail?.status_pembayaran === 'success' ? 'text-white' : 'text-gray-500'}`}>{dataDetail?.status_pembayaran}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className='text-4xl font-bold text-gray-800'>Gunung Ungaran</p>
                            <p className='text-gray-600 text-lg'>via Mawar Camp Area</p>
                        </div>
                        <div className="flex flex-row gap-5">
                            <p className='border border-indigo-500 text-indigo-600 px-6 py-2 rounded-md font-bold'>{dataDetail?.jumlah_pendaki} pendaki</p>
                            <p className='border border-emerald-500 text-emerald-600 px-6 py-2 rounded-md font-bold'>{dataDetail?.durasi_pendakian}</p>
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <p className='text-xl font-semibold text-gray-800'>Check In</p>
                            <p>{dataDetail?.check_in !== "-" ? moment(dataDetail?.check_in).format("LLL") : '-'}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className='text-xl font-semibold text-gray-800'>Check Out</p>
                            <p>{dataDetail?.check_out !== "-"? moment(dataDetail?.check_out).format("LLL") : '-'}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className='text-xl font-semibold text-gray-800'>Tanggal Pendakian</p>
                            <p>{moment(dataDetail?.tanggal_pendakian).format("DD-MM-YYYY")}</p>
                        </div>

                        <p className='text-xl font-semibold text-gray-800'>Anggota Pendaki</p>
                        <div className="grid grid-cols-3 gap-4">
                            {dataPendaki.length !== 0 && dataPendaki.map((items) => (
                                <div className="relative border border-gray-300 shadow-md p-6 rounded-lg">
                                    <p className='bg-blue-500 absolute right-0 top-0 m-2 rounded-full px-4 py-1 text-white font-bol text-sm'>{items.code}</p>
                                    <p className='capitalize text-lg font-bold'>{items.name}</p>
                                    <p className='text-gray-500 font-semibold'>{items.email}</p>
                                    <p className='text-gray-500'>{items.phone === 'false' ? '-' : items.phone}</p>
                                    <p className='text-gray-500'>{items.address === 'false' ? '-' : items.address}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-row justify-between bg-gray-600 rounded-lg p-10 mt-14">
                            <p className='italic text-xl text-white font-bold'>Subtotal</p>
                            <p className='font-bold text-white text-xl'>{
                                new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0,
                                }).format(dataDetail?.total)
                            }</p>
                        </div>
                    </div>
                )}

            </div>

        </section>
        </div>
    )
}

export default DetailPendakian